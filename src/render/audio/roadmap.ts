import { SmoScore } from '../../smo/data/score';
import { SmoVolta, SmoBarline } from '../../smo/data/measureModifiers';

export type playerStartReason = 'scoreStart' |'startRepeat' | 'DC' |  'DS' | 'Volta';
export type playerEndReason = 'scoreStart' | 'scoreEnd' | 'endRepeat' | 'Coda' | 'Segno' | 'Volta';
export interface ScoreSegment {
  startMeasure: number,
  endMeasure: number,
  startReason: playerStartReason,
  endReason: playerEndReason,
  ending: number
}
/**
 * Builds and maintans a road map from repeats and other landmarks in a score.
 * Maintains an internal cursor into the current measure.
 * This object should be repopulated (or recreated) each time it is played because the 
 * sections are consumed as the internal cursor advances.
 */
export class ScoreRoadMapBuilder {
  jumpQueue: ScoreSegment[] = [];
  lastSkip: number = -1
  score: SmoScore;
  measureTracker: number = 0;
  dcMeasure: number = -1;
  codaMeasure: number = -1;
  signMeasure: number = -1;
  dsMeasure: number = -1;
  fineMeasure: number = -1;
  toCodaMeasure: number = -1;
  static get defaultMap():ScoreSegment {
    return {
      startMeasure: -1,
      endMeasure: -1,
      startReason: 'scoreStart',
      endReason: 'scoreEnd',
      ending: -1
    }
  }
  constructor(score: SmoScore) {
    this.score = score;
  }

  /**
   * Populate repeat landmarks e.g. coda
   */
  private populateLandmarks() {
    const stave = this.score.staves[0];
    for (let i = 0; i < stave.measures.length; ++i) {
      const mm = stave.measures[i];
      if (mm.isToDc) {
        this.dcMeasure = i;
      } else if (mm.isToDs) {
        this.dsMeasure = i;
      } else if (mm.isCoda) {
        this.codaMeasure = i;
      } else if (mm.isSegno) {
        this.signMeasure = i;
      } else if (mm.isToCoda) {
        this.toCodaMeasure = i;
      } else if (mm.isFine) {
        this.fineMeasure = i;
      }
    }
  }

  /**
   * When populating DC/DS logic, gets the score segments between start and the landmark (coda, fine etc).
   * @param start 
   * @param end 
   * @param startReason 
   * @returns 
   */
  private duplicateJumpsFromTo(start: number, end: number, startReason: playerStartReason): ScoreSegment[] {
    const rv: ScoreSegment[] = [];
    let started = false;
    for (let i = 0; i < this.jumpQueue.length; ++i) {
      const rm = this.jumpQueue[i];
      if (rm.endMeasure < start) {
        continue;
      }
      if (rm.startMeasure > end) {
        continue;
      }
      // If this section fits fully within the section, just copy it
      // adjusting start if required
      if (rm.startMeasure >= start && rm.endMeasure < end) {
        const sm = started ? rm.startMeasure : start;
        const sr = started ? rm.startReason : startReason;
        started = true;
        
        const nrm: ScoreSegment = {
          startMeasure: sm,
          endMeasure: rm.endMeasure,
          startReason : sr,
          endReason : rm.endReason,
          ending: rm.ending
        };
        rv.push(nrm)
      } else if (rm.startMeasure >= start && rm.endMeasure >= end) {
        // if this section ends after the requested end, copy part of it
        // and then exit since we've reached the end
        rv.push({
          startMeasure: rm.startMeasure,
          endMeasure: end,
          startReason: rm.startReason,
          endReason: rm.endReason,
          ending: rm.ending
        });
        break;
      }
    }
    return rv;
  }

  /**
   * Internal function to find the voltas before/after a repeat
   * @param startMeasure 
   * @param endMeasure 
   * @returns 
   */
  private findVoltaBetween(startMeasure: number, endMeasure: number):SmoVolta[] {
    const rv: SmoVolta[] = [];
    const stave = this.score.staves[0];
    const voltas = stave.getVoltaMap(startMeasure, endMeasure);
    voltas.forEach((volta) => {
      // this is our first ending.
      if (volta.endBar === endMeasure) {
        rv.push(volta);
        // get any nth ending starting in bar n+1
        const nvolta = stave.getVoltasForMeasure(endMeasure + 1);
        while (nvolta.length > 0) {
          const vv = nvolta.pop();
          if (vv?.startBar === endMeasure + 1) {
            rv.push(vv);
            nvolta.splice(0);
            // Clear the array and get any voltas at the end of this volta.
            endMeasure = vv.endBar;
            stave.getVoltasForMeasure(endMeasure + 1).forEach((nv) => {
              nvolta.push(nv);
            });
          }
        }
      }
    });
    return rv;
  }
  /**
   * Gets the next measure in the score, including repeats etc.  And advances the internal
   * cursor
   * @returns 
   */
  getAndAdvance() {
    if (this.jumpQueue.length < 1) {
      return -1;
    }
    // Return the current measure
    const rv = this.measureTracker;
    // Advance the measure for next time.
    const top = this.jumpQueue[0];
    // If this is the end of the current road map, go to the next one
    // if it exists
    if (top.endMeasure <= this.measureTracker) {
      console.log(`mm ${this.measureTracker}: done with jump ${this.jumpQueue.length}`);
      this.jumpQueue.shift();
      if (this.jumpQueue.length) {
        this.measureTracker = this.jumpQueue[0].startMeasure;
      }
    } else {
      // else just advance to the next measure
      this.measureTracker += 1;
    }
    return rv;
  }
  /**
   * Returns true if all the score measures have been played
   *
   * @readonly
   * @memberof ScoreRoadMapBuilder
   */
  get isDone() {
    return this.jumpQueue.length < 1;
  }
  private populateRange(startMeasure: number, endMeasure: number,
    currentJump: ScoreSegment
  ) {
     let skipTo = -1;
    for (let i = startMeasure; i < endMeasure; ++i) {
      if (skipTo > i) {
        continue;
      }
      const mm = this.score.staves[0].measures[i];
      // If this is a start repeat, keep track of it as the repeat destination
      if (mm.getStartBarline().barline === SmoBarline.barlines['startRepeat']) {
        this.lastSkip = i;
      }
      // End repeat.  Handle voltas
      if (mm.getEndBarline().barline === SmoBarline.barlines['endRepeat'] &&
       this.lastSkip >= 0) {
        currentJump.endMeasure = i;
        currentJump.endReason = 'endRepeat';
        // Create a new skip from start repeat to here.
        currentJump = {
            startMeasure: this.lastSkip,
            endMeasure: i,
            startReason: 'startRepeat',
            endReason: 'endRepeat',
            ending: -1
        };
        this.jumpQueue.push(currentJump);
        // Get any voltas on or after this repeat
        const voltas = this.findVoltaBetween(this.lastSkip, i);
        // The first ending we've already played, so skip that
        if (voltas.length) {
          const firstEnding = voltas[0];
          currentJump.endMeasure = firstEnding.startBar - 1;
          currentJump.endReason = 'Volta';
          voltas.shift();
          let sanity = 0;
          // For 2nd+ ending, play the ending.  Sanity is in case the voltas
          // overlap in some weird way and we can't figure out where they go.
          while (voltas.length && sanity < 20) {
            sanity += 1;
            const volta = voltas[0];
            currentJump = {
              startMeasure: volta.startBar,
              endMeasure: volta.endBar,
              startReason: 'Volta',
              endReason: 'Volta',
              ending: volta.number
            };
            this.jumpQueue.push(currentJump);
            voltas.shift();
            // If there are more than 2, do more repeats
            if (voltas.length) {
              currentJump = {
                startMeasure: this.lastSkip,
                endMeasure: firstEnding.startBar,
                startReason: 'startRepeat',
                endReason: 'Volta',
                ending: volta.number
              };
              this.jumpQueue.push(currentJump);
            } 
          }
        }
        // Done with repeats and voltas.  Continue with the score from after the last volta
        if (currentJump.endMeasure < endMeasure) {
          skipTo = currentJump.endMeasure + 1;
          this.lastSkip = skipTo;
          currentJump = {
            startMeasure: skipTo,
            endMeasure,
            startReason: 'startRepeat',
            endReason: 'scoreEnd',
            ending: -1
          }
          this.jumpQueue.push(currentJump);
        }
      }
    }
  }
  /**
   * Populate the jump queue of sections of the score, starting
   * at the given measure.  This should be called before calling 
   * getAndAdvance the first time.
   * @param startMeasure 
   */
  populate(startMeasure: number) {
    this.populateLandmarks();
    const stave = this.score.staves[0];
    this.jumpQueue.splice(0);
    this.lastSkip = 0;
    // assume we are playing the full score
    let endMeasure = stave.measures.length - 1;
    if (this.dcMeasure > 0) {
      endMeasure = this.dcMeasure;
    } else if (this.dsMeasure > 0) {
      endMeasure = this.dsMeasure;
    }
    let endReason:playerEndReason = 'scoreEnd';
    if (this.dcMeasure > 0 || this.dsMeasure > 0) {
      endReason = 'Coda';
    }
    this.jumpQueue.push({
      startMeasure: 0,
      endMeasure,
      startReason: 'scoreStart',
      endReason,
      ending: -1
    });    
    let currentJump = this.jumpQueue[0];
    this.populateRange(0, endMeasure, currentJump)
    
    const last = this.jumpQueue.length - 1;
    // handle dc al coda, etc.
    endMeasure = stave.measures.length - 1;
    endReason = 'scoreEnd';
    if (this.fineMeasure > 0) {
      endMeasure = this.fineMeasure;
    }
    else if (this.toCodaMeasure > 0) {
      endMeasure = this.toCodaMeasure;
    }
    // Handle DC
    if (this.dcMeasure >= 0) {
      const dcMeasures = this.duplicateJumpsFromTo(0, endMeasure, 'DC');
      this.jumpQueue = this.jumpQueue.concat(dcMeasures);
      this.jumpQueue[last].endReason = 'Coda';
      if (this.codaMeasure > this.dcMeasure) {
        currentJump = {
          startMeasure: this.codaMeasure,
          endMeasure,
          startReason: 'DC',
          endReason: 'scoreEnd',
          ending: -1
        };
        this.jumpQueue.push(currentJump);
        this.populateRange(this.dcMeasure, stave.measures.length - 1, currentJump);
      }
    } else if (this.dsMeasure >= 0 && this.signMeasure > 0 && this.signMeasure < this.dsMeasure) {
      // Only to DS if the sign is present and it's location makes sense
      const dcMeasures = this.duplicateJumpsFromTo(this.signMeasure, endMeasure, 'DS');
      this.jumpQueue = this.jumpQueue.concat(dcMeasures);
      this.jumpQueue[last].endReason = 'Coda';
      if (this.codaMeasure > this.dsMeasure) {
        currentJump = {
          startMeasure: this.codaMeasure,
          endMeasure,
          startReason: 'DS',
          endReason: 'scoreEnd',
          ending: -1
        };
        this.jumpQueue.push(currentJump);
        this.populateRange(this.dsMeasure, stave.measures.length - 1, currentJump);
      }
    }
    // If we are starting from somewhere other than the beginning, remove everything before the 
    // cursor and set the start measure of the last block to startMeasure
    let toRemove = 0;
    for (let j = 0; j < this.jumpQueue.length; ++j) {
      const roadmap = this.jumpQueue[j];
      if (startMeasure > roadmap.endMeasure) {
        toRemove += 1;
      }
    }
    this.jumpQueue.splice(0, toRemove);
    if (this.jumpQueue.length) {
      this.measureTracker = startMeasure;
      this.jumpQueue[0].startMeasure = startMeasure;
    }
  }
}
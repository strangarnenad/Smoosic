import { SmoScore } from '../data/score';
import { SmoSelector, SmoSelection } from './selections';
import { SmoTie, SmoStaffHairpin, SmoStaffTextBracket } from '../data/staffModifiers';
import { SmoMusic } from '../data/music';
import { SmoNote } from '../data/note';
import { SmoArticulation } from '../data/noteModifiers';
import { SmoDynamicText } from '../data/noteModifiers';
import { ScoreRoadMapBuilder } from './roadmap';
/**
 * Modules to update the audio information used in audio export and real-time playback.
 * @param selections 
 * @returns 
 */
/**
 * last note that is not a rest in the selections
 * @param selections 
 * @returns 
 */
const  getLastActualNote = (selections: SmoSelection[]) => {
  for (let i = selections.length - 1; i >= 0; --i) {
    const note = selections[i].note;
    if (note && !note.isRest()) {
      return note;
    }
  }
  return null;
}
/**
 * First note that is not a rest in the selection
 * @param selections 
 * @returns 
 */
const getFirstActualNote = (selections: SmoSelection[]) => {
    for (let i = 0; i < selections.length; ++i) {
      const note = selections[i].note;
      if (note && !note.isRest()) {
        return note;
      }
    }
    return null;
}
/**
 * From a line modifier (sequential selections), gradually change dynamics across the range
 * @param score 
 * @param innerSelections 
 * @param sign indicates increase or decrease
 * @param startSelector 
 * @param endSelector 
 */
const assignDynamicsFromModifier = 
  (score: SmoScore, innerSelections: SmoSelection[], sign: number, startSelector: SmoSelector, endSelector: SmoSelector) => {
  if (innerSelections.length > 1) {
    const lastNote = getLastActualNote(innerSelections);
    const firstNote = getFirstActualNote(innerSelections);
    const tickTotal = SmoSelection.countTicks(score, startSelector, endSelector)
    if (lastNote && firstNote) {
      if (lastNote.audioData.volume.length && firstNote.audioData.volume.length) {
        for (let i = 0; i < firstNote.audioData.volume.length; ++i) {
          if (lastNote.audioData.volume.length > i) {
            let firstGain = firstNote.audioData.volume[i];
            let lastGain = lastNote.audioData.volume[i];
            if (firstGain === lastGain) {
              lastGain = 0.1 * sign + firstGain;
            }
            let currentGain = firstGain;
            innerSelections.forEach((sel, iix) => {
              if (sel.note) {
                const note = sel.note;
                const ticks = note.tickCount;
                // TODO: this calculates the average volume for the note.  If the note is long, we'd want
                // a cresc. envelope, we need to modify audio routines for this.
                const endGain = currentGain + (lastGain - firstGain) * (ticks / tickTotal);
                const gain = (currentGain + endGain) / 2;
                if (note.audioData.volume.length > i)  {
                  note.audioData.volume[i] = gain
                } else {
                  note.audioData.volume.push(gain)
                }
                currentGain = endGain;
              }
            });
          }
        }
      }
    }
  }
}
const assignTextBracketDynamics = (score: SmoScore, selection: SmoSelection) => {
  const textBrackets = selection.staff.getTextBracketsStartingAt(selection.selector);
  textBrackets.forEach((textBracket: SmoStaffTextBracket) => {
    if (textBracket.text.toLowerCase().startsWith('cres') || textBracket.text.toLowerCase().startsWith('dim')) {
      let innerSelections = SmoSelection.innerSelections(score,
        textBracket.startSelector, textBracket.endSelector
      );
      let sign = 1;
      if (textBracket.text.startsWith('dim')) {
        sign = -1;
      }
      assignDynamicsFromModifier(score, innerSelections, sign, textBracket.startSelector, textBracket.endSelector);
    }
  });
}
const assignHairpinDynamics = (score: SmoScore, selection: SmoSelection) => {
  const hairpins = selection.staff.getHairpinsStartingAt(selection.selector);
  // const textBrackets = selection.staff.getTextBracketsStartingAt(selection.selector);
  hairpins.forEach((hairpin) => {
    let innerSelections = SmoSelection.innerSelections(score,
      hairpin.startSelector, hairpin.endSelector
    );
    let sign = -1;
    if (hairpin.hairpinType === SmoStaffHairpin.types.CRESCENDO) {
      sign = 1;
    }
    assignDynamicsFromModifier(score, innerSelections, sign, hairpin.startSelector, hairpin.endSelector);
  });
}
const setDynamics = (score: SmoScore) => {
  score.staves.forEach((staff) => {
    let dynamic = SmoMusic.dynamicVolumeMap['mp'];
    staff.measures.forEach((mm) => {
      mm.voices.forEach((voice, vix: number) => {
        let selection = SmoSelection.noteSelection(score, 
            staff.staffId, mm.measureNumber.localIndex, vix, 0
            );
        // assign volume based on dynamic markings alone
        while (selection) {
          const note = selection.note;
          if (note) {
            note.audioData.volume.splice(0);
            if (note.isRest()) {
              note.audioData.volume = [0];
            } else {
              const curDynamics = note.getModifiers('SmoDynamicText');
              if (curDynamics.length > 0) {
                note.audioData.volume = curDynamics.map((dd) => 
                  SmoMusic.dynamicVolumeMap[(dd as SmoDynamicText).text]);
                dynamic = note.audioData.volume[0];
              } else {
                note.audioData.volume.push(dynamic);
              }
              const articulations: SmoArticulation[] = note.getArticulations();
              const marcato = 
                articulations.findIndex((xx) => xx.articulation === SmoArticulation.articulations.marcato) >= 0;
              const accent = 
                articulations.findIndex((xx) => xx.articulation === SmoArticulation.articulations.accent) >= 0;
              for (let av = 0; av < note.audioData.volume.length; ++av) {
                if (marcato) {
                  note.audioData.volume[av] += 0.1;
                } else if (accent) {
                  note.audioData.volume[av] += 0.1;
                }
              }
            }
          }
          const selector = selection.selector;
          selection = SmoSelection.nextNoteSelection(score,
            selector.staff, selector.measure, selector.voice, selector.tick);
        }
        selection =SmoSelection.noteSelection(score, 
            staff.staffId, mm.measureNumber.localIndex, vix, 0
            );
        // adjust for hairpin/crescendo etc.
        while (selection) {
          assignHairpinDynamics(score, selection);
          assignTextBracketDynamics(score, selection);
          const selector = selection.selector;
          selection = SmoSelection.nextNoteSelection(score,
            selector.staff, selector.measure, selector.voice, selector.tick);
        }
      });
    })
  });
}
/**
 * Set the note duration to account for ties.  Tied notes have greater duration,
 * notes tied to don't sound.
 * @param score 
 * @param roadMap 
 */
export const PopulateAudioData = (score: SmoScore, roadMap: ScoreRoadMapBuilder) => {
  setDynamics(score);
  const q = roadMap.jumpQueue;
  const trackVoices: Record<string, number> = {};
  const tiedNotes: Record<number, SmoNote | undefined> = {};
  for (let i = 0; i < q.length; ++i) {
    const segment = q[i];
    for (let k = 0; k < score.staves.length; ++k) {
      const staff = score.staves[k];
      const maxVoices = staff.maxVoiceCount;
      for (let v = 0; v < maxVoices; ++v) {
        const trackKey = `${k}-${v}`;
        if (!trackVoices[trackKey]) {
          const trackCount = Object.keys(trackVoices).length + 1;
          trackVoices[trackKey] = trackCount;
        }
        const currentTrack = trackVoices[trackKey];        
        for (let j = segment.startMeasure; j <= segment.endMeasure; ++j) {
          const mm = staff.measures[j];
          if (mm.voices.length > v) {
            const voice = mm.voices[v];
            for (let n = 0; n < voice.notes.length; ++n) {
              let selection = SmoSelection.noteSelection(score, 
                  staff.staffId, mm.measureNumber.localIndex, v, n
                  );
              if (selection && selection.note) {
                const note = selection.note;
                const tieLen = staff.getTiesStartingAt(selection.selector);
                const tiedNote = tiedNotes[currentTrack];
                if (tiedNote) {
                  tiedNote.audioData.tiedDuration += note.tickCount;
                  note.audioData.tiedDuration = 0;
                  if (tieLen.length < 1) {
                    tiedNotes[currentTrack] = undefined;
                  }
                } else if (tieLen.length) {                  
                  tiedNotes[currentTrack] = note;
                  note.audioData.durationPct = 1.0;
                } else {
                  note.audioData.tiedDuration = note.tickCount;
                  note.audioData.durationPct = 0.9;
                  const articulations: SmoArticulation[] = note.getArticulations();
                  const staccato = 
                    articulations.findIndex((xx) => xx.articulation === SmoArticulation.articulations.staccato) >= 0;
                  const tenuto = 
                    articulations.findIndex((xx) => xx.articulation === SmoArticulation.articulations.tenuto) >= 0;
                  const marcato = 
                    articulations.findIndex((xx) => xx.articulation === SmoArticulation.articulations.marcato) >= 0;
                  if (staccato && tenuto) {
                    note.audioData.durationPct = 0.85;
                  } else if (staccato) {
                    note.audioData.durationPct = 0.6;
                  }else if (tenuto) {
                    note.audioData.durationPct = 0.95;
                  } else if (marcato) {
                    note.audioData.durationPct = 0.45;
                  }
                }
              }
            }
          } else {
            tiedNotes[currentTrack] = undefined;
          }
        }
      }
    }
  };
}
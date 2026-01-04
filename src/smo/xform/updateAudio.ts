import { SmoScore } from '../data/score';
import { SmoSelector, SmoSelection } from './selections';
import { SmoTie, SmoStaffHairpin, SmoStaffTextBracket } from '../data/staffModifiers';
import { SmoMusic } from '../data/music';
import { SmoNote, PlayedNote } from '../data/note';
import { SmoArticulation, SmoGraceNote, SmoOrnament } from '../data/noteModifiers';
import { SmoDynamicText } from '../data/noteModifiers';
import { Pitch } from '../data/common';

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
  const normalizationNotes: Record<number, SmoNote[]> = {};
  score.staves.forEach((staff) => {
    let dynamic = SmoMusic.dynamicVolumeMap['mp'];
    let overallTick = 0;
    const mm = staff.measures[0];
    mm.voices.forEach((voice, vix: number) => {
      // selection is for dynamics text, selection 2 is for dynamic lines (cresc. etc)
      let selection = SmoSelection.noteSelection(score, 
          staff.staffId, mm.measureNumber.measureIndex, vix, 0
          );
      let selection2 = SmoSelection.noteSelection(score, 
          staff.staffId, mm.measureNumber.measureIndex, vix, 0
          );
      // assign volume based on dynamic markings alone
      let measureTick = 0;
      while (selection) {
        const note = selection.note;
        const curTick = overallTick + measureTick;
        if (note) {
          if (!note?.isRest()) {
            if (!normalizationNotes[curTick]) {
              normalizationNotes[curTick] = [];
            }
            normalizationNotes[curTick].push(note!);
          }
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
        selection = SmoSelection.nextNoteSelectionIncludeVoice(score,
          selector.staff, selector.measure, selector.voice, selector.tick);
        measureTick += note? note.tickCount: 0;
      }
      selection2 = SmoSelection.noteSelection(score, 
          staff.staffId, mm.measureNumber.measureIndex, vix, 0
          );
      // adjust for hairpin/crescendo etc.
      while (selection2) {
        assignHairpinDynamics(score, selection2);
        assignTextBracketDynamics(score, selection2);
        const selector = selection2.selector;
        selection2 = SmoSelection.nextNoteSelectionIncludeVoice(score,
          selector.staff, selector.measure, selector.voice, selector.tick);
      }
      overallTick += mm.getMaxTicksVoice();
    });
  });
}
const updateForOrnaments = (note: SmoNote , key: string, previousNote: SmoNote | undefined) => {
  const trill: SmoOrnament | undefined = note.getOrnament('tr');
  const graceNotes: SmoGraceNote[] = note.getGraceNotes();
  const hasMordent = note.hasMordent();
  const hasTurn = note.hasTurn();
  if (graceNotes.length > 0 && previousNote) {
    const totalTicks = graceNotes.map((gn) => gn.tickCount()).reduce((a, b) => a + b, 0);
    const lastPlayedNote = previousNote.audioData.playedNotes[previousNote.audioData.playedNotes.length - 1];
    let exp = 1;
    while (lastPlayedNote.duration  <= totalTicks / exp) {
      exp *= 2;
    }
    lastPlayedNote.duration -= Math.floor(totalTicks / exp);
    graceNotes.forEach((gn) => {
      const gnTicks = Math.floor(gn.tickCount() / exp);
      previousNote.audioData.playedNotes.push({
        pitches: JSON.parse(JSON.stringify(gn.pitches)),
        duration: gnTicks,
        durationPct: 0.9
      });
    });
  }
  if (hasMordent) {
    const nplayables: PlayedNote[] = [];
    const oduration = note.audioData.playedNotes[0].duration;
    const lower = JSON.parse(JSON.stringify(note.audioData.playedNotes[0]));
    lower.duration = Math.min(Math.floor(oduration / 4), 2048);
    const upperPitches:Pitch[] = [];
    lower.pitches.forEach((lp:Pitch) => {
      const upperPitch = SmoMusic.getIntervalInKey(lp, key, 1);
      upperPitches.push(upperPitch);
    });
    const upper = JSON.parse(JSON.stringify(lower));
    upper.pitches = upperPitches;

    upper.duration = lower.duration;
    const lower2 = JSON.parse(JSON.stringify(note.audioData.playedNotes[0]));
    lower2.duration = oduration - (lower.duration + upper.duration);
    nplayables.push(lower);
    nplayables.push(upper);
    nplayables.push(lower2);
    note.audioData.playedNotes = nplayables;
  }
  else if (hasTurn) {
    const nplayables: PlayedNote[] = [];
    const oduration = note.audioData.playedNotes[0].duration;
    const nduration = Math.min(2048, oduration / 8);
    const original = JSON.parse(JSON.stringify(note.audioData.playedNotes[0]));
    const lower = JSON.parse(JSON.stringify(original));
    const upper = JSON.parse(JSON.stringify(original));
    const original2 = JSON.parse(JSON.stringify(original));
    const upperPitches:Pitch[] = [];
    const lowerPitches:Pitch[] = [];
    lower.pitches.forEach((lp:Pitch) => {
      const lowerPitch = SmoMusic.getIntervalInKey(lp, key, -1);
      lowerPitches.push(lowerPitch);
    });
    lower.pitches = lowerPitches;
    upper.pitches.forEach((up:Pitch) => {
      const upperPitch = SmoMusic.getIntervalInKey(up, key, 1);
      upperPitches.push(upperPitch);
    });
    upper.pitches = upperPitches;
    original.duration = nduration;
    lower.duration = nduration;
    upper.duration = nduration;
    original2.duration = oduration - (nduration * 3);
    nplayables.push(upper);
    nplayables.push(original);
    nplayables.push(lower);
    nplayables.push(original2);
    note.audioData.playedNotes = nplayables;
  }
  else if (trill) {
    // replace the root pitch with trilled pitches
    const nplayables: PlayedNote[] = [];
    // There should only be one, pre-trill
    for (let tx = 0; tx < note.audioData.playedNotes.length; ++tx) {
      const playedNote = note.audioData.playedNotes[tx];
      // The length of the trill
      let targetDuration = playedNote.duration;
      // The starting length of each note.  We decrease until we get the 1/2 that
      let trillDuration = 1024;
      const targetTrillDuration = trillDuration / 2;
      // Make a separate trill for each note in the chord, it will be an oscillator, or note on/off pair
      for (let ty = 0; ty < playedNote.pitches.length; ++ty) {
        // TODO: get upper note from ornament definition
        const lower = JSON.parse(JSON.stringify(playedNote.pitches[ty]));
        const upper = SmoMusic.getIntervalInKey(lower, key, 1);

        while (targetDuration > 0) {
          [lower, upper].forEach((opitch) => {
            if (targetDuration > 0) {
              nplayables.push({
                pitches: [JSON.parse(JSON.stringify(opitch))],
                duration: Math.min(trillDuration, targetDuration),
                durationPct: 1.0});
            }
            // decrease the duration by the trill note
            targetDuration -= trillDuration;
            // if this is < min time, decrease the note duration ~.707
            if (trillDuration > targetTrillDuration) {
              trillDuration /= Math.pow(2, 0.5)
            }
          });
        }
      }
      
    }
    note.audioData.playedNotes = nplayables;
  }
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
  // Keep track of the last note in a tie
  const tiedNotes: Record<number, SmoNote | undefined> = {};
  // Keep track of the previous note for any ornaments that borrow from the previous notes' duration
  const previousNote: Record<number, SmoNote | undefined> = {};
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
                  staff.staffId, mm.measureNumber.measureIndex, v, n
                  );
              if (selection && selection.note) {
                const note = selection.note;
                const tieLen = staff.getTiesStartingAt(selection.selector);
                const tiedNote = tiedNotes[currentTrack];
                // Is this note tied to a previous note?
                if (tiedNote) {
                  tiedNote.audioData.playedNotes.forEach((pn) => {
                    pn.duration += note.tickCount;
                    pn.durationPct = 1.0;
                  });
                  note.audioData.playedNotes = [];
                  // If the note is tied from a prevous note, is it also tied to the next note?
                  if (tieLen.length < 1) {
                    updateForOrnaments(tiedNote, mm.keySignature, previousNote[currentTrack]);
                    previousNote[currentTrack] = tiedNote;
                    tiedNotes[currentTrack] = undefined;
                  }
                } else if (tieLen.length) {
                  tiedNotes[currentTrack] = note;
                  note.audioData.playedNotes = [{
                    pitches: JSON.parse(JSON.stringify(note.pitches)),
                    duration: note.tickCount,
                    durationPct: 1.0
                  }];
                  // This would only do something if the last note is tied to nothing
                  updateForOrnaments(note, mm.keySignature, undefined);
                } else {
                  note.audioData.playedNotes = [{
                    pitches: JSON.parse(JSON.stringify(note.pitches)),
                    duration: note.tickCount,
                    durationPct: 1.0
                  }];
                  const articulations: SmoArticulation[] = note.getArticulations();
                  const staccato = 
                    articulations.findIndex((xx) => xx.articulation === SmoArticulation.articulations.staccato) >= 0;
                  const tenuto = 
                    articulations.findIndex((xx) => xx.articulation === SmoArticulation.articulations.tenuto) >= 0;
                  const marcato = 
                    articulations.findIndex((xx) => xx.articulation === SmoArticulation.articulations.marcato) >= 0;
                    // adjust duration for the articulation, otherwise made adjustments for any ornaments on the note
                  if (staccato && tenuto) {
                    note.audioData.playedNotes[0].durationPct = 0.85;
                  } else if (staccato) {
                    note.audioData.playedNotes[0].durationPct = 0.6;
                  }else if (tenuto) {
                    note.audioData.playedNotes[0].durationPct = 0.95;
                  } else if (marcato) {
                    note.audioData.playedNotes[0].durationPct = 0.45;
                  } else {
                    updateForOrnaments(note, mm.keySignature, previousNote[currentTrack]);
                  }
                  previousNote[currentTrack] = note;
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
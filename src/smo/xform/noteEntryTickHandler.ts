import { SmoMeasure } from '../data/measure';
import { SmoNote } from '../data/note';
import { Pitch, Ticks } from '../data/common';
import { SmoTickIterator } from './tickDuration';

export class NoteEntryTickHandler {
  static addNote(measure: SmoMeasure, voiceIndex: number, note: SmoNote, position: number): void {
    // Use tickDuration.ts API to add the note
    // This ensures all duration changes go through the proper API
  }
  
  static changeDuration(note: SmoNote, newDuration: Ticks): void {
    // Use tickDuration.ts API to change note duration
  }
  
  static addPitch(note: SmoNote, pitch: Pitch): void {
    // Add pitch to existing note
    note.toggleAddPitch(pitch);
  }
  
  static removePitch(note: SmoNote, pitchIndex: number): void {
    // Remove pitch from note
    if (note.pitches.length > pitchIndex) {
      note.pitches.splice(pitchIndex, 1);
    }
  }
}
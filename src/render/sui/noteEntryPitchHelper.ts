import { SmoMusic } from '../../smo/data/music';
import { Pitch } from '../../smo/data/common';
import { SvgBox, SvgHelpers } from './svgHelpers';

export class NoteEntryPitchHelper {
    // Constants for pitch calculation
  static readonly STAFF_LINE_HEIGHT = 10;
  static readonly MIDDLE_C_LINE_TREBLE = 2; // Middle C is on line 2 in treble clef
  static readonly MIDDLE_C_LINE_BASS = 4;   // Middle C is on line 4 in bass clef
  static readonly MIDDLE_C_LINE_ALTO = 3;   // Middle C is on line 3 in alto clef
  static readonly MIDDLE_C_LINE_TENOR = 3;  // Middle C is on line 3 in tenor clef
  
  // Pitch range validation
  static readonly MIN_MIDI_NOTE = 0;
  static readonly MAX_MIDI_NOTE = 127;

/**
   * Convert mouse coordinates within the caret to a pitch
   * @param mousePoint - Mouse coordinates as SvgBox
   * @param clef - The clef of the current measure
   * @param staffY - The Y position of the staff (from measure.staffY)
   * @returns Pitch object or null if outside valid range
   */
static mouseYToPitch(mousePoint: SvgBox, clef: string, staffY: number): Pitch | null {
    // Calculate the staff line position
    const relativeY = mousePoint.y - staffY;
    const linePosition = Math.round(relativeY / NoteEntryPitchHelper.STAFF_LINE_HEIGHT);
    
    // Convert line position to pitch based on clef
    const pitch = this.linePositionToPitch(linePosition, clef);
    
    // Validate pitch is within reasonable range
    if (this.isPitchInRange(pitch)) {
      return pitch;
    }
    
    return null;
  }

  /**
   * Convert staff line position to pitch based on clef
   */
  private static linePositionToPitch(linePosition: number, clef: string): Pitch {
    // Base pitches for different clefs
    const clefBasePitches: Record<string, Pitch> = {
      'treble': { letter: 'E', octave: 4, accidental: '' }, // E4 is on the first ledger line below
      'bass': { letter: 'G', octave: 2, accidental: '' },   // G2 is on the first ledger line below
      'alto': { letter: 'C', octave: 3, accidental: '' },   // C3 is on the middle line
      'tenor': { letter: 'C', octave: 3, accidental: '' }   // C3 is on the middle line
    };
    
    const basePitch = clefBasePitches[clef] || clefBasePitches['treble'];
    const pitchOffset = linePosition - 2; // Adjust based on clef position
    
    return this.addPitchOffset(basePitch, pitchOffset);
  }

  /**
   * Add offset to pitch (positive = up, negative = down)
   */
  private static addPitchOffset(pitch: Pitch, offset: number): Pitch {
    const noteValues = SmoMusic.noteValues;
    const currentValue = noteValues[pitch.letter];
    const newValue = currentValue + offset;
    
    // Convert back to pitch letter and octave
    const octaveChange = Math.floor(newValue / 7);
    const letterIndex = ((newValue % 7) + 7) % 7;
    const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    
    return {
      letter: letters[letterIndex],
      octave: pitch.octave + octaveChange,
      accidental: pitch.accidental
    };
  }

  /**
   * Check if pitch is within reasonable range
   */
  private static isPitchInRange(pitch: Pitch): boolean {
    const noteValues = SmoMusic.noteValues;
    const value = noteValues[pitch.letter] + (pitch.octave * 7);
    return value >= NoteEntryPitchHelper.MIN_MIDI_NOTE && 
           value <= NoteEntryPitchHelper.MAX_MIDI_NOTE;
  }

}
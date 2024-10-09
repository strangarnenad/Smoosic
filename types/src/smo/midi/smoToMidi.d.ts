import { SmoScore } from '../data/score';
/**
 * @category serialization
 */
export interface MidiTrackHash {
    track: any;
    lastMeasure: number;
}
/**
 * Convert a {@link SmoScore} object to MIDI
 * @category serialization
 */
export declare class SmoToMidi {
    /**
     * @param score
     * @returns Midi byte array that can be sent to a file upload widget
     */
    static convert(score: SmoScore): any;
}
//# sourceMappingURL=smoToMidi.d.ts.map
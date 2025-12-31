import { TimeSignature, SmoTempoText } from '../data/measureModifiers';
import { SmoScore } from '../data/score';
/**
 * @category serialization
 */
export interface MidiTrackHash {
    track: any;
    lastMeasure: number;
    timeSignature?: TimeSignature;
    tempo?: SmoTempoText;
    keySignature?: string;
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
    static convert(score: SmoScore): Uint8Array<ArrayBufferLike>;
}

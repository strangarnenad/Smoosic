import { TickMappable } from '../data/measure';
import { Pitch, TickAccidental } from '../data/common';
import { SmoNote } from '../data/note';
/**
 * create a map note durations at each index into the voice, including the accidentals at each duration.
 * return format:
 * ```
   tickmap = {
          totalDuration: 16384,
          durationMap:[2048,4096,..],  // A running total per tick
            deltaMap:[2048,2048...], a map of deltas
 ```
 * @category SmoTransform
 */
export declare class TickMap {
    keySignature: string;
    voice: number;
    notes: SmoNote[];
    index: number;
    startIndex: number;
    endIndex: number;
    totalDuration: number;
    delta: number;
    durationMap: number[];
    deltaMap: number[];
    accidentalMap: Record<string, TickAccidental>[];
    durationAccidentalMap: Record<string | number, Record<string, TickAccidental>>;
    constructor(measure: TickMappable, voiceIndex: number);
    _getAccidentalsForKey(map: Record<string, TickAccidental>): void;
    updateAccidentalMap(note: SmoNote): void;
    getActiveAccidental(pitch: Pitch, iteratorIndex: number, keySignature: string): string;
    get duration(): number;
    createMap(): void;
}
//# sourceMappingURL=tickMap.d.ts.map
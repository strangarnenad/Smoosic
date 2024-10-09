import { SmoNote } from '../data/note';
import { SmoAttrs } from '../data/common';
import { SmoMeasure, ISmoBeamGroup } from '../data/measure';
import { TickMap } from './tickMap';
/**
 * @category SmoTransform
 */
export interface SmoBeamGroupParams {
    notes: SmoNote[];
    voice: number;
}
/**
 * Contain a group of {@link SmoNote} used for beaming.
 * @category SmoTransform
 */
export declare class SmoBeamGroup implements ISmoBeamGroup {
    notes: SmoNote[];
    attrs: SmoAttrs;
    voice: number;
    constructor(params: SmoBeamGroupParams);
}
/**
 * Apply the beam policy set up in node and measure to group the notes into beam groups
 * @category SmoTransform
 */
export declare class SmoBeamer {
    static applyBeams(measure: SmoMeasure): void;
    measure: SmoMeasure;
    duration: number;
    measureDuration: number;
    meterNumbers: number[];
    beamBeats: number;
    skipNext: number;
    currentGroup: SmoNote[];
    constructor(measure: SmoMeasure, voice: number);
    get beamGroups(): ISmoBeamGroup[];
    _removeVoiceBeam(measure: SmoMeasure, voice: number): void;
    _completeGroup(voice: number): void;
    _advanceGroup(): void;
    _isRemainingTicksBeamable(tickmap: TickMap, index: number): boolean;
    allEighth(): boolean;
    beamNote(tickmap: TickMap, index: number, note: SmoNote): void;
    static areTupletElementsTheSame(noteOne: SmoNote, noteTwo: SmoNote): boolean;
}
//# sourceMappingURL=beamers.d.ts.map
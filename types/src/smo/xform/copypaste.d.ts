import { SmoSelection, SmoSelector } from './selections';
import { SmoNote } from '../data/note';
import { SmoMeasure, SmoVoice } from '../data/measure';
import { StaffModifierBase } from '../data/staffModifiers';
import { SmoTupletTree } from '../data/tuplet';
import { SmoScore } from '../data/score';
import { TickMap } from './tickMap';
import { SmoSystemStaff } from '../data/systemStaff';
/**
 * Used to calculate the offset and transposition of a note to be pasted
 * @category SmoTransform
 */
export interface PasteNote {
    note: SmoNote;
    selector: SmoSelector;
    originalKey: string;
    tupletStart: SmoTupletTree | null;
}
/**
 * Used when pasting staff modifiers like slurs to calculate the
 * offset
 * @category SmoTransform
 */
export interface ModifierPlacement {
    modifier: StaffModifierBase;
    ticksToStart: number;
}
/**
 * PasteBuffer holds copied music, and handles the action of pasting the music to
 * a different point in the score.  It does this by serializing the measure(s) from the source
 * and then creating handling the overlap with existing music when deserializaing it.
 * @category SmoTransform
 */
export declare class PasteBuffer {
    notes: PasteNote[];
    totalDuration: number;
    noteIndex: number;
    measures: SmoMeasure[];
    measureIndex: number;
    remainder: number;
    replacementMeasures: SmoSelection[];
    score: SmoScore | null;
    modifiers: StaffModifierBase[];
    modifiersToPlace: ModifierPlacement[];
    destination: SmoSelector;
    staffSelectors: SmoSelector[];
    constructor();
    setScore(score: SmoScore): void;
    getCopyBufferTickCount(): number;
    setSelections(score: SmoScore, selections: SmoSelection[]): void;
    _populateSelectArray(selections: SmoSelection[]): void;
    clearSelections(): void;
    _findModifier(selector: SmoSelector): StaffModifierBase | null;
    _findPlacedModifier(selector: SmoSelector): StaffModifierBase | null;
    _alignVoices(measure: SmoMeasure, voiceIndex: number): void;
    _populateMeasureArray(selector: SmoSelector): void;
    _populatePre(voiceIndex: number, measure: SmoMeasure, startTick: number, tickmap: TickMap): SmoVoice;
    /**
     *
     * @param voiceIndex
     */
    _populateVoice(): SmoVoice[];
    static _countTicks(voice: SmoVoice): number;
    /**
     * If the source contains a staff modifier that ends on the source selection, copy the modifier
     * @param srcSelector
     * @param destSelector
     * @param staff
     * @returns
     */
    _populateModifier(srcSelector: SmoSelector, destSelector: SmoSelector, staff: SmoSystemStaff): void;
    /**
     *
     * @param measure
     * @param startIndex
     * @param endIndex
     * @param voiceIndex
     * @private
     */
    private _removeOverlappingTuplets;
    /**
     * Start copying the paste buffer into the destination by copying the notes and working out
     * the measure overlap
     *
     * @param voice
     * @param measure
     * @param tickmap
     * @param startSelector
     * @returns
     */
    _populateNew(voice: SmoVoice, measure: SmoMeasure, tickmap: TickMap, startSelector: SmoSelector): void;
    _populatePost(voice: SmoVoice, voiceIndex: number, measure: SmoMeasure, tickmap: TickMap): void;
    _pasteVoiceSer(serializedMeasure: any, vobj: any, voiceIx: number): void;
    pasteSelections(selector: SmoSelector): void;
}
//# sourceMappingURL=copypaste.d.ts.map
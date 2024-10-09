import { SmoScore } from '../data/score';
import { SmoMeasure, SmoMeasureParamsSer } from '../data/measure';
import { SmoTextGroupContainer } from '../data/scoreText';
import { SmoSelector } from './selections';
/**
 * @category SmoTransform
 */
export interface UndoEntry {
    title: string;
    type: number;
    selector: SmoSelector;
    subtype: number;
    grouped: boolean;
    json?: any;
}
export declare function copyUndo(entry: UndoEntry): UndoEntry;
/**
 * A grouped set of undo actions, can be undone at once
 * @category SmoTransform
 */
export declare class UndoSet {
    buffers: UndoEntry[];
    constructor();
    get isEmpty(): boolean;
    push(entry: UndoEntry): void;
    pop(): UndoEntry | undefined;
    get length(): number;
}
/**
 * manage a set of undo or redo operations on a score.  The objects passed into
 * undo must implement serialize()/deserialize().
 * Only one undo buffer is kept for the score.  Undo is always done on the stored
 * score and translated to the display score.
 * UndoBuffer contains an undoEntry array.  An undoEntry might contain several
 * undo operations, if the were done together as a block.  This happens often when
 * several changes are made while a dialog box is open.
 * an undoEntry is one of 7 things:
 * * A single measure,
 * * A single staff
 *  * the whole score
 *  * a score modifier (text)
 *  * score attributes (layout, etc)
 *  * column - all the measures at one index
 *  * rectangle - a rectangle of measures
 * @category SmoTransform
 * */
export declare class UndoBuffer {
    static groupCount: number;
    static get bufferMax(): number;
    static get bufferTypes(): {
        FIRST: number;
        MEASURE: number;
        STAFF: number;
        SCORE: number;
        SCORE_MODIFIER: number;
        COLUMN: number;
        RECTANGLE: number;
        SCORE_ATTRIBUTES: number;
        STAFF_MODIFIER: number;
        PART_MODIFIER: number;
        LAST: number;
    };
    static get bufferSubtypes(): {
        NONE: number;
        ADD: number;
        REMOVE: number;
        UPDATE: number;
    };
    static get bufferTypeLabel(): string[];
    static serializeMeasure(measure: SmoMeasure): SmoMeasureParamsSer;
    buffer: UndoSet[];
    reconcile: number;
    opCount: number;
    _grouping: boolean;
    constructor();
    get grouping(): boolean;
    set grouping(val: boolean);
    reset(): void;
    /**
     * return true if any of the last 2 buffers have undo operations.
     * @returns
     */
    buffersAvailable(): boolean;
    /**
     * Add the current state of the score required to undo the next operation we
     * are about to perform.  For instance, if we are adding a crescendo, we back up the
     * staff the crescendo will go on.
     * @param title
     * @param type
     * @param selector
     * @param obj
     * @param subtype
     */
    addBuffer(title: string, type: number, selector: SmoSelector, obj: any, subtype: number): void;
    /**
     * Make sure we always have a buffer to record undoable operations
     */
    checkNull(): void;
    /**
     * Internal method to pop the top buffer off the stack.
     * @returns
     */
    popUndoSet(): UndoSet | null;
    /**
     * non-destructively get the top undo buffer.
     * @returns
     */
    peekUndoSet(): UndoSet | null;
    /**
     * return the type of the undo operation, so the view can know which
     * parts of the score are affected.
     * @param func
     * @returns
     */
    undoTypePeek(func: (buf: UndoEntry) => boolean): boolean;
    undoScorePeek(): boolean;
    undoScoreTextGroupPeek(): boolean;
    undoPartTextGroupPeek(): boolean;
    /**
     * Get the range of measures affected by the next undo operation.  Only
     * makes sense to call this if the undo type is MEASURE or COLUMN
     * @returns
     */
    getMeasureRange(): number[];
    /**
     * Undo for text is different since text is not associated with a specific part of the
     * score (usually)
     * @param score
     * @param staffMap
     * @param buf
     */
    undoTextGroup(score: SmoTextGroupContainer, staffMap: Record<number, number>, buf: UndoEntry): void;
    /**
     * Undo the operation at the top of the undo stack.  This is done by replacing
     * the music as it existed before the change was made.
     * @param score
     * @param staffMap
     * @param pop
     * @returns
     */
    undo(score: SmoScore, staffMap: Record<number, number>, pop: boolean): SmoScore;
}
//# sourceMappingURL=undo.d.ts.map
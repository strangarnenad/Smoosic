import { SmoNote } from '../data/note';
import { SmoMeasure } from '../data/measure';
import { TickMap } from './tickMap';
/**
 * Abstract class for classes that modifiy duration.
 * @category SmoTransform
 * @param note the note we're iterating over
 * @param tickmap the tickmap for the measure
 * @param index the index into the tickmap
 * @returns the note or notes that replace this one.  Null if this note is no longer in the measure
 */
export declare abstract class TickIteratorBase {
    iterateOverTick(note: SmoNote, tickmap: TickMap, index: number): SmoNote | SmoNote[] | null;
}
/**
 * SmoTickIterator
 * this is a local helper class that follows a pattern of iterating of the notes.  Most of the
 * duration changers iterate over a selection, and return:
 * - A note, if the duration changes
 * - An array of notes, if the notes split
 * - null if the note stays the same
 * - empty array, remove the note from the group
 * @category SmoTransform
 */
export declare class SmoTickIterator {
    notes: SmoNote[];
    newNotes: SmoNote[];
    actor: TickIteratorBase;
    measure: SmoMeasure;
    voice: number;
    keySignature: string;
    constructor(measure: SmoMeasure, actor: TickIteratorBase, voiceIndex: number);
    static nullActor(note: SmoNote): SmoNote;
    /**
     *
     * @param measure {SmoMeasure}
     * @param actor {}
     * @param voiceIndex
     */
    static iterateOverTicks(measure: SmoMeasure, actor: TickIteratorBase, voiceIndex: number): void;
    iterateOverTick(tickmap: TickMap, index: number, note: SmoNote): SmoNote | null;
    run(): SmoNote[];
}
/**
 * used to create a contract/dilate operation on a note via {@link SmoContractNoteActor}
 * @category SmoTransform
 */
export interface SmoContractNoteParams {
    startIndex: number;
    measure: SmoMeasure;
    voice: number;
    newStemTicks: number;
}
/**
 * Contract the duration of a note, filling in the space with another note
 * or rest.
 * @category SmoTransform
 * */
export declare class SmoContractNoteActor extends TickIteratorBase {
    startIndex: number;
    newStemTicks: number;
    measure: SmoMeasure;
    voice: number;
    constructor(params: SmoContractNoteParams);
    static apply(params: SmoContractNoteParams): void;
    iterateOverTick(note: SmoNote, tickmap: TickMap, index: number): SmoNote | SmoNote[] | null;
}
/**
 * Constructor when we want to double or dot the duration of a note (stretch)
 * for {@link SmoStretchNoteActor}
 * @param startIndex tick index into the measure
 * @param measure the container measure
 * @param voice the voice index
 * @param newTicks the ticks the new note will take up
 * @category SmoTransform
 */
export interface SmoStretchNoteParams {
    startIndex: number;
    measure: SmoMeasure;
    voice: number;
    newStemTicks: number;
}
/**
 * increase the length of a note, removing future notes in the measure as required
 * @category SmoTransform
 */
export declare class SmoStretchNoteActor extends TickIteratorBase {
    startIndex: number;
    newStemTicks: number;
    measure: SmoMeasure;
    voice: number;
    notes: SmoNote[];
    notesToInsert: SmoNote[];
    numberOfNotesToDelete: number;
    constructor(params: SmoStretchNoteParams);
    static apply(params: SmoStretchNoteParams): void;
    iterateOverTick(note: SmoNote, tickmap: TickMap, index: number): SmoNote[] | null;
    private areNotesInSameTuplet;
}
/**
 * constructor parameters for {@link SmoMakeTupletActor}
 * @category SmoTransform
 */
export interface SmoMakeTupletParams {
    measure: SmoMeasure;
    numNotes: number;
    notesOccupied: number;
    ratioed: boolean;
    bracketed: boolean;
    voice: number;
    index: number;
}
/**
 * Turn a tuplet into a non-tuplet of the same length
 * @category SmoTransform
 *
 * */
export declare class SmoMakeTupletActor extends TickIteratorBase {
    measure: SmoMeasure;
    numNotes: number;
    voice: number;
    index: number;
    notesOccupied: number;
    ratioed: boolean;
    bracketed: boolean;
    constructor(params: SmoMakeTupletParams);
    static apply(params: SmoMakeTupletParams): void;
    iterateOverTick(note: SmoNote, tickmap: TickMap, index: number): SmoNote[] | null;
    private _generateNotesForTuplet;
}
/**
 * Constructor params for {@link SmoUnmakeTupletActor}
 * @category SmoTransform
 */
export interface SmoUnmakeTupletParams {
    startIndex: number;
    endIndex: number;
    measure: SmoMeasure;
    voice: number;
}
/**
 * Convert a tuplet into a single note that takes up the whole duration
 * @category SmoTransform
 */
export declare class SmoUnmakeTupletActor extends TickIteratorBase {
    startIndex: number;
    endIndex: number;
    measure: SmoMeasure;
    voice: number;
    constructor(parameters: SmoUnmakeTupletParams);
    static apply(params: SmoUnmakeTupletParams): void;
    iterateOverTick(note: SmoNote, tickmap: TickMap, index: number): SmoNote[] | null;
}
//# sourceMappingURL=tickDuration.d.ts.map
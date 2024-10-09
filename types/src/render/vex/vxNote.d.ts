import { SmoNote } from '../../smo/data/note';
import { SmoLyric } from '../../smo/data/noteModifiers';
import { SmoMeasure, MeasureTickmaps } from '../../smo/data/measure';
import { StemmableNote, Note, TabNote } from '../../common/vex';
/**
 * @category SuiRender
 */
export interface VxMeasureIf {
    isWholeRest(): boolean;
    noteToVexMap: Record<string, Note>;
    smoMeasure: SmoMeasure;
    tickmapObject: MeasureTickmaps | null;
}
/**
 * @category SuiRender
 */
export interface VexNoteModifierIf {
    smoMeasure: SmoMeasure;
    vxMeasure: VxMeasureIf;
    smoNote: SmoNote;
    staveNote: Note;
    voiceIndex: number;
    tickIndex: number;
    tabNote?: StemmableNote | TabNote;
}
/**
 * Interpret parameters for StaveNote and other StemmableNotes
 * @category SuiRender
 */
export declare class VxNote {
    noteData: VexNoteModifierIf;
    constructor(noteData: VexNoteModifierIf);
    createMicrotones(smoNote: SmoNote, vexNote: Note): void;
    createDots(): void;
    /**
    * Create accidentals based on the active key and previous accidentals in this voice
    * @param smoNote
    * @param vexNote
    * @param tickIndex
    * @param voiceIx
    * @returns
    */
    createAccidentals(): void;
    createJazzOrnaments(): void;
    createOrnaments(): void;
    addLyricAnnotationToNote(vexNote: Note, lyric: SmoLyric): void;
    addChordChangeToNote(vexNote: Note, lyric: SmoLyric): void;
    createLyric(): void;
    createGraceNotes(): void;
    addArticulations(): void;
    addModifiers(): void;
}
//# sourceMappingURL=vxNote.d.ts.map
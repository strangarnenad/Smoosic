import { SuiMapper, SuiRendererBase } from './mapper';
import { StrokeInfo } from './svgHelpers';
import { SmoSelection, SmoSelector, ModifierTab } from '../../smo/xform/selections';
import { SmoScore } from '../../smo/data/score';
import { SvgBox, KeyEvent } from '../../smo/data/common';
import { SuiScroller } from './scroller';
import { SmoNote } from '../../smo/data/note';
import { SmoMeasure } from '../../smo/data/measure';
/**
 * SuiTracker
 * A tracker maps the UI elements to the logical elements ,and allows the user to
 *  move through the score and make selections, for navigation and editing.
 * @category SuiRender
 */
export declare class SuiTracker extends SuiMapper {
    idleTimer: number;
    musicCursorGlyph: SVGSVGElement | null;
    static get strokes(): Record<string, StrokeInfo>;
    constructor(renderer: SuiRendererBase, scroller: SuiScroller);
    get renderElement(): Element;
    get score(): SmoScore | null;
    getIdleTime(): number;
    getSelectedModifier(): ModifierTab | null;
    getSelectedModifiers(): ModifierTab[];
    static serializeEvent(evKey: KeyEvent | null): any;
    advanceModifierSelection(score: SmoScore, keyEv: KeyEvent | null): void;
    static stringifyBox(box: SvgBox): string;
    _getOffsetSelection(offset: number): SmoSelector;
    getSelectedGraceNotes(): ModifierTab[];
    isGraceNoteSelected(): boolean;
    _growGraceNoteSelections(offset: number): void;
    get autoPlay(): boolean;
    growSelectionRight(): void;
    _growSelectionRight(skipPlay: boolean): number;
    moveHome(score: SmoScore, evKey: KeyEvent): void;
    moveEnd(score: SmoScore, evKey: KeyEvent): void;
    growSelectionRightMeasure(): void;
    growSelectionLeft(): number;
    moveSelectionRight(skipPlay: boolean): void;
    moveSelectionLeft(): void;
    moveSelectionLeftMeasure(): void;
    moveSelectionRightMeasure(): void;
    _moveSelectionMeasure(offset: number): void;
    _moveStaffOffset(offset: number): void;
    removePitchSelection(): void;
    _moveSelectionPitch(index: number): void;
    moveSelectionPitchUp(): void;
    moveSelectionPitchDown(): void;
    moveSelectionUp(): void;
    moveSelectionDown(): void;
    containsArtifact(): boolean;
    _replaceSelection(nselector: SmoSelector, skipPlay: boolean): void;
    getFirstMeasureOfSelection(): SmoMeasure | null;
    getSelectedMeasures(): SmoSelection[];
    _addSelection(selection: SmoSelection): void;
    _selectFromToInStaff(score: SmoScore, sel1: SmoSelection, sel2: SmoSelection): void;
    _selectBetweenSelections(score: SmoScore, s1: SmoSelection, s2: SmoSelection): void;
    selectSuggestion(score: SmoScore, ev: KeyEvent): void;
    _setModifierAsSuggestion(artifact: ModifierTab): void;
    _setArtifactAsSuggestion(artifact: SmoSelection): void;
    _highlightModifier(): void;
    _highlightPitchSelection(note: SmoNote, index: number): void;
    _highlightActiveVoice(selection: SmoSelection): void;
    selectActiveVoice(): void;
    highlightSelection(): void;
    /**
     * Boxes are divided up into lines/systems already.  But we need
     * to put the correct box on the correct page.
     * @param boxes
     */
    drawSelectionRects(boxes: SvgBox[]): void;
    _drawRect(pBox: SvgBox | SvgBox[], strokeName: string): void;
}
//# sourceMappingURL=tracker.d.ts.map
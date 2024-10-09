import { SuiLyricSession } from '../../../render/sui/textEdit';
import { KeyEvent } from '../../../smo/data/common';
import { SuiScoreViewOperations } from '../../../render/sui/scoreViewOperations';
import { SmoSelection, SmoSelector } from '../../../smo/xform/selections';
import { BrowserEventSource } from '../../eventSource';
import { SuiComponentBase, SuiDialogNotifier } from './baseComponent';
import { SmoLyric } from '../../../smo/data/noteModifiers';
/**
 * @category SuiDialog
 */
export interface SuiNoteTextParams {
    id: string;
    classes: string;
    label: string;
    smoName: string;
    control: string;
    verse?: number;
}
/**
 * Base class for text editor components that navigate to
 * different notes.
 * This has the text editing dialog components for notes, such as lyrics.
 * Unlike components that are
 * actual dialog controls, these actually run a text editing session of some kind.
*
* The heirarchy of text editing objects goes:
* dialog -> component -> session -> editor
*
* ### editor
*  handles low-level events and renders the preview using one
* of the text layout objects.
*
* ### session
* creates and destroys editors, e.g. for lyrics that have a Different
* editor instance for each note.
*
* ### component
* is defined in the dialog, and creates/destroys the session based on input from
* the dialog
*
* ### dialog
* manages the coponent session, as well as other components of the text like font etc.
 * @category SuiDialog
 * */
export declare abstract class SuiNoteTextComponent extends SuiComponentBase {
    view: SuiScoreViewOperations;
    selection: SmoSelection;
    selector: SmoSelector;
    eventSource: BrowserEventSource;
    session: SuiLyricSession | null;
    value: SmoLyric | null;
    started: boolean;
    staticText: Record<string, string>;
    constructor(dialog: SuiDialogNotifier, parameter: SuiNoteTextParams);
    abstract startEditSession(): void;
    abstract endSession(): void;
    mouseMove(ev: any): void;
    show(): void;
    hide(): void;
    mouseClick(ev: any): void;
    _getInputElement(): any;
    get running(): boolean | null;
    evKey(evdata: KeyEvent): Promise<boolean>;
    setDialogLyric(): void;
    moveSelectionRight(): Promise<void>;
    moveSelectionLeft(): Promise<void>;
    removeText(): Promise<void>;
    _bind(): Promise<void>;
    getValue(): SmoLyric | null;
}
/**
 * manage a lyric session that moves from note to note and adds lyrics.
 * @category SuiDialog
**/
export declare class SuiLyricComponent extends SuiNoteTextComponent {
    altLabel: string;
    verse: number;
    constructor(dialog: SuiDialogNotifier, parameter: SuiNoteTextParams);
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    endSession(): Promise<void>;
    startEditSession(): void;
    bind(): void;
}
/**
 * manage a chord editing session that moves from note to note and adds chord symbols.
 * @category SuiDialog
 */
export declare class SuiChordComponent extends SuiNoteTextComponent {
    altLabel: string;
    verse: number;
    constructor(dialog: SuiDialogNotifier, parameter: SuiNoteTextParams);
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    endSession(): void;
    startEditSession(): void;
    bind(): void;
    setTextType(type: string | number): void;
    getTextType(): number;
}
//# sourceMappingURL=noteText.d.ts.map
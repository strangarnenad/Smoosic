import { SuiButtonComposite } from './components/button';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiDialogNotifier, SuiComponentParent, SuiBaseComponentParams } from './components/baseComponent';
/**
 * Buttons for working with grace notes
 * @category SuiDialog
 */
export declare class SuiGraceNoteButtonsComponent extends SuiComponentParent {
    addGraceNoteBtn: SuiButtonComposite;
    removeGraceNoteBtn: SuiButtonComposite;
    slashGraceNoteBtn: SuiButtonComposite;
    constructor(dialog: SuiDialogNotifier, params: SuiBaseComponentParams);
    getValue(): string;
    setValue(value: string): void;
    changed(): Promise<void>;
    get html(): import("../../common/htmlHelpers").DomBuilder;
    bind(): void;
}
/**
 * @category SuiDialog
 */
export declare class SuiGraceNoteAdapter extends SuiComponentAdapter {
    constructor(view: SuiScoreViewOperations);
    get modifyGraceNotes(): string;
    set modifyGraceNotes(value: string);
    commit(): Promise<void>;
    cancel(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiGraceNoteDialog extends SuiDialogAdapterBase<SuiGraceNoteAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=gracenote.d.ts.map
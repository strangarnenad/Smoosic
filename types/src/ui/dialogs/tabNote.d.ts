import { SmoTabNote } from '../../smo/data/noteModifiers';
import { SmoSelection } from '../../smo/xform/selections';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
/**
 * This is incomplete
 * @category SuiDialog
 */
export declare class SuiTabNoteAdapter extends SuiComponentAdapter {
    selections: SmoSelection[];
    tabNote: SmoTabNote;
    constructor(view: SuiScoreViewOperations, modifier?: SmoTabNote);
    get strings(): number[];
    set strings(value: number[]);
    commit(): Promise<void>;
    cancel(): Promise<void>;
    remove(): Promise<void>;
}
/**
 * This is incomplete
 * @category SuiDialog
 */
export declare class SuiTabNoteDialog extends SuiDialogAdapterBase<SuiTabNoteAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=tabNote.d.ts.map
import { SmoClefChange } from '../../smo/data/noteModifiers';
import { SmoNote } from '../../smo/data/note';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * Adapter to add a new stave
 * @category SuiDialog
 */
export declare class SuiClefChangeAdapter extends SuiComponentAdapter {
    clefChange: SmoClefChange;
    backup: SmoClefChange;
    smoNote: SmoNote | null;
    changed: boolean;
    constructor(view: SuiScoreViewOperations);
    cancel(): Promise<void>;
    commit(): Promise<void>;
    get clefType(): string;
    set clefType(value: string);
}
/**
 * clefs same as new part
 * @category SuiDialog
 */
export declare class SuiClefChangeDialog extends SuiDialogAdapterBase<SuiClefChangeAdapter> {
    /**
     * The template used to create the dialog components
     */
    static dialogElements: DialogDefinition;
    static createAndDisplay(parameters: SuiDialogParams): void;
    constructor(params: SuiDialogParams);
}
//# sourceMappingURL=clefChange.d.ts.map
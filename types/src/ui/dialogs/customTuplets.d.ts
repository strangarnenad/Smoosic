import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { MakeTupletOperation } from "../../smo/xform/operations";
/**
 * @category SuiDialog
 */
export declare class SuiCustomTupletAdapter extends SuiComponentAdapter {
    makeTuplet: MakeTupletOperation;
    constructor(view: SuiScoreViewOperations);
    commit(): Promise<void>;
    cancel(): Promise<void>;
    get numNotes(): number;
    set numNotes(value: number);
    get notesOccupied(): number;
    set notesOccupied(value: number);
    get ratioed(): boolean;
    set ratioed(value: boolean);
    get bracketed(): boolean;
    set bracketed(value: boolean);
}
export declare class SuiCustomTupletDialog extends SuiDialogAdapterBase<SuiCustomTupletAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=customTuplets.d.ts.map
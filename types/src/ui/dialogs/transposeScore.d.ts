import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * change editor and formatting defaults for this score.
 * @category SuiDialog
 */
export declare class SuiTransposeScoreAdapter extends SuiComponentAdapter {
    transposeOffset: number;
    constructor(view: SuiScoreViewOperations);
    get offset(): number;
    set offset(value: number);
    commit(): Promise<void>;
    cancel(): Promise<void>;
}
/**
 * change editor and formatting defaults for this score.
 * @category SuiDialog
 */
export declare class SuiTransposeScoreDialog extends SuiDialogAdapterBase<SuiTransposeScoreAdapter> {
    static dialogElements: DialogDefinition;
    get dimensionControls(): import("./components/baseComponent").SuiComponentBase[];
    constructor(params: SuiDialogParams);
    changed(): Promise<void>;
}
//# sourceMappingURL=transposeScore.d.ts.map
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SmoSystemGroup } from '../../smo/data/scoreModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
/**
 * Handle grouping of staves in the score, for brackets and also for vertical formatting
 * @category SuiDialog
 */
export declare class SuiStaffGroupDialogAdapter extends SuiComponentAdapter {
    staffGroup: SmoSystemGroup;
    constructor(view: SuiScoreViewOperations);
    commit(): Promise<any>;
    cancel(): Promise<any>;
    get leftConnector(): number;
    set leftConnector(val: number);
    get staffGroups(): SmoSystemGroup;
    set staffGroups(val: SmoSystemGroup);
}
/**
 * A staff group is a grouping of staves that can be bracketed and justified
 * @category SuiDialog
 */
export declare class SuiStaffGroupDialog extends SuiDialogAdapterBase<SuiStaffGroupDialogAdapter> {
    static dialogElements: DialogDefinition;
    static createAndDisplay(parameters: SuiDialogParams): void;
    getModifier(): SmoSystemGroup;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=staffGroup.d.ts.map
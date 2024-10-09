import { ViewMapEntry } from '../../render/sui/scoreView';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { StaffCheckComponent } from './components/staffComponents';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * Handle the mapping of visible staves to score staves
 * @category SuiDialog
 */
export declare class SuiScoreViewAdapter extends SuiComponentAdapter {
    originalView: ViewMapEntry[];
    currentView: ViewMapEntry[];
    constructor(view: SuiScoreViewOperations);
    cancel(): Promise<any>;
    commit(): Promise<any>;
    get scoreView(): ViewMapEntry[];
    set scoreView(value: ViewMapEntry[]);
}
/**
 * Handle the mapping of visible staves to score staves
 * @category SuiDialog
 */
export declare class SuiScoreViewDialog extends SuiDialogAdapterBase<SuiScoreViewAdapter> {
    static dialogElements: DialogDefinition;
    originalValue: number[];
    constructor(parameters: SuiDialogParams);
    get scoreViewCtrl(): StaffCheckComponent;
}
//# sourceMappingURL=scoreView.d.ts.map
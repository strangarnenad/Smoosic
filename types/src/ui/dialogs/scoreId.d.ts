import { SmoScoreInfo } from '../../smo/data/scoreModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * @category SuiDialog
 */
export declare class SuiScoreIdentificationAdapter extends SuiComponentAdapter {
    scoreInfo: SmoScoreInfo;
    backup: SmoScoreInfo;
    constructor(view: SuiScoreViewOperations);
    get title(): string;
    set title(value: string);
    get subTitle(): string;
    set subTitle(value: string);
    get composer(): string;
    set composer(value: string);
    get copyright(): string;
    set copyright(value: string);
    get name(): string;
    set name(value: string);
    commit(): Promise<void>;
    cancel(): Promise<any>;
}
/**
 * change editor and formatting defaults for this score.
 * @category SuiDialog
 */
export declare class SuiScoreIdentificationDialog extends SuiDialogAdapterBase<SuiScoreIdentificationAdapter> {
    static dialogElements: DialogDefinition;
    static createAndDisplay(parameters: SuiDialogParams): void;
    constructor(params: SuiDialogParams);
}
//# sourceMappingURL=scoreId.d.ts.map
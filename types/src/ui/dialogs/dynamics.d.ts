import { DialogDefinition, SuiDialogParams } from './dialog';
import { SmoDynamicText } from '../../smo/data/noteModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SmoSelection } from '../../smo/xform/selections';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
/**
 * Edit or remove dynamice, a SmoNote attribute adapter
 * @category SuiDialog
 */
export declare class SuiDynamicDialogAdapter extends SuiComponentAdapter {
    modifier: SmoDynamicText;
    backup: SmoDynamicText;
    selection: SmoSelection;
    constructor(view: SuiScoreViewOperations, modifier: SmoDynamicText);
    cancel(): Promise<void>;
    commit(): Promise<any>;
    get xOffset(): number;
    remove(): Promise<void>;
    set xOffset(value: number);
    get fontSize(): number;
    set fontSize(value: number);
    get yOffsetLine(): number;
    set yOffsetLine(value: number);
    get yOffsetPixels(): number;
    set yOffsetPixels(value: number);
    get text(): string;
    set text(value: string);
}
/**
 * @category SuiDialog
 */
export declare class SuiDynamicModifierDialog extends SuiDialogAdapterBase<SuiDynamicDialogAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=dynamics.d.ts.map
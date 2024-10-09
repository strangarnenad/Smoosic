import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SmoVolta } from '../../smo/data/measureModifiers';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
export type SmoVoltaNumberParam = 'startBar' | 'endBar' | 'xOffsetStart' | 'xOffsetEnd' | 'yOffset' | 'number';
/**
 * aka 2nd ending
 * @category SuiDialog
 */
export declare class SuiVoltaAdapter extends SuiComponentAdapter {
    volta: SmoVolta;
    backup: SmoVolta;
    changed: boolean;
    constructor(view: SuiScoreViewOperations, volta: SmoVolta);
    remove(): Promise<void>;
    cancel(): Promise<void>;
    commit(): Promise<any>;
    updateVolta(param: SmoVoltaNumberParam, value: number): void;
    get startBar(): number;
    set startBar(val: number);
    get endBar(): number;
    set endBar(val: number);
    get xOffsetStart(): number;
    set xOffsetStart(val: number);
    get xOffsetEnd(): number;
    set xOffsetEnd(val: number);
    get yOffset(): number;
    set yOffset(val: number);
    get number(): number;
    set number(val: number);
}
/**
 * aka second ending
 * @category SuiDialog
 */
export declare class SuiVoltaAttributeDialog extends SuiDialogAdapterBase<SuiVoltaAdapter> {
    static dialogElements: DialogDefinition;
    static createAndDisplay(parameters: SuiDialogParams): SuiVoltaAttributeDialog | null;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=volta.d.ts.map
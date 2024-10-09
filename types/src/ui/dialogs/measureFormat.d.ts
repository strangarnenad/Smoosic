import { SmoMeasure } from '../../smo/data/measure';
import { SmoMeasureFormat, SmoMeasureFormatNumberAttributes, SmoMeasueFormatBooleanAttributes } from '../../smo/data/measureModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
/**
 * @category SuiDialog
 */
export declare class SuiMeasureFormatAdapter extends SuiComponentAdapter {
    format: SmoMeasureFormat;
    backup: SmoMeasureFormat;
    measure: SmoMeasure;
    renumberIndex: number;
    originalIndex: number;
    edited: boolean;
    constructor(view: SuiScoreViewOperations, measure: SmoMeasure);
    writeNumber(param: SmoMeasureFormatNumberAttributes, value: number): void;
    writeBoolean(param: SmoMeasueFormatBooleanAttributes, value: boolean): void;
    commit(): Promise<any>;
    cancel(): Promise<void>;
    get padLeft(): number;
    set padLeft(value: number);
    get skipMeasureCount(): boolean;
    set skipMeasureCount(value: boolean);
    get localIndex(): number;
    set localIndex(value: number);
    get forceRest(): boolean;
    set forceRest(value: boolean);
    get repeatSymbol(): boolean;
    set repeatSymbol(value: boolean);
    get restBreak(): boolean;
    set restBreak(value: boolean);
    get customStretch(): number;
    set customStretch(value: number);
    get customProportion(): number;
    set customProportion(value: number);
    get autoJustify(): boolean;
    set autoJustify(value: boolean);
    get padAllInSystem(): boolean;
    set padAllInSystem(value: boolean);
    get systemBreak(): boolean;
    set systemBreak(value: boolean);
}
/**
 * This file contains dialogs that affect all measures at a certain position (column),
 * such as tempo or time signature.
 * @category SuiDialog
 */
export declare class SuiMeasureDialog extends SuiDialogAdapterBase<SuiMeasureFormatAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=measureFormat.d.ts.map
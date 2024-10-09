import { SmoMeasure } from '../../smo/data/measure';
import { TimeSignature } from '../../smo/data/measureModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
/**
 * Time signature score mapping
 * @category SuiDialog
 */
export declare class SuiTimeSignatureAdapter extends SuiComponentAdapter {
    measure: SmoMeasure;
    backup: TimeSignature;
    constructor(view: SuiScoreViewOperations);
    get numerator(): number;
    set numerator(value: number);
    get denominator(): number;
    set denominator(value: number);
    get display(): boolean;
    set display(value: boolean);
    get useSymbol(): boolean;
    set useSymbol(value: boolean);
    get customString(): string;
    set customString(value: string);
    commit(): Promise<void>;
    cancel(): Promise<any>;
}
/**
 * Time signature score mapping
 * @category SuiDialog
 */
export declare class SuiTimeSignatureDialog extends SuiDialogAdapterBase<SuiTimeSignatureAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=timeSignature.d.ts.map
import { Clef } from '../../smo/data/common';
import { SmoInstrument, SmoInstrumentNumParamType, SmoInstrumentStringParamType } from '../../smo/data/staffModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
/**
 * For new parts but also edit existing parts
 * @category SuiDialog
 */
export declare class SuiNewPartAdapter extends SuiComponentAdapter {
    instrument: SmoInstrument;
    constructor(view: SuiScoreViewOperations);
    writeNumParam(paramName: SmoInstrumentNumParamType, value: number): void;
    writeStringParam(paramName: SmoInstrumentStringParamType, value: string): void;
    get transposeIndex(): number;
    set transposeIndex(value: number);
    get instrumentName(): string;
    get subFamily(): string;
    set subFamily(value: string);
    set instrumentName(value: string);
    get clef(): Clef;
    set clef(value: Clef);
    commit(): Promise<void>;
    cancel(): Promise<any>;
}
/**
 * @category SuiDialog
 */
export declare class SuiNewPartDialog extends SuiDialogAdapterBase<SuiNewPartAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=newPart.d.ts.map
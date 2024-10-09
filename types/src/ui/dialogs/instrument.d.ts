import { Clef } from '../../smo/data/common';
import { SmoInstrument, SmoInstrumentNumParamType, SmoInstrumentStringParamType } from '../../smo/data/staffModifiers';
import { SmoSelection, SmoSelector } from '../../smo/xform/selections';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
/**
 * Instrument applies to some or all of a part or stave.
 * @category SuiDialog
 */
export declare class SuiInstrumentAdapter extends SuiComponentAdapter {
    instrument: SmoInstrument;
    backup: SmoInstrument;
    selections: SmoSelection[];
    selector: SmoSelector;
    applies: number;
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
    get applyTo(): number;
    set applyTo(value: number);
    commit(): Promise<void>;
    cancel(): Promise<void>;
    remove(): Promise<any>;
}
/**
 * Instrument applies to some or all of a part or stave.
 * @category SuiDialog
 */
export declare class SuiInstrumentDialog extends SuiDialogAdapterBase<SuiInstrumentAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=instrument.d.ts.map
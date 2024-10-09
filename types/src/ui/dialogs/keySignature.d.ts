import { SmoSelection } from '../../smo/xform/selections';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { SmoMeasure } from '../../smo/data/measure';
/**
 * @category SuiDialog
 */
export declare class SuiKeySignatureAdapter extends SuiComponentAdapter {
    keySignature: string;
    applyToAll: boolean;
    applyToSelections: boolean;
    applyToRemaining: boolean;
    edited: boolean;
    measure: SmoMeasure;
    constructor(view: SuiScoreViewOperations, measure: SmoMeasure);
    cancel(): Promise<void>;
    applySelections(selections: SmoSelection[]): void;
    apply(): Promise<void>;
    get applyTo(): string;
    set applyTo(val: string);
    commit(): Promise<void>;
    get key(): string;
    set key(value: string);
}
/**
 * @category SuiDialog
 */
export declare class SuiKeySignatureDialog extends SuiDialogAdapterBase<SuiKeySignatureAdapter> {
    static dialogElements: DialogDefinition;
    changed(): Promise<void>;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=keySignature.d.ts.map
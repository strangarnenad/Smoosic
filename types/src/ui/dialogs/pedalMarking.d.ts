import { DialogDefinition, SuiDialogParams } from './dialog';
import { SmoPedalMarking } from '../../smo/data/staffModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
/**
 * Organ pedal markings
 * @category SuiDialog
 */
export declare class SuiPedalMarkingAdapter extends SuiComponentAdapter {
    backup: SmoPedalMarking;
    pedalMarking: SmoPedalMarking;
    changed: boolean;
    constructor(view: SuiScoreViewOperations, bracket: SmoPedalMarking);
    cancel(): Promise<void>;
    remove(): Promise<void>;
    commit(): Promise<void>;
    get depressText(): string;
    set depressText(val: string);
    get releaseText(): string;
    set releaseText(val: string);
    get bracket(): boolean;
    set bracket(val: boolean);
    get startMark(): boolean;
    set startMark(val: boolean);
    get releaseMark(): boolean;
    set releaseMark(val: boolean);
}
/**
 * @category SuiDialog
 */
export declare class SuiPedalMarkingDialog extends SuiDialogAdapterBase<SuiPedalMarkingAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    changed(): Promise<void>;
}
//# sourceMappingURL=pedalMarking.d.ts.map
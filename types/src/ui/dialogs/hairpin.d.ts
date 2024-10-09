import { DialogDefinition, SuiDialogParams } from './dialog';
import { SmoStaffHairpin } from '../../smo/data/staffModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
export type SmoHairpinNumberParams = 'xOffsetLeft' | 'xOffsetRight' | 'yOffset' | 'height' | 'position';
/**
 * @category SuiDialog
 */
export declare class SuiHairpinAdapter extends SuiComponentAdapter {
    backup: SmoStaffHairpin;
    hairpin: SmoStaffHairpin;
    changed: boolean;
    constructor(view: SuiScoreViewOperations, hairpin: SmoStaffHairpin);
    cancel(): Promise<void>;
    remove(): Promise<void>;
    commit(): Promise<any>;
    updateValue(param: SmoHairpinNumberParams, val: number): Promise<void>;
    get xOffsetLeft(): number;
    set xOffsetLeft(val: number);
    get xOffsetRight(): number;
    set xOffsetRight(val: number);
    get yOffset(): number;
    set yOffset(val: number);
    get height(): number;
    set height(val: number);
    get position(): number;
    set position(val: number);
}
/**
 * @category SuiDialog
 */
export declare class SuiHairpinAttributesDialog extends SuiDialogAdapterBase<SuiHairpinAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=hairpin.d.ts.map
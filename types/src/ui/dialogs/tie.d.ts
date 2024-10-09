import { DialogDefinition, SuiDialogParams } from './dialog';
import { SmoTie, TieLine } from '../../smo/data/staffModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
export type TieNumber = 'tie_spacing' | 'cp1' | 'cp2' | 'first_x_shift' | 'last_x_shift' | 'y_shift';
/**
 * Edit tie mapping for pitches on chords
 * @category SuiDialog
 */
export declare class SuiTieAdapter extends SuiComponentAdapter {
    tie: SmoTie;
    backup: SmoTie;
    changed: boolean;
    constructor(view: SuiScoreViewOperations, tie: SmoTie);
    writeTieNumber(value: number, param: TieNumber): void;
    get lines(): TieLine[];
    set lines(value: TieLine[]);
    get tie_spacing(): number;
    set tie_spacing(value: number);
    get first_x_shift(): number;
    set first_x_shift(value: number);
    get last_x_shift(): number;
    set last_x_shift(value: number);
    get y_shift(): number;
    set y_shift(value: number);
    get cp1(): number;
    set cp1(value: number);
    get cp2(): number;
    set cp2(value: number);
    commit(): Promise<any>;
    cancel(): Promise<void>;
    remove(): Promise<void>;
}
/**
 * Edit tie mapping for pitches on chords
 * @category SuiDialog
 */
export declare class SuiTieAttributesDialog extends SuiDialogAdapterBase<SuiTieAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=tie.d.ts.map
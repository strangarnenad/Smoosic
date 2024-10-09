import { DialogDefinition, SuiDialogParams } from './dialog';
import { SmoSlur } from '../../smo/data/staffModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
export type SlurNumber = 'spacing' | 'thickness' | 'xOffset' | 'yOffset' | 'position' | 'position_end' | 'cp1x' | 'cp1y' | 'cp2x' | 'cp2y' | 'orientation';
/**
 * Slur properties
 * @category SuiDialog
 */
export declare class SuiSlurAdapter extends SuiComponentAdapter {
    slur: SmoSlur;
    backup: SmoSlur;
    changed: boolean;
    updating: boolean;
    constructor(view: SuiScoreViewOperations, slur: SmoSlur);
    writeSlurNumber(view: SuiScoreViewOperations, slur: SmoSlur, key: SlurNumber, value: number): void;
    cancel(): Promise<void>;
    commit(): Promise<any>;
    get resetAll(): boolean;
    set resetAll(value: boolean);
    get resetDefaults(): boolean;
    set resetDefaults(value: boolean);
    get cp2y(): number;
    set cp2y(value: number);
    get cp2x(): number;
    set cp2x(value: number);
    get cp1y(): number;
    set cp1y(value: number);
    get cp1x(): number;
    set cp1x(value: number);
    get orientation(): number;
    set orientation(value: number);
    get position_end(): number;
    set position_end(value: number);
    get position(): number;
    set position(value: number);
    get yOffset(): number;
    set yOffset(value: number);
    get xOffset(): number;
    set xOffset(value: number);
    get thickness(): number;
    set thickness(value: number);
    get spacing(): number;
    set spacing(value: number);
    remove(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiSlurAttributesDialog extends SuiDialogAdapterBase<SuiSlurAdapter> {
    static dialogElements: DialogDefinition;
    disableClose(): void;
    enableClose(): void;
    modalPromise(): Promise<void>;
    changed(): Promise<void>;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=slur.d.ts.map
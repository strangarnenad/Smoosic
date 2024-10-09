import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { SuiButtonArrayMSComponent } from './components/buttonArray';
import { SuiDialogNotifier, SuiBaseComponentParams } from './components/baseComponent';
/**
 * ornament buttons
 * @category SuiDialog
 */
export declare class SuiOrnamentButtonComponent extends SuiButtonArrayMSComponent {
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
}
/**
 * initialize the ornament button array, based on current selections.
 * Maintain the array as it changes.
 * @category SuiDialog
 */
export declare class SuiOrnamentAdapter extends SuiComponentAdapter {
    static get ornamentIdMap(): Record<string, string>;
    static ornamentTypeToId(ot: string): string | null;
    static get ornamentIdMapRvs(): Record<string, string>;
    codes: string[];
    setValues: Record<string, boolean>;
    positionCode: string;
    constructor(view: SuiScoreViewOperations);
    get ornaments(): string[];
    set ornaments(value: string[]);
    commit(): Promise<void>;
    cancel(): Promise<void>;
    remove(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiOrnamentDialog extends SuiDialogAdapterBase<SuiOrnamentAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    changed(): Promise<void>;
}
//# sourceMappingURL=ornament.d.ts.map
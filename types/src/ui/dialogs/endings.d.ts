import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { getButtonsFcn, SuiButtonArrayComponent } from './components/buttonArray';
import { SuiDialogNotifier, SuiBaseComponentParams } from './components/baseComponent';
/**
 * @category SuiDialog
 * Buttons with ending or repeat functions
 * @returns SuiButtonArrayParameters
 */
export declare const endingsButtonFactory: getButtonsFcn;
/**
 * @category SuiDialog
 */
export declare class SuiEndBarButtonComponent extends SuiButtonArrayComponent {
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
}
/**
 * @category SuiDialog
 */
export declare class SuiStartBarButtonComponent extends SuiButtonArrayComponent {
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
}
/**
 * @category SuiDialog
 */
export declare class SuiRepeatSymbolButtonComponent extends SuiButtonArrayComponent {
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
}
/**
 * Smo dialog adapter for measure endings and repeats.
 * @category SuiDialog
 */
export declare class SuiEndingsAdapter extends SuiComponentAdapter {
    startBarCode: string;
    endBarCode: string;
    repeatSymbolCode: string;
    constructor(view: SuiScoreViewOperations);
    get repeatSymbolComponent(): string;
    set repeatSymbolComponent(value: string);
    get endBarComponent(): string;
    set endBarComponent(value: string);
    get startBarComponent(): string;
    set startBarComponent(value: string);
    commit(): Promise<void>;
    cancel(): Promise<void>;
    remove(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiEndingsDialog extends SuiDialogAdapterBase<SuiEndingsAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    changed(): Promise<void>;
}

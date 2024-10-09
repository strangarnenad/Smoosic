import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { SuiButtonArrayComponent } from './components/buttonArray';
import { SuiDialogNotifier, SuiBaseComponentParams } from './components/baseComponent';
/**
 * @category SuiDialog
 */
export declare class SuiMicrotoneButtonComponent extends SuiButtonArrayComponent {
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
}
/**
 * @category SuiDialog
 */
export declare class SuiMicrotoneAdapter extends SuiComponentAdapter {
    toneString: string;
    constructor(view: SuiScoreViewOperations);
    get tone(): string;
    set tone(value: string);
    commit(): Promise<void>;
    cancel(): Promise<void>;
    remove(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiMicrotoneDialog extends SuiDialogAdapterBase<SuiMicrotoneAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    changed(): Promise<void>;
}
//# sourceMappingURL=microtones.d.ts.map
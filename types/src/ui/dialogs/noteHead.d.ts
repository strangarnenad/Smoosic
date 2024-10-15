import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { SuiButtonArrayComponent } from './components/buttonArray';
import { SuiDialogNotifier, SuiBaseComponentParams } from './components/baseComponent';
/**
 * @category SuiDialog
 */
export declare class SuiNoteHeadButtonComponent extends SuiButtonArrayComponent {
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
}
/**
 * @category SuiDialog
 */
export declare class SuiStemButtonComponent extends SuiButtonArrayComponent {
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
}
/**
 * @category SuiDialog
 */
export declare class SuiNoteHeadAdapter extends SuiComponentAdapter {
    code: string;
    stemCode: string;
    constructor(view: SuiScoreViewOperations);
    get stemComponent(): string;
    set stemComponent(value: string);
    get noteHead(): string;
    set noteHead(value: string);
    commit(): Promise<void>;
    cancel(): Promise<void>;
    remove(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiNoteHeadDialog extends SuiDialogAdapterBase<SuiNoteHeadAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=noteHead.d.ts.map
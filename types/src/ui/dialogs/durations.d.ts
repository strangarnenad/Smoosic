import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiButtonComposite } from './components/button';
import { SuiComponentParent } from './components/baseComponent';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { SuiDialogNotifier, SuiBaseComponentParams } from './components/baseComponent';
/**
 * Button component for changing duration of a note.
 * @category SuiDialog
 */
export declare class SuiDurationButtonComponent extends SuiComponentParent {
    growDurationComponent: SuiButtonComposite;
    lessDurationComponent: SuiButtonComposite;
    growDotComponent: SuiButtonComposite;
    lessDotComponent: SuiButtonComposite;
    constructor(dialog: SuiDialogNotifier, params: SuiBaseComponentParams);
    getValue(): string;
    setValue(value: string): void;
    changed(): Promise<void>;
    get html(): import("../../common/htmlHelpers").DomBuilder;
    bind(): void;
}
/**
 * Run the duration transform functions
 * @category SuiDialog
 */
export declare class SuiDurationAdapter extends SuiComponentAdapter {
    constructor(view: SuiScoreViewOperations);
    get durationButtons(): string;
    set durationButtons(value: string);
    cancel(): Promise<void>;
    commit(): Promise<void>;
}
/**
 * Dialog for chaning the duration
 * @category SuiDialog
 */
export declare class SuiDurationDialog extends SuiDialogAdapterBase<SuiDurationAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=durations.d.ts.map
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiButtonComposite } from './components/button';
import { SuiComponentParent } from './components/baseComponent';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { SuiButtonArrayComponent } from './components/buttonArray';
import { SuiDialogNotifier, SuiBaseComponentParams } from './components/baseComponent';
/**
 * Pitch and chord manipulation components.
 * @category SuiDialog
 */
export declare class SuiTransposeButtonComponent extends SuiComponentParent {
    upOctaveComponent: SuiButtonComposite;
    downOctaveComponent: SuiButtonComposite;
    upStepComponent: SuiButtonComposite;
    downStepComponent: SuiButtonComposite;
    toggleEnharmonicComponent: SuiButtonComposite;
    toggleCourtesyComponent: SuiButtonComposite;
    constructor(dialog: SuiDialogNotifier, params: SuiBaseComponentParams);
    getValue(): string;
    setValue(value: string): void;
    changed(): Promise<void>;
    get html(): import("../../common/htmlHelpers").DomBuilder;
    bind(): void;
}
/**
 * @category SuiDialog
 */
export declare class SuiIntervalButtonComponent extends SuiButtonArrayComponent {
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
}
/**
 * @category SuiDialog
 */
export declare class SuiLetterButtonComponent extends SuiButtonArrayComponent {
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
}
/**
 * UI to manage SmoNote pitch arrays
 * @category SuiDialog
 */
export declare class SuiPitchAdapter extends SuiComponentAdapter {
    static intervalUp: string[];
    static intervalDown: string[];
    constructor(view: SuiScoreViewOperations);
    get transposeButtons(): string;
    set transposeButtons(value: string);
    get intervalButtons(): string;
    set intervalButtons(value: string);
    get pitchButtons(): string;
    set pitchButtons(value: string);
    cancel(): Promise<void>;
    commit(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiPitchDialog extends SuiDialogAdapterBase<SuiPitchAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=pitch.d.ts.map
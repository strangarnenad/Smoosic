import { SuiComponentBase, SuiDialogNotifier, SuiComponentParent, SuiBaseComponentParams } from '../components/baseComponent';
import { SuiScoreViewOperations } from '../../../render/sui/scoreViewOperations';
import { SuiButtonComponentParams } from './button';
/**
 * @category SuiDialog
 */
export interface SuiButtonComponentRowParameters {
    label: string;
    classes: string;
    buttons: SuiButtonComponentParams[];
}
/**
 * @category SuiDialog
 */
export interface SuiButtonArrayParameters {
    label: string;
    rows: SuiButtonComponentRowParameters[];
}
/**
 * @category SuiDialog
 */
declare interface SuiButtonCompositeParams extends SuiButtonComponentParams {
    parentControl: SuiComponentParent;
}
/**
 * An array of related buttons in a dialog, e.g. for articulations
 * @category SuiDialog
 */
export declare class SuiButtonArrayButton extends SuiComponentBase {
    icon: string;
    classes: string;
    position?: string;
    text?: string;
    iButtonState: number;
    parentControl: SuiComponentParent;
    static buttonStateString: string[];
    static buttonState: Record<string, number>;
    constructor(dialog: SuiDialogNotifier, parameters: SuiButtonCompositeParams);
    get buttonStateString(): string;
    get buttonState(): number;
    set buttonState(value: number);
    clearState(): void;
    get iconHtml(): import("../../../common/htmlHelpers").DomBuilder;
    get textHtml(): import("../../../common/htmlHelpers").DomBuilder;
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    updateControls(): void;
    bind(): void;
}
/**
 * @category SuiDialog
 */
export interface SuiButtonComponentRow {
    label: string;
    classes: string;
    buttons: SuiButtonArrayButton[];
}
export type getButtonsFcn = () => SuiButtonArrayParameters;
/**
 * @category SuiDialog
 */
export declare abstract class SuiButtonArrayBase extends SuiComponentParent {
    view: SuiScoreViewOperations;
    buttonRows: SuiButtonComponentRow[];
    pressed: string;
    shellCreated: boolean;
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams, buttonFactory: getButtonsFcn);
    updateControls(): void;
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    abstract changed(): void;
    abstract bind(): void;
}
/**
 * A button array component with single-select behavior
 * @category SuiDialog
 */
export declare class SuiButtonArrayComponent extends SuiButtonArrayBase {
    pressed: string;
    shellCreated: boolean;
    initialValue: boolean;
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams, buttonFactory: getButtonsFcn);
    getValue(): string;
    updateValues(): void;
    setValue(val: string): void;
    changed(): void;
    bind(): void;
}
/**
 * A button array with multi-select behavior.
 * @category SuiDialog
 */
export declare class SuiButtonArrayMSComponent extends SuiButtonArrayBase {
    pressedArray: string[];
    initialValue: boolean;
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams, buttonFactory: getButtonsFcn);
    getValue(): string[];
    setValue(val: string[]): void;
    updateValues(): void;
    changed(): void;
    bind(): void;
}
export {};
//# sourceMappingURL=buttonArray.d.ts.map
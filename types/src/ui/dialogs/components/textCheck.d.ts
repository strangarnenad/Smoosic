import { SuiComponentBase, SuiDialogNotifier } from '../components/baseComponent';
import { SuiToggleComposite } from '../components/toggle';
import { SuiTextInputComposite } from '../components/textInput';
import { SuiScoreViewOperations } from '../../../render/sui/scoreViewOperations';
/**
 * @category SuiDialog
 */
export interface TextCheckComponentParams {
    id: string;
    classes: string;
    label: string;
    smoName: string;
    control: string;
}
/**
 * @category SuiDialog
 */
export interface TextCheckPair {
    checked: boolean;
    text: string;
}
/**
 * @category SuiDialog
 */
export declare class TextCheckComponent extends SuiComponentBase {
    view: SuiScoreViewOperations;
    staticText: Record<string, string>;
    toggleCtrl: SuiToggleComposite;
    textCtrl: SuiTextInputComposite;
    defaultValue: string;
    constructor(dialog: SuiDialogNotifier, parameter: TextCheckComponentParams);
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    getInputElement(): any;
    getValue(): TextCheckPair;
    setValue(val: TextCheckPair): void;
    changed(): void;
    bind(): void;
}
//# sourceMappingURL=textCheck.d.ts.map
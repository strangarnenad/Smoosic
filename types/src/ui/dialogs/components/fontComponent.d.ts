import { SuiComponentBase, SuiDialogNotifier } from './baseComponent';
import { SuiDropdownComposite } from './dropdown';
import { SuiRockerComposite } from './rocker';
import { SuiToggleComposite } from './toggle';
import { FontInfo } from '../../../common/vex';
/**
 * @category SuiDialog
 */
export interface SuiFontComponentParams {
    id: string;
    classes: string;
    label: string;
    smoName: string;
    control: string;
}
/**
 * Dialog component that lets user choose and customize fonts.
 * @category SuiDialog
 */
export declare class SuiFontComponent extends SuiComponentBase {
    familyPart: SuiDropdownComposite;
    sizePart: SuiRockerComposite;
    italicsCtrl: SuiToggleComposite;
    boldCtrl: SuiToggleComposite;
    constructor(dialog: SuiDialogNotifier, parameter: SuiFontComponentParams);
    changed(): void;
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    _getInputElement(): any;
    getValue(): FontInfo;
    setValue(value: FontInfo): void;
    bind(): void;
}
//# sourceMappingURL=fontComponent.d.ts.map
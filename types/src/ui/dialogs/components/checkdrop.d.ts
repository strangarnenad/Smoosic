import { SuiDialogNotifier, DialogDefinitionElement, SuiComponentParent } from '../components/baseComponent';
import { SuiToggleComposite } from '../components/toggle';
import { SuiDropdownComposite } from '../components/dropdown';
/**
 * @category SuiDialog
 */
export interface CheckboxDropdownComponentParams {
    id: string;
    classes: string;
    label: string;
    smoName: string;
    control: string;
    toggleElement: DialogDefinitionElement;
    dropdownElement: DialogDefinitionElement;
}
/**
 * A checkbox that enables a dropdown component, for optional or dependent parameter
 * @category SuiDialog
 */
export declare class CheckboxDropdownComponent extends SuiComponentParent {
    toggleCtrl: SuiToggleComposite;
    dropdownCtrl: SuiDropdownComposite;
    constructor(dialog: SuiDialogNotifier, parameter: CheckboxDropdownComponentParams);
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    bind(): void;
    changed(): void;
}
//# sourceMappingURL=checkdrop.d.ts.map
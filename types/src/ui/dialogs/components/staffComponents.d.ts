import { SuiComponentBase, SuiDialogNotifier } from './baseComponent';
import { SuiToggleComposite } from './toggle';
import { SuiScoreViewOperations } from '../../../render/sui/scoreViewOperations';
import { SmoSystemGroup } from '../../../smo/data/scoreModifiers';
/**
 * @category SuiDialog
 */
export interface StaffAddControlRow {
    showCtrl: SuiToggleComposite;
}
/**
 * @category SuiDialog
 */
export interface StaffAddRemoveComponentParams {
    id: string;
    classes: string;
    label: string;
    smoName: string;
    control: string;
}
/**
 * A checkbox attached to a stave identifier
 * @category SuiDialog
 */
export declare class StaffAddRemoveComponent extends SuiComponentBase {
    staffRows: StaffAddControlRow[];
    view: SuiScoreViewOperations;
    createdShell: boolean;
    staticText: Record<string, string>;
    modifier: SmoSystemGroup | null;
    constructor(dialog: SuiDialogNotifier, parameter: StaffAddRemoveComponentParams);
    setControlRows(): void;
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    getInputElement(): any;
    getValue(): SmoSystemGroup;
    setValue(staffGroup: SmoSystemGroup): void;
    changed(): void;
    bind(): void;
    updateGroupMembership(): void;
}
/**
 * @category SuiDialog
 */
export interface StaffCheckComponentParams {
    id: string;
    classes: string;
    label: string;
    smoName: string;
    control: string;
}
/**
 * @category SuiDialog
 */
export interface StaffCheckControlRow {
    showCtrl: SuiToggleComposite;
}
/**
 * @category SuiDialog
 */
export interface StaffCheckValue {
    show: boolean;
}
/**
 * Allow a user to select specific staves, as in, for display
 * @category SuiDialog
 */
export declare class StaffCheckComponent extends SuiComponentBase {
    view: SuiScoreViewOperations;
    staffRows: StaffCheckControlRow[];
    constructor(dialog: SuiDialogNotifier, parameter: StaffCheckComponentParams);
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    _getInputElement(): any;
    getValue(): StaffCheckValue[];
    setValue(rows: StaffCheckValue[]): void;
    changed(): void;
    bind(): void;
}
//# sourceMappingURL=staffComponents.d.ts.map
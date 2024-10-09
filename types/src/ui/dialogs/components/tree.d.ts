import { SuiComponentBase, SuiDialogNotifier } from './baseComponent';
/**
 * @category SuiDialog
 */
export interface TreeComponentOption {
    label: string;
    value: string | undefined;
    parent: string | undefined;
    format: string;
    expanded: boolean;
}
/**
 * @category SuiDialog
 */
export interface SuiTreeComponentParams {
    id: string;
    classes: string;
    label: string;
    smoName: string;
    control: string;
    root: string;
    options: TreeComponentOption[];
}
/**
 * A tree or ladder control, used for library manager.
 * @category SuiDialog
 */
export declare class SuiTreeComponent extends SuiComponentBase {
    persistControls: boolean;
    tree: Record<string, TreeComponentOption[]>;
    options: TreeComponentOption[];
    root: string;
    value: string;
    constructor(dialog: SuiDialogNotifier, parameter: SuiTreeComponentParams);
    calculateOptionTree(): void;
    getNodesWithParent(parent: string | undefined): TreeComponentOption[];
    appendOptionRecurse(b: any, option: TreeComponentOption, level: number): any;
    _createTree(builder: any, ul: any): void;
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    updateOptions(options: TreeComponentOption[]): void;
    _getInputElement(): any;
    getValue(): string;
    setValue(value: string): void;
    bindTreeControls(): void;
    bind(): void;
}
//# sourceMappingURL=tree.d.ts.map
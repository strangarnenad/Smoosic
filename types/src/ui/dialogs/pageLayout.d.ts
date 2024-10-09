import { SmoPageLayout, SmoLayoutManager } from '../../smo/data/scoreModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinitionOption } from './components/baseComponent';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * Page dimensions and margins
 * @category SuiDialog
 */
export declare class SuiPageLayoutAdapter extends SuiComponentAdapter {
    static get layoutTypes(): Record<string, number>;
    layouts: SmoPageLayout[];
    backup: SmoPageLayout[];
    currentPage: number;
    changed: boolean;
    currentLayout: SmoPageLayout;
    layoutManager: SmoLayoutManager;
    view: SuiScoreViewOperations;
    applyTo: number;
    options: DialogDefinitionOption[];
    updateLayouts(): Promise<void>;
    get enablePages(): boolean;
    get applyToPage(): number;
    set applyToPage(value: number);
    set leftMargin(value: number);
    get leftMargin(): number;
    get rightMargin(): number;
    set rightMargin(value: number);
    get topMargin(): number;
    set topMargin(value: number);
    get bottomMargin(): number;
    set bottomMargin(value: number);
    get interGap(): number;
    set interGap(value: number);
    get intraGap(): number;
    set intraGap(value: number);
    cancel(): Promise<void>;
    commit(): Promise<any>;
    constructor(view: SuiScoreViewOperations);
}
/**
 * The layout dialog has page-specific layout parameters
 * @category SuiDialog
 */
export declare class SuiPageLayoutDialog extends SuiDialogAdapterBase<SuiPageLayoutAdapter> {
    static get layoutParams(): string[];
    static dialogElements: DialogDefinition;
    constructor(params: SuiDialogParams);
}
//# sourceMappingURL=pageLayout.d.ts.map
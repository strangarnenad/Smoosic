import { GlobalLayoutAttributes, SmoGlobalLayout } from '../../smo/data/scoreModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * Global layout affects SVG settings for the entire score.  Each part also
 * has its own GlobalLayout.  This controls the note size and zoom, and some
 * global formatting parameters.
 * @category SuiDialog
 */
export declare class SuiGlobalLayoutAdapter extends SuiComponentAdapter {
    scoreLayout: SmoGlobalLayout;
    backup: SmoGlobalLayout;
    changed: boolean;
    constructor(view: SuiScoreViewOperations);
    writeValue(attr: GlobalLayoutAttributes, value: number): Promise<void>;
    get noteSpacing(): number;
    set noteSpacing(value: number);
    get pageWidth(): number;
    set pageWidth(value: number);
    get pageHeight(): number;
    set pageHeight(value: number);
    get svgScale(): number;
    set svgScale(value: number);
    get zoomScale(): number;
    set zoomScale(value: number);
    get maxMeasureSystem(): number;
    set maxMeasureSystem(value: number);
    get pageSize(): string;
    set pageSize(value: string);
    commit(): Promise<any>;
    cancel(): Promise<void>;
}
/**
 * Global layout affects SVG settings for the entire score.  Each part also
 * has its own GlobalLayout.  This controls the note size and zoom, and some
 * global formatting parameters.
 * @category SuiDialog
 */
export declare class SuiGlobalLayoutDialog extends SuiDialogAdapterBase<SuiGlobalLayoutAdapter> {
    static dialogElements: DialogDefinition;
    get dimensionControls(): import("./components/baseComponent").SuiComponentBase[];
    constructor(params: SuiDialogParams);
    changed(): Promise<void>;
}
//# sourceMappingURL=globalLayout.d.ts.map
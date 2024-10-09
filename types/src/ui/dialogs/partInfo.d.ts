import { GlobalLayoutAttributes } from '../../smo/data/scoreModifiers';
import { SmoPartInfo, SmoPartInfoStringType } from '../../smo/data/partInfo';
import { SmoSelection } from '../../smo/xform/selections';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { ViewMapEntry } from '../../render/sui/scoreView';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * @category SuiDialog
 */
export declare class SuiPartInfoAdapter extends SuiComponentAdapter {
    partInfo: SmoPartInfo;
    backup: SmoPartInfo;
    selection: SmoSelection;
    changed: boolean;
    expandedMultimeasure: boolean;
    currentView: ViewMapEntry[];
    resetPart: boolean;
    constructor(view: SuiScoreViewOperations);
    update(): Promise<void>;
    writeLayoutValue(attr: GlobalLayoutAttributes, value: number): void;
    writeStringValue(attr: SmoPartInfoStringType, value: string): void;
    get expandMultimeasureRest(): boolean;
    set expandMultimeasureRest(value: boolean);
    get noteSpacing(): number;
    set noteSpacing(value: number);
    get pageWidth(): number;
    set pageWidth(value: number);
    get pageHeight(): number;
    set pageHeight(value: number);
    get svgScale(): number;
    set svgScale(value: number);
    get maxMeasureSystem(): number;
    set maxMeasureSystem(value: number);
    get zoomScale(): number;
    set zoomScale(value: number);
    get pageSize(): string;
    set pageSize(value: string);
    get partName(): string;
    set partName(value: string);
    get partAbbreviation(): string;
    set partAbbreviation(value: string);
    get includeNext(): boolean;
    set includeNext(value: boolean);
    get cueInScore(): boolean;
    set cueInScore(value: boolean);
    get preserveTextGroups(): boolean;
    set preserveTextGroups(value: boolean);
    commit(): Promise<void>;
    cancel(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiPartInfoDialog extends SuiDialogAdapterBase<SuiPartInfoAdapter> {
    static dialogElements: DialogDefinition;
    get dimensionControls(): import("./components/baseComponent").SuiComponentBase[];
    constructor(params: SuiDialogParams);
    changed(): Promise<void>;
}
//# sourceMappingURL=partInfo.d.ts.map
import { FontInfo } from '../../common/vex';
import { FontPurpose } from '../../smo/data/scoreModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * Adapt score fonts to score dialog
 * @category SuiDialog
 */
export declare class SuiScoreFontAdapter extends SuiComponentAdapter {
    fonts: FontPurpose[];
    backups: FontPurpose[];
    changed: boolean;
    static get defaultFont(): FontInfo;
    constructor(view: SuiScoreViewOperations);
    cancel(): Promise<any>;
    commit(): Promise<any>;
    changeFont(purpose: number, name: string, fontInfo: FontInfo): FontPurpose;
    toInfo(fontPurpose: FontPurpose): FontInfo;
    getInfo(purpose: number): FontInfo;
    get engravingFont(): string;
    set engravingFont(value: string);
    set chordFont(fontInfo: FontInfo);
    get chordFont(): FontInfo;
    set lyricFont(fontInfo: FontInfo);
    get lyricFont(): FontInfo;
}
/**
 * @category SuiDialog
 */
export declare class SuiScoreFontDialog extends SuiDialogAdapterBase<SuiScoreFontAdapter> {
    static dialogElements: DialogDefinition;
    static createAndDisplay(parameters: SuiDialogParams): void;
    constructor(params: SuiDialogParams);
}
//# sourceMappingURL=fonts.d.ts.map
import { SuiDialogBase, SuiDialogParams, DialogDefinition } from './dialog';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiFileDownloadComponent } from './components/fileDownload';
import { SuiDialogAdapterBase, SuiComponentAdapter } from './adapter';
/**
 * internal state of FileLoadDialog is just the string for the filename.
 * @category SuiDialog
 */
export declare class SuiSmoLoadAdapter extends SuiComponentAdapter {
    jsonFile: string;
    constructor(view: SuiScoreViewOperations);
    get loadFile(): string;
    set loadFile(value: string);
    commit(): Promise<void>;
    cancel(): Promise<any>;
}
/**
 * Load a SMO JSON file
 * @category SuiDialog
 */
export declare class SuiLoadFileDialog extends SuiDialogAdapterBase<SuiSmoLoadAdapter> {
    static dialogElements: DialogDefinition;
    get loadFileCtrl(): SuiFileDownloadComponent;
    modifier: SuiSmoLoadAdapter;
    constructor(parameters: SuiDialogParams);
    changed(): Promise<void>;
    commit(): Promise<void>;
}
/**
 * internal state of FileLoadDialog is just the string for the filename.
 * @category SuiDialog
 */
export declare class SuiXmlLoadAdapter extends SuiComponentAdapter {
    xmlFile: string;
    changeScore: boolean;
    constructor(view: SuiScoreViewOperations);
    get loadFile(): string;
    set loadFile(value: string);
    commit(): Promise<void>;
    cancel(): Promise<any>;
}
/**
 * Load a music XML file
 * @category SuiDialog
 */
export declare class SuiLoadMxmlDialog extends SuiDialogAdapterBase<SuiXmlLoadAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    changed(): Promise<void>;
}
/**
 * internal state of FileLoadDialog is just the string for the filename.
 * @category SuiDialog
 */
export declare class SuiMidiLoadAdapter extends SuiComponentAdapter {
    midiFile: any;
    changeScore: boolean;
    quantize: number;
    constructor(view: SuiScoreViewOperations);
    get loadFile(): any;
    set loadFile(value: any);
    get quantizeDuration(): number;
    set quantizeDuration(value: number);
    commit(): Promise<void>;
    cancel(): Promise<any>;
}
/**
 * @category SuiDialog
 */
export declare class SuiLoadMidiDialog extends SuiDialogAdapterBase<SuiMidiLoadAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    changed(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiPrintFileDialog extends SuiDialogBase {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    changed(): void;
    bindElements(): void;
    commit(): Promise<any>;
}
/**
 * @category SuiDialog
 */
export declare class SuiVexSaveAdapter extends SuiComponentAdapter {
    fileName: string;
    page: number;
    constructor(view: SuiScoreViewOperations);
    get saveFileName(): string;
    set saveFileName(value: string);
    get pageToRender(): number;
    set pageToRender(val: number);
    _saveScore(): Promise<void>;
    commit(): Promise<void>;
    cancel(): Promise<any>;
}
/**
 * @category SuiDialog
 */
export declare class SuiSaveVexDialog extends SuiDialogAdapterBase<SuiVexSaveAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    commit(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiSmoSaveAdapter extends SuiComponentAdapter {
    fileName: string;
    constructor(view: SuiScoreViewOperations);
    get saveFileName(): string;
    set saveFileName(value: string);
    _saveScore(): void;
    commit(): Promise<void>;
    cancel(): Promise<any>;
}
/**
 * @category SuiDialog
 */
export declare class SuiSaveFileDialog extends SuiDialogAdapterBase<SuiSmoSaveAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    commit(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiSaveJsonValidationAdapter extends SuiComponentAdapter {
    fileName: string;
    constructor(view: SuiScoreViewOperations);
    get saveFileName(): string;
    set saveFileName(value: string);
    _saveScore(): void;
    commit(): Promise<void>;
    cancel(): Promise<any>;
}
/**
 * @category SuiDialog
 */
export declare class SuiXmlSaveAdapter extends SuiComponentAdapter {
    fileName: string;
    constructor(view: SuiScoreViewOperations);
    get saveFileName(): string;
    set saveFileName(value: string);
    _saveXml(): void;
    commit(): Promise<any>;
    cancel(): Promise<any>;
}
/**
 * @category SuiDialog
 */
export declare class SuiSaveXmlDialog extends SuiDialogAdapterBase<SuiXmlSaveAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    commit(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiSaveJsonValidationDialog extends SuiDialogAdapterBase<SuiSaveJsonValidationAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    commit(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiMidiSaveAdapter extends SuiComponentAdapter {
    fileName: string;
    constructor(view: SuiScoreViewOperations);
    get saveFileName(): string;
    set saveFileName(value: string);
    _saveScore(): void;
    commit(): Promise<any>;
    cancel(): Promise<any>;
}
/**
 * @category SuiDialog
 */
export declare class SuiSaveMidiDialog extends SuiDialogAdapterBase<SuiMidiSaveAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    commit(): Promise<void>;
}
//# sourceMappingURL=fileDialogs.d.ts.map
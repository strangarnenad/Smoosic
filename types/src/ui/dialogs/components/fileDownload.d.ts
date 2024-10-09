import { SuiComponentBase, SuiDialogNotifier } from './baseComponent';
/**
 * @category SuiDialog
 */
export interface SuiFileDownloadComponentParams {
    id: string;
    classes: string;
    type?: string;
    increment?: number;
    defaultValue: string;
    label: string;
    smoName: string;
    control: string;
}
/**
 * Download a test file using the file input.
 * @category SuiDialog
 */
export declare class SuiFileDownloadComponent extends SuiComponentBase {
    defaultValue: string;
    value: any;
    constructor(dialog: SuiDialogNotifier, parameter: SuiFileDownloadComponentParams);
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    _handleUploadedFiles(evt: any): Promise<void>;
    getValue(): any;
    setValue(value: any): void;
    bind(): void;
}
//# sourceMappingURL=fileDownload.d.ts.map
/**
 * @category SuiFile
 */
export declare class SuiFileInput {
    compressed: boolean;
    binary: boolean;
    value: any;
    event: any;
    constructor(evt: any);
    _handleZip(): Promise<void>;
    loadAsync(): Promise<void>;
}
//# sourceMappingURL=fileInput.d.ts.map
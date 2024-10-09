/**
 * Load a file.  Guess based on the extension whether the file is string or binary
 * @category SuiFile
 */
export declare class SuiXhrLoader {
    compressed: boolean;
    value: any;
    path: string;
    binary: boolean;
    isMidi: boolean;
    constructor(path: string);
    _uncompress(result: any): Promise<string>;
    /**
     *
     * @returns promise resolved when the target file is loaded
     */
    loadAsync(): Promise<string | ArrayBuffer>;
}
//# sourceMappingURL=xhrLoader.d.ts.map
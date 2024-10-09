/**
 * @internal
 */
export interface kvPair {
    [key: string]: string;
}
/**
 * @category SuiFile
 */
export interface LibraryParams {
    loaded: boolean;
    parentLib: kvPair;
    url: string | undefined;
    format: string;
    metadata: kvPair;
    children: SmoLibrary[];
    data: any;
}
/**
 * A class to organize smoosic files (or any format smoosic accepts) into libraries.
 * @category SuiFile
 */
export declare class SmoLibrary {
    static _defaults: Partial<LibraryParams>;
    loaded: boolean;
    parentLib: kvPair;
    url: string | undefined;
    format: string;
    metadata: kvPair;
    children: SmoLibrary[];
    constructor(parameters: Partial<LibraryParams>);
    initialize(parameters: LibraryParams): void;
    static get metadataNames(): string[];
    static get formatTypes(): string[];
    static get libraryTypes(): string[];
    static get defaults(): Partial<LibraryParams>;
    static get parameterArray(): string[];
    load(): Promise<any>;
    _inheritMetadata(parent: any): void;
}
//# sourceMappingURL=library.d.ts.map
/**
 * @category serialization
 */
export class smoSerialize {
    static vexMerge(dest: any, src: any): void;
    static tryParseUnicode(text: any): any;
    static filteredMerge(attrs: any, src: any, dest: any): void;
    static get localScore(): string;
    static loadRemoteFile(path: any): void;
    static get tokenMap(): any;
    static get valueTokens(): any;
    static reverseMap(map: any): {};
    static get tokenValues(): {};
    static prettifyXml(xmlDoc: any): Document;
    static detokenize(json: any, dictionary: any): {};
    static incrementIdentifier(label: any): any;
    static jsonTokens(json: any): void;
    static serializedMerge(attrs: any, src: any, dest: any): void;
    /**
     * Only serialize non-default values.
     * @param {*} defaults - the class-defined defaults
     * @param {*} attrs - the list of attributes (untyped)
     * @param {*} src - the object we're serializing
     * @param {*} dest - the output json
     */
    static serializedMergeNonDefault(defaults: any, attrs: any, src: any, dest: any): void;
    static stringifyAttrs(attrs: any, obj: any): string;
    static printTranslate(_class: any): void;
}
//# sourceMappingURL=serializationHelpers.d.ts.map
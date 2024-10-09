import { SuiMenuBase, SuiMenuParams, MenuDefinition } from './menu';
/**
 * Not used - currently handled by dialog
 * @category SuiMenu
 */
export declare class SuiKeySignatureMenu extends SuiMenuBase {
    constructor(params: SuiMenuParams);
    static get ctor(): string;
    static defaults: MenuDefinition;
    getDefinition(): MenuDefinition;
    selection(ev: any): Promise<void>;
    keydown(): void;
}
//# sourceMappingURL=keySignature.d.ts.map
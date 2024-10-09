import { SuiMenuBase, SuiMenuParams, MenuDefinition } from './menu';
/**
 * Not currently used, is a dialog instead
 * @category SuiMenu
 */
export declare class SuiTimeSignatureMenu extends SuiMenuBase {
    constructor(params: SuiMenuParams);
    static defaults: MenuDefinition;
    getDefinition(): MenuDefinition;
    selection(ev: any): Promise<void>;
    keydown(): void;
}
//# sourceMappingURL=timeSignature.d.ts.map
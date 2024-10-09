import { SuiMenuBase, SuiMenuParams, MenuDefinition } from './menu';
/**
 * @category SuiMenu
 */
export declare class SuiLanguageMenu extends SuiMenuBase {
    constructor(params: SuiMenuParams);
    static get ctor(): string;
    static defaults: MenuDefinition;
    getDefinition(): MenuDefinition;
    selection(ev: any): Promise<void>;
    keydown(): void;
}
//# sourceMappingURL=language.d.ts.map
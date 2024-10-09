import { SuiMenuBase, SuiMenuParams, MenuDefinition } from './menu';
/**
 * @category SuiMenu
 */
export declare class SuiDynamicsMenu extends SuiMenuBase {
    constructor(params: SuiMenuParams);
    static defaults: MenuDefinition;
    getDefinition(): MenuDefinition;
    selection(ev: any): Promise<void>;
    keydown(): void;
}
//# sourceMappingURL=dynamics.d.ts.map
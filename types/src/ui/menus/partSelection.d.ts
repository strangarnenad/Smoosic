import { SuiMenuBase, SuiMenuParams, MenuDefinition } from './menu';
import { SmoPartInfo } from '../../smo/data/partInfo';
/**
 * This is the menu that is always visible on the UI ribbon
 * @category SuiMenu
 */
export declare class SuiPartSelectionMenu extends SuiMenuBase {
    partMap: {
        keys: number[];
        partMap: Record<number, SmoPartInfo>;
    };
    constructor(params: SuiMenuParams);
    static defaults: MenuDefinition;
    getDefinition(): MenuDefinition;
    selectPart(val: number): void;
    preAttach(): void;
    selection(ev: any): Promise<void>;
    keydown(): void;
}
//# sourceMappingURL=partSelection.d.ts.map
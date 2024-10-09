import { SuiMenuBase, SuiMenuParams } from './menu';
/**
 * @category SuiMenu
 */
export declare class SuiFileMenu extends SuiMenuBase {
    constructor(params: SuiMenuParams);
    static defaults: {
        label: string;
        menuItems: {
            icon: string;
            text: string;
            value: string;
        }[];
    };
    getDefinition(): {
        label: string;
        menuItems: {
            icon: string;
            text: string;
            value: string;
        }[];
    };
    systemPrint(): void;
    selection(ev: any): Promise<void>;
    keydown(): void;
}
//# sourceMappingURL=file.d.ts.map
import { MenuDefinition, SuiMenuBase, SuiMenuParams } from './menu';
/**
 * stuff you can do to a score
 * @category SuiMenu
 */
export declare class SuiScoreMenu extends SuiMenuBase {
    static defaults: MenuDefinition;
    getDefinition(): MenuDefinition;
    preAttach(): void;
    constructor(params: SuiMenuParams);
    execStaffGroups(): void;
    execScoreId(): void;
    execPageLayout(): void;
    execFonts(): void;
    execGlobalLayout(): void;
    execPreferences(): void;
    execAudioSettings(): void;
    execTransposeScore(): void;
    selection(ev: any): Promise<void>;
    keydown(): void;
}
//# sourceMappingURL=score.d.ts.map
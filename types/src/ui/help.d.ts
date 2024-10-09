/**
 * @internal
 */
export interface HtmlHelpBlock {
    title: string;
    html: string;
    index: number;
}
export type HelpMode = 'cards' | 'expand';
/**
 * @category SuiDialog
 */
export declare class SuiHelp {
    static helpMode: HelpMode;
    static created: boolean;
    static currentCard: number;
    static displayHelp(): void;
    static setCards(): void;
    static get closeButton(): import("../common/htmlHelpers").DomBuilder;
    static _buildElements(helps: HtmlHelpBlock): import("../common/htmlHelpers").DomBuilder;
    static get helpHtml(): HtmlHelpBlock[];
}
//# sourceMappingURL=help.d.ts.map
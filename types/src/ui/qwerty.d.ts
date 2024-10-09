import { KeyEvent } from '../smo/data/common';
/**
 * @category SuiDialog
 */
export interface SuiKbRow {
    row: string;
    shifted: string;
}
/**
 * @category SuiDialog
 */
export interface SuiKbKey {
    icon: string;
    text: string;
    shifted: string;
    classes: string;
    dataKey: string;
}
/**
 * Used for generating documentation, visual key capture
 * @category SuiDialog
 */
export declare class Qwerty {
    static _shiftTime: number;
    static displayed: boolean;
    static created: boolean;
    static get navigationElements(): Record<string, SuiKbKey[]>;
    static flashShift(): void;
    static displayForDuration(): void;
    static displayForTuplet(): void;
    static displayForNav(): void;
    static displayAll(): void;
    static _flashButton(key: string): void;
    static get editingKeys(): string[];
    static handleKeyEvent(evdata: KeyEvent): void;
    static _kbButton(buttons: SuiKbKey[]): import("../common/htmlHelpers").DomBuilder;
    static _buttonBlock(buttons: SuiKbKey[], id: string): import("../common/htmlHelpers").DomBuilder;
    static _buildElements(rows: Record<string, SuiKbKey[]>): import("../common/htmlHelpers").DomBuilder;
    static hideKb(): void;
    static displayKb(): void;
}
//# sourceMappingURL=qwerty.d.ts.map
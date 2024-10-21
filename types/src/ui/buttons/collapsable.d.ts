import { ButtonDefinition, SuiButton, SuiButtonParams } from './button';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { BrowserEventSource } from '../eventSource';
import { SuiMenuManager } from '../menus/manager';
import { CompleteNotifier } from '../common';
/**
 * @category SuiButton
 */
export interface SuiCollapsableButtonParams {
    ctor: string;
    buttonId: string;
    buttonElement: string;
    buttonData: ButtonDefinition;
    view: SuiScoreViewOperations;
    eventSource: BrowserEventSource;
    menus: SuiMenuManager;
    completeNotifier: CompleteNotifier;
    buttons: ButtonDefinition[];
}
export declare function buttonIsCollapsible(action: string): boolean;
export declare function buttonIsBindable(action: string): boolean;
/**
 * Buttons that can expand and show other buttons.  These are not used atm but may
 * reappear as the UI grows.
 * @category SuiButton
 */
export declare class CollapseRibbonControl extends SuiButton {
    static get paramArray(): string[];
    childButtons: ButtonDefinition[];
    constructor(parameters: SuiCollapsableButtonParams);
    toggleExpand(): Promise<void>;
    bind(): void;
}
/**
 * Muse-style '...' buttons for less-common operations
 * @category SuiButton
 */
export declare class ExtendedCollapseParent extends SuiButton {
    constructor(parameters: SuiButtonParams);
    bind(): void;
}
export declare const collapsableButtonInit: () => void;
//# sourceMappingURL=collapsable.d.ts.map
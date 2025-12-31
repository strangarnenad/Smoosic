import { Ref } from 'vue';
export type scrollHandler = (ev: any) => void;
export declare class SuiNavigation {
    static instance: SuiNavigation;
    bugModalView: Ref<boolean>;
    scrollHandlers: scrollHandler[];
    constructor(uiDomContainer: HTMLElement);
    static get scrollable(): string;
    pushScrollHandler(handler: scrollHandler): void;
    popScrollHandler(): scrollHandler | undefined;
    showBugModal(): void;
    hideBugModal(): void;
    showDialogModal(): void;
    hideDialogModal(): void;
}

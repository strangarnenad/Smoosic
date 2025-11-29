import { Ref } from 'vue';
export declare class SuiNavigation {
    static instance: SuiNavigation;
    bugModalView: Ref<boolean>;
    constructor(uiDomContainer: HTMLElement);
    showBugModal(): void;
    hideBugModal(): void;
    showDialogModal(): void;
    hideDialogModal(): void;
}

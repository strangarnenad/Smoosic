import { TranslationStrings } from "./language";
import { DialogTranslation, DialogDefinition } from "../dialogs/dialog";
import { DialogDefinitionElement } from "../dialogs/components/baseComponent";
export declare class SmoTranslationEditor {
    static _getHtmlTextInput(dbLabel: string, enLabel: string, langLabel: string, labelType: string, labelId: string): any;
    static _getMenuTextDialogHtml(menuCtor: string, enStrings: TranslationStrings, langStrings: TranslationStrings): any;
    static getButtonTranslateHtml(enStrings: TranslationStrings, langStrings: TranslationStrings, transContainer: HTMLElement): void;
    static _getStaticTextDialogHtml(elements: DialogDefinition, enDb: Record<string, string>, langDb: Record<string, string>, htmlContainer: HTMLElement): void;
    static _getDialogComponentHtml(element: DialogDefinitionElement, enDb: DialogTranslation, langDb: DialogTranslation, container: HTMLElement): void;
    static getDialogTranslationHtml(dialogCtor: string, enStrings: TranslationStrings, langStrings: TranslationStrings): HTMLElement | undefined;
    static getAllTranslationHtml(lang: string): HTMLElement;
    static parseDom(): {
        ribbonText: any[];
    }[];
    static startEditor(lang: string): void;
}
//# sourceMappingURL=translationEditor.d.ts.map
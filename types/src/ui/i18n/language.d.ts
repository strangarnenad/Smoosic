import { MenuTranslation } from '../menus/menu';
import { ButtonLabel } from '../buttons/button';
import { DialogTranslation } from '../dialogs/dialog';
export interface TranslationStrings {
    dialogs: DialogTranslation[];
    menus: MenuTranslation[];
    buttonText: ButtonLabel[];
}
export type languageDirection = 'ltr' | 'rtl';
export interface LanguageTranslation {
    dir: languageDirection;
    strings: TranslationStrings;
    helpHtml: any;
}
export declare class SmoTranslator {
    static dialogs: any[];
    static menus: any[];
    static debugMask: number;
    static registerMenu(_class: any): void;
    static registerDialog(_class: any): void;
    static printLanguages(): void;
    static _updateDialog(dialogStrings: DialogTranslation, _dialogClass: any, dialogClass: string): void;
    /**
     * TODO: update this so that dynamic constructors aren't needed.
     * @param language
     * @returns
     */
    static setLanguage(language: string): void;
    static get allMenus(): string[];
    static get allDialogs(): string[];
}
export declare class SmoLanguage {
    static getHelpFile(category: any): any;
    static get en(): LanguageTranslation;
    static get ar(): LanguageTranslation;
    static get de(): LanguageTranslation;
}
//# sourceMappingURL=language.d.ts.map
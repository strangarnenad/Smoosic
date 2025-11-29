import { SmoConfiguration } from './configuration';
/**
 * Construct the DOM scaffolding for the application
 * @category SuiApplication
 */
export declare class SuiDom {
    static splash(config: SmoConfiguration): void;
    static get scrollRegionId(): string;
    static createUiDom(uiDomContainer: HTMLElement | string | undefined): HTMLElement;
}

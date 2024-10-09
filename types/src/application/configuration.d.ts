/**
 * Superset of configuration required to initialize Smoosic, either the appliation or library.
 * @module configuration
 */
import { SmoRenderConfiguration } from "../render/sui/configuration";
import { SmoScore } from "../smo/data/score";
import { ModalEventHandler } from "./common";
import { KeyBindingConfiguration, SmoUiConfiguration } from "../ui/configuration";
import { RibbonLayout } from "../ui/common";
import { ButtonDefinition } from "../ui/buttons/button";
import { SuiAudioAnimationParams } from "../render/audio/musicCursor";
export type SmoMode = 'library' | 'application' | 'translate';
export type ConfigurationStringOption = 'language' | 'libraryUrl' | 'remoteScore';
export type ConfigurationNumberOption = 'demonPollTime' | 'idleRedrawTime';
export declare var ConfigurationStringOptions: ConfigurationStringOption[];
export declare var ConfigurationNumberOptions: ConfigurationNumberOption[];
/**
 * Application configuration parameters, can be referenced by the running application or changed
 * @category SuiApplication
 */
export interface SmoConfigurationParams {
    mode: SmoMode;
    smoPath?: string;
    language: string;
    initialScore?: string | SmoScore;
    remoteScore?: string;
    scoreDomContainer: string | HTMLElement;
    leftControls?: string | HTMLElement;
    topControls?: string | HTMLElement;
    libraryUrl?: string;
    demonPollTime: number;
    idleRedrawTime: number;
    ribbonLayout?: RibbonLayout;
    buttonDefinition?: ButtonDefinition[];
    audioAnimation: SuiAudioAnimationParams;
}
/**
 * Configures smoosic library or application. It is a union of UI, rendering and application configuration parameters
 * @param mode - score mode `'library' | 'application' | 'translate'`
 *   Library mode starts the view but not the UI.  application mode starts the UI and expects UI parameters.
 *   translation mode is the translation editor, for creating translations for dialog/menu components
 * @param language - startup language
 * @param initialScore? - the library score JSON, if you are loading from a JSON string, or a SmoScore object
 * @param remoteScore? - path to a remote score, if loading from an URL
 * @param scoreDomContainer - the parent of the svg container (required)
 * @param leftControls - the location of the vertical button control, applies if mode is 'application'
 * @param topControls - the location of the horizontal button control, applies if mode is 'application'
 * @param libraryUrl - loader URL for Smo libraries, applies if application mode
 * @param demonPollTime - how often we poll the score to see if it's changed
 * @param idleRedrawTime - how often the entire score re-renders
 * @category SuiApplication
 */
export declare class SmoConfiguration implements SmoRenderConfiguration, SmoUiConfiguration {
    mode: SmoMode;
    language: string;
    initialScore?: string | SmoScore;
    remoteScore?: string;
    leftControls?: string | HTMLElement;
    topControls?: string | HTMLElement;
    scoreDomContainer: string | HTMLElement;
    libraryUrl?: string;
    demonPollTime: number;
    idleRedrawTime: number;
    keys?: KeyBindingConfiguration;
    eventHandler?: ModalEventHandler;
    ribbonLayout: RibbonLayout;
    audioAnimation: SuiAudioAnimationParams;
    buttonDefinition: ButtonDefinition[];
    static get defaults(): SmoConfiguration;
    static get keyBindingDefaults(): KeyBindingConfiguration;
    constructor(params: Partial<SmoConfigurationParams>);
}
//# sourceMappingURL=configuration.d.ts.map
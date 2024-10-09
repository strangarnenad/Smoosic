import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SmoLibrary } from '../fileio/library';
import { SuiDialogParams } from './dialog';
import { DialogDefinitionOption } from './components/baseComponent';
import { TreeComponentOption, SuiTreeComponent } from './components/tree';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { SmoUiConfiguration } from '../configuration';
/**
 * A link to a remote music file
 * @category SuiDialog
 */
export interface LibraryDefinitionElement {
    smoName: string;
    control: string;
    root: string;
    label: string;
    options?: DialogDefinitionOption[];
}
/**
 * A set of library links
 * @category SuiDialog
 */
export interface LibraryDefinition {
    label: string;
    elements: LibraryDefinitionElement[];
    staticText: Record<string, string>[];
}
/**
 * The Smoosic music library.
 * @category SuiDialog
 */
export declare class SuiLibraryAdapter extends SuiComponentAdapter {
    topLib: SmoLibrary;
    elements: LibraryDefinition | null;
    selectedUrl: string;
    libHash: Record<string, SmoLibrary>;
    config: SmoUiConfiguration;
    selectedLib: SmoLibrary | null;
    tree: Record<string, SmoLibrary>;
    selectedScore: SmoLibrary | null;
    constructor(view: SuiScoreViewOperations, config: SmoUiConfiguration);
    loadPromise(): void;
    initialize(): Promise<void>;
    static addChildRecurse(options: TreeComponentOption[], parent: SmoLibrary, child: SmoLibrary): void;
    static createOptions(topLib: SmoLibrary): TreeComponentOption[];
    buildTreeRecurse(children: SmoLibrary[]): void;
    buildTree(): void;
    commit(): Promise<void>;
    cancel(): Promise<void>;
    loadOptions(options: TreeComponentOption[]): Promise<void>;
    _loadScore(): Promise<void>;
    get selectedLibrary(): SmoLibrary | null;
    get smoLibrary(): string;
    set smoLibrary(value: string);
}
/**
 * Display the library tree control
 * @category SuiDialog
 */
export declare class SuiLibraryDialog extends SuiDialogAdapterBase<SuiLibraryAdapter> {
    static dialogElements: LibraryDefinition;
    static _createElements(topLib: SmoLibrary): LibraryDefinition;
    static _createAndDisplay(parameters: SuiDialogParams, adapter: SuiLibraryAdapter): void;
    /** Library requires a load first, so createAndDisplayDialog won't work on it */
    static createAndDisplay(parameters: SuiDialogParams, config: SmoUiConfiguration): Promise<void>;
    constructor(parameters: SuiDialogParams, dialogElements: LibraryDefinition, adapter: SuiLibraryAdapter);
    commit(): Promise<void>;
    get smoLibraryCtrl(): SuiTreeComponent;
    changed(): Promise<void>;
}
//# sourceMappingURL=library.d.ts.map
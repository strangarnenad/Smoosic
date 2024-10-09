import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { SuiButtonArrayMSComponent } from './components/buttonArray';
import { SuiDialogNotifier, SuiBaseComponentParams } from './components/baseComponent';
/**
 * @category SuiDialog
 */
export declare class SuiArticulationButtonComponent extends SuiButtonArrayMSComponent {
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
}
/**
 * Smo adapter for articulation dialog
 * @category SuiDialog
 */
export declare class SuiArticulationAdapter extends SuiComponentAdapter {
    static get articulationIdMap(): Record<string, string>;
    static get articulationIdMapRvs(): Record<string, string>;
    codes: string[];
    positionCode: string;
    setValues: Record<string, boolean>;
    constructor(view: SuiScoreViewOperations);
    get position(): string;
    set position(value: string);
    get articulations(): string[];
    set articulations(value: string[]);
    get textMessage(): string;
    set textMessage(value: string);
    commit(): Promise<void>;
    cancel(): Promise<void>;
    remove(): Promise<void>;
}
/**
 * @category SuiDialog
 */
export declare class SuiArticulationDialog extends SuiDialogAdapterBase<SuiArticulationAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
    changed(): Promise<void>;
}
//# sourceMappingURL=articulation.d.ts.map
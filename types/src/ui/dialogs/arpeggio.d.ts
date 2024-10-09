import { SmoArpeggio, SmoArpeggioType } from '../../smo/data/noteModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * Smo Adapter for arpeggio dialog
 * @category SuiDialog
 */
export declare class SuiArpeggioAdapter extends SuiComponentAdapter {
    arpeggio: SmoArpeggio;
    backup: SmoArpeggio;
    changed: boolean;
    constructor(view: SuiScoreViewOperations);
    cancel(): Promise<void>;
    commit(): Promise<any>;
    get arpeggioType(): SmoArpeggioType;
    set arpeggioType(value: SmoArpeggioType);
}
/**
 * export  const SmoArpeggioTypes = ['directionless', 'rasquedo_up', 'rasquedo_down',
 * 'roll_up', 'roll_down', 'brush_up', 'brush_down', 'none'];
 * @category SuiDialog
 */
export declare class SuiArpeggioDialog extends SuiDialogAdapterBase<SuiArpeggioAdapter> {
    /**
     * The template used to create the dialog components
     */
    static dialogElements: DialogDefinition;
    static createAndDisplay(parameters: SuiDialogParams): void;
    constructor(params: SuiDialogParams);
}
//# sourceMappingURL=arpeggio.d.ts.map
import { SmoMeasure } from '../../smo/data/measure';
import { SmoSelection } from '../../smo/xform/selections';
import { SuiToggleComponent } from './components/toggle';
import { SuiRockerComponent } from './components/rocker';
import { DialogDefinition, SuiDialogBase, SuiDialogParams } from './dialog';
/**
 * Insert some number of measures
 * @category SuiDialog
 */
export declare class SuiInsertMeasures extends SuiDialogBase {
    static dialogElements: DialogDefinition;
    measure: SmoMeasure;
    selection: SmoSelection;
    constructor(parameters: SuiDialogParams);
    commit(): Promise<void>;
    get measureCountCtrl(): SuiRockerComponent;
    get appendCtrl(): SuiToggleComponent;
    populateInitial(): void;
}
//# sourceMappingURL=addMeasure.d.ts.map
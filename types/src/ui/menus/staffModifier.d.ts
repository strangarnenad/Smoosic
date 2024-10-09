import { SuiMenuBase, SuiMenuParams, MenuDefinition } from './menu';
import { SmoPedalMarking } from '../../smo/data/staffModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
/**
 * Dynamic function to add a pedal marking
 * @category SuiMenu
 * @param view
 * @param obj
 */
export declare function addOrReplacePedalMarking(view: SuiScoreViewOperations, obj: SmoPedalMarking): Promise<void>;
/**
 * the 'lines' menu, mostly staff modifiers.
 * @category SuiMenu
 */
export declare class SuiStaffModifierMenu extends SuiMenuBase {
    constructor(params: SuiMenuParams);
    static defaults: MenuDefinition;
    getDefinition(): MenuDefinition;
    selection(ev: any): Promise<void>;
    keydown(): void;
}
//# sourceMappingURL=staffModifier.d.ts.map
import { SmoTabStave } from '../../smo/data/staffModifiers';
import { Pitch } from '../../smo/data/common';
import { SmoSelection } from '../../smo/xform/selections';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
/**
 * Create or edit guitar tablature settings for a stave
 * @category SuiDialog
 */
export declare class SuiTabStaveAdapter extends SuiComponentAdapter {
    selections: SmoSelection[];
    tabStave: SmoTabStave;
    constructor(view: SuiScoreViewOperations, modifier?: SmoTabStave);
    get numLines(): number;
    set numLines(value: number);
    set spacing(value: number);
    get spacing(): number;
    get showStems(): boolean;
    set showStems(value: boolean);
    get allMeasures(): boolean;
    set allMeasures(value: boolean);
    get stringPitches(): Pitch[];
    set stringPitches(value: Pitch[]);
    resetStrings(): void;
    commit(): Promise<void>;
    cancel(): Promise<void>;
    remove(): Promise<void>;
}
/**
 * Create or edit guitar tablature settings for a stave
 * @category SuiDialog
 */
export declare class SuiTabStaveDialog extends SuiDialogAdapterBase<SuiTabStaveAdapter> {
    static get applyTo(): {
        score: number;
        selected: number;
        remaining: number;
    };
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=tabStave.d.ts.map
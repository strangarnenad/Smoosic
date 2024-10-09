import { SmoScorePreferences } from '../../smo/data/scoreModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * @category SuiDialog
 */
export declare class SuiScorePreferencesAdapter extends SuiComponentAdapter {
    preferences: SmoScorePreferences;
    backup: SmoScorePreferences;
    constructor(view: SuiScoreViewOperations);
    get autoAdvance(): boolean;
    set autoAdvance(value: boolean);
    get autoPlay(): boolean;
    set autoPlay(value: boolean);
    get showPiano(): boolean;
    set showPiano(value: boolean);
    get hideEmptyLines(): boolean;
    set hideEmptyLines(value: boolean);
    get defaultDupleDuration(): number;
    set defaultDupleDuration(value: number);
    get defaultTripleDuration(): number;
    set defaultTripleDuration(value: number);
    get transposingScore(): boolean;
    set transposingScore(value: boolean);
    cancel(): Promise<void>;
    commit(): Promise<any>;
}
/**
 * @category SuiDialog
 */
export declare class SuiScorePreferencesDialog extends SuiDialogAdapterBase<SuiScorePreferencesAdapter> {
    static dialogElements: DialogDefinition;
    constructor(params: SuiDialogParams);
}
//# sourceMappingURL=preferences.d.ts.map
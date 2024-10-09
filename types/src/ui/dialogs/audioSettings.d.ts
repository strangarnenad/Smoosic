import { SmoAudioPlayerSettings } from '../../smo/data/scoreModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams } from './dialog';
/**
 * Smo adapter for audio dialog
 * @category SuiDialog
 */
export declare class SuiAudioSettingsAdapter extends SuiComponentAdapter {
    settings: SmoAudioPlayerSettings;
    backup: SmoAudioPlayerSettings;
    constructor(view: SuiScoreViewOperations);
    get enableReverb(): boolean;
    set enableReverb(value: boolean);
    get playerType(): string;
    set playerType(value: string);
    get waveform(): string;
    set waveform(value: string);
    get reverbDelay(): number;
    set reverbDelay(value: number);
    get reverbDecay(): number;
    set reverbDecay(value: number);
    cancel(): Promise<void>;
    commit(): Promise<any>;
}
/**
 * @category SuiDialog
 */
export declare class SuiAudioSettingsDialog extends SuiDialogAdapterBase<SuiAudioSettingsAdapter> {
    static dialogElements: DialogDefinition;
    constructor(params: SuiDialogParams);
}
//# sourceMappingURL=audioSettings.d.ts.map
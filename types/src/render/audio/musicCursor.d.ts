import { SmoSelector } from '../../smo/xform/selections';
import { SuiScoreView } from '../sui/scoreView';
/**
 * A generic function that can be sent used to animate playback
 */
export type AudioAnimationHandler = (view: SuiScoreView, selector: SmoSelector, offsetPct: number, durationPct: number) => void;
/**
 * A generic function that can be sent used to clean up playback animation
 */
export type ClearAudioAnimationHandler = (delay: number) => void;
/**
 * Allow users to specify their own music playback animations.
 * @category SuiAudio
*/
export interface SuiAudioAnimationParams {
    audioAnimationHandler: AudioAnimationHandler;
    clearAudioAnimationHandler: ClearAudioAnimationHandler;
}
export declare const defaultClearAudioAnimationHandler: (delay: number) => void;
/**
  * default implementation of playback animation.
  * @category SuiAudio
  * @returns
  */
export declare const defaultAudioAnimationHandler: (view: SuiScoreView, selector: SmoSelector, offsetPct: number, durationPct: number) => void;
//# sourceMappingURL=musicCursor.d.ts.map
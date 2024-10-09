import { SuiOscillator } from './oscillator';
import { SuiScoreView } from '../sui/scoreView';
import { SmoScore } from '../../smo/data/score';
import { SmoSelector } from '../../smo/xform/selections';
import { SuiAudioAnimationParams } from './musicCursor';
/**
 * Create audio player for the score from the start point
 * @category SuiAudio
 */
export interface SuiAudioPlayerParams {
    startIndex: number;
    view: SuiScoreView;
    score: SmoScore;
    audioAnimation: SuiAudioAnimationParams;
}
/**
 * Parameters used to create just-in-time oscillators
 * @category SuiAudio
 */
export interface SoundParams {
    frequencies: number[];
    duration: number;
    offsetPct: number;
    durationPct: number;
    volume: number;
    noteType: string;
    instrument: string;
    selector: SmoSelector;
}
/**
 * A list of sound parameters for just-in-time oscillator creation
 * @category SuiAudio
 */
export interface SoundParamMeasureLink {
    soundParams: Record<number, SoundParams[]>;
    endTicks: number;
    next: SoundParamMeasureLink | null;
}
/**
 * A set of oscillators to be played at a certain time.
 * @category SuiAudio
 */
export interface CuedAudioContext {
    oscs: SuiOscillator[];
    playMeasureIndex: number;
    playTickIndex: number;
    waitTime: number;
    offsetPct: number;
    durationPct: number;
    selector: SmoSelector;
}
/**
 * A list of oscillators.  We keep them in a list until played so we
 * can GC them if playing is cancelled
 * @category SuiAudio
 */
export interface CuedAudioLink {
    sound: CuedAudioContext;
    next: CuedAudioLink | null;
}
/**
 * Maintain a list of buffers ready to play, since this is a
 * system resource.
 * @category SuiAudio
 */
export declare class CuedAudioContexts {
    soundHead: CuedAudioLink | null;
    soundTail: CuedAudioLink | null;
    paramLinkHead: SoundParamMeasureLink | null;
    paramLinkTail: SoundParamMeasureLink | null;
    soundListLength: number;
    playWaitTimer: number;
    playMeasureIndex: number;
    cueMeasureIndex: number;
    complete: boolean;
    addToTail(cuedSound: CuedAudioContext): void;
    advanceHead(): CuedAudioContext | null;
    get soundCount(): number;
    reset(): void;
}
/**
 * Play the music, ja!
 * @category SuiAudio
 */
export declare class SuiAudioPlayer {
    static _playing: boolean;
    static instanceId: number;
    static duplicatePitchThresh: number;
    static voiceThresh: number;
    static _playingInstance: SuiAudioPlayer | null;
    static set playing(val: boolean);
    static get audioBufferSize(): number;
    static incrementInstanceId(): number;
    static get playing(): boolean;
    static pausePlayer(): void;
    instanceId: number;
    paused: boolean;
    view: SuiScoreView;
    score: SmoScore;
    cuedSounds: CuedAudioContexts;
    audioDefaults: import("./oscillator").SuiOscillatorParams;
    openTies: Record<string, SoundParams | null>;
    audioAnimation: SuiAudioAnimationParams;
    constructor(parameters: SuiAudioPlayerParams);
    getNoteSoundData(measureIndex: number): {
        endTicks: number;
        measureNotes: Record<number, SoundParams[]>;
    };
    createCuedSound(measureIndex: number): void;
    populateSounds(measureIndex: number): void;
    playSounds(): void;
    playAfter(milliseconds: number, oscs: SuiOscillator[]): void;
    startPlayer(measureIndex: number): void;
    static stopPlayer(): void;
    static get playingInstance(): SuiAudioPlayer | null;
    static _playChord(oscAr: SuiOscillator[]): Promise<void[]>;
    play(): void;
}
//# sourceMappingURL=player.d.ts.map
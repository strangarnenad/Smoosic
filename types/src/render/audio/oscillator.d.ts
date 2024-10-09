import { SmoMeasure } from '../../smo/data/measure';
import { SmoNote } from '../../smo/data/note';
import { SmoSelection } from '../../smo/xform/selections';
import { SmoScore } from '../../smo/data/score';
import { SmoOscillatorInfo } from '../../smo/data/staffModifiers';
import { AudioSample } from './samples';
/**
 * Create audio reverb node.
 * @category SuiAudio
 */
export declare class SuiReverb {
    static get defaults(): {
        length: number;
        decay: number;
    };
    static impulse: AudioBuffer | null;
    connect(destination: AudioNode): void;
    disconnect(): void;
    _buildImpulse(): void;
    output: ConvolverNode;
    input: ConvolverNode;
    length: number;
    decay: number;
    damp: number;
    reverse: boolean;
    _context: AudioContext;
    constructor(context: AudioContext);
}
/**
 * Audio custom osc node.  Not used much.
 */
export interface WaveTable {
    real: number[];
    imaginary: number[];
}
/**
 * Parameters to create an oscillator for a single note of music
 * @category SuiAudio
 */
export interface SuiOscillatorParams {
    duration: number;
    frequency: number;
    attackEnv: number;
    decayEnv: number;
    sustainEnv: number;
    releaseEnv: number;
    sustainLevel: number;
    releaseLevel: number;
    waveform: OscillatorType;
    gain: number;
    wavetable?: WaveTable;
    useReverb: boolean;
    instrument: string;
}
export declare const SynthWavetable: WaveTable;
/**
 * Simple waveform synthesizer thing that plays notes.  Oscillator works in either
 * analog synthisizer or sampler mode.
 * @category SuiAudio
 */
export declare abstract class SuiOscillator {
    static audio: AudioContext;
    static created: number;
    static get defaults(): SuiOscillatorParams;
    static sampleFiles: string[];
    static samples: AudioSample[];
    static playSelectionNow(selection: SmoSelection, score: SmoScore, gain: number): void;
    static get attackTime(): number;
    static get decayTime(): number;
    static fromNote(measure: SmoMeasure, note: SmoNote, score: SmoScore, soundInfo: SmoOscillatorInfo, gain: number): SuiOscillator[];
    static get attributes(): string[];
    static resolveAfter(time: number): Promise<void>;
    _playPromise(duration: number, gain: GainNode): Promise<void>;
    static toFloatArray(ar: number[]): Float32Array;
    reverb: SuiReverb | null;
    attack: number;
    decay: number;
    sustain: number;
    release: number;
    waveform: OscillatorType;
    attackEnv: number;
    duration: number;
    decayEnv: number;
    sustainEnv: number;
    releaseEnv: number;
    gain: number;
    sustainLevel: number;
    releaseLevel: number;
    frequency: number;
    wavetable: WaveTable | null;
    useReverb: boolean;
    gainNode: GainNode | undefined;
    delayNode: DelayNode | undefined;
    instrument: string;
    osc: AudioScheduledSourceNode | undefined;
    constructor(parameters: SuiOscillatorParams);
    abstract play(): Promise<any>;
    abstract createAudioNode(): AudioScheduledSourceNode;
    disconnect(): void;
    /**
     * Connect the audio sound source to the output, combining other
     * nodes in the mix such as convolver (reverb), delay, and gain.
     * Also set up the envelope
     * @returns - a promise that tis resolved when `duration` time has expired
     */
    createAudioGraph(): Promise<any>;
    playPromise(duration: number): Promise<void>;
}
/**
 * An audio output that uses browser audio api OscillatorNode as a sound source
 * @category SuiAudio
 */
export declare class SuiWavetable extends SuiOscillator {
    createAudioNode(): AudioScheduledSourceNode;
    play(): Promise<any>;
}
/**
 * An audio output primitive that uses frequency-adjusted sampled sounds
 * @category SuiAudio
 */
export declare class SuiSampler extends SuiOscillator {
    constructor(params: SuiOscillatorParams);
    createAudioNode(): AudioScheduledSourceNode;
    play(): Promise<void>;
}
//# sourceMappingURL=oscillator.d.ts.map
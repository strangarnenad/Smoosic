import { SmoOscillatorInfo } from '../../smo/data/staffModifiers';
/**
 * A set of parameters from the instrument interface used to create audio from samples.
 * @category SuiAudio
 */
export interface SampleChooserParams {
    family?: string;
    instrument: string;
    frequency: number;
    duration: number;
    gain: number;
    articulation?: string;
}
/**
 * A function prototype that chooses from among samples to return the correct one for that note
 */
export type SampleChooser = (params: SampleChooserParams, samples: SmoOscillatorInfo[]) => AudioSample | null;
/**
 * A specific audio sample that can be converted into an audio node
 * @category SuiAudio
 */
export interface AudioSample {
    sample: AudioBuffer;
    frequency: number;
    patch: string;
    gain: number;
}
/**
 * Interface for a chooser function and a set of samples
 * @category SuiAudio
 */
export interface InstrumentSampleChooser {
    instrument: string;
    sampleChooser: SampleChooser;
    samples: SmoOscillatorInfo[];
}
/**
 * @category SuiAudio
 * @param params
 * @param samples
 * @returns
 */
export declare const sampleForPercussion: (params: SampleChooserParams, samples: SmoOscillatorInfo[]) => AudioSample | null;
/**
 * For instruments like violin that require different samples depending on note duration
 * @param params
 * @param samples
 * @returns
 * @category SuiAudio
 */
export declare const sampleFromMinDuration: (params: SampleChooserParams, samples: SmoOscillatorInfo[]) => AudioSample | null;
/**
 * Give a set of samples, return the one that closest matches the frequency
 * @param params
 * @param samples
 * @returns
 * @category SuiAudio
*/
export declare const sampleFromFrequency: (params: SampleChooserParams, samples: SmoOscillatorInfo[]) => AudioSample | null;
/**
 * Logic to create audio nodes out of HTML5 media elements
 * @category SuiAudio
 */
export declare class SuiSampleMedia {
    static sampleFiles: SmoOscillatorInfo[];
    static sampleBufferMap: Record<string, AudioBuffer>;
    static sampleOscMap: Record<string, SmoOscillatorInfo[]>;
    static instrumentChooser: Record<string, InstrumentSampleChooser>;
    static receivedBuffer: boolean;
    static getFamilyForInstrument(instKey: string): string;
    static insertIntoMap(sample: Partial<SmoOscillatorInfo>): void;
    static populateSampleMap(): void;
    static getSmoOscillatorInfo(instrument: string): SmoOscillatorInfo[];
    /**
    * Load samples so we can play the music
    * @returns - promise, resolved when loaded
    */
    static samplePromise(audio: AudioContext): Promise<any>;
    static sampleForFrequency(f: number, oscs: SmoOscillatorInfo[]): AudioSample | null;
    static matchedSample(params: SampleChooserParams): AudioSample | null;
}
//# sourceMappingURL=samples.d.ts.map
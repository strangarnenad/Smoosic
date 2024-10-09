import { SmoSelector, SmoSelection } from './selections';
import { SmoScore } from '../data/score';
import { SmoNote } from '../data/note';
import { Pitch } from '../data/common';
/**
 * @category SmoTransform
 */
export interface SmoAudioRepeat {
    startRepeat: number;
    endRepeat?: number;
    voltas: SmoAudioVolta[];
}
/**
 * @category SmoTransform
 */
export interface SmoAudioVolta {
    measureIndex: number;
    ending: number;
}
/**
 * @category SmoTransform
 */
export interface SmoAudioRepeatMap {
    startMeasure: number;
    endMeasure: number;
}
/**
 * @category SmoTransform
 */
export interface SmoAudioHairpin {
    hairpinType: number;
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    delta: number;
    ticks: number;
}
/**
 * @category SmoTransform
 */
export interface SmoAudioTie {
    startSelector: SmoSelector;
    endSelector: SmoSelector;
}
/**
 * @category SmoTransform
 */
export interface SmoAudioNote {
    pitches: Pitch[];
    frequencies: number[];
    noteType: string;
    duration: number;
    offset: number;
    selector: SmoSelector;
    volume: number;
    padding?: boolean;
}
/**
 * @category SmoTransform
 */
export interface SmoAudioTimeSignature {
    numerator: number;
    denominator: number;
}
/**
 * @category SmoTransform
 */
export interface SmoAudioTrack {
    lastMeasure: number;
    notes: SmoAudioNote[];
    tempoMap: Record<string, number>;
    measureNoteMap: Record<number, SmoAudioNote[]>;
    keyMap: Record<number, string>;
    timeSignatureMap: Record<string, SmoAudioTimeSignature>;
    hairpins: SmoAudioHairpin[];
    volume: number;
    tiedNotes: SmoAudioTie[];
    repeats: [];
}
/**
 * @category SmoTransform
 */
export interface AudioTracks {
    tracks: SmoAudioTrack[];
    repeats: SmoAudioRepeat[];
    repeatMap: SmoAudioRepeatMap[];
    measureBeats: number[];
    tempoMap: number[];
}
/**
 * Convert a score into a JSON structure that can be rendered to audio.
 * the return value looks like this:
 * ` { tracks, repeats, repeatMap} `
 * repeatMap is just an array of tuples with start/end measures.
 *  each track contains:
 *  ` { lastMeasure, notes, tempoMap, timeSignatureMap, hairpins, volume, tiedNotes } `
 * where each note might contain:
 * `{ pitches, noteType, duration, selector, volume }`
 * _Note_:  pitches are smo pitches, durations are adjusted for beatTime
 * (beatTime === 4096 uses Smo/Vex ticks, 128 is midi tick default)
 * volume is normalized 0-1
 * @category SmoTransform
 */
export declare class SmoAudioScore {
    static get dynamicVolumeMap(): Record<string, number>;
    static get emptyTrack(): SmoAudioTrack;
    timeDiv: number;
    score: SmoScore;
    beatTime: number;
    volume: number;
    constructor(score: SmoScore, beatTime: number);
    static volumeFromNote(smoNote: SmoNote, def?: number): number;
    getVoltas(repeat: SmoAudioRepeat, measureIndex: number): SmoAudioVolta[];
    ticksFromSelection(startSelector: SmoSelector, endSelector: SmoSelector): number;
    getHairpinInfo(track: SmoAudioTrack, selection: SmoSelection): void;
    computeVolume(track: SmoAudioTrack, selection: SmoSelection): void;
    getSlurInfo(track: SmoAudioTrack, selection: SmoSelection): void;
    isTiedPitch(track: SmoAudioTrack, selection: SmoSelection, noteIx: number): boolean;
    static updateMeasureIndexMap(note: SmoAudioNote, measureIndexMap: Record<number, Record<number, SmoAudioNote[]>>): void;
    updateMeasureNoteMap(track: SmoAudioTrack, measureIndex: number, note: SmoAudioNote): void;
    createTrackNote(track: SmoAudioTrack, selection: SmoSelection, duration: number, runningDuration: number, measureIndexMap: Record<number, Record<number, SmoAudioNote[]>>): void;
    createTrackRest(track: SmoAudioTrack, duration: number, runningDuration: number, selector: SmoSelector, measureIndexMap: Record<number, Record<number, SmoAudioNote[]>>): SmoAudioNote;
    createRepeatMap(repeats: SmoAudioRepeat[]): SmoAudioRepeatMap[];
    normalizeVolume(measureIndexMap: Record<number, Record<number, SmoAudioNote[]>>): void;
    convert(): AudioTracks;
}
//# sourceMappingURL=audioTrack.d.ts.map
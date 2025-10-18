// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoAudioPitch } from '../../smo/data/music';
import { PromiseHelpers } from '../../common/promiseHelpers';
import { SmoOscillatorInfo, SmoInstrument, SmoOscillatorInfoAllTypes,
  SmoOscillatorInfoNumberType, SmoOscillatorInfoNumberArType, SmoOscillatorInfoStringType, SmoOscillatorInfoStringNullType,
  SmoOscillatorInfoWaveformType, SmoOscillatorInfoSustainType, SmoOscillatorInfoOptionsType } from '../../smo/data/staffModifiers';
import {
  getSoundfontKits,
  Soundfont,
  getSoundfontNames,
  Reverb,
  Soundfont2Sampler,
} from 'smplr';

export const instrumentSampleMap: Record<string, string> = {
  'piano':'acoustic_grand_piano',
  'bass':'acoustic_bass',
  'jazzBass': 'electric_bass_finger',
  'eGuitar': 'electric_guitar_jazz',
  'cello': 'cello',
  'violin': 'violin',
  'trumpet':'trumpet',
  'horn': 'french_horn',
  'trombone':'trombone',
  'tuba': 'tuba',
  'clarinet':'clarinet',
  'flute':'flute',
  'altoSax':'alto_sax',
  'tenorSax':'tenor_sax',
  'bariSax':'baritone_sax',
   'pad': 'pad_3_polysynth',
   'percussion':'timpani'
};
export const loadedSoundfonts: Record<string, Soundfont> = {};
// There is no standard for percussion notation.  We adopt the convention used
// often for drumsets that rounded note heads are membrane/stick drums, and 
// the accidentals are symbols or hand drums.  We may offer an option of using
// conventional note heads, e.g. an x instead of the accidental for cymbals
export const drumMidiMap: Record<number, number> = {
   58: 54, // Bb3 Tambourine
   59: 56, // B3 Cowbell
   60: 39, // C4 Hand Clap
   61: 58, // Db4 vibraslap
   62: 42, // Closed Hi Hat, D4
   63: 61, // Eb4 Low Bongo
   64: 46, // Open Hi Hat, E4
   65: 35, // Acoustic Bass Drum, F4
   66: 60, // Gb4 High Bongo
   67: 38, // Kick Drum G4
   68: 64, // Ab4 Low Conga
   69: 41, // Low Tom, A4
   70: 63, // Bb4 High Conga
   71: 47, // Mid Tom  B4
   72: 38, // Snare C5
   73: 62, // Db5 High Conga muted
   74: 50, // High Tom D5
   75: 52, // Eb5 65 High Timbale
   76: 51, // Ride E5
   77: 49, // F5 Crash
   78: 70, // Gg5 Low Timbale
   79: 57, // G5 Agogo Bell
   80: 70, // Ab5 Maracas
   81: 76, // A5 Wood Block
   82: 75, // Bb5 Claves
   83: 74, // Guiro B5
   84: 81, // Triangle C6
}
            
/**
 * A set of parameters from the instrument interface used to create audio from samples.
 * @category SuiAudio
 */
  export interface SampleChooserParams {
  family?: string,
  instrument: string,
  frequency: number,
  duration: number,
  gain: number,
  articulation?: string
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
  sample: AudioBuffer,
  frequency: number,
  patch: string,
  gain: number
}
/**
 * Interface for a chooser function and a set of samples
 * @category SuiAudio
 */
export interface InstrumentSampleChooser {
  instrument: string,
  sampleChooser: SampleChooser,
  samples: SmoOscillatorInfo[]
}

/**
 * Logic to create audio nodes out of HTML5 media elements
 * @category SuiAudio
 */
export class SuiSampleMedia {
  static sampleFiles: SmoOscillatorInfo[] = [];
  static sampleBufferMap: Record<string, AudioBuffer> = {};
  static sampleOscMap: Record<string, SmoOscillatorInfo[]> = {};
  static instrumentChooser: Record<string, InstrumentSampleChooser> = {};
  static receivedBuffer: boolean = false;
  static getFamilyForInstrument(instKey: string): string {
    const sound = SuiSampleMedia.instrumentChooser[instKey];
    if (sound && sound.samples.length) {
      return sound.samples[0].family;
    }
    return 'keyboard';
  }
  /**
  * Load samples so we can play the music
  * @returns - promise, resolved when loaded
  */
  static async samplePromise(audio: AudioContext): Promise<any> {
    let i = 0;
    const instrumentKeys = Object.keys(instrumentSampleMap);
    const context = new AudioContext() as unknown as AudioContext;
    for (let i = 0; i < instrumentKeys.length; ++i)  {
      const key = instrumentKeys[i];
      const sampler = instrumentSampleMap[key];
      const obj: any = {};
      if (key === 'percussion') {
        obj['instrumentUrl'] = 'https://smoosic.github.io/SmoSounds/drumfont/percussion-ogg.js';
      } else {
        obj['instrument'] = sampler;
      }
      const instrument = new Soundfont(context, obj);
      // instrument.output.addEffect("reverb", new Reverb(context), 0.9);
      await instrument.load;
      instrument.output.addEffect("reverb", new Reverb(context), 0.1);
      loadedSoundfonts[key] = instrument;
    }
  }  
}

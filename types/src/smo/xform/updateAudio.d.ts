import { SmoScore } from '../data/score';
import { ScoreRoadMapBuilder } from './roadmap';
/**
 * Set the note duration to account for ties.  Tied notes have greater duration,
 * notes tied to don't sound.
 * @param score
 * @param roadMap
 */
export declare const PopulateAudioData: (score: SmoScore, roadMap: ScoreRoadMapBuilder) => void;

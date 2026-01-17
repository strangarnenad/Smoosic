import { SmoScore } from '../data/score';
export type playerStartReason = 'scoreStart' | 'startRepeat' | 'DC' | 'DS' | 'Volta';
export type playerEndReason = 'scoreStart' | 'scoreEnd' | 'endRepeat' | 'Coda' | 'Segno' | 'Volta';
export interface ScoreSegment {
    startMeasure: number;
    endMeasure: number;
    startReason: playerStartReason;
    endReason: playerEndReason;
    ending: number;
}
/**
 * Builds and maintans a road map from repeats and other landmarks in a score.
 * Maintains an internal cursor into the current measure.
 * This object should be repopulated (or recreated) each time it is played because the
 * sections are consumed as the internal cursor advances.
 */
export declare class ScoreRoadMapBuilder {
    jumpQueue: ScoreSegment[];
    lastSkip: number;
    score: SmoScore;
    measureTracker: number;
    dcMeasure: number;
    codaMeasure: number;
    signMeasure: number;
    dsMeasure: number;
    fineMeasure: number;
    toCodaMeasure: number;
    static get defaultMap(): ScoreSegment;
    constructor(score: SmoScore);
    /**
     * Populate repeat landmarks e.g. coda
     */
    private populateLandmarks;
    /**
     * When populating DC/DS logic, gets the score segments between start and the landmark (coda, fine etc).
     * @param start
     * @param end
     * @param startReason
     * @returns
     */
    private duplicateJumpsFromTo;
    /**
     * Internal function to find the voltas before/after a repeat
     * @param startMeasure
     * @param endMeasure
     * @returns
     */
    private findVoltaBetween;
    /**
     * Gets the next measure in the score, including repeats etc.  And advances the internal
     * cursor
     * @returns
     */
    getAndAdvance(): number;
    /**
     * Returns true if all the score measures have been played
     *
     * @readonly
     * @memberof ScoreRoadMapBuilder
     */
    get isDone(): boolean;
    private populateRange;
    /**
     * Populate the jump queue of sections of the score, starting
     * at the given measure.  This should be called before calling
     * getAndAdvance the first time.
     * @param startMeasure
     */
    populate(startMeasure: number): void;
}

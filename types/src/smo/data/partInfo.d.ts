import { SmoMeasureFormat, SmoMeasureFormatParamsSer } from './measureModifiers';
import { SmoLayoutManager, SmoLayoutManagerParamsSer } from './scoreModifiers';
import { SmoTextGroup, SmoTextGroupParamsSer } from './scoreText';
import { StaffModifierBase } from './staffModifiers';
export type SmoPartInfoStringType = 'partName' | 'partAbbreviation';
export declare const SmoPartInfoStringTypes: SmoPartInfoStringType[];
export type SmoPartInfoNumType = 'stavesAfter' | 'stavesBefore';
export declare const SmoPartInfoNumTypes: SmoPartInfoNumType[];
export type SmoPartInfoBooleanType = 'preserveTextGroups' | 'cueInScore' | 'expandMultimeasureRests';
export declare const SmoPartInfoBooleanTypes: SmoPartInfoBooleanType[];
export declare const SmoPartAttributesBasic: string[];
/**
 * @category SmoObject
 */
export interface SmoMidiInstrument {
    channel: number;
    program: number;
    volume: number;
    pan: number;
}
/**
 * Data contained in a part.  A part has its own text, measure formatting and page layouts,
 * and contains the notes from the score.  It can be comprised of 1 or 2 adjacent staves.
 * Usually you will call
 * {@link SmoPartInfo.defaults}, and modify the parameters you need to change.
 * @category SmoObject
 */
export interface SmoPartInfoParams {
    /**
     * Name of the part, can be used in headers
     */
    partName: string;
    /**
     * abbrevation of part name
     */
    partAbbreviation: string;
    /**
     * indicates that this part include the next stave  (e.g. piano part)
     */
    stavesAfter: number;
    /**
     * indicates that this part include the previous stave  (e.g. piano part)
     */
    stavesBefore: number;
    /**
     * parts can have their own page settings, zoom settings, etc.
     */
    layoutManager?: SmoLayoutManager;
    /**
     * parts can have their own measure formatting
     */
    measureFormatting?: Record<number, SmoMeasureFormat>;
    /**
     * for part-specific text
     */
    textGroups: SmoTextGroup[];
    /**
     * indicates a part has its own text, not inherited from the score
     */
    preserveTextGroups: boolean;
    /**
     * indicates the part appears as cue size in the score
     */
    cueInScore: boolean;
    /**
     * future, for playback.  TODO: Note staves contain instruments that compete with this.
     * maybe this will be removed
     */
    midiDevice: string | null;
    /**
     * see midiDevice
     */
    midiInstrument: SmoMidiInstrument | null;
    /**
     * indicates multimeasure rests in parts should be expanded.
     */
    expandMultimeasureRests: boolean;
}
/**
 * Serialized part information
 * @category serialization
 */
export interface SmoPartInfoParamsSer {
    /** constructor */
    ctor: string;
    /**
     * Name of the part, can be used in headers
     */
    partName: string;
    /**
     * abbrevation of part name
     */
    partAbbreviation: string;
    /**
     * indicates that this part include the next stave  (e.g. piano part)
     */
    stavesAfter: number;
    /**
     * indicates that this part include the previous stave  (e.g. piano part)
     */
    stavesBefore: number;
    /**
     * parts can have their own page settings, zoom settings, etc.
     */
    layoutManager?: SmoLayoutManagerParamsSer;
    /**
     * parts can have their own measure formatting
     */
    measureFormatting?: Record<number, SmoMeasureFormatParamsSer>;
    /**
     * for part-specific text
     */
    textGroups: SmoTextGroupParamsSer[];
    /**
     * indicates a part has its own text, not inherited from the score
     */
    preserveTextGroups: boolean;
    /**
     * indicates the part appears as cue size in the score
     */
    cueInScore: boolean;
    /**
     * future, for playback.  TODO: Note staves contain instruments that compete with this.
     * maybe this will be removed
     */
    midiDevice: string | null;
    /**
     * see midiDevice
     */
    midiInstrument: SmoMidiInstrument | null;
    /**
     * indicates multimeasure rests in parts should be expanded.
     */
    expandMultimeasureRests: boolean;
}
/**
 * Part info contains information that group 1 or 2 adjacent staves.
 * Parts can have formatting that is indepenedent of the score
 * @category SmoObject
 */
export declare class SmoPartInfo extends StaffModifierBase {
    partName: string;
    partAbbreviation: string;
    layoutManager: SmoLayoutManager;
    measureFormatting: Record<number, SmoMeasureFormat>;
    textGroups: SmoTextGroup[];
    stavesAfter: number;
    stavesBefore: number;
    preserveTextGroups: boolean;
    cueInScore: boolean;
    displayCues: boolean;
    expandMultimeasureRests: boolean;
    midiInstrument: SmoMidiInstrument | null;
    midiDevice: string | null;
    static get defaults(): SmoPartInfoParams;
    constructor(params: SmoPartInfoParams);
    static deserialize(jsonObj: SmoPartInfoParamsSer): SmoPartInfo;
    serialize(): SmoPartInfoParamsSer;
    updateTextGroup(textGroup: SmoTextGroup, toAdd: boolean): void;
    removeTextGroup(textGroup: SmoTextGroup): void;
    addTextGroup(textGroup: SmoTextGroup): void;
}
//# sourceMappingURL=partInfo.d.ts.map
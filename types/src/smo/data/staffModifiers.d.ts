import { SmoSelector } from '../xform/selections';
import { SmoNote } from './note';
import { SmoAttrs, SvgPoint, SmoObjectParams, Clef, SvgBox, SmoModifierBase, Pitch } from './common';
import { SmoTabNote, SmoFretPosition } from './noteModifiers';
/**
 * Base class that mostly standardizes the interface and deals with serialization.
 * @param ctor constructor for derived class
 * @param logicalBox bounding box in SVG coordinates, if rendered
 * @param attrs object identification
 * @param startSelector where the modifier starts
 * @param endSelector where it ends
 * @category SmoObject
 * */
export declare abstract class StaffModifierBase implements SmoModifierBase {
    attrs: SmoAttrs;
    ctor: string;
    associatedStaff: number;
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    logicalBox: SvgBox | null;
    element: SVGSVGElement | null;
    constructor(ctor: string);
    static deserialize(params: SmoObjectParams): any;
    serializeWithId(): any;
    abstract serialize(): any;
}
/**
 * @category serialization
 */
export interface StaffModifierBaseSer {
    attrs: SmoAttrs;
    ctor: string;
    associatedStaff: number;
    startSelector: SmoSelector;
    endSelector: SmoSelector;
}
export type SoundSustain = 'percussive' | 'sustained';
export type oscillatorType = 'sample' | 'sine' | 'sawtooth' | 'square' | 'triangle' | 'custom';
export type oscillatorOptions = 'plucked' | 'bowed' | 'muted' | 'accented' | 'frequency-sweep' | 'na';
/**
 * Parameters of an instrument used to create audio nodes
 * @category SmoObject
 */
export interface SmoOscillatorInfo {
    waveform: oscillatorType;
    sustain: SoundSustain;
    realOvertones: number[];
    imaginaryOvertones: number[];
    sample: string | null;
    family: string;
    instrument: string;
    nativeFrequency: number;
    dynamic: number;
    options: oscillatorOptions[];
    minDuration: number;
    maxDuration: number;
}
export type SmoOscillatorInfoNumberType = 'minDuration' | 'maxDuration' | 'dynamic' | 'nativeFrequency';
export type SmoOscillatorInfoNumberArType = 'realOvertones' | 'imaginaryOvertones';
export type SmoOscillatorInfoStringType = 'family';
export type SmoOscillatorInfoStringNullType = 'sample';
export type SmoOscillatorInfoWaveformType = 'waveform';
export type SmoOscillatorInfoSustainType = 'sustain';
export type SmoOscillatorInfoOptionsType = 'options';
export declare const SmoOscillatorInfoAllTypes: string[];
export type SmoOscillatorAnyType = SmoOscillatorInfoNumberType | SmoOscillatorInfoNumberArType | SmoOscillatorInfoStringType | SmoOscillatorInfoStringNullType | oscillatorType | SoundSustain;
/**
 * Define an instrument.  An instrument is associated with a part, but a part can have instrument changes
 * and thus contain multiple instruments at different points in the score.
 * Not all of these parameters are fully utilized yet, and there are plans to greatly expand what
 * an SmoInstrument is.  Note I may move this to PartInfo module.
 * @category SmoObject
 */
export interface SmoInstrumentParams {
    /**
     * where instrument starts to take effect
     */
    startSelector: SmoSelector;
    /**
     * where instrument changes
     */
    endSelector: SmoSelector;
    /**
     * name, for metadata
     */
    instrumentName: string;
    /**
     * woodwind, brass etc.
     */
    family: string;
    /**
     * instrument sample
     */
    instrument: string;
    /**
     * abbreviation for score
     */
    abbreviation: string;
    /**
     * -2 indicates key of Bb
     */
    keyOffset: number;
    /**
     * for future
     */
    midiInstrument: number;
    /**
     * for future
     */
    midichannel: number;
    /**
     * for future
     */
    midiport: number;
    /**
     * default clef
     */
    clef: Clef;
    /**
     * future, can be used to set sample
     */
    mutes?: string;
}
/**
 * Serialization of instrument-specific settings, such as sound and key
 * @category serialization
 */
export interface SmoInstrumentParamsSer extends SmoInstrumentParams {
    /**
     * constructor
     */
    ctor: string;
}
export type SmoInstrumentNumParamType = 'keyOffset' | 'midichannel' | 'midiport' | 'midiInstrument';
export declare const SmoInstrumentNumParams: SmoInstrumentNumParamType[];
export type SmoInstrumentStringParamType = 'instrumentName' | 'abbreviation' | 'family' | 'instrument';
export declare const SmoInstrumentStringParams: SmoInstrumentStringParamType[];
/**
 * Define an instrument.  An instrument is associated with a part, but a part can have instrument changes
 * and thus contain multiple instruments at different points in the score.
 * Not all of these parameters are fully utilized yet, and there are plans to greatly expand what
 * an SmoInstrument is.  Note I may move this to PartInfo module.
 * @category SmoObject
 */
export declare class SmoInstrument extends StaffModifierBase {
    static get attributes(): string[];
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    instrumentName: string;
    abbreviation: string;
    keyOffset: number;
    clef: Clef;
    midiInstrument: number;
    midichannel: number;
    midiport: number;
    family: string;
    instrument: string;
    articulation?: string;
    mutes?: string;
    static get defaults(): SmoInstrumentParams;
    static get defaultOscillatorParam(): SmoOscillatorInfo;
    constructor(params: SmoInstrumentParams);
    serialize(): SmoInstrumentParamsSer;
    eq(other: SmoInstrument): boolean;
}
/**
 * @category SmoObject
 */
export interface SmoInstrumentMeasure {
    measureIndex: number;
    instrument: SmoInstrumentParams;
}
/**
 * constructor params for {@link SmoStaffHairpin}
 * @category SmoObject
 */
export interface SmoStaffHairpinParams {
    /**
     * extra x on start of shape
     */
    xOffsetLeft: number;
    /**
     * extra x on end of shape
     */
    xOffsetRight: number;
    /**
     * yOffset
     */
    yOffset: number;
    /**
     * flare-out pixels
     */
    height: number;
    /**
     * above, below
     */
    position: number;
    /**
     * cresc, dim.
     */
    hairpinType: number;
    /**
     * where it starts
     */
    startSelector: SmoSelector;
    /**
     * where it starts
     */
    endSelector: SmoSelector;
}
/**
 * Serialized dynamic marking (hairpin)
 * @category serialization
 */
export interface SmoStaffHairpinParamsSer extends StaffModifierBaseSer {
    /**
     * extra x on start of shape
     */
    xOffsetLeft: number;
    /**
     * extra x on end of shape
     */
    xOffsetRight: number;
    /**
     * yOffset
     */
    yOffset: number;
    /**
     * flare-out pixels
     */
    height: number;
    /**
     * above, below
     */
    position: number;
    /**
     * cresc, dim.
     */
    hairpinType: number;
    /**
     * where it starts
     */
    startSelector: SmoSelector;
    /**
     * where it starts
     */
    endSelector: SmoSelector;
}
/**
 * Also called crescendo etc.
 * @category SmoObject
 */
export declare class SmoStaffHairpin extends StaffModifierBase {
    static get editableAttributes(): string[];
    static get defaults(): SmoStaffHairpinParams;
    static get positions(): {
        LEFT: number;
        RIGHT: number;
        ABOVE: number;
        BELOW: number;
    };
    static get types(): {
        CRESCENDO: number;
        DECRESCENDO: number;
    };
    static get attributes(): string[];
    xOffsetLeft: number;
    xOffsetRight: number;
    yOffset: number;
    height: number;
    position: number;
    hairpinType: number;
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    serialize(): SmoStaffHairpinParamsSer;
    constructor(params: SmoStaffHairpinParams);
}
/**
 * constructor params for {@link SmoStaffTextBracket}
 * @category SmoObject
 */
export interface SmoStaffTextBracketParams {
    /**
     * the ledger line
     */
    line: number;
    /**
     * above or below
     */
    position: number;
    /**
     * the text to display
     */
    text: string;
    /**
     * text can have superscript
     */
    superscript: string;
    /**
     * extend of the line
     */
    startSelector: SmoSelector;
    /**
     * extend of the line
     */
    endSelector: SmoSelector;
}
/**
 * serializable bits of SmoStaffTextBracket
 * @category serialization
 */
export interface SmoStaffTextBracketParamsSer extends StaffModifierBaseSer {
    /**
     * constructor
     */
    ctor: string;
    attrs: SmoAttrs;
    /**
     * the ledger line
    */
    line: number;
    /**
     * above or below
     */
    position: number;
    /**
     * the text to display
     */
    text: string;
    /**
     * text can have superscript
     */
    superscript: string;
    /**
     * extend of the line
     */
    startSelector: SmoSelector;
    /**
     * extend of the line
     */
    endSelector: SmoSelector;
}
export type SmoTextBracketStringType = 'text' | 'superscript';
export declare const SmoTextBracketStringTypes: SmoTextBracketStringType[];
export type SmoTextBracketNumberType = 'line' | 'position';
export declare const SmoTextBracketNumberTypes: SmoTextBracketNumberType[];
/**
 * Text like 8va, rit. that is bracketed on a system
 * @category SmoObject
 */
export declare class SmoStaffTextBracket extends StaffModifierBase {
    static RITARD: string;
    static ACCEL: string;
    static CRESCENDO: string;
    static DIMENUENDO: string;
    static OCTAVEUP: string;
    static OCTAVEDOWN: string;
    static OCTAVEUP2: string;
    static OCTAVE2DOWN: string;
    static get defaults(): SmoStaffTextBracketParams;
    static get positions(): {
        TOP: number;
        BOTTOM: number;
    };
    static get attributes(): string[];
    position: number;
    text: string;
    superscript: string;
    line: number;
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    serialize(): SmoStaffTextBracketParamsSer;
    serializeWithId(): SmoStaffTextBracketParamsSer;
    constructor(params: SmoStaffTextBracketParams);
}
/**
 * used for debugging
 * @internal
 */
export interface SlurDefaultParams {
    stemDir1: number;
    stemDir2: number;
    line1: number;
    line2: number;
    lineMin: number;
    lineMax: number;
    position: number;
    orientation: number;
    sameBeam: number;
}
export type SlurNumberParam = 'spacing' | 'thickness' | 'xOffset' | 'yOffset' | 'position' | 'position_end' | 'cp1x' | 'cp1y' | 'cp2x' | 'cp2y';
export declare const SlurNumberParams: SlurNumberParam[];
/**
 * parameters for a slur
 * @param spacing between note and curve
 * @param thickness thickness of the line
 * @param xOffset in pixels
 * @param yOffset in pixels
 * @param position top or bottom of the chord we are attached to
 * @param position_end top or bottom of the chord we are attached to
 * @param invert turns that frown upside down
 * @param cp1x bz control point
 * @param cp1y bz control point
 * @param cp2x bz control point
 * @param cp2y bz control point
 * @param startSelector the start note we are attached to
 * @param endSelector the end note we are attached to
 * @category SmoObject
 */
export interface SmoSlurParams {
    /**
     * spacing between note and curve
     * */
    spacing: number;
    /**
     * thickness of the curve
     */
    thickness: number;
    /**
     * x offset on both ends
     */
    xOffset: number;
    /**
     * move whole curve up or down
     */
    yOffset: number;
    /**
     * VF position, whether head-end or stem end
     */
    position: number;
    /**
     * VF position for right side of slur
     */
    position_end: number;
    /**
     * indicates whether the user wants up, down or 'auto'.
     * internally, sets the 'invert' flag
     */
    orientation: number;
    /**
     * control point for bz curve
     */
    cp1x: number;
    /**
     * control point for bz curve
     */
    cp1y: number;
    /**
     * control point for bz curve
     */
    cp2x: number;
    /**
     * control point for bz curve
     */
    cp2y: number;
    /**
     * start note of the curve
     */
    startSelector: SmoSelector;
    /**
     * start note of the curve
     */
    endSelector: SmoSelector;
    /**
     * optional for debugging
     */
    debugParams?: SlurDefaultParams;
}
/**
 * serializable bits of slur
 * @category serialization
 */
export interface SmoSlurParamsSer extends SmoSlurParams {
    /**
     * constructor
     */
    ctor: string;
}
/**
 * Defines a slur
 * @category SmoObject
 */
export declare class SmoSlur extends StaffModifierBase {
    static get defaults(): SmoSlurParams;
    static get positions(): {
        HEAD: number;
        TOP: number;
        ABOVE: number;
        BELOW: number;
        AUTO: number;
    };
    static get orientations(): {
        AUTO: number;
        UP: number;
        DOWN: number;
    };
    static get parameterArray(): string[];
    spacing: number;
    thickness: number;
    xOffset: number;
    yOffset: number;
    position: number;
    position_end: number;
    orientation: number;
    cp1x: number;
    cp1y: number;
    cp2x: number;
    cp2y: number;
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    serialize(): SmoSlurParamsSer;
    get controlPoints(): SvgPoint[];
    constructor(params: SmoSlurParams);
}
/**
 * Map pitch indices of the tie line
 * @category SmoObject
 */
export interface TieLine {
    from: number;
    to: number;
}
/**
 * Constructor parameters for a tie.
 * @category SmoObject
 */
export interface SmoTieParams {
    /**
     * future: x offset on both sides
     */
    tie_spacing: number;
    /**
     * x coord of cp for bz curve
     */
    cp1: number;
    /**
     * x coord of cp for bz curve
     */
    cp2: number;
    /**
     * x offset
     */
    first_x_shift: number;
    /**
     * x offset end
     */
    last_x_shift: number;
    /**
     * y offset for all the curves
     */
    y_shift: number;
    /**
     * map of lines for the pitches
     */
    lines: TieLine[];
    /**
     * start note
     */
    startSelector: SmoSelector | null;
    /**
     * end note
     */
    endSelector: SmoSelector | null;
}
/**
 * serializable bits of SmoTie
 * @category serialization
 */
export interface SmoTieParamsSer extends SmoTieParams {
    /**
     * constructor
     */
    ctor: string;
}
/**
 * Like slur, but multiple pitches.
 * @category SmoObject
 */
export declare class SmoTie extends StaffModifierBase {
    invert: boolean;
    cp1: number;
    cp2: number;
    first_x_shift: number;
    last_x_shift: number;
    y_shift: number;
    tie_spacing: number;
    lines: TieLine[];
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    static get defaults(): SmoTieParams;
    static get parameterArray(): string[];
    static get vexParameters(): string[];
    static isTie(modifier: SmoTie | SmoModifierBase): modifier is SmoTie;
    static createLines(fromNote: SmoNote, toNote: SmoNote): TieLine[];
    serialize(): SmoTieParamsSer;
    checkLines(fromNote: SmoNote, toNote: SmoNote): void;
    constructor(params: SmoTieParams);
}
/**
 * Parameters for SmoTabStave
 * @category SmoObject
 */
export interface SmoTabStaveParams {
    /**
     * start selector, by measure
     */
    startSelector: SmoSelector;
    /**
     * end selector, by measure
     */
    endSelector: SmoSelector;
    /**
     * space between staves, in pixels
     */
    spacing: number;
    /**
     * number of lines
     */
    numLines: number;
    /**
     * Default setting of showing stems
     */
    showStems: boolean;
    /**
     * If true, the score should keep a single tab stave for all measures
     */
    allMeasures: boolean;
    /**
     * The strings for each line
     */
    stringPitches?: Pitch[];
}
export interface SmoTabStaveParamsSer extends SmoTabStaveParams {
    ctor: string;
}
/**
 * A stave for guitar tablature sits below the music stave.
 * @category SmoObject
 */
export declare class SmoTabStave extends StaffModifierBase {
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    spacing: number;
    numLines: number;
    showStems: boolean;
    allMeasures: boolean;
    stringPitches: Pitch[];
    /** The default guitar tuning.  Different instruments could have different tuning */
    static get defaultStringPitches(): Pitch[];
    /**
     * Get default tab note position for a pitch on a music staff
     * @param pitch
     * @param stringPitches
     * @returns
     */
    static getDefaultPositionForStaff(pitch: Pitch, stringPitches: Pitch[], transposeIndex: number, stringIndex?: number): SmoFretPosition;
    /**
     * Find default fret positions for a set of pitches from a note
     * @param pitches
     * @param stringPitches
     * @returns
     */
    static getDefaultPositionsForStaff(pitches: Pitch[], stringPitches: Pitch[], transposeIndex: number): SmoFretPosition[];
    static get defaults(): SmoTabStaveParams;
    static parameterArray: string[];
    static featuresEqual(st1: SmoTabStave, st2: SmoTabStave): boolean;
    static overlaps(st1: StaffModifierBase, st2: StaffModifierBase): boolean;
    getTabNoteFromNote(note: SmoNote, transposeIndex: number): SmoTabNote;
    constructor(params: SmoTabStaveParams);
    serialize(): any;
}
/**
 * @category SmoObject
 */
export interface SmoTabTieParams {
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    hammerType: number;
    slideType: number;
    isTap: boolean;
    text: string;
}
/**
 * @category serialization
 */
export interface SmoTabTieParamsSer extends SmoTabTieParams {
    ctor: string;
}
/**
 * @category SmoObject
 */
export declare class SmoTabTie extends StaffModifierBase {
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    hammerType: number;
    slideType: number;
    isTap: boolean;
    text: string;
    static get hammerType(): {
        None: number;
        Hammeron: number;
        Pulloff: number;
    };
    static get slideType(): {
        None: number;
        SlideUp: number;
        SlideDown: number;
    };
    static get defaults(): SmoTabTieParams;
    static get parameterArray(): string[];
    constructor(params: SmoTabTieParams);
    serialize(): Partial<SmoTabTieParamsSer>;
}
/**
 * @category SmoObject
 */
export interface SmoPedalMarkingParams {
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    startMark: boolean;
    releaseMark: boolean;
    bracket: boolean;
    depressText: string;
    releaseText: string;
    releases: SmoSelector[];
}
/**
 * @category serialization
 */
export interface SmoPedalMarkingParamsSer extends SmoPedalMarkingParams {
    ctor: string;
}
export declare function isSmoPedalMarkingParamsSer(params: Partial<SmoPedalMarkingParamsSer>): params is SmoPedalMarkingParamsSer;
/**
 * @category SmoObject
 */
export declare class SmoPedalMarking extends StaffModifierBase {
    startSelector: SmoSelector;
    endSelector: SmoSelector;
    startMark: boolean;
    releaseMark: boolean;
    bracket: boolean;
    depressText: string;
    releaseText: string;
    releases: SmoSelector[];
    static get defaults(): SmoPedalMarkingParams;
    static get parameterArray(): string[];
    constructor(params: SmoPedalMarkingParams);
    serialize(): SmoPedalMarkingParamsSer;
}
export declare const staffModifierDynamicCtorInit: () => void;
//# sourceMappingURL=staffModifiers.d.ts.map
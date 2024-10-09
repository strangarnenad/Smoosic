import { SmoNoteModifierBase } from '../data/noteModifiers';
import { Pitch } from '../data/common';
import { SmoSelector } from '../xform/selections';
import { XmlTupletData } from './xmlState';
/**
 * @category serialization
 */
export interface XmlOrnamentData {
    ctor: string;
    params: Record<string, string>;
}
/**
 * @category serialization
 */
export interface XmlSmoMap {
    xml: string;
    smo: string;
}
/**
 * @category serialization
 */
export interface XmlDurationAlteration {
    noteCount: number;
    noteDuration: number;
}
/**
 * @category serialization
 */
export interface XmlDuration {
    tickCount: number;
    duration: number;
    alteration: XmlDurationAlteration;
}
/**
 * Store slur information when parsing xml
 * @category serialization
 */
export interface XmlSlurType {
    number: number;
    type: string;
    orientation: string;
    placement: string;
    controlX: number;
    controlY: number;
    selector: SmoSelector;
    yOffset: number;
}
/**
 * Store tie  information when parsing xml
 * @category serialization
 */
export interface XmlTieType {
    number: number;
    type: string;
    orientation: string;
    selector: SmoSelector;
    pitchIndex: number;
}
/**
 * Store tuplet information when parsing xml
 * @category serialization
 */
export interface XmlTupletType {
    number: number;
    type: string;
    data: XmlTupletData | null;
}
/**
 * @category serialization
 */
export interface XmlTimeModificationType {
    actualNotes: number;
    normalNotes: number;
    normalType: number;
}
/**
 * @category serialization
 */
export interface XmlEndingData {
    numbers: number[];
    type: string;
}
export type LyricSyllabic = 'begin' | 'end' | 'middle' | 'single';
/**
 * Store lyric information when parsing xml
 * @category serialization
 */
export interface XmlLyricData {
    _text: string;
    verse: number | string;
    syllabic: LyricSyllabic;
}
/**
 * Utilities for parsing and serialzing musicXML.
 * @category serialization
 */
export declare class XmlHelpers {
    /**
     * mxml note 'types', really s/b stem types.
     * For grace notes, we use the note type and not duration
     * to get the flag
     */
    static get noteTypesToSmoMap(): Record<string, number>;
    static readonly _ticksToNoteTypeMap: Record<number, string>;
    static get ticksToNoteTypeMap(): Record<number, string>;
    static closestStemType(ticks: number): string;
    static get beamStates(): Record<string, number>;
    static get ornamentXmlToSmoMap(): Record<string, XmlOrnamentData>;
    static createRootElement(): XMLDocument;
    static getNumberFromElement(parent: Element, path: string, defaults: number): number;
    static getTextFromElement(parent: Element, path: string, defaults: number | string | null): string;
    static getNumberFromAttribute(node: Element, attribute: string, defaults: number): number;
    static getTextFromAttribute(node: Element, attribute: string, defaults: string): string;
    static getChildrenFromPath(parent: Element, pathAr: string[]): Element[];
    static getStemType(noteElement: Element): number;
    static getEnding(barlineNode: Element): XmlEndingData | null;
    static getBarline(barlineNode: Element): number;
    static assignDefaults(node: Element, defObj: any, parameters: XmlSmoMap[]): void;
    static nodeAttributes(node: Element): Record<string, string>;
    static getStaffId(node: Element): number;
    static noteBeamState(noteNode: Element): number;
    static getVoiceId(node: Element): number;
    static smoPitchFromNote(noteNode: Element, defaultPitch: Pitch): Pitch;
    static isGrace(noteNode: Element): boolean;
    static isSystemBreak(measureNode: Element): boolean;
    static durationFromType(noteNode: Element, def: number): number;
    static durationFromNode(noteNode: Element, def: number): number;
    static ticksFromDuration(noteNode: Element, divisions: number, def: number): XmlDuration;
    static getTieData(noteNode: Element, selector: SmoSelector, pitchIndex: number): XmlTieType[];
    static getSlurData(noteNode: Element, selector: SmoSelector): XmlSlurType[];
    static getCrescendoData(directionElement: Element): {};
    static getTimeModificationType(noteNode: Element): XmlTimeModificationType | null;
    static getTupletData(noteNode: Element): XmlTupletType[];
    static articulationsAndOrnaments(noteNode: Element): SmoNoteModifierBase[];
    static lyrics(noteNode: Element): XmlLyricData[];
    static getTimeAlteration(noteNode: Element): XmlDurationAlteration | null;
    static createTextElementChild(parentElement: Element, elementName: string, obj: any, field: string): Element;
    static createAttributes(element: Element, obj: any): void;
    static createAttribute(element: Element, name: string, value: any): void;
}
//# sourceMappingURL=xmlHelpers.d.ts.map
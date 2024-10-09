/// <reference types="node" />
import { SuiScoreViewOperations } from "./scoreViewOperations";
import { SvgBox } from '../../smo/data/common';
/**
 * @internal
 */
export interface PianoKey {
    box: SvgBox;
    keyElement: SVGSVGElement;
}
/**
 * not used currently
 * @internal
 */
export declare class SuiPiano {
    renderElement: SVGSVGElement | null;
    view: SuiScoreViewOperations;
    octaveOffset: number;
    chordPedal: boolean;
    objects: PianoKey[];
    suggestFadeTimer: NodeJS.Timer | null;
    elementId: string;
    constructor(view: SuiScoreViewOperations);
    static get dimensions(): {
        wwidth: number;
        bwidth: number;
        wheight: number;
        bheight: number;
        octaves: number;
    };
    static get wkeysPerOctave(): number;
    static get owidth(): number;
    static createAndDisplay(): void;
    _mapKeys(): void;
    _removeClass(classes: string): void;
    _removeGlow(): void;
    _fadeGlow(el: SVGSVGElement): void;
    bind(): void;
    static hidePiano(): void;
    static showPiano(): void;
    static get isShowing(): any;
    _updateSelections(ev: any): void;
    _renderControls(): void;
    handleResize(): void;
    playNote(): void;
    render(): void;
}
//# sourceMappingURL=piano.d.ts.map
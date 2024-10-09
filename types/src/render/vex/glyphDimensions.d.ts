import { SmoBarline } from '../../smo/data/measureModifiers';
import { GlyphInfo } from '../../common/vex';
/**
 * Some hard-coded dimensions of common Vexflow glyphs
 * @category SuiRender
 */
export declare class vexGlyph {
    static width(smoGlyph: GlyphInfo): number;
    static accidental(a: string): GlyphInfo;
    static barWidth(b: SmoBarline): number;
    static accidentalWidth(accidental: string): number;
    static get accidentals(): Record<string, GlyphInfo>;
    static repeatSymbolWidth(): number;
    static get tempo(): GlyphInfo;
    static keySignatureLength(key: string): number;
    static get timeSignature(): GlyphInfo;
    static get dot(): GlyphInfo;
    static get tupletBeam(): GlyphInfo;
    static get stem(): GlyphInfo;
    static get flag(): GlyphInfo;
    static clef(c: string): GlyphInfo;
    static get dimensions(): Record<string, GlyphInfo>;
}
//# sourceMappingURL=glyphDimensions.d.ts.map
import { SvgBox, SvgPoint } from '../../smo/data/common';
import { SmoMeasure } from '../../smo/data/measure';
import { SmoSelector } from '../../smo/xform/selections';
/**
 * SuiRender
 * @internal
 */
export interface CodeRegion {
    time: number;
    percent: number;
}
/**
 * @category SuiRender
 */
export declare class layoutDebug {
    static get values(): Record<string, number>;
    static get classes(): Record<number, string>;
    static get codeRegions(): Record<string, number>;
    static get codeRegionStrings(): string[];
    static mask: number;
    static _textDebug: number[];
    static timestampHash: Record<number, number>;
    static _dialogEvents: string[];
    static clearTimestamps(): void;
    static setTimestamp(region: number, millis: number): void;
    static printTimeReport(): void;
    static flagSet(value: number): number;
    static clearAll(): void;
    static setAll(): void;
    static setRenderFlags(): void;
    static clearDebugBoxes(value: number): void;
    static debugBox(svg: SVGSVGElement, box: SvgBox | null, flag: number): void;
    static setFlag(value: number): void;
    static setFlagDivs(): void;
    static updateScrollDebug(point: SvgPoint): void;
    static updateMouseDebug(client: SvgPoint, logical: SvgPoint, offset: SvgPoint): void;
    static updateDragDebug(client: SvgPoint, logical: SvgPoint, state: string): void;
    static updatePlayDebug(selector: SmoSelector, logical: SvgBox): void;
    static addTextDebug(value: number): void;
    static addDialogDebug(value: string): void;
    static measureHistory(measure: SmoMeasure, oldVal: string, newVal: any, description: string): void;
}
//# sourceMappingURL=layoutDebug.d.ts.map
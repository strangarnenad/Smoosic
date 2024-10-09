import { SmoMeasure } from '../../smo/data/measure';
import { SmoScore } from '../../smo/data/score';
export declare const fontStacks: Record<string, string[]>;
export declare const getVoiceId: (smoMeasure: SmoMeasure, voiceIx: number) => string;
export declare function renderVoltas(smoScore: SmoScore, startMeasure: number, endMeasure: number, strs: string[]): void;
/**
 * Simple serialize class that produced VEX note and voice objects
 * for vex EasyScore (for easier bug reports and test cases)
 * @category SuiRender
 */
export declare class SmoToVex {
    static convert(smoScore: SmoScore, options: any): string;
}
//# sourceMappingURL=toVex.d.ts.map
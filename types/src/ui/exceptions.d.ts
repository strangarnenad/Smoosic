import { SuiScoreView } from '../render/sui/scoreView';
/**
 * @internal
 */
export declare class SuiExceptionHandler {
    view: SuiScoreView;
    thrown: boolean;
    static _instance: SuiExceptionHandler;
    constructor(params: any);
    static get instance(): SuiExceptionHandler;
    exceptionHandler(e: any): void;
}
//# sourceMappingURL=exceptions.d.ts.map
export type promiseFunction = () => void;
export type promiseCondition = () => boolean;
export type promiseInstance = () => Promise<any>;
/**
 * @internal
 */
export interface PromiseParameters {
    endCondition: promiseCondition;
    preResolveMethod: promiseFunction | null;
    pollMethod: promiseFunction | null;
    pollTime: number;
}
/**
 * @internal
 */
export declare function TEmptyPromise<T>(obj: T): Promise<T>;
/**
 * @internal
 */
export declare class PromiseHelpers {
    static makePromise(endCondition: promiseCondition, preResolveMethod: promiseFunction | null, pollMethod: promiseFunction | null, pollTime: number): Promise<void>;
    static makePromiseObj(endCondition: promiseCondition, preResolveMethod: promiseFunction | null, pollMethod: promiseFunction | null, pollTime: number): {
        endCondition: promiseCondition;
        preResolveMethod: promiseFunction | null;
        pollMethod: promiseFunction | null;
        pollTime: number;
    };
    static promiseChainThen(params: PromiseParameters[]): Promise<void>;
    static emptyPromise(): Promise<any>;
}
//# sourceMappingURL=promiseHelpers.d.ts.map
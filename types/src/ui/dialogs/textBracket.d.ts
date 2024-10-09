import { DialogDefinition, SuiDialogParams } from './dialog';
import { SmoStaffTextBracket, SmoTextBracketNumberType, SmoTextBracketStringType } from '../../smo/data/staffModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
/**
 * I think this is not used currently.  Allow the user to choose bracket settings for a
 * staff group.
 * @category SuiDialog
 */
export declare class SuiTextBracketAdapter extends SuiComponentAdapter {
    backup: SmoStaffTextBracket;
    bracket: SmoStaffTextBracket;
    changed: boolean;
    constructor(view: SuiScoreViewOperations, bracket: SmoStaffTextBracket);
    cancel(): Promise<void>;
    remove(): Promise<void>;
    commit(): Promise<any>;
    updateValue(param: SmoTextBracketNumberType, val: number): Promise<void>;
    updateText(param: SmoTextBracketStringType, val: string): Promise<void>;
    get text(): string;
    set text(val: string);
    get superscript(): string;
    set superscript(val: string);
    get position(): number;
    set position(val: number);
    get line(): number;
    set line(val: number);
}
/**
 * @category SuiDialog
 */
export declare class SuiTextBracketDialog extends SuiDialogAdapterBase<SuiTextBracketAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
//# sourceMappingURL=textBracket.d.ts.map
import { SuiDialogNotifier, SuiComponentBase, SuiBaseComponentParams } from './baseComponent';
import { SuiDragSession } from '../../../render/sui/textEdit';
import { SuiScoreViewOperations } from '../../../render/sui/scoreViewOperations';
/**
 * A complex component that handles dragged text
 * @category SuiDialog
 */
export declare class SuiDragText extends SuiComponentBase {
    dragging: boolean;
    running: boolean;
    staticText: Record<string, string>;
    altLabel: string;
    value: string;
    session: SuiDragSession | null;
    view: SuiScoreViewOperations;
    constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams);
    get html(): import("../../../common/htmlHelpers").DomBuilder;
    show(): void;
    hide(): void;
    _getInputElement(): any;
    stopEditSession(): void;
    startEditSession(): void;
    mouseMove(e: any): void;
    mouseDown(e: any): void;
    mouseUp(e: any): void;
    bind(): void;
}
//# sourceMappingURL=dragText.d.ts.map
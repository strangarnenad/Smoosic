import { SuiScoreViewOperations } from "../render/sui/scoreViewOperations";
import { SuiTracker } from "../render/sui/tracker";
import { CompleteNotifier } from "../ui/common";
import { ModalComponent } from "../ui/common";
import { BrowserEventSource, EventHandler } from "../ui/eventSource";
/**
 * A binding of a key to some action performed by a module
 * @category SuiApplication
 */
export interface KeyBinding {
    event: string;
    key: string;
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    action: string;
    module?: string;
}
/**
 * parameters for the key handlers
 * @param view
 * @param slashMode indicates that the dreaded 'slash' menus are up
 * @param completeNotifier notified  when modals close
 * @param tracker
 * @param eventSource register for event handlers
 * @category SuiApplication
 */
export interface KeyCommandParams {
    view: SuiScoreViewOperations;
    slashMode: boolean;
    completeNotifier: CompleteNotifier;
    tracker: SuiTracker;
    eventSource: BrowserEventSource;
}
/**
 * Shared interface for menus, dialogs, etc that can
 * accept UI events
 * @category SuiApplication
 */
export declare abstract class ModalEventHandler {
    abstract mouseMove(ev: any): void;
    abstract mouseClick(ev: any): void;
    abstract evKey(evdata: any): void;
    abstract keyUp(evdata: any): void;
}
export type handler = (ev: any) => void;
/**
 * Dependency injection, sends events to a proxy object, gets around some
 * cyclic dependencies when bootstrapping the application.
 * @category SuiApplication
 */
export declare class ModalEventHandlerProxy {
    _handler: ModalEventHandler | null;
    eventSource: BrowserEventSource;
    unbound: boolean;
    keydownHandler: EventHandler | null;
    keyupHandler: EventHandler | null;
    mouseMoveHandler: EventHandler | null;
    mouseClickHandler: EventHandler | null;
    constructor(evSource: BrowserEventSource);
    set handler(value: ModalEventHandler);
    evKey(ev: any): void;
    keyUp(ev: any): void;
    mouseMove(ev: any): void;
    mouseClick(ev: any): void;
    bindEvents(): void;
    unbindKeyboardForModal(dialog: ModalComponent): void;
}
//# sourceMappingURL=common.d.ts.map
import { ButtonDefinition } from '../ui/buttons/button';
import { KeyEvent } from '../smo/data/common';
/**
 * Define the base class for a modal component that resolves a promise when it is dismissed
 * @category SuiButton
 */
export abstract class ModalComponent {
  abstract closeModalPromise: Promise<void>;
}
export type keyEventCallback = (ke: KeyEvent) => void;
/**
 * Define an interface that gives up event handling when a modal is active
 * @category SuiButton
 */
export abstract class CompleteNotifier {
  abstract unbindKeyboardForModal(component: ModalComponent): void;
}
/**
 * @category SuiButton
 */
export interface RibbonLayout {
  left: string[],
  top: string[]
}
/**
 * @category SuiButton
 */
 export interface RibbonDefinition {
  ribbon: RibbonLayout,
  ribbonButtons: ButtonDefinition[]
}


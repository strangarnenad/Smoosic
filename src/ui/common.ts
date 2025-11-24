import { ButtonDefinition } from '../ui/buttons/button';
import { KeyEvent } from '../smo/data/common';
declare var $: any;
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

/**
 * Remove and replace an element, so we can reattach Vue to it
 * @param element the ID or element we are replacing
 * @returns the new element id
 */
export const replaceVueRoot = (element: string | HTMLElement): string => {
  if (typeof element === 'string') {
    if (!element.startsWith('#')) {
      element = `#${element}`;
    }
  } else {
    element = `#${element.id}`;
  }
  if ($(element).length === 0) {
    const el = $(`<div id="${element.toString().substring(1)}"></div>`);
    $('body').append(el);    
  }
  $(element).empty();
  const parentId = $(element)[0].id;
  const newId = `${parentId}-1`;
  const newElement = $(`<div id="${newId}"></div>`);
  $(element).append(newElement);
  return newId;
}

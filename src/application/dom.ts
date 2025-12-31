// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SuiNavigation } from '../ui/navigation';
import { createModalSplash } from '../ui/modalDialogs';
declare var $: any;

/**
 * Construct the DOM scaffolding for the application
 * @category SuiApplication
 */
export class SuiDom {  
  static get scrollRegionId() {
    return 'smo-scroll-region';
  }
  static createUiDom(uiDomContainer: HTMLElement | string | undefined): HTMLElement {
    if (!uiDomContainer) {
        throw new Error(`SuiDom.createUiDom: invalid container ${uiDomContainer}`);
    }
    if (typeof(uiDomContainer) === 'string') {
      uiDomContainer = document.getElementById(uiDomContainer) ?? undefined;
    }
    if (!uiDomContainer) {
      throw new Error(`SuiDom.createUiDom: invalid container ${uiDomContainer}`);
    }
    new SuiNavigation(uiDomContainer);
    SuiNavigation.instance.showBugModal();
    createModalSplash(1000);    
    return uiDomContainer;
  }
}

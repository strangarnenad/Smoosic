import { default as mainDom } from './components/mainDom.vue';
import { SuiPiano } from '../render/sui/piano';
import { SvgHelpers } from '../render/sui/svgHelpers';
import { createApp, ref, Ref } from 'vue';
declare var $: any;

export type scrollHandler = (ev: any) => void;
export class SuiNavigation {
  static instance: SuiNavigation;
  bugModalView: Ref<boolean> = ref(false);
  scrollHandlers: scrollHandler[] = [];
  constructor(uiDomContainer: HTMLElement) {
    const mainDomInit = (pianoKeys: HTMLElement) => {
      const svg = document.createElementNS(SvgHelpers.namespace, 'svg');;
      svg.id = 'piano-svg';
      svg.setAttributeNS('', 'width', '' + SuiPiano.owidth * SuiPiano.dimensions.octaves);
      svg.setAttributeNS('', 'height', '' + SuiPiano.dimensions.wheight);
      svg.setAttributeNS('', 'viewBox', '0 0 ' + SuiPiano.owidth * SuiPiano.dimensions.octaves + ' ' + SuiPiano.dimensions.wheight);
      pianoKeys.appendChild(svg);
    }
    SuiNavigation.instance = this;
    createApp(mainDom as any, { bugModalView: this.bugModalView, mainDomInit }).mount(uiDomContainer);
    $(SuiNavigation.scrollable)[0].onscroll = (ev: any) => {
      this.scrollHandlers.forEach((handler) => {
        handler(ev);
      });
    }
  }
  static get scrollable() {
    return '.musicRelief';
  }
  pushScrollHandler(handler: scrollHandler) {
    this.scrollHandlers.push(handler);
  }
  popScrollHandler() {
    return this.scrollHandlers.pop();
  }
  showBugModal() {
    $('.dom-container').addClass('show-modal');
    this.bugModalView.value = true;
  }
  hideBugModal() {
    $('.dom-container').removeClass('show-modal');
    this.bugModalView.value = false;
  }
  showDialogModal() {
    $('body').addClass('showVueDialog');
  }
  hideDialogModal() {
    $('body').removeClass('showVueDialog');
  }
}
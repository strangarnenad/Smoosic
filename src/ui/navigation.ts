import { default as mainDom } from './components/mainDom.vue';
import { SuiPiano } from '../render/sui/piano';
import { SvgHelpers } from '../render/sui/svgHelpers';
import { createApp, ref, Ref } from 'vue';
declare var $: any;

export class SuiNavigation {
  static instance: SuiNavigation;
  bugModalView: Ref<boolean> = ref(false);
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
    $('body').addClass('showAttributeDialog');
  }
  hideDialogModal() {
    $('body').removeClass('showAttributeDialog');
  }
}
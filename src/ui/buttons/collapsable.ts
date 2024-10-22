import { ButtonDefinition, SuiButton, SuiButtonParams } from './button';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { BrowserEventSource } from '../eventSource';
import { SuiMenuManager } from '../menus/manager';
import { CompleteNotifier } from '../common';
import { SmoDynamicCtor } from '../../smo/data/common';
import { DisplaySettings } from './display';
import { smoSerialize } from '../../common/serializationHelpers';

declare var $: any;

/**
 * @category SuiButton
 */
export interface SuiCollapsableButtonParams {
  ctor: string,
  buttonId: string,
  buttonElement: string,
  buttonData: ButtonDefinition,
  view: SuiScoreViewOperations,
  eventSource: BrowserEventSource,
  menus: SuiMenuManager,
  completeNotifier: CompleteNotifier
  buttons: ButtonDefinition[]
}

export function buttonIsCollapsible(action: string): boolean {
  return ['collapseChild', 'collapseChildMenu', 'collapseGrandchild', 'collapseMore'].indexOf(action) >= 0;
}

export function buttonIsBindable(action: string): boolean {
  return ['collapseChildMenu', 'menu', 'modal'].indexOf(action) >= 0;
}
/**
 * Buttons that can expand and show other buttons.  These are not used atm but may 
 * reappear as the UI grows.
 * @category SuiButton
 */
export class CollapseRibbonControl extends SuiButton {
  static get paramArray() {
    return ['ribbonButtons', 'keyCommands', 'controller', 'view', 'menus', 'buttonData', 'buttonElement',
      'eventSource'];
  }
  childButtons: ButtonDefinition[];
  constructor(parameters: SuiCollapsableButtonParams) {
    super(parameters);
    smoSerialize.filteredMerge(CollapseRibbonControl.paramArray, parameters, this);
    this.childButtons = parameters.buttons.filter((cb) =>
      cb.group === this.buttonData.group &&
      buttonIsCollapsible(cb.action)
    );
  }
  async toggleExpand() {
    this.childButtons.forEach((cb) => {
      const el = $('#' + cb.id);
      $(el).toggleClass('collapsed');
      $(el).toggleClass('expanded');
    });

    $(this.buttonElement).closest('div').toggleClass('expanded');
    $(this.buttonElement).toggleClass('expandedChildren');
    if ($(this.buttonElement).hasClass('expandedChildren')) {
      const leftSpan = $(this.buttonElement).find('.ribbon-button-text');
      $(leftSpan).text('');
      $(leftSpan).removeClass(this.buttonData.icon);
      $(this.buttonElement).addClass('icon icon-circle-left');
    } else {
      $(this.buttonElement).removeClass('icon-circle-left');
      const leftSpan = $(this.buttonElement).find('.ribbon-button-text');
      $(leftSpan).addClass(this.buttonData.icon);
      $(leftSpan).text(this.buttonData.leftText);
    }
    // Expand may change music dom, redraw
    $('body').trigger('forceScrollEvent');
  }
  bind() {
    $(this.buttonElement).closest('div').addClass('collapseContainer');
    const cb = async () => {
      await this.toggleExpand();
    }
    this.eventSource.domClick(this.buttonElement, cb);
    this.childButtons.forEach((cb) => {
      const el = $('#' + cb.id);
      if (this.completeNotifier) {
        const params: SuiButtonParams = {
          ctor: cb.ctor,
          buttonId: cb.id,
          buttonData: cb,
          buttonElement: el,
          view: this.view,
          completeNotifier: this.completeNotifier,
          eventSource: this.eventSource,
          menus: this.menus
        }
        const btn = SmoDynamicCtor[cb.ctor](params);
        if (typeof (btn.bind) === 'function') {
          btn.bind();
        }
      }
    });
  }
}

/**
 * Muse-style '...' buttons for less-common operations
 * @category SuiButton
 */
export class ExtendedCollapseParent extends SuiButton {
  constructor(parameters: SuiButtonParams) {
    super(parameters);
  }
  bind() {
    $(this.buttonElement).off('click').on('click', () => {
      $(this.buttonElement).closest('.collapseContainer').toggleClass('expanded-more');
    });
  }
}
export const collapsableButtonInit = () => {
  SmoDynamicCtor['ExtendedCollapseParent'] = (params: SuiButtonParams ) => new ExtendedCollapseParent(params);
  SmoDynamicCtor['CollapseRibbonControl'] = (params: SuiCollapsableButtonParams ) => new CollapseRibbonControl(params);
  SmoDynamicCtor['DisplaySettings'] = (params: SuiButtonParams ) => new DisplaySettings(params);
}
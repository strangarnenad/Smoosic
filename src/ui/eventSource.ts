// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { KeyEvent } from '../smo/data/common';

declare var $: any;
import { scoreChangeEvent } from '../render/sui/renderState';

/**
 * Event handler for smoosic.  Any UI element can have any number
 * of event handlers.  For modals, event handlers are added/removed 
 * as the gain/relinquish control
 * @internal
 * @param sink - an object that implements:
 * @param method - the callback method on sink
 * @param symbol - used to distinguish handler instances of the same type
 */
export type methodType = (ev: any) => Promise<any>;
export interface EventHandler {
  method: methodType,
  symbol: Symbol
}
/**
 * This is the event generating interface for Smoosic.  It is kept as 
 * skeletal as possible so applications can call event handling methods from
 * their own event logic.
 * @category SuiUiBase
 */
export class BrowserEventSource {
  keydownHandlers: EventHandler[];
  keyupHandlers: EventHandler[];
  mouseMoveHandlers: EventHandler[];
  mouseClickHandlers: EventHandler[];
  mouseUpHandlers: EventHandler[];
  mouseDownHandlers: EventHandler[];
  scoreChangeHandlers: EventHandler[] = [];
  domTriggers: EventHandler[];
  handleMouseMove: ((ev: any) => void) | null = null;
  handleMouseClick: ((ev: any) => void) | null = null;
  handleMouseUp: ((ev: any) => void) | null = null;
  handleMouseDown: ((ev: any) => void) | null = null;

  handleKeydown: (ev: KeyEvent) => void;
  handleKeyup: (ev: KeyEvent) => void;
  handleScoreChangeEvent: (ev: KeyEvent) => void;
  renderElement: any;
  constructor() {
    this.keydownHandlers = [];
    this.mouseMoveHandlers = [];
    this.mouseClickHandlers = [];
    this.mouseUpHandlers = [];
    this.mouseDownHandlers = [];
    this.domTriggers = [];
    this.keyupHandlers = [];
    this.handleKeydown = this.evKey.bind(this);
    this.handleKeyup = this.keyUp.bind(this);
    this.handleScoreChangeEvent = this.evScoreChange.bind(this);
    window.addEventListener("keydown", this.handleKeydown as any, true);
    window.addEventListener("keyup", this.handleKeyup as any, true);
    window.addEventListener(scoreChangeEvent, this.handleScoreChangeEvent as any, true);
  }

  async evKey(event: KeyEvent) {
    let i = 0;
    for (i = 0; i < this.keydownHandlers.length; ++i) {
      const handler = this.keydownHandlers[i]
      await handler.method(event);
    }
  }
  async keyUp(event: KeyEvent) {
    let i = 0;
    for (i = 0; i < this.keyupHandlers.length; ++i) {
      const handler = this.keyupHandlers[i]
      await handler.method(event);
    }
  }
  async evScoreChange(event: any) {
    let i = 0;
    for (i = 0; i < this.scoreChangeHandlers.length; ++i) {
      const handler = this.scoreChangeHandlers[i]
      await handler.method(event);
    }
  }
  mouseMove(event: any) {
    this.mouseMoveHandlers.forEach((handler) => {
      handler.method(event);
    });
  }

  mouseClick(event: any) {
    this.mouseClickHandlers.forEach((handler) => {
      handler.method(event);
    });
  }

  mouseDown(event: any) {
    this.mouseDownHandlers.forEach((handler) => {
      handler.method(event);
    });
  }

  mouseUp(event: any) {
    this.mouseUpHandlers.forEach((handler) => {
      handler.method(event);
    });
  }

  setRenderElement(renderElement: any) {
    this.renderElement = renderElement;
    var self = this;
    this.handleMouseMove = this.mouseMove.bind(this);
    this.handleMouseClick = this.mouseClick.bind(this);
    this.handleMouseUp = this.mouseUp.bind(this);
    this.handleMouseDown = this.mouseDown.bind(this);
    $(document)[0].addEventListener("mousemove", this.handleMouseMove);
    $(this.renderElement)[0].addEventListener("click", this.handleMouseClick);
    $(document)[0].addEventListener("mouseup", this.handleMouseUp);
    $(document)[0].addEventListener("mousedown", this.handleMouseDown);
  }

  _unbindHandlerArray(arSrc: EventHandler[], arDest: EventHandler[], handler: EventHandler) {
    arSrc.forEach((htest) => {
      if (handler.symbol !== htest.symbol) {
        arDest.push(htest);
      }
    });
  }

  unbindMouseMoveHandler(handler: EventHandler) {
    const handlers: EventHandler[] = [];
    this._unbindHandlerArray(this.mouseMoveHandlers, handlers, handler);
    this.mouseMoveHandlers = handlers;
  }
  unbindMouseDownHandler(handler: EventHandler) {
    const handlers: EventHandler[] = [];
    this._unbindHandlerArray(this.mouseDownHandlers, handlers, handler);
    this.mouseDownHandlers = handlers;
  }
  unbindMouseUpHandler(handler: EventHandler) {
    const handlers: EventHandler[] = [];
    this._unbindHandlerArray(this.mouseUpHandlers, handlers, handler);
    this.mouseUpHandlers = handlers;
  }
  unbindMouseClickHandler(handler: EventHandler) {
    const handlers: EventHandler[] = [];
    this._unbindHandlerArray(this.mouseClickHandlers, handlers, handler);
    this.mouseClickHandlers = handlers;
  }

  unbindKeydownHandler(handler: EventHandler) {
    const handlers: EventHandler[] = [];
    this._unbindHandlerArray(this.keydownHandlers, handlers, handler);
    this.keydownHandlers = handlers;
  }
  unbindKeyupHandler(handler: EventHandler) {
    const handlers: EventHandler[] = [];
    this._unbindHandlerArray(this.keyupHandlers, handlers, handler);
    this.keyupHandlers = handlers;
  }

  // ### bindKeydownHandler
  // add a handler for the evKey event, for keyboard data.
  bindKeydownHandler(method: methodType) {
    var handler: EventHandler = { symbol: Symbol(), method };
    this.keydownHandlers.push(handler as EventHandler);
    return handler;
  }
  bindKeyupHandler(method: methodType) {
    var handler: EventHandler = { symbol: Symbol(), method };
    this.keyupHandlers.push(handler as EventHandler);
    return handler;
  }

  bindMouseMoveHandler(method: methodType) {
    var handler: EventHandler = { symbol: Symbol(), method };
    this.mouseMoveHandlers.push(handler as EventHandler);
    return handler;
  }

  bindMouseUpHandler(method: methodType) {
    var handler: EventHandler = { symbol: Symbol(), method };
    this.mouseUpHandlers.push(handler);
    return handler;
  }
  bindScoreChangeHandler(method: methodType) {
    var handler: EventHandler = { symbol: Symbol(), method };
    this.scoreChangeHandlers.push(handler);
    return handler;
  }

  bindMouseDownHandler(method: methodType) {
    var handler: EventHandler = { symbol: Symbol(), method };
    this.mouseDownHandlers.push(handler);
    return handler;
  }

  bindMouseClickHandler(method: methodType) {
    var handler: EventHandler = { symbol: Symbol(), method };
    this.mouseClickHandlers.push(handler);
    return handler;
  }

  domClick(selector: string, method: () => Promise<any>) {
    $(selector).off('click').on('click', async function (ev: any) {
      await method();
    });
  }
}

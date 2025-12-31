declare const Alert_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class Alert extends Alert_base {
    static get NAME(): string;
    static jQueryInterface(config: any): any;
    close(): void;
    _destroyElement(): void;
}
declare const Button_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class Button extends Button_base {
    static get NAME(): string;
    static jQueryInterface(config: any): any;
    toggle(): void;
}
declare const Carousel_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class Carousel extends Carousel_base {
    static get Default(): {
        interval: number;
        keyboard: boolean;
        pause: string;
        ride: boolean;
        touch: boolean;
        wrap: boolean;
    };
    static get DefaultType(): {
        interval: string;
        keyboard: string;
        pause: string;
        ride: string;
        touch: string;
        wrap: string;
    };
    static get NAME(): string;
    static jQueryInterface(config: any): any;
    _interval: NodeJS.Timeout | null;
    _activeElement: any;
    _isSliding: boolean;
    touchTimeout: NodeJS.Timeout | null;
    _swipeHelper: {
        _element: any;
        _config: any;
        _deltaX: number | undefined;
        _supportPointerEvents: boolean | undefined;
        dispose(): void;
        _start(event: any): void;
        _end(event: any): void;
        _move(event: any): void;
        _handleSwipe(): void;
        _initEvents(): void;
        _eventIsPointerPenTouch(event: any): boolean | undefined;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    } | null;
    _indicatorsElement: Element | null;
    next(): void;
    nextWhenVisible(): void;
    prev(): void;
    pause(): void;
    cycle(): void;
    _maybeEnableCycle(): void;
    to(index: any): void;
    _addEventListeners(): void;
    _addTouchEventListeners(): void;
    _keydown(event: any): void;
    _getItemIndex(element: any): number;
    _setActiveIndicatorElement(index: any): void;
    _updateInterval(): void;
    _slide(order: any, element?: null): void;
    _isAnimated(): any;
    _getActive(): Element | null;
    _getItems(): never[];
    _clearInterval(): void;
    _directionToOrder(direction: any): "next" | "prev";
    _orderToDirection(order: any): "left" | "right";
}
declare const Collapse_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class Collapse extends Collapse_base {
    static get Default(): {
        parent: null;
        toggle: boolean;
    };
    static get DefaultType(): {
        parent: string;
        toggle: string;
    };
    static get NAME(): string;
    static jQueryInterface(config: any): any;
    _isTransitioning: boolean;
    _triggerArray: any[];
    toggle(): void;
    show(): void;
    hide(): void;
    _isShown(element?: any): any;
    _getDimension(): "width" | "height";
    _initializeChildren(): void;
    _getFirstLevelChildren(selector: any): never[];
    _addAriaAndCollapsedClass(triggerArray: any, isOpen: any): void;
}
declare const Dropdown_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class Dropdown extends Dropdown_base {
    static get Default(): {
        autoClose: boolean;
        boundary: string;
        display: string;
        offset: number[];
        popperConfig: null;
        reference: string;
    };
    static get DefaultType(): {
        autoClose: string;
        boundary: string;
        display: string;
        offset: string;
        popperConfig: string;
        reference: string;
    };
    static get NAME(): string;
    static jQueryInterface(config: any): any;
    static clearMenus(event: any): void;
    static dataApiKeydownHandler(event: any): void;
    _popper: {
        state: {
            placement: string;
            orderedModifiers: never[];
            options: any;
            modifiersData: {};
            elements: {
                reference: any;
                popper: any;
            };
            attributes: {};
            styles: {};
        };
        setOptions: (setOptionsAction: any) => any;
        forceUpdate: () => void;
        update: () => any;
        destroy: () => void;
    } | null;
    _parent: any;
    _menu: any;
    _inNavbar: boolean;
    toggle(): void;
    show(): void;
    hide(): void;
    update(): void;
    _completeHide(relatedTarget: any): void;
    _createPopper(): void;
    _isShown(): any;
    _getPlacement(): "top" | "bottom" | "top-end" | "top-start" | "bottom-end" | "bottom-start" | "left-start" | "right-start";
    _detectNavbar(): boolean;
    _getOffset(): any;
    _getPopperConfig(): any;
    _selectMenuItem({ key, target }: {
        key: any;
        target: any;
    }): void;
}
declare const Modal_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class Modal extends Modal_base {
    static get Default(): {
        backdrop: boolean;
        focus: boolean;
        keyboard: boolean;
    };
    static get DefaultType(): {
        backdrop: string;
        focus: string;
        keyboard: string;
    };
    static get NAME(): string;
    static jQueryInterface(config: any, relatedTarget: any): any;
    _dialog: Element | null;
    _backdrop: {
        _config: any;
        _isAppended: boolean;
        _element: HTMLDivElement | null;
        show(callback: any): void;
        hide(callback: any): void;
        dispose(): void;
        _getElement(): HTMLDivElement;
        _configAfterMerge(config: any): any;
        _append(): void;
        _emulateAnimation(callback: any): void;
        _getConfig(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    _focustrap: {
        _config: any;
        _isActive: boolean;
        _lastTabNavDirection: string | null;
        activate(): void;
        deactivate(): void;
        _handleFocusin(event: any): void;
        _handleKeydown(event: any): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    _isShown: boolean;
    _isTransitioning: boolean;
    _scrollBar: {
        _element: HTMLElement;
        getWidth(): number;
        hide(): void;
        reset(): void;
        isOverflowing(): boolean;
        _disableOverFlow(): void;
        _setElementAttributes(selector: any, styleProperty: any, callback: any): void;
        _saveInitialAttribute(element: any, styleProperty: any): void;
        _resetElementAttributes(selector: any, styleProperty: any): void;
        _applyManipulationCallback(selector: any, callBack: any): void;
    };
    toggle(relatedTarget: any): void;
    show(relatedTarget: any): void;
    hide(): void;
    handleUpdate(): void;
    _initializeBackDrop(): {
        _config: any;
        _isAppended: boolean;
        _element: HTMLDivElement | null;
        show(callback: any): void;
        hide(callback: any): void;
        dispose(): void;
        _getElement(): HTMLDivElement;
        _configAfterMerge(config: any): any;
        _append(): void;
        _emulateAnimation(callback: any): void;
        _getConfig(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    _initializeFocusTrap(): {
        _config: any;
        _isActive: boolean;
        _lastTabNavDirection: string | null;
        activate(): void;
        deactivate(): void;
        _handleFocusin(event: any): void;
        _handleKeydown(event: any): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    _showElement(relatedTarget: any): void;
    _addEventListeners(): void;
    _hideModal(): void;
    _isAnimated(): any;
    _triggerBackdropTransition(): void;
    /**
     * The following methods are used to handle overflowing modals
     */
    _adjustDialog(): void;
    _resetAdjustments(): void;
}
declare const Offcanvas_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class Offcanvas extends Offcanvas_base {
    static get Default(): {
        backdrop: boolean;
        keyboard: boolean;
        scroll: boolean;
    };
    static get DefaultType(): {
        backdrop: string;
        keyboard: string;
        scroll: string;
    };
    static get NAME(): string;
    static jQueryInterface(config: any): any;
    _isShown: boolean;
    _backdrop: {
        _config: any;
        _isAppended: boolean;
        _element: HTMLDivElement | null;
        show(callback: any): void;
        hide(callback: any): void;
        dispose(): void;
        _getElement(): HTMLDivElement;
        _configAfterMerge(config: any): any;
        _append(): void;
        _emulateAnimation(callback: any): void;
        _getConfig(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    _focustrap: {
        _config: any;
        _isActive: boolean;
        _lastTabNavDirection: string | null;
        activate(): void;
        deactivate(): void;
        _handleFocusin(event: any): void;
        _handleKeydown(event: any): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    toggle(relatedTarget: any): void;
    show(relatedTarget: any): void;
    hide(): void;
    _initializeBackDrop(): {
        _config: any;
        _isAppended: boolean;
        _element: HTMLDivElement | null;
        show(callback: any): void;
        hide(callback: any): void;
        dispose(): void;
        _getElement(): HTMLDivElement;
        _configAfterMerge(config: any): any;
        _append(): void;
        _emulateAnimation(callback: any): void;
        _getConfig(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    _initializeFocusTrap(): {
        _config: any;
        _isActive: boolean;
        _lastTabNavDirection: string | null;
        activate(): void;
        deactivate(): void;
        _handleFocusin(event: any): void;
        _handleKeydown(event: any): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    _addEventListeners(): void;
}
declare const Popover_base: {
    new (element: any, config: any): {
        _isEnabled: boolean;
        _timeout: number;
        _isHovered: boolean | null;
        _activeTrigger: {};
        _popper: {
            state: {
                placement: string;
                orderedModifiers: never[];
                options: any;
                modifiersData: {};
                elements: {
                    reference: any;
                    popper: any;
                };
                attributes: {};
                styles: {};
            };
            setOptions: (setOptionsAction: any) => any;
            forceUpdate: () => void;
            update: () => any;
            destroy: () => void;
        } | null;
        _templateFactory: {
            _config: any;
            getContent(): any[];
            hasContent(): boolean;
            changeContent(content: any): /*elided*/ any;
            toHtml(): Element;
            _typeCheckConfig(config: any): void;
            _checkContent(arg: any): void;
            _setContent(template: any, content: any, selector: any): void;
            _maybeSanitize(arg: any): any;
            _resolvePossibleFunction(arg: any): any;
            _putElementInTemplate(element: any, templateElement: any): void;
            _getConfig(config: any): any;
            _configAfterMerge(config: any): any;
            _mergeConfigObj(config: any, element: any): any;
        } | null;
        _newContent: any;
        tip: Element | null;
        enable(): void;
        disable(): void;
        toggleEnabled(): void;
        toggle(): void;
        dispose(): void;
        show(): void;
        hide(): void;
        update(): void;
        _isWithContent(): boolean;
        _getTipElement(): Element | null;
        _createTipElement(content: any): Element | null;
        setContent(content: any): void;
        _getTemplateFactory(content: any): {
            _config: any;
            getContent(): any[];
            hasContent(): boolean;
            changeContent(content: any): /*elided*/ any;
            toHtml(): Element;
            _typeCheckConfig(config: any): void;
            _checkContent(arg: any): void;
            _setContent(template: any, content: any, selector: any): void;
            _maybeSanitize(arg: any): any;
            _resolvePossibleFunction(arg: any): any;
            _putElementInTemplate(element: any, templateElement: any): void;
            _getConfig(config: any): any;
            _configAfterMerge(config: any): any;
            _mergeConfigObj(config: any, element: any): any;
        };
        _getContentForTemplate(): {
            ".tooltip-inner": any;
        };
        _getTitle(): any;
        _initializeOnDelegatedTarget(event: any): any;
        _isAnimated(): any;
        _isShown(): boolean | null;
        _createPopper(tip: any): {
            state: {
                placement: string;
                orderedModifiers: never[];
                options: any;
                modifiersData: {};
                elements: {
                    reference: any;
                    popper: any;
                };
                attributes: {};
                styles: {};
            };
            setOptions: (setOptionsAction: any) => any;
            forceUpdate: () => void;
            update: () => any;
            destroy: () => void;
        };
        _getOffset(): any;
        _resolvePossibleFunction(arg: any): any;
        _getPopperConfig(attachment: any): any;
        _setListeners(): void;
        _hideModalHandler: (() => void) | undefined;
        _fixTitle(): void;
        _enter(): void;
        _leave(): void;
        _setTimeout(handler: any, timeout: any): void;
        _isWithActiveTrigger(): boolean;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _getDelegateConfig(): {
            selector: boolean;
            trigger: string;
        };
        _disposePopper(): void;
        _element: any;
        _config: any;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    get Default(): {
        allowList: {
            '*': (string | RegExp)[];
            a: string[];
            area: never[];
            b: never[];
            br: never[];
            col: never[];
            code: never[];
            dd: never[];
            div: never[];
            dl: never[];
            dt: never[];
            em: never[];
            hr: never[];
            h1: never[];
            h2: never[];
            h3: never[];
            h4: never[];
            h5: never[];
            h6: never[];
            i: never[];
            img: string[];
            li: never[];
            ol: never[];
            p: never[];
            pre: never[];
            s: never[];
            small: never[];
            span: never[];
            sub: never[];
            sup: never[];
            strong: never[];
            u: never[];
            ul: never[];
        };
        animation: boolean;
        boundary: string;
        container: boolean;
        customClass: string;
        delay: number;
        fallbackPlacements: string[];
        html: boolean;
        offset: number[];
        placement: string;
        popperConfig: null;
        sanitize: boolean;
        sanitizeFn: null;
        selector: boolean;
        template: string;
        title: string;
        trigger: string;
    };
    get DefaultType(): {
        allowList: string;
        animation: string;
        boundary: string;
        container: string;
        customClass: string;
        delay: string;
        fallbackPlacements: string;
        html: string;
        offset: string;
        placement: string;
        popperConfig: string;
        sanitize: string;
        sanitizeFn: string;
        selector: string;
        template: string;
        title: string;
        trigger: string;
    };
    get NAME(): string;
    jQueryInterface(config: any): any;
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
};
/**
 * Class definition
 */
export class Popover extends Popover_base {
    static get Default(): {
        content: string;
        offset: number[];
        placement: string;
        template: string;
        trigger: string;
        allowList: {
            '*': (string | RegExp)[];
            a: string[];
            area: never[];
            b: never[];
            br: never[];
            col: never[];
            code: never[];
            dd: never[];
            div: never[];
            dl: never[];
            dt: never[];
            em: never[];
            hr: never[];
            h1: never[];
            h2: never[];
            h3: never[];
            h4: never[];
            h5: never[];
            h6: never[];
            i: never[];
            img: string[];
            li: never[];
            ol: never[];
            p: never[];
            pre: never[];
            s: never[];
            small: never[];
            span: never[];
            sub: never[];
            sup: never[];
            strong: never[];
            u: never[];
            ul: never[];
        };
        animation: boolean;
        boundary: string;
        container: boolean;
        customClass: string;
        delay: number;
        fallbackPlacements: string[];
        html: boolean;
        popperConfig: null;
        sanitize: boolean;
        sanitizeFn: null;
        selector: boolean;
        title: string;
    };
    static get DefaultType(): {
        content: string;
        allowList: string;
        animation: string;
        boundary: string;
        container: string;
        customClass: string;
        delay: string;
        fallbackPlacements: string;
        html: string;
        offset: string;
        placement: string;
        popperConfig: string;
        sanitize: string;
        sanitizeFn: string;
        selector: string;
        template: string;
        title: string;
        trigger: string;
    };
    _isWithContent(): any;
    _getContentForTemplate(): {
        ".popover-header": any;
        ".popover-body": any;
    };
    _getContent(): any;
}
declare const ScrollSpy_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class ScrollSpy extends ScrollSpy_base {
    static get Default(): {
        offset: null;
        rootMargin: string;
        smoothScroll: boolean;
        target: null;
        threshold: number[];
    };
    static get DefaultType(): {
        offset: string;
        rootMargin: string;
        smoothScroll: string;
        target: string;
        threshold: string;
    };
    static get NAME(): string;
    static jQueryInterface(config: any): any;
    _targetLinks: Map<any, any>;
    _observableSections: Map<any, any>;
    _rootElement: any;
    _activeTarget: any;
    _observer: IntersectionObserver | null;
    _previousScrollData: {
        visibleEntryTop: number;
        parentScrollTop: number;
    };
    refresh(): void;
    _maybeEnableSmoothScroll(): void;
    _getNewObserver(): IntersectionObserver;
    _observerCallback(entries: any): void;
    _initializeTargetsAndObservables(): void;
    _process(target: any): void;
    _activateParents(target: any): void;
    _clearActiveClass(parent: any): void;
}
declare const Tab_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class Tab extends Tab_base {
    static get NAME(): string;
    static jQueryInterface(config: any): any;
    constructor(element: any);
    _parent: any;
    show(): void;
    _activate(element: any, relatedElem: any): void;
    _deactivate(element: any, relatedElem: any): void;
    _keydown(event: any): void;
    _getChildren(): never[];
    _getActiveElem(): null;
    _setInitialAttributes(parent: any, children: any): void;
    _setInitialAttributesOnChild(child: any): void;
    _setInitialAttributesOnTargetPanel(child: any): void;
    _toggleDropDown(element: any, open: any): void;
    _setAttributeIfNotExists(element: any, attribute: any, value: any): void;
    _elemIsActive(elem: any): any;
    _getInnerElement(elem: any): any;
    _getOuterElement(elem: any): any;
}
declare const Toast_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class Toast extends Toast_base {
    static get Default(): {
        animation: boolean;
        autohide: boolean;
        delay: number;
    };
    static get DefaultType(): {
        animation: string;
        autohide: string;
        delay: string;
    };
    static get NAME(): string;
    static jQueryInterface(config: any): any;
    _timeout: NodeJS.Timeout | null;
    _hasMouseInteraction: boolean;
    _hasKeyboardInteraction: boolean;
    show(): void;
    hide(): void;
    isShown(): any;
    _maybeScheduleHide(): void;
    _onInteraction(event: any, isInteracting: any): void;
    _setListeners(): void;
    _clearTimeout(): void;
}
declare const Tooltip_base: {
    new (element: any, config: any): {
        _element: any;
        _config: any;
        dispose(): void;
        _queueCallback(callback: any, element: any, isAnimated?: boolean): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
        _typeCheckConfig(config: any, configTypes?: any): void;
    };
    getInstance(element: any): any;
    getOrCreateInstance(element: any, config?: {}): any;
    get VERSION(): string;
    get DATA_KEY(): string;
    get EVENT_KEY(): string;
    eventName(name: any): string;
    get Default(): {};
    get DefaultType(): {};
    get NAME(): void;
};
/**
 * Class definition
 */
export class Tooltip extends Tooltip_base {
    static get Default(): {
        allowList: {
            '*': (string | RegExp)[];
            a: string[];
            area: never[];
            b: never[];
            br: never[];
            col: never[];
            code: never[];
            dd: never[];
            div: never[];
            dl: never[];
            dt: never[];
            em: never[];
            hr: never[];
            h1: never[];
            h2: never[];
            h3: never[];
            h4: never[];
            h5: never[];
            h6: never[];
            i: never[];
            img: string[];
            li: never[];
            ol: never[];
            p: never[];
            pre: never[];
            s: never[];
            small: never[];
            span: never[];
            sub: never[];
            sup: never[];
            strong: never[];
            u: never[];
            ul: never[];
        };
        animation: boolean;
        boundary: string;
        container: boolean;
        customClass: string;
        delay: number;
        fallbackPlacements: string[];
        html: boolean;
        offset: number[];
        placement: string;
        popperConfig: null;
        sanitize: boolean;
        sanitizeFn: null;
        selector: boolean;
        template: string;
        title: string;
        trigger: string;
    };
    static get DefaultType(): {
        allowList: string;
        animation: string;
        boundary: string;
        container: string;
        customClass: string;
        delay: string;
        fallbackPlacements: string;
        html: string;
        offset: string;
        placement: string;
        popperConfig: string;
        sanitize: string;
        sanitizeFn: string;
        selector: string;
        template: string;
        title: string;
        trigger: string;
    };
    static get NAME(): string;
    static jQueryInterface(config: any): any;
    _isEnabled: boolean;
    _timeout: number;
    _isHovered: boolean | null;
    _activeTrigger: {};
    _popper: {
        state: {
            placement: string;
            orderedModifiers: never[];
            options: any;
            modifiersData: {};
            elements: {
                reference: any;
                popper: any;
            };
            attributes: {};
            styles: {};
        };
        setOptions: (setOptionsAction: any) => any;
        forceUpdate: () => void;
        update: () => any;
        destroy: () => void;
    } | null;
    _templateFactory: {
        _config: any;
        getContent(): any[];
        hasContent(): boolean;
        changeContent(content: any): /*elided*/ any;
        toHtml(): Element;
        _typeCheckConfig(config: any): void;
        _checkContent(arg: any): void;
        _setContent(template: any, content: any, selector: any): void;
        _maybeSanitize(arg: any): any;
        _resolvePossibleFunction(arg: any): any;
        _putElementInTemplate(element: any, templateElement: any): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
    } | null;
    _newContent: any;
    tip: Element | null;
    enable(): void;
    disable(): void;
    toggleEnabled(): void;
    toggle(): void;
    show(): void;
    hide(): void;
    update(): void;
    _isWithContent(): boolean;
    _getTipElement(): Element | null;
    _createTipElement(content: any): Element | null;
    setContent(content: any): void;
    _getTemplateFactory(content: any): {
        _config: any;
        getContent(): any[];
        hasContent(): boolean;
        changeContent(content: any): /*elided*/ any;
        toHtml(): Element;
        _typeCheckConfig(config: any): void;
        _checkContent(arg: any): void;
        _setContent(template: any, content: any, selector: any): void;
        _maybeSanitize(arg: any): any;
        _resolvePossibleFunction(arg: any): any;
        _putElementInTemplate(element: any, templateElement: any): void;
        _getConfig(config: any): any;
        _configAfterMerge(config: any): any;
        _mergeConfigObj(config: any, element: any): any;
    };
    _getContentForTemplate(): {
        ".tooltip-inner": any;
    };
    _getTitle(): any;
    _initializeOnDelegatedTarget(event: any): any;
    _isAnimated(): any;
    _isShown(): boolean | null;
    _createPopper(tip: any): {
        state: {
            placement: string;
            orderedModifiers: never[];
            options: any;
            modifiersData: {};
            elements: {
                reference: any;
                popper: any;
            };
            attributes: {};
            styles: {};
        };
        setOptions: (setOptionsAction: any) => any;
        forceUpdate: () => void;
        update: () => any;
        destroy: () => void;
    };
    _getOffset(): any;
    _resolvePossibleFunction(arg: any): any;
    _getPopperConfig(attachment: any): any;
    _setListeners(): void;
    _hideModalHandler: (() => void) | undefined;
    _fixTitle(): void;
    _enter(): void;
    _leave(): void;
    _setTimeout(handler: any, timeout: any): void;
    _isWithActiveTrigger(): boolean;
    _getDelegateConfig(): {
        selector: boolean;
        trigger: string;
    };
    _disposePopper(): void;
}
export {};

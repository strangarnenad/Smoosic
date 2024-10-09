/**
* returns an object that  lets you build a DOM in a somewhat readable way.
*
* ## Usage
* ``` javascript
* var b = buildDom;
* var r =
*   b('tr').classes('jsSharingMember').data('entitykey', key).data('name', name).data('entitytype', entityType).append(
*     b('td').classes('noSideBorderRight').append(
*    ...
* $(parent).append(r.dom());
* ```
* Don't forget the '.dom()' !  That is the actual jquery element object
* @internal
* @returns
**/
export declare class DomBuilder {
    e: any;
    constructor(el: any);
    classes(cl: any): this;
    html(value: any): this;
    data(name: string, value: string): this;
    attr(name: string, value: string): this;
    prop(name: string, value: boolean): this;
    css(name: string, value: string): this;
    append(el: any): this;
    text(tx: any): this;
    dom(): any;
}
export declare function buildDom(e: any): DomBuilder;
export declare function focusableElements(): string[];
export declare function addFileLink(filename: string, txt: any, parent: any, mimeType?: string): void;
/**
 * @internal
 */
export declare class InputTrapper {
    selector: any;
    parent: any;
    id: any;
    parentId: any;
    modalInputs: any[];
    disabledInputs: any[];
    siblingInputs: any[];
    constructor(selector: any);
    trap(this: any): void;
    close(): void;
}
export declare function closeDialogPromise(): Promise<void>;
/**
 * Extract an HTMLElement from a Jquery id, DOM element ID, or HTMLELement.  If
 * an HTMLElement can't be created, return null
 * @param selector
 * @returns HTMLElement
 */
export declare function getDomContainer(selector: HTMLElement | string): HTMLElement | undefined;
/**
 * Create a top-level HTML element for modal containers - dialogs etc.
 * from a jquery selector, or just return same if it exists
 * @param selector
 * @returns
 */
export declare function createTopDomContainer(selector: string | HTMLElement, elementType?: string): HTMLElement;
/**
 *
 * @param parameters
 * @returns
 */
export declare function draggable(parameters: any): Draggable;
/**
 * @internal
 */
export declare class Draggable {
    parent: any;
    handle: any;
    animeClass: any;
    dragParent: any;
    domOffset: any;
    svg: any;
    width: number;
    height: number;
    lastX: number;
    lastY: number;
    cb: any;
    moveParent: boolean;
    dragging: boolean;
    constructor(parameters: any);
    _animate(e: any): void;
    mousedown(e: any): void;
    enddrag(): void;
    mouseup(e: any): void;
    mousemove(e: any): void;
}
//# sourceMappingURL=htmlHelpers.d.ts.map
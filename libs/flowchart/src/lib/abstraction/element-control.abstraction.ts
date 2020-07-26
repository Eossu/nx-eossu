import { Renderer2, ElementRef } from '@angular/core';


export abstract class AbsractElementControl {

    protected readonly render2: Renderer2;
    protected readonly elementRef: ElementRef<HTMLElement>;
    
    protected constructor(
        render2: Renderer2,
        elementRef: ElementRef<HTMLElement>
    ) {
        this.render2 = render2;
        this.elementRef = elementRef;
    }

    toggleClass(className: string, activate: boolean) {
        if(activate) {
            this.addClass(className);
        } else {
            this.removeClass(className);
        }
    }

    addClass(className: string): void {
        this.render2.addClass(this.elementRef.nativeElement, className);
    }

    removeClass(className: string): void {
        this.render2.removeClass(this.elementRef.nativeElement, className);
    }

    addAttr(attrName: string, attrValue: string): void {
        this.render2.setAttribute(this.elementRef.nativeElement, attrName, attrValue);
    }

    removeAttr(attrName: string): void {
        this.render2.removeAttribute(this.elementRef.nativeElement, attrName);
    }
}
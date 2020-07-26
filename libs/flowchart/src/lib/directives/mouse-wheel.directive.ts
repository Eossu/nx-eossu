import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[eossu-fc-mousewheel]'
})
export class MouseWheelDirective {

  @Output() mousewheelUp = new EventEmitter()
  @Output() mousewheelDown = new EventEmitter()

  @HostListener('mousewheel', ['$event'])
  onMouseWheelChrome(event: any): void {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event'])
  onMouseWheelFirefox(event: any): void {
    this.mouseWheelFunc(event);
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: any): void {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event'])
  onMouseWheelIE(event: any): void {
    this.mouseWheelFunc(event);
  }

  mouseWheelFunc(event: any): void {
    if (window.event) {
      event = window.event;
    }

    const delta: number = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail || event.deltaY || event.deltaX));
    // Firefox don't have native support for wheel event, as a result delta values are reverse
    const isWheelMouseUp: boolean = event.wheelDelta ? delta > 0 : delta < 0;
    const isWheelMouseDown: boolean = event.wheelDelta ? delta < 0 : delta > 0;
    if (isWheelMouseUp) {
      this.mousewheelUp.emit(event);
    } else if (isWheelMouseDown) {
      this.mousewheelDown.emit(event);
    }

    // for IE
    event.returnValue = false;

    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }
  }

  constructor() { }

}

import { Directive, Input, HostListener } from '@angular/core';
import { IEdge } from '../flowchart.interfaces';

@Directive({
  selector: '[eossuFcEdge]',
})
export class EdgeDirective {
  @Input() edge: IEdge;

  constructor() {}

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent): void {}

  @HostListener('dbclick', ['$event'])
  onDbclick($event: MouseEvent): void {}

  @HostListener('mousedown', ['$event'])
  onMouseDown($event: MouseEvent): void {}

  @HostListener('mouseover', ['$event'])
  onMouseOver($event: MouseEvent): void {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event: MouseEvent): void {}

  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event: MouseEvent): void {}

  @HostListener("mousemove", ["$event"])
  onMouseMove($event: MouseEvent): void {}
}

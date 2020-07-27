import { Directive, Input, HostListener } from '@angular/core';
import { IEdge } from '../flowchart.interfaces';

@Directive({
  selector: '[eossu-fc-edge]',
})
export class EdgeDirective {
  @Input() edge: IEdge;

  constructor() {}

  @HostListener('click', ['$event'])
  click($event: MouseEvent): void {}

  @HostListener('dbclick', ['$event'])
  dbclick($event: MouseEvent): void {}

  @HostListener('mousedown', ['$event'])
  mousedown($event: MouseEvent): void {}

  @HostListener('mouseover', ['$event'])
  mouseover($event: MouseEvent): void {}

  @HostListener('mouseenter', ['$event'])
  mouseenter($event: MouseEvent): void {}

  @HostListener('mouseleave', ['$event'])
  mouseleave($event: MouseEvent): void {}
}

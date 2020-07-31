import {
  Directive,
  Input,
  HostListener,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
} from '@angular/core';

import { IEdge, ICordinates } from '../flowchart.interfaces';
import { SelectEvent } from '../flowchart.events';
import { colorLuminance } from '../color.helpers';
import { SvgService } from '../services/svg.service';
import { LineStyle } from '../flowchart.enums';

@Directive({
  selector: '[eossuFcEdge]',
})
export class EdgeDirective implements OnInit {
  @Input() edge: IEdge;

  @Output() selected = new EventEmitter<SelectEvent>();

  private _originalColor: string;
  private readonly _lumChange = 0.5;

  constructor(private _svgSvc: SvgService) {}

  ngOnInit(): void {
    if (!this.edge.color) {
      this.edge.color = '#d5bac8';
    }
  }

  deselect(): void {
    this.edge.selected = false;
    this.changeFillColor(true);
  }

  render(pt1: ICordinates, pt2: ICordinates, lineStyle: LineStyle): void {
    const d = this._svgSvc.drawSvgPathLine(pt1, pt2, lineStyle);
    this.edge.d = d;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.edge.selected = !this.edge.selected;
    this.changeFillColor(!this.edge.selected);

    const selectedEvent = new SelectEvent('edge', this.edge.id, event.shiftKey);
    this.selected.emit(selectedEvent);
    event.stopPropagation();
  }

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

  @HostListener('mousemove', ['$event'])
  onMouseMove($event: MouseEvent): void {}

  private changeFillColor(original = false) {
    if (!this._originalColor) this._originalColor = this.edge.color;

    if (!original) {
      this.edge.color = colorLuminance(this._originalColor, this._lumChange);
    } else {
      this.edge.color = this._originalColor;
    }
  }
}

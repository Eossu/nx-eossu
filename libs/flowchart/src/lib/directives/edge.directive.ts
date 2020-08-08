import {
  Directive,
  Input,
  HostListener,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
} from '@angular/core';

import { IEdge, IPoint2D, IDraggable } from '../flowchart.interfaces';
import { SelectEvent } from '../flowchart.events';
import { colorLuminance } from '../utils/color.helpers';
import { SvgService } from '../services/svg.service';
import { LineStyle } from '../flowchart.enums';

@Directive({
  selector: '[eossuFcEdge]',
})
export class EdgeDirective implements OnInit, IDraggable {
  @Input() model: IEdge;

  @Output() selected = new EventEmitter<SelectEvent>();

  private _originalColor: string;
  private readonly _lumChange = 0.5;

  get id(): string {
    return this.model.id;
  }

  constructor(private _svgSvc: SvgService) {}

  ngOnInit(): void {
    if (!this.model.color) {
      this.model.color = '#d5bac8';
    }
  }

  onDragStart(): void {}

  onDrag(event: MouseEvent): void {}

  deselect(): void {
    this.model.selected = false;
    this.changeFillColor(true);
  }

  render(pt1: IPoint2D, pt2: IPoint2D, lineStyle: LineStyle): void {
    const d = this._svgSvc.drawSvgPathLine(pt1, pt2, lineStyle);
    this.model.d = d;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.model.selected = !this.model.selected;
    this.changeFillColor(!this.model.selected);

    const selectedEvent = new SelectEvent('edge', this.model.id, event.shiftKey);
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
    if (!this._originalColor) this._originalColor = this.model.color;

    if (!original) {
      this.model.color = colorLuminance(this._originalColor, this._lumChange);
    } else {
      this.model.color = this._originalColor;
    }
  }
}

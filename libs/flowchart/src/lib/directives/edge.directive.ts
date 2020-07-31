import {
  Directive,
  Input,
  HostListener,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { IEdge, ICordinates, IRectangle } from '../flowchart.interfaces';
import { SelectEvent } from '../flowchart.events';
import { colorLuminance } from '../utils/color.helpers';
import { SvgService } from '../services/svg.service';
import { LineStyle } from '../flowchart.enums';
import { DragService } from '../services/drag.service';

@Directive({
  selector: '[eossuFcEdge]',
})
export class EdgeDirective implements OnInit {
  @Input() edge: IEdge;

  @Output() selected = new EventEmitter<SelectEvent>();

  private _rect: IRectangle;
  private _originalColor: string;
  private _mouseDown = false;
  private readonly _lumChange = 0.5;

  constructor(private _svgSvc: SvgService, private _dragSvc: DragService) {}

  ngOnInit(): void {
    if (!this.edge.color) {
      this.edge.color = '#d5bac8';
    }
  }

  /**
   * Deselect the edge line.
   */
  deselect(): void {
    this.edge.selected = false;
    this.changeFillColor(true);
  }

  /**
   * Render the edge line onto the svg canvas.
   *
   * @param pt1 Point1
   * @param pt2 Point2
   * @param lineStyle Style of line rendering
   */
  render(pt1: ICordinates, pt2: ICordinates, lineStyle: LineStyle): void {
    const d = this._svgSvc.drawSvgPathLine(pt1, pt2, lineStyle);
    this.edge.d = d;
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (event.button === 2) return; // disable right click

    this.edge.selected = !this.edge.selected;
    this.changeFillColor(!this.edge.selected);

    const selectedEvent = new SelectEvent('edge', this.edge.id, event.shiftKey);
    this.selected.emit(selectedEvent);
    event.stopPropagation();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown($event: MouseEvent): void {
    this._mouseDown = true;
    const target = event.target as SVGSVGElement;
    this._rect = target.getBoundingClientRect();
    console.log(this._rect);
    console.log(this._svgSvc.getSVGPoint(this._rect, event.target));
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this._mouseDown = false;
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver($event: MouseEvent): void {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event: MouseEvent): void {}

  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event: MouseEvent): void {}

  @HostListener('mousemove', ['$event'])
  onMouseMove($event: MouseEvent): void {
    if (this._mouseDown) {
    }
  }

  private changeFillColor(original = false) {
    if (!this._originalColor) this._originalColor = this.edge.color;

    if (!original) {
      this.edge.color = colorLuminance(this._originalColor, this._lumChange);
    } else {
      this.edge.color = this._originalColor;
    }
  }
}

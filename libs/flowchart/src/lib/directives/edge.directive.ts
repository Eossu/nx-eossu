import {
  Directive,
  Input,
  HostListener,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { filter } from 'rxjs/operators';

import { IEdge, IPoint2D } from '../flowchart.interfaces';
import { SelectEvent } from '../flowchart.events';
import { colorLuminance } from '../utils/color.helpers';
import { SvgService } from '../services/svg.service';
import { LineStyle } from '../flowchart.enums';
import { DragService } from '../services/drag.service';
import { Subscription } from 'rxjs';
import { EdgeDrawingService } from '../services/edge-drawing.service';

@Directive({
  selector: '[eossuFcEdge]',
})
export class EdgeDirective implements OnInit, OnDestroy {
  @Input() edge: IEdge;
  @Input() lineStyle: LineStyle;

  @Output() selected = new EventEmitter<SelectEvent>();

  private _originalColor: string;
  private _mouseDown = false;
  private _connectorEnd: 'source' | 'destination' = null;
  private readonly _lumChange = 0.5;
  private _renderSub: Subscription;

  constructor(private _svgSvc: SvgService, private _dragSvc: DragService, private _edgeDrawSvc: EdgeDrawingService) {}

  ngOnInit(): void {
    if (!this.edge.color) {
      this.edge.color = '#d5bac8';
    }

    this._renderSub = this._edgeDrawSvc.render$.pipe(
      filter( ident => this.edge.id === ident.id)
    ).subscribe(event => this.render(event.pt1, event.pt2));
  }

  ngOnDestroy(): void {
    if (this._renderSub) this._renderSub.unsubscribe();
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
   */
  render(pt1: IPoint2D, pt2: IPoint2D): void {
    const d = this._svgSvc.drawSvgPathLine(pt1, pt2, this.lineStyle);
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
  onMouseDown(event: MouseEvent): void {
    this._mouseDown = true;
    const target = event.target as SVGSVGElement;
    const rect = target.getBoundingClientRect();
    const centerWidth = rect.width / 2;

    if (event.x < rect.x + centerWidth) this._connectorEnd = 'source';
    else this._connectorEnd = 'destination';
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this._mouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this._mouseDown && !this._dragSvc.dragging) {
      if (this._connectorEnd === 'source') this.edge.source = null;
      else this.edge.destination = null;

      const coord = this._svgSvc.getSVGPoint(event, event.target);
      this.edge.endCord = coord;
      this._dragSvc.startDrag(event, this.edge.endCord);
    } else if (this._mouseDown && this._dragSvc.dragging) {
      this._dragSvc.dragElement(event);
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

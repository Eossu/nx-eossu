import { BehaviorSubject } from 'rxjs';

import { SvgService } from '../services/svg.service';

import { IPoint2D } from '../flowchart.interfaces';

export abstract class AbstractDragService<T extends IPoint2D> {
  private _dragSubject$ = new BehaviorSubject<T>(undefined);
  drag$ = this._dragSubject$.asObservable();

  private _dragging = false;
  private _offset: IPoint2D;
  private _leftMaxDrag = 0.0;
  private _topMaxDrag = 0.0;

  constructor(private _svgSvc: SvgService) {}

  drag(event: MouseEvent, element: T) {
    if (!this._dragging) {
      this.startDrag(event, element);
    }

    this.calculatePosition(event);
  }

  stopDrag(event: MouseEvent) {
    this.calculatePosition(event);
    this._dragging = false;
    this._dragSubject$.next(undefined);
  }

  protected startDrag(event: MouseEvent, element: T) {
    this._dragging = true;
    this._dragSubject$.next(element);
  }

  protected calculatePosition(event: MouseEvent): void {
    this.calculateMouseOffset(event);

    const coord = this._svgSvc.getSVGPoint(
      event,
      event.target as SVGSVGElement
    );

    let x = coord.x - this._offset.x;
    let y = coord.y - this._offset.y;

    if (x < this._leftMaxDrag) x = this._leftMaxDrag;
    if (y < this._topMaxDrag) y = this._topMaxDrag;

    this._dragSubject$.getValue().x = x;
    this._dragSubject$.getValue().y = y;

    this.calculateMouseOffset(event);
  }

  protected calculateMouseOffset(event: MouseEvent): void {
    this._offset = this._svgSvc.getSVGPoint(
      event,
      event.target as SVGSVGElement
    );
    this._offset.x -= this._dragSubject$.getValue().x;
    this._offset.y -= this._dragSubject$.getValue().y;
  }
}

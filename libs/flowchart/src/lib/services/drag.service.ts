import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPoint2D } from '../flowchart.interfaces';
import { SvgService } from './svg.service';

@Injectable()
export class DragService {
  private dragSubject$ = new BehaviorSubject<IPoint2D>(undefined);
  drag$ = this.dragSubject$.asObservable();

  private _dragging = false;
  private _leftMaxDrag = 0.0;
  private _topMaxDrag = 0.0;
  private _rightMaxDrag = -1.0;
  private _bottomMaxDrag = -1.0;

  constructor(private _svgSvc: SvgService) {}

  /**
   * Get the model beeing dragged
   */
  get drag() {
    return this.dragSubject$.getValue();
  }

  /**
   * Get if we are dragging and element.
   */
  get dragging(): boolean {
    return this._dragging;
  }

  get leftMaxDrag(): number {
    return this._leftMaxDrag;
  }

  set leftMaxDrag(value: number) {
    if (value > 0.0) this._leftMaxDrag = value;
    else this._leftMaxDrag = 0.0;
  }

  get topMaxDrag(): number {
    return this._topMaxDrag;
  }

  set topMaxDrag(value: number) {
    if (value > 0.0) this._topMaxDrag = value;
    else this._topMaxDrag = 0.0;
  }

  get rightMaxDrag(): number {
    return this._rightMaxDrag;
  }

  set rightMaxDrag(value: number) {
    this._rightMaxDrag = value;
  }

  get bottomMaxDrag(): number {
    return this._bottomMaxDrag;
  }

  set bottomMaxDrag(value: number) {
    this._bottomMaxDrag = value;
  }

  /**
   * Called to drag an element on the canvas.
   *
   * @param event MouseEvent
   */
  dragElement(event: MouseEvent): void {
    if (this._dragging) {
      this.calculatePosition(event);
    }
  }

  /**
   * Start to drag if no other drag is triggered.
   *
   * @param event MouseEvent
   * @param element Element with cordinates
   */
  startDrag(event: MouseEvent, element: IPoint2D): void {
    if (!this._dragging) {
      this._dragging = true;
      this.dragSubject$.next(element);
    }
  }

  /**
   * Stop the active draging.
   *
   * @param event MouseEvent
   */
  stopDrag(event: MouseEvent): void {
    this._dragging = false;
    this.dragSubject$.next(undefined);
  }

  /**
   * Calculate the mouse offsett from the origin cordinates.
   *
   * @param event MouseEvent
   */
  private calculateMouseOffset(event: MouseEvent): IPoint2D {
    const offset = this._svgSvc.getSVGPoint(event, event.target);
    offset.x -= this.drag.x;
    offset.y -= this.drag.y;
    return offset;
  }

  /**
   * Calculate the new position.
   *
   * @param event MouseEvent
   */
  private calculatePosition(event: MouseEvent): void {
    const offset = this.calculateMouseOffset(event);
    const coord = this._svgSvc.getSVGPoint(event, event.target);

    let x = coord.x - offset.x;
    let y = coord.y - offset.y;

    if (x < this.leftMaxDrag) x = this.leftMaxDrag;
    if (y < this.topMaxDrag) y = this.topMaxDrag;

    // TODO: Add check for right and bottom if activated (larger then -1)

    this.drag.x = x;
    this.drag.y = y;
  }
}

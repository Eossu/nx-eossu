import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICordinates } from '../flowchart.interfaces';
import { SvgService } from './svg.service';

@Injectable()
export class DragService {
  private dragSubject$ = new BehaviorSubject<ICordinates>(null);
  drag$ = this.dragSubject$.asObservable();

  private _offset: ICordinates;
  private _dragging = false;
  private _leftMaxDrag = 0.0;
  private _topMaxDrag = 0.0;

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

  /**
   * Called to drag an element on the canvas.
   *
   * @param event MouseEvent
   */
  dragElement(event: MouseEvent): void {
    if (this._dragging) {
      this.calculateMouseOffset(event);
      this._dragging = true;
      this.calculatePosition(event);
    }
  }

  private startDrag(event: MouseEvent): void {}

  /**
   * Calculate the mouse offsett from the origin cordinates.
   *
   * @param event MouseEvent
   */
  private calculateMouseOffset(event: MouseEvent): void {
    this._offset = this._svgSvc.getSVGPoint(event, event.target);
    this._offset.x -= this.drag.x;
    this._offset.y -= this.drag.y;
  }

  /**
   * Calculate the new position.
   *
   * @param event MouseEvent
   */
  private calculatePosition(event: MouseEvent): void {
    const coord = this._svgSvc.getSVGPoint(event, event.target);

    let x = coord.x - this._offset.x;
    let y = coord.y - this._offset.y;

    if (x < this._leftMaxDrag) x = this._leftMaxDrag;
    if (y < this._topMaxDrag) y = this._topMaxDrag;

    this.drag.x = x;
    this.drag.y = y;

    this.calculateMouseOffset(event);
  }
}

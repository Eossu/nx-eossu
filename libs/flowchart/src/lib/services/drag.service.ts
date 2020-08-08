import { Injectable } from '@angular/core';
import { IDraggable } from '../flowchart.interfaces';

@Injectable()
export class DragService {
  private _elements: Array<IDraggable>;

  private _dragging = false;
  get dragging(): boolean {
    return this._dragging;
  }

  constructor() {}

  prepareDrag(event: MouseEvent, elements: Array<IDraggable>): void {
    this._elements = elements;
    this._dragging = true;
    this._elements.forEach(drag => drag.onDragStart?.(event));
  }

  finishDrag(event: MouseEvent): void {
    this.onDrag(event);
    this._dragging = false;
    this._elements = undefined;
  }

  onDrag(event: MouseEvent): void {
    this._elements.forEach((drag) => drag.onDrag(event));
  }
}

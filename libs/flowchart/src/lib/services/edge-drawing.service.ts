import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEdge } from '../flowchart.interfaces';

@Injectable()
export class EdgeDrawingService {

  private newEdgeSubject$ = new BehaviorSubject<IEdge>(null);
  newEdge$ = this.newEdgeSubject$.asObservable();

  private _drawing = false;

  constructor() { }

  newEdge(edge: IEdge): void {
    this.newEdgeSubject$.next(edge);
  }

  set drawing(value: boolean) {
    this._drawing = value;
  }

  get drawing(): boolean {
    return this._drawing;
  }
}

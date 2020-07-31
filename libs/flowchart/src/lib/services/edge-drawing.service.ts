import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IEdge, IConnector } from '../flowchart.interfaces';
import { SvgService } from './svg.service';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class EdgeDrawingService {
  private cancleSubject$ = new Subject<IEdge>();
  private newEdgeSubject$ = new BehaviorSubject<IEdge>(null);
  newEdge$ = this.newEdgeSubject$.asObservable();
  cancle$ = this.cancleSubject$.asObservable();

  private _drawing = false;

  constructor(private _svgSvc: SvgService) {}

  get edge(): IEdge {
    return this.newEdgeSubject$.getValue();
  }

  get drawing(): boolean {
    return this._drawing;
  }

  renderLine(event: MouseEvent, connector?: IConnector): void {
    if (connector && !this._drawing) {
      this.startDrawing(event, connector);
    } else if (connector && this._drawing && this.checkConnector(connector)) {
      this._drawing = false;
      return;
    }

    this.drawLine(event);
  }

  cancleDrawing(): void {
    this._drawing = false;
    this.cancleSubject$.next(this.edge);
  }

  private startDrawing(event: MouseEvent, connector: IConnector): void {
    const point = this._svgSvc.getSVGPoint(
      event,
      event.target as SVGSVGElement
    );
    const edge = {
      id: uuid4(),
      source: connector.id,
      endCord: point,
    };
    this.newEdgeSubject$.next(edge);
    this._drawing = true;
  }

  private checkConnector(connector: IConnector): boolean {
    if (!connector) return false;
    else if (connector.id === this.edge.source) return false;
    else {
      this.edge.destination = connector.id;
      return true;
    }
  }

  private drawLine(event: MouseEvent): void {
    const point = this._svgSvc.getSVGPoint(
      event,
      event.target as SVGSVGElement
    );
    this.edge.endCord = point;
  }
}

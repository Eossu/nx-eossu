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

  /**
   * Returns the last edge in the stream.
   */
  get edge(): IEdge {
    return this.newEdgeSubject$.getValue();
  }

  /**
   * Returns if the service is drawing a new edge line.
   */
  get drawing(): boolean {
    return this._drawing;
  }

  /**
   * Start to render a new edgge line and continue drawing while drawing is
   * activated.
   * 
   * @param event Mouse event
   * @param connector Connector that is drawed from else null
   */
  renderLine(event: MouseEvent, connector?: IConnector): void {
    if (connector && !this._drawing) {
      this.startDrawing(event, connector);
    } else if (connector && this._drawing && this.checkConnector(connector)) {
      this._drawing = false;
      return;
    }

    this.drawLine(event);
  }

  /**
   * Cancel the drawing of the last edge in the stream. 
   */
  cancelDrawing(): void {
    this._drawing = false;
    this.cancleSubject$.next(this.edge);
  }

  /**
   * Start to draw a new edge, and sends it out on the stream.
   * 
   * @param event Mouse event
   * @param connector Connector that triggers the drawing
   */
  private startDrawing(event: MouseEvent, connector: IConnector): void {
    const point = this._svgSvc.getSVGPoint(
      event,
      event.target
    );
    const edge = {
      id: uuid4(),
      source: connector.id,
      endCord: point,
    };
    this.newEdgeSubject$.next(edge);
    this._drawing = true;
  }

  /**
   * Check if we are still over the source connector or over a
   * destination connector.
   * 
   * @param connector Connector to check
   */
  private checkConnector(connector: IConnector): boolean {
    if (!connector) return false;
    else if (connector.id === this.edge.source) return false;
    else {
      this.edge.destination = connector.id;
      return true;
    }
  }

  /**
   * Render the new line end position.
   * 
   * @param event Mouse event
   */
  private drawLine(event: MouseEvent): void {
    const point = this._svgSvc.getSVGPoint(
      event,
      event.target
    );
    this.edge.endCord = point;
  }
}
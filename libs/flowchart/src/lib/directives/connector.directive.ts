import {
  Directive,
  OnInit,
  Input,
  HostListener,
} from '@angular/core';

import { v4 as uuid4 } from 'uuid';

import { IConnector, IVertex, IEdge } from '../flowchart.interfaces';
import { colorLuminance } from '../color.helpers';
import { SvgService } from '../services/svg.service';
import { EdgeDrawingService } from '../services/edge-drawing.service';

@Directive({
  selector: '[eossuFcConnector]',
})
export class ConnectorDirective implements OnInit {
  @Input() connector: IConnector;
  @Input() vertex: IVertex;

  private _drawEdge = false;
  private _originalColor: string;

  constructor(
    private _svgSvc: SvgService,
    private _edgeDrawSvc: EdgeDrawingService
  ) {}

  ngOnInit(): void {
    if (!this.connector.color)
      this.connector.color = this.vertex.category.color;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (!this.vertex.readonly) {
      event.stopPropagation();
      this._drawEdge = true;
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this._drawEdge = false;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.vertex.readonly) {
      this._originalColor = this.connector.color;
      this.connector.color = colorLuminance(this.connector.color, 0.4);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this._originalColor) this.connector.color = this._originalColor;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this._drawEdge) {
      event.stopPropagation();

      const point = this._svgSvc.getSVGPoint(event, event.target as SVGSVGElement);
      const edge: IEdge = {
        id: uuid4(),
        source: this.connector.id,
        endCord: point
      }

      this._edgeDrawSvc.newEdge(edge);}
    }
  }
}

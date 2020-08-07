import { Directive, OnInit, Input, HostListener } from '@angular/core';

import { IConnector, IVertex } from '../flowchart.interfaces';
import { SvgService } from '../services/svg.service';
import { EdgeDrawingService } from '../services/edge-drawing.service';
import { colorLuminance } from '../utils/color.helpers';

@Directive({
  selector: '[eossuFcConnector]',
})
export class ConnectorDirective implements OnInit {
  @Input() connector: IConnector;
  @Input() vertex: IVertex;

  private _startDrawing = false;

  constructor(
    private _svgSvc: SvgService,
    private _edgeDrawSvc: EdgeDrawingService
  ) {}

  ngOnInit(): void {
    if (!this.connector.color)
      this.connector.color = colorLuminance(this.vertex.category.color, -0.3);
  }

  @HostListener('mousedown')
  onMouseDown(): void {
    if (!this._edgeDrawSvc.drawing) this._startDrawing = true;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this._startDrawing || this._edgeDrawSvc.drawing) {
      this._edgeDrawSvc.renderLine(event, this.connector);
      event.stopPropagation();
    } 
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this._startDrawing = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this._startDrawing) {
      this._edgeDrawSvc.renderLine(event, this.connector);
      event.stopPropagation();
    }
  }
}

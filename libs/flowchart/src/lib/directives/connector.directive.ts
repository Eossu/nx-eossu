import {
  Directive,
  OnInit,
  Input,
  HostListener,
} from '@angular/core';

import { IConnector, IVertex } from '../flowchart.interfaces';
import { EdgeDrawingService } from '../services/edge-drawing.service';

@Directive({
  selector: '[eossuFcConnector]',
})
export class ConnectorDirective implements OnInit {
  @Input() connector: IConnector;
  @Input() vertex: IVertex;

  private _startDrawing = false;

  constructor(private _edgeDrawSvc: EdgeDrawingService) {}

  ngOnInit(): void {
    if (!this.connector.color)
      this.connector.color = this.vertex.category.color;
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (event.button === 2) return; // disable right click

    if (!this._edgeDrawSvc.drawing) this._startDrawing = true;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (event.button === 2) return; // disable right click

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

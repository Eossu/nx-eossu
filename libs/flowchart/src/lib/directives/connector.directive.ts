import { Directive, OnInit, Input, HostListener } from '@angular/core';

import { IConnector, IVertex } from '../flowchart.interfaces';
import { SvgService } from '../services/svg.service';
import { EdgeDrawingService } from '../services/edge-drawing.service';

@Directive({
  selector: '[eossuFcConnector]',
})
export class ConnectorDirective implements OnInit {
  @Input() connector: IConnector;
  @Input() vertex: IVertex;

  constructor(
    private _svgSvc: SvgService,
    private _edgeDrawSvc: EdgeDrawingService
  ) {}

  ngOnInit(): void {
    if (!this.connector.color)
      this.connector.color = this.vertex.category.color;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (!this.vertex.readonly) {
      this._edgeDrawSvc.renderLine(event, this.connector);
      event.stopPropagation();
    }
  }
}

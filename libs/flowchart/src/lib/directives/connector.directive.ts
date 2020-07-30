import { Directive, Input, HostListener } from '@angular/core';
import { IConnector, IVertex, IEdge } from '../flowchart.interfaces';
import { WorkspaceService } from '../services/workspace.service';
import { SvgService } from '../services/svg.service';

@Directive({
  selector: '[eossuFcConnector]',
})
export class ConnectorDirective {
  @Input() connector: IConnector;
  @Input() vertex: IVertex;

  private _drawLine = false;
  private _edge: IEdge;

  constructor(
    private _workspaceSvc: WorkspaceService,
    private _svgSvc: SvgService
  ) {}

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent): void {}

  @HostListener('dbclick', ['$event'])
  onDbclick($event: MouseEvent): void {}

  @HostListener('mousedown', ['$event']) // FIXME: Add a unique id to the new edge.
  onMouseDown($event: MouseEvent): void {
    if (this.vertex.readonly) {
      this._drawLine = true;
      this._edge = {
        id: '',
        source: this.vertex.id
      }
      this._workspaceSvc.addEdge(this._edge);
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp($event: MouseEvent): void {
    this._drawLine = false;
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver($event: MouseEvent): void {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event: MouseEvent): void {}

  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event: MouseEvent): void {
    this._drawLine = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove($event: MouseEvent): void {}
}

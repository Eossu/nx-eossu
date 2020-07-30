import {
  Directive,
  OnInit,
  Input,
  HostListener,
  ElementRef,
} from '@angular/core';

import { v4 as uuid4 } from 'uuid';

import { IConnector, IVertex, IEdge } from '../flowchart.interfaces';
import { WorkspaceService } from '../services/workspace.service';
import { SvgService } from '../services/svg.service';
import { ConnectorType, VertexType } from '../flowchart.enums';
import { colorLuminance } from '../color.helpers';

@Directive({
  selector: '[eossuFcConnector]',
})
export class ConnectorDirective implements OnInit {
  @Input() connector: IConnector;
  @Input() vertex: IVertex;

  private _drawLine = false;
  private _edge: IEdge;
  private _originalColor: string;

  constructor(
    private _workspaceSvc: WorkspaceService,
  ) {}

  ngOnInit(): void {
    if (!this.connector.color)
      this.connector.color = this.vertex.category.color;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown($event: MouseEvent): void {
    if (this.vertex.readonly) {
      this._drawLine = true;
      this._edge = {
        id: uuid4(),
        source: this.vertex.id,
      };
      this._workspaceSvc.addEdge(this._edge);
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp($event: MouseEvent): void {
    this._drawLine = false;
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event: MouseEvent): void {
    if (!this.vertex.readonly) {
      this._originalColor = this.connector.color;
      this.connector.color = colorLuminance(this.connector.color, 0.4);
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event: MouseEvent): void {
    if (this._originalColor) this.connector.color = this._originalColor;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this._drawLine) {
      event.preventDefault();
    }
  }
}

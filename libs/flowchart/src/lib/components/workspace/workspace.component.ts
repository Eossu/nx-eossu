import { Component, OnInit } from '@angular/core';
import { IEdge, IVertex, IConnector } from '../../flowchart.interfaces';
import { DrawingEdgeService } from '../../services/drawing-edge.service';

@Component({
  selector: 'eossu-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  constructor(
    private _edgeDrw: DrawingEdgeService
  ) { }

  ngOnInit(): void {
  }

  getEdgeAttributeSvgD(edge: IEdge): string {}

  edgeMouseDown($event: MouseEvent, edge: IEdge): void {}

  edgeClick($event: MouseEvent, edge: IEdge): void {}

  edgeDoubleClick($event: MouseEvent, edge: IEdge): void {}

  edgeMouseOver($event: MouseEvent, edge: IEdge): void {}

  edgeMouseEnter($event: MouseEvent, edge: IEdge): void {}

  edgeMouseLeave($event: MouseEvent, edge: IEdge): void {}

  isSelected(model: IEdge | IVertex): void {}

}

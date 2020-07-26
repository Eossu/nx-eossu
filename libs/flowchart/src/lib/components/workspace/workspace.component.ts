import { Component, OnInit, Input, Output, ContentChild, ViewChild, ViewChildren, TemplateRef, QueryList, ElementRef, ContentChildren, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { IEdge, IVertex, IConnector, IWorkspaceModel } from '../../flowchart.interfaces';

@Component({
  selector: 'eossu-fc-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceComponent implements OnInit {

  @Input() model: IWorkspaceModel;
  @Input() minimap: boolean;

  @ContentChild('defsTemplate') defsTemplate: TemplateRef<any>;
  @ContentChild('vertexTemplate') vertexTemplate: TemplateRef<any>;
  @ContentChild('edgeTemplate') edgeTemplate: TemplateRef<any>;
  @ContentChild('connectorTemplate') connectorTemplate: TemplateRef<any>;

  @ViewChildren('vertexElement') vertexElements: QueryList<ElementRef>;
  @ViewChildren('edgeElement') edgeElements: QueryList<ElementRef>;
  @ViewChildren('connectorElement') connectorElements: QueryList<ElementRef>;

  initialized = false;
  isPanning = false;

  constructor() { }

  ngOnInit(): void {
  }

  onZoom($event: MouseWheelEvent, zoom: string): void {}

  getEdgeAttributeSvgD(edge: IEdge): string {}

  edgeMouseDown($event: MouseEvent, edge: IEdge): void {}

  edgeClick($event: MouseEvent, edge: IEdge): void {}

  edgeDoubleClick($event: MouseEvent, edge: IEdge): void {}

  edgeMouseOver($event: MouseEvent, edge: IEdge): void {}

  edgeMouseEnter($event: MouseEvent, edge: IEdge): void {}

  edgeMouseLeave($event: MouseEvent, edge: IEdge): void {}

  vertexMouseDown($event: MouseEvent, vertex: IVertex): void {}

  vertexClick($event: MouseEvent, vertex: IVertex): void {}

  vertexDoubleClick($event: MouseEvent, vertex: IVertex): void {}

  vertexMouseOver($event: MouseEvent, vertex: IVertex): void {}

  vertexMouseEnter($event: MouseEvent, vertex: IVertex): void {}

  vertexMouseLeave($event: MouseEvent, vertex: IVertex): void {}

  isSelected(model: IEdge | IVertex): void {}

}

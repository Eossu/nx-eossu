import {
  Component,
  OnInit,
  Input,
  Output,
  ContentChild,
  ViewChild,
  ViewChildren,
  TemplateRef,
  QueryList,
  ElementRef,
  ContentChildren,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  IEdge,
  IVertex,
  IConnector,
  IWorkspaceModel,
} from '../../flowchart.interfaces';
import { VertexDirective } from '../../directives/vertex.directive';
import { EdgeDirective } from '../../directives/edge.directive';
import { ConnectorDirective } from '../../directives/connector.directive';

@Component({
  selector: 'eossu-fc-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent implements OnInit {
  @Input() model: IWorkspaceModel;
  @Input() minimap: boolean;

  @ContentChild('defsTemplate') defsTemplate: TemplateRef<any>;
  @ContentChild('vertexTemplate') vertexTemplate: TemplateRef<any>;
  @ContentChild('edgeTemplate') edgeTemplate: TemplateRef<any>;
  @ContentChild('connectorTemplate') connectorTemplate: TemplateRef<any>;

  @ViewChildren(VertexDirective) vertexElements: QueryList<ElementRef>;
  @ViewChildren(EdgeDirective) edgeElements: QueryList<ElementRef>;
  @ViewChildren(ConnectorDirective) connectorElements: QueryList<ElementRef>;

  initialized = false;
  isPanning = false;

  constructor() {}

  ngOnInit(): void {}

  onZoom($event: MouseWheelEvent, zoom: string): void {}

  getEdgeAttributeSvgD(edge: IEdge): string {}

  isSelected(model: IEdge | IVertex): void {}
}

import {
  Component,
  OnInit,
  OnDestroy,
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
  ISelection,
} from '../../flowchart.interfaces';
import { VertexDirective } from '../../directives/vertex.directive';
import { EdgeDirective } from '../../directives/edge.directive';
import { ConnectorDirective } from '../../directives/connector.directive';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { WorkspaceService } from '../../services/workspace.service';
import { Subscription } from 'rxjs';
import { SvgService } from '../../services/svg.service';
import { LineStyle } from '../../flowchart.enums';

@Component({
  selector: 'eossu-fc-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  @Input() model: IWorkspaceModel;
  @Input() edgeStyle: LineStyle;
  @Input() minimap: boolean;

  @ContentChild('defsTemplate') defsTemplate: TemplateRef<any>;
  @ContentChild('vertexTemplate') vertexTemplate: TemplateRef<any>;
  @ContentChild('edgeTemplate') edgeTemplate: TemplateRef<any>;
  @ContentChild('connectorTemplate') connectorTemplate: TemplateRef<any>;

  initialized = false;
  isPanning = false;

  private subscriptions = new Subscription();

  constructor(
    private _workspaceSvc: WorkspaceService,
    private _svgSrc: SvgService
  ) {}

  ngOnInit(): void {
    if (this.model) {
      this._workspaceSvc.setModel(this.model);
    }

    if (!this.edgeStyle) {
      this.edgeStyle = LineStyle.Curved;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = null;
  }

  /**
   * When we drop a new vertex on to the workspace add it to the model.
   * 
   * @param $event Drag Drop event with the vertex data.
   */
  onDrop($event: CdkDragDrop<IVertex[]>): void {
    const vertex = $event.item.data as IVertex;
    this._workspaceSvc.addVertex(vertex);
  }

  /**
   * Generate the path line D attribute data.
   * 
   * @param edge The edge to be drawn.
   */
  getEdgeAttributeSvgD(edge: IEdge): string {
    const sourceVertex = this._workspaceSvc.getVertexById(edge.source);
    const destVertex = this._workspaceSvc.getVertexById(edge.destination);
    return this._svgSrc.drawSvgPathLine(sourceVertex, destVertex, this.edgeStyle);
  }

  onZoom($event: MouseWheelEvent, zoom: string): void {}
}

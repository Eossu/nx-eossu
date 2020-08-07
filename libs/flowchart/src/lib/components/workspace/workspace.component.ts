import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ContentChild,
  TemplateRef,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  HostListener,
  ViewChildren,
  QueryList,
  AfterViewInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';

import {
  IEdge,
  IVertex,
  IWorkspaceModel,
  IView,
  IPoint2D,
  IConnector,
} from '../../flowchart.interfaces';

import { SvgService } from '../../services/svg.service';
import { LineStyle } from '../../flowchart.enums';
import { SelectEvent } from '../../flowchart.events';
import { VertexDirective } from '../../directives/vertex.directive';
import { EdgeDirective } from '../../directives/edge.directive';
import { EdgeDrawingService } from '../../services/edge-drawing.service';
import { Subscription } from 'rxjs';

const keyCodes = {
  ESC: 27,
  DELETE: 46,
};

@Component({
  selector: 'eossu-fc-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() model: IWorkspaceModel;
  @Input() edgeStyle: LineStyle;
  @Input() minimap: boolean;
  @Input() view: IView;

  @Output() removedItem = new EventEmitter<IVertex | IEdge>();

  @ContentChild('defsTemplate') defsTemplate: TemplateRef<any>;
  @ContentChild('vertexTemplate') vertexTemplate: TemplateRef<any>;
  @ContentChild('edgeTemplate') edgeTemplate: TemplateRef<any>;
  @ContentChild('connectorTemplate') connectorTemplate: TemplateRef<any>;

  @ViewChildren(VertexDirective) vertexes: QueryList<VertexDirective>;
  @ViewChildren(EdgeDirective) edges: QueryList<EdgeDirective>;

  @ViewChild('workspaceBoard') workspaceBoard: ElementRef<SVGSVGElement>;

  isPanning = false;

  private _selections = new Array<VertexDirective | EdgeDirective>();
  private _subscriptions = new Subscription();

  constructor(
    private _svgSvc: SvgService,
    private _edgeDrawSvc: EdgeDrawingService
  ) {}

  ngOnInit(): void {
    if (!this.model) {
      this.model = { vertexs: [], edges: [] };
    }
    if (!this.edgeStyle) {
      this.edgeStyle = LineStyle.Curved;
    }

    if (!this.minimap) {
      this.minimap = false;
    }

    if (!this.view) {
      this.view = { height: '100%', width: '100%' };
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    this._subscriptions.add(
      this._edgeDrawSvc.newEdge$.subscribe((edge) => {
        if (!edge) return;

        this.model = {
          vertexs: this.model.vertexs,
          edges: [...this.model.edges, edge],
        };
      })
    );

    this._subscriptions.add(
      this._edgeDrawSvc.cancle$.subscribe((edge) => {
        const idx = this.model.edges.indexOf(edge);
        this.model.edges.splice(idx, 1);

        this.model = {
          vertexs: this.model.vertexs,
          edges: [...this.model.edges],
        };
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {}

  /**
   * Select the given model if key has been set in the event multiple
   * selection is activated. Else all other selection is un-selected and
   * only the given model is higlited as selected.
   *
   * @param event The selection event.
   */
  onSelected(event: SelectEvent): void {
    let directive: VertexDirective | EdgeDirective;
    if (event.type === 'vertex') {
      directive = this.vertexes.find((vertexDirective) => {
        return vertexDirective.vertex.id === event.id;
      });
    } else {
      directive = this.edges.find((edgeDirective) => {
        return edgeDirective.edge.id === event.id;
      });
    }

    if (event.key) {
      this._selections.push(directive);
    } else {
      this.deselect();
      this._selections = [directive]; 
    }
  }

  /**
   * When a vertex is moving.
   */
  onMoving(): void {
    this.edges.forEach((directive) => {
      const source: IPoint2D = this.getConnectorById(directive.edge.source);
      let dest: IPoint2D = this.getConnectorById(directive.edge.destination);
      if (!dest) dest = directive.edge.endCord;
      directive.render(source, dest, this.edgeStyle);
    });
  }

  /**
   * Get the connector by the given id.
   *
   * @param id Id of the connector.
   */
  getConnectorById(id: string): IConnector {
    for (const vertex of this.model.vertexs) {
      for (const connector of vertex.connectors) {
        if (connector.id === id) return connector;
      }
    }
  }

  /**
   * Get the vertex with the given id.
   *
   * @param id Id of vertex
   * @returns IVertex
   */
  getVertexById(id: string): IVertex {
    return this.model.vertexs.find((vertex) => {
      vertex.id === id;
    });
  }

  /**
   * Get the edge with the given id.
   *
   * @param id Id of edge
   * @returns IEdge
   */
  getEdgeById(id: string): IEdge {
    return this.model.edges.find((edge) => {
      edge.id === id;
    });
  }

  /**
   * Handles click event on the workspace.
   *
   * @param event MouseEvent
   */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.deselect();
    this._selections = [];
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this._edgeDrawSvc.drawing) {
      this._edgeDrawSvc.renderLine(event);

      // We should have selected above an connector. If not remove edge.
      if (this._edgeDrawSvc.drawing) {
        this._edgeDrawSvc.cancleDrawing();
      }
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this._edgeDrawSvc.drawing) {
      this._edgeDrawSvc.renderLine(event);
      this.onMoving();
    }
  }

  /**
   * Handles keyboard events from the window.
   *
   * @param event KeyboardEvent
   */
  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.keyCode === keyCodes.DELETE) {
      if (this._selections.length > 0) {
        this._selections.map((directive) => {
          let vertexs = this.model.vertexs;
          let edges = this.model.edges;

          if (directive instanceof VertexDirective) {
            const idx = this.model.vertexs.indexOf(directive.vertex);
            this.model.vertexs.splice(idx, 1);
            this.removedItem.emit(directive.vertex);
          } else if (directive instanceof EdgeDirective) {
            const idx = this.model.edges.indexOf(directive.edge);
            this.model.edges.splice(idx, 1);
            this.removedItem.emit(directive.edge);
          } else {
            return;
          }

          this.model = {
            vertexs: vertexs,
            edges: edges,
          };
        });
      }
    } else if (event.keyCode === keyCodes.ESC) {
      if (this._edgeDrawSvc.drawing) this._edgeDrawSvc.cancleDrawing();
    }
  }

  /**
   * Helper method to do un-selection of models.
   */
  private deselect(): void {
    if (this._selections.length > 0) {
      this._selections.forEach((someDirective) => {
        someDirective.deselect();
      });
    }
  }
}

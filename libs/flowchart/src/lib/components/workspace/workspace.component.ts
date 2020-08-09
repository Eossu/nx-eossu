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
  HostListener,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

import {
  IEdge,
  IVertex,
  IWorkspaceModel,
  IView,
  IPoint2D,
  IConnector,
  ISelectable,
  IDraggable,
} from '../../flowchart.interfaces';

import { v4 as uuid4 } from 'uuid';

import { LineStyle } from '../../flowchart.enums';
import { VertexDirective } from '../../directives/vertex.directive';
import { EdgeDirective } from '../../directives/edge.directive';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { ConnectorDirective } from '../../directives/connector.directive';
import { SvgService } from '../../services/svg.service';

const keyCodes = {
  ESC: 27,
  DELETE: 46,
};

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
  @Input() minimap: boolean; // TODO: Not implemented yet so is not used at the moment.
  @Input() view: IView;

  @Output() removedItem = new EventEmitter<IVertex | IEdge>();

  @ContentChild('defsTemplate') defsTemplate: TemplateRef<any>;
  @ContentChild('vertexTemplate') vertexTemplate: TemplateRef<any>;
  @ContentChild('edgeTemplate') edgeTemplate: TemplateRef<any>;
  @ContentChild('connectorTemplate') connectorTemplate: TemplateRef<any>;

  @ViewChildren(VertexDirective) vertexes: QueryList<VertexDirective>;
  @ViewChildren(EdgeDirective) edges: QueryList<EdgeDirective>;
  @ViewChildren(ConnectorDirective) connectors: QueryList<ConnectorDirective>;

  @ViewChild('workspaceBoard') workspaceBoard: ElementRef<SVGSVGElement>;

  // Selection variables
  private _selections = new Array<ISelectable>();

  // Drag variables
  private _dragging = false;
  private _elementsDragged: Array<IDraggable>;

  // Edge drawing variables
  private _cancelSubject$ = new Subject<IEdge>();
  private _newEdgeSubject$ = new BehaviorSubject<IEdge>(undefined);
  private _drawing = false;
  edgeDrawCancel$ = this._cancelSubject$.asObservable();
  newEdgeCreated$ = this._newEdgeSubject$.asObservable();

  // Holds all observable subscriptions to easly unsubscribe when destroyed.
  private _subscriptions = new Subscription();

  constructor(private _svgSvc: SvgService) {}

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

    // Add Observable subscriptions for edge drawing.
    this._subscriptions.add(
      this.newEdgeCreated$.subscribe((edge) => {
        if (!edge) return;

        this.model = {
          vertexs: this.model.vertexs,
          edges: [...this.model.edges, edge],
        };
      })
    );

    this._subscriptions.add(
      this.edgeDrawCancel$.subscribe((edge) => {
        const idx = this.model.edges.indexOf(edge);
        this.model.edges.splice(idx, 1);

        this.model = {
          vertexs: this.model.vertexs,
          edges: [...this.model.edges],
        };
      })
    );
  }

  ngOnDestroy(): void {
    this._cancelSubject$.complete();
    this._newEdgeSubject$.complete();
    this._subscriptions.unsubscribe();
  }

  /*
   * Dragging functionality
   */

  private prepareDrag(event: MouseEvent, elements: Array<IDraggable>): void {
    this._elementsDragged = elements;
    this._dragging = true;
    this._elementsDragged.forEach((element) => element.onDragStart?.(event));
  }

  private finishDrag(event: MouseEvent): void {
    this.onDrag(event);
    this._dragging = false;
    this._elementsDragged = undefined;
  }

  private onDrag(event: MouseEvent): void {
    this._elementsDragged.forEach((element) => element.onDrag(event));
  }

  /*
   * Edge drawing functionality
   */

  private drawLine(event: MouseEvent, connector?: IConnector): void {
    if (connector && !this._drawing) {
      this.startDrawing(event, connector);
    } else if (connector && this._drawing && this.checkConnector(connector)) {
      this._drawing = false;
      return;
    } else if (this._drawing && event.button === 1) {
    }

    this.edgeDraw(event);
  }

  private cancleDrawing(): void {
    console.log('cancel drawing edge');
    this._drawing = false;
    this._cancelSubject$.next(this._newEdgeSubject$.getValue());
  }

  private startDrawing(event: MouseEvent, connector: IConnector): void {
    const point = this._svgSvc.getSVGPoint(
      event,
      event.target as SVGSVGElement
    );
    const edge = {
      id: uuid4(),
      source: connector.id,
      endCord: point,
    };
    this._newEdgeSubject$.next(edge);
    this._drawing = true;
  }

  private checkConnector(connector: IConnector): boolean {
    if (!connector) return false;
    else if (connector.id === this._newEdgeSubject$.getValue().source)
      return false;
    else {
      this._newEdgeSubject$.getValue().destination = connector.id;
      return true;
    }
  }

  private edgeDraw(event: MouseEvent): void {
    const point = this._svgSvc.getSVGPoint(
      event,
      event.target as SVGSVGElement
    );
    this._newEdgeSubject$.getValue().endCord = point;
    this.renderEdges([this._newEdgeSubject$.getValue().id]);
  }

  private renderEdges(id?: Array<string>): void {
    if (id) {
      const edge = this.edges.find((edge) => id.some((id) => edge.id));
      const source: IPoint2D = this.getConnectorById(edge.model.source);
      let dest: IPoint2D = this.getConnectorById(edge.model.destination);
      if (!dest) dest = edge.model.endCord;
      edge.render(source, dest, this.edgeStyle);
    } else {
      this.edges.forEach((edge) => {
        const source: IPoint2D = this.getConnectorById(edge.model.source);
        let dest: IPoint2D = this.getConnectorById(edge.model.destination);
        if (!dest) dest = edge.model.endCord;
        edge.render(source, dest, this.edgeStyle);
      });
    }
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
    if (!event.shiftKey) this.deselect();

    const target = event.target as SVGSVGElement;
    const type = target.parentElement.getAttribute('type');
    const id = target.parentElement.getAttribute('id');

    if (this._drawing && type === 'connector') {
      const connector = this.connectors.find((con) => con.id === id);
      this.drawLine(event, connector.model);
      event.stopPropagation();
      return;
    } else if (this._drawing) {
      this.cancleDrawing();
    } else if (type === 'connector') {
      const connector = this.connectors.find((con) => con.id === id);
      this.drawLine(event, connector.model);
      event.stopPropagation();
      return;
    } else if (type === 'vertex') {
      const vertex = this.vertexes.find((vertex) => vertex.id === id);
      if (event.shiftKey) {
        this._selections.push(vertex);
      } else {
        this.deselect();
        this._selections = [vertex];
      }

      vertex.select();
      event.stopPropagation();
      return;
    } else if (type === 'edge') {
      const edge = this.edges.find((edge) => edge.id === id);

      if (event.shiftKey) {
        this._selections.push(edge);
      } else {
        this._selections = [edge];
      }

      edge.select();
      event.stopPropagation();
      return;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const target = event.target as SVGSVGElement;
    const type = target.parentElement.getAttribute('type');
    const id = target.parentElement.getAttribute('id');

    if (type === 'vertex') {
      const vertex = this.vertexes.find((vertex) => vertex.id === id);
      const connectorsId: Array<string> = vertex.model.connectors.map(
        (connector) => connector.id
      );
      const connectors = this.connectors.filter((connector) =>
        connectorsId.some((id) => id === connector.id)
      );
      this.prepareDrag(event, [vertex, ...connectors]);
    } else if (type === 'edge') {
      const edge = this.edges.find((edge) => edge.id === id);
      this.prepareDrag(event, [edge]);
    } else if (type === 'connector' && !this._drawing) {
      // If we are on a connector we will prepare for drawing an edge instead.
      const connector = this.connectors.find((con) => con.id === id);
      this.drawLine(event, connector.model);
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this._dragging) this.finishDrag(event);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this._dragging) {
      this.onDrag(event);
      this.renderEdges();
    }

    if (this._drawing) {
      this.drawLine(event);
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    if (this._dragging) {
      this.finishDrag(event);
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
            const idx = this.model.vertexs.indexOf(directive.model);
            this.model.vertexs.splice(idx, 1);
            this.removedItem.emit(directive.model);
          } else if (directive instanceof EdgeDirective) {
            const idx = this.model.edges.indexOf(directive.model);
            this.model.edges.splice(idx, 1);
            this.removedItem.emit(directive.model);
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
      if (this._drawing) this.cancleDrawing();
      else if (this._selections.length > 0) this.deselect();
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
      this._selections = [];
    }
  }
}

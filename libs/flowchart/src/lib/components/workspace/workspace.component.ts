import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ContentChild,
  TemplateRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
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
} from '@angular/core';
import {
  IEdge,
  IVertex,
  IWorkspaceModel,
  IView,
} from '../../flowchart.interfaces';
import { Subscription } from 'rxjs';
import { SvgService } from '../../services/svg.service';
import { LineStyle } from '../../flowchart.enums';
import { SelectEvent } from '../../flowchart.events';
import { VertexDirective } from '../../directives/vertex.directive';
import { EdgeDirective } from '../../directives/edge.directive';

const keyCodes = {
  DELETE: 46,
};

@Component({
  selector: 'eossu-fc-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  encapsulation: ViewEncapsulation.None,
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

  private _subscriptions = new Subscription();
  private _selections = new Array<VertexDirective | EdgeDirective>();

  constructor(private _svgSrc: SvgService) {}

  ngOnInit(): void {
    if (!this.edgeStyle) {
      this.edgeStyle = LineStyle.Curved;
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._subscriptions = null;
  }

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

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
      this.unSelect();
      this._selections = [directive];
    }
  }

  /**
   * Generate the path line D attribute data.
   *
   * @param edge The edge to be drawn.
   */
  getEdgeAttributeSvgD(edge: IEdge): string {
    const sourceVertex = this.getVertexById(edge.source);
    const destVertex = this.getVertexById(edge.destination);
    return this._svgSrc.drawSvgPathLine(
      sourceVertex,
      destVertex,
      this.edgeStyle
    );
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

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.unSelect();
    this._selections = [];
  }

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
            this.model.edges.slice(idx, 1);
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
    }
  }

  private unSelect(): void {
    if (this._selections.length > 0) {
      this._selections.forEach((someDirective) => {
        someDirective.unSelect();
      });
    }
  }
}

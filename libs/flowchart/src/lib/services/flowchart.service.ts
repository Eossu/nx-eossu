import { Injectable, ElementRef } from '@angular/core';

import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { BehaviorSubject } from 'rxjs';

import { IWorkspaceModel, IConnector, IVertex, IEdge } from '../flowchart.interfaces';
import { VertexsModel, ConnectorsModel, EdgesModel } from '../flowchart.models';

@Injectable()
export class FlowchartService {

  private readonly _flowchartModel = new BehaviorSubject<IWorkspaceModel>({ nodes: [], edges: [] });
  readonly flowchartModel$ = this._flowchartModel.asObservable();

  svgElementRef: ElementRef<SVGElement>;
  canvasElementRef: ElementRef<HTMLElement>;

  selectedModels: Array<IConnector | IEdge | IVertex>;

  vertexsModel: VertexsModel;
  connectorsModel: ConnectorsModel;
  edgesModel: EdgesModel;

  constructor() {
    this.vertexsModel = new VertexsModel(this);
    this.connectorsModel = new ConnectorsModel(this);
    this.edgesModel = new EdgesModel(this);
  }

  /**
   * Get the last model value emitted
   */
  get model(): IWorkspaceModel {
    return this._flowchartModel.getValue();
  }

  private setModel(model: IWorkspaceModel): void {
    this._flowchartModel.next(model);
  }

  drop(event: CdkDragDrop<IVertex | IEdge>): void {}

  selectModel(model: IConnector | IVertex | IEdge): void {}

  deselectModel(model: IConnector | IVertex | IEdge): void {}

  toggleSelected(model: IConnector | IVertex | IEdge): void {}

  isSelected(model: IConnector | IVertex | IEdge): boolean {}

  isEdit(model: IConnector | IVertex | IEdge): boolean {}
}

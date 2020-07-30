import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWorkspaceModel, IVertex, IEdge } from '../flowchart.interfaces';


const defaultModel: IWorkspaceModel = {
  edges: [],
  vertexs: []
};


@Injectable()
export class WorkspaceService {

  private _modelSubject = new BehaviorSubject<IWorkspaceModel>(defaultModel);

  /**
   * Observable stream of `IWorkspaceModel`.
   */
  model$ = this._modelSubject.asObservable();

  constructor() { }

  /**
   * Get the latest IWorkspaceModel from the observable stream.
   * 
   * @returns The latest IWorkspaceModel.
   */
  get model (): IWorkspaceModel {
    return this._modelSubject.getValue();
  }

  /**
   * Add a new vertex to the model.
   * 
   * @param vertex The vertex to add.
   */
  addVertex(vertex: IVertex): void {
    const latestModel = this.model;
    const newVertexs = [...this.model.vertexs, vertex];
    this.createNewModel(newVertexs, latestModel.edges);
  }

  /**
   * Add a new edge to the model.
   * 
   * @param edge The edge to add.
   */
  addEdge(edge: IEdge): void {
    const latestModel = this.model;
    const newEdges = [...latestModel.edges, edge];
    this.createNewModel(latestModel.vertexs, newEdges)
  }

  /**
   * Add a array of vertexes to the model.
   * 
   * @param vertexs The Array of vertexes to add.
   */
  addVertexs(vertexs: Array<IVertex>): void {
    const latestModel = this.model;
    const newVertexs = [...latestModel.vertexs, ...vertexs];
    this.createNewModel(newVertexs, latestModel.edges);
  }

  /**
   * Add a array of edges to the model.
   * 
   * @param edges The Array of edges to add.
   */
  addEdges(edges: Array<IEdge>): void {
    const latestModel = this.model;
    const newEdges = [...latestModel.edges, ...edges];
    this.createNewModel(latestModel.vertexs, edges);
  }

  /**
   * Set a new model and ignoring the model allready there.
   * 
   * @param model Model to set.
   */
  setModel(model: IWorkspaceModel): void {
    this._modelSubject.next(model);
  }

  getVertexById(id: string): IVertex {
    return this.model.vertexs.find((vertex) => {
      vertex.id === id;
    });
  }

  private createNewModel(vertexes: Array<IVertex>, edges: Array<IEdge>): void {
    const newModel: IWorkspaceModel = {
      vertexs: vertexes,
      edges: edges
    };

    this._modelSubject.next(newModel);
  }
}

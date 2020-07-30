import { Observable } from 'rxjs';
import { ConnectorType } from './flowchart.enums';

export interface ID {
  id: string;
}

export interface ISelection {
  selected?: boolean;
}

export interface ICordinates {
  x?: number;
  y?: number;
}

export interface IDimension {
  height: number;
  width: number;
  radius?: number;
}

export interface ICategory {
  name: string;
  color: string;
}

export interface IConnector extends ID, ISelection, IDimension, ICordinates {
  type: ConnectorType;
  [key: string]: any;
}

export interface IVertex extends ID, ICordinates, IDimension, ISelection, ICategory {
  title: string;
  connectors: Array<IConnector>;
  readonly?: boolean;
  [key: string]: any;
}

export interface IEdge extends ID, ISelection {
  lable?: string;
  source?: string;
  destination?: string;
  active?: boolean;
  [key: string]: any;
}

export interface IWorkspaceModel {
  vertexs: Array<IVertex>;
  edges: Array<IEdge>;
}

export interface IView {
  width: number | string;
  height: number | string;
}

export interface IUserNodeCallbacks {
  nodeEdit?: (event: MouseEvent, node: IVertex) => void;
  doubleClick?: (event: MouseEvent, node: IVertex) => void;
  mouseDown?: (event: MouseEvent, node: IVertex) => void;
  mouseEnter?: (event: MouseEvent, node: IVertex) => void;
  mouseLeave?: (event: MouseEvent, node: IVertex) => void;
}

export interface IUserCallbacks {
  dropNode?: (event: Event, node: IVertex) => void;
  createEdge?: (event: Event, edge: IEdge) => Observable<IEdge>;
  edgeAdded?: (edge: IEdge) => void;
  nodeRemoved?: (node: IVertex) => void;
  edgeRemoved?: (edge: IEdge) => void;
  edgeDoubleClick?: (event: MouseEvent, edge: IEdge) => void;
  edgeMouseOver?: (event: MouseEvent, edge: IEdge) => void;
  isValidEdge?: (source: IConnector, destination: IConnector) => boolean;
  edgeEdit?: (event: Event, edge: IEdge) => void;
  nodeCallbacks?: IUserNodeCallbacks;
}

export interface ICallbacks {
  nodeDragstart: (event: Event, node: IVertex) => void;
  nodeDragend: (event: Event) => void;
  edgeDragstart: (event: Event, connector: IConnector) => void;
  edgeDragend: (event: Event) => void;
  edgeDrop: (event: Event, targetConnector: IConnector) => boolean;
  edgeDragoverConnector: (event: Event, connector: IConnector) => boolean;
  edgeDragoverMagnet: (event: Event, connector: IConnector) => boolean;
  edgeDragleaveMagnet: (event: Event) => void;
  nodeMouseOver: (event: MouseEvent, node: IVertex) => void;
  nodeMouseOut: (event: MouseEvent, node: IVertex) => void;
  connectorMouseEnter: (event: MouseEvent, connector: IConnector) => void;
  connectorMouseLeave: (event: MouseEvent, connector: IConnector) => void;
  nodeClicked: (event: MouseEvent, node: IVertex) => void;
}

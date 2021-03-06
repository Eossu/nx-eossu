import { Observable } from 'rxjs';
import { ConnectorType, VertexType } from './flowchart.enums';

export interface ID {
  id: string;
}

export interface ISelection {
  selected?: boolean;
}

export interface IPoint2D {
  x?: number;
  y?: number;
}

export interface IDimension {
  height?: number;
  width?: number;
  radius?: number;
}

export interface ICategory {
  name: string;
  color: string;
}

export interface IBorder {
  color: string;
  width: number;
}

export interface IConnector extends ID, IDimension, IPoint2D {
  type: ConnectorType;
  color?: string;
  border?: IBorder;
  callbacks?: IUserCallbacks;
  [key: string]: any;
}

export interface IVertex extends ID, IPoint2D, IDimension, ISelection {
  type?: VertexType;
  title?: string;
  connectors?: Array<IConnector>;
  readonly?: boolean;
  border?: IBorder;
  category?: ICategory;
  callbacks?: IUserCallbacks;
  [key: string]: any;
}

export interface IEdge extends ID, ISelection {
  lable?: string;
  source?: string;
  destination?: string;
  endCord?: IPoint2D;
  active?: boolean;
  color?: string;
  callbacks?: IUserCallbacks;
  d?: string;
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

export interface IUserCallbacks {
  click?: (event: MouseEvent, model: IVertex | IEdge | IConnector) => void;
  doubleClick?: (event: MouseEvent, model: IVertex | IEdge | IConnector) => void;
  mouseDown?: (event: MouseEvent, model: IVertex | IEdge | IConnector) => void;
  mouseEnter?: (event: MouseEvent, model: IVertex | IEdge | IConnector) => void;
  mouseLeave?: (event: MouseEvent, model: IVertex | IEdge | IConnector) => void;
  mouseUp?: (event: MouseEvent, model: IVertex | IEdge | IConnector) => void;
}

export interface IDraggable {
  readonly id: string;
  onDragStart?: (event: MouseEvent) => void;
  onDrag: (event: MouseEvent) => void;
}

export interface ISelectable {
  select: () => void;
  deselect: () => void;
}

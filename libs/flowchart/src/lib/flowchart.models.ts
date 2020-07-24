import { Observable } from 'rxjs'


const htmlPrefix = 'eossu-fc'


export const FlowchartConstants = {
    htmlPrefix,
    canvasClass: htmlPrefix + '-canvas',
    selectedClass: htmlPrefix + '-selected',
    editClass: htmlPrefix + '-edit',
    activeClass: htmlPrefix + '-active',
    hoverClass: htmlPrefix + '-hover',
    draggingClass: htmlPrefix + '-dragging',
    edgeClass: htmlPrefix + '-edge',
    edgeLabelClass: htmlPrefix + '-edge-label',
    connectorClass: htmlPrefix + '-connector',
    magnetClass: htmlPrefix + '-magnet',
    nodeClass: htmlPrefix + '-node',
    nodeOverlayClass: htmlPrefix + '-node-overlay',
    leftConnectorClass: htmlPrefix + '-left-connectors',
    rightConnectorClass: htmlPrefix + '-right-connectors',
    topConnectorClass: htmlPrefix + '-top-connectors',
    bottomConnectorClass: htmlPrefix + '-bottom-connectors',
    canvasResizeThreshold: 200,
    canvasResizeStep: 200
}


export enum ConnectorType {
    Left,
    Right,
    Top,
    Bottom
}


export enum LineStyle {
    Curved,
    Line
}


export interface ICordinates {
    x?: number;
    y?: number;
}


export interface IRectangle {
    left: number;
    right: number;
    top: number;
    bottom: number;
}


export interface IConnector {
    id: string;
    type: string;
}


export interface INode extends ICordinates {
    id: string;
    name: string;
    connectors: Array<IConnector>;
    readonly?: boolean;
    [key: string]: any;
}


export interface INodeRectangleInfo {
    width(): number;
    height(): number;
    top(): number;
    left(): number;
    right(): number;
    bottom(): number;
}


export interface IConnectorRectangleInfo {
    type: string;
    width: number
    height: number;
    nodeRectagleInfo: INodeRectangleInfo;
}


export interface IEdge {
    lable?: string;
    source?: string;
    destination?: string;
    active?: boolean;
}

export interface IModel {
    nodes: Array<INode>;
    edges: Array<IEdge>;
}


export interface IUserNodeCallbacks {
    nodeEdit?: (event: MouseEvent, node: INode) => void;
    doubleClick?: (event: MouseEvent, node: INode) => void;
    mouseDown?: (event: MouseEvent, node: INode) => void;
    mouseEnter?: (event: MouseEvent, node: INode) => void;
    mouseLeave?: (event: MouseEvent, node: INode) => void;
}


export interface IUserCallbacks {
    dropNode?: (event: Event, node: INode) => void;
    createEdge?: (event: Event, edge: IEdge) => Observable<IEdge>;
    edgeAdded?: (edge: IEdge) => void;
    nodeRemoved?: (node: INode) => void;
    edgeRemoved?: (edge: IEdge) => void;
    edgeDoubleClick?: (event: MouseEvent, edge: IEdge) => void;
    edgeMouseOver?: (event: MouseEvent, edge: IEdge) => void;
    isValidEdge?: (source: IConnector, destination: IConnector) => boolean;
    edgeEdit?: (event: Event, edge: IEdge) => void;
    nodeCallbacks?: IUserNodeCallbacks;
}


export interface ICallbacks {
    nodeDragstart: (event: Event, node: INode) => void;
    nodeDragend: (event: Event) => void;
    edgeDragstart: (event: Event, connector: IConnector) => void;
    edgeDragend: (event: Event) => void;
    edgeDrop: (event: Event, targetConnector: IConnector) => boolean;
    edgeDragoverConnector: (event: Event, connector: IConnector) => boolean;
    edgeDragoverMagnet: (event: Event, connector: IConnector) => boolean;
    edgeDragleaveMagnet: (event: Event) => void;
    nodeMouseOver: (event: MouseEvent, node: INode) => void;
    nodeMouseOut: (event: MouseEvent, node: INode) => void;
    connectorMouseEnter: (event: MouseEvent, connector: IConnector) => void;
    connectorMouseLeave: (event: MouseEvent, connector: IConnector) => void;
    nodeClicked: (event: MouseEvent, node: INode) => void;
  }

import { Directive, Input } from '@angular/core';
import { ICallbacks, IUserNodeCallbacks, IConnector, FlowchartConstants, INodeRectangleInfo, INode } from '../flowchart.models';

@Directive()
export class NodeDirective {

  @Input()
  callbacks: ICallbacks;

  @Input()
  userNodeCallbacks: IUserNodeCallbacks;

  @Input()
  node: INode;

  @Input()
  selected: boolean;

  @Input()
  edit: boolean;

  @Input()
  mouseOver: boolean;

  @Input()
  mouseOverConnector: IConnector;

  @Input()
  dragging: boolean;

  fcConstants = FlowchartConstants;

  width: number;

  height: number;

  nodeRectangleInfo: INodeRectangleInfo = {
    
    width: () => {
      return this.width;
    },

    height: () => {
      return this.height;
    },

    left: () => {
      return this.node.x;
    },

    right: () => {
      return this.node.x + this.width;
    }
    
    top: () => {
      return this.node.y;
    },

    bottom: () => {
      return this.node.y + this.height;
    }
  }

  constructor() { }

}
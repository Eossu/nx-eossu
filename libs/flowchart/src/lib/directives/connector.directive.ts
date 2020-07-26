import {
  Directive,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';
import {
  IUserCallbacks,
  IConnector,
  INodeRectangleInfo,
  FlowchartConstants,
} from '../flowchart.models';
import { AbsractElementControl } from '../abstraction/element-control.abstraction';

@Directive({
  selector: '[eossu-connector]',
})
export class ConnectorDirective extends AbsractElementControl
  implements OnInit, OnChanges {
  @Input()
  callbacks: IUserCallbacks;

  @Input()
  modelService: any;

  @Input()
  connector: IConnector;

  @Input()
  nodeReactangleInfo: INodeRectangleInfo;

  @Input()
  mouseOverConnector: IConnector;

  constructor(render2: Renderer2, elementRef: ElementRef<HTMLElement>) {
    super(render2, elementRef);
  }

  ngOnInit(): void {
    this.addClass(FlowchartConstants.connectorClass);
  }

  ngOnChanges(changes: SimpleChanges): void {}
}

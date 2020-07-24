import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  ComponentFactoryResolver,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Inject,
  ViewChild,
  ViewContainerRef,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {
  ICallbacks,
  IConnector,
  INode,
  FlowchartConstants,
  IUserNodeCallbacks,
} from '../../flowchart.models';
import { NodeDirective } from '../../directives/node.directive';

@Component({
  selector: 'eossu-fc-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit, AfterViewInit, OnChanges {
  
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

  @HostBinding('attr.id')
  get nodeId(): string {
    return this.node.id;
  }

  @HostBinding('style.top')
  get top(): string {
    return this.node.y + 'px';
  }

  @HostBinding('style.left')
  get left(): string {
    return this.node.x + 'px';
  }

  nodeDirective: NodeDirective;

  @ViewChild('nodeContainer', {read: ViewContainerRef, static: true}) nodeContainer: ViewContainerRef;

  constructor(
    private _renderer2: Renderer2,
    private _elementRef: ElementRef,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    if (!this.userNodeCallbacks) {
      this.userNodeCallbacks = {};
    }
    this.userNodeCallbacks.nodeEdit = this.userNodeCallbacks.nodeEdit || (() => {});
    this.userNodeCallbacks.doubleClick = this.userNodeCallbacks.doubleClick || (() => {});
    this.userNodeCallbacks.mouseDown = this.userNodeCallbacks.mouseDown || (() => {});
    this.userNodeCallbacks.mouseEnter = this.userNodeCallbacks.mouseEnter || (() => {});
    this.userNodeCallbacks.mouseLeave = this.userNodeCallbacks.mouseLeave || (() => {});

    this.addClass(FlowchartConstants.nodeClass);

    if (!this.node.readonly) {
      this.addAttr('draggable', 'true');
    }
  }

  ngAfterViewInit(): void {
    this.nodeDirective.width = this._elementRef.nativeElement.offsetWidth;
    this.nodeDirective.height = this._elementRef.nativeElement.offsetHeight;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedNode = false;

    for (const name in Object.keys(changes)) {
      const change = changes[name];
      if (!change.firstChange && change.currentValue !== change.previousValue) {
        if (['selected', 'edit', 'mouseOver', 'mouseOverConnector', 'dragging'].includes(name)) {
          updatedNode = true;
        }
      }
    }

    if (updatedNode) {
      this.updateNodeClasses();
      this.updateNodeDirective();
    }
  }

  updateNodeClasses(): void {
    this.toggleClass(FlowchartConstants.selectedClass, this.selected);
    this.toggleClass(FlowchartConstants.editClass, this.edit);
    this.toggleClass(FlowchartConstants.hoverClass, this.mouseOver);
    this.toggleClass(FlowchartConstants.draggingClass, this.dragging);
  }

  updateNodeDirective(): void {
    this.nodeDirective.selected = this.selected;
    this.nodeDirective.edit = this.edit;
    this.nodeDirective.mouseOver = this.mouseOver;
    this.nodeDirective.mouseOverConnector = this.mouseOverConnector;
    this.nodeDirective.dragging = this.dragging;
  }

  toggleClass(className: string, active: boolean) {
    if (active) {
      this.addClass(className);
    } else {
      this.removeClass(className);
    }
  }

  addClass(className: string) {
    this._renderer2.addClass(this._elementRef.nativeElement, className);
  }

  removeClass(className: string) {
    this._renderer2.removeClass(this._elementRef.nativeElement, className)
  }

  addAttr(attrName: string, attrValue: string) {
    this._renderer2.setAttribute(this._elementRef.nativeElement, attrName, attrValue)
  }

  @HostListener('mousedown', ['$event'])
  mousedown(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('dragstart', ['$event'])
  dragstart(event: Event) {
    if (!this.node.readonly) {
      this.callbacks.nodeDragstart(event, this.node);
    }
  }

  @HostListener('dragend', ['$event'])
  dragend(event: Event) {
    if (!this.node.readonly) {
      this.callbacks.nodeDragend(event);
    }
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    if (!this.node.readonly) {
      this.callbacks.nodeClicked(event, this.node);
    }
  }

  @HostListener('mouseover', ['$event'])
  mouseover(event: MouseEvent) {
    if (!this.node.readonly) {
      this.callbacks.nodeMouseOver(event, this.node);
    }
  }

  @HostListener('mouseout', ['$event'])
  mouseout(event: MouseEvent) {
    if (!this.node.readonly) {
      this.callbacks.nodeMouseOut(event, this.node);
    }
  }
}

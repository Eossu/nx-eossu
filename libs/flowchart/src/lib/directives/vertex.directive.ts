import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { IVertex, ICordinates, IConnector } from '../flowchart.interfaces';
import { SvgService } from '../services/svg.service';
import { colorLuminance } from '../color.helpers';
import { VertexType, ConnectorType } from '../flowchart.enums';
import { SelectEvent } from '../flowchart.events';

@Directive({
  selector: '[eossuFcVertex]',
})
export class VertexDirective implements OnInit {
  @Input() vertex: IVertex;

  @Output() selected = new EventEmitter<SelectEvent>();

  private _dragging = false;
  private _dragged = false;
  private _offset: ICordinates = { x: 0.0, y: 0.0 };
  private _originalColor: string = '';
  private _leftMaxDrag = 0.0;
  private _topMaxDrag = 0.0;

  private readonly _lumChange = 0.12;

  constructor(
    private _elementRef: ElementRef<SVGSVGElement>,
    private _svgDragSvc: SvgService
  ) {}

  ngOnInit(): void {
    if (!this.vertex.border)
      this.vertex.border = { width: 1, color: colorLuminance('#fff', 0.12) };

    this.vertex.connectors.map((connector) => {
      if (!connector.border)
        connector.border = { width: 1, color: colorLuminance('#fff', 0.12) };

      this.calculateConnectorPosition(connector);
    });

    this.vertex.selected = false;

    this._leftMaxDrag = this.vertex.border.width;
    this._topMaxDrag = this.vertex.border.width;
  }

  unSelect(): void {
    this.vertex.selected = false;
    this.changeBackgroundColor(true);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this._dragged) {
      this._dragged = false;
      return;
    }

    this.vertex.selected = !this.vertex.selected;
    this.changeBackgroundColor(!this.vertex.selected);

    const selectedEvent = new SelectEvent(
      'vertex',
      this.vertex.id,
      event.shiftKey
    );
    this.selected.emit(selectedEvent);
    event.stopPropagation();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (!this.vertex.readonly) {
      this.calculateMouseOffset(event);
      this._dragging = true;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp($event: MouseEvent): void {
    this._dragging = false;
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event: MouseEvent): void {
    if (!this.vertex.readonly) {
      this.changeBackgroundColor();
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event: MouseEvent): void {
    this._dragging = false;

    if (!this.vertex.selected) this.changeBackgroundColor(true);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this._dragging) {
      event.stopPropagation();
      this._dragged = true;

      this.calculateVertexPosition(event);
      this.vertex.connectors.map((connector) => {
        this.calculateConnectorPosition(connector);
      });
    }
  }

  private changeBackgroundColor(original = false) {
    if (!this._originalColor) this._originalColor = this.vertex.category.color;

    if (!original) {
      this.vertex.category.color = colorLuminance(
        this._originalColor,
        this._lumChange
      );
    } else {
      this.vertex.category.color = this._originalColor;
    }
  }

  private calculateMouseOffset(event: MouseEvent): void {
    this._offset = this._svgDragSvc.getSVGPoint(
      event,
      this._elementRef.nativeElement
    );
    this._offset.x -= this.vertex.x;
    this._offset.y -= this.vertex.y;
  }

  private calculateVertexPosition(event: MouseEvent): void {
    const coord = this._svgDragSvc.getSVGPoint(
      event,
      this._elementRef.nativeElement
    );

    let x = coord.x - this._offset.x;
    let y = coord.y - this._offset.y;

    if (x < this._leftMaxDrag) x = this._leftMaxDrag;
    if (y < this._topMaxDrag) y = this._topMaxDrag;

    this.vertex.x = x;
    this.vertex.y = y;

    this.calculateMouseOffset(event);
  }

  private calculateConnectorPosition(connector: IConnector): void {
    if (this.vertex.type === VertexType.Rectangle) {
      if (connector.type === ConnectorType.Left) {
        const center = this.vertex.height / 2;
        connector.x = this.vertex.x;
        connector.y = this.vertex.y + center;
        this._leftMaxDrag = connector.border.width + connector.radius;
      } else if (connector.type === ConnectorType.Top) {
        const center = this.vertex.width / 2;
        connector.x = this.vertex.x + center;
        connector.y = this.vertex.y;
        this._topMaxDrag = connector.border.width + connector.radius;
      } else if (connector.type === ConnectorType.Bottom) {
        const center = this.vertex.width / 2;
        connector.x = this.vertex.x + center;
        connector.y = this.vertex.y + this.vertex.height;
      } else if (connector.type === ConnectorType.Right) {
        const center = this.vertex.height / 2;
        connector.x = this.vertex.x + this.vertex.width;
        connector.y = this.vertex.y + center;
      }
    } else {
      if (connector.type === ConnectorType.Left) {
        connector.x = this.vertex.x - this.vertex.radius;
        connector.y = this.vertex.y;
      } else if (connector.type === ConnectorType.Top) {
        connector.x = this.vertex.x;
        connector.y = this.vertex.y - this.vertex.radius;
      } else if (connector.type === ConnectorType.Bottom) {
        connector.x = this.vertex.x;
        connector.y = this.vertex.y + this.vertex.radius;
      } else if (connector.type === ConnectorType.Right) {
        connector.x = this.vertex.x + this.vertex.radius;
        connector.y = this.vertex.y;
      }
    }
  }
}

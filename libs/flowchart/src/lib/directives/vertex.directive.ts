import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  OnInit,
} from '@angular/core';

import {
  IVertex,
  IPoint2D,
  IDraggable,
  ISelectable,
} from '../flowchart.interfaces';

import { SvgService } from '../services/svg.service';
import { colorLuminance } from '../utils/color.helpers';

@Directive({
  selector: '[eossuFcVertex]',
})
export class VertexDirective implements OnInit, IDraggable, ISelectable {
  @Input() model: IVertex;

  private _offset: IPoint2D;
  private _originalColor: string = '';
  private _leftMaxDrag = 0.0;
  private _topMaxDrag = 0.0;
  private readonly _lumChange = 0.2;

  /**
   * Get the ID this VertexDirective represents
   */
  get id(): string {
    return this.model.id;
  }

  constructor(
    private _elementRef: ElementRef<SVGSVGElement>,
    private _svgDragSvc: SvgService
  ) {}

  /**
   * Handles the initialization of the Angular Directive according to Angular Lifecycle events.
   */
  ngOnInit(): void {
    if (!this.model.border)
      this.model.border = {
        width: 1,
        color: colorLuminance(this.model.category.color, -0.3),
      };

    this.model.connectors.map((connector) => {
      if (!connector.border)
        connector.border = {
          width: 1,
          color: colorLuminance(this.model.category.color, -0.3),
        };
    });

    if (this.model.readonly === undefined) {
      this.model.readonly = false;
    }

    this._leftMaxDrag = this.model.border.width;
    this._topMaxDrag = this.model.border.width;
  }

  /**
   * Prepare the element to be dragged.
   * 
   * @param event MouseEvent
   */
  onDragStart(event: MouseEvent): void {
    this.calculateMouseOffset(event);
  }

  /**
   * Triggered when this directive is beeing dragged.
   *
   * @param event MouseEvent
   */
  onDrag(event: MouseEvent): void {
    this.calculateVertexPosition(event);
  }

  /**
   * Deselect this directive.
   */
  deselect(): void {
    this.model.selected = false;
    this.changeFillColor(true);
  }

  /**
   * Select this directive.
   */
  select(): void {
    this.model.selected = true;
    this.changeFillColor();
  }

  /**
   * Handles the mouse enter event when fired.
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.model.readonly && !this.model.selected) {
      this.changeFillColor();
    }
  }

  /**
   * Handles the mouse leave event when fired.
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.model.selected) this.changeFillColor(true);
  }

  /**
   * Helper method to handle color changes on the directive.
   *
   * @param original Set color to original if set to true.
   */
  private changeFillColor(original = false) {
    if (!this._originalColor) this._originalColor = this.model.category.color;

    if (!original) {
      this.model.category.color = colorLuminance(
        this._originalColor,
        this._lumChange
      );
    } else {
      this.model.category.color = this._originalColor;
    }
  }

  /**
   * Calculate the (x, y) offset from the cordinates on the element to the mouse
   * pointer.
   *
   * @param event MouseEvent
   */
  private calculateMouseOffset(event: MouseEvent): void {
    this._offset = this._svgDragSvc.getSVGPoint(
      event,
      this._elementRef.nativeElement
    );
    this._offset.x -= this.model.x;
    this._offset.y -= this.model.y;
  }

  /**
   * Calculate the new cordinates according to the mouse event.
   *
   * @param event MouseEvent
   */
  private calculateVertexPosition(event: MouseEvent): void {
    const coord = this._svgDragSvc.getSVGPoint(
      event,
      this._elementRef.nativeElement
    );

    let x = coord.x - this._offset.x;
    let y = coord.y - this._offset.y;

    if (x < this._leftMaxDrag) x = this._leftMaxDrag;
    if (y < this._topMaxDrag) y = this._topMaxDrag;

    this.model.x = x;
    this.model.y = y;
  }
}

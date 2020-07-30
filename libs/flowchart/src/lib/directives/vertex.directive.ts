import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { IVertex, ICordinates } from '../flowchart.interfaces';
import { SvgService } from '../services/svg.service';

@Directive({
  selector: '[eossuFcVertex]',
})
export class VertexDirective {
  @Input() vertex: IVertex;

  private _dragging = false;
  private _offset: ICordinates = { x: 0.0, y: 0.0 };

  constructor(
    private _elementRef: ElementRef<SVGSVGElement>,
    private _svgDragSvc: SvgService
  ) {}

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent): void {}

  @HostListener('dbclick', ['$event'])
  onDbclick($event: MouseEvent): void {}

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

  @HostListener('mouseover', ['$event'])
  onMouseOver($event: MouseEvent): void {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event: MouseEvent): void {}

  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event: MouseEvent): void {
    this._dragging = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this._dragging) {
      event.preventDefault();
      const svgPoint = this._svgDragSvc.getSVGPoint(
        event,
        this._elementRef.nativeElement
      );
      let x = svgPoint.x - this._offset.x;
      let y = svgPoint.y - this._offset.y;

      if (x < 0) x = 0;
      if (y < 0) y =0;
      
      this.vertex.x = x;
      this.vertex.y = y;

      this.calculateMouseOffset(event);
    }
  }

  private calculateMouseOffset(event: MouseEvent): void {
    this._offset = this._svgDragSvc.getSVGPoint(event, this._elementRef.nativeElement);
    this._offset.x -= this.vertex.x;
    this._offset.y -= this.vertex.y;
  } 
}

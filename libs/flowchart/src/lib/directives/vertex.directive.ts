import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { IVertex } from '../flowchart.interfaces';
import { SvgService } from '../services/svg.service';

@Directive({
  selector: '[eossuFcVertex]',
})
export class VertexDirective {
  @Input() vertex: IVertex;

  private _dragging = false;

  constructor(
    private _elementRef: ElementRef<SVGSVGElement>,
    private _svgDragSvc: SvgService
  ) {}

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent): void {}

  @HostListener('dbclick', ['$event'])
  onDbclick($event: MouseEvent): void {}

  @HostListener('mousedown', ['$event'])
  onMouseDown($event: MouseEvent): void {
    if (!this.vertex.readonly) {
      this._dragging = true;
    }
  }

  @HostListener('mouseup', ["$event"])
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

  @HostListener("mousemove", ["$event"])
  onMouseMove($event: MouseEvent): void {
    if (this._dragging) {
      const svgPoint = this._svgDragSvc.getSVGPoint($event, this._elementRef.nativeElement);
      this.vertex.x = svgPoint.x;
      this.vertex.y = svgPoint.y;
    }
  }
}

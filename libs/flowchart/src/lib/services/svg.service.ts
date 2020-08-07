import { Injectable } from '@angular/core';
import { IPoint2D } from '../flowchart.interfaces';
import { LineStyle } from '../flowchart.enums';

interface ITangnet {
  source: IPoint2D;
  dest: IPoint2D;
}

@Injectable()
export class SvgService {
  constructor() {}

  /**
   * Translate the screen cordinate system point to the SVG cordiante system point
   *
   * @param event - The mouse event
   * @param element - SVG element
   *
   * @returns The SVGPoint
   */
  getSVGPoint(event: MouseEvent | IPoint2D, element: EventTarget): IPoint2D {
    let point: SVGPoint;

    const target = element as SVGSVGElement;
    if (target.ownerSVGElement)
      point = target.ownerSVGElement.createSVGPoint();
    else
      point = target.createSVGPoint();
    point.x = event.x;
    point.y = event.y;

    const CTM = target.getScreenCTM();
    const calcPoint = point.matrixTransform(CTM.inverse());
    return { x: calcPoint.x, y: calcPoint.y };
  }

  /**
   * Draw an SVG path that will represent a line between two points.
   *
   * @param pt1 Cordinate for starting point
   * @param pt2 Cordinates for ending point
   * @param style Style of the line
   */
  drawSvgPathLine(
    pt1: IPoint2D,
    pt2: IPoint2D,
    style: LineStyle
  ): string {
    let d = `M ${pt1.x} ${pt1.y} `;

    if (style === LineStyle.Curved) {
      const tang = this.calculateTangent(pt1, pt2);
      d += `C ${tang.source.x } ${tang.source.y} ${tang.dest.x - 70} ${tang.dest.y} ${pt2.x} ${pt2.y} `;
    } else {
      d += `L ${pt2.x} ${pt2.y} `;
    }
    
    return d;
  }

  private calculateTangentOffset(pt1: IPoint2D, pt2: IPoint2D): number {
    return (pt2.y - pt1.y) / 2;
  }

  private calculateTangent(pt1: IPoint2D, pt2: IPoint2D): ITangnet {
    const source: IPoint2D = {
      x: pt1.x,
      y: pt1.y + this.calculateTangentOffset(pt1, pt2),
    };

    const dest: IPoint2D = {
      x: pt2.x,
      y: pt2.y - this.calculateTangentOffset(pt1, pt2),
    };

    return { source: source, dest: dest };
  }
}

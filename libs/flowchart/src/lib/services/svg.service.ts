import { Injectable } from '@angular/core';
import { ICordinates } from '../flowchart.interfaces';
import { LineStyle } from '../flowchart.enums';

interface ITangnet {
  source: ICordinates;
  dest: ICordinates;
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
  getSVGPoint(event: MouseEvent, element: SVGSVGElement): SVGPoint {
    const point = element.createSVGPoint();
    point.x = event.x;
    point.y = event.y;

    const CTM = element.getScreenCTM();
    return point.matrixTransform(CTM.inverse());
  }

  /**
   * Draw an SVG path that will represent a line between two points.
   *
   * @param pt1 Cordinate for starting point
   * @param pt2 Cordinates for ending point
   * @param style Style of the line
   */
  drawSvgPathLine(
    pt1: ICordinates,
    pt2: ICordinates,
    style: LineStyle
  ): string {
    let d = `M ${pt1.x} ${pt1.y} `;

    if (style === LineStyle.Curved) {
      const tang = this.calculateTangent(pt1, pt2);
      d += `C ${tang.source.x} ${tang.source.y} ${tang.dest.x} ${tang.dest.y} ${pt2.x} ${pt2.y}`;
    } else {
      d += `L ${pt2.x} ${pt2.y}`;
    }

    return d;
  }

  private calculateTangentOffset(pt1: ICordinates, pt2: ICordinates): number {
    return (pt2.y - pt1.y) / 2;
  }

  private calculateTangent(pt1: ICordinates, pt2: ICordinates): ITangnet {
    const source: ICordinates = {
      x: pt1.x,
      y: pt1.y + this.calculateTangentOffset(pt1, pt2),
    };

    const dest: ICordinates = {
      x: pt2.x,
      y: pt2.y - this.calculateTangentOffset(pt1, pt2),
    };

    return { source: source, dest: dest };
  }
}

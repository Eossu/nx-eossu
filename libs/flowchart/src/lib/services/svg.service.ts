import { Injectable } from '@angular/core';

@Injectable()
export class SvgService {

  constructor() { }

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
}

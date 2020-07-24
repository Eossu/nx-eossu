import { Injectable } from '@angular/core';
import { ICordinates, FlowchartConstants, LineStyle } from '../flowchart.models';

@Injectable()
export class DrawingEdgeService {

  constructor() { }

  public getEdgeSvgAttr(pt1: ICordinates, pt2: ICordinates, style: LineStyle = LineStyle.Line) {
    let attr = `M ${pt1.x} ${pt1.y} `;
    if (style === LineStyle.Curved) {
    } else {
      attr += `L ${pt2.x} ${pt2.y}`;
    }

    return attr;
  }
}

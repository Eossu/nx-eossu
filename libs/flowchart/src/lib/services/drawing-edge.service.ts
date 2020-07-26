import { Injectable } from '@angular/core';
import { ICordinates } from '../flowchart.interfaces';
import { LineStyle } from '../flowchart.enums';


interface EdgeTangents {
  source: ICordinates;
  destination: ICordinates;
}


@Injectable()
export class DrawingEdgeService {

  constructor() { }

  getEdgeAttributePathD(pt1: ICordinates, pt2: ICordinates, style: LineStyle = LineStyle.Line): string {
    let attr = `M ${pt1.x} ${pt1.y} `;
    if (style === LineStyle.Curved) {
      const tangs = this.edgeTangents(pt1, pt2);
      attr += `C ${tangs.source.x} ${tangs.source.y} ${tangs.destination.x} ${tangs.destination.y} ${pt2.x} ${pt2.y}`;
    } else {
      attr += `L ${pt2.x} ${pt2.y}`;
    }

    return attr;
  }

  private edgeTangentOffset(pt1: ICordinates, pt2:ICordinates): number {
    return (pt2.y - pt1.y) /2;
  }

  private edgeTangents(pt1: ICordinates, pt2: ICordinates): EdgeTangents {
    const source = { x: pt1.x, y: pt1.y - this.edgeTangentOffset(pt1, pt2) };
    const destination = { x: pt2.x, y: pt2.y - this.edgeTangentOffset(pt1, pt2) };

    return {
      source: source,
      destination: destination
    };
  }
}

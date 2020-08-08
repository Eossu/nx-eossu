import {
  Directive,
  Input,
  OnInit,
} from '@angular/core';

import { IEdge, IPoint2D, IDraggable, ISelectable } from '../flowchart.interfaces';
import { colorLuminance } from '../utils/color.helpers';
import { SvgService } from '../services/svg.service';
import { LineStyle } from '../flowchart.enums';

@Directive({
  selector: '[eossuFcEdge]',
})
export class EdgeDirective implements OnInit, IDraggable, ISelectable {
  @Input() model: IEdge;

  private _originalColor: string;
  private readonly _lumChange = 0.5;

  get id(): string {
    return this.model.id;
  }

  constructor(private _svgSvc: SvgService) {}

  ngOnInit(): void {
    if (!this.model.color) {
      this.model.color = '#d5bac8';
    }
  }

  onDrag(event: MouseEvent): void {}

  deselect(): void {
    this.model.selected = false;
    this.changeFillColor(true);
  }

  select(): void {
    this.model.selected = true
    this.changeFillColor();
  }

  render(pt1: IPoint2D, pt2: IPoint2D, lineStyle: LineStyle): void {
    const d = this._svgSvc.drawSvgPathLine(pt1, pt2, lineStyle);
    this.model.d = d;
  }

  private changeFillColor(original = false) {
    if (!this._originalColor) this._originalColor = this.model.color;

    if (!original) {
      this.model.color = colorLuminance(this._originalColor, this._lumChange);
    } else {
      this.model.color = this._originalColor;
    }
  }
}

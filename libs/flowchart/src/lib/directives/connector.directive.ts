import { Directive, OnInit, Input, HostListener } from '@angular/core';

import { IConnector, IVertex, IDraggable } from '../flowchart.interfaces';
import { SvgService } from '../services/svg.service';
import { EdgeDrawingService } from '../services/edge-drawing.service';
import { colorLuminance } from '../utils/color.helpers';
import { VertexType, ConnectorType } from '../flowchart.enums';

@Directive({
  selector: '[eossuFcConnector]',
})
export class ConnectorDirective implements OnInit, IDraggable {
  @Input() model: IConnector;
  @Input() vertex: IVertex;

  get id(): string {
    return this.model.id;
  }

  constructor() {}

  ngOnInit(): void {
    if (!this.model.color)
      this.model.color = colorLuminance(this.vertex.category.color, -0.3);

    this.calculateConnectorPosition();
  }

  onDrag(event: MouseEvent): void {
    this.calculateConnectorPosition();
  }

  private calculateConnectorPosition(): void {
    if (this.vertex.type === VertexType.Rectangle) {
      if (this.model.type === ConnectorType.Left) {
        const center = this.vertex.height / 2;
        this.model.x = this.vertex.x;
        this.model.y = this.vertex.y + center;
      } else if (this.model.type === ConnectorType.Top) {
        const center = this.vertex.width / 2;
        this.model.x = this.vertex.x + center;
        this.model.y = this.vertex.y;
      } else if (this.model.type === ConnectorType.Bottom) {
        const center = this.vertex.width / 2;
        this.model.x = this.vertex.x + center;
        this.model.y = this.vertex.y + this.vertex.height;
      } else if (this.model.type === ConnectorType.Right) {
        const center = this.vertex.height / 2;
        this.model.x = this.vertex.x + this.vertex.width;
        this.model.y = this.vertex.y + center;
      }
    } else {
      if (this.model.type === ConnectorType.Left) {
        this.model.x = this.vertex.x - this.vertex.radius;
        this.model.y = this.vertex.y;
      } else if (this.model.type === ConnectorType.Top) {
        this.model.x = this.vertex.x;
        this.model.y = this.vertex.y - this.vertex.radius;
      } else if (this.model.type === ConnectorType.Bottom) {
        this.model.x = this.vertex.x;
        this.model.y = this.vertex.y + this.vertex.radius;
      } else if (this.model.type === ConnectorType.Right) {
        this.model.x = this.vertex.x + this.vertex.radius;
        this.model.y = this.vertex.y;
      }
    }
  }
}

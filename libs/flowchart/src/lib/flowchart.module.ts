import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MinimapComponent } from './components/minimap/minimap.component';

import { VertexDirective } from './directives/vertex.directive';
import { ConnectorDirective } from './directives/connector.directive';
import { EdgeDirective } from './directives/edge.directive';

import { EdgeDrawingService } from './services/edge-drawing.service';
import { SvgService } from './services/svg.service';
import { DragService } from './services/drag.service';

import { MagnetDirective } from './directives/magnet.directive';
import { SvgPanZoomDirective } from './directives/svg-pan-zoom.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    WorkspaceComponent,
    MinimapComponent,
    VertexDirective,
    ConnectorDirective,
    EdgeDirective,
    MagnetDirective,
    SvgPanZoomDirective,
  ],
  providers: [SvgService, EdgeDrawingService, DragService],
  exports: [WorkspaceComponent],
})
export class FlowchartModule {}

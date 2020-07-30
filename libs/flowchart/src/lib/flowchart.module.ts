import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MinimapComponent } from './components/minimap/minimap.component';

import { MouseWheelDirective } from './directives/mouse-wheel.directive';
import { VertexDirective } from './directives/vertex.directive';
import { ConnectorDirective } from './directives/connector.directive';
import { EdgeDirective } from './directives/edge.directive';

import { SvgService } from './services/svg.service';
import { WorkspaceService } from './services/workspace.service';
import { MagnetDirective } from './directives/magnet.directive';

@NgModule({
  imports: [CommonModule, DragDropModule],
  declarations: [
    WorkspaceComponent,
    MinimapComponent,
    MouseWheelDirective,
    VertexDirective,
    ConnectorDirective,
    EdgeDirective,
    MagnetDirective,
  ],
  providers: [SvgService, WorkspaceService],
  exports: [WorkspaceComponent],
})
export class FlowchartModule {}

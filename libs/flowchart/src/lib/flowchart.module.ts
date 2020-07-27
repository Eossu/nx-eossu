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

@NgModule({
  imports: [CommonModule, DragDropModule],
  declarations: [
    WorkspaceComponent,
    MinimapComponent,
    MouseWheelDirective,
    VertexDirective,
    ConnectorDirective,
    EdgeDirective,
  ],
  providers: [SvgService,],
})
export class FlowchartModule {}

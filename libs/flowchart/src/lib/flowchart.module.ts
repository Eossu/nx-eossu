import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeComponent } from './components/node/node.component';
import { EdgeComponent } from './components/edge/edge.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ConnectorDirective } from './directives/connector.directive';
import { MagnetDirective } from './directives/magnet.directive';
import { NodeDirective } from './directives/node.directive';
import { DrawingEdgeService } from './services/drawing-edge.service';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NodeComponent,
    EdgeComponent,
    WorkspaceComponent,
    ConnectorDirective,
    MagnetDirective,
    NodeDirective,
  ],
  providers: [
    DrawingEdgeService,
  ],
})
export class FlowchartModule {}

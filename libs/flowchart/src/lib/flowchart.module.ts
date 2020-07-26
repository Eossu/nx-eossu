import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ConnectorDirective } from './directives/connector.directive';
import { MagnetDirective } from './directives/magnet.directive';
import { NodeDirective } from './directives/node.directive';
import { DrawingEdgeService } from './services/drawing-edge.service';
import { FlowchartService } from './services/flowchart.service';
import { VertexContainerComponent } from './components/vertex-container/vertex-container.component';
import { ConnectorsService } from './services/connectors.service';
import { EdgesService } from './services/edges.service';
import { VertexesService } from './services/vertexes.service';
import { DrawingVertexService } from './services/drawing-vertex.service';
import { DrawingConnectorService } from './services/drawing-connector.service';

@NgModule({
  imports: [CommonModule, DragDropModule],
  declarations: [
    WorkspaceComponent,
    ConnectorDirective,
    MagnetDirective,
    NodeDirective,
    VertexContainerComponent,
  ],
  providers: [
    FlowchartService,
    DrawingEdgeService,
    DrawingVertexService,
    DrawingConnectorService,
    ConnectorsService,
    EdgesService,
    VertexesService,
  ],
})
export class FlowchartModule {}

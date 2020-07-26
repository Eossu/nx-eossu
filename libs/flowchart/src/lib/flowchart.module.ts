import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MouseWheelDirective } from './directives/mouse-wheel.directive';
import { MinimapComponent } from './components/minimap/minimap.component';

@NgModule({
  imports: [CommonModule, DragDropModule],
  declarations: [WorkspaceComponent, MouseWheelDirective, MinimapComponent],
  providers: [],
})
export class FlowchartModule {}

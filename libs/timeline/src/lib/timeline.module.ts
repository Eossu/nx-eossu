import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineItemComponent } from './components/timeline-item/timeline-item.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [TimelineComponent, TimelineItemComponent],
  exports: [TimelineComponent],
})
export class TimelineModule {}

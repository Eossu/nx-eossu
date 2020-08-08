import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineItemComponent } from './components/timeline-item/timeline-item.component';
import { TimelineItemHeaderComponent } from './components/timeline-item-header/timeline-item-header.component';
import { TimelineItemContentComponent } from './components/timeline-item-content/timeline-item-content.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [
    TimelineComponent,
    TimelineItemComponent,
    TimelineItemHeaderComponent,
    TimelineItemContentComponent,
  ],
  exports: [
    TimelineComponent,
    TimelineItemComponent,
    TimelineItemHeaderComponent,
    TimelineItemContentComponent,
  ],
})
export class TimelineModule {}

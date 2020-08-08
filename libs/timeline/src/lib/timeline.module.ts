import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineItemComponent } from './components/timeline-item/timeline-item.component';
import { TimelineItemHeaderComponent } from './components/timeline-item-header/timeline-item-header.component';
import { TimelineItemContentComponent } from './components/timeline-item-content/timeline-item-content.component';
import { TimelineItemDotComponent } from './components/timeline-item-dot/timeline-item-dot.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [
    TimelineComponent,
    TimelineItemComponent,
    TimelineItemHeaderComponent,
    TimelineItemContentComponent,
    TimelineItemDotComponent,
  ],
  exports: [
    TimelineComponent,
    TimelineItemComponent,
    TimelineItemHeaderComponent,
    TimelineItemContentComponent,
    TimelineItemDotComponent,
  ],
})
export class TimelineModule {}

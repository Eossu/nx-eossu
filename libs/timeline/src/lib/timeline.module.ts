import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineHeaderDirective } from './directives/timeline-header.directive';
import { TimelineContentDirective } from './directives/timeline-content.directive';
import { TimelineDotDirective } from './directives/timeline-dot.directive';
import { TimelineTitleDirective } from './directives/timeline-title.directive';
import { TimelineTimeDirective } from './directives/timeline-time.directive';
import { TimelineItemDirective } from './directives/timeline-item.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TimelineComponent,
    TimelineItemDirective,
    TimelineHeaderDirective,
    TimelineContentDirective,
    TimelineDotDirective,
    TimelineTitleDirective,
    TimelineTimeDirective,
  ],
  exports: [
    TimelineComponent,
    TimelineItemDirective,
    TimelineHeaderDirective,
    TimelineContentDirective,
    TimelineDotDirective,
    TimelineTitleDirective,
    TimelineTimeDirective,
  ],
})
export class TimelineModule {}

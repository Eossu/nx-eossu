import { Directive } from '@angular/core';

@Directive({
  selector: 'eossu-timeline-item, [eossu-timeline-item], [eossuTimelineItem]',
  host: { class: 'eossu-timeline-item' },
})
export class TimelineItemDirective {}

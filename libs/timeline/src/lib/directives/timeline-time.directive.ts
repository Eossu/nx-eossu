import { Directive } from '@angular/core';

@Directive({
  selector: 'eossu-timeline-time, [eossu-timeline-time],[eossuTimelineTime]',
  host: { class: 'eossu-timeline-time' },
})
export class TimelineTimeDirective {}

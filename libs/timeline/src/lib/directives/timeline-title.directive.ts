import { Directive } from '@angular/core';

@Directive({
  selector:
    'eossu-timeline-title, [eossu-timeline-title], [eossuTimelineTitle]',
  host: { class: 'eossu-timeline-title' },
})
export class TimelineTitleDirective {}

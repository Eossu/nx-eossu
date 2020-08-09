import { Directive } from '@angular/core';

@Directive({
  selector:
    'eossu-timeline-header, [eossu-timeline-header], [eossuTimelineHeader]',
  host: { class: 'eossu-timeline-header' },
})
export class TimelineHeaderDirective {}

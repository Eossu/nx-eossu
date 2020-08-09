import { Directive } from '@angular/core';

@Directive({
  selector:
    'eossu-timeline-content, [eossu-timeline-content], [eossuTimelineContent]',
  host: { class: 'eossu-timeline-content' },
})
export class TimelineContentDirective {}

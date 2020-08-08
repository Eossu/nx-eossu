  import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'eossu-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

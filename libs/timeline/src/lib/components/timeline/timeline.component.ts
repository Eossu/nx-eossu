import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'eossu-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnInit {

  timeline: Array<string> = ['test', 'test2', 'test3'];

  constructor() { }

  ngOnInit(): void {
  }

}

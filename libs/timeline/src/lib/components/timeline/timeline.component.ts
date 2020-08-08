import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';

@Component({
  selector: 'eossu-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TimelineComponent implements OnInit, OnDestroy {
  @Input() alternate: boolean = false;

  handsetLandscape = false;
  handsetPortrait = false;

  @ContentChildren(TimelineItemComponent)
  private items: QueryList<TimelineItemComponent>;

  private _subscriptions = new Subscription();

  constructor(private _breakpointObs: BreakpointObserver) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this._breakpointObs
        .observe([Breakpoints.HandsetLandscape])
        .subscribe((state) => {
          this.handsetLandscape = state.matches;
        })
    );

    this._subscriptions.add(
      this._breakpointObs
        .observe(Breakpoints.HandsetPortrait)
        .subscribe((state) => {
          this.handsetPortrait = state.matches;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}

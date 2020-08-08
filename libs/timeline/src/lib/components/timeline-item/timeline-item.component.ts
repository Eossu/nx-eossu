import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ContentChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

import { TimelineItemHeaderComponent } from '../timeline-item-header/timeline-item-header.component';
import { TimelineItemContentComponent } from '../timeline-item-content/timeline-item-content.component';
import { TimelineItemDotComponent } from '../timeline-item-dot/timeline-item-dot.component';

@Component({
  selector: 'eossu-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemComponent implements OnInit {
  @ContentChild(TimelineItemHeaderComponent)
  header: TimelineItemHeaderComponent;
  @ContentChild(TimelineItemContentComponent)
  content: TimelineItemContentComponent;
  @ContentChild(TimelineItemDotComponent) dot: TimelineItemDotComponent;

  set handset(value: boolean) {
    this._elementRef.nativeElement.classList.toggle('handset', value);
    if (this.dot) this.dot.handset = value;
  }

  constructor(private _elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}
}

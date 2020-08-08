import {
  Component,
  OnInit,
  ContentChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

import { TimelineItemHeaderComponent } from '../timeline-item-header/timeline-item-header.component';
import { TimelineItemContentComponent } from '../timeline-item-content/timeline-item-content.component';

@Component({
  selector: 'eossu-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TimelineItemComponent implements OnInit {
  @ContentChild(TimelineItemHeaderComponent)
  header: TimelineItemHeaderComponent;
  @ContentChild(TimelineItemContentComponent)
  content: TimelineItemContentComponent;

  set handsetLandscape(value: boolean) {
    this._elementRef.nativeElement.classList.toggle('handset', value);
  }

  constructor(private _elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}
}

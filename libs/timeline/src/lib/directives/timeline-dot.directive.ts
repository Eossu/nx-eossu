import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'eossu-timeline-dot, [eossu-timeline-dot], [eossuTimelineDot]',
  host: { class: 'eossu-timeline-dot' },
})
export class TimelineDotDirective implements OnInit {
  @Input() position: 'top' | 'bottom' = 'top';

  constructor(private _elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (this.position === 'bottom')
      this._elementRef.nativeElement.classList.add('bottom');
  }
}

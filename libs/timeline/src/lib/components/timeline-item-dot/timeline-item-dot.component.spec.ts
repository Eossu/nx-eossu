import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineItemDotComponent } from './timeline-item-dot.component';

describe('TimelineItemDotComponent', () => {
  let component: TimelineItemDotComponent;
  let fixture: ComponentFixture<TimelineItemDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineItemDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineItemDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

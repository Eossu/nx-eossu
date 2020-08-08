import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineItemContentComponent } from './timeline-item-content.component';

describe('TimelineItemContentComponent', () => {
  let component: TimelineItemContentComponent;
  let fixture: ComponentFixture<TimelineItemContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineItemContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

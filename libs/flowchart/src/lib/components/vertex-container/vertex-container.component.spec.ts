import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VertexContainerComponent } from './vertex-container.component';

describe('VertexContainerComponent', () => {
  let component: VertexContainerComponent;
  let fixture: ComponentFixture<VertexContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VertexContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VertexContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

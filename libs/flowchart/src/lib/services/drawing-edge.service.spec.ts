import { TestBed } from '@angular/core/testing';

import { DrawingEdgeService } from './drawing-edge.service';

describe('DrawingEdgeService', () => {
  let service: DrawingEdgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawingEdgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EdgeDrawingService } from './edge-drawing.service';

describe('EdgeDrawingService', () => {
  let service: EdgeDrawingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdgeDrawingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

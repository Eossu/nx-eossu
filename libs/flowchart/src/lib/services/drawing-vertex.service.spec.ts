import { TestBed } from '@angular/core/testing';

import { DrawingVertexService } from './drawing-vertex.service';

describe('DrawingVertexService', () => {
  let service: DrawingVertexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawingVertexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

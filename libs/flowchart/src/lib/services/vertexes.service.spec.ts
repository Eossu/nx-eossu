import { TestBed } from '@angular/core/testing';

import { VertexesService } from './vertexes.service';

describe('VertexesService', () => {
  let service: VertexesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VertexesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

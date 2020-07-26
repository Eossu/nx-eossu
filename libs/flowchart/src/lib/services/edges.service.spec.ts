import { TestBed } from '@angular/core/testing';

import { EdgesService } from './edges.service';

describe('EdgesService', () => {
  let service: EdgesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdgesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

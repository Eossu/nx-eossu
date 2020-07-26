import { TestBed } from '@angular/core/testing';

import { DrawingConnectorService } from './drawing-connector.service';

describe('DrawingConnectorService', () => {
  let service: DrawingConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawingConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

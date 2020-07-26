import { TestBed } from '@angular/core/testing';

import { FlowchartService } from './flowchart.service';

describe('WorkspaceService', () => {
  let service: FlowchartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowchartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

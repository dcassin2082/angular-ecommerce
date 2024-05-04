import { TestBed } from '@angular/core/testing';

import { SalesTrackerService } from './sales-tracker.service';

describe('SalesTrackerService', () => {
  let service: SalesTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

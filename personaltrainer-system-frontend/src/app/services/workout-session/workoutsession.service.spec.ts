import { TestBed } from '@angular/core/testing';

import { WorkoutsessionService } from './workoutsession.service';

describe('WorkoutsessionService', () => {
  let service: WorkoutsessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutsessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

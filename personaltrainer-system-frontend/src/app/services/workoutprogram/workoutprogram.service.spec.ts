import { TestBed } from '@angular/core/testing';

import { WorkoutprogramService } from './workoutprogram.service';

describe('WorkoutprogramService', () => {
  let service: WorkoutprogramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutprogramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

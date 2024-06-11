import { TestBed } from '@angular/core/testing';

import { PersonaltrainerService } from './personaltrainer.service';

describe('PersonaltrainerService', () => {
  let service: PersonaltrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaltrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RedirectmessageService } from './redirectmessage.service';

describe('RedirectmessageService', () => {
  let service: RedirectmessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectmessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { OtherAuthServiceService } from './other-auth-service.service';

describe('OtherAuthServiceService', () => {
  let service: OtherAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

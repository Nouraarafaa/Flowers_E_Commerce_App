import { TestBed } from '@angular/core/testing';

import { OtherAuthService } from './other-auth.service'

describe('OtherAuthServiceService', () => {
  let service: OtherAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

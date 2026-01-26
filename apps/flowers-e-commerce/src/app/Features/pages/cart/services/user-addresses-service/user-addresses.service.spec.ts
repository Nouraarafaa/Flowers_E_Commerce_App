import { TestBed } from '@angular/core/testing';

import { UserAddresseesService } from './user-addresses.service';

describe('UserAddresseesService', () => {
  let service: UserAddresseesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAddresseesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

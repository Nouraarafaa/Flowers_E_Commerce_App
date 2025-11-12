import { TestBed } from '@angular/core/testing';

import { LocationAdaptorService } from './location-adaptor.service';

describe('LocationAdaptorService', () => {
  let service: LocationAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

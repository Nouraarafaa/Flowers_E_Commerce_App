import { TestBed } from '@angular/core/testing';

import { OccassionService } from './occassion.service';

describe('OccassionService', () => {
  let service: OccassionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccassionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

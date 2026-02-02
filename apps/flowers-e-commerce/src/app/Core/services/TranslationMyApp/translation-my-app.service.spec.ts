import { TestBed } from '@angular/core/testing';

import { TranslationMyAppService } from './translation-my-app.service';

describe('TranslationMyAppService', () => {
  let service: TranslationMyAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationMyAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

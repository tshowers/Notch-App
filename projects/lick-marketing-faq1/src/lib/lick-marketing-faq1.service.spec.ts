import { TestBed } from '@angular/core/testing';

import { LickMarketingFaq1Service } from './lick-marketing-faq1.service';

describe('LickMarketingFaq1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LickMarketingFaq1Service = TestBed.get(LickMarketingFaq1Service);
    expect(service).toBeTruthy();
  });
});

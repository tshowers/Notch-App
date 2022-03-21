import { TestBed } from '@angular/core/testing';

import { LickMarketingHowTo1Service } from './lick-marketing-how-to1.service';

describe('LickMarketingHowTo1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LickMarketingHowTo1Service = TestBed.get(LickMarketingHowTo1Service);
    expect(service).toBeTruthy();
  });
});

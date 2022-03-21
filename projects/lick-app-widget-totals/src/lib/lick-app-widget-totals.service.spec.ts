import { TestBed } from '@angular/core/testing';

import { LickAppWidgetTotalsService } from './lick-app-widget-totals.service';

describe('LickAppWidgetTotalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LickAppWidgetTotalsService = TestBed.get(LickAppWidgetTotalsService);
    expect(service).toBeTruthy();
  });
});

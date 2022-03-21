import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LickMarketingFaq3Component } from './lick-marketing-faq3.component';

describe('LickMarketingFaq3Component', () => {
  let component: LickMarketingFaq3Component;
  let fixture: ComponentFixture<LickMarketingFaq3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LickMarketingFaq3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LickMarketingFaq3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

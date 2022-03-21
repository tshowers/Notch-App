import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LickMarketingFaq1Component } from './lick-marketing-faq1.component';

describe('LickMarketingFaq1Component', () => {
  let component: LickMarketingFaq1Component;
  let fixture: ComponentFixture<LickMarketingFaq1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LickMarketingFaq1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LickMarketingFaq1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

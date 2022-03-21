import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LickMarketingFaq2Component } from './lick-marketing-faq2.component';

describe('LickMarketingFaq2Component', () => {
  let component: LickMarketingFaq2Component;
  let fixture: ComponentFixture<LickMarketingFaq2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LickMarketingFaq2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LickMarketingFaq2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

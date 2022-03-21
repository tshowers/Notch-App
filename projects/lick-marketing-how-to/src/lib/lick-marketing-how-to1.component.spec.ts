import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LickMarketingHowTo1Component } from './lick-marketing-how-to1.component';

describe('LickMarketingHowTo1Component', () => {
  let component: LickMarketingHowTo1Component;
  let fixture: ComponentFixture<LickMarketingHowTo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LickMarketingHowTo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LickMarketingHowTo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

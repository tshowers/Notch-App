import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LickAppWidgetTotalsComponent } from './lick-app-widget-totals.component';

describe('LickAppWidgetTotalsComponent', () => {
  let component: LickAppWidgetTotalsComponent;
  let fixture: ComponentFixture<LickAppWidgetTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LickAppWidgetTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LickAppWidgetTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

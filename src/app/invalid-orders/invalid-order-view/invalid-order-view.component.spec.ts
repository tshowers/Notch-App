import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidOrderViewComponent } from './invalid-order-view.component';

describe('InvalidOrderViewComponent', () => {
  let component: InvalidOrderViewComponent;
  let fixture: ComponentFixture<InvalidOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidOrderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

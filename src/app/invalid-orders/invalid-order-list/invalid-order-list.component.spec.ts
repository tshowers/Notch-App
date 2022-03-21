import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidOrderListComponent } from './invalid-order-list.component';

describe('InvalidOrderListComponent', () => {
  let component: InvalidOrderListComponent;
  let fixture: ComponentFixture<InvalidOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

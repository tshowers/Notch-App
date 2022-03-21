import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidOrdersComponent } from './invalid-orders.component';

describe('InvalidOrdersComponent', () => {
  let component: InvalidOrdersComponent;
  let fixture: ComponentFixture<InvalidOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

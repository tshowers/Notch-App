import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerScrollComponent } from './customer-scroll.component';

describe('CustomerScrollComponent', () => {
  let component: CustomerScrollComponent;
  let fixture: ComponentFixture<CustomerScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

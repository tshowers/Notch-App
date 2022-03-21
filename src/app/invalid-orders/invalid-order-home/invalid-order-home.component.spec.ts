import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidOrderHomeComponent } from './invalid-order-home.component';

describe('InvalidOrderHomeComponent', () => {
  let component: InvalidOrderHomeComponent;
  let fixture: ComponentFixture<InvalidOrderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidOrderHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidOrderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

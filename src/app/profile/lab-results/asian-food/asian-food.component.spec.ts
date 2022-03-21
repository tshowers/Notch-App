import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsianFoodComponent } from './asian-food.component';

describe('AsianFoodComponent', () => {
  let component: AsianFoodComponent;
  let fixture: ComponentFixture<AsianFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsianFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsianFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

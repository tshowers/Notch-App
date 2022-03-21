import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VegetarianFoodComponent } from './vegetarian-food.component';

describe('VegetarianFoodComponent', () => {
  let component: VegetarianFoodComponent;
  let fixture: ComponentFixture<VegetarianFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegetarianFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VegetarianFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

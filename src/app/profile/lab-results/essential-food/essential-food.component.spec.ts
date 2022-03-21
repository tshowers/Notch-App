import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialFoodComponent } from './essential-food.component';

describe('EssentialFoodComponent', () => {
  let component: EssentialFoodComponent;
  let fixture: ComponentFixture<EssentialFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssentialFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EssentialFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

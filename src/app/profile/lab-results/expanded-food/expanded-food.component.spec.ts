import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedFoodComponent } from './expanded-food.component';

describe('ExpandedFoodComponent', () => {
  let component: ExpandedFoodComponent;
  let fixture: ComponentFixture<ExpandedFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandedFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

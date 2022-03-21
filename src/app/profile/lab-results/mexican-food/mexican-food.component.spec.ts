import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MexicanFoodComponent } from './mexican-food.component';

describe('MexicanFoodComponent', () => {
  let component: MexicanFoodComponent;
  let fixture: ComponentFixture<MexicanFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MexicanFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MexicanFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

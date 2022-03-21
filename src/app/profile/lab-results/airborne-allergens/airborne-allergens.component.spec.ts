import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirborneAllergensComponent } from './airborne-allergens.component';

describe('AirborneAllergensComponent', () => {
  let component: AirborneAllergensComponent;
  let fixture: ComponentFixture<AirborneAllergensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirborneAllergensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirborneAllergensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

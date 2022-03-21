import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteFoodComponent } from './complete-food.component';

describe('CompleteFoodComponent', () => {
  let component: CompleteFoodComponent;
  let fixture: ComponentFixture<CompleteFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

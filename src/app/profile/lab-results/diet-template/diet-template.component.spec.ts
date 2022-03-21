import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietTemplateComponent } from './diet-template.component';

describe('DietTemplateComponent', () => {
  let component: DietTemplateComponent;
  let fixture: ComponentFixture<DietTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

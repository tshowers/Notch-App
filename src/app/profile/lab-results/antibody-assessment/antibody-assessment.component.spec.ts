import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntibodyAssessmentComponent } from './antibody-assessment.component';

describe('AntibodyAssessmentComponent', () => {
  let component: AntibodyAssessmentComponent;
  let fixture: ComponentFixture<AntibodyAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntibodyAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntibodyAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

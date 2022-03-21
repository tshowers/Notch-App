import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitDataCorrectionComponent } from './test-kit-data-correction.component';

describe('TestKitDataCorrectionComponent', () => {
  let component: TestKitDataCorrectionComponent;
  let fixture: ComponentFixture<TestKitDataCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitDataCorrectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitDataCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

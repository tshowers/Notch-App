import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabOrderUploadComponent } from './lab-order-upload.component';

describe('LabOrderUploadComponent', () => {
  let component: LabOrderUploadComponent;
  let fixture: ComponentFixture<LabOrderUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabOrderUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabOrderUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

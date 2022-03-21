import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabOrderViewEditComponent } from './lab-order-view-edit.component';

describe('LabOrderViewEditComponent', () => {
  let component: LabOrderViewEditComponent;
  let fixture: ComponentFixture<LabOrderViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabOrderViewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabOrderViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

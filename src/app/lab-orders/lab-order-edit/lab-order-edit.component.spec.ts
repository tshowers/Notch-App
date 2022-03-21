import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabOrderEditComponent } from './lab-order-edit.component';

describe('LabOrderEditComponent', () => {
  let component: LabOrderEditComponent;
  let fixture: ComponentFixture<LabOrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabOrderEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

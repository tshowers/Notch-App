import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabOrderHomeComponent } from './lab-order-home.component';

describe('LabOrderHomeComponent', () => {
  let component: LabOrderHomeComponent;
  let fixture: ComponentFixture<LabOrderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabOrderHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabOrderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

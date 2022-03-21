import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabStatusComponent } from './lab-status.component';

describe('LabStatusComponent', () => {
  let component: LabStatusComponent;
  let fixture: ComponentFixture<LabStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

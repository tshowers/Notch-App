import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFoundComponent } from './error-found.component';

describe('ErrorFoundComponent', () => {
  let component: ErrorFoundComponent;
  let fixture: ComponentFixture<ErrorFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

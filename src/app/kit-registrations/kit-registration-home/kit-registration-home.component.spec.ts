import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitRegistrationHomeComponent } from './kit-registration-home.component';

describe('KitRegistrationHomeComponent', () => {
  let component: KitRegistrationHomeComponent;
  let fixture: ComponentFixture<KitRegistrationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitRegistrationHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitRegistrationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

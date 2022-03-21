import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitRegistrationViewComponent } from './kit-registration-view.component';

describe('KitRegistrationViewComponent', () => {
  let component: KitRegistrationViewComponent;
  let fixture: ComponentFixture<KitRegistrationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitRegistrationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitRegistrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

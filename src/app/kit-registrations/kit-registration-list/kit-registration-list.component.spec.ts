import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitRegistrationListComponent } from './kit-registration-list.component';

describe('KitRegistrationListComponent', () => {
  let component: KitRegistrationListComponent;
  let fixture: ComponentFixture<KitRegistrationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitRegistrationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitRegistrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

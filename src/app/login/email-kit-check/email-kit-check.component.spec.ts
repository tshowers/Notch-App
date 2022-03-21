import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailKitCheckComponent } from './email-kit-check.component';

describe('EmailKitCheckComponent', () => {
  let component: EmailKitCheckComponent;
  let fixture: ComponentFixture<EmailKitCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailKitCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailKitCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

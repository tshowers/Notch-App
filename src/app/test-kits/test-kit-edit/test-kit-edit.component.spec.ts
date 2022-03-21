import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitEditComponent } from './test-kit-edit.component';

describe('TestKitEditComponent', () => {
  let component: TestKitEditComponent;
  let fixture: ComponentFixture<TestKitEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

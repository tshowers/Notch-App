import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitHomeComponent } from './test-kit-home.component';

describe('TestKitHomeComponent', () => {
  let component: TestKitHomeComponent;
  let fixture: ComponentFixture<TestKitHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

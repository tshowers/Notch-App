import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitViewComponent } from './test-kit-view.component';

describe('TestKitViewComponent', () => {
  let component: TestKitViewComponent;
  let fixture: ComponentFixture<TestKitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitListComponent } from './test-kit-list.component';

describe('TestKitListComponent', () => {
  let component: TestKitListComponent;
  let fixture: ComponentFixture<TestKitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

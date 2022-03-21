import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitsComponent } from './test-kits.component';

describe('TestKitsComponent', () => {
  let component: TestKitsComponent;
  let fixture: ComponentFixture<TestKitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

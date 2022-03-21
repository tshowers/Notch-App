import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JapaneseFoodComponent } from './japanese-food.component';

describe('JapaneseFoodComponent', () => {
  let component: JapaneseFoodComponent;
  let fixture: ComponentFixture<JapaneseFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JapaneseFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JapaneseFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

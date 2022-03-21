import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitaminDComponent } from './vitamin-d.component';

describe('VitaminDComponent', () => {
  let component: VitaminDComponent;
  let fixture: ComponentFixture<VitaminDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitaminDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitaminDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

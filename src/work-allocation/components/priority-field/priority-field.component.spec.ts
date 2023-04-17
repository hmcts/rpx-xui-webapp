import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityFieldComponent } from './priority-field.component';

describe('PriorityFieldComponent', () => {
  let component: PriorityFieldComponent;
  let fixture: ComponentFixture<PriorityFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

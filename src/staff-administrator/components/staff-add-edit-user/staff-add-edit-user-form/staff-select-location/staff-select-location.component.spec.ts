import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSelectLocationComponent } from './staff-select-location.component';

describe('StaffSelectLocationComponent', () => {
  let component: StaffSelectLocationComponent;
  let fixture: ComponentFixture<StaffSelectLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSelectLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSelectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

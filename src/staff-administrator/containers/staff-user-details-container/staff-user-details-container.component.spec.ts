import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffUserDetailsContainerComponent } from './staff-user-details-container.component';

describe('StaffUserDetailsContainerComponent', () => {
  let component: StaffUserDetailsContainerComponent;
  let fixture: ComponentFixture<StaffUserDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffUserDetailsContainerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUserDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

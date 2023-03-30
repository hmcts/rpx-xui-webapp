import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAddUserContainerComponent } from './staff-add-user-container.component';

describe('StaffAddUserContainerComponent', () => {
  let component: StaffAddUserContainerComponent;
  let fixture: ComponentFixture<StaffAddUserContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffAddUserContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAddUserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEditUserContainerComponent } from './staff-edit-user-container.component';

describe('StaffEditUserContainerComponent', () => {
  let component: StaffEditUserContainerComponent;
  let fixture: ComponentFixture<StaffEditUserContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffEditUserContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffEditUserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

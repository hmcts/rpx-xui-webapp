import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRefDataUsersListComponent } from './staff-ref-data-users-list.component';

describe('StaffRefDataUsersListComponent', () => {
  let component: StaffRefDataUsersListComponent;
  let fixture: ComponentFixture<StaffRefDataUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRefDataUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRefDataUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

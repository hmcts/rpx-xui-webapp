import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRefDataUsersComponent } from './staff-ref-data-users.component';

describe('StaffRefDataUsersComponent', () => {
  let component: StaffRefDataUsersComponent;
  let fixture: ComponentFixture<StaffRefDataUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRefDataUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRefDataUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

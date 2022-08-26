import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRefDataUsersFiltersComponent } from './staff-ref-data-users-filters.component';

describe('StaffRefDataUsersFiltersComponent', () => {
  let component: StaffRefDataUsersFiltersComponent;
  let fixture: ComponentFixture<StaffRefDataUsersFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRefDataUsersFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRefDataUsersFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

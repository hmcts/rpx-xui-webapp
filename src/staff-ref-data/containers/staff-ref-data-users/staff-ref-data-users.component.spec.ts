import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import {
  StaffRefDataUsersFiltersComponent
} from './staff-ref-data-users-filters/staff-ref-data-users-filters.component';
import { StaffRefDataUsersListComponent } from './staff-ref-data-users-list/staff-ref-data-users-list.component';
import { StaffRefDataUsersComponent } from './staff-ref-data-users.component';

describe('StaffRefDataUsersComponent', () => {
  let component: StaffRefDataUsersComponent;
  let fixture: ComponentFixture<StaffRefDataUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StaffRefDataUsersComponent,
        StaffRefDataUsersFiltersComponent,
        StaffRefDataUsersListComponent,
      ],
      imports: [
        ExuiCommonLibModule
      ]
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

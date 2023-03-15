import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { StaffAddEditUserFormId } from '../../components/staff-add-edit-user-form-id.enum';
import { StaffStatusComponent } from '../../components/staff-status/staff-status.component';
import { StaffSuspendedBannerComponent } from '../../components/staff-suspended-banner/staff-suspended-banner.component';
import { StaffUser } from '../../models/staff-user.model';
import { PluckAndJoinPipe } from '../../pipes/pluckAndJoin.pipe';
import { StaffDataAccessService } from '../../services/staff-data-access/staff-data-access.service';
import { StaffUserDetailsComponent } from './staff-user-details.component';

@Component({
  template: ''
})
class StubComponent {}

describe('StaffUserDetailsComponent', () => {
  let component: StaffUserDetailsComponent;
  let fixture: ComponentFixture<StaffUserDetailsComponent>;
  let route: ActivatedRoute;
  let mockStaffDataAccessService: jasmine.SpyObj<StaffDataAccessService>;
  let location: Location;
  let router: jasmine.SpyObj<Router>;
  let testStaffUser: StaffUser;
  const caseWorkerId = '123456';

  beforeEach(waitForAsync(() => {
    mockStaffDataAccessService = jasmine.createSpyObj<StaffDataAccessService>(
      'mockStaffDataAccessService', ['updateUser']
    );
    const testStaffUserData = {
      email_id: 'email@test.hmcts',
      first_name: 'Kevin',
      last_name: 'Silver',
      suspended: 'false',
      user_type: 'userType',
      task_supervisor: 'Y',
      case_allocator: 'Y',
      staff_admin: 'N',
      userCategory: 'userCategory',
      role: [
        {
          role_id: 1,
          role: 'Role',
          is_primary: true,
        }
      ],
      skills: [
        {
          skill_id: 1,
          description: 'SKILLDESCRIPTION',
          skill_code: 'SKILLCODE',
        }
      ],
      work_area: [
        {
          area_of_work: 'service',
          service_code: 'SERVICE_CODE'
        }
      ],
      base_location: [
        {
          location_id: 333,
          location: 'Location',
          is_primary: true
        }
      ],
      region: 'West Midlands',
      region_id: 12,
    };
    testStaffUser = StaffUser.from(testStaffUserData);

    TestBed.configureTestingModule({
      declarations: [
        StaffUserDetailsComponent,
        StaffStatusComponent,
        StaffSuspendedBannerComponent,
        StubComponent,
        PluckAndJoinPipe
      ],
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'service-down', component: StubComponent },
          { path: 'staff/user-details/:id/update', component: StubComponent },
          { path: 'staff/user-details/:id/copy', component: StubComponent },
          { path: 'staff/add-user', component: StubComponent }
        ])
      ],
      providers: [
        { provide: StaffDataAccessService, useValue: mockStaffDataAccessService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: caseWorkerId
              },
              data: {
                staffUserDetails: {
                  userDetails: testStaffUser
                },
              }
            },
          },
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);

    fixture = TestBed.createComponent(StaffUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to service-down if error is 500', fakeAsync(() => {
    mockStaffDataAccessService.updateUser.and.returnValue(throwError({ status: 500 }));
    component.updateUserStatus();
    tick();
    expect(location.path()).toBe('/service-down');
  }));

  it('should navigate to service-down if error is 401', fakeAsync(() => {
    mockStaffDataAccessService.updateUser.and.returnValue(throwError({ status: 401 }));
    component.updateUserStatus();
    tick();
    expect(location.path()).toBe('/service-down');
  }));

  it('should set suspendedStatus to "error" to show the error banner and it shouldn\'t modify suspended status' + ' ' +
    'when calling updateUserStatus', () => {
    mockStaffDataAccessService.updateUser.and.returnValue(throwError({ status: 403 }));
    const userSuspendedStatusBefore = component.userDetails.suspended;
    component.updateUserStatus();
    fixture.detectChanges();

    expect(mockStaffDataAccessService.updateUser).toHaveBeenCalled();
    expect(component.userDetails.suspended).toBe(userSuspendedStatusBefore);
    expect(component.suspendedStatus).toBe('error');
  });

  it('should set suspendedStatus to "suspended" to show the banner when calling updateUserStatus with isSuspended true', () => {
    mockStaffDataAccessService.updateUser.and.returnValue(of({case_worker_id: '123'}));
    component.updateUserStatus();
    fixture.detectChanges();

    expect(mockStaffDataAccessService.updateUser).toHaveBeenCalled();
    expect(component.suspendedStatus).toBe('suspended');
  });

  it('should set suspendedStatus to "restored" to show the banner when calling updateUserStatus with isSuspended true', () => {
    mockStaffDataAccessService.updateUser.and.returnValue(of({case_worker_id: '123'}));
    testStaffUser.suspended = 'true';
    component.updateUserStatus();
    fixture.detectChanges();

    expect(mockStaffDataAccessService.updateUser).toHaveBeenCalled();
    expect(component.suspendedStatus).toBe('restored');
  });

  it('should userDetails property if it exists in routers extra state', () => {
    expect(component.userDetails).toEqual(testStaffUser);
  });

  it('should set filterSettings on sessionStorage on FILTER_ID as key and navigate' +
    'to DESTINATION on setDataForGenericFilterAndNavigate', fakeAsync(() => {
    const FILTER_ID = 'FILTER_ID';
    const DESTINATION = `/staff/user-details/${caseWorkerId}/update`;
    spyOn(router, 'navigateByUrl').and.callThrough();

    component.setDataForGenericFilterAndNavigate(FILTER_ID, DESTINATION);
    tick();
    expect(sessionStorage.getItem(FILTER_ID)).toBeTruthy();
    expect(router.navigateByUrl).toHaveBeenCalledWith(DESTINATION);
    expect(location.path()).toBe(DESTINATION);
  }));

  it('should call onUpdateUser which in turn should call setDataForGenericFilterAndNavigate', fakeAsync(() => {
    spyOn(component, 'onUpdateUser').and.callThrough();
    spyOn(component, 'setDataForGenericFilterAndNavigate').and.callThrough();
    const updateUserButton = fixture.debugElement.query(By.css('#updateUserButton'));
    updateUserButton.triggerEventHandler('click', null);
    expect(component.onUpdateUser).toHaveBeenCalled();
    expect(component.setDataForGenericFilterAndNavigate)
      .toHaveBeenCalledWith(StaffAddEditUserFormId.UpdateUser, `/staff/user-details/${caseWorkerId}/update`);
  }));

  it('should call onCopyUser which in turn should call setDataForGenericFilterAndNavigate', fakeAsync(() => {
    spyOn(component, 'onCopyUser').and.callThrough();
    spyOn(component, 'setDataForGenericFilterAndNavigate').and.callThrough();
    const copyUserButton = fixture.debugElement.query(By.css('#copyUserButton'));
    copyUserButton.triggerEventHandler('click', null);
    expect(component.onCopyUser).toHaveBeenCalled();
    expect(component.setDataForGenericFilterAndNavigate)
      .toHaveBeenCalledWith(StaffAddEditUserFormId.CopyUser, `/staff/user-details/${caseWorkerId}/copy`);
  }));
});

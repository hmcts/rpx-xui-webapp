import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { StaffUserStatus } from 'src/staff-administrator/models/staff-user-status.enum';
import { InfoMessage } from '../../../app/shared/enums/info-message';
import { InformationMessage } from '../../../app/shared/models';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { InfoMessageType } from '../../../role-access/models/enums';
import { StaffUser } from '../../models/staff-user.model';
import { StaffAddEditFormService } from '../../services/staff-add-edit-form/staff-add-edit-form.service';
import { StaffDataAccessService } from '../../services/staff-data-access/staff-data-access.service';
import { StaffStatusComponent } from './staff-status/staff-status.component';
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
  let mockMessageService: jasmine.SpyObj<InfoMessageCommService>;
  let mockStaffAddEditFormService: jasmine.SpyObj<StaffAddEditFormService>;
  let location: Location;
  let router: jasmine.SpyObj<Router>;
  let testStaffUserData: Partial<StaffUser>;
  const caseWorkerId = '123456';

  beforeEach(waitForAsync(() => {
    mockStaffDataAccessService = jasmine.createSpyObj<StaffDataAccessService>(
      'mockStaffDataAccessService', ['updateUser']
    );

    mockMessageService = jasmine.createSpyObj<InfoMessageCommService>(
      'mockMessageService', ['nextMessage']
    );

    mockStaffAddEditFormService = jasmine.createSpyObj<StaffAddEditFormService>(
      'staffAddEditFormService', ['patchFormValues']
    );

    testStaffUserData = {
      email_id: 'email@test.hmcts',
      first_name: 'Kevin',
      last_name: 'Silver',
      suspended: false,
      user_type: 'userType',
      task_supervisor: true,
      case_allocator: true,
      staff_admin: false,
      roles: [
        {
          role_id: '1',
          role: 'Role',
          is_primary: true,
        }
      ],
      skills: [
        {
          skill_id: 1,
          description: 'SKILLCODE',
        }
      ],
      services: [
        {
          service: 'service',
          service_code: 'SERVICE_CODE'
        }
      ],
      base_locations: [
        {
          location_id: '333',
          location: 'Location',
          is_primary: true
        }
      ],
      region: 'West Midlands',
      region_id: 12,
      up_idam_status: StaffUserStatus.ACTIVE
    };

    TestBed.configureTestingModule({
      declarations: [
        StaffUserDetailsComponent,
        StaffStatusComponent,
        StubComponent,
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
                staffUserDetails: testStaffUserData,
                services: [
                  {
                    key: 'ABC1',
                    label: 'Service A'
                  },
                  {
                    key: 'BCD2',
                    label: 'Service B'
                  },
                  {
                    key: 'CDE3',
                    label: 'Service C'
                  },
                  {
                    key: 'DEF4',
                    label: 'Service D'
                  }
                ],
                skills: [
                  {
                    group: 'ABC1',
                    options: [
                      {
                        key: '1',
                        label: 'Underwriter',
                      },
                      {
                        key: '2',
                        label: 'Caseworker',
                      }
                    ]
                  },
                  {
                    group: 'BCD2',
                    options: [
                      {
                        key: '3',
                        label: 'Caseworker',
                      },
                      {
                        key: '4',
                        label: 'Case manager',
                      }
                    ]
                  },
                  {
                    group: 'CDE3',
                    options: [
                      {
                        key: '5',
                        label: 'Underwriter',
                      }
                    ]
                  }
                ],
              }
            },
          },
        },
        { provide: StaffAddEditFormService, useValue: mockStaffAddEditFormService },
        { provide : InfoMessageCommService, useValue: mockMessageService },
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
    expect(component.status).toBe('warning');
  });

  it('should set suspendedStatus to "suspended" to show the banner when calling updateUserStatus with isSuspended true', () => {
    expect(component.userDetails.suspended).toBe(false);
    mockStaffDataAccessService.updateUser.and.returnValue(of({case_worker_id: '123'}));
    component.updateUserStatus();

    expect(mockStaffDataAccessService.updateUser).toHaveBeenCalled();
    expect(component.userDetails.suspended).toBe(true);
    expect(component.status).toBe('success');
  });

  it('should set userDetails property from resolver', () => {
    const testStaffUserObject = StaffUser.from(testStaffUserData);
    expect(component.userDetails).toEqual(testStaffUserObject);
  });

  it('should call onUpdateUser when clicking update button', fakeAsync(() => {
    spyOn(component, 'onUpdateUser').and.callThrough();
    const updateUserButton = fixture.debugElement.query(By.css('#updateUserButton'));
    updateUserButton.triggerEventHandler('click', null);
    expect(component.onUpdateUser).toHaveBeenCalled();
  }));

  it('should call onCopyUser when clicking copy button', fakeAsync(() => {
    spyOn(component, 'onCopyUser').and.callThrough();
    const copyUserButton = fixture.debugElement.query(By.css('#copyUserButton'));
    copyUserButton.triggerEventHandler('click', null);
    expect(component.onCopyUser).toHaveBeenCalled();
  }));

  it('should have a disabled button if suspended is true', () => {
    const restoreOrSuspendedButton = fixture.debugElement.query(By.css('#user-suspended-restore-button'));
    expect(component.userDetails.suspended).toBe(false);
    expect(restoreOrSuspendedButton.nativeElement.getAttribute('disabled')).toBeNull();
    component.userDetails.suspended = true;
    fixture.detectChanges();
    expect(restoreOrSuspendedButton.nativeElement.getAttribute('disabled')).toEqual('');
  });

  it('should not make a api call if user is suspended when calling updateUserStatus', () => {
    mockStaffDataAccessService.updateUser.and.returnValue(of({case_worker_id: '123'}));
    component.userDetails.suspended = true;
    component.updateUserStatus();
    expect(mockStaffDataAccessService.updateUser).not.toHaveBeenCalled();
  });

  describe('resendInvite', () => {
    it('Should show success message on sending activation email', () => {
      mockStaffDataAccessService.updateUser.and.returnValue(of({case_worker_id: '123'}));
      component.resendInvite();
      fixture.detectChanges();
      const staffUser = new StaffUser();
      Object.assign(staffUser, testStaffUserData);
      staffUser.is_resend_invite = true;
      expect(mockStaffDataAccessService.updateUser).toHaveBeenCalledWith(staffUser);
      expect(mockMessageService.nextMessage).toHaveBeenCalledWith({
        message: InfoMessage.ACTIVATION_EMAIL_SENT,
        type: InfoMessageType.SUCCESS
      } as InformationMessage);
    });

    it('should show error message on failure in sending activation emails', () => {
      mockStaffDataAccessService.updateUser.and.returnValue(throwError({ status: 500 }));
      component.resendInvite();
      fixture.detectChanges();
      const staffUser = new StaffUser();
      Object.assign(staffUser, testStaffUserData);
      staffUser.is_resend_invite = true;
      expect(mockStaffDataAccessService.updateUser).toHaveBeenCalledWith(staffUser);
      expect(mockMessageService.nextMessage).toHaveBeenCalledWith({
        message: InfoMessage.ACTIVATION_EMAIL_ERROR,
        type: InfoMessageType.WARNING
      } as InformationMessage);
    });
  });

  describe('getServiceNameFromSkillId', () => {
    it('should get service name from skill id', () => {
      const service = component.getServiceNameFromSkillId(3);
      expect(service).toBe('Service B');
    });
  });
});

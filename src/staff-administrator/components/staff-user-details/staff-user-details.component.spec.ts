import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HmctsBannerComponent } from '@hmcts/rpx-xui-common-lib';
import { of, throwError } from 'rxjs';
import { staffUserDetailsTestData } from 'src/staff-administrator/test-data/staff-user-details.test.data';
import { PluckAndJoinPipe } from '../../pipes/pluckAndJoin.pipe';
import { StaffDataAccessService } from '../../services/staff-data-access/staff-data-access.service';
import { staffSingleUserDetailsTestData } from '../../test-data/staff-single-user-details.test.data';
import { StaffStatusComponent } from '../staff-status/staff-status.component';
import { StaffSuspendedBannerComponent } from '../staff-suspended-banner/staff-suspended-banner.component';
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

  beforeEach(async(() => {
    mockStaffDataAccessService = jasmine.createSpyObj<StaffDataAccessService>('mockStaffDataAccessService', ['updateUserStatus']);

    TestBed.configureTestingModule({
      declarations: [
        StaffUserDetailsComponent,
        StaffStatusComponent,
        StaffSuspendedBannerComponent,
        HmctsBannerComponent,
        StubComponent,
        PluckAndJoinPipe
      ],
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'service-down', component: StubComponent },
          { path: 'staff/update-user', component: StubComponent }
        ])
      ],
      providers: [
        { provide: StaffDataAccessService, useValue: mockStaffDataAccessService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras: { state: { user: staffSingleUserDetailsTestData } } }
    );

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
    mockStaffDataAccessService.updateUserStatus.and.returnValue(throwError({ status: 500 }));
    component.updateUserStatus();
    tick();
    expect(location.path()).toBe('/service-down');
  }));

  it('should navigate to service-down if error is 401', fakeAsync(() => {
    mockStaffDataAccessService.updateUserStatus.and.returnValue(throwError({ status: 401 }));
    component.updateUserStatus();
    tick();
    expect(location.path()).toBe('/service-down');
  }));

  it('should set suspendedStatus to "error" to show the error banner and it shouldn\'t modify suspended status' + ' ' +
    'when calling updateUserStatus', () => {
    mockStaffDataAccessService.updateUserStatus.and.returnValue(throwError({ status: 403 }));
    const userSuspendedStatusBefore = component.userDetails.suspended;
    component.updateUserStatus();
    fixture.detectChanges();

    expect(mockStaffDataAccessService.updateUserStatus).toHaveBeenCalled();
    expect(component.userDetails.suspended).toBe(userSuspendedStatusBefore);
    expect(component.suspendedStatus).toBe('error');
  });

  it('should set suspendedStatus to "suspended" to show the banner when calling updateUserStatus with isSuspended true', () => {
    mockStaffDataAccessService.updateUserStatus.and.returnValue(of({suspended: true}));
    component.updateUserStatus();
    fixture.detectChanges();

    expect(mockStaffDataAccessService.updateUserStatus).toHaveBeenCalled();
    expect(component.suspendedStatus).toBe('suspended');
  });

  it('should set suspendedStatus to "restored" to show the banner when calling updateUserStatus with isSuspended false', () => {
    mockStaffDataAccessService.updateUserStatus.and.returnValue(of({suspended: false}));
    component.updateUserStatus();
    fixture.detectChanges();

    expect(mockStaffDataAccessService.updateUserStatus).toHaveBeenCalled();
    expect(component.suspendedStatus).toBe('restored');
  });

  it('should userDetails property if it exists in routers extra state', () => {
    expect(component.userDetails).toEqual(staffSingleUserDetailsTestData);
  });

  it('should set filterSettings on sessionStorage and navigate to /staff/update-user with userDetails as state on setDataAndNavigateToUpdateUser', fakeAsync(() => {
    spyOn(router, 'navigateByUrl').and.callThrough();
    component.setDataAndNavigateToUpdateUser();
    tick();
    expect(sessionStorage.getItem(component.FILTER_ID)).toBeTruthy();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/staff/update-user', { state: { userDetails: component.userDetails } });
    expect(location.path()).toBe('/staff/update-user');
  }));
});

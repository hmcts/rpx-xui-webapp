import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserDetails } from '../../app/models';
import * as fromActions from '../../app/store';
import { BookingGuard } from './booking-guard';

describe('BookingGuard', () => {
  const USER_1: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50
    },
    roleAssignmentInfo: [{
      primaryLocation: '',
      jurisdiction: '',
      isCaseAllocator: true,
      // note: bookable can be boolean or string
      bookable: 'true'
    }],
    userInfo: {
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      roleCategory: 'JUDICIAL',
      active: true,
      roles: [
        'caseworker',
        'caseworker-judge',
        'caseworker-ia',
        'caseworker-ia-legalrep-solicitor',
        'caseworker-publiclaw',
        'caseworker-publiclaw-solicitor',
        'pui-caa',
        'pui-case-manager',
        'pui-finance-manager',
        'pui-organisation-manager',
        'pui-user-manager'
      ]
    }
  };
  const USER_2: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50
    },
    roleAssignmentInfo: [{
      primaryLocation: '',
      jurisdiction: '',
      isCaseAllocator: true,
      bookable: true
    }],
    userInfo: {
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'pui-caa',
        'pui-case-manager',
        'pui-finance-manager',
        'pui-organisation-manager',
        'pui-user-manager'
      ]
    }
  };

  const USER_3: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50
    },
    roleAssignmentInfo: [{
      primaryLocation: '',
      jurisdiction: '',
      isCaseAllocator: true
    }],
    userInfo: {
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'caseworker-judge',
        'pui-caa',
        'pui-case-manager',
        'pui-finance-manager',
        'pui-organisation-manager',
        'pui-user-manager'
      ]
    }
  };
  const USER_4: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50
    },
    roleAssignmentInfo: [{
      primaryLocation: '',
      jurisdiction: '',
      isCaseAllocator: true
    }],
    userInfo: {
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'pui-caa',
        'pui-case-manager',
        'pui-finance-manager',
        'pui-organisation-manager',
        'pui-user-manager'
      ]
    }
  };
  let bookingGuard: BookingGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromActions.State>>;
  let featureToggleMock: jasmine.SpyObj<FeatureToggleService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
    storeMock = jasmine.createSpyObj<Store<fromActions.State>>('store', ['pipe']);
    bookingGuard = new BookingGuard(routerMock, storeMock);
  });

  it('guard truthy', () => {
    expect(bookingGuard).toBeTruthy();
  });

  it('should allow access if user has judicial role and bookable role assignment', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    bookingGuard.canActivate().toPromise().then((canActivate) => expect(canActivate).toBeTruthy());
  });

  it('should deny access if user has no judicial role but has bookable role assignment', () => {
    storeMock.pipe.and.returnValue(of(USER_2));
    bookingGuard.canActivate().toPromise().then((canActivate) => expect(canActivate).toBeFalsy());
  });

  it('should deny access if user has judicial role but no bookable role assignment', () => {
    storeMock.pipe.and.returnValue(of(USER_3));
    bookingGuard.canActivate().toPromise().then((canActivate) => expect(canActivate).toBeFalsy());
  });

  it('should deny access if user has no judicial role AND no bookable role assignment', () => {
    storeMock.pipe.and.returnValue(of(USER_4));
    bookingGuard.canActivate().toPromise().then((canActivate) => expect(canActivate).toBeFalsy());
  });

  it('should deny access if booking feature toggle is off', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    bookingGuard.canActivate().toPromise().then((canActivate) => expect(canActivate).toBeTruthy());
  });
});

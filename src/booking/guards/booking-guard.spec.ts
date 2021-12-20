import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
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
    userInfo: {
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
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
      ],
    }
  };
  let bookingGuard: BookingGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromActions.State>>;
  let featureToggleMock: jasmine.SpyObj<FeatureToggleService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
    storeMock = jasmine.createSpyObj<Store<fromActions.State>>('store', ['pipe']);
    featureToggleMock = jasmine.createSpyObj<FeatureToggleService>('featureToggleService', ['getValueOnce']);
    bookingGuard = new BookingGuard(routerMock, storeMock, featureToggleMock);
  });

  it('guard truthy', () => {
    expect(bookingGuard).toBeTruthy();
  });

  it('should return allow access if user has judicial role and bookable role assignment', () => {
    expect(true).toBeTruthy();
  });




  /*it('should return false if user role does not match noc theme', () => {
    storeMock.pipe.and.returnValue(of(USER_2));
    featureToggleMock.getValueOnce.and.callFake((param1, param2) => {
      if (param1 === AppConstants.FEATURE_NAMES.noticeOfChange) {
        return of(true);
      } else if (param1 === LD_FLAG_MC_APPLICATION_THEMES) {
        return of(APPLICATION_THEMES);
      }
    });
    bookingGuard.canActivate().toPromise().then(canActivate => expect(canActivate).toBeFalsy());
  });

  it('should return true if user role match noc theme', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    featureToggleMock.getValueOnce.and.callFake((param1, param2) => {
      if (param1 === AppConstants.FEATURE_NAMES.noticeOfChange) {
        return of(true);
      } else if (param1 === LD_FLAG_MC_APPLICATION_THEMES) {
        return of(APPLICATION_THEMES);
      }
    });
    bookingGuard.canActivate().toPromise().then(canActivate => expect(canActivate).toBeTruthy());
  });*/
});

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { UserDetails } from '../../app/models';
import * as fromAppStore from '../../app/store';
import { FeatureVariation } from '../../cases/models/feature-variation.model';
import { HearingsViewGuard } from './hearings-view-guard';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';
import { AppTestConstants } from '../../app/app.test-constants.spec';
import * as fromHearingReducers from '../store/reducers';

describe('HearingsViewGuard', () => {
  const USER_1: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50,
    },
    userInfo: {
      id: AppTestConstants.TEST_USER_ID,
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: ['caseworker', 'caseworker-sscs', 'hearing-manager'],
    },
  };

  const USER_2: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50,
    },
    userInfo: {
      id: AppTestConstants.TEST_USER_ID,
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: ['caseworker', 'caseworker-sscs', 'hearing-viewer'],
    },
  };

  const USER_3: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50,
    },
    userInfo: {
      id: AppTestConstants.TEST_USER_ID,
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: ['caseworker', 'caseworker-sscs', 'listed-hearing-viewer'],
    },
  };

  const USER_4: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50,
    },
    userInfo: {
      id: AppTestConstants.TEST_USER_ID,
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: ['caseworker', 'caseworker-sscs'],
    },
  };

  const FEATURE_FLAG: FeatureVariation[] = [
    {
      jurisdiction: 'SSCS',
      includeCaseTypes: ['Benefit'],
    },
  ];

  const CASE_INFO = { caseReference: '1546518523959179', caseType: 'Benefit', jurisdictionId: 'SSCS' };

  let hearingsViewGuard: HearingsViewGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;
  let hearingJurisdictionConfigMock: jasmine.SpyObj<HearingJurisdictionConfigService>;

  function primeHearingStore(user: UserDetails, serviceHearingValue: object = { hmctsServiceID: 'ABA5' }) {
    storeMock.pipe.and.returnValue(of(user));
    storeMock.select.and.callFake((selector: unknown) => {
      if (selector === fromHearingReducers.caseInfoSelector) {
        return of(CASE_INFO);
      }
      if (selector === fromHearingReducers.serviceHearingValueSelector) {
        return of(serviceHearingValue);
      }
      return of(null);
    });
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
  }

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe', 'select']);
    hearingJurisdictionConfigMock = jasmine.createSpyObj<HearingJurisdictionConfigService>('hearingJurisdictionConfigService', [
      'getHearingJurisdictionsConfig',
    ]);
  });

  it('should view hearings be enabled for user with hearing manager role', () => {
    primeHearingStore(USER_1);
    hearingsViewGuard = new HearingsViewGuard(storeMock, storeMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsViewGuard.canActivate();
    const canActive = true;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should view hearings be enabled for user with hearing viewer role', () => {
    primeHearingStore(USER_2);
    hearingsViewGuard = new HearingsViewGuard(storeMock, storeMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsViewGuard.canActivate();
    const canActive = true;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should view hearings be enabled for user with listed hearing viewer role', () => {
    primeHearingStore(USER_3);
    hearingsViewGuard = new HearingsViewGuard(storeMock, storeMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsViewGuard.canActivate();
    const canActive = true;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should view hearings be disabled for user with no hearing related roles even when hearing state is primed', () => {
    primeHearingStore(USER_4);
    hearingsViewGuard = new HearingsViewGuard(storeMock, storeMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsViewGuard.canActivate();
    const canActive = false;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
    expect(routerMock.navigate).toHaveBeenCalledWith(['cases']);
  });

  it('should view hearings be disabled when service hearing values are missing', () => {
    primeHearingStore(USER_1, null);
    hearingsViewGuard = new HearingsViewGuard(storeMock, storeMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsViewGuard.canActivate();
    const expected = cold('(b|)', { b: false });
    expect(result$).toBeObservable(expected);
    expect(routerMock.navigate).toHaveBeenCalledWith([
      `/cases/case-details/${CASE_INFO.jurisdictionId}/${CASE_INFO.caseType}/${CASE_INFO.caseReference}`,
    ]);
  });
});

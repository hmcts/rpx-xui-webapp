import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { UserDetails } from '../../app/models';
import { SessionStorageService } from '../../app/services';
import * as fromAppStore from '../../app/store';
import { FeatureVariation } from '../../cases/models/feature-variation.model';
import { HearingsViewGuard } from './hearings-view-guard';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';

describe('HearingsViewGuard', () => {
  const USER_1: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50
    },
    userInfo: {
      id: '***REMOVED***',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'caseworker-sscs',
        'hearing-manager'
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
      id: '***REMOVED***',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'caseworker-sscs',
        'hearing-viewer'
      ]
    }
  };

  const USER_3: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50
    },
    userInfo: {
      id: '***REMOVED***',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'caseworker-sscs',
        'listed-hearing-viewer'
      ]
    }
  };

  const USER_4: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50
    },
    userInfo: {
      id: '***REMOVED***',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'caseworker-sscs'
      ]
    }
  };

  const FEATURE_FLAG: FeatureVariation[] = [
    {
      jurisdiction: 'SSCS',
      includeCaseTypes: [
        'Benefit'
      ]
    }
  ];

  const CASE_INFO = { cid: '1546518523959179', caseType: 'Benefit', jurisdiction: 'SSCS' };

  let hearingsViewGuard: HearingsViewGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;
  let sessionStorageMock: jasmine.SpyObj<SessionStorageService>;
  let hearingJurisdictionConfigMock: jasmine.SpyObj<HearingJurisdictionConfigService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe']);
    sessionStorageMock = jasmine.createSpyObj<SessionStorageService>('sessionStorageService', ['getItem']);
    hearingJurisdictionConfigMock = jasmine.createSpyObj<HearingJurisdictionConfigService>('hearingJurisdictionConfigService', ['getHearingJurisdictionsConfig']);
  });

  it('should view hearings be enabled for user with hearing manager role', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify(CASE_INFO));
    hearingsViewGuard = new HearingsViewGuard(storeMock, sessionStorageMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsViewGuard.canActivate();
    const canActive = true;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should view hearings be enabled for user with hearing viewer role', () => {
    storeMock.pipe.and.returnValue(of(USER_2));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify(CASE_INFO));
    hearingsViewGuard = new HearingsViewGuard(storeMock, sessionStorageMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsViewGuard.canActivate();
    const canActive = true;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should view hearings be enabled for user with listed hearing viewer role', () => {
    storeMock.pipe.and.returnValue(of(USER_3));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify(CASE_INFO));
    hearingsViewGuard = new HearingsViewGuard(storeMock, sessionStorageMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsViewGuard.canActivate();
    const canActive = true;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should view hearings be disabled for user with no hearing related roles', () => {
    storeMock.pipe.and.returnValue(of(USER_4));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify(CASE_INFO));
    hearingsViewGuard = new HearingsViewGuard(storeMock, sessionStorageMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsViewGuard.canActivate();
    const canActive = false;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });
});

import {FeatureToggleService} from '@hmcts/rpx-xui-common-lib';
import {Store} from '@ngrx/store';
import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {UserDetails} from '../../app/models';
import {SessionStorageService} from '../../app/services';
import * as fromAppStore from '../../app/store';
import {HearingsGuard} from './hearings-guard';

describe('HearingsGuard', () => {
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
        'caseworker-sscs',
      ],
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
        'caseworker-iac-judge',
      ],
    }
  };

  const FEATURE_FLAG = [
    {
      jurisdiction: 'SSCS',
      roles: [
        'caseworker-sscs',
        'caseworker-sscs-judge'
      ]
    }
  ];

  const CASE_INFO = {cid: '1546518523959179', caseType: 'Benefit', jurisdiction: 'SSCS'};

  let hearingsGuard: HearingsGuard;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;
  let sessionStorageMock: jasmine.SpyObj<SessionStorageService>;
  let featureToggleMock: jasmine.SpyObj<FeatureToggleService>;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe']);
    sessionStorageMock = jasmine.createSpyObj<SessionStorageService>('sessionStorageService', ['getItem']);
    featureToggleMock = jasmine.createSpyObj<FeatureToggleService>('featureToggleService', ['getValueOnce']);
  });

  it('guard truthy', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    hearingsGuard = new HearingsGuard(storeMock, sessionStorageMock, featureToggleMock);
    expect(hearingsGuard).toBeTruthy();
  });

  it('should return false if feature is toggled off', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    featureToggleMock.getValueOnce.and.returnValue(of([]));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify(CASE_INFO));
    hearingsGuard = new HearingsGuard(storeMock, sessionStorageMock, featureToggleMock);
    const result$ = hearingsGuard.hasMatchedJurisdictionAndRole();
    const canActive = false;
    const expected = cold('(b|)', {b: canActive});
    expect(result$).toBeObservable(expected);
  });

  it('should return false if case info is null', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    featureToggleMock.getValueOnce.and.returnValue(of(FEATURE_FLAG));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify([]));
    hearingsGuard = new HearingsGuard(storeMock, sessionStorageMock, featureToggleMock);
    const result$ = hearingsGuard.hasMatchedJurisdictionAndRole();
    const canActive = false;
    const expected = cold('(b|)', {b: canActive});
    expect(result$).toBeObservable(expected);
  });

  it('should return false if case jurisdiction do not match', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    featureToggleMock.getValueOnce.and.returnValue(of(FEATURE_FLAG));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify({cid: '1546518523959179', caseType: 'Benefit', jurisdiction: 'IA'}));
    hearingsGuard = new HearingsGuard(storeMock, sessionStorageMock, featureToggleMock);
    const result$ = hearingsGuard.hasMatchedJurisdictionAndRole();
    const canActive = false;
    const expected = cold('(b|)', {b: canActive});
    expect(result$).toBeObservable(expected);
  });

  it('should return false if user role do not match', () => {
    storeMock.pipe.and.returnValue(of(USER_2));
    featureToggleMock.getValueOnce.and.returnValue(of(FEATURE_FLAG));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify(CASE_INFO));
    hearingsGuard = new HearingsGuard(storeMock, sessionStorageMock, featureToggleMock);
    const result$ = hearingsGuard.hasMatchedJurisdictionAndRole();
    const canActive = false;
    const expected = cold('(b|)', {b: canActive});
    expect(result$).toBeObservable(expected);
  });

  it('should return true if feature is toggled on and user role match jurisdiction', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    featureToggleMock.getValueOnce.and.returnValue(of(FEATURE_FLAG));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify(CASE_INFO));
    hearingsGuard = new HearingsGuard(storeMock, sessionStorageMock, featureToggleMock);
    const result$ = hearingsGuard.hasMatchedJurisdictionAndRole();
    const canActive = true;
    const expected = cold('(b|)', {b: canActive});
    expect(result$).toBeObservable(expected);
  });

  afterEach(() => {
    storeMock = null;
    sessionStorageMock = null;
    featureToggleMock = null;
  });
});

import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { BehaviorSubject, of } from 'rxjs';
import { UserDetails } from '../../app/models';
import { SessionStorageService } from '../../app/services';
import * as fromAppStore from '../../app/store';
import { FeatureVariation } from '../../cases/models/feature-variation.model';
import { HearingsEditGuard } from './hearings-edit-guard';
import { CaseNotifier, CaseView } from '@hmcts/ccd-case-ui-toolkit';

describe('HearingsEditGuard', () => {
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
        'caseworker-sscs'
      ]
    }
  };

  const CASE_VIEW: CaseView = {
    case_id: '1546518523959179',
    case_type: {
      id: 'Benefit',
      name: 'Benefit',
      jurisdiction: {
        id: 'SSCS',
        name: 'SSCS'
      }
    },
    channels: [],
    state: {
      id: 'CaseCreated',
      name: 'Case created'
    },
    tabs: [],
    triggers: [],
    events: []
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

  let hearingsEditGuard: HearingsEditGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;
  let caseNotifierMock: CaseNotifier;
  let featureToggleMock: jasmine.SpyObj<FeatureToggleService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe']);
    const casesService = jasmine.createSpyObj('casesService', ['caseView', 'getEventTrigger', 'createEvent', 'getCaseViewV2', 'cachedCaseView']);
    const caseNotifierMock = new CaseNotifier(casesService);
    caseNotifierMock.caseView = new BehaviorSubject(CASE_VIEW).asObservable();

    featureToggleMock = jasmine.createSpyObj<FeatureToggleService>('featureToggleService', ['getValueOnce']);
  });

  it('should edit hearings be enabled for user with hearing manager role', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    featureToggleMock.getValueOnce.and.returnValue(of(FEATURE_FLAG));
    hearingsEditGuard = new HearingsEditGuard(storeMock, caseNotifierMock, featureToggleMock, routerMock);
    const result$ = hearingsEditGuard.canActivate();
    const canActive = true;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should edit hearings be disabled for user without hearing manager role', () => {
    storeMock.pipe.and.returnValue(of(USER_2));
    featureToggleMock.getValueOnce.and.returnValue(of(FEATURE_FLAG));
    hearingsEditGuard = new HearingsEditGuard(storeMock, caseNotifierMock, featureToggleMock, routerMock);
    const result$ = hearingsEditGuard.canActivate();
    const canActive = false;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });
});

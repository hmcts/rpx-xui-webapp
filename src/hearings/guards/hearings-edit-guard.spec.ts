import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { cold } from 'jasmine-marbles';
import { BehaviorSubject, of } from 'rxjs';
import { UserDetails } from '../../app/models';
import * as fromAppStore from '../../app/store';
import { FeatureVariation } from '../../cases/models/feature-variation.model';
import { HearingsEditGuard } from './hearings-edit-guard';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';

describe('HearingsEditGuard', () => {
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
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
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

  const CASE_INFO = { caseReference: '1546518523959179', caseType: 'Benefit', jurisdictionId: 'SSCS' };

  let hearingsEditGuard: HearingsEditGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;
  let hearingJurisdictionConfigMock: jasmine.SpyObj<HearingJurisdictionConfigService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe', 'select']);
    hearingJurisdictionConfigMock = jasmine.createSpyObj<HearingJurisdictionConfigService>('hearingJurisdictionConfigService', ['getHearingJurisdictionsConfig']);
  });

  it('should edit hearings be enabled for user with hearing manager role', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    storeMock.select.and.returnValue(of(CASE_INFO));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
    hearingsEditGuard = new HearingsEditGuard(storeMock, storeMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsEditGuard.canActivate();
    const canActive = true;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should edit hearings be disabled for user without hearing manager role', () => {
    storeMock.pipe.and.returnValue(of(USER_2));
    storeMock.select.and.returnValue(of(CASE_INFO));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
    hearingsEditGuard = new HearingsEditGuard(storeMock, storeMock, hearingJurisdictionConfigMock, routerMock);
    const result$ = hearingsEditGuard.canActivate();
    const canActive = false;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });
});

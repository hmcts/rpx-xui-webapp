import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { BehaviorSubject, of } from 'rxjs';
import { UserDetails } from '../../app/models';
import * as fromAppStore from '../../app/store';
import { FeatureVariation } from '../../cases/models/feature-variation.model';
import { HearingsGuard } from './hearings-guard';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';
import { CaseNotifier, CaseView } from '@hmcts/ccd-case-ui-toolkit';

describe('HearingsGuard', () => {
  const USER: UserDetails = {
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

  const FEATURE_FLAG: FeatureVariation[] = [
    {
      jurisdiction: 'SSCS',
      includeCaseTypes: [
        'Benefit'
      ]
    }
  ];
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
  const CASE_VIEW_INV: CaseView = {
    case_id: '1546518523959179',
    case_type: {
      id: 'Benefit',
      name: 'Benefit',
      jurisdiction: {
        id: 'IA',
        name: 'IA'
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
  const CASE_VIEW_INV2: CaseView = {
    case_id: undefined,
    case_type: {
      id: undefined,
      name: undefined,
      jurisdiction: {
        id: undefined,
        name: undefined
      }
    },
    channels: [],
    state: {
      id: undefined,
      name: undefined
    },
    tabs: [],
    triggers: [],
    events: []
  };


  const CASE_INFO = { cid: '1546518523959179', caseType: 'Benefit', jurisdiction: 'SSCS' };

  let hearingsGuard: HearingsGuard;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;
  let hearingJurisdictionConfigMock: jasmine.SpyObj<HearingJurisdictionConfigService>;
  let caseNotifierMock: CaseNotifier;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe']);
    hearingJurisdictionConfigMock = jasmine.createSpyObj<HearingJurisdictionConfigService>('hearingJurisdictionConfigService', ['getHearingJurisdictionsConfig']);
    caseNotifierMock = jasmine.createSpyObj<CaseNotifier>('caseNotifier', [], { caseView: of(CASE_VIEW) });
  });

  it('guard truthy', () => {
    storeMock.pipe.and.returnValue(of(USER));
    hearingsGuard = new HearingsGuard(storeMock, caseNotifierMock, hearingJurisdictionConfigMock, );
    expect(hearingsGuard).toBeTruthy();
  });

  it('should return false if feature is toggled off', () => {
    storeMock.pipe.and.returnValue(of(USER));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of([]));
    caseNotifierMock.caseView = of(CASE_VIEW);
    hearingsGuard = new HearingsGuard(storeMock, caseNotifierMock, hearingJurisdictionConfigMock);
    const result$ = hearingsGuard.hasMatchedPermissions();
    const canActive = false;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should return false if case data is null', () => {
    storeMock.pipe.and.returnValue(of(USER));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
    caseNotifierMock = jasmine.createSpyObj<CaseNotifier>('caseNotifier', [], { caseView: of(CASE_VIEW_INV2) });

    hearingsGuard = new HearingsGuard(storeMock, caseNotifierMock, hearingJurisdictionConfigMock);
    const result$ = hearingsGuard.hasMatchedPermissions();
    const canActive = false;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should return false if case jurisdiction do not match', () => {
    storeMock.pipe.and.returnValue(of(USER));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
    caseNotifierMock = jasmine.createSpyObj<CaseNotifier>('caseNotifier', [], { caseView: of(CASE_VIEW_INV) });
    hearingsGuard = new HearingsGuard(storeMock, caseNotifierMock, hearingJurisdictionConfigMock);
    const result$ = hearingsGuard.hasMatchedPermissions();
    const canActive = false;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should return false if case type do not match', () => {
    storeMock.pipe.and.returnValue(of(USER));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
    caseNotifierMock = jasmine.createSpyObj<CaseNotifier>('caseNotifier', [], { caseView: of(CASE_VIEW_INV) });
    hearingsGuard = new HearingsGuard(storeMock, caseNotifierMock, hearingJurisdictionConfigMock);
    const result$ = hearingsGuard.hasMatchedPermissions();
    const canActive = false;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should return true if feature is toggled on and jurisdiction matches', () => {
    storeMock.pipe.and.returnValue(of(USER));
    hearingJurisdictionConfigMock.getHearingJurisdictionsConfig.and.returnValue(of(FEATURE_FLAG));
    hearingsGuard = new HearingsGuard(storeMock, caseNotifierMock, hearingJurisdictionConfigMock);
    const result$ = hearingsGuard.hasMatchedPermissions();
    const canActive = true;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  afterEach(() => {
    storeMock = null;
    hearingJurisdictionConfigMock = null;
    caseNotifierMock = null;
  });
});

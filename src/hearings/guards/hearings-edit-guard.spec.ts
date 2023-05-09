import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { UserDetails, UserRole } from '../../app/models';
import { SessionStorageService } from '../../app/services';
import { RoleCategoryMappingService } from '../../app/services/role-category-mapping/role-category-mapping.service';
import * as fromAppStore from '../../app/store';
import { FeatureVariation } from '../../cases/models/feature-variation.model';
import { HearingsEditGuard } from './hearings-edit-guard';

describe('HearingsEditGuard', () => {
  const USER: UserDetails = {
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

  let hearingsEditGuard: HearingsEditGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;
  let sessionStorageMock: jasmine.SpyObj<SessionStorageService>;
  let featureToggleMock: jasmine.SpyObj<FeatureToggleService>;
  let roleCategoryMappingServiceMock: jasmine.SpyObj<RoleCategoryMappingService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe']);
    sessionStorageMock = jasmine.createSpyObj<SessionStorageService>('sessionStorageService', ['getItem']);
    featureToggleMock = jasmine.createSpyObj<FeatureToggleService>('featureToggleService', ['getValueOnce']);
    roleCategoryMappingServiceMock = jasmine.createSpyObj<RoleCategoryMappingService>('roleCategoryMappingService', ['getUserRoleCategory']);
  });

  it('should edit hearings be enabled for user with hearing manager role', () => {
    storeMock.pipe.and.returnValue(of(USER));
    roleCategoryMappingServiceMock.getUserRoleCategory.and.returnValue(of(UserRole.HearingManager));
    featureToggleMock.getValueOnce.and.returnValue(of(FEATURE_FLAG));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify(CASE_INFO));
    hearingsEditGuard = new HearingsEditGuard(storeMock, sessionStorageMock, featureToggleMock, roleCategoryMappingServiceMock, routerMock);
    const result$ = hearingsEditGuard.canActivate();
    const canActive = true;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });

  it('should edit hearings be disabled for user without hearing manager role', () => {
    storeMock.pipe.and.returnValue(of(USER));
    roleCategoryMappingServiceMock.getUserRoleCategory.and.returnValue(of(UserRole.HearingViewer));
    featureToggleMock.getValueOnce.and.returnValue(of(FEATURE_FLAG));
    sessionStorageMock.getItem.and.returnValue(JSON.stringify(CASE_INFO));
    hearingsEditGuard = new HearingsEditGuard(storeMock, sessionStorageMock, featureToggleMock, roleCategoryMappingServiceMock, routerMock);
    const result$ = hearingsEditGuard.canActivate();
    const canActive = false;
    const expected = cold('(b|)', { b: canActive });
    expect(result$).toBeObservable(expected);
  });
});

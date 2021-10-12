import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppConstants, LD_FLAG_MC_APPLICATION_THEMES } from '../../app/app.constants';
import { Theme } from '../../app/containers';
import { UserDetails } from '../../app/models/user-details.model';
import * as fromActions from '../../app/store';
import { NocGuard } from './noc-guard';

describe('NocGuard', () => {
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
        'pui-caa',
        'pui-case-manager',
        'pui-finance-manager',
        'pui-organisation-manager',
        'pui-user-manager'
      ],
    }
  };
  const APPLICATION_THEMES: Theme[] = [
    {
      accountNavigationItems: {
        items: [
          {
            emit: 'sign-out',
            text: 'Sign out'
          }
        ],
        label: 'Account navigation'
      },
      appTitle: {
        name: 'Judicial Case Manager',
        url: '/'
      },
      backgroundColor: '#8d0f0e',
      logoIsUsed: true,
      logoType: 'judicial',
      navigationItems: [
        {
          active: false,
          href: '/cases',
          text: 'Case list'
        }
      ],
      roles: [
        'caseworker-sscs-judge',
        'caseworker-sscs-panelmember',
        'caseworker-cmc-judge',
        'caseworker-divorce-judge',
        'caseworker-divorce-financialremedy-judiciary',
        'caseworker-probate-judge',
        'caseworker-ia-iacjudge',
        'caseworker-publiclaw-judiciary'
      ],
      showFindCase: false
    },
    {
      accountNavigationItems: {
        items: [
          {
            emit: 'sign-out',
            text: 'Sign out'
          }
        ],
        label: 'Account navigation'
      },
      appTitle: {
        name: 'Manage cases',
        url: '/'
      },
      backgroundColor: '#202020',
      logoIsUsed: false,
      logoType: '',
      navigationItems: [
        {
          active: false,
          href: '/tasks',
          text: 'Task list'
        },
        {
          active: false,
          href: '/tasks/task-manager',
          text: 'Task manager'
        },
        {
          active: false,
          href: '/cases',
          text: 'Case list'
        },
        {
          active: false,
          href: '/cases/case-filter',
          text: 'Create case'
        }
      ],
      roles: [
        'caseworker-ia-caseofficer'
      ],
      showFindCase: true
    },
    {
      accountNavigationItems: {
        items: [
          {
            emit: 'sign-out',
            text: 'Sign out'
          }
        ],
        label: 'Account navigation'
      },
      appTitle: {
        name: 'Manage cases',
        url: '/'
      },
      backgroundColor: '#202020',
      logoIsUsed: false,
      logoType: '',
      navigationItems: [
        {
          active: false,
          href: '/tasks',
          text: 'Task list'
        },
        {
          active: false,
          href: '/cases',
          text: 'Case list'
        },
        {
          active: false,
          href: '/cases/case-filter',
          text: 'Create case'
        }
      ],
      roles: [
        'caseworker-ia-caseofficer'
      ],
      showFindCase: true
    },
    {
      accountNavigationItems: {
        items: [
          {
            emit: 'sign-out',
            text: 'Sign out'
          }
        ],
        label: 'Account navigation'
      },
      appTitle: {
        name: 'Manage cases',
        url: '/'
      },
      backgroundColor: '#202020',
      logoIsUsed: true,
      logoType: 'myhmcts',
      navigationItems: [
        {
          active: false,
          href: '/cases',
          text: 'Case list'
        },
        {
          active: false,
          href: '/cases/case-filter',
          text: 'Create case'
        },
        {
          active: false,
          href: '/noc',
          text: 'Notice of change'
        }
      ],
      roles: [
        'caseworker-ia-legalrep-solicitor',
        'caseworker-publiclaw-solicitor'
      ],
      showFindCase: true
    }
  ];
  let nocGuard: NocGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromActions.State>>;
  let featureToggleMock: jasmine.SpyObj<FeatureToggleService>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
    storeMock = jasmine.createSpyObj<Store<fromActions.State>>('store', ['pipe']);
    featureToggleMock = jasmine.createSpyObj<FeatureToggleService>('featureToggleService', ['getValueOnce']);
    nocGuard = new NocGuard(routerMock, storeMock, featureToggleMock);
  });

  it('guard truthy', () => {
    expect(nocGuard).toBeTruthy();
  });

  it('should return false if feature is toggled off', () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    featureToggleMock.getValueOnce.and.callFake((param1, param2) => {
      if (param1 === AppConstants.FEATURE_NAMES.noticeOfChange) {
        return of(false);
      } else if (param1 === LD_FLAG_MC_APPLICATION_THEMES) {
        return of(APPLICATION_THEMES);
      }
    });
    nocGuard.canActivate().toPromise().then(canActivate => expect(canActivate).toBeFalsy());
  });

  it('should return false if user role does not match noc theme', () => {
    storeMock.pipe.and.returnValue(of(USER_2));
    featureToggleMock.getValueOnce.and.callFake((param1, param2) => {
      if (param1 === AppConstants.FEATURE_NAMES.noticeOfChange) {
        return of(true);
      } else if (param1 === LD_FLAG_MC_APPLICATION_THEMES) {
        return of(APPLICATION_THEMES);
      }
    });
    nocGuard.canActivate().toPromise().then(canActivate => expect(canActivate).toBeFalsy());
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
    nocGuard.canActivate().toPromise().then(canActivate => expect(canActivate).toBeTruthy());
  });
});

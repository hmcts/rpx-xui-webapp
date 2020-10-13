import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';
import { Action, Store, StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import * as fromActions from '../../store';
import { CookieService } from 'ngx-cookie';
import {FeatureToggleService} from '@hmcts/rpx-xui-common-lib';
import {of} from 'rxjs';

const storeMock = {
  pipe: () => {
  },
  dispatch: (action: Action) => {
  }
};

/**
 * Serialised roles as returned from the Node layer.
 */
const SERIALISED_ROLES = 'j:["pui-organisation-manager", "caseworker-publiclaw", "caseworker-divorce-financialremedy-solicitor", "caseworker"]';

const cookieServiceMock = {
  get: () => {
    return SERIALISED_ROLES;
  },
};

const featureToggleServiceMock = createSpyObj('featureToggleService', ['isEnabled', 'getValue']);

// const featureToggleServiceMock = {
//   getValue: () => {
//     const subscribe = () => AppConstants.APPLICATION_USER_THEMES;
//   },
// };

// featureToggleService = createSpyObj('featureToggleService', ['isEnabled', 'getValue']);

let pipeSpy: jasmine.Spy;
let dispatchSpy: jasmine.Spy;

describe('AppHeaderComponent', () => {

  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let store: Store<fromActions.State>;

  const mockDetails = '/cases';

  beforeEach(async(() => {

    pipeSpy = spyOn(storeMock, 'pipe').and.returnValue(of(mockDetails));
    dispatchSpy = spyOn(storeMock, 'dispatch');

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      declarations: [
        AppHeaderComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
        {
          provide: CookieService,
          useValue: cookieServiceMock,
        },
        {
          provide: FeatureToggleService,
          useValue: featureToggleServiceMock,
        },
        AppHeaderComponent
      ],
    }).compileComponents();

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('getDefaultTheme()', () => {

    it('should return the applications default theme.', () => {
      expect(component.getDefaultTheme()).toEqual(AppConstants.DEFAULT_USER_THEME);
    });
  });

  describe('getApplicationThemes()', () => {

    it('should return the applications themes.', () => {
      expect(component.getDefaultApplicationThemes()).toEqual(AppConstants.APPLICATION_USER_THEMES);
    });
  });

  describe('deserialiseUserRoles()', () => {

    it('should take in serialised roles, and deserialise them into an array.', () => {

      const serialisedRoles = 'j:["pui-organisation-manager","caseworker-publiclaw","caseworker-divorce-financialremedy-solicitor","caseworker"]';
      expect(component.deserialiseUserRoles(serialisedRoles)).toEqual([
        'pui-organisation-manager',
        'caseworker-publiclaw',
        'caseworker-divorce-financialremedy-solicitor',
        'caseworker'
      ]);
    });
  });

  describe('getUsersTheme()', () => {

    it('should return the theme in priority order ie. a theme higher up the themes array' +
      'will be compared with the user\'s roles first.', () => {

      // Remember we want exact matches not partial matches
      const userRoles = ['pui-case-manager', 'caseworker-sscs-judge'];

      // We compare the first set of theme roles first.
      const themes = [
        {
          roles: [
            'caseworker-sscs-judge',
            'caseworker-sscs-panelmember',
            'caseworker-cmc-judge',
            'caseworker-divorce-judge',
          ],
          appTitle: {name: 'Judicial case manager', url: '/'},
          navigationItems: [
            {
              text: 'Case list',
              href: '/cases',
              active: false
            },
            {
              text: 'Create case',
              href: '/cases/case-filter',
              active: false
            },
          ],
          accountNavigationItems: {
            label: 'Account navigation',
            items: [{
              text: 'Sign out d',
              emit: 'sign-out'
            }]
          },
          showFindCase: false,
          backgroundColor: '#8d0f0e',
          logoIsUsed: true,
          logoType: 'judicial',
        },
        {
          roles: ['pui-case-manager'],
          appTitle: {name: 'Manage Cases', url: '/'},
          navigationItems: [
            {
              text: 'Case list',
              href: '/cases',
              active: false
            },
            {
              text: 'Create case',
              href: '/cases/case-filter',
              active: false
            }
          ],
          accountNavigationItems: {
            label: 'Account navigation',
            items: [{
              text: 'Sign out',
              emit: 'sign-out'
            }]
          },
          showFindCase: true,
          backgroundColor: '#202020',
          logoIsUsed: true,
          logoType: 'myhmcts',
        },
      ];

      const defaultTheme = AppConstants.DEFAULT_USER_THEME;

      expect(component.getUsersTheme(userRoles, themes, defaultTheme)).toEqual(themes[0]);
    });

    it('should return a default theme if there are no user roles.', () => {

      const userRoles = [];

      const themes = [
        {
          roles: [
            'caseworker-sscs-judge',
            'caseworker-sscs-panelmember',
            'caseworker-cmc-judge',
            'caseworker-divorce-judge',
          ],
          appTitle: 'Judicial Case Manager',
        },
        {
          roles: ['pui-case-manager'],
          appTitle: 'Case Manager',
        },
      ];
      const defaultTheme = AppConstants.DEFAULT_USER_THEME;

      expect(component.getUsersTheme(userRoles, themes, defaultTheme)).toEqual(AppConstants.DEFAULT_USER_THEME);
    });

    it('should return a default theme if there are no themes.', () => {

      const userRoles = ['pui-case-manager'];
      const themes = [];
      const defaultTheme = AppConstants.DEFAULT_USER_THEME;

      expect(component.getUsersTheme(userRoles, themes, defaultTheme)).toEqual(AppConstants.DEFAULT_USER_THEME);
    });

  });

  describe('setAppHeaderProperties()', () => {

    it('should take a theme and update the app header properties.', () => {

      const defaultTheme = AppConstants.DEFAULT_USER_THEME;

      component.setAppHeaderProperties(defaultTheme);

      expect(component.appHeaderTitle).toBe(AppConstants.DEFAULT_USER_THEME.appTitle);
      expect(component.navItems).toBe(AppConstants.DEFAULT_USER_THEME.navigationItems);
      expect(component.userNav).toBe(AppConstants.DEFAULT_USER_THEME.accountNavigationItems);
      expect(component.backgroundColor).toBe(AppConstants.DEFAULT_USER_THEME.backgroundColor);
      expect(component.logoType).toBe(AppConstants.DEFAULT_USER_THEME.logoType);
      expect(component.logoIsUsed).toBe(AppConstants.DEFAULT_USER_THEME.logoIsUsed);
    });
  });

  describe('onNavigate()', () => {

    it('should logout when onNavigate sign-out is called ', () => {
      component.onNavigate('anything');
      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.onNavigate('sign-out');
      expect(dispatchSpy).toHaveBeenCalledWith(new fromActions.Logout());
    });
  });
});

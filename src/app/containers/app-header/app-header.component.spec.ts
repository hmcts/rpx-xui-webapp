import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Action, Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { AppConstants } from '../../../app/app.constants';
import { Theme } from '../../../app/models/theme.model';
import { UserDetails, UserInfo } from '../../../app/models/user-details.model';
import { LoggerService } from '../../services/logger/logger.service';
import * as fromActions from '../../store';
import { AppHeaderComponent } from './app-header.component';

const storeMock = {
  pipe: () => of([]),
  dispatch: (action: Action) => {
  }
};

const featureToggleServiceMock = {
  getValue: () => {
    return {
      subscribe: () => AppConstants.DEFAULT_USER_THEME
    };
  }
};

const loggerServiceMock = jasmine.createSpyObj('loggerService', ['error']);

let dispatchSpy: jasmine.Spy;
let subscribeSpy: jasmine.Spy;

describe('AppHeaderComponent', () => {

  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let store: Store<fromActions.State>;
  const subscriptionMock: Subscription = new Subscription();
  const stateStoreMock: Store<fromActions.State> = new Store<fromActions.State>(null, null, null);
  const eventsSub = new BehaviorSubject<any>(null);

  beforeEach(async(() => {
    dispatchSpy = spyOn(storeMock, 'dispatch');
    subscribeSpy = spyOn(subscriptionMock, 'unsubscribe');

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
          provide: FeatureToggleService,
          useValue: featureToggleServiceMock,
        },
        {
          provide: Router,
          useValue: {
            events: eventsSub,
            url: '/something-or-other'
          }
        },
        {
          provide: LoggerService,
          useValue: loggerServiceMock
        },
        AppHeaderComponent
      ],
    }).compileComponents();

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

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
            appTitle: { name: 'Judicial case manager', url: '/' },
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
            appTitle: { name: 'Manage Cases', url: '/' },
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
        const userTypeRoles = { Solicitor: [] };
        expect(component.getUsersTheme(userRoles, themes, defaultTheme, AppHeaderComponent.defaultUserTypeRoles)).toEqual(themes[0]);
      });

    it('should return a default theme if there are no user roles.', () => {

      const userRoles = [];
      const theme1 = {} as Theme;
      theme1.roles = [
        'caseworker-sscs-judge',
        'caseworker-sscs-panelmember',
        'caseworker-cmc-judge',
        'caseworker-divorce-judge',
      ];
      theme1.appTitle = {
        name: 'Judicial Case Manager',
        url: ''
      };

      const theme2 = {} as Theme;
      theme2.roles = ['pui-case-manager'];
      theme1.appTitle = {
        name: 'Case Manager',
        url: ''
      };

      const themes = [
        theme1, theme2
      ];
      const defaultTheme = AppConstants.DEFAULT_USER_THEME;

      expect(component.getUsersTheme(userRoles, themes, defaultTheme, AppHeaderComponent.defaultUserTypeRoles)).toEqual(AppConstants.DEFAULT_USER_THEME);
    });

    it('should return a default theme if there are no themes.', () => {

      const userRoles = ['pui-case-manager'];
      const themes = [];
      const defaultTheme = AppConstants.DEFAULT_USER_THEME;

      expect(component.getUsersTheme(userRoles, themes, defaultTheme, AppHeaderComponent.defaultUserTypeRoles)).toEqual(AppConstants.DEFAULT_USER_THEME);
    });

  });

  describe('setAppHeaderProperties()', () => {

    it('should take a theme and update the app header properties.', () => {

      const defaultTheme = AppConstants.DEFAULT_USER_THEME;
      const menuItems = AppConstants.DEFAULT_MENU_ITEMS

      component.setAppHeaderProperties(defaultTheme, menuItems);

      expect(component.appHeaderTitle).toBe(AppConstants.DEFAULT_USER_THEME.appTitle);
      expect(component.navItems).toEqual(AppConstants.DEFAULT_MENU_ITEMS);
      expect(component.backgroundColor).toBe(AppConstants.DEFAULT_USER_THEME.backgroundColor);
      expect(component.logoType).toBe(AppConstants.DEFAULT_USER_THEME.logo);
      expect(component.logoIsUsed).toBe(AppConstants.DEFAULT_USER_THEME.logo !== 'none');
    });
  });

  describe('setNavigationEnd()', () => {

    it('should set the navigation items once the navigation has ended', () => {
      // set the navigation end and original navigation items (note that active set to false)
      const endNav = new NavigationEnd(1, '/something-or-other', '/something-or-other');
      component.navItems = [{text: 'example', href: '/something-or-other', active: false}];

      // start evaluating the url and navigation items and run setNavigationEnd
      expect(component.router.url).toBe(component.navItems[0].href);
      eventsSub.next(endNav);
      component.setNavigationEnd(eventsSub);
      fixture.detectChanges();

      // the expectation is that active should now be true
      expect(component.router.url).toBe(component.navItems[0].href);
      expect(component.navItems[0].active).toBe(true);
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

  describe('subscribe()', async () => {
    it('should allow subscribing to an observable', () => {
      // ensure that the component's subscribe method runs with mock data
      const url = '/tasks/list';
      const exObservable$ = Observable.of(url);
      expect(component.subscribe(exObservable$)).toBeTruthy();
    });
  });

  describe('unsubscribe()', async () => {
    it('should allow unsubscribing from a subscription', () => {
      component.unsubscribe(subscriptionMock);
      expect(subscribeSpy).toHaveBeenCalled();
    });
  });

  describe('getObservable()', async () => {
    it('should allow getting an observable from the store', () => {
      const observable = component.getObservable(stateStoreMock);
      expect(observable).not.toBe(undefined);
    });
  });

  describe('hideNavigationListener()', async () => {
    it('should be able to set a subscription', () => {
      // the internal methods of the hideNavigationListener has been tested so we want to make sure this runs without issue
      const subscription = component.hideNavigationListener(stateStoreMock);
      // will be undefined as Observable not returned from the store
      expect(subscription).toBeUndefined();
    });
  });
});

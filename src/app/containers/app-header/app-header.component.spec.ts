import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';
import {StoreModule, Store, Action} from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import * as fromActions from '../../store';
import { CookieService, CookieModule } from 'ngx-cookie';
import {of} from 'rxjs';

const storeMock = {
  pipe: () => {
  },
  dispatch: (action: Action) => {
  }
};

const cookieServiceMock = {
  get: () => {
    return 'j:["pui-organisation-manager", "caseworker-publiclaw", "caseworker-divorce-financialremedy-solicitor", "caseworker"]';
  },
  // set: (key, value) => {
  //   cookieService[key] = value;
  // },
  // removeAll: () => { }
};

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
        AppHeaderComponent
      ],
    }).compileComponents();

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // xit('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // run through each themes roles, and check if it matches a User Role, if it does, then' +
  // 'we should return that theme.
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
        // TODO: Does this need to be an object or array?
        // TODO: This is not working.
        showFindCase: false,
        backgroundColor: '#8d0f0e',
        logoIsUsed: true,
        logoType: 'judicial',
      },
      {
        roles: ['pui-case-manager'],
        // TODO: Get rid of url from this?
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
        }, // TODO: Does this need to be an object or array?
        showFindCase: true,
        backgroundColor: '#202020',
        logoIsUsed: true,
        logoType: 'myhmcts',
      },
    ];

    const defaultTheme = component.DEFAULT_THEME;

    expect(component.getUsersTheme(userRoles, themes, defaultTheme)).toEqual(themes[0]);
  });

  it('should return a default theme if there are no user roles.', () => {

    // Remember we want exact matches not partial matches
    const userRoles = [];

    // We compare the first set of theme roles first.
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
    const defaultTheme = component.DEFAULT_THEME;

    expect(component.getUsersTheme(userRoles, themes, defaultTheme)).toEqual(component.DEFAULT_THEME);
  });

  it('should return a default theme if there are no themes.', () => {

    const userRoles = ['pui-case-manager'];
    const themes = [];
    const defaultTheme = component.DEFAULT_THEME;

    expect(component.getUsersTheme(userRoles, themes, defaultTheme)).toEqual(component.DEFAULT_THEME);
  });
  //
  // it('should update parameter on ngOnInit', () => {
  //   expect(component.findTheme([],[])).toBe(false);
  // });
  //
  // it('should update parameter on ngOnInit', () => {
  //   const dummyAppHeaderTitle = {name: 'Dummy', url: '/'};
  //   const dummyNavItems = [{
  //     text: 'dummy',
  //     href: '/dummy',
  //     active: false
  //   }];
  //   const dummyUserNav = {
  //     label: 'dummy',
  //     items: [{
  //       text: 'Sign out',
  //       emit: 'sign-out'
  //     }]
  //   };
  //   AppConstants.APP_HEADER_TITLE = dummyAppHeaderTitle;
  //   AppConstants.NAV_ITEMS = dummyNavItems;
  //   AppConstants.USER_NAV = dummyUserNav;
  //   component.ngOnInit();
  //   expect(component.appHeaderTitle).toBe(dummyAppHeaderTitle);
  //   expect(component.navItems).toBe(dummyNavItems);
  //   expect(component.userNav).toBe(dummyUserNav);
  // });
  //
  // it('should logout when onNavigate sign-out is called ', () => {
  //   const spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
  //   component.onNavigate('anything');
  //   expect(spyOnDispatchToStore).toHaveBeenCalledTimes(0);
  //   component.onNavigate('sign-out');
  //   expect(spyOnDispatchToStore).toHaveBeenCalledWith(new fromActions.Logout());
  // });
});

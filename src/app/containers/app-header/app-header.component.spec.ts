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

const cookieService = {
  get: key => {
    return cookieService[key];
  },
  set: (key, value) => {
    cookieService[key] = value;
  },
  removeAll: () => { }
};

let pipeSpy: jasmine.Spy;
let dispatchSpy: jasmine.Spy;

describe('AppHeaderComponent', () => {

  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let store: Store<fromActions.State>;

  const mockCookieService = jasmine.createSpyObj('CookieService', [
    'get',
  ]);

  const mockDetails = {};

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
          useValue: mockCookieService,
        },
        AppHeaderComponent
      ],
    }).compileComponents();

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find the users theme based on their role', () => {

    // Remember we want exact matches not partial matches
    const userRoles = 'j:["pui-caa","payments","caseworker-publiclaw-solicitor","caseworker-publiclaw","caseworker-ia-legalrep-solicitor",' +
      '"caseworker-ia","caseworker-divorce-financialremedy","pui-user-manager","pui-case-manager","caseworker-probate-solicitor",' +
      '"caseworker","caseworker-probate","caseworker-divorce-financialremedy-solicitor","caseworker-divorce","pui-organisation-manager",' +
      '"pui-finance-manager","caseworker-divorce-solicitor"]';

    const themes = [
      {
        roles: ['pui-case-manager'],
        appTitle: 'Case Manager',
        navigationItems: [],
        accountNavigationItems: [],
        showFindCase: true,
      },
      {
        roles: [
          'caseworker-sscs-judge',
          'caseworker-sscs-panelmember',
          'caseworker-cmc-judge',
          'caseworker-divorce-judge',
        ],
        appTitle: 'Judicial Case Manager',
        navigationItems: [],
        accountNavigationItems: [],
        showFindCase: true,
      }
    ];

    expect(component.findAppNavigationAndStyling(userRoles, themes)).toBeTruthy();
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

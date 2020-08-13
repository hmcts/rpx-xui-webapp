import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppHeaderSignedOutComponent } from './app-header-signed-out.component';
import { StoreModule, Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import * as fromActions from '../../store';

const cookieService = {
  get: key => {
    return cookieService[key];
  },
  set: (key, value) => {
    cookieService[key] = value;
  },
  removeAll: () => { }
};


describe('AppHeaderSignedOutComponent', () => {
  let component: AppHeaderSignedOutComponent;
  let fixture: ComponentFixture<AppHeaderSignedOutComponent>;
  let store: Store<fromActions.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppHeaderSignedOutComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderSignedOutComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update parameter on ngOnInit', () => {
    const dummyAppHeaderTitle = {name: 'Dummy', url: '/'};
    const dummyNavItems = [{
      text: 'dummy',
      href: '/dummy',
      active: false
    }];
    const dummyUserNav = {
      label: 'dummy',
      items: [{
        text: 'Sign out',
        emit: 'sign-out'
      }]
    };
    AppConstants.APP_HEADER_TITLE = dummyAppHeaderTitle;
    AppConstants.SIGNED_OUT_NAV_ITEMS = dummyNavItems;
    AppConstants.SIGNED_OUT_USER_NAV = dummyUserNav;
    component.ngOnInit();
    expect(component.appHeaderTitle).toBe(dummyAppHeaderTitle);
    expect(component.navItems).toBe(dummyNavItems);
    expect(component.userNav).toBe(dummyUserNav);
  });
});

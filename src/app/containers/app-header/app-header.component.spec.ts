import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';
import { StoreModule, Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import * as fromActions from '../../store';
import { CookieService, CookieModule } from 'ngx-cookie';
import {of} from 'rxjs';


const cookieService = {
  get: key => {
    return cookieService[key];
  },
  set: (key, value) => {
    cookieService[key] = value;
  },
  removeAll: () => { }
};


describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let store: Store<fromActions.State>;
  let spyOnPipeToStore = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppHeaderComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
    spyOnPipeToStore = spyOn(store, 'pipe').and.returnValue(of('/signed-out'));
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
    AppConstants.NAV_ITEMS = dummyNavItems;
    AppConstants.USER_NAV = dummyUserNav;
    component.ngOnInit();
    expect(component.appHeaderTitle).toBe(dummyAppHeaderTitle);
    expect(component.navItems).toBeDefined();
    expect(component.userNav).toBeDefined();
  });

  it('should logout when onNavigate sign-out is called ', () => {
    const spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
    component.onNavigate('anything');
    expect(spyOnDispatchToStore).toHaveBeenCalledTimes(0);
    component.onNavigate('sign-out');
    expect(spyOnDispatchToStore).toHaveBeenCalledWith(new fromActions.Logout());
  });
});

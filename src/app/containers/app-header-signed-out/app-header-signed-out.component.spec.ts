import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppConstants } from 'src/app/app.constants';
import * as fromActions from '../../store';
import { AppHeaderSignedOutComponent } from './app-header-signed-out.component';

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
});

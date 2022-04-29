import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppConstants } from '../../../app/app.constants';
import { ApplicationThemeLogo } from '../../enums';
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
  let store: any;

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
    store = TestBed.inject(Store);
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
      expect(component.navItems.length).toBe(0);
      expect(component.userNav).toEqual({ label: '', items: [] });
      expect(component.backgroundColor).toBe(AppConstants.DEFAULT_USER_THEME.backgroundColor);
      expect(component.logo).toBe(AppConstants.DEFAULT_USER_THEME.logo);
      expect(component.logoIsUsed).toBe(AppConstants.DEFAULT_USER_THEME.logo !== ApplicationThemeLogo.NONE);
    });
  });
});

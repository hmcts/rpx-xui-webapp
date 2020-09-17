import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {NavItemsModel} from '../../models/nav-item.model';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';
import * as fromActions from '../../store';
import {CookieService} from 'ngx-cookie';
import {Observable, of, Subscription} from 'rxjs';
import {AppUtils} from '../../app-utils';
import {AppConstants} from '../../app.constants';

export interface Theme {
  roles: string[];
  appTitle: AppTitleModel;
  navigationItems: NavItemsModel[];
  accountNavigationItems: UserNavModel;
  showFindCase: boolean;
  backgroundColor: string;
  logoIsUsed: boolean;
  logoType: string;
}

@Component({
  selector: 'exui-app-header',
  templateUrl: './app-header.component.html',
})

/**
 * AppHeaderComponent
 *
 * TODO: There is no App Header Component in MO.
 * I initially believed that this component could be an unnecessary abstraction.
 *
 * But everywhere in this project we use exui-app-header.
 *
 * But this takes in application constants and passes it down to other components, which makes sense, so that
 * components in the component folder are pure.
 */
export class AppHeaderComponent implements OnInit, OnDestroy {

  public navItems: NavItemsModel[];
  public appHeaderTitle: AppTitleModel;
  public userNav: UserNavModel;
  public showFindCase: boolean;
  public backgroundColor: string;
  public logoType: string;
  public logoIsUsed: boolean = false;
  public showNavItems: Observable<boolean>;

  private subscription: Subscription;

  constructor(private store: Store<fromActions.State>,
              private cookieService: CookieService) {
  }

  /**
   * Get Default Theme
   */
  public getDefaultTheme(): Theme {

    return AppConstants.DEFAULT_USER_THEME;
  }

  /**
   * TODO:
   * Take into consideration:
   * The judicial header takes precedence over other ones for judges.
   * In other words, if a user has both judicial roles (see list below) and solicitor roles (e.g. pui-case-manager),
   * the judicial header should display.
   * @see EUI-2292
   * Therefore the array should be in priority order, with the items closer to the top taking precedence.
   *
   * We need to be prepared to add new roles and remove existing ones to the list above
   * as new services are reformed and existing ones evolve. Therefore leverage application vars.
   *
   * TODO: remove url from app Title?
   *
   * @see comments on EUI-2292
   */
  public getApplicationThemes = () => {

    return AppConstants.APPLICATION_USER_THEMES;
  }

  /**
   * Get User Roles
   *
   * Get User Roles from Cookie.
   *
   * TODO: Why does this return with a j: in it.
   * @return j:["pui-caa","payments","caseworker-publiclaw-solicitor"]
   */
  public getSerialisedUserRolesFromCookie(): string {

    return this.cookieService.get('roles');
  }

  /**
   * Get User Roles
   *
   * Takes in a string of serialised User Roles, supplied from the Node layer.
   *
   * TODO: Unit test
   *
   * @param serialisedUserRoles - 'j:["pui-organisation-manager","caseworker-publiclaw",' +
   * '"caseworker-divorce-financialremedy-solicitor","caseworker"]';
   */
  public deserialiseUserRoles = (serialisedUserRoles: string): string[] => {

    const serialisedUserRolesWithoutJsonPrefix: string = AppUtils.removeJsonPrefix(serialisedUserRoles);
    return AppUtils.getCookieRolesAsArray(serialisedUserRolesWithoutJsonPrefix);
  }

  /**
   * Get Users Theme
   *
   * Find the Application's Theme, it's Styling and Navigation based on the Users roles.
   *
   * An example would be:
   *
   * For a Judicial User the application is called 'Judicial Case Manager' and has different menu items,
   * and color, whereas to a Case Manager's this application is called 'Manager Cases'.
   *
   * In addition to a default User the header is styled completely differently.
   *
   * Note that we run through Themes first so that our Theme array can be organised in priority order;
   * the top most item is the highest priority theming to be applied. Most likely for a Judicial User.
   *
   * @param userRoles - ['pui-case-manager', 'caseworker-sscs-judge']
   * @param themes - [roles, appTitle, navigationItems etc.] - see unit tests
   * @param defaultTheme - The default theme to be applied if we cannot find a matching Theme
   * for the User's Roles.
   */
  public getUsersTheme = (userRoles, themes, defaultTheme): Theme => {

    const themeToApply = defaultTheme;

    for (const theme of themes) {
      for (const role of theme.roles) {
        if (userRoles.indexOf(role) > -1) {
          return theme;
        }
      }
    }

    return themeToApply;
  }

  /**
   * ngOnInit
   *
   * Get the application theme ie. the navigation and styling for the application header for the logged in User.
   *
   * We then invoke a subscription to listen for if the User is on a page where we need to hide the navigation.
   * ie. on the Terms and Conditions page.
   *
   * We then setup the Application Header accordingly.
   */
  public ngOnInit(): void {

    const applicationTheme: Theme = this.getApplicationThemeForUser();

    this.hideNavigationListener(this.store);

    this.setAppHeaderProperties(applicationTheme);
  }

  public getApplicationThemeForUser(): Theme {

    const serialisedUserRoles: string = this.getSerialisedUserRolesFromCookie();
    const userRoles: string[] = this.deserialiseUserRoles(serialisedUserRoles);

    const applicationThemes: Theme[] = this.getApplicationThemes();

    // TODO: Change this to test theming
    // Judicial User
    // let testUserRoles = ['caseworker-sscs-panelmember'];
    //
    // pui-case-manager
    // testUserRoles = ['pui-case-manager'];

    // default a normal user
    // testUserRoles = ['normal-user'];

    return this.getUsersTheme(userRoles, applicationThemes, this.getDefaultTheme());
  }

  /**
   * Set App Header Properties
   *
   * Set the app header properties, in one function that takes in the application theme.
   *
   * TODO: Unit test.
   */
  public setAppHeaderProperties(applicationTheme: Theme): void {

    const {
      appTitle,
      accountNavigationItems,
      backgroundColor,
      logoIsUsed,
      logoType,
      navigationItems,
      showFindCase,
    } = applicationTheme;

    this.appHeaderTitle = appTitle;
    this.navItems = navigationItems;
    this.userNav = accountNavigationItems;
    this.backgroundColor = backgroundColor;
    this.logoType = logoType;
    this.logoIsUsed = logoIsUsed;

    // TODO: showFindCase is not working.
    this.showFindCase = showFindCase;
  }

  /**
   * Hide Navigation
   *
   * We subscribe to the applications router. When the router url has a certain path we do
   * not show the navigation ie. on the Terms and Conditions page we do not show the navigation,
   * due to business requirements.
   */
  public hideNavigationListener(store): void {

    const observable = this.getObservable(store);
    this.subscription = this.subscribe(observable);
  }

  public getObservable(store: Store<fromActions.State>): Observable<string> {
    return store.pipe(select(fromActions.getRouterUrl));
  }

  /**
   * Check if we should show navigation items.
   *
   * That showNavItems is used specifically on the Terms and Conditions page, to not show
   * the Navigation Menu
   */
  public subscribe(observable: Observable<string>): Subscription {
    return observable.subscribe(url => {

      this.showNavItems = of(AppUtils.showNavItems(url));
    });
  }

  public ngOnDestroy() {

    this.unsubscribe(this.subscription);
  }

  public unsubscribe(subscription: Subscription) {

    if (subscription) {
      subscription.unsubscribe();
    }
  }

  public onNavigate(event): void {

    if (event === 'sign-out') {
      this.store.dispatch(new fromActions.StopIdleSessionTimeout());
      return this.store.dispatch(new fromActions.Logout());
    }
  }
}

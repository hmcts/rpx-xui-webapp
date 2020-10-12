import {Component, OnDestroy, OnInit} from '@angular/core';
import {FeatureToggleService} from '@hmcts/rpx-xui-common-lib';
import {select, Store} from '@ngrx/store';
import {CookieService} from 'ngx-cookie';
import {Observable, of, Subscription} from 'rxjs';

import {AppUtils} from '../../app-utils';
import {AppConstants} from '../../app.constants';
import {AppTitleModel} from '../../models/app-title.model';
import {NavItemsModel} from '../../models/nav-item.model';
import {UserNavModel} from '../../models/user-nav.model';
import * as fromActions from '../../store';

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
 * This application header controls the dynamism of the components it controls.
 *
 * The application header is able to be style dynamically dependent on the User's role.
 *
 * Navigation and Styling update dependent on the Application Theme that have been set
 *
 * @see app.constants.ts for application themes and defaults.
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
              private cookieService: CookieService,
              private featureToggleService: FeatureToggleService) {
  }

  /**
   * Get Default Theme
   */
  public getDefaultTheme(): Theme {

    return AppConstants.DEFAULT_USER_THEME;
  }

  /**
   * Get Default Application Themes
   *
   * Note that the application themes are in priority order, the application theme at the top of
   * the list is given the highest precedence.
   *
   * If Launch Darkly goes down then these Default Application Themes will be used.
   */
  public getDefaultApplicationThemes = () => {

    return AppConstants.APPLICATION_USER_THEMES;
  }

  /**
   * Get Serialised User Roles From Cookie
   *
   * Note that the cookie's user names have a j: in the string
   * as Express in the Node layer denotes Json with j:, when it serialises Json into strings.
   *
   * @return j:["pui-caa","payments","caseworker-publiclaw-solicitor"]
   */
  public getSerialisedUserRolesFromCookie(): string {

    return this.cookieService.get('roles');
  }

  /**
   * Get User Roles
   *
   * Takes in a string of serialised User Roles, supplied from the Node layer, and deserialises them.
   *
   * @param serialisedUserRoles - 'j:["pui-organisation-manager","caseworker-publiclaw",' +
   * '"caseworker-divorce-financialremedy-solicitor","caseworker"]';
   * @return ["pui-organisation-manager","caseworker-publiclaw","caseworker-divorce-financialremedy-solicitor","caseworker"]
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
    console.log('ngOnInit')

    // const shareableJurisdictions = this.featureToggleService.getValue('mc-application-themes', []);
    //
    // this.featureToggleService.isEnabled('shareable-jurisdictions').subscribe(value => {
    //   console.log('shareable-jurisdictions');
    //   console.log(value);
    // });
    //
    // this.featureToggleService.isEnabled('mc-application-themes').subscribe(value => {
    //   console.log('mc-application-themes');
    //   console.log(value);
    // });

    this.featureToggleService.getValue('mc-application-themes', this.getDefaultApplicationThemes())
                                .subscribe(applicationThemes => {
      console.log('mc-application-themes');
      console.log(applicationThemes);

      const applicationTheme: Theme = this.getApplicationThemeForUser(applicationThemes);

      this.hideNavigationListener(this.store);

      this.setAppHeaderProperties(applicationTheme);
    });
  }

  public getApplicationThemeForUser(applicationThemes: Theme[]): Theme {

    const serialisedUserRoles: string = this.getSerialisedUserRolesFromCookie();
    const userRoles: string[] = this.deserialiseUserRoles(serialisedUserRoles);

    // const applicationThemes: Theme[] = this.getApplicationThemes();

    return this.getUsersTheme(userRoles, applicationThemes, this.getDefaultTheme());
  }

  /**
   * Set App Header Properties
   *
   * Set the app header properties, in one function that takes in the application theme.
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
   * That showNavItems property is a function specifically for the Terms and Conditions page, to not show
   * the Navigation Menu, as this is a business requirement.
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

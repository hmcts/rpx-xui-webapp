import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { UserDetails } from '../../../app/models/user-details.model';

import { AppUtils } from '../../app-utils';
import { AppConstants, LD_FLAG_MC_APPLICATION_THEMES } from '../../app.constants';
import { AppTitleModel } from '../../models/app-title.model';
import { NavItemsModel } from '../../models/nav-item.model';
import { UserNavModel } from '../../models/user-nav.model';
import { LoggerService } from '../../services/logger/logger.service';
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

  public featureToggleKey: string;
  public serviceMessageCookie: string;
  public userRoles: string[];

  private subscription: Subscription;
  public userDetails$: Observable<UserDetails>;
  public defaultTheme: Theme = AppConstants.DEFAULT_USER_THEME;

  constructor(
    private readonly store: Store<fromActions.State>,
    private readonly featureToggleService: FeatureToggleService,
    private readonly loggerService: LoggerService,
    public router: Router
  ) {}

  /**
   * Get Default Application Themes
   *
   * Note that the application themes are in priority order, the application theme at the top of
   * the list is given the highest precedence.
   *
   * If Launch Darkly goes down then these Default Application Themes will be used.
   */
  public getDefaultApplicationThemes() {

    return AppConstants.APPLICATION_USER_THEMES;
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
  public deserialiseUserRoles(serialisedUserRoles: string): string[] {

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
  public getUsersTheme(userRoles, themes, defaultTheme): Theme {

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
    this.featureToggleKey = AppConstants.SERVICE_MESSAGES_FEATURE_TOGGLE_KEY;
    this.serviceMessageCookie = AppConstants.SERVICE_MESSAGE_COOKIE;
    this.userDetails$ = this.store.pipe(select(fromActions.getUserDetails));
    this.setAppHeaderProperties(this.defaultTheme);

    const applicationThemes$ = this.featureToggleService.getValue<Theme[]>(LD_FLAG_MC_APPLICATION_THEMES, this.getDefaultApplicationThemes());
    combineLatest([this.userDetails$, applicationThemes$]).subscribe(([userDetails, applicationThemes]) => {
        this.setHeaderContent(userDetails, applicationThemes);
      });

    // Set up the active link whenever we detect that navigation has completed.
    this.router.events.subscribe(event => {
      this.setNavigationEnd(event);
    });
  }

  public setHeaderContent(userDetails, applicationThemes) {
    if (userDetails.userInfo) {
      this.userRoles = userDetails.userInfo.roles;
      const applicationTheme: Theme = this.getApplicationThemeForUser(applicationThemes, userDetails.userInfo.roles);
      this.hideNavigationListener(this.store);
      this.setAppHeaderProperties(applicationTheme);
      if (applicationTheme.navigationItems.some(x => x.active)) {
        const currentNav = applicationTheme.navigationItems.find(x => x.active);
        // this.router.navigate([currentNav.href]);
      }
    }
  }

  public setNavigationEnd(event) {
    if (event instanceof NavigationEnd) {
      this.setupActiveNavLink(this.navItems);
    }
  }

  public getApplicationThemeForUser(applicationThemes: Theme[], userRoles: string[]): Theme {
    try {
        return this.getUsersTheme(userRoles, applicationThemes, this.defaultTheme);
    } catch (error) {
      return this.logErrorAndReturnDefaultTheme(error);
    }
  }

  public logErrorAndReturnDefaultTheme(error): Theme {
    this.loggerService.error(error);
    return this.defaultTheme;
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
    this.setupActiveNavLink(navigationItems);
    this.userNav = accountNavigationItems;
    this.backgroundColor = backgroundColor;
    this.logoType = logoType;
    this.logoIsUsed = logoIsUsed;

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

  private setupActiveNavLink(items: NavItemsModel[]): void {
    this.navItems = AppUtils.setActiveLink(items, this.router.url);
  }
}

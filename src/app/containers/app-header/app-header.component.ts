import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {AppConstants} from '../../app.constants';
import {NavItemsModel} from '../../models/nav-item.model';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';
import * as fromActions from '../../store';
import {CookieService} from 'ngx-cookie';
import {Observable, of, Subscription} from 'rxjs';
import {AppUtils} from '../../app-utils';

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
  navItems: NavItemsModel[];
  appHeaderTitle: AppTitleModel;
  userNav: UserNavModel;
  showFindCase: boolean;
  userRoles: any;
  backgroundColor: string;
  isCaseManager: any;
  subscription: Subscription;
  showNavItems: Observable<boolean>;

  constructor(private store: Store<fromActions.State>,
              private cookieService: CookieService) {
  }

  public DEFAULT_THEME = {
    roles: ['default'],
    appTitle: {name: 'Manage Cases Default', url: '/'},
    navigationItems: [{
      text: 'Case list',
      href: '/cases',
      active: false
    }, {
      text: 'Create case',
      href: '/cases/case-filter',
      active: false
    }],
    accountNavigationItems: {
      label: 'Account navigation',
      items: [{
        text: 'Sign out d',
        emit: 'sign-out'
      }]
    }, // TODO: Does this need to be an object or array?
    showFindCase: true,
    backgroundColor: '#202020',
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
  };

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

    return [
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
          }
        ],
        accountNavigationItems: {
          label: 'Account navigation',
          items: [{
            text: 'Sign out j',
            emit: 'sign-out'
          }]
        },
        // TODO: Does this need to be an object or array?
        // TODO: This is not working.
        showFindCase: false,
        backgroundColor: '#8d0f0e',
      },
      {
        roles: ['pui-case-manager'],
        // TODO: Get rid of url from this?
        appTitle: {name: 'Manage Cases', url: '/'},
        navigationItems: [{
          text: 'Case list',
          href: '/cases',
          active: false
        }, {
          text: 'Create case',
          href: '/cases/case-filter',
          active: false
        }],
        accountNavigationItems: {
          label: 'Account navigation',
          items: [{
            text: 'Sign out',
            emit: 'sign-out'
          }]
        }, // TODO: Does this need to be an object or array?
        showFindCase: true,
        backgroundColor: '#00a33b',
      },
    ];
  }

  /**
   * Finds the Application's Theming, based on a User's Roles.
   *
   * The application's theme contains Navigation items that the User is able to see, and styling for that User.
   * ie. To A Judicial User the application is called 'Judicial Case Manager' and has different menu items,
   * whereas to a Case Worker user the application is called 'Case Manager'.
   *
   * TODO: So do we want to go through each of our roles, or do we want to go through the User's roles
   * So it's a loop of 18 vs. 10. But if we went through the userRoles initially then if we found
   * a match it would not be prioritise if we go through our role based themes then the priority order still stands.
   *
   * We go through the roles of each theme to check if they exist for a User. We do it this way, so that we can
   * priortise which theme takes precendence, ie. a theme higher up the Role Based Theming array will take
   * precendence over one that's below it.
   *
   * TODO: You are working here, making sure that this func works correctly,
   * and is tested.
   */
  public getUsersTheme = (userRoles, themes): any => {

    console.log('getUsersTheme userRoles');
    console.log(userRoles);

    // Default theme
    // TODO: Side effecting
    // Move default theme to constants file.
    const themeToApply = this.DEFAULT_THEME;

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
   * Cookie User Roles to Array
   *
   * The User Roles within the cookie are stored as a string,
   * we need to take the string, and convert it to an array.
   *
   * We do this as we want a role within the User Role to match
   * up exactly to a role within the theme.
   *
   * If we were to use Reg-Ex over the string, we will find
   * matching on multiple items, within the cookie string.
   *
   * @param cookieUserRoles
   */
  // public cookieUserRolesToArray = cookieUserRoles => {
  //
  // };

  // Note that all components use this app-header.component.html, and therefore all components use
  // this: exui-app-header
  public ngOnInit(): void {

    // Need to mock this in the test
    // TODO: userRoles is needed in the component. remove once we replace.
    this.userRoles = this.cookieService.get('roles');

    const serialisedUserRoles: string = this.getSerialisedUserRolesFromCookie();
    const userRoles: string[] = this.deserialiseUserRoles(serialisedUserRoles);

    const applicationThemes = this.getApplicationThemes();

    // TODO: Change this to test theming
    const testUserRoles = ['caseworker-sscs-judge'];

    const applicationTheme = this.getUsersTheme(testUserRoles, applicationThemes);

    const {appTitle, accountNavigationItems, backgroundColor, navigationItems, showFindCase} = applicationTheme;

    console.log('applicationTheme');
    console.log(applicationTheme);
    // TODO: Check what this does.
    // this.isCaseManager = this.getIsCaseManager(this.userRoles);

    // If the User is a case manager then we get a
    // My HMCTS header ie. if they have pui-case-manager
    // as part of their name.
    this.isCaseManager = true;

    console.log(this.isCaseManager);

    // TODO: Not sure why we need this
    // const observable = this.getObservable(this.store);
    // this.subscription = this.subscribe(observable);
    this.hideNavigationListener();

    // The app header changes dependent on the User.
    this.appHeaderTitle = appTitle;

    // I guess in the future the navItems,
    // and user nav may change dependent on the User.
    this.navItems = navigationItems;
    this.userNav = accountNavigationItems;
    this.backgroundColor = backgroundColor;


    // TODO: showFindCase is not working.
    this.showFindCase = showFindCase;
  }

  // we're doing a simple way of checking what role the User has
  // the header component is checking.
  public getIsCaseManager(userRoles: string): boolean {
    return userRoles && userRoles.indexOf('pui-case-manager') !== -1;
  }

  /**
   * Hide Navigation
   *
   * We subscribe to the applications router. When the router url has a certain path we do
   * not show the navigation ie. on the Terms and Conditions page we do not show the navigation,
   * due to business requirements.
   *
   * TODO: Pass in store.
   */
  public hideNavigationListener(): void {

    const observable = this.getObservable(this.store);
    this.subscription = this.subscribe(observable);
  }

  public getObservable(store: Store<fromActions.State>): Observable<string> {
    return store.pipe(select(fromActions.getRouterUrl));
  }

  /**
   * Check if we should show navigation items.
   */
  public subscribe(observable: Observable<string>): Subscription {
    return observable.subscribe(url => {

      console.log('subscribe url');
      console.log(url);
      this.showNavItems = of(AppUtils.showNavItems(url));
      console.log('hello nav items');
      console.log(this.showNavItems);
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

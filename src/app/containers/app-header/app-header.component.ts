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
  isCaseManager: any;
  subscription: Subscription;
  showNavItems: Observable<boolean>;

  constructor(
    private store: Store<fromActions.State>,
    private cookieService: CookieService) {
  }


  // Note that all components use this app-header.component.html, and therefore all components use
  // this: exui-app-header
  ngOnInit(): void {

    // Set the userRoles
    this.userRoles = this.cookieService.get('roles');
    console.log(this.userRoles);

    this.isCaseManager = this.getIsCaseManager(this.userRoles);

    console.log(this.isCaseManager);
    const observable = this.getObservable(this.store);
    this.subscription = this.subscribe(observable);

    // So we should be able to pass a User in, and be returned the appropiate appHeaderTitle, navItems, and
    // userNav for that User.
    // maybe we want a style object that we pass through as well.
    // So an app header configuration object is passed into app header

    // The app header changes dependent on the User.
    this.appHeaderTitle = AppConstants.APP_HEADER_TITLE;

    // I guess in the future the navItems,
    // and user nav may change dependent on the User.
    this.navItems = AppConstants.NAV_ITEMS;
    this.userNav = AppConstants.USER_NAV;
    this.showFindCase = true;
  }

  // we're doing a simple way of checking what role the User has
  // the header component is checking.
  public getIsCaseManager(userRoles: string): boolean {
    return userRoles && userRoles.indexOf('pui-case-manager') !== -1;
  }

  public getObservable(store: Store<fromActions.State>): Observable<string> {
    return store.pipe(select(fromActions.getRouterUrl));
  }

  // So over here we're subscribing to the nav items
  public subscribe(observable: Observable<string>): Subscription {
    return observable.subscribe(url => {
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


  onNavigate(event): void {
    if (event === 'sign-out') {
      this.store.dispatch(new fromActions.StopIdleSessionTimeout());
      return this.store.dispatch(new fromActions.Logout());
    }
  }
}

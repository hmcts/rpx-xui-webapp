import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppConstants} from '../../app.constants';
import {NavItemsModel} from '../../models/nav-item.model';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';
import * as fromActions from '../../store';

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
export class AppHeaderComponent implements OnInit {
  navItems: NavItemsModel[];
  appHeaderTitle: AppTitleModel;
  userNav: UserNavModel;
  showFindCase: boolean;

  constructor(
    private store: Store<fromActions.State>) {
  }

  // Note that all components use this app-header.component.html, and therefore all components use
  // this: exui-app-header

  ngOnInit(): void {


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

  onNavigate(event): void {
    if (event === 'sign-out') {
      this.store.dispatch(new fromActions.StopIdleSessionTimeout());
      return this.store.dispatch(new fromActions.Logout());
    }
  }
}

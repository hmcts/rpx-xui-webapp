import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppConstants} from '../../app.constants';
import {NavItemsModel} from '../../models/nav-item.model';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';
import * as fromActions from '../../store';

@Component({
  selector: 'exui-app-header-signed-out',
  templateUrl: './app-header-signed-out.component.html',
})
export class AppHeaderSignedOutComponent implements OnInit {
  navItems: NavItemsModel[];
  appHeaderTitle: AppTitleModel;
  userNav: UserNavModel;
  showFindCase: boolean;

  constructor(
    private store: Store<fromActions.State>) {
  }

  // TODO: App Header Signed out component needs to have properties setup.
  ngOnInit(): void {
    this.appHeaderTitle = AppConstants.APP_HEADER_TITLE;
    this.navItems = AppConstants.SIGNED_OUT_NAV_ITEMS;
    this.userNav = AppConstants.SIGNED_OUT_USER_NAV;
    this.showFindCase = false;
  }
}

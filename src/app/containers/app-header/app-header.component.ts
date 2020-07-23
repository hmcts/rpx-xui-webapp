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
export class AppHeaderComponent implements OnInit {
  navItems: NavItemsModel[];
  appHeaderTitle: AppTitleModel;
  userNav: UserNavModel;
  showFindCase: boolean;

  constructor(
    private store: Store<fromActions.State>) {
  }

  ngOnInit(): void {
    this.appHeaderTitle = AppConstants.APP_HEADER_TITLE;
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

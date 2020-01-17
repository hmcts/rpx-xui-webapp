import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppConstants} from '../../app.constants';
import {NavItemsModel} from '../../models/nav-item.model';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';
import * as fromActions from '../../store';
import {first} from 'rxjs/operators';

@Component({
  selector: 'exui-app-header',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent implements OnInit {
  navItems: NavItemsModel[];
  appHeaderTitle: AppTitleModel;
  userNav: UserNavModel | [] ;

  constructor(
    private store: Store<fromActions.State>) {
  }

  ngOnInit(): void {
    this.appHeaderTitle = AppConstants.APP_HEADER_TITLE;
    this.store.select(fromActions.getRouterUrl)
      .pipe(first(value => typeof value === 'string' ))
      .subscribe(val => {
        // exclude urls from containing navigation
        const toExclude = val === '/signed-out';
        this.navItems = toExclude ? [] : AppConstants.NAV_ITEMS;
        this.userNav = toExclude ? [] : AppConstants.USER_NAV;
    });

  }

  onNavigate(event): void {
    if (event === 'sign-out') {
      return this.store.dispatch(new fromActions.Logout());
    }
  }
}

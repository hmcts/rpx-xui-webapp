import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppConstants } from '../../app.constants';
import { AppTitleModel } from '../../models/app-title.model';
import { NavItemsModel } from '../../models/nav-item.model';
import { UserNavModel } from '../../models/user-nav.model';
import * as fromActions from '../../store';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public navItems: NavItemsModel[];
  public appHeaderTitle: AppTitleModel;
  public userNav: UserNavModel;
  public componentName = 'App Component';

  constructor(
    private readonly store: Store<fromActions.State> ) {
  }

  public ngOnInit(): void {
    this.appHeaderTitle = AppConstants.APP_HEADER_TITLE;
    this.navItems = AppConstants.NAV_ITEMS;
    this.userNav = AppConstants.USER_NAV;
  }

  public onNavigate(event: any): void {
    if (event === 'sign-out') {
      return this.store.dispatch(new fromActions.Logout());
    }
  }

}

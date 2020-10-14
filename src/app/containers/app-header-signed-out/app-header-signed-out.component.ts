import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppConstants} from '../../app.constants';
import {AppTitleModel} from '../../models/app-title.model';
import {NavItemsModel} from '../../models/nav-item.model';
import {UserNavModel} from '../../models/user-nav.model';
import {Theme} from '../app-header/app-header.component';

@Component({
  selector: 'exui-app-header-signed-out',
  templateUrl: './app-header-signed-out.component.html',
})
export class AppHeaderSignedOutComponent implements OnInit {

  public navItems: NavItemsModel[];
  public appHeaderTitle: AppTitleModel;
  public userNav: UserNavModel;
  public showFindCase: boolean;
  public backgroundColor: string;
  public logoType: string;
  public logoIsUsed: boolean;

  constructor() {
  }

  public ngOnInit(): void {

    this.setAppHeaderProperties(AppConstants.SIGNED_OUT_THEME);
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
}

import { Component, OnInit } from '@angular/core';
import { ApplicationTheme } from '../../../app/models/theming.model';
import { AppConstants } from '../../app.constants';
import { AppTitleModel } from '../../models/app-title.model';
import { NavItemsModel } from '../../models/nav-item.model';
import { UserNavModel } from '../../models/user-nav.model';

@Component({
  selector: 'exui-app-header-signed-out',
  templateUrl: './app-header-signed-out.component.html',
})
export class AppHeaderSignedOutComponent implements OnInit {

  public navItems: NavItemsModel[];
  public appHeaderTitle: AppTitleModel;
  public userNav: UserNavModel;
  public backgroundColor: string;
  public logoType: string;
  public logoIsUsed: boolean;

  constructor() {
  }

  public ngOnInit(): void {

    this.setAppHeaderProperties(AppConstants.DEFAULT_USER_THEME);
  }

  /**
   * Set App Header Properties
   *
   * Set the app header properties, in one function that takes in the application theme.
   */
  public setAppHeaderProperties(applicationTheme: ApplicationTheme): void {

    const {
      appTitle,
      backgroundColor,
      logo
    } = applicationTheme;

    this.appHeaderTitle = appTitle;
    this.navItems = [];
    this.userNav = { label: '', items: [] };
    this.backgroundColor = backgroundColor;
    this.logoType = logo;
    this.logoIsUsed = logo !== 'none';
  }
}

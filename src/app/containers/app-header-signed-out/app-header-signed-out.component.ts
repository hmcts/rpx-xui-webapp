import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../app.constants';
import { ApplicationThemeLogo } from '../../enums';
import { AppTitleModel } from '../../models/app-title.model';
import { NavItemsModel } from '../../models/nav-item.model';
import { ApplicationTheme } from '../../models/theming.model';
import { UserNavModel } from '../../models/user-nav.model';

@Component({
  standalone: false,
  selector: 'exui-app-header-signed-out',
  templateUrl: './app-header-signed-out.component.html'
})
export class AppHeaderSignedOutComponent implements OnInit {
  public navItems: NavItemsModel[];
  public appHeaderTitle: AppTitleModel;
  public userNav: UserNavModel;
  public backgroundColor: string;
  public logo: string;
  public logoIsUsed: boolean;

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
    this.logo = logo;
    this.logoIsUsed = logo !== ApplicationThemeLogo.NONE;
  }
}

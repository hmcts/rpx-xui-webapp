import { AppTitleModel, NavItemsModel, UserNavModel } from '.';

export interface Theme {
  roles: string[];
  appTitle: AppTitleModel;
  navigationItems: NavItemsModel[];
  accountNavigationItems: UserNavModel;
  showFindCase: boolean;
  backgroundColor: string;
  logoIsUsed: boolean;
  logo: string;
}

export interface UserTypeRole {
  [key: string]: string[];
}

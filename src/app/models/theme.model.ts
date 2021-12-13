
import { AppTitleModel, NavItemsModel, UserNavModel } from '.';

export interface Theme {
    roles: string[];
    appTitle: AppTitleModel;
    navigationItems: NavItemsModel[];
    accountNavigationItems: UserNavModel;
    backgroundColor: string;
    logoIsUsed: boolean;
    logoType: string;
}

export interface UserTypeRole {
    [key: string]: string[];
}

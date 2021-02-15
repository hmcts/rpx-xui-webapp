import { CookieService } from 'ngx-cookie';

import { AppConstants } from './app.constants';
import { NavItemsModel } from './models/nav-item.model';


export class AppUtils {

  public static getEnvironment(url: string): string {
    const regex = 'pr-|localhost|aat|demo|ithc|perftest';
    const matched = url.match(regex);


    if (matched && matched[0]) {
      switch (matched[0]) {
        case AppConstants.ENVIRONMENT_NAMES.aat:
        case AppConstants.ENVIRONMENT_NAMES.localhost:
        case AppConstants.ENVIRONMENT_NAMES.pr:
          return AppConstants.ENVIRONMENT_NAMES.aat;
        case AppConstants.ENVIRONMENT_NAMES.demo:
          return AppConstants.ENVIRONMENT_NAMES.demo;
        case AppConstants.ENVIRONMENT_NAMES.ithc:
          return AppConstants.ENVIRONMENT_NAMES.ithc;
        case AppConstants.ENVIRONMENT_NAMES.perftest:
          return AppConstants.ENVIRONMENT_NAMES.perftest;
      }
    }
    return AppConstants.ENVIRONMENT_NAMES.prod;
  }

  /**
   * showNavItems
   *
   * Takes in the url. If the url is 'accept-terms-and-conditions' or 'terms-and-conditions' we do not
   * show the navItems.
   *
   * @param url - '/cases'
   */
  public static showNavItems(url: string): boolean {
    return url.indexOf('accept-terms-and-conditions') < 0 && url.indexOf('terms-and-conditions') < 0;
  }

  public static isRoleExistsForUser(roleName: string, cookieService: CookieService, cookiename: string = 'roles'): boolean {
    const userRoles = cookieService.get(cookiename);
    return userRoles && userRoles.indexOf(roleName) >= 0;
  }

  /**
   * Remove Json Prefix from cookie string
   *
   * On the Node layer Express.js when setting cookies prefixes Json strings with j:.
   *
   * We currently do not want to refactor the whole application, to remove the j:,
   * as the user roles are being used in a couple of places already.
   *
   * Therefore we need to remove the j: before deserialising the user roles string into an Array.
   */
  public static removeJsonPrefix(userRolesFromCookie: string): string {
    return userRolesFromCookie.replace('j:', '');
  }

  /**
   * Get Cookie Roles as Array
   *
   * @param userRoles - '["pui-organisation-manager","caseworker-publiclaw", "caseworker"]'
   * @return - ['pui-organisation-manager', 'caseworker-publiclaw', 'caseworker', 'etc...']
   */
  public static getCookieRolesAsArray(userRoles: string): string[] {
    return JSON.parse(userRoles);
  }

  /**
   * Set the active property on the navigation items.
   */
  public static setActiveLink(items: NavItemsModel[], currentUrl: string): NavItemsModel[] {
    return items.map(item => {
      return {
        ...item,
        active: item.href === currentUrl
      };
    });
  }

  /**
   * Add padding
   *
   * @param num - '1'
   * @param padNum - '2'
   * @return - 01
   */
  public static pad(num: string, padNum = 2): string {
    const val = (num !== undefined && num !== null) ? num.toString() : '';
    return val.length >= padNum ? val : new Array(padNum - val.length + 1).join('0') + val;
  }
}

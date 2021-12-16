import { ActivatedRouteSnapshot } from '@angular/router';
import { FilterPersistence } from '@hmcts/rpx-xui-common-lib';
import { AppConstants, JUDICIAL_ROLE_LIST, LEGAL_OPS_ROLE_LIST } from './app.constants';
import { Theme, UserTypeRole } from './models/theme.model';
import { NavigationItem } from './models/theming.model';
import { UserDetails, UserRole } from './models/user-details.model';

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
        default:
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
  public static setActiveLink(items: NavigationItem[], currentUrl: string): NavigationItem[] {
    let fullUrl = false;
    let matchingUrl = '';
    [fullUrl, matchingUrl] = AppUtils.checkTabs(items, currentUrl);
    return items.map(item => {
      return {
        ...item,
        active: fullUrl ? item.href === currentUrl : item.href === matchingUrl
      };
    });
  }

  /**
   * Tab logic - Works out which tab needs to be selected via the current tab urls and the given url
   * @param items - the tab urls
   * @param currentUrl - the url being tested
   * @return - a list including boolean stating whether the full url is given or the similar matching url
   */
  public static checkTabs(items: NavigationItem[], currentUrl: string): any[] {
    let fullUrl = false;
    let maxLength = 0;
    let matchingUrl = '';
    let checkHrefs = [];
    for (const checkItem of items) {
      // allow checking of /tasks urls properly
      checkHrefs = checkItem.href === '/tasks' ? ['/tasks/list', '/tasks/available'] : [checkItem.href];
      fullUrl = AppUtils.isFullUrl(checkItem.href, currentUrl);
      if (fullUrl) {
        break;
      }
      if (checkItem.href === '/cases') {
        // if cases we need an equivalence to stop confusion in tab selection
        continue;
      }
      // if the href partly matches, find the largest href for which the url partly matches
      if (checkHrefs.some(url => currentUrl.indexOf(url) === 0)) {
        if (maxLength < checkItem.href.length) {
          maxLength = checkItem.href.length;
          matchingUrl = checkItem.href;
        }
      }
    }
    return [fullUrl, matchingUrl];
  }

  /**
   * Check if item's href is equivalent to the current url
   * @param href - one of the tab urls
   * @param currentUrl - the url being tested
   * @return - boolean value
   */
  public static isFullUrl(href: string, currentUrl: string): boolean {
    return href === currentUrl || currentUrl === '/cases/case-search';
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

  /**
   * Get the data at the lowest child element of the activated route.
   * @param activatedRoute The starting (parent) route to use.
   */
  public static getRouteData(activatedRoute: ActivatedRouteSnapshot): any {
    let child = activatedRoute;
    while (child && child.firstChild) {
      child = child.firstChild;
    }
    return child ? child.data : null;
  }

  public static getFeatureToggledUrl(isFeatureEnabled: boolean, workAllocationUrl: string): string {
    return isFeatureEnabled ? workAllocationUrl : null;
  }

  public static isLegalOpsOrJudicial(userRoles: string[]): UserRole {
    if (userRoles.some(userRole => LEGAL_OPS_ROLE_LIST.some(role => role === userRole))) {
      return UserRole.LegalOps;
    } else if (userRoles.some(userRole => JUDICIAL_ROLE_LIST.some(role => role === userRole))) {
      return UserRole.Judicial;
    }
    return null;
  }

  public static convertDomainToLabel(userRole: string): string {
    switch (userRole) {
      case UserRole.LegalOps: {
        userRole = 'Legal Ops';
        break;
      }
      case UserRole.Judicial: {
        userRole = 'Judicial';
        break;
      }
      case UserRole.Admin: {
        userRole = 'Admin';
        break;
      }
      default:
    }
    return userRole;
  }


  public static getFilterPersistenceByRoleType(userDetails: UserDetails): FilterPersistence {
    const isLegalOpsOrJudicialRole = AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles);
    const roleType = AppUtils.convertDomainToLabel(isLegalOpsOrJudicialRole);
    switch (roleType) {
      case 'LegalOps':
        return 'session';
      case 'Judicial':
        return 'local';
      default:
        return 'session';
    }
  }

  public static setThemeBasedOnUserType(userType: string, theme: Theme) {
    switch (userType) {
      case 'Judicial':
        theme.appTitle.name = 'Judicial Case Manager';
        theme.backgroundColor = '#8d0f0e';
        theme.logoType = 'judicial';
        break;
      case 'LegalOps':
        theme.appTitle.name = 'Manage cases';
        theme.backgroundColor = '#202020';
        theme.logoType = '';
        break;
      case 'Solicitor':
        theme.appTitle.name = 'Manage cases';
        theme.backgroundColor = '#202020';
        theme.logoType = 'myhmcts';
        break;
      default:
    }
  }

  public static getUserType(userRoles: string[], userTypeRoles: UserTypeRole): string {
    if (userRoles.some(userRole => userTypeRoles.solicitor && userTypeRoles.solicitor.includes(userRole))) {
      return 'Solicitor';
    } else if (userRoles.some(userRole => userTypeRoles.judicial && userTypeRoles.judicial.includes(userRole))) {
      return 'Judicial';
    } else {
      return 'LegalOps';
    }
  }
}

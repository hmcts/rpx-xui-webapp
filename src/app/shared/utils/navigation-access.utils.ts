import { AppConstants } from '../../app.constants';
import { FlagDefinition, NavigationItem } from '../../models/theming.model';
import { AppUtils } from '../../app-utils';
import { UserDetails, WAVerificationModel } from '../../models';

export function isNavigationItemVisible(
  item: NavigationItem,
  userRoles: string[] = [],
  menuFlags: Record<string, string | boolean> = AppConstants.MENU_FLAGS
): boolean {
  return !!item && filterNavigationItemsByAccess([item], userRoles, menuFlags).length > 0;
}

export interface NavigationRoleFilterOptions {
  userDetails?: UserDetails;
  waVerification?: WAVerificationModel;
  onRoleMatched?: (role: string, item: NavigationItem) => void;
}

export function filterNavigationItemsByRoles(
  items: NavigationItem[] = [],
  userRoles: string[] = [],
  options: NavigationRoleFilterOptions = {}
): NavigationItem[] {
  const roles = options.userDetails?.userInfo?.roles ?? userRoles ?? [];
  const isRoleSupported = (item: NavigationItem, role: string, logMatch = false): boolean => {
    const supported =
      options.userDetails && options.waVerification
        ? AppUtils.checkRoleIsSupported(options.waVerification, role, options.userDetails)
        : roles.includes(role);

    if (supported && logMatch) {
      options.onRoleMatched?.(role, item);
    }

    return supported;
  };
  const roleFilteredItems = (items || []).filter((item) =>
    item.roles?.length > 0 ? item.roles.some((role) => isRoleSupported(item, role, true)) : true
  );

  return roleFilteredItems.filter((item) =>
    item.notRoles?.length > 0 ? item.notRoles.every((role) => !isRoleSupported(item, role)) : true
  );
}

export function filterNavigationItemsByFlags(
  items: NavigationItem[] = [],
  menuFlags: Record<string, string | boolean> = AppConstants.MENU_FLAGS
): NavigationItem[] {
  items = items || [];
  return items
    .filter((item) => {
      // If item.flags exists, check every flag against AppConstants.MENU_FLAGS
      if (item.flags?.length > 0) {
        return item.flags.every((flag) => {
          const flagName = isPlainFlag(flag) ? flag : flag.flagName;
          const flagValue = isPlainFlag(flag) ? menuFlags[flagName] : menuFlags[flagName] === flag.value;
          return flagValue;
        });
      }

      return true;
    })
    .filter((item) =>
      item.notFlags?.length > 0
        ? item.notFlags.every((flag) => {
            const flagName = isPlainFlag(flag) ? flag : flag.flagName;
            const flagValue = isPlainFlag(flag) ? menuFlags[flagName] : menuFlags[flagName] !== flag.value;
            return !flagValue;
          })
        : true
    );
}

export function filterNavigationItemsByAccess(
  items: NavigationItem[] = [],
  userRoles: string[] = [],
  menuFlags: Record<string, string | boolean> = AppConstants.MENU_FLAGS,
  roleFilterOptions: NavigationRoleFilterOptions = {}
): NavigationItem[] {
  return filterNavigationItemsByFlags(filterNavigationItemsByRoles(items, userRoles, roleFilterOptions), menuFlags);
}

function isPlainFlag(flag: FlagDefinition): flag is string {
  return !Object.prototype.hasOwnProperty.call(flag, 'flagName');
}

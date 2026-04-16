import { AppConstants } from '../../app.constants';
import { FlagDefinition, NavigationItem } from '../../models/theming.model';

export function isNavigationItemVisible(
  item: NavigationItem,
  userRoles: string[] = [],
  menuFlags: Record<string, string | boolean> = AppConstants.MENU_FLAGS
): boolean {
  return !!item && filterNavigationItemsByAccess([item], userRoles, menuFlags).length > 0;
}

export function filterNavigationItemsByRoles(items: NavigationItem[] = [], userRoles: string[] = []): NavigationItem[] {
  const roles = userRoles ?? [];
  const roleFilteredItems = (items || []).filter((item) =>
    item.roles && item.roles.length > 0 ? item.roles.some((role) => roles.includes(role)) : true
  );

  return roleFilteredItems.filter((item) =>
    item.notRoles && item.notRoles.length > 0 ? item.notRoles.every((role) => !roles.includes(role)) : true
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
      if (item.flags && item.flags.length > 0) {
        return item.flags.every((flag) => {
          const flagName = isPlainFlag(flag) ? flag : flag.flagName;
          const flagValue = isPlainFlag(flag) ? menuFlags[flagName] : menuFlags[flagName] === flag.value;
          return flagValue;
        });
      }

      return true;
    })
    .filter((item) =>
      item.notFlags && item.notFlags.length > 0
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
  menuFlags: Record<string, string | boolean> = AppConstants.MENU_FLAGS
): NavigationItem[] {
  return filterNavigationItemsByFlags(filterNavigationItemsByRoles(items, userRoles), menuFlags);
}

function isPlainFlag(flag: FlagDefinition): flag is string {
  return !flag.hasOwnProperty('flagName');
}

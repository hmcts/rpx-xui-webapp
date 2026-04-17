import { NavigationItem } from '../../models/theming.model';
import {
  filterNavigationItemsByAccess,
  filterNavigationItemsByFlags,
  filterNavigationItemsByRoles,
  isNavigationItemVisible,
} from './navigation-access.utils';

describe('navigation access utils', () => {
  const menuFlags = {
    enabledFlag: true,
    disabledFlag: false,
    releaseFlag: 'release-2',
    otherReleaseFlag: 'release-1',
  };

  it('should allow a navigation item when the user has a matching role', () => {
    const item: NavigationItem = {
      href: '/work/my-work/list',
      active: false,
      roles: ['role-a', 'role-b'],
      text: 'My work',
    };

    expect(isNavigationItemVisible(item, ['role-b'], menuFlags)).toBeTrue();
  });

  it('should deny a navigation item when the user has a blocked role', () => {
    const item: NavigationItem = {
      href: '/work/my-work/list',
      active: false,
      notRoles: ['blocked-role'],
      text: 'My work',
    };

    expect(isNavigationItemVisible(item, ['blocked-role'], menuFlags)).toBeFalse();
  });

  it('should allow a navigation item with no role restrictions', () => {
    const item: NavigationItem = {
      href: '/work/my-work/list',
      active: false,
      text: 'My work',
    };

    expect(isNavigationItemVisible(item, [], menuFlags)).toBeTrue();
  });

  it('should enforce required and excluded flags', () => {
    const visibleItem: NavigationItem = {
      href: '/cases',
      active: false,
      flags: ['enabledFlag', { flagName: 'releaseFlag', value: 'release-2' }],
      notFlags: ['disabledFlag'],
      text: 'Case list',
    };
    const hiddenItem: NavigationItem = {
      href: '/search',
      active: false,
      flags: ['enabledFlag', { flagName: 'releaseFlag', value: 'release-3' }],
      text: 'Search',
    };

    expect(isNavigationItemVisible(visibleItem, [], menuFlags)).toBeTrue();
    expect(isNavigationItemVisible(hiddenItem, [], menuFlags)).toBeFalse();
  });

  it('should filter navigation items by roles and excluded roles', () => {
    const items: NavigationItem[] = [
      {
        href: '/work/my-work/list',
        active: false,
        roles: ['matched-role'],
        text: 'My work',
      },
      {
        href: '/work/all-work/tasks',
        active: false,
        roles: ['other-role'],
        text: 'All work',
      },
      {
        href: '/search',
        active: false,
        notRoles: ['matched-role'],
        text: 'Search',
      },
    ];

    expect(filterNavigationItemsByRoles(items, ['matched-role'])).toEqual([items[0]]);
  });

  it('should handle omitted and nullish role inputs defensively', () => {
    const unrestrictedItem: NavigationItem = {
      href: '/cases',
      active: false,
      text: 'Case list',
    };
    const restrictedItem: NavigationItem = {
      href: '/work/my-work/list',
      active: false,
      roles: ['matched-role'],
      text: 'My work',
    };

    expect(filterNavigationItemsByRoles()).toEqual([]);
    expect(filterNavigationItemsByRoles(null as unknown as NavigationItem[], ['matched-role'])).toEqual([]);
    expect(filterNavigationItemsByRoles([unrestrictedItem, restrictedItem], null as unknown as string[])).toEqual([unrestrictedItem]);
  });

  it('should filter navigation items by required and excluded flags', () => {
    const items: NavigationItem[] = [
      {
        href: '/cases',
        active: false,
        flags: ['enabledFlag', { flagName: 'releaseFlag', value: 'release-2' }],
        notFlags: ['disabledFlag'],
        text: 'Case list',
      },
      {
        href: '/search',
        active: false,
        flags: ['disabledFlag'],
        text: 'Search',
      },
      {
        href: '/work/my-work/list',
        active: false,
        notFlags: ['enabledFlag'],
        text: 'My work',
      },
    ];

    expect(filterNavigationItemsByFlags(items, menuFlags)).toEqual([items[0]]);
  });

  it('should handle omitted and null items when filtering by flags', () => {
    const item: NavigationItem = {
      href: '/cases',
      active: false,
      text: 'Case list',
    };

    expect(filterNavigationItemsByFlags()).toEqual([]);
    expect(filterNavigationItemsByFlags([item])).toEqual([item]);
    expect(filterNavigationItemsByFlags(null as unknown as NavigationItem[], menuFlags)).toEqual([]);
  });

  it('should filter navigation items using mixed role and flag access rules', () => {
    const items: NavigationItem[] = [
      {
        href: '/work/my-work/list',
        active: false,
        roles: ['matched-role'],
        flags: ['enabledFlag'],
        text: 'My work',
      },
      {
        href: '/work/all-work/tasks',
        active: false,
        roles: ['matched-role'],
        flags: ['disabledFlag'],
        text: 'All work',
      },
      {
        href: '/search',
        active: false,
        notRoles: ['matched-role'],
        text: 'Search',
      },
    ];

    expect(filterNavigationItemsByAccess(items, ['matched-role'], menuFlags)).toEqual([items[0]]);
  });

  it('should default access filtering inputs when arguments are omitted', () => {
    const item: NavigationItem = {
      href: '/cases',
      active: false,
      text: 'Case list',
    };

    expect(filterNavigationItemsByAccess()).toEqual([]);
    expect(filterNavigationItemsByAccess([item])).toEqual([item]);
  });

  it('should allow visible navigation items when optional visibility args are omitted', () => {
    const item: NavigationItem = {
      href: '/cases',
      active: false,
      text: 'Case list',
    };

    expect(isNavigationItemVisible(item)).toBeTrue();
    expect(isNavigationItemVisible(null as unknown as NavigationItem)).toBeFalse();
  });
});

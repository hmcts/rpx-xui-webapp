import { initialMockState } from '../role-access/testing/app-initial-state.mock';
import { AppUtils } from './app-utils';
import { AppConstants, LEGAL_OPS_ROLE_LIST } from './app.constants';
import { Theme } from './models/theme.model';
import { NavigationItem } from './models/theming.model';
import { UserRole } from './models/user-details.model';

describe('getEnvironment', () => {

  it('should return the prod environment for a blank url.', () => {
    expect(AppUtils.getEnvironment('')).toEqual(AppConstants.ENVIRONMENT_NAMES.prod);
  });

  it('should return the aat environment for a aat url.', () => {
    expect(AppUtils.getEnvironment('https://xui-webapp-aat.service.core-compute-aat.internal')).toEqual(
      AppConstants.ENVIRONMENT_NAMES.aat);
  });

  it('should return the aat environment for a localhost url.', () => {
    expect(AppUtils.getEnvironment('https://localhost:3000')).toEqual(
      AppConstants.ENVIRONMENT_NAMES.aat);
  });

  it('should return the aat environment for a PR url.', () => {
    expect(AppUtils.getEnvironment('https://xui-mo-webapp-pr-84.service.core-compute-preview.internal')).toEqual(
      AppConstants.ENVIRONMENT_NAMES.aat);
  });

  it('should return the demo environment for a demo url.', () => {
    expect(AppUtils.getEnvironment('https://xui-mo-webapp-demo.service.core-compute-demo.internal')).toEqual(
      AppConstants.ENVIRONMENT_NAMES.demo);
  });

  it('should return the ithc environment for a ithc url.', () => {
    expect(AppUtils.getEnvironment('ithc')).toEqual(
      AppConstants.ENVIRONMENT_NAMES.ithc);
  });

  it('should return the perftest environment for a perftest url.', () => {
    expect(AppUtils.getEnvironment('perftest')).toEqual(
      AppConstants.ENVIRONMENT_NAMES.perftest);
  });

});

describe('showNavItems', () => {

  it('should show only appropriate navigation items', () => {
    expect(AppUtils.showNavItems('SomeItems')).toEqual(true);
    expect(AppUtils.showNavItems('accept-terms-and-conditions')).toEqual(false);
  });

});

describe('removeJsonPrefix', () => {

  it('should take in the User Roles string from cookie and return the string without the j: prefix.', () => {

    const userRolesString = 'j:["pui-organisation-manager","caseworker-publiclaw",' +
      '"caseworker-divorce-financialremedy-solicitor","caseworker"]';

    const expectedUserRolesString = userRolesString.replace('j:', '');

    expect(AppUtils.removeJsonPrefix(userRolesString)).toEqual(expectedUserRolesString);
  });
});

describe('getCookieRolesAsArray', () => {

  it('should take in the User Roles string (which comes from the cookie), and return an Array of User Roles.', () => {

    const userRoles = '["pui-organisation-manager","caseworker-publiclaw",' +
      '"caseworker-divorce-financialremedy-solicitor","caseworker"]';

    expect(AppUtils.getCookieRolesAsArray(userRoles)).toEqual([
      'pui-organisation-manager',
      'caseworker-publiclaw',
      'caseworker-divorce-financialremedy-solicitor',
      'caseworker',
    ]);
  });
});

describe('setActiveLink', () => {

  it('should correctly flag an item as being active', () => {
    const ITEMS: NavigationItem[] = [
      { href: '/a', active: false, text: 'A' },
      { href: '/b', active: false, text: 'B' },
      { href: '/c', active: false, text: 'C' }
    ];
    const CURRENT_URL: string = '/a';
    const result = AppUtils.setActiveLink(ITEMS, CURRENT_URL);
    expect(result.length).toEqual(ITEMS.length);
    expect(result[0].active).toEqual(true);
    expect(result[1].active).toEqual(false);
    expect(result[2].active).toEqual(false);

    // Also check that it hasn't impacted our original ITEMS.
    expect(ITEMS[0].active).toEqual(false);
  });

  it('should correctly deactivate a previously active item', () => {
    const ITEMS: NavigationItem[] = [
      { href: '/a', active: true, text: 'A' },
      { href: '/b', active: false, text: 'B' },
      { href: '/c', active: false, text: 'C' }
    ];
    const CURRENT_URL: string = '/b';
    const result = AppUtils.setActiveLink(ITEMS, CURRENT_URL);
    expect(result.length).toEqual(ITEMS.length);
    expect(result[0].active).toEqual(false);
    expect(result[1].active).toEqual(true);
    expect(result[2].active).toEqual(false);

    // Also check that it hasn't impacted our original ITEMS.
    expect(ITEMS[0].active).toEqual(true);
    expect(ITEMS[1].active).toEqual(false);
  });

  it('should correctly deactivate all items when the URL matches none of them', () => {
    const ITEMS: NavigationItem[] = [
      { href: '/a', active: true, text: 'A' },
      { href: '/b', active: false, text: 'B' },
      { href: '/c', active: false, text: 'C' }
    ];
    const CURRENT_URL: string = '/d';
    const result = AppUtils.setActiveLink(ITEMS, CURRENT_URL);
    expect(result.length).toEqual(ITEMS.length);
    expect(result[0].active).toEqual(false);
    expect(result[1].active).toEqual(false);
    expect(result[2].active).toEqual(false);

    // Also check that it hasn't impacted our original ITEMS.
    expect(ITEMS[0].active).toEqual(true);
  });

  it('add padding', () => {
    expect(AppUtils.pad('1')).toEqual('01');
    expect(AppUtils.pad('1', 3)).toEqual('001');
  });

  const mockItems: NavigationItem[] = [
    // fill with actual mock data
    { href: '/tasks', active: false, text: 'A' },
    { href: '/tasks/task-manager', active: false, text: 'B' },
    { href: '/cases', active: false, text: 'C' },
    { href: '/cases/case-filter', active: false, text: 'D' }
  ];

  it ('should check the tabs correctly', () => {
    // verify matching url returns true
    expect(AppUtils.checkTabs(mockItems, '/tasks/task-manager')).toEqual([ true, '' ]);
    // verify matching url given as longest matching href
    expect(AppUtils.checkTabs(mockItems, '/tasks/task-manager/random-parameter')).toEqual([ false, '/tasks/task-manager' ]);
    // verify case-search returns true
    expect(AppUtils.checkTabs(mockItems, '/cases/case-search')).toEqual([ true, '' ]);
    // verify tasks matches (should this ever be the case)
    expect(AppUtils.checkTabs(mockItems, '/tasks')).toEqual([ true, '' ]);
    // verify the internal task lists set the tab correctly
    expect(AppUtils.checkTabs(mockItems, '/tasks/list')).toEqual([ false, '/tasks']);
    expect(AppUtils.checkTabs(mockItems, '/tasks/available')).toEqual([ false, '/tasks']);
    // verify tab not set for action page within tasks and any additional url snippet for cases
    expect(AppUtils.checkTabs(mockItems, '/tasks/assign')).toEqual([ false, '']);
    expect(AppUtils.checkTabs(mockItems, '/cases/random-parameter')).toEqual([ false, '']);

  });

  it('should correctly set the fullUrl value', () => {
    // note: mockItems[0].href = '/tasks'
    expect(AppUtils.isFullUrl(mockItems[0].href, '/tasks')).toBeTruthy();
    expect(AppUtils.isFullUrl(mockItems[0].href, '/tasks/task-manager')).toBeFalsy();
    expect(AppUtils.isFullUrl(mockItems[0].href, '/cases/case-search')).toBeTruthy();
    expect(AppUtils.isFullUrl(mockItems[0].href, '/task')).toBeFalsy();
  });
});

describe('getFeatureToggledUrl', () => {

  it('url when feature is off', () => {
    const url = AppUtils.getFeatureToggledUrl(false, 'someUrl');
    expect(url).toBeNull();
  });

  it('url when feature is on', () => {
    const url = AppUtils.getFeatureToggledUrl(true, 'someUrl');
    expect(url).toEqual('someUrl');
  });
});

describe('isLegalOpsOrJudicial', () => {

  it('should return legal ops role if user has any legal ops role', () => {
    const isLegalOpsOrJudicial = AppUtils.isLegalOpsOrJudicial(['caseworker-ia-caseofficer']);
    expect(isLegalOpsOrJudicial).toBe(UserRole.LegalOps);
  });

  it('should return judicial role if user has any judicial role', () => {
    const isLegalOpsOrJudicial = AppUtils.isLegalOpsOrJudicial(['caseworker-ia-iacjudge']);
    expect(isLegalOpsOrJudicial).toBe(UserRole.Judicial);
  });

  it('should return null if user has no judicial or legal ops role', () => {
    const isLegalOpsOrJudicial = AppUtils.isLegalOpsOrJudicial(['caseworker-ia']);
    expect(isLegalOpsOrJudicial).toBeNull();
  });

  it('should return the judicial domain from the user list', () => {
    const role = AppUtils.convertDomainToLabel(UserRole.Judicial);
    expect(role).toBe('Judicial');
  });

  it('should return the legal ops domain from the user list', () => {
    const role = AppUtils.convertDomainToLabel(UserRole.LegalOps);
    expect(role).toBe('Legal Ops');
  });

  it('should return the admin domain from the user list', () => {
    const role = AppUtils.convertDomainToLabel(UserRole.Admin);
    expect(role).toBe('Admin');
  });
});

describe('setThemeBasedOnUserType', () => {
  it('Judicial User', () => {
    const theme = { appTitle: {}} as Theme;
    AppUtils.setThemeBasedOnUserType('Judicial', theme);
    expect(theme.appTitle.name).toEqual('Judicial Case Manager');
    expect(theme.backgroundColor).toEqual( '#8d0f0e');
    expect(theme.logoType).toEqual('judicial');
  });

  it('LegalOps User', () => {
    const theme = { appTitle: {}} as Theme;
    AppUtils.setThemeBasedOnUserType('LegalOps', theme);
    expect(theme.appTitle.name).toEqual('Manage cases');
    expect(theme.backgroundColor).toEqual('#202020');
    expect(theme.logoType).toEqual('');
  });

  it('Solicitor User', () => {
    const theme = { appTitle: {}} as Theme;
    AppUtils.setThemeBasedOnUserType('Solicitor', theme);
    expect(theme.appTitle.name).toEqual('Manage cases');
    expect(theme.backgroundColor).toEqual('#202020');
    expect(theme.logoType).toEqual('myhmcts');
  });
});

describe('getUserType', () => {
  it('Solicitor', () => {
    const userRole = { solicitor: ['role1'] };
    const userType = AppUtils.getUserType(['role1', 'role3'], userRole);
    expect(userType).toEqual('Solicitor');
  });

  it('Judicial', () => {
    const userRole = { judicial: ['role1'] };
    const userType = AppUtils.getUserType(['role1', 'role3'], userRole);
    expect(userType).toEqual('Judicial');
  });

  it('LegalOps', () => {
    const userRole = { legalOps: ['role1'] };
    const userType = AppUtils.getUserType(['role1', 'role3'], userRole);
    expect(userType).toEqual('LegalOps');
  });
});


describe('getFilterPersistenceByRoleType', () => {
  it('should return local persistence if user is a judicial user', () => {
    const persistence = AppUtils.getFilterPersistenceByRoleType(initialMockState.appConfig.userDetails);
    expect(persistence).toEqual('local');
  });

  it('should return local persistence if user is a legalOps user', () => {
    const userDetails = initialMockState.appConfig.userDetails;
    userDetails.userInfo.roles = LEGAL_OPS_ROLE_LIST;
    const persistence = AppUtils.getFilterPersistenceByRoleType(userDetails);
    expect(persistence).toEqual('session');
  });
});

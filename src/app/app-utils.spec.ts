import {NavItemsModel} from './models/nav-item.model';
import { AppUtils } from './app-utils';
import { AppConstants } from './app.constants';

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

describe('isRoleExistsForUser', () => {

  it('should correctly indicate when a role exists for a user', () => {
    const mockService = jasmine.createSpyObj('mockService', ['get']);
    mockService.get.and.returnValue('role1,role2,role3');
    const roleExists = AppUtils.isRoleExistsForUser('role1', mockService);
    expect(roleExists).toEqual(true);
  });

  it('should correctly indicate when a role does not exist for a user', () => {
    const mockService = jasmine.createSpyObj('mockService', ['get']);
    mockService.get.and.returnValue('role1,role2,role3');
    const roleExists = AppUtils.isRoleExistsForUser('role4', mockService);
    expect(roleExists).toEqual(false);
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
    const ITEMS: NavItemsModel[] = [
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
    const ITEMS: NavItemsModel[] = [
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
    const ITEMS: NavItemsModel[] = [
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

});

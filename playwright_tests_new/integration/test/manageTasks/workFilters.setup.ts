import type { Page } from '@playwright/test';
import { applySessionCookies } from '../../helpers';
import { buildHearingsUserDetailsMock } from '../../mocks/hearings.mock';

export const workFiltersUserIdentifier = 'STAFF_ADMIN';
export const workFiltersUserId = 'staff-admin-integration-user';
export const workFiltersSupportedJurisdictions = ['IA', 'CIVIL'];
export const workFiltersSupportedJurisdictionDetails = [
  { serviceId: 'CIVIL', serviceName: 'Civil' },
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
];

export const workFiltersDefaultLocations = [
  {
    epimms_id: '765324',
    site_name: 'Taylor House',
    region_id: '1',
    region: 'London',
    postcode: 'EC1N 2LS',
    court_address: '88 Rosebery Avenue',
    is_case_management_location: 'Y',
    is_hearing_location: 'Y',
  },
  {
    epimms_id: '231596',
    site_name: 'Birmingham Civil and Family Justice Centre',
    region_id: '2',
    region: 'Midlands',
    postcode: 'B4 6DS',
    court_address: '33 Bull Street',
    is_case_management_location: 'Y',
    is_hearing_location: 'Y',
  },
];

export async function setupWorkFiltersUser(page: Page): Promise<void> {
  await applySessionCookies(page, workFiltersUserIdentifier);

  const userDetails = buildHearingsUserDetailsMock(['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-civil']);

  userDetails.userInfo.id = workFiltersUserId;
  userDetails.userInfo.uid = workFiltersUserId;
  userDetails.userInfo.roleCategory = 'LEGAL_OPERATIONS';
  userDetails.roleAssignmentInfo = [
    { jurisdiction: 'IA', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '765324' },
    { jurisdiction: 'CIVIL', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '231596' },
  ];

  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
  }, userDetails.userInfo);

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });
}

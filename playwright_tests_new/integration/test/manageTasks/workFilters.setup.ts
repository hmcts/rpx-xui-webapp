import type { Page } from '@playwright/test';
import { applySessionCookies } from '../../helpers';
import { buildHearingsUserDetailsMock } from '../../mocks/hearings.mock';
import { extractUserIdFromCookies } from '../../utils/extractUserIdFromCookies';
import {
  workFiltersIaSearchLocation,
  workFiltersIaSearchLocationSecondary,
  workFiltersSscsSearchLocation,
  workFiltersSscsSearchLocationSecondary,
} from '../../mocks/workFiltersLocationSearch.mock';

export const workFiltersUserIdentifier = 'STAFF_ADMIN';
export const workFiltersUserId = 'staff-admin-integration-user';
export const workFiltersSupportedJurisdictions = ['IA', 'CIVIL'];
export const workFiltersSupportedJurisdictionDetails = [
  { serviceId: 'CIVIL', serviceName: 'Civil' },
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
];
export const workFiltersLocationSearchSupportedJurisdictions = ['IA', 'SSCS'];
export const workFiltersLocationSearchSupportedJurisdictionDetails = [
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
  { serviceId: 'SSCS', serviceName: 'Social Security and Child Support' },
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

export type WorkFilterRoleAssignment = {
  jurisdiction: string;
  substantive: string;
  roleType: string;
  baseLocation?: string;
};

type SetupWorkFiltersUserOptions = {
  roles?: string[];
  roleAssignments?: WorkFilterRoleAssignment[];
};

const workFiltersKnownLocations = [
  ...workFiltersDefaultLocations,
  workFiltersIaSearchLocation,
  workFiltersSscsSearchLocation,
  workFiltersIaSearchLocationSecondary,
  workFiltersSscsSearchLocationSecondary,
];

export async function setupWorkFiltersUser(page: Page, options: SetupWorkFiltersUserOptions = {}): Promise<string> {
  const session = await applySessionCookies(page, workFiltersUserIdentifier);
  const sessionUserId = extractUserIdFromCookies(session.cookies) ?? workFiltersUserId;

  const userDetails = buildHearingsUserDetailsMock(
    options.roles ?? ['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-civil']
  );

  userDetails.userInfo.id = sessionUserId;
  userDetails.userInfo.uid = sessionUserId;
  userDetails.userInfo.roleCategory = 'LEGAL_OPERATIONS';
  userDetails.roleAssignmentInfo = options.roleAssignments ?? [
    { jurisdiction: 'IA', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '765324' },
    { jurisdiction: 'CIVIL', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '231596' },
  ];

  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
  }, userDetails.userInfo);

  await page.unroute('**/api/user/details*').catch(() => undefined);
  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.unroute('**/api/locations/getLocationsById*').catch(() => undefined);
  await page.route('**/api/locations/getLocationsById*', async (route) => {
    const requestBody = route.request().postDataJSON() as { locations?: Array<{ id?: string }> } | undefined;
    const requestedLocationIds = (requestBody?.locations ?? []).map((location) => location.id).filter(Boolean);

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(workFiltersKnownLocations.filter((location) => requestedLocationIds.includes(location.epimms_id))),
    });
  });

  return sessionUserId;
}

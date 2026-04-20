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

export type LocationSearchRequestLocation = {
  id?: string;
  locationId?: string;
  regionId?: string;
};

export type LocationSearchRequestUserLocation = {
  service?: string;
  serviceCode?: string;
  locations?: LocationSearchRequestLocation[];
};

export type WorkFiltersLocationSearchRequestBody = {
  searchTerm?: string;
  serviceIds?: string;
  userLocations?: LocationSearchRequestUserLocation[];
};

export type LocationSearchScenario = {
  scenarioName: string;
  roleAssignments: WorkFilterRoleAssignment[];
  expectedServiceCodes: string[];
  expectedInitialLocations: string[];
  expectedSearchResults: string[];
  expectedFullLocationServiceCodes?: string[];
};

export type LocationSearchRequest = {
  searchTerm: string;
  serviceIds: string[];
  userLocations: LocationSearchRequestUserLocation[];
  userLocationServices: string[];
};

type SetupWorkFiltersUserOptions = {
  roles?: string[];
  roleAssignments?: WorkFilterRoleAssignment[];
};

export const workFiltersIaSearchLocation = {
  epimms_id: '20001',
  site_name: 'IA Court Centre 1',
  region_id: '1',
  region: 'London',
  postcode: 'EC1A 1AA',
  court_address: '1 IA Court Street',
  is_case_management_location: 'Y',
  is_hearing_location: 'Y',
};

export const workFiltersSscsSearchLocation = {
  epimms_id: '30001',
  site_name: 'SSCS Court Centre 1',
  region_id: '2',
  region: 'Midlands',
  postcode: 'B1 1AA',
  court_address: '1 SSCS Court Street',
  is_case_management_location: 'Y',
  is_hearing_location: 'Y',
};

export const workFiltersIaSearchLocationSecondary = {
  epimms_id: '20002',
  site_name: 'IA Court Centre 2',
  region_id: '1',
  region: 'London',
  postcode: 'EC1A 1AB',
  court_address: '2 IA Court Street',
  is_case_management_location: 'Y',
  is_hearing_location: 'Y',
};

export const workFiltersSscsSearchLocationSecondary = {
  epimms_id: '30002',
  site_name: 'SSCS Court Centre 2',
  region_id: '2',
  region: 'Midlands',
  postcode: 'B1 1AB',
  court_address: '2 SSCS Court Street',
  is_case_management_location: 'Y',
  is_hearing_location: 'Y',
};

const workFiltersKnownLocations = [
  ...workFiltersDefaultLocations,
  workFiltersIaSearchLocation,
  workFiltersSscsSearchLocation,
  workFiltersIaSearchLocationSecondary,
  workFiltersSscsSearchLocationSecondary,
];

type SearchableLocation = typeof workFiltersIaSearchLocation & {
  serviceCode: string;
};

const workFiltersSearchableLocations: SearchableLocation[] = [
  { ...workFiltersIaSearchLocation, serviceCode: 'IA' },
  { ...workFiltersIaSearchLocationSecondary, serviceCode: 'IA' },
  { ...workFiltersSscsSearchLocation, serviceCode: 'SSCS' },
  { ...workFiltersSscsSearchLocationSecondary, serviceCode: 'SSCS' },
];

export const workFiltersLocationSearchScenarios: LocationSearchScenario[] = [
  {
    scenarioName: 'organisation roles have no base-location restriction across IA and SSCS services',
    roleAssignments: [
      { jurisdiction: 'IA', substantive: 'Y', roleType: 'ORGANISATION' },
      { jurisdiction: 'SSCS', substantive: 'Y', roleType: 'ORGANISATION' },
    ],
    expectedServiceCodes: ['IA', 'SSCS'],
    expectedInitialLocations: [],
    expectedSearchResults: [
      workFiltersIaSearchLocation.site_name,
      workFiltersIaSearchLocationSecondary.site_name,
      workFiltersSscsSearchLocation.site_name,
      workFiltersSscsSearchLocationSecondary.site_name,
    ],
  },
  {
    scenarioName: 'only SSCS remains organisation scoped when IA is case scoped',
    roleAssignments: [
      { jurisdiction: 'IA', substantive: 'Y', roleType: 'CASE', baseLocation: '20001' },
      { jurisdiction: 'SSCS', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '30001' },
    ],
    expectedServiceCodes: ['SSCS'],
    expectedInitialLocations: [workFiltersSscsSearchLocation.site_name],
    expectedSearchResults: [workFiltersSscsSearchLocation.site_name],
    expectedFullLocationServiceCodes: ['SSCS'],
  },
  {
    scenarioName: 'only IA remains organisation scoped when SSCS is case scoped',
    roleAssignments: [
      { jurisdiction: 'IA', substantive: 'Y', roleType: 'ORGANISATION', baseLocation: '20001' },
      { jurisdiction: 'SSCS', substantive: 'Y', roleType: 'CASE', baseLocation: '30001' },
    ],
    expectedServiceCodes: ['IA'],
    expectedInitialLocations: [workFiltersIaSearchLocation.site_name],
    expectedSearchResults: [workFiltersIaSearchLocation.site_name],
    expectedFullLocationServiceCodes: ['IA'],
  },
];

export function buildWorkFiltersFullLocationResponses(): Record<string, Array<typeof workFiltersIaSearchLocation>> {
  return {
    IA: [workFiltersIaSearchLocation],
    SSCS: [workFiltersSscsSearchLocation],
    'IA,SSCS': [workFiltersIaSearchLocation, workFiltersSscsSearchLocation],
  };
}

export function buildWorkFiltersLocationSearchRequest(
  requestBody: WorkFiltersLocationSearchRequestBody = {}
): LocationSearchRequest {
  const serviceIds = (requestBody.serviceIds ?? '')
    .split(',')
    .map((serviceCode) => serviceCode.trim())
    .filter(Boolean)
    .sort();
  const userLocations = requestBody.userLocations ?? [];

  return {
    searchTerm: requestBody.searchTerm ?? '',
    serviceIds,
    userLocations,
    userLocationServices: userLocations
      .map((location) => location.serviceCode ?? location.service)
      .filter((serviceCode): serviceCode is string => Boolean(serviceCode))
      .sort(),
  };
}

export function buildWorkFiltersLocationSearchResponse(
  requestBody: WorkFiltersLocationSearchRequestBody = {}
): Array<typeof workFiltersIaSearchLocation> {
  const { searchTerm, serviceIds, userLocations } = buildWorkFiltersLocationSearchRequest(requestBody);

  return workFiltersSearchableLocations
    .filter((location) => serviceIds.includes(location.serviceCode))
    .filter((location) => {
      const requestedScope = userLocations.find(
        (userLocation) => (userLocation.serviceCode ?? userLocation.service) === location.serviceCode
      );
      if (!requestedScope) {
        return true;
      }

      const requestedLocationIds = (requestedScope.locations ?? [])
        .map((userLocation) => userLocation.id ?? userLocation.locationId)
        .filter((value): value is string => Boolean(value));
      const requestedRegionIds = (requestedScope.locations ?? [])
        .map((userLocation) => userLocation.regionId)
        .filter((value): value is string => Boolean(value));

      if (requestedLocationIds.length === 0 && requestedRegionIds.length === 0) {
        return false;
      }

      return requestedLocationIds.includes(location.epimms_id) || requestedRegionIds.includes(location.region_id);
    })
    .filter((location) => location.site_name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(({ serviceCode, ...location }) => location);
}

export async function setupWorkFiltersUser(page: Page, options: SetupWorkFiltersUserOptions = {}): Promise<void> {
  await applySessionCookies(page, workFiltersUserIdentifier);

  const userDetails = buildHearingsUserDetailsMock(
    options.roles ?? ['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-civil']
  );

  userDetails.userInfo.id = workFiltersUserId;
  userDetails.userInfo.uid = workFiltersUserId;
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
}

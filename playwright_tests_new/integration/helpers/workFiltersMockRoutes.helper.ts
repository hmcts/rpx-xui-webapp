import type { Page } from '@playwright/test';
import { setupManageTasksBaseRoutes } from './manageTasksMockRoutes.helper';
import {
  buildWorkFilterLocationSearchResults,
  buildWorkFiltersUserDetails,
  defaultWorkFilterLocationsById,
  workFilterSupportedJurisdictionDetails,
  workFilterSupportedJurisdictions,
  type WorkFilterLocation,
  type WorkFilterRoleAssignment,
} from '../mocks/workFilters.mock';

type WorkFiltersMockRouteOptions = {
  roleAssignments: WorkFilterRoleAssignment[];
  taskListResponse?: unknown;
  locationsById?: WorkFilterLocation[];
  locationSearchResultsByServiceIds?: Record<string, WorkFilterLocation[]>;
  myCasesResponse?: unknown;
  userId?: string;
};

type WorkFiltersMockRouteState = {
  getLatestLocationSearchRequest: () => { searchTerm?: string; serviceIds?: string } | null;
  getLatestLocationSearchResultCount: () => number;
  getLocationsByIdRequestCount: () => number;
};

function asSearchResultsMap(overrides?: Record<string, WorkFilterLocation[]>): Record<string, WorkFilterLocation[]> {
  return {
    'IA,SSCS': buildWorkFilterLocationSearchResults('IA,SSCS', 18),
    SSCS: buildWorkFilterLocationSearchResults('SSCS', 9),
    IA: buildWorkFilterLocationSearchResults('IA', 9),
    ...overrides,
  };
}

export async function setupWorkFiltersMockRoutes(
  page: Page,
  options: WorkFiltersMockRouteOptions
): Promise<WorkFiltersMockRouteState> {
  const userDetails = buildWorkFiltersUserDetails(options.roleAssignments, options.userId);
  const locationsById = options.locationsById ?? defaultWorkFilterLocationsById;
  const searchResultsByServiceIds = asSearchResultsMap(options.locationSearchResultsByServiceIds);
  const myCasesResponse = options.myCasesResponse ?? { cases: [], unique_cases: 0 };
  let latestLocationSearchRequest: { searchTerm?: string; serviceIds?: string } | null = null;
  let latestLocationSearchResultCount = 0;
  let locationsByIdRequestCount = 0;

  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
  }, userDetails.userInfo);

  await setupManageTasksBaseRoutes(page, {
    taskListResponse: options.taskListResponse ?? { tasks: [], total_records: 0 },
    supportedJurisdictions: workFilterSupportedJurisdictions,
    supportedJurisdictionDetails: workFilterSupportedJurisdictionDetails,
  });

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.route('**/api/locations/getLocationsById*', async (route) => {
    locationsByIdRequestCount += 1;
    const requestBody =
      (route.request().postDataJSON() as {
        locations?: Array<{ id?: string; locationId?: string }>;
      }) ?? {};
    const requestedIds = new Set(
      (requestBody.locations ?? []).map((location) => String(location.id ?? location.locationId ?? '')).filter(Boolean)
    );

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(locationsById.filter((location) => requestedIds.has(location.epimms_id))),
    });
  });

  await page.route('**/api/locations/getLocations*', async (route) => {
    const requestBody =
      (route.request().postDataJSON() as {
        searchTerm?: string;
        serviceIds?: string;
      }) ?? {};
    const requestedServiceIds = String(requestBody.serviceIds ?? '');
    const searchTerm = String(requestBody.searchTerm ?? '').toLowerCase();
    const matchingResults = (searchResultsByServiceIds[requestedServiceIds] ?? []).filter((location) =>
      location.site_name.toLowerCase().includes(searchTerm)
    );
    if (searchTerm) {
      latestLocationSearchRequest = {
        searchTerm: requestBody.searchTerm,
        serviceIds: requestBody.serviceIds,
      };
      latestLocationSearchResultCount = matchingResults.length;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(matchingResults),
    });
  });

  await page.route('**/workallocation/my-work/cases*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(myCasesResponse),
    });
  });

  return {
    getLatestLocationSearchRequest: () => latestLocationSearchRequest,
    getLatestLocationSearchResultCount: () => latestLocationSearchResultCount,
    getLocationsByIdRequestCount: () => locationsByIdRequestCount,
  };
}

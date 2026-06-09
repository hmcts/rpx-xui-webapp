import type { Page } from '@playwright/test';
import { buildMyCases } from '../mocks/myCases.mock';
import { buildTaskListMock, myActionsList } from '../mocks/taskList.mock';
import { setupMyCasesRoutes } from './manageTasksMockRoutes.helper';
import {
  buildXuiAppShellAppConfigMock,
  buildXuiAppShellClientContextMock,
  buildXuiAppShellEnvironmentConfigMock,
} from './xuiAppShellMockRoutes.helper';
import type { TaskListBootstrapRoleAssignment } from './taskListMockRoutes.helper';

const myWorkUserId = 'wave2-my-work-user';
const supportedJurisdictions = ['IA', 'SSCS', 'CIVIL'];
const supportedJurisdictionDetails = [
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
  { serviceId: 'SSCS', serviceName: 'Social security and child support' },
  { serviceId: 'CIVIL', serviceName: 'Civil' },
];
const regionLocations = [
  {
    regionId: '1',
    locations: ['20001', '30001', '40001'],
  },
];
export const myWorkSelectableLocations = [
  {
    court_address: '1 IA Street',
    court_name: 'IA Court Center 1',
    epimms_id: '20001',
    is_case_management_location: 'Y',
    is_hearing_location: 'Y',
    postcode: 'IA1 1AA',
    region: 'London',
    region_id: '1',
    site_name: 'IA Court Center 1',
  },
  {
    court_address: '1 SSCS Street',
    court_name: 'SSCS Court Center 1',
    epimms_id: '30001',
    is_case_management_location: 'Y',
    is_hearing_location: 'Y',
    postcode: 'SS1 1AA',
    region: 'London',
    region_id: '1',
    site_name: 'SSCS Court Center 1',
  },
  {
    court_address: '1 Civil Street',
    court_name: 'Civil Court Center 1',
    epimms_id: '40001',
    is_case_management_location: 'Y',
    is_hearing_location: 'Y',
    postcode: 'CV1 1AA',
    region: 'London',
    region_id: '1',
    site_name: 'Civil Court Center 1',
  },
];
const resolvedBaseLocations = [
  {
    id: '20001',
    locationName: 'IA Court Center 1',
    regionId: '1',
    services: ['IA'],
  },
  {
    id: '30001',
    locationName: 'SSCS Court Center 1',
    regionId: '1',
    services: ['SSCS'],
  },
  {
    id: '40001',
    locationName: 'Civil Court Center 1',
    regionId: '1',
    services: ['CIVIL'],
  },
];

export type MyWorkFilterRoutesOptions = {
  myCasesRouteHandler?: Parameters<typeof setupMyCasesRoutes>[2]['routeHandler'];
  roleAssignmentInfo: TaskListBootstrapRoleAssignment[];
};

export async function setupMyWorkFilterRoutes(page: Page, options: MyWorkFilterRoutesOptions): Promise<void> {
  await setupMyCasesRoutes(page, buildMyCases(2), {
    routeHandler: options.myCasesRouteHandler,
    supportedJurisdictionDetails,
    supportedJurisdictions,
    taskListResponse: buildTaskListMock(4, myWorkUserId, myActionsList),
    user: {
      replaceRoleAssignments: true,
      roleAssignments: [...options.roleAssignmentInfo],
      roles: ['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-ia-admofficer'],
      userId: myWorkUserId,
    },
  });

  const appConfig = buildXuiAppShellAppConfigMock();
  const environmentConfig = buildXuiAppShellEnvironmentConfigMock();
  const clientContext = buildXuiAppShellClientContextMock();

  await page.addInitScript((seededClientContext) => {
    window.sessionStorage.setItem('clientContext', JSON.stringify(seededClientContext));
  }, clientContext);

  await page.route('**/assets/config/config.json*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(appConfig),
    });
  });

  await page.route(/\/external\/config\/ui(?:\/|\?|$)/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(environmentConfig),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/workallocation/region-location*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(regionLocations),
    });
  });

  await page.route('**/workallocation/full-location*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(myWorkSelectableLocations),
    });
  });

  await page.route('**/api/locations/getLocationsById*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(resolvedBaseLocations),
    });
  });
}

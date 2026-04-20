import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupMyCasesRoutes, setupNgIntegrationBaseRoutes } from '../../helpers';
import { buildMyCases } from '../../mocks/myCases.mock';
import { buildTaskListMock, myActionsList } from '../../mocks/taskList.mock';

const authenticatedUserIdentifier = 'STAFF_ADMIN';
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
const selectableLocations = [
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

type MyWorkRoutesOptions = {
  myCasesRouteHandler?: Parameters<typeof setupMyCasesRoutes>[2]['routeHandler'];
  roleAssignmentInfo: Array<Record<string, unknown>>;
};

async function setupMyWorkFilterRoutes(page: Page, options: MyWorkRoutesOptions): Promise<void> {
  await setupNgIntegrationBaseRoutes(page, {
    userDetails: {
      userId: myWorkUserId,
      roles: ['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-ia-admofficer'],
      roleAssignmentInfo: [...options.roleAssignmentInfo],
    },
  });

  await setupMyCasesRoutes(page, buildMyCases(2), {
    routeHandler: options.myCasesRouteHandler,
    supportedJurisdictionDetails,
    supportedJurisdictions,
    taskListResponse: buildTaskListMock(4, myWorkUserId, myActionsList),
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
      body: JSON.stringify(selectableLocations),
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

test.describe('My work filter parity', { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test.beforeEach(async ({ page }) => {
    await applySessionCookies(page, authenticatedUserIdentifier);
  });

  test('shows the work filter across the My work tabs and collapses it after Apply', async ({ taskListPage, page }) => {
    await setupMyWorkFilterRoutes(page, {
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'SSCS',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '30001',
          isCaseAllocator: false,
        },
      ],
    });

    await test.step('Open the My tasks view and verify the initial work filter state', async () => {
      await taskListPage.goto();
      await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');
      await expect(taskListPage.filterPanel).toBeHidden();

      await taskListPage.openFilterPanel();
      await expect(taskListPage.taskListFilterToggle).toHaveText('Hide work filter');
      await expect(taskListPage.filterPanel.getByLabel('Immigration and Asylum')).toBeVisible();
      await expect(taskListPage.filterPanel.getByLabel('Social security and child support')).toBeVisible();
      await expect(taskListPage.filterPanel).toContainText('Search for a location by name');

      await taskListPage.applyCurrentFilters();
      await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');
      await expect(taskListPage.filterPanel).toBeHidden();
    });

    await test.step('Verify the same Services and Locations filter surface on Available tasks, My cases, and My tasks', async () => {
      for (const tabName of ['Available tasks', 'My cases', 'My tasks']) {
        await taskListPage.taskTableTabs.filter({ hasText: tabName }).first().click();
        await taskListPage.waitForTaskListShellReady(`${tabName} filter parity`);
        await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');

        await taskListPage.openFilterPanel();
        await expect(taskListPage.taskListFilterToggle).toHaveText('Hide work filter');
        await expect(taskListPage.filterPanel.getByLabel('Immigration and Asylum')).toBeVisible();
        await expect(taskListPage.filterPanel.getByLabel('Social security and child support')).toBeVisible();
        await expect(taskListPage.filterPanel).toContainText('Search for a location by name');

        await taskListPage.applyCurrentFilters();
        await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');
        await expect(taskListPage.filterPanel).toBeHidden();
      }
    });
  });

  test('requires at least one service before applying the My cases filter', async ({ taskListPage, page }) => {
    await setupMyWorkFilterRoutes(page, {
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'CIVIL',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          isCaseAllocator: false,
        },
      ],
    });

    await taskListPage.gotoMyCases();
    await taskListPage.openFilterPanel();

    await taskListPage.clearServicesFilters();
    await taskListPage.applyCurrentFilters();

    await taskListPage.openFilterPanel();
    await expect(taskListPage.selectServicesError).toBeVisible();
    await expect(taskListPage.selectServicesError).toContainText('Select a service');
  });

  test('applies the My cases filter again after re-selecting Immigration and Asylum', async ({ taskListPage, page }) => {
    await setupMyWorkFilterRoutes(page, {
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'CIVIL',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          isCaseAllocator: false,
        },
      ],
    });

    await test.step('Open My cases and trigger the legacy validation state', async () => {
      await taskListPage.gotoMyCases();
      await taskListPage.openFilterPanel();

      await taskListPage.filterPanel.getByLabel('Civil').uncheck({ force: true });
      await expect(taskListPage.filterPanel.getByLabel('Civil')).not.toBeChecked();
      await taskListPage.filterPanel.getByLabel('Immigration and Asylum').uncheck({ force: true });
      await expect(taskListPage.filterPanel.getByLabel('Immigration and Asylum')).not.toBeChecked();

      await taskListPage.applyCurrentFilters();
      await taskListPage.openFilterPanel();
      await expect(taskListPage.selectServicesError).toBeVisible();
      await expect(taskListPage.selectServicesError).toContainText('Select a service');
    });

    await test.step('Re-select Immigration and Asylum and verify the filter can be applied again', async () => {
      await taskListPage.filterPanel.getByLabel('Immigration and Asylum').check({ force: true });
      await expect(taskListPage.filterPanel.getByLabel('Immigration and Asylum')).toBeChecked();
      await expect(taskListPage.filterPanel.getByLabel('Civil')).not.toBeChecked();

      await taskListPage.applyCurrentFilters();
      await expect(taskListPage.taskListFilterToggle).toHaveText('Show work filter');
      await expect(taskListPage.filterPanel).toBeHidden();

      await taskListPage.openFilterPanel();
      await expect(taskListPage.filterPanel.getByLabel('Immigration and Asylum')).toBeChecked();
      await expect(taskListPage.filterPanel.getByLabel('Civil')).not.toBeChecked();
    });
  });

  for (const scenario of [
    {
      expectedFullLocationServiceCodes: ['IA', 'SSCS'],
      expectedVisibleServices: ['Immigration and Asylum', 'Social security and child support'],
      name: 'only ORGANISATION roles contribute services and locations when both assignments are organisational',
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'SSCS',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '30001',
          isCaseAllocator: false,
        },
      ],
      unexpectedServices: ['Civil'],
    },
    {
      expectedFullLocationServiceCodes: ['SSCS'],
      expectedVisibleServices: ['Social security and child support'],
      name: 'CASE roles do not leak into the filter when IA is case-scoped and SSCS is organisational',
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'CASE',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'SSCS',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '30001',
          isCaseAllocator: false,
        },
      ],
      unexpectedServices: ['Immigration and Asylum', 'Civil'],
    },
    {
      expectedFullLocationServiceCodes: ['IA'],
      expectedVisibleServices: ['Immigration and Asylum'],
      name: 'CASE roles do not leak into the filter when SSCS is case-scoped and IA is organisational',
      roleAssignmentInfo: [
        {
          jurisdiction: 'IA',
          substantive: 'Y',
          roleType: 'ORGANISATION',
          baseLocation: '20001',
          isCaseAllocator: false,
        },
        {
          jurisdiction: 'SSCS',
          substantive: 'Y',
          roleType: 'CASE',
          baseLocation: '30001',
          isCaseAllocator: false,
        },
      ],
      unexpectedServices: ['Social security and child support', 'Civil'],
    },
  ]) {
    test(scenario.name, async ({ taskListPage, page }) => {
      const fullLocationServiceCodeCalls: string[][] = [];

      await setupMyWorkFilterRoutes(page, {
        roleAssignmentInfo: scenario.roleAssignmentInfo,
      });

      await page.route('**/workallocation/full-location*', async (route) => {
        const requestUrl = new URL(route.request().url());
        const rawServiceCodes = requestUrl.searchParams.get('serviceCodes') ?? '';
        fullLocationServiceCodeCalls.push(
          rawServiceCodes
            .split(',')
            .map((serviceCode) => serviceCode.trim())
            .filter(Boolean)
            .sort()
        );

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(selectableLocations),
        });
      });

      await taskListPage.goto();
      await taskListPage.openFilterPanel();

      for (const expectedServiceLabel of scenario.expectedVisibleServices) {
        await expect(taskListPage.filterPanel.getByLabel(expectedServiceLabel)).toBeVisible();
      }

      for (const unexpectedServiceLabel of scenario.unexpectedServices) {
        await expect(taskListPage.filterPanel.getByLabel(unexpectedServiceLabel)).toHaveCount(0);
      }

      expect(fullLocationServiceCodeCalls).toContainEqual([...scenario.expectedFullLocationServiceCodes].sort());
    });
  }
});

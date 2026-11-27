import { expect, test } from '../../../E2E/fixtures';
import { buildBookingUiBootstrapUser, setupBookableBookingUiRoutesForTest } from '../../helpers/bookingUiMockRoutes.helper';
import {
  BOOKING_MULTI_DAY_RANGE,
  BOOKING_RANGE_YEAR,
  singleLocationMock,
  type CreateBookingRequest,
} from '../../mocks/bookingUI.mock';

test.describe('Multi-day work booking', { tag: ['@integration', '@integration-booking-ui'] }, () => {
  test.use({ timezoneId: 'Europe/London' });
  for (const changeTabsDuringInitialization of [false, true]) {
    test(`normalizes a summer range to UTC boundaries and refreshes the selected work location${changeTabsDuringInitialization ? ' after switching tabs during initialization' : ''}`, async ({
      page,
      bookingUiPage,
      taskListPage,
    }, testInfo) => {
      const requests: Array<CreateBookingRequest & { method: string }> = [];
      const refreshRequests: unknown[] = [];
      const callOrder: string[] = [];
      const state = await setupBookableBookingUiRoutesForTest(page, testInfo, {
        bootstrapUser: {
          replaceRoleAssignments: true,
          roleAssignments: buildBookingUiBootstrapUser('').roleAssignments!.map((role) => ({ ...role, bookable: true })),
        },
        onCreateBooking: async (route) => {
          requests.push({ ...route.request().postDataJSON(), method: route.request().method() });
          callOrder.push('create');
          await route.fulfill({ json: { bookingResponse: {} } });
        },
        onRefreshRoleAssignments: async (route) => {
          refreshRequests.push({ ...route.request().postDataJSON(), method: route.request().method() });
          callOrder.push('refresh');
          await route.fulfill({ json: {} });
        },
      });
      await bookingUiPage.goto();
      await bookingUiPage.selectOption('Create a new booking');
      await bookingUiPage.continue();
      await bookingUiPage.selectFirstLocationFromSearch('Lon');
      await bookingUiPage.continue();
      await bookingUiPage.chooseDateRangeBooking();
      await bookingUiPage.enterBookingDate('startDate', '17', '7', BOOKING_RANGE_YEAR);
      await bookingUiPage.enterBookingDate('endDate', '19', '7', BOOKING_RANGE_YEAR);
      await bookingUiPage.continue();
      await expect(bookingUiPage.bookingSummaryLine).toContainText(singleLocationMock[0].site_name);
      await expect(bookingUiPage.bookingSummaryLine).toContainText(
        `17 July ${BOOKING_RANGE_YEAR} to 19 July ${BOOKING_RANGE_YEAR}`
      );
      let releaseLocations!: () => void;
      let pendingLocationRequest: Promise<unknown> | undefined;
      if (changeTabsDuringInitialization) {
        const locationGate = new Promise<void>((resolve) => {
          releaseLocations = resolve;
        });
        await page.route('**/workallocation/full-location*', async (route) => {
          await locationGate;
          await route.fulfill({ json: singleLocationMock });
        });
        pendingLocationRequest = page.waitForRequest(
          (request) => new URL(request.url()).pathname === '/workallocation/full-location'
        );
      }
      const workRequest = page.waitForRequest(
        (request) =>
          new URL(request.url()).pathname === '/workallocation/task' &&
          request.method() === 'POST' &&
          request.postDataJSON()?.view === 'MyTasks' &&
          request.postData()?.includes(singleLocationMock[0].epimms_id) === true
      );
      const refreshedUser = page.waitForRequest((request) => new URL(request.url()).pathname === '/api/user/details');
      await bookingUiPage.confirmBooking();
      await refreshedUser;
      if (changeTabsDuringInitialization) {
        const availableWorkRequest = page.waitForRequest(
          (request) =>
            new URL(request.url()).pathname === '/workallocation/task' &&
            request.method() === 'POST' &&
            request.postDataJSON()?.view === 'AvailableTasks'
        );
        try {
          await pendingLocationRequest;
          await page.getByRole('link', { name: 'Available tasks', exact: true }).click();
          await expect(page).toHaveURL(/\/work\/my-work\/available/);
        } finally {
          releaseLocations();
        }
        await availableWorkRequest;
        await expect(taskListPage.taskListTable).toBeVisible();
        await page.goBack();
        await expect(page).toHaveURL(/\/work\/my-work\/list/);
      }
      expect(requests).toEqual([
        {
          method: 'POST',
          userId: state.sessionUserId,
          locationId: singleLocationMock[0].epimms_id,
          regionId: singleLocationMock[0].region_id,
          ...BOOKING_MULTI_DAY_RANGE,
        },
      ]);
      expect(refreshRequests).toEqual([{ method: 'POST', userId: state.sessionUserId }]);
      expect(callOrder).toEqual(['create', 'refresh']);
      await expect(taskListPage.taskListTable).toBeVisible();
      expect((await workRequest).postDataJSON()).toMatchObject({
        view: 'MyTasks',
        searchRequest: {
          search_parameters: expect.arrayContaining([
            { key: 'user', operator: 'IN', values: [state.sessionUserId] },
            { key: 'location', operator: 'IN', values: [singleLocationMock[0].epimms_id] },
          ]),
        },
      });
      await expect(page).toHaveURL(/\/work\/my-work\/list/);
      await expect(taskListPage.taskRows).toHaveCount(3);
      await taskListPage.openFilterPanel();
      await expect(taskListPage.selectedLocationTags).toHaveText([singleLocationMock[0].site_name]);

      await test.step('Preserve a fee-paid judge’s saved filter changes when My Work reloads', async () => {
        await taskListPage.removeAllSelectedLocations();
        await taskListPage.applyCurrentFilters();
        const savedFilter = await page.evaluate(() => localStorage.getItem('my-work-filter'));
        expect(savedFilter).not.toBeNull();
        await page.reload();
        await expect(taskListPage.taskListTable).toBeVisible();
        await taskListPage.openFilterPanel();
        await expect(taskListPage.selectedLocationTags).toHaveCount(0);
        await expect.poll(() => page.evaluate(() => localStorage.getItem('my-work-filter'))).toBe(savedFilter);
      });
    });
  }
});

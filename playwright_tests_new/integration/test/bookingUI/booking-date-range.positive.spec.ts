import { expect, test } from '../../../E2E/fixtures';
import { setupBookableBookingUiRoutesForTest } from '../../helpers/bookingUiMockRoutes.helper';
import {
  BOOKING_MULTI_DAY_RANGE,
  BOOKING_RANGE_YEAR,
  singleLocationMock,
  type CreateBookingRequest,
} from '../../mocks/bookingUI.mock';

test.describe('Multi-day work booking', { tag: ['@integration', '@integration-booking-ui'] }, () => {
  test.use({ timezoneId: 'Europe/London' });
  test('normalizes a summer range to UTC boundaries and refreshes the selected work location', async ({
    page,
    bookingUiPage,
    taskListPage,
  }, testInfo) => {
    const requests: Array<CreateBookingRequest & { method: string }> = [];
    const refreshRequests: unknown[] = [];
    const callOrder: string[] = [];
    const state = await setupBookableBookingUiRoutesForTest(page, testInfo, {
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
    const workRequest = page.waitForRequest(
      (request) =>
        new URL(request.url()).pathname === '/workallocation/task' &&
        request.method() === 'POST' &&
        request.postData()?.includes(singleLocationMock[0].epimms_id) === true
    );
    const refreshedUser = page.waitForRequest((request) => new URL(request.url()).pathname === '/api/user/details');
    await bookingUiPage.confirmBooking();
    await refreshedUser;
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
  });
});

import { applySessionCookiesAndExtractUserId } from '../../helpers';
import { setupTaskListMockRoutes } from '../../helpers/taskListMockRoutes.helper';
import { expect, test } from '../../../E2E/fixtures';
import {
  singleLocationMock,
  buildExistingBookingsMock,
  type CreateBookingRequest,
  getUtcDayRangeForLocalDate,
} from '../../mocks/bookingUI.mock';
import { buildMyTaskListMock } from '../../mocks/taskList.mock';
import { formatUiDate } from '../../utils/tableUtils';

const userIdentifier = 'BOOKING_UI-FT-ON';
const defaultBookingLocation = singleLocationMock[0];
const bookingPageUrlPattern = /\/booking$/;

const createBookingErrorCases = [
  { status: 400, expectedUrlPattern: /\/booking-service-down$/ },
  { status: 500, expectedUrlPattern: /\/service-down$/ },
];

createBookingErrorCases.forEach(({ status, expectedUrlPattern }) => {
  test.describe(
    `Booking UI create booking error ${status} as ${userIdentifier}`,
    { tag: ['@integration', '@integration-booking-ui'] },
    () => {
      let getBookingsCalled = false;
      let createBookingCalled = false;
      let refreshRoleAssignmentsCalled = false;
      let createBookingRequestBody: CreateBookingRequest | undefined;
      let sessionUserId = '';
      let existingBookingsMock;

      test.beforeEach(async ({ page }) => {
        getBookingsCalled = false;
        createBookingCalled = false;
        refreshRoleAssignmentsCalled = false;
        createBookingRequestBody = undefined;

        const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
        sessionUserId = userId;
        existingBookingsMock = buildExistingBookingsMock(userId);

        await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 3));
        await page.route('**/api/locations/getLocations*', async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(singleLocationMock),
          });
        });
        await page.route('**/am/getBookings', async (route) => {
          getBookingsCalled = true;
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(existingBookingsMock),
          });
        });
        await page.route('**/am/createBooking', async (route) => {
          createBookingCalled = true;
          createBookingRequestBody = route.request().postDataJSON() as CreateBookingRequest;
          await route.fulfill({
            status,
            contentType: 'application/json',
            body: JSON.stringify({
              errorCode: `BOOKING_${status}`,
              status: `${status}`,
              errorMessage: `Create booking failed with ${status}`,
              timeStamp: new Date().toISOString(),
            }),
          });
        });
        await page.route('**/am/role-mapping/judicial/refresh', async (route) => {
          refreshRoleAssignmentsCalled = true;
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({}),
          });
        });
      });

      test(`redirects correctly when create booking returns ${status}`, async ({ page, bookingUiPage }) => {
        const expectedTodayBookingRange = getUtcDayRangeForLocalDate(new Date(), new Date());

        await test.step('Navigate to booking UI and wait for bookings request', async () => {
          await bookingUiPage.goto();
          await expect(page).toHaveURL(bookingPageUrlPattern);
          await expect.poll(() => getBookingsCalled).toBeTruthy();
        });

        await test.step('Choose create new booking and continue', async () => {
          await bookingUiPage.selectOption('Create a new booking');
          await bookingUiPage.continueButton.click();
          await expect(page).toHaveURL(bookingPageUrlPattern);
        });

        await test.step('Select location, choose today only and continue', async () => {
          await bookingUiPage.selectFirstLocationFromSearch('Lon');
          await bookingUiPage.continueButton.click();
          await bookingUiPage.bookingDateRadio.filter({ hasText: 'Today only (ends at midnight)' }).click();
          await bookingUiPage.continueButton.click();
        });

        await test.step('Confirm booking and verify summary details', async () => {
          const table = await bookingUiPage.getSummaryListPairs();
          const today = formatUiDate(new Date().toISOString());
          expect(table[0]).toEqual({
            key: 'Location',
            value: existingBookingsMock[0].locationName,
          });
          expect(table[1]).toEqual({
            key: 'Duration',
            value: `${today} to ${today}`,
          });
          await bookingUiPage.bookingButton.click();
        });

        await test.step('Verify create booking payload and error redirect', async () => {
          await expect.poll(() => createBookingCalled).toBeTruthy();
          expect(createBookingRequestBody).toEqual({
            userId: sessionUserId,
            locationId: defaultBookingLocation.epimms_id,
            regionId: defaultBookingLocation.region_id,
            beginDate: expectedTodayBookingRange.beginDate,
            endDate: expectedTodayBookingRange.endDate,
          });
          await expect(page).toHaveURL(expectedUrlPattern);
          expect(refreshRoleAssignmentsCalled).toBeFalsy();
        });
      });
    }
  );
});

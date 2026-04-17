import { applySessionCookiesAndExtractUserId, setupBookingUiMockRoutes } from '../../helpers';
import { setupTaskListMockRoutes } from '../../helpers/taskListMockRoutes.helper';
import { expect, test } from '../../../E2E/fixtures';
import {
  buildExistingBookingsMock,
  type CreateBookingRequest,
  getUtcDayRangeForLocalDate,
  singleLocationMock,
} from '../../mocks/bookingUI.mock';
import { buildHearingsUserDetailsMock } from '../../mocks/hearings.mock';
import { buildMyTaskListMock } from '../../mocks/taskList.mock';
import { formatUiDate } from '../../utils/tableUtils';

const userIdentifier = 'BOOKING_UI-FT-ON';
const defaultBookingLocation = singleLocationMock[0];
const bookingPageUrlPattern = /\/booking$/;
const casesPageUrlPattern = /\/cases(?:$|[/?#])/;

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
        await setupBookingUiMockRoutes(page, {
          locationResponseBody: singleLocationMock,
          getBookingsResponseBody: existingBookingsMock,
          onGetBookings: () => {
            getBookingsCalled = true;
          },
          onCreateBooking: async (route) => {
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
          },
          onRefreshRoleAssignments: async (route) => {
            refreshRoleAssignmentsCalled = true;
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({}),
            });
          },
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

test.describe(`Booking UI access checks as ${userIdentifier}`, { tag: ['@integration', '@integration-booking-ui'] }, () => {
  let getBookingsCalled = false;
  let existingBookingsMock;

  test.beforeEach(async ({ page }) => {
    getBookingsCalled = false;
    const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
    existingBookingsMock = buildExistingBookingsMock(userId);

    await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 3));
    await setupBookingUiMockRoutes(page, {
      locationResponseBody: singleLocationMock,
      getBookingsResponseBody: existingBookingsMock,
      onGetBookings: () => {
        getBookingsCalled = true;
      },
    });
  });

  test('user without booking access is redirected away from Booking UI', async ({ page }) => {
    await test.step('Mock user details without booking access', async () => {
      const noBookingAccessUser = buildHearingsUserDetailsMock([]);
      await page.route('**/api/user/details*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(noBookingAccessUser),
        });
      });
    });

    await test.step('Navigate to booking and verify redirect to cases', async () => {
      await page.goto('/booking');
      await expect(page).toHaveURL(casesPageUrlPattern);
    });
  });
});

test.describe(`Booking UI validation checks as ${userIdentifier}`, { tag: ['@integration', '@integration-booking-ui'] }, () => {
  let getBookingsCalled = false;
  let existingBookingsMock;

  test.beforeEach(async ({ page }) => {
    getBookingsCalled = false;
    const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
    existingBookingsMock = buildExistingBookingsMock(userId);

    await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 3));
    await setupBookingUiMockRoutes(page, {
      locationResponseBody: singleLocationMock,
      getBookingsResponseBody: existingBookingsMock,
      onGetBookings: () => {
        getBookingsCalled = true;
      },
    });
  });

  test('user cannot continue from location step without selecting a location', async ({ page, bookingUiPage }) => {
    await test.step('Navigate to booking and move to location step', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await expect.poll(() => getBookingsCalled).toBeTruthy();
      await bookingUiPage.selectOption('Create a new booking');
      await bookingUiPage.continueButton.click();
      await expect(page.getByRole('heading', { name: /Select a location/i })).toBeVisible();
    });

    await test.step('Try to continue without selecting a location', async () => {
      await bookingUiPage.continueButton.click();
    });

    await test.step('Verify GOV.UK error summary for missing location', async () => {
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await expect(bookingUiPage.exuiHeader.errorHeader).toBeVisible();
      await expect(bookingUiPage.exuiHeader.errorHeaderTitle).toContainText('There is a problem');
      await expect(bookingUiPage.exuiHeader.errorHeader).toContainText('Enter a valid location');
    });
  });

  test('user cannot continue from date step with invalid or incomplete dates', async ({ page, bookingUiPage }) => {
    await test.step('Navigate to booking and move to date step', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await expect.poll(() => getBookingsCalled).toBeTruthy();
      await bookingUiPage.selectOption('Create a new booking');
      await bookingUiPage.continueButton.click();
      await bookingUiPage.selectFirstLocationFromSearch('Lon');
      await bookingUiPage.continueButton.click();
    });

    await test.step('Select date range and continue with incomplete dates', async () => {
      await bookingUiPage.bookingDateRadio.filter({ hasText: 'Select a date range' }).click();
      await bookingUiPage.continueButton.click();
    });

    await test.step('Verify GOV.UK error summary for invalid/incomplete dates', async () => {
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await expect(bookingUiPage.exuiHeader.errorHeader).toBeVisible();
      await expect(bookingUiPage.exuiHeader.errorHeaderTitle).toContainText('There is a problem');
      await expect(bookingUiPage.exuiHeader.errorHeader).toContainText('Enter a booking start date');
      await expect(bookingUiPage.exuiHeader.errorHeader).toContainText('Enter a booking end date');
      await expect(page.locator('.govuk-summary-list')).toHaveCount(0);
    });
  });
});

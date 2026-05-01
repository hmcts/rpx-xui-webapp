import { setupBookableBookingUiRoutesForTest, warmBookableBookingUiSessionForWorker } from '../../helpers';
import { expect, test } from '../../../E2E/fixtures';
import {
  type CreateBookingRequest,
  getExpectedTodayOnlyCreateBookingRange,
  singleLocationMock,
} from '../../mocks/bookingUI.mock';
import { buildHearingsUserDetailsMock } from '../../mocks/hearings.mock';
import { formatBookingUiDate } from '../../utils/tableUtils';

const defaultBookingLocation = singleLocationMock[0];
const bookingPageUrlPattern = /\/booking$/;
const casesPageUrlPattern = /\/cases(?:$|[/?#])/;
const sessionWarmupTimeoutMs = 3 * 60_000;

test.beforeAll(async ({}, workerInfo) => {
  test.setTimeout(sessionWarmupTimeoutMs);
  await warmBookableBookingUiSessionForWorker(workerInfo);
});

const createBookingErrorCases = [
  { status: 400, expectedUrlPattern: /\/booking-service-down$/ },
  { status: 500, expectedUrlPattern: /\/service-down$/ },
];

createBookingErrorCases.forEach(({ status, expectedUrlPattern }) => {
  test.describe(
    `Booking UI create booking error ${status} with lazy pooled session users`,
    { tag: ['@integration', '@integration-booking-ui'] },
    () => {
      test(`redirects correctly when create booking returns ${status}`, async ({ page, bookingUiPage }, testInfo) => {
        let createBookingCalled = false;
        let refreshRoleAssignmentsCalled = false;
        let createBookingRequestBody: CreateBookingRequest | undefined;
        const routeState = await setupBookableBookingUiRoutesForTest(page, testInfo, {
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

        await test.step('Navigate to booking UI and wait for bookings request', async () => {
          await bookingUiPage.goto();
          await expect(page).toHaveURL(bookingPageUrlPattern);
          await expect.poll(routeState.getBookingsCalled).toBeTruthy();
        });

        await test.step('Choose create new booking and continue', async () => {
          await bookingUiPage.selectOption('Create a new booking');
          await bookingUiPage.continue();
          await expect(page).toHaveURL(bookingPageUrlPattern);
        });

        await test.step('Select location, choose today only and continue', async () => {
          await bookingUiPage.selectFirstLocationFromSearch('Lon');
          await bookingUiPage.continue();
          await bookingUiPage.chooseTodayOnlyBooking();
          await bookingUiPage.continue();
        });

        await test.step('Confirm booking and verify summary details', async () => {
          const table = await bookingUiPage.getSummaryListPairs();
          const today = formatBookingUiDate(new Date().toISOString());
          expect(table[0]).toEqual({
            key: 'Location',
            value: routeState.existingBookingsMock[0].locationName,
          });
          expect(table[1]).toEqual({
            key: 'Duration',
            value: `${today} to ${today}`,
          });
          await bookingUiPage.confirmBooking();
        });

        await test.step('Verify create booking payload and error redirect', async () => {
          await expect.poll(() => createBookingCalled).toBeTruthy();
          const submittedRequest = createBookingRequestBody as CreateBookingRequest;
          const expectedTodayBookingRange = getExpectedTodayOnlyCreateBookingRange(new Date(submittedRequest.beginDate));
          expect(createBookingRequestBody).toEqual({
            userId: routeState.sessionUserId,
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

test.describe(
  'Booking UI access checks with lazy pooled session users',
  { tag: ['@integration', '@integration-booking-ui'] },
  () => {
    test('user without booking access is redirected away from Booking UI', async ({ bookingUiPage, page }, testInfo) => {
      await setupBookableBookingUiRoutesForTest(page, testInfo);

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
        await bookingUiPage.gotoExpectingRedirect(casesPageUrlPattern);
        await expect(page).toHaveURL(casesPageUrlPattern);
      });
    });
  }
);

test.describe(
  'Booking UI validation checks with lazy pooled session users',
  { tag: ['@integration', '@integration-booking-ui'] },
  () => {
    test('user cannot continue from location step without selecting a location', async ({ page, bookingUiPage }, testInfo) => {
      const routeState = await setupBookableBookingUiRoutesForTest(page, testInfo);

      await test.step('Navigate to booking and move to location step', async () => {
        await bookingUiPage.goto();
        await expect(page).toHaveURL(bookingPageUrlPattern);
        await expect.poll(routeState.getBookingsCalled).toBeTruthy();
        await bookingUiPage.selectOption('Create a new booking');
        await bookingUiPage.continue();
        await expect(bookingUiPage.locationStepHeading).toBeVisible();
      });

      await test.step('Try to continue without selecting a location', async () => {
        await bookingUiPage.continue();
      });

      await test.step('Verify GOV.UK error summary for missing location', async () => {
        await expect(page).toHaveURL(bookingPageUrlPattern);
        await expect(bookingUiPage.exuiHeader.errorHeader).toBeVisible();
        await expect(bookingUiPage.exuiHeader.errorHeaderTitle).toContainText('There is a problem');
        await expect(bookingUiPage.exuiHeader.errorHeader).toContainText('Enter a valid location');
      });
    });

    test('user cannot continue from date step with invalid or incomplete dates', async ({ page, bookingUiPage }, testInfo) => {
      const routeState = await setupBookableBookingUiRoutesForTest(page, testInfo);

      await test.step('Navigate to booking and move to date step', async () => {
        await bookingUiPage.goto();
        await expect(page).toHaveURL(bookingPageUrlPattern);
        await expect.poll(routeState.getBookingsCalled).toBeTruthy();
        await bookingUiPage.selectOption('Create a new booking');
        await bookingUiPage.continue();
        await bookingUiPage.selectFirstLocationFromSearch('Lon');
        await bookingUiPage.continue();
      });

      await test.step('Select date range and continue with incomplete dates', async () => {
        await bookingUiPage.chooseDateRangeBooking();
        await bookingUiPage.continue();
      });

      await test.step('Verify GOV.UK error summary for invalid/incomplete dates', async () => {
        await expect(page).toHaveURL(bookingPageUrlPattern);
        await expect(bookingUiPage.exuiHeader.errorHeader).toBeVisible();
        await expect(bookingUiPage.exuiHeader.errorHeaderTitle).toContainText('There is a problem');
        await expect(bookingUiPage.exuiHeader.errorHeader).toContainText('Enter a booking start date');
        await expect(bookingUiPage.exuiHeader.errorHeader).toContainText('Enter a booking end date');
        await expect(bookingUiPage.summaryList()).toHaveCount(0);
      });
    });
  }
);

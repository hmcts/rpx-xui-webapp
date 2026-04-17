import { applySessionCookiesAndExtractUserId } from '../../helpers';
import { setupTaskListMockRoutes } from '../../helpers/taskListMockRoutes.helper';
import { expect, test } from '../../../E2E/fixtures';
import { bookingLocationMock, buildExistingBookingsMock } from '../../mocks/bookingUI.mock';
import { buildMyTaskListMock } from '../../mocks/taskList.mock';
import { formatUiDate } from '../../utils/tableUtils';

const userIdentifier = 'BOOKING_UI-FT-ON';
const defaultBookingLocation = bookingLocationMock[0];
const bookingPageUrlPattern = /\/booking$/;
const tasksPageUrlPattern = /\/work\/my-work\/list/;

type CreateBookingRequest = {
  userId: string;
  locationId: string;
  regionId: string;
  beginDate: string;
  endDate: string;
};

type BookingDayRange = {
  beginDate: string;
  endDate: string;
};

const getUtcDayRangeForLocalDate = (date: Date): BookingDayRange => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return {
    beginDate: new Date(Date.UTC(year, month, day, 0, 0, 0, 0)).toISOString(),
    endDate: new Date(Date.UTC(year, month, day, 23, 59, 59, 999)).toISOString(),
  };
};

let getBookingsCalled = false;
let createBookingCalled = false;
let createBookingRequestBody: CreateBookingRequest | undefined;
let expectedTodayBookingRange: BookingDayRange | undefined;
let sessionUserId = '';
let existingBookingsMock;

test.describe(`Booking UI as ${userIdentifier}`, { tag: ['@integration', '@integration-booking-ui'] }, () => {
  test.beforeEach(async ({ page }) => {
    getBookingsCalled = false;
    createBookingCalled = false;
    createBookingRequestBody = undefined;
    expectedTodayBookingRange = undefined;
    const userId = await applySessionCookiesAndExtractUserId(page, userIdentifier);
    sessionUserId = userId;
    existingBookingsMock = buildExistingBookingsMock(userId);
    await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 3));
    await page.route('**/api/locations/getLocations*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(bookingLocationMock),
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
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ bookingResponse: {} }),
      });
    });
    await page.route('**/am/role-mapping/judicial/refresh', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });
  });

  test('can continue when choosing an existing booking', async ({ page, bookingUiPage }) => {
    await test.step('Navigate to booking UI and wait for bookings request', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await expect.poll(() => getBookingsCalled).toBeTruthy();
      await expect(bookingUiPage.continueButton).toHaveCount(0);
    });

    await test.step('Select existing booking and verify enabled/disabled booking buttons', async () => {
      await bookingUiPage.selectOption('Choose an existing booking');
      await expect(bookingUiPage.existingBookings.nth(1).getByRole('button')).toBeDisabled();
    });

    await test.step('Continue with the active booking and redirect to my work list', async () => {
      await bookingUiPage.existingBookings.first().getByRole('button').click();
      await expect(page).toHaveURL(tasksPageUrlPattern);
    });
  });

  test('can continue when creating a new booking', async ({ page, bookingUiPage }) => {
    await test.step('Navigate to booking UI and wait for bookings request', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await expect.poll(() => getBookingsCalled).toBeTruthy();
      await expect(bookingUiPage.continueButton).toHaveCount(0);
    });

    await test.step('Select create new booking option and verify continue button', async () => {
      await bookingUiPage.selectOption('Create a new booking');
      await expect(bookingUiPage.continueButton).toBeVisible();
    });

    await test.step('Continue and move to booking location step', async () => {
      await bookingUiPage.continueButton.click();
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await bookingUiPage.selectFirstLocationFromSearch('Lon');
      await bookingUiPage.continueButton.click();
    });

    await test.step('Select the booking time as today only', async () => {
      expectedTodayBookingRange = getUtcDayRangeForLocalDate(new Date());
      await page.locator('.govuk-radios').locator('input').first().click();
      await bookingUiPage.continueButton.click();
    });

    await test.step('Verify check your answers and submit', async () => {
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

    await test.step('Intercept create booking API request and verify payload', async () => {
      await expect.poll(() => createBookingCalled).toBeTruthy();
      expect(createBookingRequestBody).toBeDefined();
      expect(expectedTodayBookingRange).toBeDefined();
      expect(createBookingRequestBody).toEqual({
        userId: sessionUserId,
        locationId: defaultBookingLocation.epimms_id,
        regionId: defaultBookingLocation.region_id,
        beginDate: expectedTodayBookingRange?.beginDate,
        endDate: expectedTodayBookingRange?.endDate,
      });
    });

    await test.step('Continue and redirect to my work list', async () => {
      await expect(page).toHaveURL(tasksPageUrlPattern);
    });
  });

  test('can continue when viewing tasks and cases', async ({ page, bookingUiPage }) => {
    await test.step('Navigate to booking UI and wait for bookings request', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await expect.poll(() => getBookingsCalled).toBeTruthy();
      await expect(bookingUiPage.continueButton).toHaveCount(0);
    });

    await test.step('Select view tasks and cases option and verify continue button', async () => {
      await bookingUiPage.selectOption('View tasks and cases');
      await expect(bookingUiPage.continueButton).toBeVisible();
    });

    await test.step('Continue and redirect to my work list', async () => {
      await bookingUiPage.continueButton.click();
      await expect(page).toHaveURL(tasksPageUrlPattern);
      await expect(page.locator('exui-task-list-wrapper')).toBeVisible();
    });
  });
});

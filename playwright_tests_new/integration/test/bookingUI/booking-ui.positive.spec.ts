import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../helpers';
import type { BookingUiMock } from '../../mocks/bookingUI.builder';
import { bookingLocationMock, buildBookingUserDetailsMock, buildExistingBookingsMock } from '../../mocks/bookingUI.mock';

const sessionUserIdentifier = 'STAFF_ADMIN';
const existingBookingOption = 'Choose an existing booking';
const createBookingOption = 'Create a new booking';
const viewTasksAndCasesOption = 'View tasks and cases';
const currentBookingLocation = "Bromley Magistrates' Court";
const futureBookingLocation = 'Central London County Court';
const existingBookingsReferenceDate = new Date('2026-02-15T12:00:00.000Z');
let getBookingsCalled = false;
let existingBookingsMock: BookingUiMock[] = [];

function formatBookingDateRange(booking: BookingUiMock): string {
  const displayDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const bookingEndDate = new Date(booking.endTime);
  bookingEndDate.setUTCDate(bookingEndDate.getUTCDate() - 1);
  return `${displayDate.format(new Date(booking.beginTime))} to ${displayDate.format(bookingEndDate)}`;
}

test.describe(`Booking UI via ${sessionUserIdentifier} session`, { tag: ['@integration', '@integration-booking-ui'] }, () => {
  test.beforeEach(async ({ page }) => {
    getBookingsCalled = false;
    const userId = await applySessionCookiesAndExtractUserId(page, sessionUserIdentifier);
    const userDetails = buildBookingUserDetailsMock({ userId });
    existingBookingsMock = buildExistingBookingsMock(userId, existingBookingsReferenceDate);

    await page.addInitScript((seededUserInfo) => {
      window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
    }, userDetails.userInfo);

    await page.route('**/api/user/details*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(userDetails),
      });
    });

    await page.route('**/api/locations/getLocations', async (route) => {
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
  });

test('existing booking choice shows ordered cards, rendered date ranges, and no primary continue button', async ({
    bookingUiPage,
    page,
  }) => {
    const currentBooking = existingBookingsMock.find((booking) => booking.locationName === currentBookingLocation);
    const futureBooking = existingBookingsMock.find((booking) => booking.locationName === futureBookingLocation);

    expect(currentBooking).toBeTruthy();
    expect(futureBooking).toBeTruthy();

    await test.step('Open the booking page and confirm the booking-only layout', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(/\/booking$/);
      await expect.poll(() => getBookingsCalled).toBeTruthy();
      await expect(bookingUiPage.heading).toBeVisible();
      await expect(bookingUiPage.exuiHeader.headerMenuItems).toHaveCount(0);
      await expect(page.getByLabel(existingBookingOption, { exact: true })).toBeVisible();
      await expect(page.getByLabel(createBookingOption, { exact: true })).toBeVisible();
      await expect(page.getByLabel(viewTasksAndCasesOption, { exact: true })).toBeVisible();
      await expect(bookingUiPage.genericContinueButton).toHaveCount(0);
    });

    await test.step('Select the existing booking option and verify rendered booking details', async () => {
      await bookingUiPage.selectOption(existingBookingOption);

      await expect(bookingUiPage.existingBookingCards).toHaveCount(2);
      await expect(bookingUiPage.existingBookingCards.nth(0)).toContainText(currentBookingLocation);
      await expect(bookingUiPage.existingBookingCards.nth(1)).toContainText(futureBookingLocation);
      await expect(bookingUiPage.existingBookingDateRange(currentBookingLocation)).toHaveText(
        formatBookingDateRange(currentBooking as BookingUiMock)
      );
      await expect(bookingUiPage.existingBookingDateRange(futureBookingLocation)).toHaveText(
        formatBookingDateRange(futureBooking as BookingUiMock)
      );
      await expect(bookingUiPage.existingBookingContinueButton(currentBookingLocation)).toBeEnabled();
      await expect(bookingUiPage.existingBookingContinueButton(futureBookingLocation)).toBeVisible();
      await expect(bookingUiPage.genericContinueButton).toHaveCount(0);
    });
  });

  test('create a new booking shows the primary continue button', async ({ bookingUiPage }) => {
    await bookingUiPage.goto();
    await expect.poll(() => getBookingsCalled).toBeTruthy();

    await bookingUiPage.selectOption(createBookingOption);

    await expect(bookingUiPage.genericContinueButton).toBeVisible();
  });

  test('view tasks and cases shows the primary continue button', async ({ bookingUiPage }) => {
    await bookingUiPage.goto();
    await expect.poll(() => getBookingsCalled).toBeTruthy();

    await bookingUiPage.selectOption(viewTasksAndCasesOption);

    await expect(bookingUiPage.genericContinueButton).toBeVisible();
  });
});

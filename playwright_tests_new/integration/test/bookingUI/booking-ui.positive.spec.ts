import { applySessionCookies } from 'playwright_tests_new/common/sessionCapture';
import { expect, test } from '../../../E2E/fixtures';
import { bookingLocationMock, existingBookingsMock } from './booking-ui.data';

const userIdentifier = 'BOOKING_UI-FT-ON';
let getBookingsCalled = false;

test.describe(`Booking UI as ${userIdentifier}`, { tag: ['@integration', '@integration-booking-ui'] }, () => {
  test.beforeEach(async ({ page }) => {
    getBookingsCalled = false;
    await applySessionCookies(page, userIdentifier);
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

  test('shows continue when choosing an existing booking', async ({ page, bookingUiPage }) => {
    await test.step('Navigate to booking UI and wait for bookings request', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(/\/booking$/);
      await expect.poll(() => getBookingsCalled).toBeTruthy();
      await expect(bookingUiPage.continueButton).toHaveCount(0);
    });

    await test.step('Select existing booking option and verify continue button', async () => {
      await bookingUiPage.selectOption('Choose an existing booking');
      await expect(bookingUiPage.continueButton).toBeVisible({ visible: false });
    });
  });

  test('shows continue when creating a new booking', async ({ page, bookingUiPage }) => {
    await test.step('Navigate to booking UI and wait for bookings request', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(/\/booking$/);
      await expect.poll(() => getBookingsCalled).toBeTruthy();
      await expect(bookingUiPage.continueButton).toHaveCount(0);
    });

    await test.step('Select create new booking option and verify continue button', async () => {
      await bookingUiPage.selectOption('Create a new booking');
      await expect(bookingUiPage.continueButton).toBeVisible();
    });
  });

  test('shows continue when viewing tasks and cases', async ({ page, bookingUiPage }) => {
    await test.step('Navigate to booking UI and wait for bookings request', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(/\/booking$/);
      await expect.poll(() => getBookingsCalled).toBeTruthy();
      await expect(bookingUiPage.continueButton).toHaveCount(0);
    });

    await test.step('Select view tasks and cases option and verify continue button', async () => {
      await bookingUiPage.selectOption('View tasks and cases');
      await expect(bookingUiPage.continueButton).toBeVisible();
    });
  });
});

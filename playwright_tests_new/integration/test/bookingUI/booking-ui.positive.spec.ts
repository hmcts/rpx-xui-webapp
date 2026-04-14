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

  test('shows work access page and core booking options', async ({ page }) => {
    await test.step('Navigate to booking home page', async () => {
      await page.goto('/booking');
      await expect(page).toHaveURL(/\/booking$/);
      await expect.poll(() => getBookingsCalled).toBeTruthy();
    });

    await test.step('Verify work access heading and radio options', async () => {
      await expect(page.locator('exui-booking-home')).toBeVisible();
    });

    await test.step('Verify continue button appears when existing booking is selected', async () => {
      await expect(page.getByRole('button', { name: 'Continue' })).toHaveCount(0);
      await page.getByLabel('Choose an existing booking').check();
      await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    });
  });
});

import { expect, test } from '../../../E2E/fixtures';
import { applyPrewarmedSessionCookies } from '../../helpers';

const userIdentifier = 'BOOKING_UI-FT-ON';

test.describe(`Booking UI as ${userIdentifier}`, { tag: ['@integration', '@integration-booking-ui'] }, () => {
  test.beforeEach(async ({ page }) => {
    await applyPrewarmedSessionCookies(page, userIdentifier);

    await page.route('**/am/getBookings', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });
  });

  test('shows work access page and core booking options', async ({ page }) => {
    await test.step('Navigate to booking home page', async () => {
      await page.goto('/booking');
      await expect(page).toHaveURL(/\/booking$/);
    });

    await test.step('Verify work access heading and radio options', async () => {
      await expect(page.getByRole('heading', { level: 1, name: 'Work access' })).toBeVisible();
      await expect(page.getByLabel('Create a new booking')).toBeVisible();
      await expect(page.getByLabel('View tasks and cases')).toBeVisible();
    });

    await test.step('Verify continue button appears when create booking is selected', async () => {
      await expect(page.getByRole('button', { name: 'Continue' })).toHaveCount(0);
      await page.getByLabel('Create a new booking').check();
      await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    });
  });
});

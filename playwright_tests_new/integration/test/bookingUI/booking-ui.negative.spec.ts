import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../helpers';
import { buildBookingUserDetailsMock } from '../../mocks/bookingUI.mock';

const sessionUserIdentifier = 'STAFF_ADMIN';

test.describe(
  `Booking UI guard via ${sessionUserIdentifier} session`,
  { tag: ['@integration', '@integration-booking-ui'] },
  () => {
    test.beforeEach(async ({ page }) => {
      const userId = await applySessionCookiesAndExtractUserId(page, sessionUserIdentifier);
      const userDetails = buildBookingUserDetailsMock({
        userId,
        roles: ['caseworker-judge', 'caseworker'],
        bookable: false,
      });

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

      await page.route('**/am/getBookings', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: '[]',
        });
      });
    });

    test('non-bookable judicial users are redirected back to cases before bookings are loaded', async ({
      bookingUiPage,
      page,
    }) => {
      await bookingUiPage.goto();

      await expect(page).toHaveURL(/\/cases(?:\/|$)/);
      await expect(bookingUiPage.container).toHaveCount(0);
      const bookingsRequestResult = await page
        .waitForRequest((request) => request.url().includes('/am/getBookings'), {
          timeout: 1_000,
        })
        .then(() => 'requested')
        .catch(() => 'timed-out');

      expect(bookingsRequestResult).toBe('timed-out');
    });
  }
);

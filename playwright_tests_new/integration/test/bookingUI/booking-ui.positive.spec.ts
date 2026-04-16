import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookiesAndExtractUserId } from '../../helpers';
import { bookingLocationMock, buildBookingUserDetailsMock, buildExistingBookingsMock } from '../../mocks/bookingUI.mock';

const sessionUserIdentifier = 'STAFF_ADMIN';
const existingBookingOption = 'Choose an existing booking';
const createBookingOption = 'Create a new booking';
const viewTasksAndCasesOption = 'View tasks and cases';
const currentBookingLocation = "Bromley Magistrates' Court";
const futureBookingLocation = 'Central London County Court';
let getBookingsCalled = false;

test.describe(`Booking UI via ${sessionUserIdentifier} session`, { tag: ['@integration', '@integration-booking-ui'] }, () => {
  test.beforeEach(async ({ page }) => {
    getBookingsCalled = false;
    const userId = await applySessionCookiesAndExtractUserId(page, sessionUserIdentifier);
    const userDetails = buildBookingUserDetailsMock({ userId });
    const existingBookingsMock = buildExistingBookingsMock(userId);

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

  test('existing booking choice shows ordered cards and keeps the primary continue button hidden', async ({
    bookingUiPage,
    page,
  }) => {
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

    await test.step('Select the existing booking option and verify card ordering and button states', async () => {
      await bookingUiPage.selectOption(existingBookingOption);

      await expect(bookingUiPage.existingBookingCards).toHaveCount(2);
      await expect(bookingUiPage.existingBookingCards.nth(0)).toContainText(currentBookingLocation);
      await expect(bookingUiPage.existingBookingCards.nth(1)).toContainText(futureBookingLocation);
      await expect(bookingUiPage.existingBookingContinueButton(currentBookingLocation)).toBeEnabled();
      await expect(bookingUiPage.existingBookingContinueButton(futureBookingLocation)).toBeDisabled();
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

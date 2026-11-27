import { expect, test } from '../../helpers/migrationTest.fixture';
import { BookingUiPage } from '../../../E2E/page-objects/pages/exui/bookingUi.po';
import { buildBookingUiBootstrapUser, setupBookingUiMockRoutes } from '../../helpers/bookingUiMockRoutes.helper';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import { setupTaskListMockRoutes } from '../../helpers/taskListMockRoutes.helper';
import { BOOKING_RANGE_YEAR, buildExistingBookingsMock, singleLocationMock } from '../../mocks/bookingUI.mock';
import { buildMyTaskListMock } from '../../mocks/taskList.mock';

test(
  'booking shows an actionable active record and a disabled past record',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page }, testInfo) => {
    const userId = 'synthetic-migration-judge';
    const user = buildBookingUiBootstrapUser(userId);
    await setupMigrationVisualRoutes(page, user.roles ?? []);
    await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 3), { bootstrapUser: user });
    let bookingsRequested = false;
    await setupBookingUiMockRoutes(page, {
      locationResponseBody: singleLocationMock,
      getBookingsResponseBody: buildExistingBookingsMock(userId),
      onGetBookings: () => {
        bookingsRequested = true;
      },
    });
    const booking = new BookingUiPage(page);
    await booking.goto();
    await expect(page).toHaveURL(/\/booking$/);
    await expect.poll(() => bookingsRequested).toBe(true);
    await booking.selectOption('Choose an existing booking');
    await expect(booking.existingBookingButton(0)).toBeEnabled();
    await expect(booking.existingBookingButton(1)).toBeDisabled();
    const state = await captureMigrationState(page, testInfo, 'existing-booking');
    expect.soft(state.documentWidth, 'Booking should fit the viewport').toBeLessThanOrEqual(state.viewportWidth + 1);
    expect.soft(state.violations).toEqual([]);
  }
);

test(
  'reversed booking dates focus the invalid field and recover to review without booking',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page }, testInfo) => {
    const userId = 'synthetic-migration-judge';
    const user = buildBookingUiBootstrapUser(userId);
    await setupMigrationVisualRoutes(page, user.roles ?? []);
    await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 3), { bootstrapUser: user });
    const submissions: unknown[] = [];
    await setupBookingUiMockRoutes(page, {
      locationResponseBody: singleLocationMock,
      getBookingsResponseBody: buildExistingBookingsMock(userId),
      onCreateBooking: async (route) => {
        submissions.push(route.request().postDataJSON());
        await route.fulfill({ status: 400, json: { message: 'Synthetic booking must stop at review' } });
      },
    });
    const booking = new BookingUiPage(page);
    await booking.goto();
    await booking.selectOption('Create a new booking');
    await booking.continue();
    await booking.selectFirstLocationFromSearch('Lon');
    await booking.continue();
    await booking.chooseDateRangeBooking();
    await booking.enterBookingDate('startDate', '19', '7', BOOKING_RANGE_YEAR);
    await booking.enterBookingDate('endDate', '17', '7', BOOKING_RANGE_YEAR);
    await booking.continueButton.press('Enter');
    const error = page.getByRole('link', {
      name: 'The booking end date cannot be earlier than the booking start date',
      exact: true,
    });
    await expect(error).toBeVisible();
    await expect(booking.bookingButton).toHaveCount(0);
    expect(submissions).toEqual([]);
    const context = new URL(page.url());
    await error.press('Enter');
    await testInfo.attach('booking-error-link-outcome', {
      body: JSON.stringify({
        href: await error.getAttribute('href'),
        active: await page.evaluate(() => ({ tag: document.activeElement?.tagName, id: document.activeElement?.id })),
        submissions,
      }),
      contentType: 'application/json',
    });
    await expect
      .soft(page, 'The error link must retain the booking route')
      .toHaveURL((url) => url.pathname === context.pathname && url.search === context.search);
    await expect.soft(page.locator('#startDate-day'), 'The first invalid date field must receive keyboard focus').toBeFocused();

    await booking.enterBookingDate('startDate', '17', '7', BOOKING_RANGE_YEAR);
    await booking.enterBookingDate('endDate', '19', '7', BOOKING_RANGE_YEAR);
    await booking.continueButton.press('Enter');
    await expect(booking.bookingButton).toBeVisible();
    await expect(booking.bookingButton).toBeEnabled();
    await expect(page.getByRole('heading', { name: /Check your new booking/ })).toBeVisible();
    await expect(page.getByRole('alert')).toHaveCount(0);
    const summary = await booking.getSummaryListPairs();
    expect(summary).toEqual([
      { key: 'Location', value: singleLocationMock[0].court_name },
      { key: 'Duration', value: `17 July ${BOOKING_RANGE_YEAR} to 19 July ${BOOKING_RANGE_YEAR}` },
    ]);
    expect(submissions, 'Review must not create a booking').toEqual([]);
    await testInfo.attach('booking-corrected-review', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  }
);

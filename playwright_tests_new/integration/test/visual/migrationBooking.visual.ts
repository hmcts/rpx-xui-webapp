import { expect, test } from '@playwright/test';
import { BookingUiPage } from '../../../E2E/page-objects/pages/exui/bookingUi.po';
import { buildBookingUiBootstrapUser, setupBookingUiMockRoutes } from '../../helpers/bookingUiMockRoutes.helper';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import { setupTaskListMockRoutes } from '../../helpers/taskListMockRoutes.helper';
import { buildExistingBookingsMock, singleLocationMock } from '../../mocks/bookingUI.mock';
import { buildMyTaskListMock } from '../../mocks/taskList.mock';

test(
  'booking shows an actionable active record and a disabled past record',
  { tag: '@migration-sweep' },
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

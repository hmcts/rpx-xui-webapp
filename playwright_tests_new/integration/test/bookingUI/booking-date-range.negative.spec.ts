import { expect, test } from '../../../E2E/fixtures';
import { setupBookableBookingUiRoutesForTest } from '../../helpers/bookingUiMockRoutes.helper';
import { BOOKING_RANGE_YEAR } from '../../mocks/bookingUI.mock';

test(
  'a reversed booking range cannot submit or reach confirmation',
  { tag: ['@integration', '@integration-booking-ui'] },
  async ({ page, bookingUiPage }, testInfo) => {
    let bookingRequests = 0;
    await setupBookableBookingUiRoutesForTest(page, testInfo, {
      onCreateBooking: async (route) => {
        bookingRequests += 1;
        await route.fulfill({ json: { bookingResponse: {} } });
      },
    });
    await bookingUiPage.goto();
    await bookingUiPage.selectOption('Create a new booking');
    await bookingUiPage.continue();
    await bookingUiPage.selectFirstLocationFromSearch('Lon');
    await bookingUiPage.continue();
    await bookingUiPage.chooseDateRangeBooking();
    await bookingUiPage.enterBookingDate('startDate', '19', '7', BOOKING_RANGE_YEAR);
    await bookingUiPage.enterBookingDate('endDate', '17', '7', BOOKING_RANGE_YEAR);
    await bookingUiPage.continue();
    await expect(bookingUiPage.exuiHeader.errorHeader).toContainText(
      'The booking end date cannot be earlier than the booking start date'
    );
    await expect(bookingUiPage.bookingButton).toHaveCount(0);
    await expect(page).toHaveURL(/\/booking$/);
    expect(bookingRequests).toBe(0);
  }
);

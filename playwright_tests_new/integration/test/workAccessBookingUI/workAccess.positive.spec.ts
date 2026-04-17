import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupManageTasksBaseRoutes, setupWorkAccessBookingMockRoutes } from '../../helpers';
import { defaultWorkAccessBookings, defaultWorkAccessLocations } from '../../mocks/workAccessBooking.mock';

const userIdentifier = 'STAFF_ADMIN';

const formatBookingDate = (isoTimestamp: string): string =>
  new Date(isoTimestamp).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  });

const getBookingEndDisplayDate = (isoTimestamp: string): string => {
  const date = new Date(isoTimestamp);
  date.setUTCDate(date.getUTCDate() - 1);
  return formatBookingDate(date.toISOString());
};

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Work access as ${userIdentifier}`, { tag: ['@integration', '@integration-booking'] }, () => {
  test('Bookable judicial users see the current booking choices and existing booking details', async ({ bookingPage, page }) => {
    await test.step('Setup booking mock routes', async () => {
      await setupWorkAccessBookingMockRoutes(page);
    });

    await test.step('Open Work access and verify the current booking options', async () => {
      await bookingPage.goto();

      await expect(bookingPage.heading).toBeVisible();
      await expect(bookingPage.existingBookingsRadio).toBeVisible();
      await expect(bookingPage.createNewBookingRadio).toBeVisible();
      await expect(bookingPage.viewTasksAndCasesRadio).toBeVisible();
      await expect(bookingPage.continueButton).not.toBeVisible();
    });

    await test.step('Select existing bookings and verify the rendered booking cards', async () => {
      await bookingPage.existingBookingsRadio.check();

      await expect(bookingPage.continueButton).not.toBeVisible();
      await expect(bookingPage.existingBookingCards).toHaveCount(defaultWorkAccessBookings.length);

      for (const booking of defaultWorkAccessBookings) {
        const bookingCard = bookingPage.getExistingBookingCard(booking.locationName);
        await expect(bookingCard).toBeVisible();
        await expect(bookingCard).toContainText(booking.locationName);
        await expect(bookingCard).toContainText(formatBookingDate(booking.beginTime));
        await expect(bookingCard).toContainText(getBookingEndDisplayDate(booking.endTime));
      }
    });

    await test.step('Verify the primary continue button only appears for the navigational options', async () => {
      await bookingPage.createNewBookingRadio.check();
      await expect(bookingPage.continueButton).toBeVisible();

      await bookingPage.viewTasksAndCasesRadio.check();
      await expect(bookingPage.continueButton).toBeVisible();
    });
  });

  test('Create new booking opens the location step and searches mocked locations', async ({ bookingPage, page }) => {
    await test.step('Setup booking mock routes', async () => {
      await setupWorkAccessBookingMockRoutes(page);
    });

    await test.step('Open the location step from Work access', async () => {
      await bookingPage.goto();
      await bookingPage.createNewBookingRadio.check();
      await bookingPage.continueButton.click();

      await expect(bookingPage.locationHeading).toBeVisible();
      await expect(bookingPage.locationSearchInput).toBeVisible();
    });

    await test.step('Verify location search calls the mocked API with the typed term', async () => {
      const locationSearchRequestPromise = page.waitForRequest((request) => {
        if (!request.url().includes('/api/locations/getLocations') || request.method() !== 'POST') {
          return false;
        }

        try {
          const requestBody = request.postDataJSON() as { searchTerm?: string };
          return requestBody.searchTerm === 'Test';
        } catch {
          return false;
        }
      });

      await bookingPage.locationSearchInput.fill('Test');

      const locationSearchRequest = await locationSearchRequestPromise;
      expect(locationSearchRequest.postDataJSON()).toEqual(
        expect.objectContaining({
          searchTerm: 'Test',
        })
      );

      await expect.poll(async () => bookingPage.locationSearchOptions.count()).toBe(defaultWorkAccessLocations.length);
      await expect(bookingPage.locationSearchOptions.first()).toContainText('Test location 1');
    });
  });

  test('Viewing tasks and cases from Work access opens the My tasks list', async ({ bookingPage, page, taskListPage }) => {
    await test.step('Setup booking and task-list routes', async () => {
      await setupWorkAccessBookingMockRoutes(page);
      await setupManageTasksBaseRoutes(page, { taskListResponse: { tasks: [], total_records: 0 } });
    });

    await test.step('Continue from View tasks and cases to My tasks', async () => {
      await bookingPage.goto();
      await bookingPage.viewTasksAndCasesRadio.check();
      await bookingPage.continueButton.click();

      await page.waitForURL(/\/work\/my-work\/list(?:\?.*)?$/);
      await expect(taskListPage.taskListTable).toBeVisible();
    });
  });

  test('Existing booking cards only enable Continue for currently active bookings', async ({ bookingPage, page }) => {
    await test.step('Setup booking routes', async () => {
      await setupWorkAccessBookingMockRoutes(page);
    });

    await test.step('Open existing bookings and verify enabled and disabled Continue buttons', async () => {
      await bookingPage.goto();
      await bookingPage.existingBookingsRadio.check();

      await expect(bookingPage.getExistingBookingContinueButton('Test location 1')).toBeEnabled();
      await expect(bookingPage.getExistingBookingContinueButton('Test location 2')).toBeDisabled();
      await expect(bookingPage.getExistingBookingContinueButton('Test location 3')).toBeDisabled();
    });
  });
});

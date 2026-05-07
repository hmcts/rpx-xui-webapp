import { setupBookableBookingUiRoutesForTest, warmBookableBookingUiSessionForWorker } from '../../helpers';
import { expect, test } from '../../../E2E/fixtures';
import {
  singleLocationMock,
  type CreateBookingRequest,
  type CreateBookingResponse,
  getExpectedTodayOnlyCreateBookingRange,
} from '../../mocks/bookingUI.mock';
import { formatUiDate, normalizeUiDateValue } from '../../utils/tableUtils';

const defaultBookingLocation = singleLocationMock[0];
const bookingPageUrlPattern = /\/booking$/;
const tasksPageUrlPattern = /\/work\/my-work\/list/;
const sessionWarmupTimeoutMs = 3 * 60_000;

test.describe('Booking UI with lazy pooled session users', { tag: ['@integration', '@integration-booking-ui'] }, () => {
  test.beforeAll(async ({}, workerInfo) => {
    test.setTimeout(sessionWarmupTimeoutMs);
    await warmBookableBookingUiSessionForWorker(workerInfo);
  });

  test('can continue when choosing an existing booking', async ({ page, bookingUiPage }, testInfo) => {
    const routeState = await setupBookableBookingUiRoutesForTest(page, testInfo);

    await test.step('Navigate to booking UI and wait for bookings request', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await expect.poll(routeState.getBookingsCalled).toBeTruthy();
      await expect(bookingUiPage.continueButton).toHaveCount(0);
    });

    await test.step('Select existing booking and verify enabled/disabled booking buttons', async () => {
      await bookingUiPage.selectOption('Choose an existing booking');
      await expect(bookingUiPage.existingBookingButton(1)).toBeDisabled();
    });

    await test.step('Continue with the active booking and redirect to my work list', async () => {
      await bookingUiPage.continueWithExistingBooking(0);
      await expect(page).toHaveURL(tasksPageUrlPattern);
    });
  });

  test('can continue when creating a new booking', async ({ page, bookingUiPage }, testInfo) => {
    let createBookingCalled = false;
    let createBookingRequestBody: CreateBookingRequest | undefined;
    let createBookingResponseBody: CreateBookingResponse | undefined;
    const routeState = await setupBookableBookingUiRoutesForTest(page, testInfo, {
      onCreateBooking: async (route) => {
        createBookingCalled = true;
        const requestBody = route.request().postDataJSON() as CreateBookingRequest;
        createBookingRequestBody = requestBody;
        createBookingResponseBody = {
          bookingResponse: {
            id: `mock-booking-${Date.now()}`,
            userId: requestBody.userId,
            regionId: requestBody.regionId,
            locationId: requestBody.locationId,
            created: new Date().toISOString(),
            beginTime: new Date(requestBody.beginDate).toISOString(),
            endTime: new Date(new Date(requestBody.endDate).getTime() + 1).toISOString(),
            log: 'Booking record is successfully created',
          },
        };
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(createBookingResponseBody),
        });
      },
    });

    await test.step('Navigate to booking UI and wait for bookings request', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await expect.poll(routeState.getBookingsCalled).toBeTruthy();
      await expect(bookingUiPage.continueButton).toHaveCount(0);
    });

    await test.step('Select create new booking option and verify continue button', async () => {
      await bookingUiPage.selectOption('Create a new booking');
      await expect(bookingUiPage.continueButton).toBeVisible();
    });

    await test.step('Continue and move to booking location step', async () => {
      await bookingUiPage.continue();
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await bookingUiPage.selectFirstLocationFromSearch('Lon');
      await bookingUiPage.continue();
    });

    await test.step('Select the booking time as today only', async () => {
      await bookingUiPage.chooseTodayOnlyBooking();
      await bookingUiPage.continue();
    });

    await test.step('Verify check your answers and submit', async () => {
      const table = await bookingUiPage.getSummaryListPairs();
      const today = formatUiDate(new Date().toISOString());
      expect(table[0]).toEqual({
        key: 'Location',
        value: routeState.existingBookingsMock[0].locationName,
      });
      expect(table[1].key).toBe('Duration');
      expect(normalizeUiDateValue(table[1].value)).toBe(`${today} to ${today}`);
      await bookingUiPage.confirmBooking();
    });

    await test.step('Intercept create booking API request and verify payload', async () => {
      await expect.poll(() => createBookingCalled).toBeTruthy();
      expect(createBookingRequestBody).toBeDefined();
      expect(createBookingResponseBody).toBeDefined();
      const submittedRequest = createBookingRequestBody as CreateBookingRequest;
      const expectedTodayBookingRange = getExpectedTodayOnlyCreateBookingRange(new Date(submittedRequest.beginDate));
      expect(createBookingRequestBody).toEqual({
        userId: routeState.sessionUserId,
        locationId: defaultBookingLocation.epimms_id,
        regionId: defaultBookingLocation.region_id,
        beginDate: expectedTodayBookingRange.beginDate,
        endDate: expectedTodayBookingRange.endDate,
      });
      const bookingResponse = createBookingResponseBody!.bookingResponse;
      expect(bookingResponse.userId).toBe(routeState.sessionUserId);
      expect(bookingResponse.locationId).toBe(defaultBookingLocation.epimms_id);
      expect(bookingResponse.regionId).toBe(defaultBookingLocation.region_id);
      expect(bookingResponse.beginTime).toBe(submittedRequest.beginDate);
      expect(bookingResponse.endTime).toBe(new Date(new Date(submittedRequest.endDate).getTime() + 1).toISOString());
      expect(bookingResponse.log).toBe('Booking record is successfully created');
      expect(bookingResponse.id).toBeTruthy();
      expect(Number.isNaN(Date.parse(bookingResponse.created))).toBeFalsy();
    });

    await test.step('Continue and redirect to my work list', async () => {
      await expect(page).toHaveURL(tasksPageUrlPattern);
    });
  });

  test('can continue when viewing tasks and cases', async ({ page, bookingUiPage }, testInfo) => {
    const routeState = await setupBookableBookingUiRoutesForTest(page, testInfo);

    await test.step('Navigate to booking UI and wait for bookings request', async () => {
      await bookingUiPage.goto();
      await expect(page).toHaveURL(bookingPageUrlPattern);
      await expect.poll(routeState.getBookingsCalled).toBeTruthy();
      await expect(bookingUiPage.continueButton).toHaveCount(0);
    });

    await test.step('Select view tasks and cases option and verify continue button', async () => {
      await bookingUiPage.selectOption('View tasks and cases');
      await expect(bookingUiPage.continueButton).toBeVisible();
    });

    await test.step('Continue and redirect to my work list', async () => {
      await bookingUiPage.continue();
      await expect(page).toHaveURL(tasksPageUrlPattern);
    });
  });
});

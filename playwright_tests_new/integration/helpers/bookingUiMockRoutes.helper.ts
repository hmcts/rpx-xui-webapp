import type { Page, Route, TestInfo } from '@playwright/test';
import { buildExistingBookingsMock, singleLocationMock } from '../mocks/bookingUI.mock';
import { buildMyTaskListMock } from '../mocks/taskList.mock';
import { resolveBookingUiSessionCandidates } from './bookingUiUserPool.helper';
import { withOrderedSessionFallback } from '../../common/orderedSessionFallback';
import { applySessionCookiesAndExtractUserId } from './sessionUser.helper';
import { setupTaskListMockRoutes, type TaskListBootstrapUserOptions } from './taskListMockRoutes.helper';

type RouteHandler = (route: Route) => Promise<void>;

type BookingUiMockRoutesOptions = {
  locationResponseBody: unknown;
  getBookingsResponseBody: unknown;
  onGetBookings?: () => void;
  onCreateBooking?: RouteHandler;
  onRefreshRoleAssignments?: RouteHandler;
};

type BookingUiTestRoutesOptions = {
  onCreateBooking?: RouteHandler;
  onRefreshRoleAssignments?: RouteHandler;
};

export type BookingUiTestRouteState = {
  existingBookingsMock: ReturnType<typeof buildExistingBookingsMock>;
  getBookingsCalled: () => boolean;
  sessionUserId: string;
  sessionUserIdentifier: string;
};

export const buildBookingUiBootstrapUser = (userId: string): TaskListBootstrapUserOptions => ({
  userId,
  roleCategory: 'JUDICIAL',
  roles: ['caseworker-judge'],
  roleAssignments: [
    {
      bookable: true,
      jurisdiction: 'IA',
      roleName: 'fee-paid-judge',
      roleType: 'ORGANISATION',
      substantive: 'Y',
    },
  ],
});

export async function setupBookingUiMockRoutes(page: Page, options: BookingUiMockRoutesOptions): Promise<void> {
  const { locationResponseBody, getBookingsResponseBody, onGetBookings, onCreateBooking, onRefreshRoleAssignments } = options;

  await page.route('**/api/locations/getLocations*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(locationResponseBody),
    });
  });

  await page.route('**/am/getBookings', async (route) => {
    onGetBookings?.();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(getBookingsResponseBody),
    });
  });

  await page.route('**/am/createBooking', async (route) => {
    if (onCreateBooking) {
      await onCreateBooking(route);
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ bookingResponse: {} }),
    });
  });

  await page.route('**/am/role-mapping/judicial/refresh', async (route) => {
    if (onRefreshRoleAssignments) {
      await onRefreshRoleAssignments(route);
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });
}

export async function setupBookableBookingUiRoutesForTest(
  page: Page,
  testInfo: Pick<TestInfo, 'parallelIndex' | 'annotations'>,
  options: BookingUiTestRoutesOptions = {},
  applySession: typeof applySessionCookiesAndExtractUserId = applySessionCookiesAndExtractUserId
): Promise<BookingUiTestRouteState> {
  let getBookingsCalled = false;
  const { selectedUserIdentifier, value: userId } = await withOrderedSessionFallback(
    resolveBookingUiSessionCandidates(testInfo),
    (identity) => applySession(page, identity)
  );
  testInfo.annotations.push({ type: 'session-user', description: selectedUserIdentifier });
  const existingBookingsMock = buildExistingBookingsMock(userId);

  await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 3), {
    bootstrapUser: buildBookingUiBootstrapUser(userId),
  });
  await setupBookingUiMockRoutes(page, {
    locationResponseBody: singleLocationMock,
    getBookingsResponseBody: existingBookingsMock,
    onGetBookings: () => {
      getBookingsCalled = true;
    },
    onCreateBooking: options.onCreateBooking,
    onRefreshRoleAssignments: options.onRefreshRoleAssignments,
  });

  return {
    existingBookingsMock,
    getBookingsCalled: () => getBookingsCalled,
    sessionUserId: userId,
    sessionUserIdentifier: selectedUserIdentifier,
  };
}

import type { Page, Route } from '@playwright/test';
import type { TaskListBootstrapUserOptions } from './taskListMockRoutes.helper';

type RouteHandler = (route: Route) => Promise<void>;

type BookingUiMockRoutesOptions = {
  locationResponseBody: unknown;
  getBookingsResponseBody: unknown;
  onGetBookings?: () => void;
  onCreateBooking?: RouteHandler;
  onRefreshRoleAssignments?: RouteHandler;
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

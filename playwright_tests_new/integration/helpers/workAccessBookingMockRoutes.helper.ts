import type { Page } from '@playwright/test';
import {
  buildWorkAccessUserDetails,
  defaultWorkAccessBookings,
  defaultWorkAccessLocations,
  type WorkAccessBooking,
  type WorkAccessLocation,
} from '../mocks/workAccessBooking.mock';

type WorkAccessBookingMockRouteOptions = {
  bookings?: WorkAccessBooking[];
  locations?: WorkAccessLocation[];
  roleAssignments?: Array<Record<string, unknown>>;
  roles?: string[];
  roleCategory?: string;
  userId?: string;
};

export async function setupWorkAccessBookingMockRoutes(
  page: Page,
  options: WorkAccessBookingMockRouteOptions = {}
): Promise<ReturnType<typeof buildWorkAccessUserDetails>> {
  const userDetails = buildWorkAccessUserDetails({
    roles: options.roles,
    roleCategory: options.roleCategory,
    roleAssignments: options.roleAssignments,
    userId: options.userId,
  });
  const bookings = options.bookings ?? defaultWorkAccessBookings;
  const locations = options.locations ?? defaultWorkAccessLocations;
  const bookableServices = Array.from(
    new Set(
      userDetails.roleAssignmentInfo
        .filter((assignment) => assignment.bookable === true || assignment.bookable === 'true')
        .map((assignment) => String(assignment.jurisdiction))
    )
  );

  await page.addInitScript(
    ({ seededUserInfo, seededBookableServices }) => {
      window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
      window.sessionStorage.setItem('bookableServices', JSON.stringify(seededBookableServices));
      window.sessionStorage.setItem('bookableUserLocations', JSON.stringify([]));
    },
    {
      seededUserInfo: userDetails.userInfo,
      seededBookableServices: bookableServices,
    }
  );

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.route('**/api/healthCheck*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ healthState: true }),
    });
  });

  await page.route('**/workallocation/region-location*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/am/getBookings*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(bookings),
    });
  });

  await page.route('**/am/role-mapping/judicial/refresh*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Role assignments have been refreshed successfully' }),
    });
  });

  await page.route('**/api/locations/getLocations*', async (route) => {
    const requestBody =
      (route.request().postDataJSON() as {
        searchTerm?: string;
      }) ?? {};
    const searchTerm = (requestBody.searchTerm ?? '').toLowerCase();
    const filteredLocations = locations.filter((location) =>
      (location.site_name ?? location.court_name ?? '').toLowerCase().includes(searchTerm)
    );

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(filteredLocations),
    });
  });

  return userDetails;
}

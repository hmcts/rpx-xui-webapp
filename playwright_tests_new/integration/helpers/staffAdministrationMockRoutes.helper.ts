import type { Page } from '@playwright/test';
import {
  secondStaffUser,
  secondStaffUserId,
  staffFilterOptions,
  staffSearchResults,
  staffUser,
  staffUserId,
} from '../mocks/staffAdministration.mock';
import { setupXuiAppShellBaseRoutes } from './xuiAppShellMockRoutes.helper';

type StaffAdministrationMockOptions = {
  updateStatus?: number;
  refetchStatus?: number;
  initialUser?: typeof staffUser;
  adminRole?: boolean;
};

export async function setupStaffAdministrationMockRoutes(page: Page, options: StaffAdministrationMockOptions = {}) {
  let currentUser = { ...(options.initialUser ?? staffUser) };
  let addedUser: typeof staffUser | null = null;
  const updateRequests: unknown[] = [];
  const addRequests: unknown[] = [];

  await setupXuiAppShellBaseRoutes(page, {
    userDetails: { userId: 'staff-admin-synthetic', roles: options.adminRole === false ? ['caseworker'] : ['staff-admin'] },
  });

  await page.route('**/auth/isAuthenticated*', (route) => route.fulfill({ status: 200, json: true }));
  await page.route('**/api/ref-data/services*', (route) => route.fulfill({ status: 200, json: staffFilterOptions.services }));
  await page.route('**/api/ref-data/regions*', (route) => route.fulfill({ status: 200, json: staffFilterOptions.regions }));
  await page.route('**/api/ref-data/locations-by-service-code*', (route) => {
    const serviceCodes = new URL(route.request().url()).searchParams.get('service_code') || '';
    const courtVenues = [
      { epimms_id: '1', venue_name: 'Taylor House', serviceCodes: ['IA'] },
      { epimms_id: '2', venue_name: 'Oxford Court', serviceCodes: ['FA'] },
    ].filter((venue) => serviceCodes.includes(venue.serviceCodes[0]));
    return route.fulfill({ status: 200, json: { court_venues: courtVenues } });
  });
  await page.route('**/api/staff-ref-data/getUserTypes*', (route) =>
    route.fulfill({ status: 200, json: staffFilterOptions.userTypes })
  );
  await page.route('**/api/staff-ref-data/getJobTitles*', (route) =>
    route.fulfill({ status: 200, json: staffFilterOptions.jobTitles })
  );
  await page.route('**/api/staff-ref-data/getSkills*', (route) =>
    route.fulfill({ status: 200, json: staffFilterOptions.skills })
  );
  await page.route('**/api/staff-ref-data/getUsersByPartialName*', (route) => {
    const search = new URL(route.request().url()).searchParams.get('search');
    const items = search === 'Jane' ? [currentUser, secondStaffUser] : search === 'Alex' && addedUser ? [addedUser] : [];
    return route.fulfill({ status: 200, json: staffSearchResults(items) });
  });
  await page.route('**/api/staff-ref-data/fetchSingleUserById*', (route) => {
    const requestedId = new URL(route.request().url()).searchParams.get('id');
    const user =
      requestedId === staffUserId
        ? currentUser
        : requestedId === secondStaffUserId
          ? secondStaffUser
          : requestedId === 'staff-added-001'
            ? addedUser
            : null;
    return route.fulfill({
      status: options.refetchStatus && updateRequests.length > 0 ? options.refetchStatus : user ? 200 : 404,
      json: options.refetchStatus && updateRequests.length > 0 ? {} : user || {},
    });
  });
  await page.route('**/api/staff-ref-data/updateUser*', (route) => {
    const requestBody = route.request().postDataJSON() as typeof staffUser;
    updateRequests.push(requestBody);
    if (options.updateStatus && options.updateStatus !== 200) {
      return route.fulfill({ status: options.updateStatus, json: { errorDescription: 'Staff update was rejected' } });
    }
    currentUser = {
      ...currentUser,
      ...requestBody,
      up_idam_status: requestBody.suspended ? 'SUSPENDED' : 'ACTIVE',
    };
    return route.fulfill({ status: 200, json: { case_worker_id: staffUserId } });
  });

  await page.route('**/api/staff-ref-data/addNewUser*', (route) => {
    const requestBody = route.request().postDataJSON() as typeof staffUser;
    addRequests.push(requestBody);
    addedUser = {
      ...staffUser,
      ...requestBody,
      case_worker_id: 'staff-added-001',
      up_idam_status: 'ACTIVE',
    };
    return route.fulfill({ status: 200, json: { case_worker_id: 'staff-added-001' } });
  });

  return { updateRequests, addRequests };
}

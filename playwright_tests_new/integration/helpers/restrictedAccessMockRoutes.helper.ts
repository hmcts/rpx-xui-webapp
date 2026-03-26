import type { Page } from '@playwright/test';

export const DEFAULT_ROLE_ACCESS_USERS = [
  {
    name: 'case-role-1',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'Case role A',
    roleId: 'role-1',
    location: 'Taylor House',
    start: '2024-01-01T00:00:00.000Z',
    end: '2025-01-01T00:00:00.000Z',
    id: 'assignment-1',
    actorId: 'idam-111',
    email: 'alice@example.com',
  },
  {
    name: 'case-role-2',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'Case role B',
    roleId: 'role-2',
    location: 'Taylor House',
    start: '2024-01-01T00:00:00.000Z',
    end: '2025-01-01T00:00:00.000Z',
    id: 'assignment-2',
    actorId: 'idam-222',
    email: 'bob@example.com',
  },
];

export const DEFAULT_CASEWORKERS = [
  {
    email: 'alice@example.com',
    firstName: 'Alice',
    idamId: 'idam-111',
    lastName: 'Example',
    location: {
      id: 227101,
      locationName: 'Taylor House',
    },
    roleCategory: 'LEGAL_OPERATIONS',
    service: 'PUBLICLAW',
  },
  {
    email: 'bob@example.com',
    firstName: 'Bob',
    idamId: 'idam-222',
    lastName: 'Example',
    location: {
      id: 227101,
      locationName: 'Taylor House',
    },
    roleCategory: 'LEGAL_OPERATIONS',
    service: 'PUBLICLAW',
  },
];

export type RestrictedAccessMockOverrides = {
  roleAccessStatus?: number;
  roleAccessBody?: object;
  caseworkersStatus?: number;
  caseworkersBody?: object;
};

export async function setupRestrictedAccessMocks(page: Page, overrides: RestrictedAccessMockOverrides = {}): Promise<void> {
  const {
    roleAccessStatus = 200,
    roleAccessBody = DEFAULT_ROLE_ACCESS_USERS,
    caseworkersStatus = 200,
    caseworkersBody = DEFAULT_CASEWORKERS,
  } = overrides;

  await page.route('**/api/role-access/roles/access-get-by-caseId*', async (route) => {
    await route.fulfill({
      status: roleAccessStatus,
      contentType: 'application/json',
      body: JSON.stringify(roleAccessBody),
    });
  });

  await page.route('**/api/wa-supported-jurisdiction/get*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(['PUBLICLAW']),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: caseworkersStatus,
      contentType: 'application/json',
      body: JSON.stringify(caseworkersBody),
    });
  });

  await page.route('**/api/prd/judicial/searchJudicialUserByIdamId*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });
}

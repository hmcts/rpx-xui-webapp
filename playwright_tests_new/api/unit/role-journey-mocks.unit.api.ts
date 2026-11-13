import { expect, test, type Page, type Route, type Request } from '@playwright/test';
import { buildRolesAndAccessUserDetails } from '../../integration/helpers/rolesAndAccessMockRoutes.helper';
import { captureRoleMutations, setupRoleJourney, setupRoleReadback } from '../../integration/helpers/roleJourneys.helper';

import { reallocatedRecords, roleCaseId } from '../../integration/mocks/roleJourneys.mock';

test.describe('Role journey mock contracts', () => {
  for (const isCaseAllocator of [true, false]) {
    test(`allocator flag ${isCaseAllocator} agrees with the route guard role`, () => {
      const details = buildRolesAndAccessUserDetails({ isCaseAllocator });
      expect((details.userInfo.roles as string[]).includes('case-allocator')).toBe(isCaseAllocator);
      expect(details.roleAssignmentInfo[0].isCaseAllocator).toBe(isCaseAllocator);
      expect(details.roleAssignmentInfo[0].substantive).toBe('Y');
      expect(details.userInfo.roles).toContain('caseworker-ia');
    });
  }

  for (const status of [200, 500]) {
    test(`captures the request and returns configured status ${status} without changing its body`, async () => {
      let handler: ((route: Route) => Promise<void>) | undefined;
      let pattern: RegExp | undefined;
      const page = {
        route: async (url: RegExp, callback: (route: Route) => Promise<void>) => {
          pattern = url;
          handler = callback;
        },
      } as unknown as Page;
      const requests = await captureRoleMutations(page, status);
      const request = { method: () => 'POST', postDataJSON: () => ({ assigmentId: 'selected-assignment' }) } as Request;
      let response: unknown;
      await handler!({
        request: () => request,
        fulfill: async (value: unknown) => {
          response = value;
        },
      } as unknown as Route);
      expect(requests).toEqual([request]);
      expect(requests[0].postDataJSON()).toEqual({ assigmentId: 'selected-assignment' });
      expect(response).toEqual({ status, contentType: 'application/json', body: '{}' });
      expect(pattern!.test('http://localhost/api/role-access/allocate-role/delete')).toBe(true);
      expect(pattern!.test('http://localhost/api/role-access/exclusions/confirm')).toBe(true);
      expect(pattern!.test('http://localhost/api/role-access/roles/post')).toBe(false);
    });
  }
});

test('readback preserves the acting persona and only serves the exact case identity', async () => {
  type Matcher = string | RegExp | ((url: URL) => boolean);
  const handlers = new Map<Matcher, (route: Route) => Promise<void>>();
  const registrations: Matcher[] = [];
  const page = {
    addInitScript: async () => {},
    route: async (pattern: Matcher, handler: (route: Route) => Promise<void>) => {
      registrations.push(pattern);
      handlers.set(pattern, handler);
    },
  } as unknown as Page;
  await setupRoleJourney(page);
  const personaHandler = handlers.get('**/api/user/details*')!;
  const replies: Array<{ json?: unknown; body?: string }> = [];
  const route = {
    fulfill: async (response: { json?: unknown; body?: string }) => {
      replies.push(response);
    },
  } as unknown as Route;
  await personaHandler(route);
  expect(replies[0].json).toMatchObject({ userInfo: { id: '11111111-1111-4111-8111-111111111111', surname: 'Allocator' } });
  const caseMatcher = [...handlers.keys()].find((pattern) => typeof pattern === 'function') as (url: URL) => boolean;
  expect(caseMatcher(new URL(`http://localhost/data/internal/cases/${roleCaseId}`))).toBe(true);
  expect(caseMatcher(new URL(`http://localhost/data/internal/cases/${roleCaseId}?view=roles`))).toBe(true);
  expect(caseMatcher(new URL(`http://localhost/data/internal/cases/${roleCaseId}%23Roles%2520and%2520access`))).toBe(false);
  expect(caseMatcher(new URL(`http://localhost/data/internal/cases/${roleCaseId}9`))).toBe(false);
  registrations.length = 0;
  await setupRoleReadback(page, reallocatedRecords);
  expect(handlers.get('**/api/user/details*')).toBe(personaHandler);
  expect(registrations).toEqual(['**/api/role-access/roles/post*', '**/api/role-access/exclusions/post*']);
  await handlers.get('**/api/user/details*')!(route);
  expect(replies[1]).toEqual(replies[0]);
  await handlers.get('**/api/role-access/roles/post*')!(route);
  expect(replies[2].json).toEqual(
    expect.arrayContaining([expect.objectContaining({ id: 'assignment-clara', name: 'Clara Replacement' })])
  );
  expect(replies[2].json).not.toEqual(expect.arrayContaining([expect.objectContaining({ id: 'assignment-legal-ops-case-100' })]));
});

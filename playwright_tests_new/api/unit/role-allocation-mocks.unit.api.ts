import { expect, test, type Page, type Request, type Route } from '@playwright/test';
import { setupRoleAllocationMockRoutes } from '../../integration/helpers/roleAllocationMockRoutes.helper';
import {
  allocatedPerson,
  allocationOrganisation,
  existingJudicialRole,
  validAllocationRoles,
} from '../../integration/mocks/roleAllocation.mock';

type RouteHandler = (route: Route) => Promise<unknown> | unknown;

for (const status of [200, 422, 500]) {
  test(`role allocation readback changes only after successful confirmation (${status})`, { tag: '@svc-internal' }, async () => {
    const handlers = new Map<string, RouteHandler>();
    const page = {
      addInitScript: async () => {},
      route: async (pattern: string | RegExp | ((url: URL) => boolean), handler: RouteHandler) => {
        if (typeof pattern === 'string') {
          handlers.set(pattern, handler);
        }
      },
    } as unknown as Page;
    const { requests, getUnexpectedRequests } = await setupRoleAllocationMockRoutes(page, { status });
    expect([...handlers.keys()][0]).toBe('**/*');
    const replies: Array<{ json?: unknown; status?: number }> = [];
    const request = { method: () => 'POST', postDataJSON: () => ({ caseId: 'selected-case' }) } as Request;
    const route = {
      request: () => request,
      fulfill: async (response: { json?: unknown; status?: number }) => {
        replies.push(response);
      },
    } as Route;

    await handlers.get('**/api/organisation')!(route);
    expect(replies.pop()?.json).toEqual(allocationOrganisation);
    await handlers.get('**/api/role-access/allocate-role/valid-roles*')!(route);
    expect(replies.pop()?.json).toEqual(validAllocationRoles);
    await handlers.get('**/api/role-access/roles/post*')!(route);
    const initialRoles = replies.pop()?.json;
    expect(initialRoles).toEqual(expect.arrayContaining([expect.objectContaining({ id: existingJudicialRole.assignmentId })]));
    expect(initialRoles).toHaveLength(1);
    expect(requests).toEqual([]);
    await handlers.get('**/workallocation/caseworker/getUsersByIdamIds*')!(route);
    expect(replies.pop()?.json).toEqual([]);

    await handlers.get('**/api/role-access/allocate-role/confirm')!(route);
    expect(replies.pop()?.status).toBe(status);
    expect(requests).toEqual([request]);
    await handlers.get('**/api/role-access/roles/post*')!(route);
    const readbackRoles = replies.pop()?.json;
    if (status === 200) {
      expect(readbackRoles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: existingJudicialRole.assignmentId }),
          expect.objectContaining({ name: allocatedPerson.name }),
        ])
      );
      expect(readbackRoles).toHaveLength(2);
    } else {
      expect(readbackRoles).toEqual(initialRoles);
    }
    await handlers.get('**/workallocation/caseworker/getUsersByIdamIds*')!(route);
    expect(replies.pop()?.json).toEqual(
      status === 200
        ? [
            expect.objectContaining({
              idamId: allocatedPerson.id,
              email: allocatedPerson.email,
              roleCategory: 'LEGAL_OPERATIONS',
            }),
          ]
        : []
    );
    expect(getUnexpectedRequests()).toEqual([]);
  });
}

test('role allocation installs its API closure before the feature overrides', { tag: '@svc-internal' }, async () => {
  const patterns: Array<string | RegExp | ((url: URL) => boolean)> = [];
  const handlers: RouteHandler[] = [];
  const page = {
    addInitScript: async () => {},
    route: async (pattern: string | RegExp | ((url: URL) => boolean), handler: RouteHandler) => {
      patterns.push(pattern);
      handlers.push(handler);
    },
  } as unknown as Page;
  const { requests, getUnexpectedRequests } = await setupRoleAllocationMockRoutes(page);
  expect(patterns[0]).toBe('**/*');
  const featurePattern = '**/api/role-access/allocate-role/valid-roles*';
  expect(patterns.lastIndexOf(featurePattern)).toBeGreaterThan(patterns.indexOf(featurePattern));
  const replies: unknown[] = [];
  let aborted = false;
  let fellBack = false;
  const route = {
    request: () => ({
      url: () => 'http://xui.example/api/unexpected?token=private',
      frame: () => ({ url: () => 'http://xui.example/cases' }),
      resourceType: () => 'xhr',
      method: () => 'GET',
    }),
    fulfill: async (response: unknown) => {
      replies.push(response);
    },
    abort: async () => {
      aborted = true;
    },
    fallback: async () => {
      fellBack = true;
    },
  } as unknown as Route;
  await handlers[patterns.lastIndexOf(featurePattern)](route);
  expect(replies).toEqual([{ json: validAllocationRoles }]);
  expect(getUnexpectedRequests()).toEqual([]);
  await handlers[0](route);
  expect(aborted).toBe(true);
  expect(fellBack).toBe(false);
  expect(getUnexpectedRequests()).toEqual([{ method: 'GET', route: 'http://xui.example/api/unexpected' }]);
  expect(requests).toEqual([]);
});

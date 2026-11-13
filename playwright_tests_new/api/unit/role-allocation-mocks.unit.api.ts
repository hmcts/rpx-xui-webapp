import { expect, test, type Page, type Request, type Route } from '@playwright/test';
import { setupRoleAllocationMockRoutes } from '../../integration/helpers/roleAllocationMockRoutes.helper';
import { allocatedPerson, existingJudicialRole, validAllocationRoles } from '../../integration/mocks/roleAllocation.mock';

type RouteHandler = (route: Route) => Promise<unknown> | unknown;

for (const status of [200, 500]) {
  test(`role allocation readback changes only after successful confirmation (${status})`, async () => {
    const handlers = new Map<string, RouteHandler>();
    const page = {
      addInitScript: async () => {},
      route: async (pattern: string | RegExp | ((url: URL) => boolean), handler: RouteHandler) => {
        if (typeof pattern === 'string') {
          handlers.set(pattern, handler);
        }
      },
    } as unknown as Page;
    const requests = await setupRoleAllocationMockRoutes(page, { status });
    const replies: Array<{ json?: unknown; status?: number }> = [];
    const request = { method: () => 'POST', postDataJSON: () => ({ caseId: 'selected-case' }) } as Request;
    const route = {
      request: () => request,
      fulfill: async (response: { json?: unknown; status?: number }) => {
        replies.push(response);
      },
    } as Route;

    await handlers.get('**/api/role-access/allocate-role/valid-roles*')!(route);
    expect(replies.pop()?.json).toEqual(validAllocationRoles);
    await handlers.get('**/api/role-access/roles/post*')!(route);
    const initialRoles = replies.pop()?.json;
    expect(initialRoles).toEqual(expect.arrayContaining([expect.objectContaining({ id: existingJudicialRole.assignmentId })]));
    expect(initialRoles).toHaveLength(1);
    expect(requests).toEqual([]);

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
  });
}

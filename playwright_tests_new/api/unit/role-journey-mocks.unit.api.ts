import { expect, test, type Page, type Route, type Request } from '@playwright/test';
import { buildRolesAndAccessUserDetails } from '../../integration/helpers/rolesAndAccessMockRoutes.helper';
import { captureExclusionMutations, setupRoleJourney, setupRoleReadback } from '../../integration/helpers/roleJourneys.helper';
import type { WorkAllocationAccessScenarioRecord } from '../../integration/helpers/workAllocationAccessScenarios.helper';

import {
  addedExclusionRecords,
  expectedDeletedExclusion,
  replacementPerson,
  roleCaseId,
  roleRecords,
} from '../../integration/mocks/roleJourneys.mock';

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
      const { requests, successfulRequests } = await captureExclusionMutations(page, status);
      const request = { method: () => 'POST', postDataJSON: () => ({ assignmentId: 'selected-assignment' }) } as Request;
      let response: unknown;
      await handler!({
        request: () => request,
        fulfill: async (value: unknown) => {
          response = value;
        },
      } as unknown as Route);
      expect(requests).toEqual([request]);
      expect(successfulRequests).toEqual(status === 200 ? [request] : []);
      expect(requests[0].postDataJSON()).toEqual({ assignmentId: 'selected-assignment' });
      expect(response).toEqual({ status, contentType: 'application/json', body: '{}' });
      expect(pattern!.test('http://localhost/api/role-access/allocate-role/delete')).toBe(false);
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
  const { successfulRequests } = await setupRoleJourney(page);
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
  await setupRoleReadback(page, addedExclusionRecords, successfulRequests, {
    operation: 'confirm',
    personId: replacementPerson.id,
  });
  expect(handlers.get('**/api/user/details*')).toBe(personaHandler);
  expect(registrations).toEqual(['**/api/role-access/roles/post*', '**/api/role-access/exclusions/post*']);
  await handlers.get('**/api/user/details*')!(route);
  expect(replies[1]).toEqual(replies[0]);
  await handlers.get('**/api/role-access/exclusions/post*')!(route);
  expect(replies[2].json).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ id: 'exclusion-clara', name: 'Clara Replacement' })])
  );
  expect(replies[2].json).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: 'assignment-judge-case-100-excluded', notes: 'Judicial conflict flagged.' }),
    ])
  );
});

test('readback changes only after a successful mutation for the selected case and person', async () => {
  const scenarios: Array<{
    target: Parameters<typeof setupRoleReadback>[3];
    records: WorkAllocationAccessScenarioRecord[];
    wrongBody: object;
    correctBody: object;
    changedId: string;
    initiallyPresent: boolean;
  }> = [
    {
      target: { operation: 'confirm', personId: replacementPerson.id },
      records: addedExclusionRecords,
      wrongBody: { caseId: roleCaseId, person: { id: 'other-person' } },
      correctBody: { caseId: roleCaseId, person: { id: replacementPerson.id } },
      changedId: 'exclusion-clara',
      initiallyPresent: false,
    },
    {
      target: { operation: 'delete', assignmentId: expectedDeletedExclusion.id },
      records: roleRecords.filter((record) => record.assignmentId !== expectedDeletedExclusion.id),
      wrongBody: { roleExclusion: { id: 'wrong-assignment' } },
      correctBody: { roleExclusion: { id: expectedDeletedExclusion.id } },
      changedId: expectedDeletedExclusion.id,
      initiallyPresent: true,
    },
  ];

  for (const scenario of scenarios) {
    for (const status of [200, 500]) {
      type Matcher = string | RegExp | ((url: URL) => boolean);
      const handlers = new Map<Matcher, (route: Route) => Promise<void>>();
      const page = {
        addInitScript: async () => {},
        route: async (pattern: Matcher, handler: (route: Route) => Promise<void>) => {
          handlers.set(pattern, handler);
        },
      } as unknown as Page;
      const { successfulRequests } = await setupRoleJourney(page, { status });
      await setupRoleReadback(page, scenario.records, successfulRequests, scenario.target);
      const readback = async () => {
        let ids: string[] = [];
        await handlers.get('**/api/role-access/exclusions/post*')!({
          fulfill: async (response: { json: Array<{ id: string }> }) => {
            ids = response.json.map((record) => record.id);
          },
        } as unknown as Route);
        return ids;
      };
      expect((await readback()).includes(scenario.changedId)).toBe(scenario.initiallyPresent);

      const mutation = [...handlers.entries()].find(
        ([pattern]) => pattern instanceof RegExp && pattern.test('/api/role-access/exclusions/confirm')
      )![1];
      for (const body of [scenario.wrongBody, scenario.correctBody]) {
        const request = {
          method: () => 'POST',
          url: () => `http://localhost/api/role-access/exclusions/${scenario.target.operation}`,
          postDataJSON: () => body,
        } as Request;
        await mutation({ request: () => request, fulfill: async () => {} } as unknown as Route);
        expect((await readback()).includes(scenario.changedId)).toBe(
          body === scenario.correctBody && status === 200 ? !scenario.initiallyPresent : scenario.initiallyPresent
        );
      }
    }
  }
});

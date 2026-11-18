import { runInNewContext } from 'node:vm';
import { expect, test } from '@playwright/test';
import type { Page, Route } from '@playwright/test';
import { setupShareCaseApiRoutes, setupShareCaseBootstrapRoutes } from '../../integration/helpers/shareCaseMockRoutes.helper.js';
import {
  buildSharedCase,
  shareCaseUsers,
  buildSharingCaseList,
  shareCaseInitialCases,
} from '../../integration/mocks/shareCase.mock.js';

test('assignment responses and later GET state are independent of submitted data', { tag: '@svc-internal' }, async () => {
  const routes = new Map<string, (route: Route) => Promise<void>>();
  const page = {
    route: async (url: string, handler: (route: Route) => Promise<void>) => routes.set(url, handler),
  } as unknown as Page;
  const initial = buildSharedCase('1234567890123456');
  const completed = { ...initial, sharedWith: [shareCaseUsers[0]] };
  const capture = await setupShareCaseApiRoutes(page, { cases: [initial], assignmentResponse: [completed] });
  let response: { body: string };
  const request = { sharedCases: [{ ...initial, pendingShares: [shareCaseUsers[1]] }] };
  await routes.get('**/api/caseshare/case-assignments*')!({
    request: () => ({ method: () => 'POST', postDataJSON: () => request }),
    fulfill: async (value: { body: string }) => {
      response = value;
    },
  } as unknown as Route);
  expect(capture.requests).toEqual([{ method: 'POST', ...request }]);
  expect(JSON.parse(response!.body)).toEqual([completed]);
  expect(capture.cases).toEqual([initial]);
  capture.cases = [completed, buildSharedCase('2345678901234567')];
  await routes.get('**/api/caseshare/cases*')!({
    request: () => ({ url: () => 'http://localhost/api/caseshare/cases?case_ids=1234567890123456' }),
    fulfill: async (value: { body: string }) => {
      response = value;
    },
  } as unknown as Route);
  expect(JSON.parse(response!.body)).toEqual([{ caseId: completed.caseId, sharedWith: completed.sharedWith }]);
  expect(capture.caseRequests).toEqual([['1234567890123456']]);
});

test(
  'share-case bootstrap executes after browser serialization without Node module variables',
  { tag: '@svc-internal' },
  async () => {
    const values = new Map<string, string>();
    const page = {
      addInitScript: async (callback: (arg: unknown) => void, arg: unknown) => {
        runInNewContext(`(${callback.toString()})(arg)`, {
          arg,
          window: { sessionStorage: { setItem: (key: string, value: string) => values.set(key, value) } },
        });
      },
      route: async () => {},
    } as unknown as Page;
    await setupShareCaseBootstrapRoutes(page);
    expect(JSON.parse(values.get('savedQueryParams')!)).toEqual({
      jurisdiction: 'DIVORCE',
      'case-type': 'xuiTestJurisdiction',
      'case-state': null,
    });
    expect(JSON.parse(values.get('workbasket-filter-form-group-value')!)).toEqual({});
  }
);

test('sharing case-list fixture uses the exact assignment case identities', { tag: '@svc-internal' }, () => {
  const caseList = buildSharingCaseList();
  expect(caseList.results.map((row) => row.case_id)).toEqual(shareCaseInitialCases.map((aCase) => aCase.caseId));
  expect(caseList.results.map((row) => row.case_fields['[CASE_REFERENCE]'])).toEqual(
    shareCaseInitialCases.map((aCase) => aCase.caseId)
  );
});

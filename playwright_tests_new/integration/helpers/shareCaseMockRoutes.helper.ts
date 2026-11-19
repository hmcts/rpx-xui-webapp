import type { Locator, Page, Route } from '@playwright/test';
import {
  buildAssignedSharedCases,
  buildShareCaseUserDetails,
  buildSharedCases,
  shareableJurisdiction,
  shareCaseUsers,
  type SharedCaseMock,
} from '../mocks/shareCase.mock';

export type ShareCaseAssignmentCapture = {
  requests: Array<{ method: string; sharedCases: SharedCaseMock[] }>;
  cases: SharedCaseMock[];
  caseRequests: string[][];
};

type ShareCaseMockRouteOptions = {
  caseIds?: string[];
  users?: typeof shareCaseUsers;
  cases?: SharedCaseMock[];
  assignmentResponse?: SharedCaseMock[];
  assignmentStatus?: number;
};

async function fulfillJson(route: Route, body: unknown, status = 200): Promise<void> {
  await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
}

export function parseShareCaseIds(searchParams: URLSearchParams): string[] {
  return (searchParams.get('case_ids') ?? '')
    .split(',')
    .map((caseId) => caseId.trim())
    .filter(Boolean);
}

export function hasExpectedShareCaseIds(searchParams: URLSearchParams, expectedCaseIds: string[]): boolean {
  return [...parseShareCaseIds(searchParams)].sort().join(',') === [...expectedCaseIds].sort().join(',');
}

export async function setupShareCaseBootstrapRoutes(page: Page, removalEnabled = false): Promise<void> {
  const launchDarklyFlagSet = Object.fromEntries(
    Object.entries({
      'shareable-jurisdictions': [shareableJurisdiction],
      'remove-user-from-case-mc': removalEnabled,
    }).map(([name, value]) => [name, { value, version: 1 }])
  );
  const userDetails = buildShareCaseUserDetails();

  await page.addInitScript(
    ({ seededUserInfo, jurisdiction }) => {
      window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
      window.sessionStorage.setItem(
        'savedQueryParams',
        JSON.stringify({
          jurisdiction,
          'case-type': 'xuiTestJurisdiction',
          'case-state': null,
        })
      );
      window.sessionStorage.setItem('workbasket-filter-form-group-value', JSON.stringify({}));
    },
    { seededUserInfo: userDetails.userInfo, jurisdiction: shareableJurisdiction }
  );

  await page.route('**/auth/isAuthenticated*', async (route) => fulfillJson(route, true));
  await page.route('**/api/user/details*', async (route) => fulfillJson(route, userDetails));
  await page.route('**/api/organisation*', async (route) =>
    fulfillJson(route, {
      name: 'Playwright Organisation',
      organisationIdentifier: 'PLAYWRIGHT_ORG',
      status: 'ACTIVE',
      contactInformation: [],
      paymentAccount: [],
    })
  );

  await page.route('**/*launchdarkly.com/**', async (route) => {
    const request = route.request();
    const requestPath = new URL(request.url()).pathname;
    if (requestPath.includes('/sdk/eval')) {
      await fulfillJson(route, launchDarklyFlagSet);
      return;
    }
    if (requestPath.includes('/sdk/goals')) {
      await fulfillJson(route, []);
      return;
    }
    if (request.method() !== 'GET') {
      await route.fulfill({ status: 202, body: '' });
      return;
    }

    await fulfillJson(route, launchDarklyFlagSet);
  });
}

export async function setupShareCaseApiRoutes(
  page: Page,
  options: ShareCaseMockRouteOptions = {}
): Promise<ShareCaseAssignmentCapture> {
  const capture: ShareCaseAssignmentCapture = {
    requests: [],
    cases: structuredClone(options.cases ?? buildSharedCases(options.caseIds ?? [])),
    caseRequests: [],
  };
  const users = options.users ?? shareCaseUsers;

  await page.route('**/api/caseshare/users*', async (route) => fulfillJson(route, users));
  await page.route('**/api/caseshare/cases*', async (route) => {
    const requestUrl = new URL(route.request().url());
    const caseIds = parseShareCaseIds(requestUrl.searchParams);
    capture.caseRequests.push(caseIds);
    await fulfillJson(
      route,
      (caseIds.length > 0 ? capture.cases.filter((aCase) => caseIds.includes(aCase.caseId)) : capture.cases).map(
        ({ caseId, sharedWith }) => ({ caseId, sharedWith })
      )
    );
  });
  await page.route('**/api/caseshare/case-assignments*', async (route) => {
    if (route.request().method() === 'GET') {
      await fulfillJson(route, capture.cases);
      return;
    }

    const requestBody = (route.request().postDataJSON() as { sharedCases?: SharedCaseMock[] }) ?? {};
    const sharedCases = requestBody.sharedCases ?? [];
    capture.requests.push({ method: route.request().method(), sharedCases });
    await fulfillJson(
      route,
      options.assignmentResponse ?? buildAssignedSharedCases(sharedCases),
      options.assignmentStatus ?? 200
    );
  });

  return capture;
}

export function getCaseSelectionControls(page: Page): Locator {
  const dataRowCheckboxes = page.locator('#search-result table tbody input[type="checkbox"]');
  const accessibleDataRowCheckboxes = page.locator('#search-result table tbody [role="checkbox"]');
  return dataRowCheckboxes.or(accessibleDataRowCheckboxes);
}

export async function selectCaseRows(page: Page, rowIndexes: number[]): Promise<void> {
  const selectionControls = getCaseSelectionControls(page);

  for (const rowIndex of rowIndexes) {
    const selectionControl = selectionControls.nth(rowIndex);
    if ((await selectionControl.evaluate((element) => element instanceof HTMLInputElement).catch(() => false)) === true) {
      await selectionControl.check();
    } else {
      await selectionControl.click();
    }
  }
}

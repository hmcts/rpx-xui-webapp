import { expect, type Locator, type Page, type Route } from '@playwright/test';
import {
  buildAssignedSharedCases,
  buildShareCaseUserDetails,
  buildSharedCases,
  shareableJurisdiction,
  shareCaseUsers,
  type SharedCaseMock,
} from '../mocks/shareCase.mock';

export type ShareCaseAssignmentCapture = {
  requests: Array<{ sharedCases: SharedCaseMock[] }>;
};

type ShareCaseMockRouteOptions = {
  caseIds?: string[];
  users?: typeof shareCaseUsers;
};

const featureValues = {
  'shareable-jurisdictions': [shareableJurisdiction],
  'mc-remove-user-from-case': false,
  'remove-user-from-case-mc': false,
};

const launchDarklyFlagSet = Object.fromEntries(
  Object.entries(featureValues).map(([flagName, value]) => [flagName, { value, version: 1 }])
);

async function fulfillJson(route: Route, body: unknown, status = 200): Promise<void> {
  await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
}

export async function setupShareCaseBootstrapRoutes(page: Page): Promise<void> {
  const userDetails = buildShareCaseUserDetails();

  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
    window.localStorage.setItem(
      'savedQueryParams',
      JSON.stringify({
        jurisdiction: shareableJurisdiction,
        'case-type': 'xuiTestJurisdiction',
        'case-state': null,
      })
    );
    window.localStorage.setItem('workbasket-filter-form-group-value', JSON.stringify({}));
  }, userDetails.userInfo);

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
  const capture: ShareCaseAssignmentCapture = { requests: [] };
  const seededCaseIds = options.caseIds ?? [];
  const users = options.users ?? shareCaseUsers;

  await page.route('**/api/caseshare/users*', async (route) => fulfillJson(route, users));
  await page.route('**/api/caseshare/cases*', async (route) => {
    const requestUrl = new URL(route.request().url());
    const caseIds = (requestUrl.searchParams.get('case_ids') ?? '')
      .split(',')
      .map((caseId) => caseId.trim())
      .filter(Boolean);
    await fulfillJson(route, buildSharedCases(caseIds.length > 0 ? caseIds : seededCaseIds));
  });
  await page.route('**/api/caseshare/case-assignments*', async (route) => {
    if (route.request().method() === 'GET') {
      await fulfillJson(route, buildSharedCases(seededCaseIds));
      return;
    }

    const requestBody = (route.request().postDataJSON() as { sharedCases?: SharedCaseMock[] }) ?? {};
    const sharedCases = requestBody.sharedCases ?? [];
    capture.requests.push({ sharedCases });
    await fulfillJson(route, buildAssignedSharedCases(sharedCases));
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
  await expect(selectionControls.first()).toBeVisible();

  for (const rowIndex of rowIndexes) {
    const selectionControl = selectionControls.nth(rowIndex);
    if ((await selectionControl.evaluate((element) => element instanceof HTMLInputElement).catch(() => false)) === true) {
      await selectionControl.check();
    } else {
      await selectionControl.click();
    }
  }
}

export async function expectSelectedCaseRows(page: Page, expectedSelectedCount: number): Promise<void> {
  const selectedCount = await page.locator('#search-result table tbody input[type="checkbox"]:checked').count();
  expect(selectedCount).toBe(expectedSelectedCount);
}

export async function expectShareCaseFeatureReady(page: Page): Promise<void> {
  await expect(page.locator('#btn-share-button')).toBeVisible();
  await expect(getCaseSelectionControls(page).first()).toBeVisible();
}

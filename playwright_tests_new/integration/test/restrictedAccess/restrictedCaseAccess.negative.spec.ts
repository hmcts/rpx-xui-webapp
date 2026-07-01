import { expect, test } from '../../../E2E/fixtures';
import type { Page } from '@playwright/test';
import {
  DEFAULT_ROLE_ACCESS_USERS_JUDICIAL,
  createGlobalSearchResultsRouteHandler,
  setupRestrictedAccessMocks,
  setupFastCaseRetrievalConfigRoute,
  setupGlobalSearchMockRoutes,
  submitHeaderQuickSearch,
} from '../../helpers';
import { applySessionCookies } from '../../../common/sessionCapture';
import { formatCaseNumberWithDashes } from '../../../E2E/utils/validator.utils';
import {
  buildGlobalSearchNoResultsMock,
  buildGlobalSearchResultsMock,
  buildGlobalSearchServicesMock,
  buildSearchCaseJurisdictionsMock,
  VALID_SEARCH_CASE_REFERENCE,
} from '../../mocks/search.mock';
import { TEST_USERS } from '../../testData';
import { CaseDetailsPage } from '../../../E2E/page-objects/pages/exui/caseDetails.po';

const searchCaseJurisdictionsMock = buildSearchCaseJurisdictionsMock();
const globalSearchServicesMock = buildGlobalSearchServicesMock();
const globalSearchResultsHandler = createGlobalSearchResultsRouteHandler({
  matchingCaseReference: VALID_SEARCH_CASE_REFERENCE,
  successResponse: buildGlobalSearchResultsMock(VALID_SEARCH_CASE_REFERENCE),
  noResultsResponse: buildGlobalSearchNoResultsMock(),
});

const RESTRICTED_ACCESS_MESSAGE = 'This case is restricted. The details of the users with access are provided below.';
const RESTRICTED_ACCESS_FAILURE_STATUSES = [400, 403, 500] as const;

async function expectRestrictedAccessShellWithoutRows(page: Page, caseDetailsPage: CaseDetailsPage): Promise<void> {
  await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
  await expect(page.getByText(RESTRICTED_ACCESS_MESSAGE)).toBeVisible();
  expect(await caseDetailsPage.exuiBodyComponent.mainHeading.textContent()).toContain(
    formatCaseNumberWithDashes(VALID_SEARCH_CASE_REFERENCE)
  );
  await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Users with access' })).toBeVisible();

  const table = caseDetailsPage.exuiBodyComponent.table;
  await expect(table.locator('thead th, thead td')).toHaveCount(3);
  await expect(table.locator('thead th, thead td').nth(0)).toHaveText('User');
  await expect(table.locator('thead th, thead td').nth(1)).toHaveText('Case role');
  await expect(table.locator('thead th, thead td').nth(2)).toHaveText('Email address');
  await expect(table.locator('tbody tr')).toHaveCount(0);
}

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, TEST_USERS.FPL_GLOBAL_SEARCH);
  await setupFastCaseRetrievalConfigRoute(page);

  await setupGlobalSearchMockRoutes(page, {
    jurisdictions: searchCaseJurisdictionsMock,
    services: globalSearchServicesMock,
    searchResultsHandler: globalSearchResultsHandler,
  });

  await page.route('**/data/internal/cases/**', async (route) => {
    await route.fulfill({
      status: 403,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Restricted case access' }),
    });
  });
});

test.describe(
  `Restricted case access as ${TEST_USERS.FPL_GLOBAL_SEARCH} negative flows with prewarmed search session`,
  { tag: ['@integration', '@integration-restricted-case'] },
  () => {
    test('renders empty table when no users have access', async ({ caseDetailsPage, searchCasePage, page }) => {
      await test.step('Configure restricted-access mocks with empty access lists', async () => {
        await setupRestrictedAccessMocks(page, { roleAccessBody: [], caseworkersBody: [] });
      });

      await test.step('Search for restricted case from quick search', async () => {
        await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);
      });

      await test.step('Verify restricted access shell and empty users table', async () => {
        await expectRestrictedAccessShellWithoutRows(page, caseDetailsPage);
      });
    });

    RESTRICTED_ACCESS_FAILURE_STATUSES.forEach((status) => {
      test(`handles failed role-access call with HTTP ${status} by showing restricted access shell`, async ({
        caseDetailsPage,
        searchCasePage,
        page,
      }) => {
        await test.step(`Configure restricted-access mocks with role-access HTTP ${status}`, async () => {
          await setupRestrictedAccessMocks(page, { roleAccessStatus: status, roleAccessBody: { message: 'error' } });
        });

        await test.step('Search for restricted case from quick search', async () => {
          await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);
        });

        await test.step('Verify restricted access shell is shown without table rows', async () => {
          await expectRestrictedAccessShellWithoutRows(page, caseDetailsPage);
        });
      });
    });

    RESTRICTED_ACCESS_FAILURE_STATUSES.forEach((status) => {
      test(`handles failed caseworker lookup with HTTP ${status} by showing restricted access shell`, async ({
        caseDetailsPage,
        searchCasePage,
        page,
      }) => {
        await test.step(`Configure restricted-access mocks with caseworker lookup HTTP ${status}`, async () => {
          await setupRestrictedAccessMocks(page, { caseworkersStatus: status, caseworkersBody: { message: 'error' } });
        });

        await test.step('Search for restricted case from quick search', async () => {
          await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);
        });

        await test.step('Verify restricted access shell is shown without table rows', async () => {
          await expectRestrictedAccessShellWithoutRows(page, caseDetailsPage);
        });
      });
    });

    RESTRICTED_ACCESS_FAILURE_STATUSES.forEach((status) => {
      test(`handles failed supported-jurisdiction lookup with HTTP ${status} by showing restricted access shell`, async ({
        caseDetailsPage,
        searchCasePage,
        page,
      }) => {
        await test.step(`Configure restricted-access mocks with supported-jurisdiction HTTP ${status}`, async () => {
          await setupRestrictedAccessMocks(page, {
            supportedJurisdictionsStatus: status,
            supportedJurisdictions: { message: 'error' },
          });
        });

        await test.step('Search for restricted case from quick search', async () => {
          await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);
        });

        await test.step('Verify restricted access shell is shown without table rows', async () => {
          await expectRestrictedAccessShellWithoutRows(page, caseDetailsPage);
        });
      });
    });

    RESTRICTED_ACCESS_FAILURE_STATUSES.forEach((status) => {
      test(`handles failed judicial lookup with HTTP ${status} by showing restricted access shell`, async ({
        caseDetailsPage,
        searchCasePage,
        page,
      }) => {
        await test.step(`Configure restricted-access mocks with judicial lookup HTTP ${status}`, async () => {
          await setupRestrictedAccessMocks(page, {
            roleAccessBody: DEFAULT_ROLE_ACCESS_USERS_JUDICIAL,
            caseworkersBody: [],
            judicialUsersStatus: status,
            judicialUsersBody: { message: 'error' },
          });
        });

        await test.step('Search for restricted case from quick search', async () => {
          await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);
        });

        await test.step('Verify restricted access shell is shown without table rows', async () => {
          await expectRestrictedAccessShellWithoutRows(page, caseDetailsPage);
        });
      });
    });
  }
);

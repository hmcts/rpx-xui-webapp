import { expect, test } from '../../../E2E/fixtures';
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

const searchCaseJurisdictionsMock = buildSearchCaseJurisdictionsMock();
const globalSearchServicesMock = buildGlobalSearchServicesMock();
const globalSearchResultsHandler = createGlobalSearchResultsRouteHandler({
  matchingCaseReference: VALID_SEARCH_CASE_REFERENCE,
  successResponse: buildGlobalSearchResultsMock(VALID_SEARCH_CASE_REFERENCE),
  noResultsResponse: buildGlobalSearchNoResultsMock(),
});

const RESTRICTED_ACCESS_MESSAGE = 'This case is restricted. The details of the users with access are provided below.';
const RESTRICTED_ACCESS_FAILURE_STATUSES = [400, 403, 500] as const;

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
    test('renders empty table when no users have access', async ({ caseDetailsPage, searchCasePage, page, tableUtils }) => {
      await test.step('Configure restricted-access mocks with empty access lists', async () => {
        await setupRestrictedAccessMocks(page, { roleAccessBody: [], caseworkersBody: [] });
      });

      await test.step('Search for restricted case from quick search', async () => {
        await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);
      });

      await test.step('Verify restricted access shell and empty users table', async () => {
        await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
        await expect(page.getByText(RESTRICTED_ACCESS_MESSAGE)).toBeVisible();
        expect(await caseDetailsPage.exuiBodyComponent.mainHeading.textContent()).toContain(
          formatCaseNumberWithDashes(VALID_SEARCH_CASE_REFERENCE)
        );
        await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();
        await expect(page.getByRole('heading', { level: 2, name: 'Users with access' })).toBeVisible();

        await expect(caseDetailsPage.exuiBodyComponent.tableHeaders).toHaveCount(3);
        await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(0)).toHaveText('User');
        await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(1)).toHaveText('Case role');
        await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(2)).toHaveText('Email address');

        const table = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);
        expect(table).toEqual([]);
      });
    });

    RESTRICTED_ACCESS_FAILURE_STATUSES.forEach((status) => {
      test(`handles failed role-access call with HTTP ${status} by showing restricted access shell`, async ({
        caseDetailsPage,
        searchCasePage,
        page,
        tableUtils,
      }) => {
        await test.step(`Configure restricted-access mocks with role-access HTTP ${status}`, async () => {
          await setupRestrictedAccessMocks(page, { roleAccessStatus: status, roleAccessBody: { message: 'error' } });
        });

        await test.step('Search for restricted case from quick search', async () => {
          await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);
        });

        await test.step('Verify restricted access shell is shown without table rows', async () => {
          await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
          await expect(page.getByText(RESTRICTED_ACCESS_MESSAGE)).toBeVisible();
          expect(await caseDetailsPage.exuiBodyComponent.mainHeading.textContent()).toContain(
            formatCaseNumberWithDashes(VALID_SEARCH_CASE_REFERENCE)
          );
          await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();
          await expect(page.getByRole('heading', { level: 2, name: 'Users with access' })).toBeVisible();

          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders).toHaveCount(3);
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(0)).toHaveText('User');
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(1)).toHaveText('Case role');
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(2)).toHaveText('Email address');

          const table = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);
          expect(table).toEqual([]);
        });
      });
    });

    RESTRICTED_ACCESS_FAILURE_STATUSES.forEach((status) => {
      test(`handles failed caseworker lookup with HTTP ${status} by showing restricted access shell`, async ({
        caseDetailsPage,
        searchCasePage,
        page,
        tableUtils,
      }) => {
        await test.step(`Configure restricted-access mocks with caseworker lookup HTTP ${status}`, async () => {
          await setupRestrictedAccessMocks(page, { caseworkersStatus: status, caseworkersBody: { message: 'error' } });
        });

        await test.step('Search for restricted case from quick search', async () => {
          await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);
        });

        await test.step('Verify restricted access shell is shown without table rows', async () => {
          await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
          await expect(page.getByText(RESTRICTED_ACCESS_MESSAGE)).toBeVisible();
          expect(await caseDetailsPage.exuiBodyComponent.mainHeading.textContent()).toContain(
            formatCaseNumberWithDashes(VALID_SEARCH_CASE_REFERENCE)
          );
          await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();
          await expect(page.getByRole('heading', { level: 2, name: 'Users with access' })).toBeVisible();

          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders).toHaveCount(3);
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(0)).toHaveText('User');
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(1)).toHaveText('Case role');
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(2)).toHaveText('Email address');

          const table = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);
          expect(table).toEqual([]);
        });
      });
    });

    RESTRICTED_ACCESS_FAILURE_STATUSES.forEach((status) => {
      test(`handles failed supported-jurisdiction lookup with HTTP ${status} by showing restricted access shell`, async ({
        caseDetailsPage,
        searchCasePage,
        page,
        tableUtils,
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
          await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
          await expect(page.getByText(RESTRICTED_ACCESS_MESSAGE)).toBeVisible();
          expect(await caseDetailsPage.exuiBodyComponent.mainHeading.textContent()).toContain(
            formatCaseNumberWithDashes(VALID_SEARCH_CASE_REFERENCE)
          );
          await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();
          await expect(page.getByRole('heading', { level: 2, name: 'Users with access' })).toBeVisible();

          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders).toHaveCount(3);
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(0)).toHaveText('User');
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(1)).toHaveText('Case role');
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(2)).toHaveText('Email address');

          const table = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);
          expect(table).toEqual([]);
        });
      });
    });

    RESTRICTED_ACCESS_FAILURE_STATUSES.forEach((status) => {
      test(`handles failed judicial lookup with HTTP ${status} by showing restricted access shell`, async ({
        caseDetailsPage,
        searchCasePage,
        page,
        tableUtils,
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
          await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
          await expect(page.getByText(RESTRICTED_ACCESS_MESSAGE)).toBeVisible();
          expect(await caseDetailsPage.exuiBodyComponent.mainHeading.textContent()).toContain(
            formatCaseNumberWithDashes(VALID_SEARCH_CASE_REFERENCE)
          );
          await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();
          await expect(page.getByRole('heading', { level: 2, name: 'Users with access' })).toBeVisible();

          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders).toHaveCount(3);
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(0)).toHaveText('User');
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(1)).toHaveText('Case role');
          await expect(caseDetailsPage.exuiBodyComponent.tableHeaders.nth(2)).toHaveText('Email address');

          const table = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);
          expect(table).toEqual([]);
        });
      });
    });
  }
);

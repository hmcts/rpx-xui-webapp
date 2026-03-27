import { expect, test } from '../../../E2E/fixtures';
import {
  DEFAULT_CASEWORKERS,
  DEFAULT_ROLE_ACCESS_USERS_OPS,
  createGlobalSearchResultsRouteHandler,
  setupRestrictedAccessMocks,
  setupFastCaseRetrievalConfigRoute,
  setupGlobalSearchMockRoutes,
  submitHeaderQuickSearch,
} from '../../helpers';
import { formatCaseNumberWithDashes } from '../../../E2E/utils/validator.utils';
import { applySessionCookies } from '../../../common/sessionCapture';
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

test.beforeEach(async ({ page }, testInfo) => {
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
  `Restricted case access as ${TEST_USERS.FPL_GLOBAL_SEARCH} flows with prewarmed search session`,
  { tag: ['@integration', '@integration-search-case'] },
  () => {
    test('shows restricted access users and table content', async ({
      caseDetailsPage,
      caseListPage,
      searchCasePage,
      page,
      tableUtils,
    }) => {
      await test.step('Configure restricted-access mock responses', async () => {
        await setupRestrictedAccessMocks(page);
      });

      await test.step('Search for restricted case from quick search', async () => {
        await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, caseListPage, searchCasePage);
      });

      await test.step('Verify restricted access page shell content', async () => {
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
      });

      await test.step('Verify users table content matches mocked role access composition', async () => {
        const table = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);
        const workerByIdamId = new Map(DEFAULT_CASEWORKERS.map((worker) => [worker.idamId, worker]));

        const expectedRows = DEFAULT_ROLE_ACCESS_USERS_OPS.map((assignment) => {
          const worker = workerByIdamId.get(assignment.actorId);
          const fullName = [worker?.firstName, worker?.lastName].filter(Boolean).join(' ').trim();
          return {
            User: fullName,
            'Case role': assignment.roleName,
            'Email address': worker?.email ?? assignment.email,
          };
        });

        expect(table).toEqual(expectedRows);
      });
    });
  }
);

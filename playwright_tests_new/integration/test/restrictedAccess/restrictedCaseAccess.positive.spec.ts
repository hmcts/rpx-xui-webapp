import { expect, test } from '../../../E2E/fixtures';
import {
  DEFAULT_CASEWORKERS,
  DEFAULT_CASEWORKERS_OPS,
  DEFAULT_JUDICIAL_USERS,
  DEFAULT_ROLE_ACCESS_USERS_JUDICIAL,
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
  `Restricted case access as ${TEST_USERS.FPL_GLOBAL_SEARCH} flows with prewarmed search session`,
  { tag: ['@integration', '@integration-restricted-case'] },
  () => {
    test('shows both legal-ops and judicial users and resolves judicial users from ref-data', async ({
      caseDetailsPage,
      searchCasePage,
      page,
      tableUtils,
    }) => {
      const judicialLookupRequestPromise = page.waitForRequest('**/api/prd/judicial/searchJudicialUserByIdamId*');

      await test.step('Configure restricted-access mock responses', async () => {
        await setupRestrictedAccessMocks(page);
      });

      await test.step('Search for restricted case from quick search', async () => {
        await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);
      });

      await test.step('Verify restricted access page construction elements', async () => {
        await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
        expect(await caseDetailsPage.exuiBodyComponent.message.textContent()).toContain(RESTRICTED_ACCESS_MESSAGE);
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
        const workerByIdamId = new Map(DEFAULT_CASEWORKERS.map((worker) => [worker.idamId, worker]));
        const judgeByIdamId = new Map(DEFAULT_JUDICIAL_USERS.map((judge) => [judge.idamId, judge]));

        const expectedRows = [...DEFAULT_ROLE_ACCESS_USERS_OPS, ...DEFAULT_ROLE_ACCESS_USERS_JUDICIAL].map((assignment) => {
          const worker = workerByIdamId.get(assignment.actorId);
          const judge = judgeByIdamId.get(assignment.actorId);
          const fullName = worker
            ? [worker.firstName, worker.lastName].filter(Boolean).join(' ').trim()
            : (judge?.fullName ?? '');

          return {
            User: fullName,
            'Case role': assignment.roleName,
            'Email address': worker?.email ?? judge?.emailId ?? assignment.email,
          };
        });

        await expect
          .poll(async () => {
            const rows = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);
            return rows.length;
          })
          .toBe(expectedRows.length);

        const judicialLookupRequest = await judicialLookupRequestPromise;
        expect(judicialLookupRequest).toBeTruthy();

        const table = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);

        expect(table).toHaveLength(expectedRows.length);
        expect(table).toEqual(expect.arrayContaining(expectedRows));
      });
    });

    test('shows only legal-ops users and does not call judicial lookup when not needed', async ({
      caseDetailsPage,
      searchCasePage,
      page,
      tableUtils,
    }) => {
      await setupRestrictedAccessMocks(page, {
        roleAccessBody: DEFAULT_ROLE_ACCESS_USERS_OPS,
        caseworkersBody: DEFAULT_CASEWORKERS_OPS,
      });

      await page.unroute('**/api/prd/judicial/searchJudicialUserByIdamId*');
      await page.route('**/api/prd/judicial/searchJudicialUserByIdamId*', async () => {
        throw new Error('Judicial lookup API should not be called for legal-ops-only scenario');
      });

      await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);

      await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
      await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();

      const table = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);
      const workerByIdamId = new Map(DEFAULT_CASEWORKERS_OPS.map((worker) => [worker.idamId, worker]));

      const expectedRows = DEFAULT_ROLE_ACCESS_USERS_OPS.map((assignment) => {
        const worker = workerByIdamId.get(assignment.actorId);
        return {
          User: [worker?.firstName, worker?.lastName].filter(Boolean).join(' ').trim(),
          'Case role': assignment.roleName,
          'Email address': worker?.email ?? assignment.email,
        };
      });

      expect(table).toEqual(expectedRows);
    });

    test('shows only judicial users when role-access returns judicial entries only', async ({
      caseDetailsPage,
      searchCasePage,
      page,
      tableUtils,
    }) => {
      await setupRestrictedAccessMocks(page, {
        roleAccessBody: DEFAULT_ROLE_ACCESS_USERS_JUDICIAL,
        caseworkersBody: [],
      });

      await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);

      await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
      await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();

      const judgeByIdamId = new Map(DEFAULT_JUDICIAL_USERS.map((judge) => [judge.idamId, judge]));

      const expectedRows = DEFAULT_ROLE_ACCESS_USERS_JUDICIAL.map((assignment) => {
        const judge = judgeByIdamId.get(assignment.actorId);
        return {
          User: judge?.fullName ?? '',
          'Case role': assignment.roleName,
          'Email address': judge?.emailId ?? assignment.email,
        };
      });

      await expect
        .poll(async () => {
          const rows = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);
          return rows.length;
        })
        .toBe(expectedRows.length);

      const table = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);

      expect(table).toHaveLength(expectedRows.length);
      expect(table).toEqual(expect.arrayContaining(expectedRows));
    });

    test('does not call judicial lookup when judicial users are already resolved by caseworker API', async ({
      caseDetailsPage,
      searchCasePage,
      page,
      tableUtils,
    }) => {
      const judicialCaseworkers = DEFAULT_CASEWORKERS.filter((worker) => worker.roleCategory === 'JUDICIAL');

      await setupRestrictedAccessMocks(page, {
        roleAccessBody: DEFAULT_ROLE_ACCESS_USERS_JUDICIAL,
        caseworkersBody: judicialCaseworkers,
      });

      await page.unroute('**/api/prd/judicial/searchJudicialUserByIdamId*');
      await page.route('**/api/prd/judicial/searchJudicialUserByIdamId*', async () => {
        throw new Error('Judicial lookup API should not be called when judicial users are resolved by caseworker API');
      });

      await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);

      await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
      await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();

      const caseworkerByIdamId = new Map(judicialCaseworkers.map((worker) => [worker.idamId, worker]));
      const expectedRows = DEFAULT_ROLE_ACCESS_USERS_JUDICIAL.map((assignment) => {
        const worker = caseworkerByIdamId.get(assignment.actorId);
        return {
          User: [worker?.firstName, worker?.lastName].filter(Boolean).join(' ').trim(),
          'Case role': assignment.roleName,
          'Email address': worker?.email ?? assignment.email,
        };
      });

      const table = await tableUtils.parseDataTable(caseDetailsPage.exuiBodyComponent.table);
      expect(table).toHaveLength(expectedRows.length);
      expect(table).toEqual(expect.arrayContaining(expectedRows));
    });
  }
);

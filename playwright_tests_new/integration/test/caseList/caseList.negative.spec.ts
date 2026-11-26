import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { buildCaseListJurisdictionsMock, buildCaseListMock } from '../../mocks/caseList.mock';
import { CASE_LIST_MALFORMED_JSON_BODY, CASE_LIST_ERROR_STATUS_CODES } from '../../testData';

const userIdentifier = 'SOLICITOR';
const caseListJurisdictionsMock = buildCaseListJurisdictionsMock();
const caseListMockResponse = buildCaseListMock(15);

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
  await page.route('**/caseworkers/**/jurisdictions*', async (route) => {
    const body = JSON.stringify(caseListJurisdictionsMock);
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });
  await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route) => {
    const body = JSON.stringify({ workbasketInputs: [] });
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });
});

test.describe(
  `Error codes returned on /searchCases call for ${userIdentifier}`,
  { tag: ['@integration', '@integration-case-list'] },
  () => {
    for (const errorCode of CASE_LIST_ERROR_STATUS_CODES) {
      test(`User ${userIdentifier} encounters a HTTP Response  ${errorCode} error on the case list page`, async ({
        caseListPage,
        page,
      }) => {
        await page.route('**/data/internal/searchCases*', async (route) => {
          const body = JSON.stringify({});
          await route.fulfill({ status: errorCode, contentType: 'application/json', body });
        });
        await test.step('Navigate to the search page', async () => {
          await caseListPage.navigateTo();
        });
        await test.step('Verify user can see the WorkBasket Filter layout', async () => {
          await expect(caseListPage.filtersContainer).toBeVisible();
        });
        await test.step('Verify user sees empty case list UI', async () => {
          await expect(caseListPage.jurisdictionSelect).toBeVisible();
          await expect(caseListPage.exuiHeader.header).toBeVisible();
          await expect(caseListPage.caseSearchResultsMessage).not.toBeVisible();
        });
      });
    }
  }
);

test.describe(`Case list filter validation for ${userIdentifier}`, { tag: ['@integration', '@integration-case-list'] }, () => {
  test('prevents a search for an invalid date range and allows it after the range is corrected', async ({
    caseListPage,
    page,
  }) => {
    const dateRangeError = 'Date To must be the same as or later than Date From';
    let searchRequestCount = 0;

    await page.route('**/data/internal/searchCases*', async (route) => {
      searchRequestCount += 1;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(caseListMockResponse),
      });
    });

    await caseListPage.navigateTo();
    await expect(caseListPage.caseListResultsAmount).toBeVisible();
    expect(searchRequestCount).toBe(1);

    await caseListPage.setLastModifiedDateRange('24/11/2026', '23/11/2026');
    await expect(caseListPage.dateRangeValidationErrors).toContainText(dateRangeError);

    const invalidSearchRequest = page
      .waitForRequest((request) => request.url().includes('/data/internal/searchCases'), { timeout: 2000 })
      .then(() => true)
      .catch(() => false);

    await caseListPage.applyFilters();

    await expect(caseListPage.filterValidationSummary).toBeVisible();
    await expect(caseListPage.filterValidationSummaryTitle).toHaveText('There is a problem');
    await expect(caseListPage.filterValidationSummaryLinks).toHaveText([dateRangeError]);
    await expect(caseListPage.filterValidationSummaryLinks.first()).toHaveAttribute('href', '#dateTo');
    expect(await invalidSearchRequest).toBe(false);
    expect(searchRequestCount).toBe(1);

    await caseListPage.setLastModifiedDateRange('24/11/2026', '25/11/2026');
    await expect(caseListPage.filterValidationSummary).toBeHidden();

    const validSearchRequest = page.waitForRequest((request) => request.url().includes('/data/internal/searchCases'));
    await caseListPage.applyFilters();
    await validSearchRequest;

    expect(searchRequestCount).toBe(2);
  });
});

test.describe(
  `Mimic Slow Response Times on  /searchCases call for ${userIdentifier}`,
  { tag: ['@integration', '@integration-case-list'] },
  () => {
    test(`User ${userIdentifier} encounters a slow response time on load of the case list page`, async ({
      caseListPage,
      tableUtils,
      page,
    }) => {
      await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
        await page.route('**/data/internal/searchCases*', async (route) => {
          const body = JSON.stringify(caseListMockResponse);
          await new Promise((resolve) => setTimeout(resolve, 3000));
          await route.fulfill({ status: 200, contentType: 'application/json', body });
          await page.unroute('**/data/internal/searchCases*');
        });
      });
      page.waitForResponse((response) => response.url().includes('/data/internal/searchCases'));
      await test.step('Navigate to the search page', async () => {
        await caseListPage.navigateTo();
      });
      await test.step('Verify user can see the WorkBasket Filter layout', async () => {
        await expect(caseListPage.filtersContainer).toBeVisible();
      });
      await test.step('Verify user can see a list of cases in  expected layout given the mock response', async () => {
        expect(await caseListPage.caseListResultsAmount.textContent()).toBe(
          `Showing 1 to ${Math.min(caseListMockResponse.results.length, 25)} of ${caseListMockResponse.total} results`
        );
        const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
        expect(table.length).toBe(caseListMockResponse.results.length);
        for (let i = 0; i < caseListMockResponse.results.length; i++) {
          const expectedFields = caseListMockResponse.results[i].case_fields;
          expect(table[i]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
          expect(table[i]['Text Field 0']).toBe(expectedFields['TextField0']);
          expect(table[i]['Text Field 1']).toBe(expectedFields['TextField1']);
          expect(table[i]['Text Field 2']).toBe(expectedFields['TextField2']);
        }
        expect(await caseListPage.pagination.isVisible()).toBeFalsy();
      });
    });
  }
);

test.describe(
  `Check UI Behviour when a Malformed Response is returned for ${userIdentifier}`,
  { tag: ['@integration', '@integration-case-list'] },
  () => {
    test(`User ${userIdentifier} encounters a Malformed Response on calling of /searchCases`, async ({ caseListPage, page }) => {
      await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
        await page.route('**/data/internal/searchCases*', async (route) => {
          const body = CASE_LIST_MALFORMED_JSON_BODY;
          await route.fulfill({ status: 200, contentType: 'application/json', body });
        });
      });
      await test.step('Navigate to the search page', async () => {
        await caseListPage.navigateTo();
      });
      await test.step('Verify user can see the WorkBasket Filter layout', async () => {
        await expect(caseListPage.filtersContainer).toBeVisible();
        await expect(caseListPage.jurisdictionSelect).toBeVisible();
        await expect(caseListPage.exuiHeader.header).toBeVisible();
        await expect(caseListPage.caseSearchResultsMessage).not.toBeVisible();
      });
    });
  }
);

test.describe(`Check behaviour of UI when a  Timeout issue occurs}`, { tag: ['@integration', '@integration-case-list'] }, () => {
  test(`User ${userIdentifier} encounters a Timeout on calling of /searchCases`, async ({ caseListPage, page }) => {
    await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
      await page.route('**/data/internal/searchCases*', async (route) => {
        await route.abort('timedout');
      });
    });
    await test.step('Navigate to the search page', async () => {
      await caseListPage.navigateTo();
    });
    await test.step('Verify user can see the WorkBasket Filter layout', async () => {
      await expect(caseListPage.filtersContainer).toBeVisible();
      await expect(caseListPage.jurisdictionSelect).toBeVisible();
      await expect(caseListPage.exuiHeader.header).toBeVisible();
      await expect(caseListPage.caseSearchResultsMessage).not.toBeVisible();
    });
  });
});

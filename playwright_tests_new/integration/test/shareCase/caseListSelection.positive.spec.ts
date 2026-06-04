import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  clearPersistedCaseListState,
  expectCaseListSummary,
  expectSelectedCaseRows,
  expectShareCaseFeatureReady,
  selectCaseRows,
  setupCaseListMocks,
  setupShareCaseApiRoutes,
  setupShareCaseBootstrapRoutes,
} from '../../helpers';
import { buildCaseListMockForPage } from '../../mocks/caseList.mock';

const userIdentifier = 'SOLICITOR';
const PAGE_SIZE = 25;

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
  await clearPersistedCaseListState(page);
  await setupShareCaseBootstrapRoutes(page);
});

test.describe('Case list selection parity', { tag: ['@integration', '@integration-share-case'] }, () => {
  test('preserve selection across pagination and route selected cases into share-case journey', async ({
    caseListPage,
    page,
  }) => {
    const totalResults = 50;
    const pageOneMock = buildCaseListMockForPage(totalResults, 1, PAGE_SIZE);
    const pageTwoMock = buildCaseListMockForPage(totalResults, 2, PAGE_SIZE);
    const firstCaseId = pageOneMock.results[0].case_fields['[CASE_REFERENCE]'];
    const secondCaseId = pageTwoMock.results[0].case_fields['[CASE_REFERENCE]'];

    await setupShareCaseApiRoutes(page, { caseIds: [firstCaseId, secondCaseId] });
    await setupCaseListMocks(page, {
      searchResponseHandler: async (route) => {
        const requestUrl = new URL(route.request().url());
        const pageNumber = Number(requestUrl.searchParams.get('page') ?? '1');
        const responseBody = pageNumber === 2 ? pageTwoMock : pageOneMock;

        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(responseBody) });
      },
    });

    await caseListPage.navigateTo();
    await expectCaseListSummary(caseListPage, totalResults, 1);
    await expectShareCaseFeatureReady(page);
    await expect(page.locator('#btn-share-button')).toBeDisabled();

    await selectCaseRows(page, [0]);
    await expectSelectedCaseRows(page, 1);
    await expect(page.locator('#btn-share-button')).toBeEnabled();

    await caseListPage.clickPaginationPage(2);
    await expectCaseListSummary(caseListPage, totalResults, 2);
    await selectCaseRows(page, [0]);
    await expectSelectedCaseRows(page, 1);

    await caseListPage.clickPaginationPage(1);
    await expectCaseListSummary(caseListPage, totalResults, 1);
    await expectSelectedCaseRows(page, 1);

    const shareCasesRequest = page.waitForRequest((request) => {
      const requestUrl = new URL(request.url());
      const caseIds = requestUrl.searchParams.get('case_ids') ?? '';
      return requestUrl.pathname === '/api/caseshare/cases' && caseIds.includes(firstCaseId) && caseIds.includes(secondCaseId);
    });

    await page.locator('#btn-share-button').click();
    await expect(page).toHaveURL(/\/cases\/case-share\?init=true/);

    const requestUrl = new URL((await shareCasesRequest).url());
    expect(requestUrl.searchParams.get('case_ids')).toContain(firstCaseId);
    expect(requestUrl.searchParams.get('case_ids')).toContain(secondCaseId);
  });

  test('keep the share action disabled until at least one case is selected', async ({ caseListPage, page }) => {
    const caseListMock = buildCaseListMockForPage(10, 1, PAGE_SIZE);
    await setupShareCaseApiRoutes(page);
    await setupCaseListMocks(page, { searchResponse: caseListMock });

    await caseListPage.navigateTo();
    await expectShareCaseFeatureReady(page);
    await expect(page.locator('#btn-share-button')).toBeDisabled();

    await selectCaseRows(page, [0]);
    await expect(page.locator('#btn-share-button')).toBeEnabled();
  });
});

import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  clearPersistedCaseListState,
  getCaseSelectionControls,
  selectCaseRows,
  setupCaseListMocks,
  setupShareCaseApiRoutes,
  setupShareCaseBootstrapRoutes,
} from '../../helpers';
import { buildCaseListMock } from '../../mocks/caseList.mock';

const userIdentifier = 'SOLICITOR';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
  await clearPersistedCaseListState(page);
  await setupShareCaseBootstrapRoutes(page);
});

test.describe('Share case journeys', { tag: ['@integration', '@integration-share-case'] }, () => {
  test('retain selected cases when opening the share-case route', async ({ caseListPage, page }) => {
    const caseListMock = buildCaseListMock(2);
    const selectedCaseIds = caseListMock.results.map((result) => result.case_fields['[CASE_REFERENCE]']);
    const shareCasesRequest = page.waitForRequest((request) => {
      const requestUrl = new URL(request.url());
      return requestUrl.pathname === '/api/caseshare/cases' && selectedCaseIds.every((caseId) => request.url().includes(caseId));
    });

    await setupShareCaseApiRoutes(page, { caseIds: selectedCaseIds });
    await setupCaseListMocks(page, { searchResponse: caseListMock });

    await caseListPage.navigateTo();
    await expect(page.locator('#btn-share-button')).toBeVisible();
    await expect(getCaseSelectionControls(page).first()).toBeVisible();
    await selectCaseRows(page, [0, 1]);
    await page.locator('#btn-share-button').click();

    await expect(page).toHaveURL(/\/cases\/case-share\?init=true/);
    await expect(page.getByRole('heading', { name: /add recipient/i })).toBeVisible();

    const requestUrl = new URL((await shareCasesRequest).url());
    expect(requestUrl.searchParams.get('case_ids')).toContain(selectedCaseIds[0]);
    expect(requestUrl.searchParams.get('case_ids')).toContain(selectedCaseIds[1]);
  });
});

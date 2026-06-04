import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  clearPersistedCaseListState,
  expectShareCaseFeatureReady,
  selectCaseRows,
  setupCaseListMocks,
  setupShareCaseApiRoutes,
  setupShareCaseBootstrapRoutes,
} from '../../helpers';
import { buildCaseListMock } from '../../mocks/caseList.mock';
import { shareCaseUsers } from '../../mocks/shareCase.mock';

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
    await expectShareCaseFeatureReady(page);
    await selectCaseRows(page, [0, 1]);
    await page.locator('#btn-share-button').click();

    await expect(page).toHaveURL(/\/cases\/case-share\?init=true/);
    await expect(page.getByRole('heading', { name: /add recipient/i })).toBeVisible();

    const requestUrl = new URL((await shareCasesRequest).url());
    expect(requestUrl.searchParams.get('case_ids')).toContain(selectedCaseIds[0]);
    expect(requestUrl.searchParams.get('case_ids')).toContain(selectedCaseIds[1]);
  });

  test('capture add user assignment payload with selected case context', async ({ caseListPage, page }) => {
    const caseListMock = buildCaseListMock(1);
    const selectedCaseId = caseListMock.results[0].case_fields['[CASE_REFERENCE]'];
    const assignmentCapture = await setupShareCaseApiRoutes(page, { caseIds: [selectedCaseId] });
    await setupCaseListMocks(page, { searchResponse: caseListMock });

    await caseListPage.navigateTo();
    await expectShareCaseFeatureReady(page);
    await selectCaseRows(page, [0]);
    await page.locator('#btn-share-button').click();
    await expect(page).toHaveURL(/\/cases\/case-share\?init=true/);

    const pendingSharePayload = {
      sharedCases: [
        {
          caseId: selectedCaseId,
          caseTitle: selectedCaseId,
          caseTypeId: 'xuiTestJurisdiction',
          sharedWith: [],
          pendingShares: [shareCaseUsers[1]],
          pendingUnshares: [],
        },
      ],
    };

    const responseOk = await page.evaluate(async (payload) => {
      const response = await fetch('/api/caseshare/case-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return response.ok;
    }, pendingSharePayload);

    expect(responseOk).toBe(true);
    expect(assignmentCapture.requests).toHaveLength(1);
    expect(assignmentCapture.requests[0].sharedCases[0].caseId).toBe(selectedCaseId);
    expect(assignmentCapture.requests[0].sharedCases[0].pendingShares?.[0].idamId).toBe(shareCaseUsers[1].idamId);
  });
});

import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  getCaseSelectionControls,
  hasExpectedShareCaseIds,
  parseShareCaseIds,
  selectCaseRows,
  setupShareCaseApiRoutes,
  setupShareCaseBootstrapRoutes,
} from '../../helpers/shareCaseMockRoutes.helper';
import { clearPersistedCaseListState, setupCaseListMocks } from '../../helpers/caseList.helper';
import { buildCaseListMock } from '../../mocks/caseList.mock';

import { ShareCasePage } from '../../../E2E/page-objects/pages/exui/shareCase.po';
import {
  buildSharingCaseList,
  shareCaseInitialCases,
  shareCaseUsers,
  existingShareRecipient,
  retainedShareRecipient,
  shareCaseAdditionRequest,
  shareCaseAdditionResult,
  shareCaseRemovalRequest,
  shareCaseRemovalResult,
} from '../../mocks/shareCase.mock';

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
      return requestUrl.pathname === '/api/caseshare/cases' && hasExpectedShareCaseIds(requestUrl.searchParams, selectedCaseIds);
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
    expect(parseShareCaseIds(requestUrl.searchParams).sort()).toEqual([...selectedCaseIds].sort());
    await expect(page.locator('xuilib-selected-case')).toHaveCount(selectedCaseIds.length);
    for (const caseId of selectedCaseIds) {
      await expect(page.locator(`#case-id-${caseId}`)).toHaveText(caseId);
    }
  });
});

test.describe('Share case assignment outcomes', { tag: ['@integration', '@integration-share-case'] }, () => {
  test('shares only the selected cases with the selected recipient and independently reads back both assignments', async ({
    caseListPage,
    page,
  }) => {
    const sharing = new ShareCasePage(page);
    const capture = await setupShareCaseApiRoutes(page, {
      cases: shareCaseInitialCases,
      assignmentResponse: shareCaseAdditionResult,
    });
    await setupCaseListMocks(page, { searchResponse: buildSharingCaseList() });
    await caseListPage.navigateTo();
    await sharing.openSelectedCases();
    await sharing.addRecipient(shareCaseUsers[0].email);
    await sharing.review();
    await expect(page.getByRole('heading', { name: 'Share a case Check and confirm your selection', exact: true })).toBeVisible();
    for (const aCase of shareCaseInitialCases.slice(0, 2)) {
      const review = sharing.reviewSection(aCase.caseId);
      await expect(review).toContainText(aCase.caseTitle);
      await expect(review.locator('tbody td')).toHaveText(['Joe Elliott', shareCaseUsers[0].email, 'To be added']);
    }
    await expect(sharing.reviewSection(shareCaseInitialCases[2].caseId)).toHaveCount(0);
    await sharing.confirm();
    await expect(page.getByRole('heading', { name: 'Your cases have been updated', exact: true })).toBeVisible();
    expect(capture.requests).toEqual([{ method: 'POST', ...shareCaseAdditionRequest }]);
    await expect(page.locator('#add-user-error')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Sorry, there is a problem' })).toHaveCount(0);

    // Independent GET fixture proves UI refresh, not downstream access grants.
    capture.cases = [...shareCaseAdditionResult, shareCaseInitialCases[2]];
    await caseListPage.navigateTo();
    await sharing.openSelectedCases([0, 1, 2]);
    await expect.poll(() => capture.caseRequests.length).toBe(2);
    expect(capture.caseRequests[1]).toEqual(shareCaseInitialCases.map((aCase) => aCase.caseId));
    for (const aCase of capture.cases) {
      await sharing.expandCase(aCase.caseId);
      await expect(sharing.caseSection(aCase.caseId).locator('tbody tr')).toHaveCount(aCase.sharedWith!.length);
      for (const user of aCase.sharedWith!) {
        await expect(sharing.caseSection(aCase.caseId).getByRole('row').filter({ hasText: user.email })).toBeVisible();
      }
    }
    await expect(sharing.caseSection(shareCaseInitialCases[2].caseId)).not.toContainText(shareCaseUsers[0].email);
    expect(capture.requests).toHaveLength(1);
  });

  test('removes only the intended existing case-role assignment and retains unrelated assignments on readback', async ({
    caseListPage,
    page,
  }) => {
    await setupShareCaseBootstrapRoutes(page, true);
    const sharing = new ShareCasePage(page);
    const capture = await setupShareCaseApiRoutes(page, {
      cases: shareCaseInitialCases,
      assignmentResponse: shareCaseRemovalResult,
    });
    await setupCaseListMocks(page, { searchResponse: buildSharingCaseList() });
    await caseListPage.navigateTo();
    await sharing.openSelectedCases();
    await sharing.removeRecipient(shareCaseInitialCases[0].caseId, existingShareRecipient.email);
    await sharing.review();
    const review = sharing.reviewSection(shareCaseInitialCases[0].caseId);
    await expect(review).toContainText(shareCaseInitialCases[0].caseTitle);
    await expect(review.locator('tbody td')).toHaveText(['Steve Harrison', existingShareRecipient.email, 'To be removed']);
    await expect(sharing.reviewSection(shareCaseInitialCases[1].caseId)).toHaveCount(0);
    await sharing.confirm();
    await expect(page.getByRole('heading', { name: 'Your cases have been updated', exact: true })).toBeVisible();
    expect(capture.requests).toEqual([{ method: 'POST', ...shareCaseRemovalRequest }]);
    await expect(page.locator('#add-and-remove-user-error')).toHaveCount(0);

    capture.cases = [...shareCaseRemovalResult, shareCaseInitialCases[2]];
    await caseListPage.navigateTo();
    await sharing.openSelectedCases([0, 1, 2]);
    await expect.poll(() => capture.caseRequests.length).toBe(2);
    for (const aCase of capture.cases) {
      await sharing.expandCase(aCase.caseId);
      await expect(sharing.caseSection(aCase.caseId).locator('tbody tr')).toHaveCount(aCase.sharedWith!.length);
      for (const user of aCase.sharedWith!) {
        await expect(sharing.caseSection(aCase.caseId).getByRole('row').filter({ hasText: user.email })).toBeVisible();
      }
    }
    await expect(sharing.caseSection(shareCaseInitialCases[0].caseId)).not.toContainText(existingShareRecipient.email);
    await expect(sharing.caseSection(shareCaseInitialCases[0].caseId)).toContainText(retainedShareRecipient.email);
    expect(capture.requests).toHaveLength(1);
  });

  test('does not expose existing-recipient removal controls when removal is disabled', async ({ caseListPage, page }) => {
    const sharing = new ShareCasePage(page);
    await setupShareCaseApiRoutes(page, { cases: shareCaseInitialCases });
    await setupCaseListMocks(page, { searchResponse: buildSharingCaseList() });
    await caseListPage.navigateTo();
    await sharing.openSelectedCases();
    await sharing.expandCase(shareCaseInitialCases[0].caseId);
    await expect(sharing.caseSection(shareCaseInitialCases[0].caseId)).toContainText(existingShareRecipient.email);
    await sharing.expandCase(shareCaseInitialCases[0].caseId);
    await expect(
      sharing.caseSection(shareCaseInitialCases[0].caseId).getByRole('row').filter({ hasText: existingShareRecipient.email })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /^Remove/ })).toHaveCount(0);
    await expect(page.locator('#remove-user-input')).toHaveCount(0);
    await expect(page.locator('#btn-remove-user')).toHaveCount(0);
  });
});

import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { ShareCasePage } from '../../../E2E/page-objects/pages/exui/shareCase.po';
import { clearPersistedCaseListState, setupCaseListMocks } from '../../helpers/caseList.helper';
import { setupShareCaseApiRoutes, setupShareCaseBootstrapRoutes } from '../../helpers/shareCaseMockRoutes.helper';
import {
  buildSharingCaseList,
  shareCaseInitialCases,
  shareCaseUsers,
  existingShareRecipient,
  shareCaseAdditionRequest,
  shareCaseAdditionResult,
  shareCaseRemovalRequest,
} from '../../mocks/shareCase.mock';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'SOLICITOR');
  await clearPersistedCaseListState(page);
  await setupShareCaseBootstrapRoutes(page);
});

test.describe('Share case incomplete outcomes', { tag: ['@integration', '@integration-share-case'] }, () => {
  for (const outcome of ['mixed', 'total failure'] as const) {
    test(`shows the exact unresolved additions for ${outcome} and independently reloads persisted assignments`, async ({
      caseListPage,
      page,
    }) => {
      const sharing = new ShareCasePage(page);
      const response =
        outcome === 'mixed'
          ? [shareCaseAdditionResult[0], shareCaseAdditionRequest.sharedCases[1]]
          : shareCaseAdditionRequest.sharedCases;
      const capture = await setupShareCaseApiRoutes(page, { cases: shareCaseInitialCases, assignmentResponse: response });
      await setupCaseListMocks(page, { searchResponse: buildSharingCaseList() });
      await caseListPage.navigateTo();
      await sharing.openSelectedCases();
      await sharing.addRecipient(shareCaseUsers[0].email);
      await sharing.review();
      await sharing.confirm();
      await expect(page.getByRole('heading', { name: 'Sorry, there is a problem', exact: true })).toBeVisible();
      await expect(page.locator('#add-user-error')).toHaveText('We couldn’t share access to the following cases:');
      await expect(page.getByRole('heading', { name: 'Your cases have been updated' })).toHaveCount(0);
      expect(capture.requests).toEqual([{ method: 'POST', ...shareCaseAdditionRequest }]);
      const pendingCases = outcome === 'mixed' ? [shareCaseInitialCases[1]] : shareCaseInitialCases.slice(0, 2);
      await expect(page.locator('exui-case-share-complete h2')).toHaveText(pendingCases.map((aCase) => aCase.caseTitle));
      await expect(page.locator('exui-case-share-complete .case-share-confirm__caption')).toHaveText(
        pendingCases.map((aCase) => aCase.caseId)
      );
      await expect(page.locator('exui-case-share-complete tbody tr')).toHaveCount(pendingCases.length);
      for (const row of await page.locator('exui-case-share-complete tbody tr').all()) {
        await expect(row.locator('td')).toHaveText(['Joe Elliott', shareCaseUsers[0].email, 'To be added']);
      }

      capture.cases =
        outcome === 'mixed'
          ? [shareCaseAdditionResult[0], shareCaseInitialCases[1], shareCaseInitialCases[2]]
          : structuredClone(shareCaseInitialCases);
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
      for (const aCase of pendingCases) {
        await expect(sharing.caseSection(aCase.caseId)).not.toContainText(shareCaseUsers[0].email);
      }
      expect(capture.requests).toHaveLength(1);
    });
  }

  test('retains the exact unresolved removal and original assignments after a rejected removal result', async ({
    caseListPage,
    page,
  }) => {
    await setupShareCaseBootstrapRoutes(page, true);
    const sharing = new ShareCasePage(page);
    const capture = await setupShareCaseApiRoutes(page, {
      cases: shareCaseInitialCases,
      assignmentResponse: shareCaseRemovalRequest.sharedCases,
    });
    await setupCaseListMocks(page, { searchResponse: buildSharingCaseList() });
    await caseListPage.navigateTo();
    await sharing.openSelectedCases();
    await sharing.removeRecipient(shareCaseInitialCases[0].caseId, existingShareRecipient.email);
    await sharing.review();
    await sharing.confirm();
    await expect(page.getByRole('heading', { name: 'Sorry, there is a problem', exact: true })).toBeVisible();
    await expect(page.locator('#add-and-remove-user-error')).toHaveText(
      'We couldn’t share or remove access to the following cases:'
    );
    await expect(page.getByRole('heading', { name: 'Your cases have been updated' })).toHaveCount(0);
    expect(capture.requests).toEqual([{ method: 'POST', ...shareCaseRemovalRequest }]);
    await expect(page.locator('exui-case-share-complete h2')).toHaveText([shareCaseInitialCases[0].caseTitle]);
    await expect(page.locator('exui-case-share-complete .case-share-confirm__caption')).toHaveText([
      shareCaseInitialCases[0].caseId,
    ]);
    await expect(page.locator('exui-case-share-complete tbody td')).toHaveText([
      'Steve Harrison',
      existingShareRecipient.email,
      'To be removed',
    ]);
    capture.cases = structuredClone(shareCaseInitialCases);
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
    expect(capture.requests).toHaveLength(1);
  });

  test('routes a failed assignment request to service-down without claiming removal succeeded', async ({
    caseListPage,
    page,
  }) => {
    await setupShareCaseBootstrapRoutes(page, true);
    const sharing = new ShareCasePage(page);
    const capture = await setupShareCaseApiRoutes(page, { cases: shareCaseInitialCases, assignmentStatus: 500 });
    await setupCaseListMocks(page, { searchResponse: buildSharingCaseList() });
    await caseListPage.navigateTo();
    await sharing.openSelectedCases();
    await sharing.removeRecipient(shareCaseInitialCases[0].caseId, existingShareRecipient.email);
    await sharing.review();
    await sharing.confirm();
    await expect(page).toHaveURL(/\/service-down$/);
    await expect(page.getByRole('heading', { name: 'Sorry, there is a problem with the service', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your cases have been updated' })).toHaveCount(0);
    expect(capture.requests).toEqual([{ method: 'POST', ...shareCaseRemovalRequest }]);
  });
});

import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import type { Page } from '@playwright/test';
import {
  buildCaseFileViewCaseMock,
  buildCaseFileViewCategoriesMock,
  CASE_FILE_VIEW_DOC_IDS,
} from '../../mocks/caseFileView.mock';

const caseId = '1690807693531270';
const caseFileViewCategoriesMock = buildCaseFileViewCategoriesMock();
const minimalPdf = Buffer.from(
  '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF',
  'utf-8'
);

async function setupCaseFileViewRoutes(page: Page, userIdentifier: string) {
  await applySessionCookies(page, userIdentifier);
  const caseDetailsMock = buildCaseFileViewCaseMock(caseId);

  await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(caseDetailsMock) });
  });

  await page.route(`**/categoriesAndDocuments/${caseId}*`, async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(caseFileViewCategoriesMock) });
  });
}

test.describe('Case file view integration coverage', { tag: ['@integration', '@integration-case-file-view'] }, () => {
  test('V1.1 shows tree view, media viewer, document count, folder hierarchy and upload stamps', async ({
    caseDetailsPage,
    caseFileViewPage,
    page,
  }) => {
    await setupCaseFileViewRoutes(page, 'RESTRICTED_CASE_FILE_VIEW_V1.1_ON');

    await page.goto(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
    await caseDetailsPage.selectCaseDetailsTab('Case File View');
    await caseFileViewPage.waitForReady();

    await expect(caseFileViewPage.documentHeader).toContainText('Documents (6)');

    const ordersNode = await caseFileViewPage.getFolderNode('Orders');
    const approvedOrdersNode = await caseFileViewPage.getFolderNode('Orders.Approved orders');
    await expect(caseFileViewPage.getFolderName(ordersNode)).toContainText('Orders');
    await expect(caseFileViewPage.getFolderName(approvedOrdersNode)).toContainText('Approved orders');

    await expect(caseFileViewPage.getFolderCount(ordersNode)).toHaveText('2');
    await expect(caseFileViewPage.getFolderCount(approvedOrdersNode)).toHaveText('1');

    const evidenceNode = await caseFileViewPage.getFolderNode('Evidence');
    await expect(caseFileViewPage.getFileUploadStamp(evidenceNode, 'Alpha evidence.pdf')).toContainText('20 Oct 2023');
    await expect(caseFileViewPage.getFileUploadStamp(evidenceNode, 'Middle evidence.pdf')).toContainText('21 Oct 2023');
  });

  test('selecting V2 and V1 documents updates the media viewer request target', async ({
    caseDetailsPage,
    caseFileViewPage,
    page,
  }) => {
    await setupCaseFileViewRoutes(page, 'RESTRICTED_CASE_FILE_VIEW_V1.1_ON');

    const binaryRequests: string[] = [];
    await page.route('**/documentsv2/*/binary', async (route) => {
      binaryRequests.push(route.request().url());
      await route.fulfill({ status: 200, contentType: 'application/pdf', body: minimalPdf });
    });
    await page.route('**/documents/*/binary', async (route) => {
      binaryRequests.push(route.request().url());
      await route.fulfill({ status: 200, contentType: 'application/pdf', body: minimalPdf });
    });

    await page.goto(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
    await caseDetailsPage.selectCaseDetailsTab('Case File View');
    await caseFileViewPage.waitForReady();

    const evidenceNode = await caseFileViewPage.getFolderNode('Evidence');

    const requestCountBeforeV2 = binaryRequests.length;
    await caseFileViewPage.getFile(evidenceNode, 'Zulu evidence.pdf').click();
    await expect.poll(() => binaryRequests.length).toBeGreaterThan(requestCountBeforeV2);
    await expect.poll(() => binaryRequests[binaryRequests.length - 1] || '').toContain(
      `/documentsv2/${CASE_FILE_VIEW_DOC_IDS.evidenceZuluV2}/binary`
    );

    const requestCountBeforeV1 = binaryRequests.length;
    await caseFileViewPage.getFile(evidenceNode, 'Alpha evidence.pdf').click();
    await expect.poll(() => binaryRequests.length).toBeGreaterThan(requestCountBeforeV1);
    await expect.poll(() => binaryRequests[binaryRequests.length - 1] || '').toContain(
      `/documents/${CASE_FILE_VIEW_DOC_IDS.evidenceAlphaV1}/binary`
    );
    await expect(caseFileViewPage.mediaViewerContainer).toBeVisible();
  });

  test('V1 mode still shows core case file view content', async ({ caseDetailsPage, caseFileViewPage, page }) => {
    await setupCaseFileViewRoutes(page, 'RESTRICTED_CASE_FILE_VIEW_V1.1_OFF');

    await page.route('**/documentsv2/*/binary', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/pdf', body: minimalPdf });
    });
    await page.route('**/documents/*/binary', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/pdf', body: minimalPdf });
    });

    await page.goto(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
    await caseDetailsPage.selectCaseDetailsTab('Case File View');
    await caseFileViewPage.waitForReady();

    await expect(caseFileViewPage.documentHeader).toContainText('Documents (6)');
  });

  test('sort options reorder documents as expected', async ({ caseDetailsPage, caseFileViewPage, page }) => {
    await setupCaseFileViewRoutes(page, 'RESTRICTED_CASE_FILE_VIEW_V1.1_ON');

    await page.route('**/documentsv2/*/binary', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/pdf', body: minimalPdf });
    });
    await page.route('**/documents/*/binary', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/pdf', body: minimalPdf });
    });

    await page.goto(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
    await caseDetailsPage.selectCaseDetailsTab('Case File View');
    await caseFileViewPage.waitForReady();

    await expect(caseFileViewPage.sortButton).toBeVisible();

    await caseFileViewPage.sortButton.click();
    await expect(caseFileViewPage.sortMenu).toContainText('A to Z ascending');
    await expect(caseFileViewPage.sortMenu).toContainText('Z to A descending');
    await expect(caseFileViewPage.sortMenu).toContainText('Recent first');
    await expect(caseFileViewPage.sortMenu).toContainText('Oldest first');

    await caseFileViewPage.sortMenu.getByText('A to Z ascending', { exact: true }).click();
    await expect.poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder('Evidence')).toEqual([
      'Alpha evidence.pdf',
      'Middle evidence.pdf',
      'Zulu evidence.pdf',
    ]);

    await caseFileViewPage.sortButton.click();
    await caseFileViewPage.sortMenu.getByText('Z to A descending', { exact: true }).click();
    await expect.poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder('Evidence')).toEqual([
      'Zulu evidence.pdf',
      'Middle evidence.pdf',
      'Alpha evidence.pdf',
    ]);

    await caseFileViewPage.sortButton.click();
    await caseFileViewPage.sortMenu.getByText('Recent first', { exact: true }).click();
    await expect.poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder('Evidence')).toEqual([
      'Zulu evidence.pdf',
      'Middle evidence.pdf',
      'Alpha evidence.pdf',
    ]);

    await caseFileViewPage.sortButton.click();
    await caseFileViewPage.sortMenu.getByText('Oldest first', { exact: true }).click();
    await expect.poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder('Evidence')).toEqual([
      'Alpha evidence.pdf',
      'Middle evidence.pdf',
      'Zulu evidence.pdf',
    ]);
  });
});

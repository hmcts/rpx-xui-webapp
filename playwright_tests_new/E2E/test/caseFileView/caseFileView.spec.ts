import { expect, test } from '../../fixtures';
import { ensureSession } from '../../../common/sessionCapture';
import { openHomeWithCapturedSession } from '../searchCase/searchCase.setup';

const userIdentifier = 'PRL_Courtadmin';
const caseReference = '1775650511191465';
const caseFileViewTimeoutMs = 120_000;
const ordersFolderPath = 'Orders.Finalised order';
const ordersRootFolder = 'Orders';
const preliminaryDocumentsFolder = 'Preliminary Documents';
const preliminaryPositionStatementsFolder = 'Preliminary Documents.Position statements';
const documentName = 'Power_of_arrest.pdf';

test.describe('Case file view', { tag: ['@e2e', '@e2e-case-file-view'] }, () => {
  test.describe.configure({ timeout: caseFileViewTimeoutMs });

  test.beforeAll(async () => {
    await ensureSession(userIdentifier);
  });

  test.beforeEach(async ({ page }) => {
    await openHomeWithCapturedSession(page, userIdentifier);
  });

  test('Case File view, media viewer, document count', async ({ caseDetailsPage, caseFileViewPage, searchCasePage, page }) => {
    await test.step('Navigate to the case and open Case File View Tab', async () => {
      await searchCasePage.searchWith16DigitCaseId(caseReference);
      await expect(page).toHaveURL(/\/cases\/case-details\//);
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();
    });

    await test.step('Verify document count and the initial document location', async () => {
      await expect(caseFileViewPage.documentHeader).toContainText('12');
      const finalisedOrderNode = await caseFileViewPage.getFolderNode(ordersFolderPath);
      await expect(caseFileViewPage.getFolderCount(finalisedOrderNode)).toHaveText('1');
      await expect(caseFileViewPage.getFile(finalisedOrderNode, documentName)).toBeVisible();
    });

    await test.step('Open the document and verify available actions', async () => {
      await caseFileViewPage.clickFile(ordersFolderPath, documentName);
      await expect(caseFileViewPage.mediaViewerContainer).toBeVisible();
      await expect(caseFileViewPage.mediaViewerToolbar).toBeVisible();
      await expect(caseFileViewPage.getFile(await caseFileViewPage.getFolderNode(ordersFolderPath), documentName)).toBeVisible();

      await caseFileViewPage.openDocumentActions(ordersFolderPath, documentName);
      await expect(caseFileViewPage.getDocumentAction('Change folder')).toBeVisible();
      await expect(caseFileViewPage.getDocumentAction('Open in a new tab')).toBeVisible();
      await expect(caseFileViewPage.getDocumentAction('Download')).toBeVisible();
      await expect(caseFileViewPage.getDocumentAction('Print')).toBeVisible();
    });

    await test.step('Move the document into Preliminary Documents.Position statements', async () => {
      await caseFileViewPage.clickDocumentAction('Change folder');
      await caseFileViewPage.moveDocumentToFolderPath([preliminaryDocumentsFolder, 'Position statements']);
      await page.waitForLoadState('domcontentloaded');
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();

      const ordersFileNode = await caseFileViewPage.getFolderNode(ordersRootFolder);
      const preliminaryDocumentsNode = await caseFileViewPage.getFolderNode(preliminaryDocumentsFolder);

      await expect(caseFileViewPage.getFolderCount(ordersFileNode)).toHaveText('0');
      await expect(caseFileViewPage.getFolderCount(preliminaryDocumentsNode)).toHaveText('1');
      await expect
        .poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder(preliminaryPositionStatementsFolder))
        .toContain(documentName);
    });

    await test.step('Move the document back to Orders.Finalised order', async () => {
      await caseFileViewPage.clickFile(preliminaryPositionStatementsFolder, documentName);
      await caseFileViewPage.openDocumentActions(preliminaryPositionStatementsFolder, documentName);
      await caseFileViewPage.clickDocumentAction('Change folder');
      await caseFileViewPage.moveDocumentToFolderPath([ordersRootFolder, 'Finalised order']);
      await page.waitForLoadState('domcontentloaded');
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();

      const ordersFileNode = await caseFileViewPage.getFolderNode(ordersRootFolder);
      const preliminaryDocumentsNode = await caseFileViewPage.getFolderNode(preliminaryDocumentsFolder);

      await expect(caseFileViewPage.getFolderCount(preliminaryDocumentsNode)).toHaveText('0');
      await expect(caseFileViewPage.getFolderCount(ordersFileNode)).toHaveText('1');
      await expect.poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder(ordersFolderPath)).toContain(documentName);
    });

    await test.step('Sign out', async () => {
      await caseFileViewPage.exuiHeader.signOutLink.click();
      await expect(page).toHaveURL(/\/auth\/logout|\/login/);
    });
  });
});

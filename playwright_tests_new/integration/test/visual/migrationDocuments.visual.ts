import { expect, test } from '@playwright/test';
import { CaseDetailsPage } from '../../../E2E/page-objects/pages/exui/caseDetails.po';
import { CaseFileViewPage } from '../../../E2E/page-objects/pages/exui/caseFileView.po';
import { setupCaseFileViewMockSession } from '../../helpers/caseFileViewMockSession.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import { CASE_FILE_VIEW_DOC_IDS } from '../../mocks/caseFileView.mock';
import { MIGRATION_DOCUMENT_CASE, MIGRATION_DOCUMENT_TEXT } from '../../mocks/migrationJourneys.mock';

test('embedded Case File PDF paints content and navigates to the next page', async ({ page, baseURL }, testInfo) => {
  if (!baseURL) throw new Error('The migration visual runner requires baseURL');
  await setupMigrationVisualRoutes(page, ['caseworker-privatelaw', 'hmcts-staff']);
  const routes = await setupCaseFileViewMockSession(page, MIGRATION_DOCUMENT_CASE, baseURL);
  await page.route('**/em-anno/annotation-sets/filter*', (route) => route.fulfill({ json: [] }));
  await page.route('**/em-anno/*/bookmarks*', (route) => route.fulfill({ json: [] }));
  await page.route('**/em-anno/metadata/*', (route) => route.fulfill({ json: {} }));
  const details = new CaseDetailsPage(page);
  const files = new CaseFileViewPage(page);
  await details.openCaseDetails('PRIVATELAW', 'PRLAPPS', MIGRATION_DOCUMENT_CASE);
  await details.selectCaseDetailsTab('Case File View');
  await files.waitForReady();
  await expect(files.documentHeader).toHaveText('Documents (6)');

  const binary = page.waitForResponse((response) =>
    new URL(response.url()).pathname.endsWith(`/${CASE_FILE_VIEW_DOC_IDS.evidenceAlpha}/binary`)
  );
  await files.clickFile('Evidence', 'Alpha evidence.pdf');
  expect((await binary).status()).toBe(200);
  await expect(
    files.mediaViewPanel.getByRole('region', { name: /Page.*1/ }).getByText(MIGRATION_DOCUMENT_TEXT, { exact: true })
  ).toBeVisible();
  // Check painted pixels as well as the text layer, which can appear before the visible PDF.
  const canvas = files.mediaViewPanel.locator('canvas').first();
  await expect(canvas).toBeVisible();
  await expect
    .poll(() =>
      canvas.evaluate((element: HTMLCanvasElement) => {
        const context = element.getContext('2d');
        if (!context || element.width === 0 || element.height === 0) return 0;
        const pixels = context.getImageData(0, 0, element.width, element.height).data;
        let paintedPixels = 0;
        for (let pixel = 0; pixel < pixels.length; pixel += 4) {
          if (pixels[pixel + 3] > 0 && Math.min(pixels[pixel], pixels[pixel + 1], pixels[pixel + 2]) < 200) paintedPixels++;
        }
        return paintedPixels;
      })
    )
    .toBeGreaterThan(100);

  const pageNumber = files.mediaViewerToolbar.getByRole('spinbutton', { name: 'Page number' });
  await expect(pageNumber).toHaveValue('1');
  await files.mediaViewerToolbar.getByRole('button', { name: 'Next page', exact: true }).click();
  await expect(pageNumber).toHaveValue('2');
  await expect(
    files.mediaViewPanel.getByText('Second page confirms pagination and navigation behaviour.', { exact: false })
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await testInfo.attach('migration-case-file-rendered-pdf', {
    body: await files.container.screenshot(),
    contentType: 'image/png',
  });
  expect(routes.getUnexpectedRequests()).toEqual([]);
});

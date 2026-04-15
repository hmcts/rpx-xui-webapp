import { faker } from '@faker-js/faker';
import { Response } from '@playwright/test';
import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage, ensureSession } from '../../../common/sessionCapture';
import { createDivorceCase } from '../../utils/test-setup/journeys/divorceCaseJourneys';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const JURISDICTION = 'DIVORCE';
const CASE_TYPE = 'xuiTestCaseType';
const MEDIA_VIEWER_ROUTE_PATTERN = /\/media-viewer(?:\?|$)/;
const UPDATE_CASE_ACTION = 'Update case';
const MEDIA_VIEWER_FIXTURE_PATH = path.resolve(
  process.cwd(),
  'playwright_tests_new/integration/testData/documents/case-file-view-document-delivery.pdf'
);
const MEDIA_VIEWER_FIXTURE_CONTENT = readFileSync(MEDIA_VIEWER_FIXTURE_PATH, 'latin1');

test.describe('Media Viewer happy path', { tag: ['@e2e', '@e2e-media-viewer'] }, () => {
  test.describe.configure({ timeout: 180_000 });

  test.beforeAll(async ({ browserName: _browserName }, testInfo) => {
    testInfo.setTimeout(180_000);
    await ensureSession('SOLICITOR');
  });

  test('opens auploaded document in the Media Viewer end-to-end', async ({ page, createCasePage, caseDetailsPage }, testInfo) => {
    let caseDetailsUrl = '';
    faker.seed(testInfo.retry + 1);
    const uniqueSuffix = `${Date.now()}-w${testInfo.workerIndex}-r${testInfo.retry}`;
    const documentFileName = `media-viewer-${uniqueSuffix}.pdf`;
    const caseMarker = `media-viewer-${faker.string.alphanumeric(8)}-${uniqueSuffix}`;

    await test.step('Authenticate and upload a PDF for this test run', async () => {
      await ensureAuthenticatedPage(page, 'SOLICITOR', { waitForSelector: 'exui-header' });
    });

    await test.step('Create a case for this test run', async () => {
      await createDivorceCase(createCasePage, JURISDICTION, CASE_TYPE, caseMarker);
      caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();
    });

    await test.step('Upload a  document through the update flow', async () => {
      await retryOnTransientFailure(
        async () => {
          await caseDetailsPage.selectCaseDetailsTab('Tab 1');
          await caseDetailsPage.selectCaseAction(UPDATE_CASE_ACTION, {
            expectedLocator: createCasePage.fileUploadInput,
          });
          await createCasePage.uploadFile(
            documentFileName,
            'application/pdf',
            MEDIA_VIEWER_FIXTURE_CONTENT,
            createCasePage.fileUploadInput,
            'latin1'
          );
          await createCasePage.clickContinueMultipleTimes(4);
          await createCasePage.clickSubmitAndWait('after uploading media viewer document', {
            maxAutoAdvanceAttempts: 3,
          });
          await expect(caseDetailsPage.caseAlertSuccessMessage).toBeVisible();
        },
        {
          maxAttempts: 2,
          onRetry: async () => {
            try {
              await caseDetailsPage.reopenCaseDetails(caseDetailsUrl);
            } catch {
              await caseDetailsPage.page.goto(caseDetailsUrl);
            }
          },
        }
      );
    });

    await test.step('Open the uploaded document from the case details tab', async () => {
      await expect
        .poll(
          async () => {
            await caseDetailsPage.selectCaseDetailsTab('Tab 1').catch(() => undefined);
            const rowVisible = await caseDetailsPage.documentOneRow.isVisible().catch(() => false);
            if (!rowVisible) {
              return '';
            }
            return await caseDetailsPage.documentOneRow.innerText().catch(() => '');
          },
          { timeout: 45_000, intervals: [1_000, 2_000, 3_000] }
        )
        .toContain(documentFileName);

      await expect(caseDetailsPage.caseViewerTable).toBeVisible();
      await expect(caseDetailsPage.documentOneAction).toBeVisible();
    });

    await test.step('Validate the Media Viewer end-to-end happy path', async () => {
      const binaryResponses: string[] = [];
      const onResponse = (response: Response) => {
        if (response.request().method() !== 'GET') {
          return;
        }

        const pathname = new URL(response.url()).pathname;
        if (/\/documents(?:v2)?\/[^/]+\/binary$/.test(pathname)) {
          binaryResponses.push(response.url());
        }
      };

      page.context().on('response', onResponse);
      try {
        const mediaPage = await caseDetailsPage.openDocumentOneInMediaViewer();
        await mediaPage.waitForLoadState('domcontentloaded').catch(() => undefined);

        await expect.poll(() => binaryResponses.length).toBeGreaterThan(0);
        await expect.poll(() => binaryResponses.at(-1) ?? '').toMatch(/\/documents(?:v2)?\/[^/]+\/binary$/);

        await expect(mediaPage).toHaveURL(MEDIA_VIEWER_ROUTE_PATTERN);
        await expect.poll(async () => mediaPage.title()).toContain(`${documentFileName} - View Document`);
        await expect(mediaPage.locator('exui-media-viewer')).toBeVisible();
        await expect(mediaPage.locator('#mvToolbarMain')).toBeVisible();
        await expect(mediaPage.locator('#viewerContainer')).toBeVisible();
      } finally {
        page.context().off('response', onResponse);
      }
    });
  });
});

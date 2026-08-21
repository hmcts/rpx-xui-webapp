import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';
import { createLogger } from '@hmcts/playwright-common';
import { RuntimeUserAlias } from '../../utils/runtimeUserCredentials';
const jurisdiction = 'BEFTA_MASTER';
const caseType = 'FT_MasterCaseType';

const claimantCaseRole = '[Claimant]';
const defendantCaseRole = '[Defendant]';
const organisationSearchTerm = '201';

const richText = { plain: 'Plain ', bold: 'Bold', italic: 'Italic' };
const richTextMin = { plain: 'Minimum ', bold: 'Bold', italic: 'Italic' };
const tooShortForMinLength = 'ab';

let caseNumber: string;
const logger = createLogger({ serviceName: 'create-case-e2e', format: 'pretty' });

test.describe(
  'Verify creating a case with rich text and organisation policy fields',
  { tag: ['@e2e', '@e2e-create-case', '@e2e-data-loss'] },
  () => {
    test.beforeEach(async ({ page, caseDetailsPage, createCasePage }) => {
      await retryOnTransientFailure(
        async () => {
          await ensureAuthenticatedPage(page, RuntimeUserAlias.BEFTA_MASTER_CASE, { waitForSelector: 'exui-header' });
          await createCasePage.createCase(jurisdiction, caseType, 'createCase');
          await createCasePage.fillOrganisationPolicy(0, claimantCaseRole, organisationSearchTerm);
          await createCasePage.fillOrganisationPolicy(1, defendantCaseRole, organisationSearchTerm);
          await createCasePage.enterFormattedRichText(richText, 'richTextArea');
          await createCasePage.enterFormattedRichText(richTextMin, 'richTextMinArea');

          await createCasePage.continueButton.click();
          await createCasePage.assertNoEventCreationError('after submitting the create case form');

          await createCasePage.testSubmitButton.click();
          await expect(createCasePage.caseAlertSuccessMessage).toBeVisible();
          caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
        },
        {
          maxAttempts: 2,
          onRetry: async () => {
            if (page.isClosed()) {
              return;
            }
            try {
              await page.goto('/');
            } catch (error) {
              logger.warn('Retry reset navigation failed before create-case beforeEach retry', { error });
              throw error;
            }
          },
        }
      );
    });

    test('Verify rich text formatting is retained after the case is created', async ({
      page,
      validatorUtils,
      caseDetailsPage,
    }) => {
      await test.step('Validate the case number format and URL', async () => {
        expect.soft(caseNumber).toMatch(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
        expect.soft(page.url()).toContain(`/${jurisdiction}/${caseType}/`);
      });

      await test.step('Check the case tab Data, matches previously entered rich text', async () => {
        await caseDetailsPage.selectCaseDetailsTab('Details');
        // trRowsToObjectInPage() reduces a cell to its first text node, so it reports
        // only "Plain" for a formatted value. Assert on the row itself instead.
        await expect
          .soft(caseDetailsPage.richTextAreaRow, 'Rich Text Area should keep all three segments')
          .toContainText(`${richText.plain}${richText.bold}${richText.italic}`);
        await expect
          .soft(caseDetailsPage.richTextAreaMinRow, 'Minimum length field should keep all three segments')
          .toContainText(`${richTextMin.plain}${richTextMin.bold}${richTextMin.italic}`);
      });

      await test.step('Check both rich text fields retain their formatting markup', async () => {
        // The values must round-trip as markup, not be flattened to plain text.
        await expect
          .soft(caseDetailsPage.richTextAreaRow.locator('strong'), 'Bold text should stay bold')
          .toHaveText(richText.bold);
        await expect
          .soft(caseDetailsPage.richTextAreaRow.locator('em'), 'Italic text should stay italic')
          .toHaveText(richText.italic);

        await expect
          .soft(caseDetailsPage.richTextAreaMinRow.locator('strong'), 'Bold text should stay bold')
          .toHaveText(richTextMin.bold);
        await expect
          .soft(caseDetailsPage.richTextAreaMinRow.locator('em'), 'Italic text should stay italic')
          .toHaveText(richTextMin.italic);
      });

      await test.step('Check the History tab shows the case creation event', async () => {
        await caseDetailsPage.selectCaseDetailsTab('History');
        const { updateRow, updateDate, updateAuthor } = await caseDetailsPage.getCaseHistoryByEvent('Create a case');
        expect.soft(updateRow, 'Create a case row should be present').toBeTruthy();
        expect.soft(updateAuthor, 'Case author should be present').not.toBe('');

        const expectedDetails = {
          Date: updateDate,
          Author: updateAuthor,
          'End state': 'Create case',
          Event: 'Create a case',
          Summary: '-',
          Comment: '-',
        };
        const table = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.historyDetailsTable);
        expect.soft(table).toMatchObject(expectedDetails);
      });
    });
  }
);

test.describe('Verify rich text minimum length validation', { tag: ['@e2e', '@e2e-create-case'] }, () => {
  test.beforeEach(async ({ page, createCasePage }) => {
    await retryOnTransientFailure(
      async () => {
        await ensureAuthenticatedPage(page, RuntimeUserAlias.BEFTA_MASTER_CASE, { waitForSelector: 'exui-header' });
        await createCasePage.createCase(jurisdiction, caseType, 'createCase');
      },
      {
        maxAttempts: 2,
        onRetry: async () => {
          try {
            await page.goto('/');
          } catch (error) {
            logger.warn('Retry reset navigation failed before min-length check', { error });
            throw error;
          }
        },
      }
    );
  });

  test('Enter a Rich text value below the minimum length and rejected', async ({ createCasePage }) => {
    await test.step('Enter a value shorter than the minimum and continue', async () => {
      await createCasePage.richTextMinArea.click();
      await createCasePage.richTextMinArea.pressSequentially(tooShortForMinLength);
      await createCasePage.continueButton.click();
    });
    await test.step('The field is marked invalid and explains the minimum length', async () => {
      await expect(createCasePage.richTextMinFieldError, 'An inline error should be shown').toBeVisible();
      await expect
        .soft(createCasePage.richTextMinFieldError, 'The error should state the minimum length')
        .toContainText('requires a minimum length of 10');
    });
  });
});

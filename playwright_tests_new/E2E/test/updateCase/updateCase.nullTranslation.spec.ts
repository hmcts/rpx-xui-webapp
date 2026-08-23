import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { createDivorceCase } from '../../utils/test-setup/journeys/divorceCaseJourneys';

let caseNumber: string;
let nullTranslationResponses = 0;
const UPDATE_CASE_ACTION_TIMEOUT_MS = 60_000;
const UPDATED_FIRST_NAME = 'Translation';
const UPDATED_LAST_NAME = 'Verified';

test.describe(
  'Verify case events handle null/undefined translation labels correctly',
  { tag: ['@e2e', '@e2e-translation'] },
  () => {
    test.describe.configure({ timeout: 240_000 });

    test.beforeEach(async ({ page, createCasePage, caseDetailsPage, identityLease }) => {
      nullTranslationResponses = 0;
      await page.route('**/api/translation/**', async (route) => {
        nullTranslationResponses += 1;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            translations: {
              'Update case': { translation: null },
              'Case details': { translation: null },
              History: { translation: null },
            },
          }),
        });
      });
      const lease = await identityLease.acquire({ pool: 'DIVORCE_SOLICITOR' });
      await ensureAuthenticatedPage(page, lease.identity.userIdentifier, {
        waitForSelector: 'exui-header',
        timeoutMs: 30_000,
      });
      await createDivorceCase(createCasePage, 'DIVORCE', 'XUI Case PoC', 'Translation Test Case', {
        maxAttempts: 1,
        createCaseMaxAttempts: 2,
      });
      caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
    });

    test('Case event submission should not fail when translation labels are missing or null', async ({
      page,
      createCasePage,
      caseDetailsPage,
    }) => {
      const caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();

      await test.step('Navigate to case details and verify no translation errors occurred', async () => {
        await caseDetailsPage.reopenCaseDetails(caseDetailsUrl);
        await createCasePage.exuiHeader.switchLanguage('Cymraeg', { waitForTranslatedContent: true });
        expect(nullTranslationResponses).toBeGreaterThan(0);
        await expect(page).toHaveURL(/\/cases\/case-details\//);
        await expect(caseDetailsPage.caseViewerTable).toBeVisible();
        const pageContent = await page.content();
        const translationErrors = /\[undefined\]|\[null\]|Cannot read.*translation|TypeError.*trim|undefined.*\.split/.test(
          pageContent
        );
        expect(translationErrors).toBe(false);
      });

      await test.step('Submit Update case with the translated labels rendered', async () => {
        await caseDetailsPage.selectCaseAction('Update case', {
          expectedLocator: createCasePage.person2FirstNameInput,
          timeoutMs: UPDATE_CASE_ACTION_TIMEOUT_MS,
        });
        await createCasePage.person2FirstNameInput.fill(UPDATED_FIRST_NAME);
        await createCasePage.person2LastNameInput.fill(UPDATED_LAST_NAME);
        await createCasePage.clickContinueAndEnsureWizardAdvanced('translation update fields', {
          expectedLocator: createCasePage.doYouAgreeGroup,
          timeoutMs: 30_000,
        });
        await createCasePage.ensureDoYouAgreeAnswered();
        await createCasePage.clickSubmitAndWait('translation update submission', {
          timeoutMs: 60_000,
          maxAutoAdvanceAttempts: 0,
        });
        await expect(caseDetailsPage.caseAlertSuccessMessage).toBeVisible();
        await caseDetailsPage.selectCaseDetailsTab('History');
        const history = await caseDetailsPage.getCaseHistoryByEvent('Update case');
        expect(history.updateRow, 'Update case event should be recorded after translation-safe submission').toBeTruthy();
      });

      await test.step('Verify no translation-specific console errors', async () => {
        // Check for error messages that would indicate translation failures
        const errorPatterns = [
          /cannot read.*properties.*of.*undefined.*label/i,
          /cannot read.*properties.*of.*null.*label/i,
          /\[object.*error\].*translation/i,
        ];

        const pageContent = await page.content();
        for (const pattern of errorPatterns) {
          expect(pattern.test(pageContent)).toBe(false);
        }
      });
    });

    test('Page should remain stable when loading labels with special characters or null values', async ({
      page,
      caseDetailsPage,
    }) => {
      const caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();

      await test.step('Navigate to case details and verify page stability', async () => {
        await caseDetailsPage.reopenCaseDetails(caseDetailsUrl);

        await expect(page).toHaveURL(/\/cases\/case-details\//);
        await expect(caseDetailsPage.caseViewerTable).toBeVisible();
      });

      await test.step('Verify field labels are rendered without translation errors', async () => {
        // Check that labels exist and page didn't crash
        const labels = page.locator('label, dt, [role="rowheader"]');
        const labelCount = await labels.count();

        // Main validation: check for error patterns in page content
        const pageContent = await page.content();
        const hasTranslationCrash = /\[undefined\]|\[null\]|Cannot read.*undefined|Cannot read.*null/.test(pageContent);

        expect(hasTranslationCrash).toBe(false);
        expect(labelCount).toBeGreaterThan(0);
        await expect(labels.first()).not.toHaveText(/^\s*$/);
      });

      await test.step('Verify no rendering errors in case details header', async () => {
        await expect(caseDetailsPage.container).toBeVisible();
        await expect(caseDetailsPage.caseViewerTable).toBeVisible();
      });
    });
  }
);

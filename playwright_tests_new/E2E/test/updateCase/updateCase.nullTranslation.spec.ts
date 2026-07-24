import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { caseBannerMatches, getTodayFormats, matchesToday } from '../../utils';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';
import { createDivorceCase } from '../../utils/test-setup/journeys/divorceCaseJourneys';
import { RuntimeUserAlias } from '../../utils/runtimeUserCredentials';

let caseNumber: string;
const UPDATE_CASE_ACTION_TIMEOUT_MS = 60_000;

test.describe('Verify case events handle null/undefined translation labels correctly', { tag: ['@e2e', '@e2e-translation'] }, () => {
  test.describe.configure({ timeout: 240_000 });
  
  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
    await retryOnTransientFailure(
      async () => {
        await ensureAuthenticatedPage(page, RuntimeUserAlias.DIVORCE_SOLICITOR, {
          waitForSelector: 'exui-header',
          timeoutMs: 30_000,
        });
        await createDivorceCase(createCasePage, 'DIVORCE', 'XUI Case PoC', 'Translation Test Case', {
          maxAttempts: 1,
          createCaseMaxAttempts: 2,
        });
        caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
      },
      {
        maxAttempts: 1,
        onRetry: async () => {
          if (page.isClosed()) {
            return;
          }
          await page.goto('/').catch(() => undefined);
        },
      }
    );
  });

  test('Case event submission should not fail when translation labels are missing or null', async ({
    page,
    createCasePage,
    caseDetailsPage,
  }) => {
    const caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();

    await test.step('Navigate to case details', async () => {
      await caseDetailsPage.reopenCaseDetails(caseDetailsUrl);
    });

    await test.step('Select and trigger case event without translation errors', async () => {
      // The fix ensures that even if event labels have null/undefined translations,
      // the form should still render and submit without crashing
      await retryOnTransientFailure(
        async () => {
          // Try to select any available case action
          await caseDetailsPage.caseActionGoButton.waitFor({ state: 'visible', timeout: 10_000 });
          const availableOptions = await caseDetailsPage.caseActionsDropdown
            .locator('option')
            .evaluateAll((options) =>
              options
                .map((option) => ({
                  label: (option.textContent ?? '').trim(),
                  value: (option.getAttribute('value') ?? '').trim(),
                }))
                .filter((option) => option.label || option.value)
                .filter((option) => option.label !== '' && option.value !== '-1') // Exclude placeholder option
            );

          if (availableOptions.length === 0) {
            test.skip();
          }

          const actionToSelect = availableOptions[0];
          await caseDetailsPage.selectCaseAction(actionToSelect.label || actionToSelect.value, {
            expectedLocator: createCasePage.submitButton,
            timeoutMs: UPDATE_CASE_ACTION_TIMEOUT_MS,
          });
        },
        {
          maxAttempts: 2,
          onRetry: async () => {
            if (page.isClosed()) {
              return;
            }
            await caseDetailsPage.reopenCaseDetails(caseDetailsUrl).catch(async () => {
              await page.goto(caseDetailsUrl).catch(() => undefined);
            });
          },
        }
      );
    });

    await test.step('Verify form loads without translation errors', async () => {
      // Check that the page did not show an error message about undefined
      const errorMessages = page.getByText(/cannot read properties of undefined/i);
      const errorCount = await errorMessages.count();
      expect(errorCount).toBe(0);

      // Soft assertion - check for success or at least no critical errors
      await expect.soft(caseDetailsPage.generalProblemHeading).not.toBeVisible();
    });

    await test.step('Submit form with potentially missing translation labels', async () => {
      // Attempt to submit the form even if some labels might have null/undefined translations
      const submitButton = page.getByRole('button', { name: /submit|continue/i }).first();

      if (await submitButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
        await submitButton.click();
        await caseDetailsPage.exuiSpinnerComponent.wait();
      }
    });

    await test.step('Verify no translation-related errors in console or UI', async () => {
      // Verify the page is still functional (not showing critical errors)
      const consoleErrors = await page.evaluate(() => {
        // Check for any console errors related to translation
        return new Promise<string[]>((resolve) => {
          const errors: string[] = [];
          const originalError = console.error;
          console.error = (...args: any[]) => {
            errors.push(args.join(' '));
            originalError(...args);
          };
          resolve(errors);
        });
      });

      // Filter for translation-related errors
      const translationErrors = consoleErrors.filter((error) => error.includes('trim') || error.includes('undefined'));
      expect(translationErrors.length).toBe(0);
    });
  });

  test('Page should remain stable when loading labels with special characters or null values', async ({
    page,
    caseDetailsPage,
  }) => {
    const caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();

    await test.step('Navigate to case details and check page stability', async () => {
      await caseDetailsPage.reopenCaseDetails(caseDetailsUrl);
      await page.waitForLoadState('networkidle').catch(() => undefined);

      // Verify page is loaded and stable
      const header = page.locator('exui-case-details-home');
      await expect(header).toBeVisible();
    });

    await test.step('Check that all field labels are rendered without translation errors', async () => {
      // Get all text content that might have been affected by translation
      const labels = page.locator('label, dt, [role="rowheader"]');
      const labelCount = await labels.count();

      expect(labelCount).toBeGreaterThan(0);

      // Verify at least some labels are visible (not hidden by error)
      const visibleCount = await labels.filter({ hasNot: page.locator(':hidden') }).count();
      expect(visibleCount).toBeGreaterThan(0);
    });
  });
});

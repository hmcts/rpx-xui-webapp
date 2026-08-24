import type { Page } from '@playwright/test';
import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { createDivorceCase } from '../../utils/test-setup/journeys/divorceCaseJourneys';

type TranslationTestState = {
  nullTranslationResponses: number;
  lastTranslationResponseStatus: number;
  closed: boolean;
};

const translationTestStates = new WeakMap<Page, TranslationTestState>();

test.describe(
  'Verify case events handle null/undefined translation labels correctly',
  { tag: ['@e2e', '@e2e-translation'] },
  () => {
    test.describe.configure({ timeout: 240_000 });

    test.beforeEach(async ({ page, createCasePage, caseDetailsPage, identityLease }) => {
      const state: TranslationTestState = {
        nullTranslationResponses: 0,
        lastTranslationResponseStatus: 0,
        closed: false,
      };
      translationTestStates.set(page, state);
      const lease = await identityLease.acquire({ pool: 'DIVORCE_SOLICITOR' });
      await ensureAuthenticatedPage(page, lease.identity.userIdentifier, {
        waitForSelector: 'exui-header',
        timeoutMs: 30_000,
      });
      await createDivorceCase(createCasePage, 'DIVORCE', 'XUI Case PoC', 'Translation Test Case', {
        maxAttempts: 1,
        createCaseMaxAttempts: 2,
      });
      await page.route('**/api/translation/**', async (route) => {
        const response = await route.fetch();
        if (state.closed) {
          await route.fulfill({ response });
          return;
        }
        state.lastTranslationResponseStatus = response.status();
        const body = (await response.json()) as {
          translations?: Record<string, { translation?: string | null }>;
        };
        await route.fulfill({
          response,
          body: JSON.stringify({
            ...body,
            translations: {
              ...body.translations,
              'Update case': { translation: null },
              'Case details': { translation: null },
              History: { translation: null },
            },
          }),
        });
        state.nullTranslationResponses += 1;
      });
    });

    test.afterEach(async ({ page }) => {
      const state = translationTestStates.get(page);
      if (state) {
        state.closed = true;
      }
      await page.unrouteAll({ behavior: 'ignoreErrors' });
      translationTestStates.delete(page);
    });

    test('Case details remain stable when translation labels are missing or null', async ({
      page,
      createCasePage,
      caseDetailsPage,
    }) => {
      const state = translationTestStates.get(page);
      if (!state) {
        throw new Error('Translation test state was not initialised');
      }
      const caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();

      await test.step('Navigate to case details and verify no translation errors occurred', async () => {
        await page.goto(caseDetailsUrl);
        await createCasePage.exuiHeader.switchLanguage('Cymraeg', { waitForTranslatedContent: false });
        await expect.poll(() => state.nullTranslationResponses, { timeout: 20_000 }).toBeGreaterThan(0);
        await expect.poll(() => state.lastTranslationResponseStatus, { timeout: 20_000 }).toBe(200);
        await expect(page).toHaveURL(/\/cases\/case-details\//);
        await expect(caseDetailsPage.caseViewerTable).toBeVisible();
        const pageContent = await page.content();
        const translationErrors = /\[undefined\]|\[null\]|Cannot read.*translation|TypeError.*trim|undefined.*\.split/.test(
          pageContent
        );
        expect(translationErrors).toBe(false);
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

    test('Page remains stable when translation labels are null', async ({ page, createCasePage, caseDetailsPage }) => {
      const state = translationTestStates.get(page);
      if (!state) {
        throw new Error('Translation test state was not initialised');
      }
      const caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();

      await test.step('Navigate to case details and verify page stability', async () => {
        await page.goto(caseDetailsUrl);
        await createCasePage.exuiHeader.switchLanguage('Cymraeg', { waitForTranslatedContent: false });

        await expect.poll(() => state.nullTranslationResponses, { timeout: 20_000 }).toBeGreaterThan(0);
        await expect.poll(() => state.lastTranslationResponseStatus, { timeout: 20_000 }).toBe(200);
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

import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { setupCaseForJourney } from '../../utils/test-setup/caseSetup';
import { translationCaseData } from '../../testData/updateCase/translationCase';
import { welshTranslationsSmall } from '../../../integration/mocks/welshLanguage';

test.describe(
  'Verify case events handle null/undefined translation labels correctly',
  { tag: ['@e2e', '@e2e-translation', '@nightly'] },
  () => {
    let nullTranslationResponses = 0;

    test.describe.configure({ timeout: 240_000 });

    test.beforeEach(async ({ page, createCasePage, caseDetailsPage, identityLease }, testInfo) => {
      nullTranslationResponses = 0;
      const lease = await identityLease.acquire({ pool: 'DIVORCE_SOLICITOR' });
      await ensureAuthenticatedPage(page, lease.identity.userIdentifier, {
        waitForSelector: 'exui-header',
        timeoutMs: 30_000,
      });
      const setup = await setupCaseForJourney({
        scenario: 'null-translation-case-details',
        jurisdiction: 'DIVORCE',
        caseType: 'xuiTestJurisdiction',
        apiEventId: 'createCase',
        apiPayload: { fieldValues: translationCaseData },
        mode: 'api-required',
        page,
        createCasePage,
        caseDetailsPage,
        testInfo,
      });
      const caseResponse = await page.request.get(`data/internal/cases/${setup.caseNumber}`, {
        headers: {
          experimental: 'true',
          Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-case-view.v2+json;charset=UTF-8',
        },
      });
      expect(caseResponse.status(), 'The selected solicitor must be able to read the seeded case').toBe(200);
      const caseView = (await caseResponse.json()) as { tabs: Array<{ fields: Array<{ id: string; value: unknown }> }> };
      expect(
        Object.fromEntries(caseView.tabs.flatMap((tab) => tab.fields).map(({ id, value }) => [id, value])),
        'The translation prerequisite must persist its seeded data'
      ).toMatchObject(translationCaseData);
      await page.route('**api/translation/cy*', async (route) => {
        await route.fulfill({
          json: {
            ...welshTranslationsSmall,
            translations: {
              ...welshTranslationsSmall.translations,
              'Update case': { translation: null },
              'Case details': { translation: null },
              History: { translation: null },
            },
          },
        });
        nullTranslationResponses += 1;
      });
    });

    test.afterEach(async ({ page }) => {
      await page.unrouteAll({ behavior: 'ignoreErrors' });
    });

    test('Case details remain stable when translation labels are missing or null', async ({
      page,
      createCasePage,
      caseDetailsPage,
    }) => {
      const caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();

      await test.step('Navigate to case details and verify no translation errors occurred', async () => {
        await page.goto(caseDetailsUrl);
        const translationResponsePromise = page.waitForResponse((response) => response.url().includes('/api/translation/cy'));
        await createCasePage.exuiHeader.switchLanguage('Cymraeg', { waitForTranslatedContent: false });
        const translationResponse = await translationResponsePromise;

        expect(translationResponse.status()).toBe(200);
        await expect.poll(() => nullTranslationResponses, { timeout: 20_000 }).toBeGreaterThan(0);
        await expect(page).toHaveURL(/\/cases\/case-details\//);
        await expect(caseDetailsPage.container).toBeVisible();

        const pageContent = await page.content();
        const translationErrors = /\[undefined\]|\[null\]|Cannot read.*translation|TypeError.*trim|undefined.*\.split/.test(
          pageContent
        );
        expect(translationErrors).toBe(false);
      });

      await test.step('Verify labels render without translation errors', async () => {
        const errorPatterns = [
          /cannot read.*properties.*of.*undefined.*label/i,
          /cannot read.*properties.*of.*null.*label/i,
          /\[object.*error\].*translation/i,
        ];

        const pageContent = await page.content();
        for (const pattern of errorPatterns) {
          expect(pattern.test(pageContent)).toBe(false);
        }
        const labels = page.locator('label, dt, [role="rowheader"]');
        const labelCount = await labels.count();
        const hasTranslationCrash = /\[undefined\]|\[null\]|Cannot read.*undefined|Cannot read.*null/.test(pageContent);

        expect(hasTranslationCrash).toBe(false);
        expect(labelCount).toBeGreaterThan(0);
        await expect(labels.first()).not.toHaveText(/^\s*$/);
      });
    });
  }
);

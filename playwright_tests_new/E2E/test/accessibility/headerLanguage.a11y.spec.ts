import { expect, test } from '../../fixtures';
import { attachAccessibilityReachabilityFailureEvidence } from '../../utils/accessibility/screenReaderLikeAccessibility';
import {
  auditAccessibilityPage,
  isAccessibilityStrictMode,
  resolveAccessibilityEngines,
} from '../../utils/accessibility/accessibilityAudit';
import { setupAccessibilityHeader } from '../../utils/test-setup/accessibilityJourneyStates';

test.describe('Signed-in header accessibility — solicitor real session, mocked case data and Welsh translations @accessibility @a11y', () => {
  for (const language of ['English', 'Cymraeg', 'English after Cymraeg'] as const) {
    test(
      `case list header — ${language}`,
      {
        annotation: [
          { type: 'feature', description: 'signed-in header' },
          { type: 'page-state', description: `solicitor case list ${language}` },
        ],
      },
      async ({ page, caseListPage }, testInfo) => {
        test.skip(
          resolveAccessibilityEngines(['axe', 'wave-like', 'screen-reader']).length === 0,
          'No applicable accessibility engines selected.'
        );
        let lease: Awaited<ReturnType<typeof setupAccessibilityHeader>> | undefined;
        const locale = language === 'Cymraeg' ? 'cy' : 'en';
        const context = {
          scenarioId: `header-solicitor-${language.replaceAll(' ', '-').toLowerCase()}`,
          persona: 'solicitor',
          language: locale,
          authentication: 'real-session',
          dataMode: 'mocked-case-data-and-welsh-translations',
        };
        try {
          try {
            lease = await setupAccessibilityHeader(page, testInfo);
            await caseListPage.navigateTo();
            if (language !== 'English') await caseListPage.exuiHeader.switchLanguage('Cymraeg');
            if (language === 'English after Cymraeg') await caseListPage.exuiHeader.switchLanguage('English');
            await caseListPage.exuiHeader.waitForRenderedLanguageState(locale === 'cy' ? 'Cymraeg' : 'English');
            await expect(page).toHaveURL(/\/cases(?:$|[/?#])/);
            await expect(caseListPage.container).toBeVisible();
            await expect(caseListPage.exuiHeader.header).toBeVisible();
          } catch (error) {
            await attachAccessibilityReachabilityFailureEvidence(page, testInfo, {
              feature: 'signed-in header',
              pageState: `solicitor case list ${language}`,
              strict: isAccessibilityStrictMode(),
              error,
              context,
            });
            throw error;
          }
          await auditAccessibilityPage(page, testInfo, {
            feature: 'signed-in header',
            pageState: `solicitor case list ${language}`,
            defaultEngines: ['axe', 'wave-like', 'screen-reader'],
            context,
            checks: [
              {
                name: 'EXUI-5048 document language matches selected language',
                run: async () => {
                  await expect(page.locator('html')).toHaveAttribute('lang', locale);
                },
              },
            ],
          });
        } finally {
          await lease?.release();
        }
      }
    );
  }
});

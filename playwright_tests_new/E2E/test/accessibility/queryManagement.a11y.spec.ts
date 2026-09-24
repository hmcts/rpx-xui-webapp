import { expect, test } from '../../fixtures';
import { openSolicitorRaiseQueryFromNextStep } from '../../../integration/helpers';
import { QUERY_MANAGEMENT_CASE_REFERENCE } from '../../../integration/mocks/queryManagement.mock';
import { attachAccessibilityReachabilityFailureEvidence } from '../../utils/accessibility/screenReaderLikeAccessibility';
import {
  auditAccessibilityPage,
  isAccessibilityStrictMode,
  resolveAccessibilityEngines,
} from '../../utils/accessibility/accessibilityAudit';
import { reachQueryAccessibilityState, type QueryAccessibilityState } from '../../utils/test-setup/accessibilityJourneyStates';

const states: QueryAccessibilityState[] = [
  'options',
  'option validation',
  'details',
  'details validation',
  'review',
  'confirmation',
];

test.describe('Query accessibility — solicitor real session, mocked backend @accessibility @a11y', () => {
  for (const state of states) {
    test(`raise query — ${state}`, async ({ page, caseDetailsPage, queryManagementPage }, testInfo) => {
      test.skip(
        resolveAccessibilityEngines(['axe', 'wave-like', 'screen-reader']).length === 0,
        'No applicable accessibility engines selected.'
      );
      const context = {
        scenarioId: `query-raise-${state.replaceAll(' ', '-')}`,
        persona: 'solicitor',
        language: 'en',
        authentication: 'real-session',
        dataMode: 'mocked-backend',
      };
      try {
        await openSolicitorRaiseQueryFromNextStep(page, caseDetailsPage, queryManagementPage);
        await reachQueryAccessibilityState(queryManagementPage, state);

        await expect(page).toHaveURL(new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}(?:$|[/?#])`));
        const headings = {
          options: queryManagementPage.raiseANewQueryHeading,
          'option validation': queryManagementPage.raiseANewQueryHeading,
          details: queryManagementPage.enterQueryDetailsHeading,
          'details validation': queryManagementPage.enterQueryDetailsHeading,
          review: queryManagementPage.reviewQueryDetailsHeading,
          confirmation: queryManagementPage.querySubmittedHeading,
        };
        await expect(headings[state]).toBeVisible();
        if (state === 'option validation' || state === 'details validation') {
          await expect(queryManagementPage.errorSummaryTitle).toHaveText('There is a problem');
          await expect(queryManagementPage.validationErrors).toContainText(
            state === 'option validation'
              ? ['Select an option']
              : ['Enter a query subject', 'Enter query details', 'Select whether the query is hearing related or not']
          );
        }
      } catch (error) {
        await attachAccessibilityReachabilityFailureEvidence(page, testInfo, {
          feature: 'query management',
          pageState: `solicitor raise query ${state}`,
          strict: isAccessibilityStrictMode(),
          error,
          context,
        });
        throw error;
      }
      await auditAccessibilityPage(page, testInfo, {
        feature: 'query management',
        pageState: `solicitor raise query ${state}`,
        defaultEngines: ['axe', 'wave-like', 'screen-reader'],
        context,
        checks:
          state === 'details validation'
            ? [
                {
                  name: 'Keyboard activation of query subject error focuses its input',
                  run: async () => {
                    await queryManagementPage.errorSummary.focus();
                    await page.keyboard.press('Tab');
                    await expect(queryManagementPage.validationErrors.first()).toBeFocused();
                    await page.keyboard.press('Enter');
                    await expect(queryManagementPage.querySubjectInput).toBeFocused();
                  },
                },
              ]
            : [],
      });
    });
  }
});

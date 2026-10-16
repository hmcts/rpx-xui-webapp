import { expect, test } from '../../fixtures';
import {
  auditAccessibilityPage,
  isAccessibilityStrictMode,
  resolveAccessibilityEngines,
} from '../../utils/accessibility/accessibilityAudit';
import { attachAccessibilityReachabilityFailureEvidence } from '../../utils/accessibility/screenReaderLikeAccessibility';
import { accessTaskAccessibilityStates } from '../../utils/test-setup/accessibilityAccessTaskStates';
import { caseJourneyAccessibilityStates } from '../../utils/test-setup/accessibilityCaseJourneyStates';
import { hearingBookingAccessibilityStates } from '../../utils/test-setup/accessibilityHearingBookingStates';

const states = [...accessTaskAccessibilityStates, ...caseJourneyAccessibilityStates, ...hearingBookingAccessibilityStates];

test.describe('Expanded accessibility journeys — mocked identities and backend @accessibility @a11y', () => {
  for (const state of states) {
    test(
      `${state.feature} — ${state.title}`,
      {
        annotation: [
          { type: 'feature', description: state.feature },
          { type: 'page-state', description: state.title },
        ],
      },
      async (
        {
          page,
          accessRequestPage,
          taskListPage,
          caseDetailsPage,
          createCasePage,
          caseFileViewPage,
          hearingsTabPage,
          bookingUiPage,
        },
        testInfo
      ) => {
        test.skip(
          resolveAccessibilityEngines(['axe', 'wave-like', 'screen-reader']).length === 0,
          'No applicable engines selected.'
        );
        const context = {
          scenarioId: `${state.feature}-${state.title}`.replace(/[^a-z0-9]+/gi, '-').toLowerCase(),
          persona: state.persona,
          language: 'en',
          authentication: 'mocked-session',
          dataMode: 'mocked-backend',
        };
        try {
          const reached = await state.setup(
            {
              page,
              accessRequestPage,
              taskListPage,
              caseDetailsPage,
              createCasePage,
              caseFileViewPage,
              hearingsTabPage,
              bookingUiPage,
            },
            testInfo
          );
          await expect(page).toHaveURL(reached.url);
          expect(reached.ready.length, 'Every scan must prove a distinct screen or state').toBeGreaterThan(0);
          for (const marker of reached.ready) await expect(marker).toBeVisible();
        } catch (error) {
          await attachAccessibilityReachabilityFailureEvidence(page, testInfo, {
            feature: state.feature,
            pageState: state.title,
            context,
            error,
            strict: isAccessibilityStrictMode(),
          });
          throw error;
        }
        await auditAccessibilityPage(page, testInfo, {
          defaultEngines: ['axe', 'wave-like', 'screen-reader'],
          feature: state.feature,
          pageState: state.title,
          context,
        });
      }
    );
  }
});

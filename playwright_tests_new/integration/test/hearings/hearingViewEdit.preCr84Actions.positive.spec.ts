import { expect, test } from '../../../E2E/fixtures';
import { HEARINGS_LISTED_HEARING_ID, LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';
import { HEARING_MANAGER_CR84_OFF_USER, hearingManagerRoles, openHearingsTab } from '../../helpers';

test.describe(
  `Hearings pre-CR84 actions as ${HEARING_MANAGER_CR84_OFF_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('shows View or edit action and routes to pre-CR84 edit summary', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
      hearingViewEditSummaryPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [LISTED_HEARING_SCENARIO],
          caseConfig: { jurisdictionId: 'SSCS', caseTypeId: 'Benefit' },
          enabledCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
          amendmentCaseVariations: [{ jurisdiction: 'CIVIL', caseType: 'CIVIL' }],
        },
      });

      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID, 'view-or-edit');
      await expect(hearingsTabPage.viewOrEditButton(HEARINGS_LISTED_HEARING_ID)).toBeVisible();
      await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toHaveCount(0);

      await hearingsTabPage.openViewOrEdit(HEARINGS_LISTED_HEARING_ID);
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-view-edit-summary$/);
      await hearingViewEditSummaryPage.waitForReady();
    });
  }
);

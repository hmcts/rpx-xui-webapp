import { expect, test } from '../../../E2E/fixtures';
import { createRequire } from 'node:module';
import { HEARINGS_LISTED_HEARING_ID, LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';
import { HEARING_MANAGER_CR84_ON_USER, hearingManagerRoles, openHearingsTab } from '../../helpers';

const require = createRequire(import.meta.url);
const SHV_SCR_1 = require('../../mocks/fixtures/hearings/mock_SHV_SCR_1.json');

test.describe(
  `Hearings semi/automatic update labels as ${HEARING_MANAGER_CR84_ON_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('shows action-needed labels in edit summary before manual acceptance', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
      hearingViewSummaryPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_ON_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [LISTED_HEARING_SCENARIO],
          summaryHearing: LISTED_HEARING_SCENARIO,
          hearingsApiOverrides: {
            loadServiceHearingValues: {
              body: SHV_SCR_1,
            },
          },
        },
      });

      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);
      await hearingsTabPage.openViewDetails(HEARINGS_LISTED_HEARING_ID);
      await hearingViewSummaryPage.waitForReady();
      await hearingViewSummaryPage.editHearingButton.click();

      const editSummary = page.locator('exui-hearing-edit-summary');
      await expect(editSummary).toBeVisible();
      await expect(editSummary.getByText('ACTION NEEDED').first()).toBeVisible();
    });
  }
);

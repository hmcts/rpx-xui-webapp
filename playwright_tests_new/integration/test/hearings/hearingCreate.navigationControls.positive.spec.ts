import { expect, test } from '../../../E2E/fixtures';
import { LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';
import {
  continueHearingsFlow,
  goBackInHearingsFlow,
  HEARING_MANAGER_CR84_OFF_USER,
  hearingManagerRoles,
  openHearingsTab,
} from '../../helpers';

test.describe(
  `Hearings create navigation controls as ${HEARING_MANAGER_CR84_OFF_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('supports back-link navigation between hearing workflow and hearings tab', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [LISTED_HEARING_SCENARIO],
        },
      });

      await hearingsTabPage.openRequestHearing();
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-requirements$/);
      await expect(page.getByRole('heading', { name: /hearing requirements/i })).toBeVisible();

      await continueHearingsFlow(page);
      await expect(page.getByRole('heading', { name: /do you require any additional facilities\?/i })).toBeVisible();

      await goBackInHearingsFlow(page);
      await expect(page.getByRole('heading', { name: /hearing requirements/i })).toBeVisible();

      await goBackInHearingsFlow(page);
      await expect(page).toHaveURL(/\/cases\/case-details\/.*#Hearings$/);
      await expect(page.getByText('Current and upcoming')).toBeVisible();
    });
  }
);

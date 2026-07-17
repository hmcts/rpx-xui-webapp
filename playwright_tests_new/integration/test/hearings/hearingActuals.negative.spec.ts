import { expect, test } from '../../../E2E/fixtures';
import type { HearingScenario } from '../../mocks/hearings.mock';
import { HEARING_MANAGER_CR84_OFF_USER, hearingManagerRoles, openHearingsTab } from '../../helpers';

const awaitingActualsScenario: HearingScenario = {
  hearingId: '1705614528110',
  hmcStatus: 'AWAITING_ACTUALS',
  hearingType: 'ABA5-ACTUALS',
};

test.describe(
  `Hearings actuals journey as ${HEARING_MANAGER_CR84_OFF_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('shows server error and does not navigate to confirmation when hearing details submit fails', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [awaitingActualsScenario],
          hearingsApiOverrides: {
            hearingActualsCompletion: {
              status: 500,
              body: { message: 'hearing-actuals-completion-failed' },
            },
          },
        },
      });

      await hearingsTabPage.waitForReady(awaitingActualsScenario.hearingId, 'add-or-edit');
      await hearingsTabPage.addOrEditButton(awaitingActualsScenario.hearingId).click();

      await expect(page).toHaveURL(
        new RegExp(`/hearings/actuals/${awaitingActualsScenario.hearingId}/hearing-actual-add-edit-summary$`)
      );
      await page.getByRole('button', { name: /^continue$/i }).click();
      await expect(page).toHaveURL(
        new RegExp(`/hearings/actuals/${awaitingActualsScenario.hearingId}/hearing-actual-edit-summary$`)
      );

      const failedCompletionResponse = page.waitForResponse(
        (response) =>
          response.url().includes('/api/hearings/hearingActualsCompletion/') &&
          response.request().method() === 'POST' &&
          response.status() === 500
      );
      await page.getByRole('button', { name: /submit hearing details/i }).click();
      await failedCompletionResponse;

      await expect(page).toHaveURL(
        new RegExp(`/hearings/actuals/${awaitingActualsScenario.hearingId}/hearing-actual-edit-summary$`)
      );
      await expect(page.getByText('There is a problem')).toBeVisible();
      await expect(page).not.toHaveURL(
        new RegExp(`/hearings/actuals/${awaitingActualsScenario.hearingId}/hearing-actuals-confirmation$`)
      );
    });
  }
);

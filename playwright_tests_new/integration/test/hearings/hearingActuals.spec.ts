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
    test('opens add or edit actuals and submits hearing details', async ({ page, caseDetailsPage, hearingsTabPage }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [awaitingActualsScenario],
        },
      });

      await hearingsTabPage.waitForReady(awaitingActualsScenario.hearingId, 'add-or-edit');
      await hearingsTabPage.addOrEditButton(awaitingActualsScenario.hearingId).click();

      await expect(page).toHaveURL(
        new RegExp(`/hearings/actuals/${awaitingActualsScenario.hearingId}/hearing-actual-add-edit-summary$`)
      );
      await expect(page.getByRole('heading', { name: /hearing details/i })).toBeVisible();

      await page.getByRole('button', { name: /^continue$/i }).click();
      await expect(page).toHaveURL(
        new RegExp(`/hearings/actuals/${awaitingActualsScenario.hearingId}/hearing-actual-edit-summary$`)
      );
      await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();

      const completionRequest = page.waitForRequest(
        (request) => request.url().includes('/api/hearings/hearingActualsCompletion/') && request.method() === 'POST'
      );
      await page.getByRole('button', { name: /submit hearing details/i }).click();
      await completionRequest;

      await expect(page).toHaveURL(
        new RegExp(`/hearings/actuals/${awaitingActualsScenario.hearingId}/hearing-actuals-confirmation$`)
      );
      await expect(page.getByRole('heading', { name: /you have successfully submitted the hearing details\./i })).toBeVisible();
    });
  }
);

import { expect, test } from '../../../E2E/fixtures';
import type { HearingScenario } from '../../mocks/hearings.mock';
import { HEARING_MANAGER_CR84_OFF_USER, hearingManagerRoles, openHearingsTab } from '../../helpers';

const awaitingActualsScenario: HearingScenario = {
  hearingId: '1705614528110',
  hmcStatus: 'AWAITING_ACTUALS',
  hearingType: 'ABA5-ACTUALS',
};
const updatedHearingStage = 'final';

test.describe(
  `Hearings actuals journey as ${HEARING_MANAGER_CR84_OFF_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('updates hearing stage and persists edited actuals payload', async ({ page, caseDetailsPage, hearingsTabPage }) => {
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

      await page.locator('a[href*="hearing-actual-add-edit-summary"][href*="hearingStageResult"]').first().click();
      await expect(page).toHaveURL(
        new RegExp(
          `/hearings/actuals/${awaitingActualsScenario.hearingId}/hearing-actual-add-edit-summary(?:#hearingStageResult)?$`
        )
      );

      await page.locator('#hearing-stage-result-update-link').click();
      await expect(page.getByRole('heading', { name: /hearing stage and result/i })).toBeVisible();

      const hearingActualsUpdateRequest = page.waitForRequest(
        (request) => request.url().includes('/api/hearings/hearingActuals?') && request.method() === 'PUT'
      );
      await page.locator('#hearing-stage').selectOption({ label: 'Final' });
      await page.locator('#completed').check();
      await page.getByRole('button', { name: /^save and continue$/i }).click({ noWaitAfter: true });

      const updateRequest = await hearingActualsUpdateRequest;
      expect(updateRequest.postDataJSON()).toEqual(
        expect.objectContaining({
          hearingOutcome: expect.objectContaining({
            hearingType: updatedHearingStage,
            hearingResult: 'COMPLETED',
          }),
        })
      );

      await expect(page).toHaveURL(
        new RegExp(`/hearings/actuals/${awaitingActualsScenario.hearingId}/hearing-actual-add-edit-summary$`)
      );
      await expect(page.getByText(/^final$/i)).toBeVisible();
      await expect(page.getByText(/^completed$/i)).toBeVisible();

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

import { expect, test } from '../../../E2E/fixtures';
import { buildHearingActualsMock, type HearingScenario } from '../../mocks/hearings.mock';
import { HEARING_MANAGER_CR84_OFF_USER, hearingManagerRoles, openHearingsTab } from '../../helpers';

const awaitingActualsScenario: HearingScenario = {
  hearingId: '1705614528110',
  hmcStatus: 'AWAITING_ACTUALS',
  hearingType: 'ABA5-ACTUALS',
};
const adjournedScenario: HearingScenario = {
  hearingId: '1705614528114',
  hmcStatus: 'ADJOURNED',
  hearingType: 'ABA5-ADJOURNED',
};
const updatedHearingStage = 'final';

function buildAdjournedActualsSummary() {
  const actuals = buildHearingActualsMock() as {
    hearingActuals: {
      hearingOutcome: {
        hearingResult: string;
        hearingResultDate: string;
        hearingResultReasonType: string;
      };
    };
  };

  actuals.hearingActuals.hearingOutcome.hearingResult = 'ADJOURNED';
  actuals.hearingActuals.hearingOutcome.hearingResultDate = '2026-03-18';
  actuals.hearingActuals.hearingOutcome.hearingResultReasonType = 'unable';

  return actuals;
}

test.describe(
  `Hearings actuals journey as ${HEARING_MANAGER_CR84_OFF_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('loads adjourned hearing details without showing the generic error state', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [adjournedScenario],
          summaryHearing: adjournedScenario,
          hearingsApiOverrides: {
            hearingActualsGet: {
              body: buildAdjournedActualsSummary(),
            },
          },
        },
      });

      const actualsRequest = page.waitForRequest(
        (request) =>
          request.method() === 'GET' && request.url().includes(`/api/hearings/hearingActuals/${adjournedScenario.hearingId}`),
        { timeout: 10_000 }
      );
      await hearingsTabPage.openViewDetails(adjournedScenario.hearingId);
      await actualsRequest;

      await expect(page).toHaveURL(new RegExp(`/hearings/view/hearing-adjourned-summary/${adjournedScenario.hearingId}$`));
      await expect(page.locator('exui-hearing-adjourned-summary')).toBeVisible();
      await expect(page.getByRole('heading', { name: /hearing details/i })).toBeVisible();
      await expect(
        page.getByText('There was a system error and your request could not be processed. Please try again.', {
          exact: true,
        })
      ).toHaveCount(0);
    });

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
      const submittedCompletionRequest = await completionRequest;
      const submittedCompletionUrl = new URL(submittedCompletionRequest.url());
      expect(submittedCompletionUrl.pathname).toContain(
        `/api/hearings/hearingActualsCompletion/${awaitingActualsScenario.hearingId}`
      );
      expect(submittedCompletionUrl.searchParams.get('caseRef')).toBeTruthy();
      expect(submittedCompletionRequest.postData()).toBeNull();

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
      const submittedCompletionRequest = await completionRequest;
      const submittedCompletionUrl = new URL(submittedCompletionRequest.url());
      expect(submittedCompletionUrl.pathname).toContain(
        `/api/hearings/hearingActualsCompletion/${awaitingActualsScenario.hearingId}`
      );
      expect(submittedCompletionUrl.searchParams.get('caseRef')).toBeTruthy();
      expect(submittedCompletionRequest.postData()).toBeNull();

      await expect(page).toHaveURL(
        new RegExp(`/hearings/actuals/${awaitingActualsScenario.hearingId}/hearing-actuals-confirmation$`)
      );
      await expect(page.getByRole('heading', { name: /you have successfully submitted the hearing details\./i })).toBeVisible();
    });
  }
);

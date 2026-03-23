import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { HEARING_MANAGER_CR84_OFF_USER, hearingManagerRoles, openHearingsTab } from '../../helpers';
import { buildHearingActualsMock, type HearingScenario } from '../../mocks/hearings.mock';

const CANCELLATION_REQUESTED_SCENARIO: HearingScenario = {
  hearingId: '1705614528109',
  hmcStatus: 'CANCELLATION_REQUESTED',
  hearingType: 'ABA5-CANCELLATION-REQUESTED',
};

const AWAITING_ACTUALS_SCENARIO: HearingScenario = {
  hearingId: '1705614528110',
  hmcStatus: 'AWAITING_ACTUALS',
  hearingType: 'ABA5-ACTUALS',
};

const REQUEST_FAILED_SCENARIO: HearingScenario = {
  hearingId: '1705614528111',
  hmcStatus: 'EXCEPTION',
  hearingType: 'ABA5-FAILED',
};

const CANCELLED_SCENARIO: HearingScenario = {
  hearingId: '1705614528112',
  hmcStatus: 'CANCELLED',
  hearingType: 'ABA5-CANCELLED',
};

const COMPLETED_SCENARIO: HearingScenario = {
  hearingId: '1705614528113',
  hmcStatus: 'COMPLETED',
  hearingType: 'ABA5-COMPLETED',
};

const ADJOURNED_SCENARIO: HearingScenario = {
  hearingId: '1705614528114',
  hmcStatus: 'ADJOURNED',
  hearingType: 'ABA5-ADJOURNED',
};

function sectionTable(page: Page, heading: string) {
  return page.locator('table.govuk-table').filter({
    has: page.getByRole('columnheader', { name: heading, exact: true }),
  });
}

function summaryRow(page: Page, label: string) {
  return page.locator('.govuk-summary-list__row').filter({
    has: page.locator('.govuk-summary-list__key', { hasText: label }),
  });
}

function buildActualsSummary(result: 'COMPLETED' | 'ADJOURNED') {
  const actuals = buildHearingActualsMock() as {
    hearingActuals: {
      hearingOutcome: {
        hearingResult: string;
        hearingResultDate: string;
        hearingResultReasonType: string;
      };
    };
  };

  actuals.hearingActuals.hearingOutcome.hearingResult = result;
  actuals.hearingActuals.hearingOutcome.hearingResultDate = '2026-03-18';
  if (result === 'ADJOURNED') {
    actuals.hearingActuals.hearingOutcome.hearingResultReasonType = 'unable';
  }

  return actuals;
}

test.describe(
  `Hearings lifecycle status routing as ${HEARING_MANAGER_CR84_OFF_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('renders upcoming and past-or-cancelled sections with the expected lifecycle statuses and actions', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [
            CANCELLATION_REQUESTED_SCENARIO,
            AWAITING_ACTUALS_SCENARIO,
            REQUEST_FAILED_SCENARIO,
            CANCELLED_SCENARIO,
            COMPLETED_SCENARIO,
            ADJOURNED_SCENARIO,
          ],
        },
      });

      const currentAndUpcoming = sectionTable(page, 'Current and upcoming');
      const pastOrCancelled = sectionTable(page, 'Past or cancelled');

      await expect(hearingsTabPage.currentAndUpcomingHeading('Current and upcoming')).toBeVisible();
      await expect(hearingsTabPage.pastOrCancelledHeading()).toBeVisible();

      await expect(currentAndUpcoming.locator(`#link-view-details-${CANCELLATION_REQUESTED_SCENARIO.hearingId}`)).toBeVisible();
      await expect(
        currentAndUpcoming
          .locator('tr')
          .filter({ has: page.locator(`#link-view-details-${CANCELLATION_REQUESTED_SCENARIO.hearingId}`) })
      ).toContainText('CANCELLATION REQUESTED');

      await expect(currentAndUpcoming.locator(`#link-add-or-edit-${AWAITING_ACTUALS_SCENARIO.hearingId}`)).toBeVisible();
      await expect(
        currentAndUpcoming.locator('tr').filter({ has: page.locator(`#link-add-or-edit-${AWAITING_ACTUALS_SCENARIO.hearingId}`) })
      ).toContainText('AWAITING HEARING DETAILS');

      await expect(currentAndUpcoming.locator(`#link-view-details-${REQUEST_FAILED_SCENARIO.hearingId}`)).toBeVisible();
      await expect(
        currentAndUpcoming.locator('tr').filter({ has: page.locator(`#link-view-details-${REQUEST_FAILED_SCENARIO.hearingId}`) })
      ).toContainText('REQUEST FAILURE');

      await expect(pastOrCancelled.locator(`#link-view-details-${CANCELLED_SCENARIO.hearingId}`)).toBeVisible();
      await expect(
        pastOrCancelled.locator('tr').filter({ has: page.locator(`#link-view-details-${CANCELLED_SCENARIO.hearingId}`) })
      ).toContainText('CANCELLED');

      await expect(pastOrCancelled.locator(`#link-view-details-${COMPLETED_SCENARIO.hearingId}`)).toBeVisible();
      await expect(
        pastOrCancelled.locator('tr').filter({ has: page.locator(`#link-view-details-${COMPLETED_SCENARIO.hearingId}`) })
      ).toContainText('COMPLETED');

      await expect(pastOrCancelled.locator(`#link-view-details-${ADJOURNED_SCENARIO.hearingId}`)).toBeVisible();
      await expect(
        pastOrCancelled.locator('tr').filter({ has: page.locator(`#link-view-details-${ADJOURNED_SCENARIO.hearingId}`) })
      ).toContainText('ADJOURNED');
    });

    test('routes cancellation requested hearings to the cancellation summary', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [CANCELLATION_REQUESTED_SCENARIO],
          summaryHearing: CANCELLATION_REQUESTED_SCENARIO,
        },
      });

      await hearingsTabPage.openViewDetails(CANCELLATION_REQUESTED_SCENARIO.hearingId);

      await expect(page).toHaveURL(/\/hearings\/view\/hearing-cancellation-summary$/);
      await expect(page.getByRole('heading', { name: 'Cancellation requested', exact: true })).toBeVisible();
      await expect(summaryRow(page, 'Case number')).toBeVisible();
      await expect(summaryRow(page, 'Date requested')).toBeVisible();
      await expect(summaryRow(page, 'Reason for cancellation')).toBeVisible();
    });

    test('routes request-failure hearings to the failed summary', async ({ page, caseDetailsPage, hearingsTabPage }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [REQUEST_FAILED_SCENARIO],
          summaryHearing: REQUEST_FAILED_SCENARIO,
        },
      });

      await hearingsTabPage.openViewDetails(REQUEST_FAILED_SCENARIO.hearingId);

      await expect(page).toHaveURL(
        new RegExp(`/hearings/view/hearing-request-failed-summary/${REQUEST_FAILED_SCENARIO.hearingId}$`)
      );
      await expect(page.getByRole('heading', { name: 'Details of error', exact: true })).toBeVisible();
      await expect(summaryRow(page, 'Hearing Id')).toContainText(REQUEST_FAILED_SCENARIO.hearingId);
      await expect(summaryRow(page, 'Time of error')).toBeVisible();
    });

    test('routes cancelled hearings to the cancelled summary', async ({ page, caseDetailsPage, hearingsTabPage }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [CANCELLED_SCENARIO],
          summaryHearing: CANCELLED_SCENARIO,
        },
      });

      await hearingsTabPage.openViewDetails(CANCELLED_SCENARIO.hearingId);

      await expect(page).toHaveURL(new RegExp(`/hearings/view/hearing-cancelled-summary/${CANCELLED_SCENARIO.hearingId}$`));
      await expect(page.getByRole('heading', { name: 'Details of cancelled hearing', exact: true })).toBeVisible();
      await expect(summaryRow(page, 'Hearing Id')).toContainText(CANCELLED_SCENARIO.hearingId);
      await expect(summaryRow(page, 'Reason for cancellation')).toBeVisible();
    });

    for (const terminalStatusScenario of [
      {
        scenario: COMPLETED_SCENARIO,
        expectedUrl: `/hearings/view/hearing-completed-summary/${COMPLETED_SCENARIO.hearingId}`,
        actualsBody: buildActualsSummary('COMPLETED'),
        expectedResult: 'COMPLETED',
      },
      {
        scenario: ADJOURNED_SCENARIO,
        expectedUrl: `/hearings/view/hearing-adjourned-summary/${ADJOURNED_SCENARIO.hearingId}`,
        actualsBody: buildActualsSummary('ADJOURNED'),
        expectedResult: 'ADJOURNED',
      },
    ]) {
      test(`routes ${terminalStatusScenario.scenario.hmcStatus} hearings to the correct actuals summary`, async ({
        page,
        caseDetailsPage,
        hearingsTabPage,
      }) => {
        await openHearingsTab(page, caseDetailsPage, {
          userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
          routeConfig: {
            userRoles: hearingManagerRoles,
            hearings: [terminalStatusScenario.scenario],
            summaryHearing: terminalStatusScenario.scenario,
            hearingsApiOverrides: {
              hearingActualsGet: {
                body: terminalStatusScenario.actualsBody,
              },
            },
          },
        });

        await hearingsTabPage.openViewDetails(terminalStatusScenario.scenario.hearingId);

        await expect(page).toHaveURL(new RegExp(`${terminalStatusScenario.expectedUrl}$`));
        await expect(page.getByRole('heading', { name: /hearing details/i })).toBeVisible();
        await expect(summaryRow(page, 'Hearing Id')).toContainText(terminalStatusScenario.scenario.hearingId);
        await expect(summaryRow(page, 'Hearing result')).toContainText(terminalStatusScenario.expectedResult);
      });
    }
  }
);

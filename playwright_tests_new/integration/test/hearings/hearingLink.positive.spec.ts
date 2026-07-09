import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import {
  buildCaseLinkingReasonCodesMock,
  CASE_LINKING_REASON_CODE,
  CASE_LINKING_SECONDARY_REASON_CODE,
} from '../../mocks/caseLinking.mock';
import { LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';
import {
  continueHearingsFlow,
  hearingManagerRoles,
  openHearingsTabForScenario,
  selectOrderedLinkedHearings,
} from '../../helpers';
import type { HearingsTabPage } from '../../../E2E/page-objects/pages/exui/hearingsTab.po';
import type { CaseDetailsPage } from '../../../E2E/page-objects/pages/exui/caseDetails.po';
import { loadSessionCookies } from '../../../common/sessionCapture';

const linkedCasesWithHearingReason = [
  {
    caseReference: '1611573453599537',
    caseName: 'redacted redacted - appellantnamefordisplay',
    reasonsForLink: [CASE_LINKING_SECONDARY_REASON_CODE, CASE_LINKING_REASON_CODE],
  },
];

const linkedCasesWithHearingsForOrdering = [
  {
    caseRef: '4652724902696213',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Linked for a hearing'],
    caseHearings: [
      {
        hearingID: 'h100001',
        hearingType: 'Substantive',
        hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
        lastResponseReceivedDateTime: '',
        exuiSectionStatus: 'UPCOMING',
        exuiDisplayStatus: 'AWAITING_LISTING',
        hmcStatus: 'HEARING_REQUESTED',
        responseVersion: 'rv1',
        hearingListingStatus: 'UPDATE_REQUESTED',
        listAssistCaseStatus: '',
        hearingIsLinkedFlag: true,
        hearingGroupRequestId: null,
        hearingDaySchedule: [],
        isSelected: true,
      },
    ],
  },
  {
    caseRef: '5283819672542864',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Linked for a hearing', 'Progressed as part of lead case'],
    caseHearings: [
      {
        hearingID: 'h100010',
        hearingType: 'Direction Hearings',
        hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
        lastResponseReceivedDateTime: '',
        exuiSectionStatus: 'UPCOMING',
        exuiDisplayStatus: 'AWAITING_LISTING',
        hmcStatus: 'AWAITING_LISTING',
        responseVersion: 'rv1',
        hearingListingStatus: 'UPDATE_REQUESTED',
        listAssistCaseStatus: '',
        hearingIsLinkedFlag: true,
        hearingGroupRequestId: null,
        hearingDaySchedule: [],
        isSelected: true,
      },
    ],
  },
  {
    caseRef: '8254902572336147',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Familial', 'Guardian', 'Linked for a hearing'],
    caseHearings: [
      {
        hearingID: 'h100012',
        hearingType: 'Chambers Outcome',
        hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
        lastResponseReceivedDateTime: '',
        exuiSectionStatus: 'UPCOMING',
        exuiDisplayStatus: 'AWAITING_LISTING',
        hmcStatus: 'AWAITING_LISTING',
        responseVersion: 'rv1',
        hearingListingStatus: 'UPDATE_REQUESTED',
        listAssistCaseStatus: '',
        hearingIsLinkedFlag: true,
        hearingGroupRequestId: null,
        hearingDaySchedule: [],
        isSelected: true,
      },
    ],
  },
];

const judgeTypesForHearingLinkJourney = [
  {
    key: 'Tribunal',
    value_en: 'Tribunal Judge',
    value_cy: 'Tribunal Judge',
    hint_text_en: '',
    hint_text_cy: '',
  },
];

const hearingLinkSessionCookies = loadSessionCookies({
  userIdentifier: 'HEARING_LINK_LOCAL',
  email: 'hearing-link-local@example.com',
  password: 'unused',
  sessionKey: 'hearing-link-local',
} as const).cookies;

async function navigateToHearingLinkPage(page: Page, hearingsTabPage: HearingsTabPage): Promise<void> {
  await expect(hearingsTabPage.requestHearingButton).toBeVisible({ timeout: 60_000 });
  await hearingsTabPage.openRequestHearing();
  await expect(page).toHaveURL(/\/hearings\/request\/hearing-requirements$/);
  await expect(page.getByRole('heading', { name: /hearing requirements/i })).toBeVisible();

  await continueHearingsFlow(page);
  await expect(page).toHaveURL(/\/hearings\/request\/hearing-facilities$/);

  await continueHearingsFlow(page);
  await expect(page).toHaveURL(/\/hearings\/request\/hearing-stage$/);

  await continueHearingsFlow(page);
  await expect(page).toHaveURL(/\/hearings\/request\/hearing-attendance$/);
  await page.locator('#paperHearingYes').check();

  await continueHearingsFlow(page);
  await expect(page).toHaveURL(/\/hearings\/request\/hearing-venue$/);
  await expect(page.getByRole('heading', { name: /what are the hearing venue details\?/i })).toBeVisible();
  await expect(page.locator('.location-selection')).toHaveCount(1);

  await continueHearingsFlow(page);
  await expect(page).toHaveURL(/\/hearings\/request\/hearing-welsh$/);
  await expect(page.getByRole('heading', { name: /does this hearing need to be in welsh\?/i })).toBeVisible();

  await continueHearingsFlow(page);
  await expect(page).toHaveURL(/\/hearings\/request\/hearing-judge$/);
  await expect(page.getByRole('heading', { name: /do you want a specific judge\?/i })).toBeVisible();
  await expect(page.locator('#noSpecificJudge')).toBeVisible();
  await page.locator('#noSpecificJudge').check();
  const judgeTypeCheckbox = page.locator('#judgeTypes input[type="checkbox"]').first();
  await expect(judgeTypeCheckbox).toBeVisible();
  await judgeTypeCheckbox.check();

  await continueHearingsFlow(page);
  await expect(page).toHaveURL(/\/hearings\/request\/hearing-timing$/);
  await expect(page.locator('#noSpecificDate')).toBeVisible();
  await page.locator('#noSpecificDate').check();
  await expect(page.locator('#Standard')).toBeVisible();
  await page.locator('#Standard').check();
  await continueHearingsFlow(page);
  await expect(page).toHaveURL(/\/hearings\/request\/hearing-link$/);
  await expect(page.getByRole('heading', { name: /will this hearing need to be linked to other hearings\?/i })).toBeVisible();
}

async function openLinkedHearingsJourney(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  hearingsTabPage: HearingsTabPage
): Promise<void> {
  await openHearingsTabForScenario(
    page,
    caseDetailsPage,
    {
      userRoles: hearingManagerRoles,
      hearings: [{ ...LISTED_HEARING_SCENARIO, hearingIsLinkedFlag: true }],
      judgeTypes: judgeTypesForHearingLinkJourney,
      hearingsApiOverrides: {
        loadLinkedCasesWithHearings: {
          body: linkedCasesWithHearingsForOrdering,
        },
      },
    },
    { sessionCookies: hearingLinkSessionCookies }
  );

  await hearingsTabPage.waitForReady(LISTED_HEARING_SCENARIO.hearingId);
  await expect(hearingsTabPage.requestHearingButton).toBeVisible({ timeout: 60_000 });
  await hearingsTabPage.openLinkHearing(LISTED_HEARING_SCENARIO.hearingId);
  await expect(page.getByRole('heading', { name: /which hearings should be linked\?/i })).toBeVisible();
}

async function setHearingPositions(page: Page, positions: string[]): Promise<void> {
  for (const [index, position] of positions.entries()) {
    await page.locator(`#hearingsOrder${index}`).selectOption(position);
  }
}

test.describe(
  'Hearings linked journeys integration',
  { tag: ['@integration', '@integration-hearing-link'] },
  () => {
    test('shows only cases linked for a hearing on the hearing link page', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await page.route('**/refdata/commondata/lov/categories/CaseLinkingReasonCode*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(buildCaseLinkingReasonCodesMock()),
        });
      });

      await openHearingsTabForScenario(
        page,
        caseDetailsPage,
        {
          userRoles: hearingManagerRoles,
          hearings: [LISTED_HEARING_SCENARIO],
          judgeTypes: judgeTypesForHearingLinkJourney,
          hearingsApiOverrides: {
            loadServiceLinkedCases: {
              body: linkedCasesWithHearingReason,
            },
          },
        },
        { sessionCookies: hearingLinkSessionCookies }
      );

      await hearingsTabPage.waitForReady(LISTED_HEARING_SCENARIO.hearingId);
      await navigateToHearingLinkPage(page, hearingsTabPage);

      const linkedCases = page.locator('tbody.govuk-table__body tr.govuk-table__row');
      const tableBody = page.locator('table.govuk-table').filter({ hasText: 'redacted redacted - appellantnamefordisplay' }).first();
      await expect(linkedCases).toHaveCount(1);
      await expect(tableBody).toContainText('redacted redacted - appellantnamefordisplay');
      await expect(tableBody).toContainText('Linked for a hearing');
      await expect(tableBody).not.toContainText('Not child');
    });

    test.skip('shows hearing id on linked hearings pages', async ({ page, caseDetailsPage, hearingsTabPage }) => {
      // TODO: Re-enable once the hearing ID column is delivered on the manage link and hearing link pages.
      await openLinkedHearingsJourney(page, caseDetailsPage, hearingsTabPage);
      await expect(page.getByRole('columnheader', { name: /hearing id/i })).toBeVisible();
      await expect(page.getByRole('cell', { name: LISTED_HEARING_SCENARIO.hearingId })).toBeVisible();

      await selectOrderedLinkedHearings(page);
      await continueHearingsFlow(page);
      await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();
    });

    test('shows validation error when duplicate positions are selected after going back', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await openLinkedHearingsJourney(page, caseDetailsPage, hearingsTabPage);

      await selectOrderedLinkedHearings(page);
      await continueHearingsFlow(page);
      await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();

      await page.getByRole('link', { name: /^back$/i }).click();
      await expect(page).toHaveURL(/\/hearings\/link\/.*\/.*\/group-selection$/);
      await expect(page.getByRole('heading', { name: /how should these linked hearings be heard\?/i })).toBeVisible();

      await setHearingPositions(page, ['1', '1', '1']);
      await expect(page.locator('#hearingsOrder0')).toHaveValue('1');
      await expect(page.locator('#hearingsOrder1')).toHaveValue('1');
      await expect(page.locator('#hearingsOrder2')).toHaveValue('1');
      await continueHearingsFlow(page);
      await expect(page).toHaveURL(/\/hearings\/link\/.*\/.*\/group-selection$/);
      await expect(page.getByLabel('There is a problem').getByText('Check the position you have given to each hearing')).toBeVisible();
      await expect(page.getByRole('heading', { name: /how should these linked hearings be heard\?/i })).toBeVisible();
    });

    test('continues to check your answers when positions are unique after going back', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await openLinkedHearingsJourney(page, caseDetailsPage, hearingsTabPage);

      await selectOrderedLinkedHearings(page);
      await continueHearingsFlow(page);
      await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();

      await page.getByRole('link', { name: /^back$/i }).click();
      await expect(page).toHaveURL(/\/hearings\/link\/.*\/.*\/group-selection$/);
      await expect(page.getByRole('heading', { name: /how should these linked hearings be heard\?/i })).toBeVisible();

      await setHearingPositions(page, ['1', '2', '3']);
      await expect(page.locator('#hearingsOrder0')).toHaveValue('1');
      await expect(page.locator('#hearingsOrder1')).toHaveValue('2');
      await expect(page.locator('#hearingsOrder2')).toHaveValue('3');

      await continueHearingsFlow(page);
      await expect(page).toHaveURL(/\/hearings\/link\/.*\/.*\/check-your-answers$/);
      await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();
    });
  }
);

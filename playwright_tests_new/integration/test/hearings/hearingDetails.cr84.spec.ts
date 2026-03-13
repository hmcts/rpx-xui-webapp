import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import type { CaseDetailsPage } from '../../../E2E/page-objects/pages/exui/caseDetails.po';
import type { HearingsTabPage } from '../../../E2E/page-objects/pages/exui/hearingsTab.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupHearingsMockRoutes } from '../../helpers';
import {
  AWAITING_LISTING_HEARING_SCENARIO,
  HEARINGS_CASE_JURISDICTION,
  HEARINGS_CASE_REFERENCE,
  HEARINGS_CASE_TYPE,
  HEARINGS_LISTED_HEARING_ID,
  LISTED_HEARING_SCENARIO,
  UPDATE_REQUESTED_HEARING_SCENARIO,
  type HearingScenario,
} from '../../mocks/hearings.mock';

const userIdentifier = 'HEARING_MANAGER_CR84_ON';
const caseDetailsUrl = (jurisdictionId = HEARINGS_CASE_JURISDICTION, caseTypeId = HEARINGS_CASE_TYPE) =>
  `/cases/case-details/${jurisdictionId}/${caseTypeId}/${HEARINGS_CASE_REFERENCE}`;
const hearingsTabUrl = `${caseDetailsUrl()}/hearings`;

const hearingManagerRoles = ['caseworker-privatelaw', 'caseworker-privatelaw-courtadmin', 'case-allocator', 'hearing-manager'];
const hearingViewerRoles = ['caseworker-privatelaw', 'caseworker-privatelaw-courtadmin', 'case-allocator', 'hearing-viewer'];
const listedHearingViewerRoles = [
  'caseworker-privatelaw',
  'caseworker-privatelaw-courtadmin',
  'case-allocator',
  'listed-hearing-viewer',
];

async function openHearingsTabForScenario(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  _hearingsTabPage: HearingsTabPage,
  options: {
    userRoles: string[];
    hearings?: HearingScenario[];
    summaryHearing?: HearingScenario;
    caseConfig?: { jurisdictionId?: string; caseTypeId?: string };
    enabledCaseVariations?: Array<{ jurisdiction: string; caseType: string }>;
    amendmentCaseVariations?: Array<{ jurisdiction: string; caseType: string }>;
  }
) {
  await applySessionCookies(page, userIdentifier);
  await setupHearingsMockRoutes(page, options);

  const url = caseDetailsUrl(options.caseConfig?.jurisdictionId, options.caseConfig?.caseTypeId);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await caseDetailsPage.selectCaseDetailsTab('Hearings');
}

test.describe(`Hearings CR84 integration as ${userIdentifier}`, { tag: ['@integration', '@integration-hearings'] }, () => {
  test.describe('read-only CR84 summary routes', () => {
    const readOnlySummaryScenarios = [
      {
        name: 'LISTED',
        scenario: LISTED_HEARING_SCENARIO,
        expectedStatus: 'LISTED',
        roles: listedHearingViewerRoles,
        userLabel: 'listed hearing viewer',
        expectListedSections: true,
      },
      {
        name: 'AWAITING_LISTING',
        scenario: AWAITING_LISTING_HEARING_SCENARIO,
        expectedStatus: 'WAITING TO BE LISTED',
        roles: hearingViewerRoles,
        userLabel: 'hearing viewer',
        expectListedSections: false,
      },
      {
        name: 'UPDATE_REQUESTED',
        scenario: UPDATE_REQUESTED_HEARING_SCENARIO,
        expectedStatus: 'UPDATE REQUESTED',
        roles: hearingViewerRoles,
        userLabel: 'hearing viewer',
        expectListedSections: false,
      },
    ];

    for (const { name, scenario, expectedStatus, roles, userLabel, expectListedSections } of readOnlySummaryScenarios) {
      test(`Hearings - ${userLabel} can open ${name} hearing details and sees read-only summary content`, async ({
        page,
        caseDetailsPage,
        hearingsTabPage,
        hearingViewSummaryPage,
      }) => {
        await openHearingsTabForScenario(page, caseDetailsPage, hearingsTabPage, {
          userRoles: roles,
          hearings: [scenario],
          summaryHearing: scenario,
        });

        await hearingsTabPage.waitForReady(scenario.hearingId);
        await expect(hearingsTabPage.viewDetailsButton(scenario.hearingId)).toBeVisible();
        await expect(hearingsTabPage.viewOrEditButton(scenario.hearingId)).toHaveCount(0);
        await expect(hearingsTabPage.cancelButton(scenario.hearingId)).toHaveCount(0);
        await expect(hearingsTabPage.addOrEditButton(scenario.hearingId)).toHaveCount(0);

        await hearingsTabPage.openViewDetails(scenario.hearingId);

        await expect(page).toHaveURL(/\/hearings\/view\/hearing-view-summary$/);
        await hearingViewSummaryPage.waitForReady();
        await expect(hearingViewSummaryPage.editHearingButton).toBeHidden();
        await expect(hearingViewSummaryPage.summaryRow('Status')).toContainText(expectedStatus);
        await expect(hearingViewSummaryPage.summaryRow('Date request submitted')).toBeVisible();

        if (expectListedSections) {
          await expect(hearingViewSummaryPage.sectionHeading('Listing information summary')).toBeVisible();
          await expect(hearingViewSummaryPage.sectionHeading('Language requirements')).toBeVisible();
          await expect(hearingViewSummaryPage.sectionHeading('Additional facilities')).toBeHidden();
          await expect(hearingViewSummaryPage.sectionHeading('Hearing stage')).toBeHidden();
        }
      });
    }
  });

  test.describe('manager summary routes for CR84 statuses', () => {
    const managerSummaryScenarios = [
      {
        name: 'LISTED',
        scenario: LISTED_HEARING_SCENARIO,
        expectedStatus: 'LISTED',
      },
      {
        name: 'AWAITING_LISTING',
        scenario: AWAITING_LISTING_HEARING_SCENARIO,
        expectedStatus: 'WAITING TO BE LISTED',
      },
      {
        name: 'UPDATE_REQUESTED',
        scenario: UPDATE_REQUESTED_HEARING_SCENARIO,
        expectedStatus: 'UPDATE REQUESTED',
      },
    ];

    for (const { name, scenario, expectedStatus } of managerSummaryScenarios) {
      test(`Hearings - hearing manager can open ${name} hearing details and sees amendable summary content`, async ({
        page,
        caseDetailsPage,
        hearingsTabPage,
        hearingViewSummaryPage,
      }) => {
        await openHearingsTabForScenario(page, caseDetailsPage, hearingsTabPage, {
          userRoles: hearingManagerRoles,
          hearings: [scenario],
          summaryHearing: scenario,
        });

        await hearingsTabPage.waitForReady(scenario.hearingId);
        await hearingsTabPage.openViewDetails(scenario.hearingId);

        await expect(page).toHaveURL(/\/hearings\/request\/hearing-view-summary$/);
        await hearingViewSummaryPage.waitForReady();
        await expect(hearingViewSummaryPage.editHearingButton).toBeVisible();
        await expect(page.getByText(expectedStatus, { exact: true }).first()).toBeVisible();
        await expect(hearingViewSummaryPage.summaryRow('Date request submitted')).toBeVisible();
        await expect(hearingViewSummaryPage.summaryRow('Will additional security be required?')).toContainText('No');
        await expect(hearingViewSummaryPage.summaryRow('Case internal name')).toContainText(HEARINGS_CASE_REFERENCE);
      });
    }
  });

  test.describe('LISTED role action matrix', () => {
    const actionMatrixScenarios = [
      {
        name: 'hearing-manager',
        roles: hearingManagerRoles,
        readyAction: 'view-or-edit' as const,
        expectViewOrEdit: true,
        expectViewDetails: false,
        expectCancel: true,
      },
      {
        name: 'hearing-viewer',
        roles: hearingViewerRoles,
        readyAction: 'view-details' as const,
        expectViewOrEdit: false,
        expectViewDetails: true,
        expectCancel: false,
      },
      {
        name: 'listed-hearing-viewer',
        roles: listedHearingViewerRoles,
        readyAction: 'view-details' as const,
        expectViewOrEdit: false,
        expectViewDetails: true,
        expectCancel: false,
      },
    ];

    for (const actionMatrixScenario of actionMatrixScenarios) {
      test(`Hearings - ${actionMatrixScenario.name} sees the expected LISTED hearing actions`, async ({
        page,
        caseDetailsPage,
        hearingsTabPage,
      }) => {
        await openHearingsTabForScenario(page, caseDetailsPage, hearingsTabPage, {
          userRoles: actionMatrixScenario.roles,
          hearings: [LISTED_HEARING_SCENARIO],
          amendmentCaseVariations: [],
        });

        await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID, actionMatrixScenario.readyAction);

        if (actionMatrixScenario.expectViewOrEdit) {
          await expect(hearingsTabPage.viewOrEditButton(HEARINGS_LISTED_HEARING_ID)).toBeVisible();
        } else {
          await expect(hearingsTabPage.viewOrEditButton(HEARINGS_LISTED_HEARING_ID)).toHaveCount(0);
        }

        if (actionMatrixScenario.expectViewDetails) {
          await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toBeVisible();
        } else {
          await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toHaveCount(0);
        }

        if (actionMatrixScenario.expectCancel) {
          await expect(hearingsTabPage.cancelButton(HEARINGS_LISTED_HEARING_ID)).toBeVisible();
        } else {
          await expect(hearingsTabPage.cancelButton(HEARINGS_LISTED_HEARING_ID)).toHaveCount(0);
        }
      });
    }
  });

  test.describe('feature toggle routing', () => {
    test('Hearings - amendments enabled shows Hearings tab and routes manager LISTED to the amendments summary', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
      hearingViewSummaryPage,
    }) => {
      await openHearingsTabForScenario(page, caseDetailsPage, hearingsTabPage, {
        userRoles: hearingManagerRoles,
        hearings: [LISTED_HEARING_SCENARIO],
      });

      await hearingsTabPage.waitForReady();
      await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toBeVisible();
      await expect(hearingsTabPage.viewOrEditButton(HEARINGS_LISTED_HEARING_ID)).toHaveCount(0);

      await hearingsTabPage.openViewDetails(HEARINGS_LISTED_HEARING_ID);

      await expect(page).toHaveURL(/\/hearings\/request\/hearing-view-summary$/);
      await hearingViewSummaryPage.waitForReady();
    });

    test('Hearings - amendments disabled keeps Hearings enabled and routes manager LISTED to the edit summary', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
      hearingViewEditSummaryPage,
    }) => {
      await openHearingsTabForScenario(page, caseDetailsPage, hearingsTabPage, {
        userRoles: hearingManagerRoles,
        hearings: [LISTED_HEARING_SCENARIO],
        caseConfig: {
          jurisdictionId: 'SSCS',
          caseTypeId: 'Benefit',
        },
        enabledCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
        amendmentCaseVariations: [{ jurisdiction: 'CIVIL', caseType: 'CIVIL' }],
      });

      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID, 'view-or-edit');
      await expect(hearingsTabPage.viewOrEditButton(HEARINGS_LISTED_HEARING_ID)).toBeVisible();
      await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toHaveCount(0);

      await hearingsTabPage.openViewOrEdit(HEARINGS_LISTED_HEARING_ID);

      await expect(page).toHaveURL(/\/hearings\/request\/hearing-view-edit-summary$/);
      await hearingViewEditSummaryPage.waitForReady();
    });

    test('Hearings - hearings-disabled case does not render the Hearings tab', async ({ page }) => {
      await applySessionCookies(page, userIdentifier);
      await setupHearingsMockRoutes(page, {
        userRoles: hearingManagerRoles,
        hearings: [LISTED_HEARING_SCENARIO],
        caseConfig: {
          jurisdictionId: 'DIVORCE',
          caseTypeId: 'DIVORCE',
        },
        enabledCaseVariations: [{ jurisdiction: 'CIVIL', caseType: 'CIVIL' }],
        amendmentCaseVariations: [{ jurisdiction: 'CIVIL', caseType: 'CIVIL' }],
      });

      await page.goto(caseDetailsUrl('DIVORCE', 'DIVORCE'), { waitUntil: 'domcontentloaded' });
      await expect(page.getByRole('tab', { name: /hearings/i })).toHaveCount(0);
    });
  });

  test('Hearings - user without hearing read rights cannot access LISTED hearing details entry points', async ({
    page,
    hearingsTabPage,
  }) => {
    await applySessionCookies(page, userIdentifier);
    await setupHearingsMockRoutes(page, {
      userRoles: ['caseworker-privatelaw', 'caseworker-privatelaw-courtadmin', 'case-allocator'],
      hearings: [LISTED_HEARING_SCENARIO],
    });

    await page.goto(caseDetailsUrl(), { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('tab', { name: /hearings/i })).toHaveCount(0);

    await page.goto(hearingsTabUrl, { waitUntil: 'domcontentloaded' });
    await expect(hearingsTabPage.container).toHaveCount(0);
    await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toHaveCount(0);

    await page.goto('/hearings/view/hearing-view-summary', { waitUntil: 'domcontentloaded' });
    await expect(page).not.toHaveURL(/\/hearings\/view\/hearing-view-summary$/);
    await expect.poll(() => page.url()).toContain('/cases');
  });
});

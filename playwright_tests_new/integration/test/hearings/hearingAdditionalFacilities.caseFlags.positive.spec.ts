import { type Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import type { CaseDetailsPage } from '../../../E2E/page-objects/pages/exui/caseDetails.po';
import { loadSessionCookies } from '../../../common/sessionCapture';
import { caseFlagsRefData, serviceHearingValuesModel } from '../../../../src/hearings/hearing.test.data';
import type { ServiceHearingValuesModel } from '../../../../src/hearings/models/serviceHearingValues.model';
import { CaseFlagsUtils } from '../../../../src/hearings/utils/case-flags.utils';
import { LISTED_HEARING_SCENARIO, buildServiceHearingValuesMock } from '../../mocks/hearings.mock';
import {
  continueHearingsFlow,
  caseDetailsUrl,
  gotoCaseDetailsWithRetry,
  hearingManagerRoles,
  setupHearingsMockRoutes,
} from '../../helpers';

type ServiceFlag = (typeof serviceHearingValuesModel.caseFlags.flags)[number];
const HEARING_LINK_LOCAL_SESSION = {
  userIdentifier: 'hearing-link-local',
  email: 'hearing-link-local@example.com',
  password: '',
  sessionKey: 'hearing-link-local',
} as const;

function isReasonableAdjustmentFlag(flag: ServiceFlag): boolean {
  return flag.flagId.startsWith('RA') || flag.flagId === CaseFlagsUtils.LANGUAGE_INTERPRETER_FLAG_ID;
}

function resolveFlagLabel(flagId: string): string {
  return CaseFlagsUtils.findFlagByFlagId(caseFlagsRefData, flagId)?.name ?? flagId;
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function deepClone<T>(value: T): T {
  return typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));
}

function buildCaseFlagsFixture(): ServiceFlag[] {
  const dedupedFlags = new Map<string, ServiceFlag>();
  for (const flag of deepClone(serviceHearingValuesModel.caseFlags.flags) as ServiceFlag[]) {
    const key = `${flag.partyId}:${flag.flagId}:${flag.flagDescription}:${flag.partyName}`;
    if (!dedupedFlags.has(key)) {
      dedupedFlags.set(key, flag);
    }
  }

  return [...dedupedFlags.values()];
}

function buildServiceHearingValuesWithFixtureFlags(): ServiceHearingValuesModel {
  const serviceHearingValues = buildServiceHearingValuesMock(undefined, LISTED_HEARING_SCENARIO) as unknown as ServiceHearingValuesModel;
  serviceHearingValues.caseFlags = {
    ...deepClone(serviceHearingValuesModel.caseFlags),
    flags: buildCaseFlagsFixture(),
  };
  return serviceHearingValues;
}

function expectedLabelsFromFixture(predicate: (flag: ServiceFlag) => boolean): string[] {
  return unique(
    buildCaseFlagsFixture()
      .filter(predicate)
      .map((flag) => resolveFlagLabel(flag.flagId))
  );
}

async function setupHearingsJourneyWithRealCaseFlags(page: Page, caseDetailsPage: CaseDetailsPage): Promise<void> {
  const hearingLinkLocalSession = loadSessionCookies(HEARING_LINK_LOCAL_SESSION);
  await page.context().addCookies(hearingLinkLocalSession.cookies);
  await setupHearingsMockRoutes(page, {
    userRoles: hearingManagerRoles,
    hearings: [LISTED_HEARING_SCENARIO],
    summaryHearing: LISTED_HEARING_SCENARIO,
    caseFlagsRefData,
    hearingsApiOverrides: {
      loadServiceHearingValues: {
        body: buildServiceHearingValuesWithFixtureFlags(),
      },
    },
  });
  await gotoCaseDetailsWithRetry(page, caseDetailsUrl());
  await caseDetailsPage.selectCaseDetailsTab('Hearings');
}

async function expectCaseFlagTexts(page: Page, texts: string[], visible = true): Promise<void> {
  const caseFlags = page.locator('exui-case-flags').first();
  for (const text of texts) {
    const textLocator = caseFlags.getByText(text, { exact: true }).first();
    if (visible) {
      await expect(textLocator).toBeVisible();
    } else {
      await expect(caseFlags.getByText(text, { exact: true })).toHaveCount(0);
    }
  }
}

test.describe('Hearings additional facilities case flags', { tag: ['@integration', '@integration-hearings'] }, () => {
  test('shows non-RA and non-PF0015 flags on the create journey additional facilities page', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    const reasonableAdjustmentLabels = expectedLabelsFromFixture(isReasonableAdjustmentFlag);
    const nonReasonableAdjustmentLabels = expectedLabelsFromFixture((flag) => !isReasonableAdjustmentFlag(flag));

    await setupHearingsJourneyWithRealCaseFlags(page, caseDetailsPage);
    await hearingsTabPage.waitForReady();

    await hearingsTabPage.openRequestHearing();
    await expect(page.getByRole('heading', { name: /hearing requirements/i })).toBeVisible();
    await expectCaseFlagTexts(page, reasonableAdjustmentLabels);

    await continueHearingsFlow(page);
    await expect(page.getByRole('heading', { name: /do you require any additional facilities\?/i })).toBeVisible();
    await expectCaseFlagTexts(page, nonReasonableAdjustmentLabels);
    await expectCaseFlagTexts(page, reasonableAdjustmentLabels, false);
  });

  test('shows non-RA and non-PF0015 flags on the edit journey additional facilities page', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
    hearingViewSummaryPage,
    hearingViewEditSummaryPage,
  }) => {
    const reasonableAdjustmentLabels = expectedLabelsFromFixture(isReasonableAdjustmentFlag);
    const nonReasonableAdjustmentLabels = expectedLabelsFromFixture((flag) => !isReasonableAdjustmentFlag(flag));

    await setupHearingsJourneyWithRealCaseFlags(page, caseDetailsPage);
    await hearingsTabPage.waitForReady();
    await hearingsTabPage.openViewDetails(LISTED_HEARING_SCENARIO.hearingId);
    await hearingViewSummaryPage.waitForReady();
    await hearingViewSummaryPage.editHearingButton.click();

    await hearingViewEditSummaryPage.waitForReady();
    await hearingViewEditSummaryPage.rowChangeButton('Select any additional facilities required').click();
    await expect(page.getByRole('heading', { name: /do you require any additional facilities\?/i })).toBeVisible();
    await expectCaseFlagTexts(page, nonReasonableAdjustmentLabels);
    await expectCaseFlagTexts(page, reasonableAdjustmentLabels, false);
  });
});

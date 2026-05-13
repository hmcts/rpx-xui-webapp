import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage, ensureSession } from '../../../common/sessionCapture';
import { CaseFlagPage } from '../../page-objects/pages/exui/caseFlag.po';
import {
  buildDataLossComparisonReport,
  normaliseCaseDataForDataLossComparison,
  resolveCaseNumberFromPayload,
} from '../../utils/case-flags.utils';
import {
  configureCivilCaseFlagsRuntimeUsers,
  createCivilLipCaseInMediationViaApi,
  fetchCaseDetailsViaApi,
  getCivilCaseFlagsCourtStaffAlias,
  getCivilCaseFlagsSetupAlias,
  resolveCcdCaseStateId,
  type CcdCaseDetails,
} from '../../utils/test-setup/journeys/civilCaseJourneys';
import { formatErrorMessage, isDependencyEnvironmentFailure, retryOnTransientFailure } from '../../utils/transient-failure.utils';

const CIVIL_API_SETUP_ALIAS = getCivilCaseFlagsSetupAlias();
const COURT_STAFF_ALIAS = getCivilCaseFlagsCourtStaffAlias();
const MEDIATION_STATE = process.env.PW_CIVIL_MEDIATION_CASE_STATE?.trim() || 'IN_MEDIATION';
const TEST_FLAG_COMMENT = 'Data loss Civil Create Case Flag';
const CIVIL_DATA_LOSS_SUITE_TIMEOUT_MS = 1_800_000;

test.describe('Civil Create Case Flag data loss regression', { tag: ['@e2e', '@e2e-case-flags', '@e2e-civil-data-loss'] }, () => {
  test.describe.configure({ timeout: CIVIL_DATA_LOSS_SUITE_TIMEOUT_MS });

  let caseNumber: string;
  let baselineCaseDetails: CcdCaseDetails;

  test.beforeAll(async ({ browser, browserName: _browserName }, testInfo) => {
    await configureCivilCaseFlagsRuntimeUsers(browser);
    await ensureSession(CIVIL_API_SETUP_ALIAS);
    await ensureSession(COURT_STAFF_ALIAS);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    await retryOnTransientFailure(
      async () => {
        await ensureAuthenticatedPage(page, CIVIL_API_SETUP_ALIAS, { waitForSelector: 'exui-header' });

        const setup = await createCivilLipCaseInMediationViaApi({
          expectedState: MEDIATION_STATE,
          page,
          useGeneratedUsers: true,
        });
        caseNumber = setup.caseNumber;

        await ensureAuthenticatedPage(page, COURT_STAFF_ALIAS, { waitForSelector: 'exui-header' });
        baselineCaseDetails = await fetchCaseDetailsViaApi(page, caseNumber);
      },
      {
        maxAttempts: 2,
        onRetry: async () => {
          if (!page.isClosed()) {
            await page.goto('/').catch(() => undefined);
          }
        },
      }
    ).catch((error) => {
      if (isDependencyEnvironmentFailure(error)) {
        throw new Error(`Civil mediation data-loss setup failed due to dependency instability: ${formatErrorMessage(error)}`);
      }
      throw error;
    });
  });

  test('Create Case Flag event does not modify or remove existing case data', async ({
    caseDetailsPage,
    findCasePage,
    page,
  }, testInfo) => {
    const caseFlagPage = new CaseFlagPage(page);

    await test.step('Search and open the Civil case by caseId', async () => {
      await findCasePage.startFindCaseJourney(caseNumber, 'Civil', 'Civil');
      await findCasePage.displayCaseDetailsFor(caseNumber);
      await expect(page).toHaveURL(/\/cases\/case-details\//);
      await page.goto(`/cases/case-details/CIVIL/CIVIL/${caseNumber}#Summary`);
      await caseDetailsPage.exuiSpinnerComponent.wait();
      await expect(page).toHaveURL(new RegExp(`/cases/case-details/CIVIL/CIVIL/${caseNumber}`));
    });

    await test.step('Create party-level Other case flag for Claimant 1', async () => {
      await caseFlagPage.openCreateCaseFlagEvent(baselineCaseDetails, caseNumber);
      await caseFlagPage.completePartyOtherCaseFlagForClaimant1(TEST_FLAG_COMMENT);
      await page.getByRole('button', { name: /^Submit$/i }).click();
      await caseDetailsPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify successful submission in UI', async () => {
      await caseFlagPage.waitForCreateCaseFlagSuccess(caseNumber);
    });

    await test.step('Retrieve updated case data via API and compare with baseline', async () => {
      const updatedCaseDetails = await fetchCaseDetailsViaApi(page, caseNumber);
      const normalisedBaselineCaseDetails = normaliseCaseDataForDataLossComparison(baselineCaseDetails);
      const normalisedUpdatedCaseDetails = normaliseCaseDataForDataLossComparison(updatedCaseDetails, {
        ignoredFlagComment: TEST_FLAG_COMMENT,
      });

      expect.soft(resolveCaseNumberFromPayload(updatedCaseDetails)).toBe(caseNumber);
      expect
        .soft(resolveCcdCaseStateId(updatedCaseDetails), 'Post-flag case state should remain Mediation')
        .toBe(MEDIATION_STATE);

      await testInfo.attach('civil case before create flag.json', {
        body: JSON.stringify(baselineCaseDetails, null, 2),
        contentType: 'application/json',
      });
      await testInfo.attach('civil case after create flag.json', {
        body: JSON.stringify(updatedCaseDetails, null, 2),
        contentType: 'application/json',
      });
      await testInfo.attach('civil case before create flag normalised.json', {
        body: JSON.stringify(normalisedBaselineCaseDetails, null, 2),
        contentType: 'application/json',
      });
      await testInfo.attach('civil case after create flag normalised.json', {
        body: JSON.stringify(normalisedUpdatedCaseDetails, null, 2),
        contentType: 'application/json',
      });
      await testInfo.attach('civil case create flag data loss report.md', {
        body: buildDataLossComparisonReport({
          baselineCaseDetails,
          caseNumber,
          normalisedBaseline: normalisedBaselineCaseDetails,
          normalisedUpdated: normalisedUpdatedCaseDetails,
          updatedCaseDetails,
        }),
        contentType: 'text/markdown',
      });

      expect(normalisedUpdatedCaseDetails).toEqual(normalisedBaselineCaseDetails);
    });
  });
});

import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage, ensureSession } from '../../../common/sessionCapture';
import { filterEmptyRows } from '../../utils';
import { CaseFlagPage } from '../../page-objects/pages/exui/caseFlag.po';
import {
  buildDataLossComparisonReport,
  isPageClosingError,
  normaliseCaseDataForDataLossComparison,
  rawCivilDataLossAttachmentsEnabled,
  resolveCivilClaimantPartyName,
  resolveCaseNumberFromPayload,
  rowMatchesExpected,
} from '../../utils/case-flags.utils';
import {
  configureCivilCaseFlagsRuntimeUsers,
  createCivilLipCaseInMediationViaApi,
  fetchCaseDetailsViaApi,
  getCivilCaseFlagsCourtStaffAlias,
  resolveCcdCaseStateId,
  type CcdCaseDetails,
} from '../../utils/test-setup/civil/civilCaseFlagsSetup';
import { formatErrorMessage, isDependencyEnvironmentFailure, retryOnTransientFailure } from '../../utils/transient-failure.utils';

const COURT_STAFF_ALIAS = getCivilCaseFlagsCourtStaffAlias();
const MEDIATION_STATE = process.env.PW_CIVIL_MEDIATION_CASE_STATE?.trim() || 'IN_MEDIATION';
const TEST_FLAG_COMMENT = 'Data loss Civil Create Case Flag';
const CASE_FLAG_SUCCESS_POLL_INTERVALS = [1_000, 2_000, 3_000];
const DATA_LOSS_TEST_TAGS = ['@e2e', '@e2e-case-flags', '@e2e-civil-data-loss'];
const DATA_LOSS_TEST_TIMEOUT_MS = resolvePositiveInt(process.env.PW_CIVIL_DATA_LOSS_TEST_TIMEOUT_MS, 35 * 60_000);

test.describe('Civil Create Case Flag data loss regression', { tag: DATA_LOSS_TEST_TAGS }, () => {
  test.describe.configure({ timeout: DATA_LOSS_TEST_TIMEOUT_MS });

  let caseNumber: string;
  let baselineCaseDetails: CcdCaseDetails;

  test.beforeAll(async ({ browser }) => {
    await configureCivilCaseFlagsRuntimeUsers(browser);
    await ensureSession(COURT_STAFF_ALIAS);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    await retryOnTransientFailure(
      async () => {
        await ensureAuthenticatedPage(page, COURT_STAFF_ALIAS, { waitForSelector: 'exui-header' });

        const setup = await createCivilLipCaseInMediationViaApi({
          expectedState: MEDIATION_STATE,
          page,
          useGeneratedUsers: true,
        });
        caseNumber = setup.caseNumber;
        baselineCaseDetails = setup.caseDetails;
        expect(resolveCcdCaseStateId(baselineCaseDetails)).toBe(MEDIATION_STATE);
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
    tableUtils,
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
      await expect(caseFlagPage.caseFlagLocationQuestion).toBeVisible();
      await caseFlagPage.completePartyOtherCaseFlagForClaimant1(TEST_FLAG_COMMENT);
      await expect(caseFlagPage.reviewFlagDetailsHeading).toBeVisible();
      await caseFlagPage.submitCreateCaseFlag();
    });

    await test.step('Verify successful submission in UI', async () => {
      await expect
        .poll(() => caseFlagPage.isCreateCaseFlagSuccessVisible(caseNumber), {
          intervals: CASE_FLAG_SUCCESS_POLL_INTERVALS,
        })
        .toBe(true);
    });

    await test.step('Verify the party-level Other flag is persisted for Claimant 1', async () => {
      const claimantPartyName = resolveCivilClaimantPartyName(baselineCaseDetails);
      if (!claimantPartyName) {
        throw new Error('Unable to resolve Civil claimant party name from baseline case data.');
      }

      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const expectedFlag = {
        'Party level flags': 'Other Other',
        Comments: TEST_FLAG_COMMENT,
        'Flag status': 'ACTIVE',
      };

      await expect
        .poll(
          async () => {
            if (caseDetailsPage.page.isClosed()) {
              return false;
            }
            try {
              const claimantFlagsTable = await caseDetailsPage.waitForTableByName(claimantPartyName, {});
              const visibleRows = filterEmptyRows(await tableUtils.parseDataTable(claimantFlagsTable));
              return visibleRows.some((row) => rowMatchesExpected(row, expectedFlag));
            } catch (error) {
              if (isPageClosingError(error)) {
                return false;
              }
              throw error;
            }
          },
          {
            message: `Expected Claimant 1 (${claimantPartyName}) party-level Other flag to be visible in the Flags tab`,
            intervals: CASE_FLAG_SUCCESS_POLL_INTERVALS,
          }
        )
        .toBe(true);
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

      const attachRawJson = rawCivilDataLossAttachmentsEnabled();
      if (attachRawJson) {
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
      }
      await testInfo.attach('civil case create flag data loss report.md', {
        body: buildDataLossComparisonReport({
          baselineCaseDetails,
          caseNumber,
          normalisedBaseline: normalisedBaselineCaseDetails,
          normalisedUpdated: normalisedUpdatedCaseDetails,
          rawJsonAttached: attachRawJson,
          updatedCaseDetails,
        }),
        contentType: 'text/markdown',
      });

      expect(normalisedUpdatedCaseDetails).toEqual(normalisedBaselineCaseDetails);
    });
  });
});

function resolvePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

import type { Page } from '@playwright/test';
import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage, ensureSession } from '../../../common/sessionCapture';
import { caseBannerMatches } from '../../utils/banner.utils';
import {
  createCivilLipCaseInMediationViaApi,
  fetchCaseDetailsViaApi,
  getCivilLipMediationApiMissingConfiguration,
  type CcdCaseDetails,
} from '../../utils/test-setup/journeys/civilCaseJourneys';
import { formatErrorMessage, isDependencyEnvironmentFailure, retryOnTransientFailure } from '../../utils/transient-failure.utils';

type JsonRecord = Record<string, unknown>;

const SESSION_BOOTSTRAP_TIMEOUT_MS = 300_000;
const SUITE_TIMEOUT_MS = 600_000;
const COURT_STAFF_ALIAS = process.env.PW_CIVIL_CASE_FLAGS_COURT_STAFF_ALIAS?.trim() || 'STAFF_ADMIN';
const MEDIATION_STATE = process.env.PW_CIVIL_MEDIATION_CASE_STATE?.trim() || 'IN_MEDIATION';
const TEST_FLAG_COMMENT = 'Playwright data loss regression flag';
const CREATE_CASE_FLAG_ACTION_LABELS = ['Create case flag', 'Create a case flag', 'Create Case Flag', 'Create Case Flags'];

function resolveCaseNumberFromPayload(payload: CcdCaseDetails): string | undefined {
  const candidate = payload.caseReference ?? payload.case_reference ?? payload.case_id ?? payload.id;
  return typeof candidate === 'string' || typeof candidate === 'number' ? String(candidate).replace(/\D/g, '') : undefined;
}

function isCaseFlagRelatedKey(key: string): boolean {
  return /flag/i.test(key);
}

function isVolatileCaseMetadataKey(key: string): boolean {
  return [
    'actions',
    'case_history',
    'caseHistory',
    'created_date',
    'events',
    'event_history',
    'eventHistory',
    'last_modified',
    'last_state_modified_date',
    'modified_date',
    'security_classification',
    'supplementary_data',
    'triggers',
  ].includes(key);
}

function objectLooksCaseFlagRelated(value: JsonRecord): boolean {
  return ['id', 'label', 'name', 'display_context_parameter'].some((key) => {
    const candidate = value[key];
    return typeof candidate === 'string' && /flag/i.test(candidate);
  });
}

function normaliseCaseDataForDataLossComparison(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value
      .map((entry) => normaliseCaseDataForDataLossComparison(entry))
      .filter((entry) => entry !== undefined);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const record = value as JsonRecord;
  if (objectLooksCaseFlagRelated(record)) {
    return undefined;
  }

  const normalised: JsonRecord = {};
  for (const [key, entryValue] of Object.entries(record)) {
    if (isVolatileCaseMetadataKey(key) || isCaseFlagRelatedKey(key)) {
      continue;
    }

    const cleanedValue = normaliseCaseDataForDataLossComparison(entryValue);
    if (cleanedValue !== undefined) {
      normalised[key] = cleanedValue;
    }
  }

  return normalised;
}

async function selectFirstVisibleRadio(page: Page, labels: RegExp[], context: string): Promise<void> {
  for (const label of labels) {
    const radio = page.getByLabel(label).first();
    if (await radio.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await radio.check();
      return;
    }
  }

  throw new Error(`Unable to select radio for ${context}. Tried: ${labels.map((label) => label.toString()).join(', ')}`);
}

async function clickCaseFlagNext(page: Page): Promise<void> {
  const nextButton = page.getByRole('button', { name: /^(Next|Continue)$/i }).first();
  await nextButton.waitFor({ state: 'visible', timeout: 30_000 });
  await nextButton.click();
  await page.locator('xuilib-loading-spinner').first().waitFor({ state: 'hidden', timeout: 30_000 }).catch(() => undefined);
}

async function selectPartyFlagLocation(page: Page): Promise<void> {
  const partyLevelRadio = page.getByLabel(/^Party$/i).first();
  if (await partyLevelRadio.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await partyLevelRadio.check();
    await clickCaseFlagNext(page);
  }

  await selectFirstVisibleRadio(page, [/^Claimant 1(?:\s*\(.*\))?$/i, /Claimant 1/i], 'Claimant 1 party flag location');
  await clickCaseFlagNext(page);
}

async function selectOtherFlagType(page: Page): Promise<void> {
  await selectFirstVisibleRadio(page, [/^Other$/i, /Other/i], 'Other flag type');
  await clickCaseFlagNext(page);

  const customFlagTypeInput = page.getByLabel(/Enter a flag type|Other description/i).first();
  if (await customFlagTypeInput.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await customFlagTypeInput.fill('Other');
    await clickCaseFlagNext(page);
  }
}

async function addFlagCommentsIfRequested(page: Page): Promise<void> {
  const comments = page.locator('ccd-add-comments textarea, textarea#flagComments, textarea').first();
  if (await comments.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await comments.fill(TEST_FLAG_COMMENT);
    await clickCaseFlagNext(page);
  }
}

async function confirmActiveFlagStatusIfRequested(page: Page): Promise<void> {
  const activeRadio = page.getByLabel(/^Active$/i).first();
  if (!(await activeRadio.isVisible({ timeout: 3_000 }).catch(() => false))) {
    return;
  }

  await activeRadio.check();
  const reason = page.getByLabel(/Describe reason/i).first();
  if (await reason.isVisible({ timeout: 1_000 }).catch(() => false)) {
    await reason.fill('Created for data loss regression coverage');
  }
  await clickCaseFlagNext(page);
}

async function selectCreateCaseFlagAction(caseDetailsPage: {
  caseActionsDropdown: ReturnType<Page['locator']>;
  selectCaseAction: (action: string) => Promise<void>;
}): Promise<void> {
  const availableOptions = await caseDetailsPage.caseActionsDropdown.locator('option').evaluateAll((options) =>
    options.map((option) => ({
      label: (option.textContent ?? '').trim(),
      value: (option.getAttribute('value') ?? '').trim(),
    }))
  );
  const allowedLabels = new Set(CREATE_CASE_FLAG_ACTION_LABELS.map((label) => label.toLowerCase()));
  const matchingOption = availableOptions.find((option) => allowedLabels.has(option.label.toLowerCase()));

  if (!matchingOption?.label) {
    throw new Error(
      `Create Case Flag event is not available. Available actions: ${availableOptions
        .map((option) => option.label || option.value)
        .filter(Boolean)
        .join(', ')}`
    );
  }

  await caseDetailsPage.selectCaseAction(matchingOption.label);
}

function isCreateCaseFlagBannerVisible(bannerText: string, caseNumber: string): boolean {
  return CREATE_CASE_FLAG_ACTION_LABELS.some((label) =>
    caseBannerMatches(bannerText, caseNumber, `has been updated with event: ${label}`)
  );
}

test.describe('Civil Create Case Flag data loss regression', { tag: ['@e2e', '@e2e-case-flags', '@e2e-civil-data-loss'] }, () => {
  test.describe.configure({ timeout: SUITE_TIMEOUT_MS });

  let caseNumber: string;
  let baselineCaseDetails: CcdCaseDetails;

  test.beforeAll(async ({ browserName: _browserName }, testInfo) => {
    testInfo.setTimeout(SESSION_BOOTSTRAP_TIMEOUT_MS);
    await ensureSession(COURT_STAFF_ALIAS);
  });

  test.beforeEach(async ({ page }, testInfo) => {
    await retryOnTransientFailure(
      async () => {
        await ensureAuthenticatedPage(page, COURT_STAFF_ALIAS, { waitForSelector: 'exui-header' });

        const missingConfiguration = getCivilLipMediationApiMissingConfiguration();
        if (missingConfiguration.length > 0) {
          throw new Error(
            `Civil mediation API setup is not configured. Missing: ${missingConfiguration.join(', ')}. ` +
              'The Civil case must be created and progressed to IN_MEDIATION via API before the UI flag event runs.'
          );
        }

        const setup = await createCivilLipCaseInMediationViaApi({
          expectedState: MEDIATION_STATE,
          page,
        });
        caseNumber = setup.caseNumber;
        baselineCaseDetails = setup.caseDetails;

        await page.goto('/');
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
    page,
    searchCasePage,
  }, testInfo) => {
    await test.step('Search and open the Civil case by caseId', async () => {
      await searchCasePage.searchWith16DigitCaseId(caseNumber);
      await expect(page).toHaveURL(/\/cases\/case-details\//);
      await expect(caseDetailsPage.caseActionsDropdown).toBeVisible();
    });

    await test.step('Create party-level Other case flag for Claimant 1', async () => {
      await selectCreateCaseFlagAction(caseDetailsPage);
      await selectPartyFlagLocation(page);
      await selectOtherFlagType(page);
      await addFlagCommentsIfRequested(page);
      await confirmActiveFlagStatusIfRequested(page);
      await expect(page.getByRole('heading', { name: /check your answers|review details/i }).first()).toBeVisible();
      await page.getByRole('button', { name: /^Submit$/i }).click();
      await caseDetailsPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify successful submission in UI', async () => {
      await expect
        .poll(
          async () => {
            if (await caseDetailsPage.hasCallbackValidationErrorAlert()) {
              throw new Error('Callback data failed validation while creating Civil party-level case flag.');
            }
            if (await caseDetailsPage.eventCreationErrorHeading.isVisible().catch(() => false)) {
              throw new Error('CCD event creation failed while creating Civil party-level case flag.');
            }
            const bannerVisible = await caseDetailsPage.caseAlertSuccessMessage.isVisible().catch(() => false);
            if (!bannerVisible) {
              return false;
            }
            const bannerText = await caseDetailsPage.caseAlertSuccessMessage.innerText();
            return isCreateCaseFlagBannerVisible(bannerText, caseNumber);
          },
          { timeout: 60_000, intervals: [1_000, 2_000, 3_000] }
        )
        .toBe(true);
    });

    await test.step('Retrieve updated case data via API and compare with baseline', async () => {
      const updatedCaseDetails = await fetchCaseDetailsViaApi(page, caseNumber);
      expect.soft(resolveCaseNumberFromPayload(updatedCaseDetails)).toBe(caseNumber);
      expect.soft(updatedCaseDetails.state, 'Post-flag case state should remain Mediation').toBe(MEDIATION_STATE);

      await testInfo.attach('civil-case-before-create-flag.json', {
        body: JSON.stringify(baselineCaseDetails, null, 2),
        contentType: 'application/json',
      });
      await testInfo.attach('civil-case-after-create-flag.json', {
        body: JSON.stringify(updatedCaseDetails, null, 2),
        contentType: 'application/json',
      });

      expect(normaliseCaseDataForDataLossComparison(updatedCaseDetails)).toEqual(
        normaliseCaseDataForDataLossComparison(baselineCaseDetails)
      );
    });
  });
});

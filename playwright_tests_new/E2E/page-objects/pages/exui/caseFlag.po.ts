import { type Locator, type Page } from '@playwright/test';

import { Base } from '../../base';
import { caseBannerMatches } from '../../../utils/banner.utils';
import { resolveCcdCaseStateId, type CcdCaseDetails } from '../../../utils/test-setup/journeys/civilCaseJourneys';

type CcdCaseTrigger = {
  id?: string;
  name?: string;
  label?: string;
  description?: string;
};

const CREATE_CASE_FLAG_ACTION_LABELS = ['Create case flag', 'Create a case flag', 'Create Case Flag', 'Create Case Flags'];
const EXPECTED_CREATE_CASE_FLAG_EVENT_ID = process.env.PW_CIVIL_CREATE_CASE_FLAG_EVENT_ID?.trim() || 'CREATE_CASE_FLAGS';
const CCD_INTERNAL_START_EVENT_HEADERS = {
  experimental: 'true',
  Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json',
} as const;

export class CaseFlagPage extends Base {
  readonly caseFlagLocationQuestion: Locator = this.page.getByText(/Where should this flag be added\?/i).first();
  readonly reviewFlagDetailsHeading: Locator = this.page
    .getByRole('heading', { name: /review flag details|check your answers|review details/i })
    .first();

  private readonly caseAlertSuccessMessage = this.page
    .locator('.hmcts-banner--success .alert-message, .exui-alert .alert-message')
    .first();
  private readonly eventCreationErrorHeading = this.page.getByRole('heading', { name: 'The event could not be created' });

  constructor(page: Page) {
    super(page);
  }

  isCreateCaseFlagBannerVisible(bannerText: string, caseNumber: string): boolean {
    return CREATE_CASE_FLAG_ACTION_LABELS.some((label) =>
      caseBannerMatches(bannerText, caseNumber, `has been updated with event: ${label}`)
    );
  }

  async openCreateCaseFlagEvent(caseDetails: CcdCaseDetails, caseNumber: string): Promise<void> {
    let triggerId = this.resolveCreateCaseFlagTriggerIdFromCaseDetails(caseDetails);
    let probeResults: string[] = [];
    if (!triggerId) {
      const directProbe = await this.resolveCreateCaseFlagTriggerIdViaDirectProbe(caseNumber);
      triggerId = directProbe.triggerId;
      probeResults = directProbe.probeResults;
    }

    if (!triggerId) {
      throw new Error(
        `Create Case Flag event is not available for Civil case ${caseNumber}. ` +
          `State='${resolveCcdCaseStateId(caseDetails) ?? 'unknown'}'. ` +
          `Available triggers: ${this.describeAvailableTriggers(caseDetails) || 'none'}. ` +
          `Direct event probes: ${probeResults.join(' | ') || 'none'}`
      );
    }
    if (triggerId !== EXPECTED_CREATE_CASE_FLAG_EVENT_ID) {
      throw new Error(
        `Expected Civil create-case-flag event '${EXPECTED_CREATE_CASE_FLAG_EVENT_ID}' but resolved '${triggerId}'. ` +
          `Available triggers: ${this.describeAvailableTriggers(caseDetails) || 'none'}`
      );
    }

    await this.page.goto(`/cases/case-details/CIVIL/CIVIL/${caseNumber}/trigger/${triggerId}`);
    await this.exuiSpinnerComponent.wait();
  }

  async completePartyOtherCaseFlagForClaimant1(comment: string): Promise<void> {
    await this.selectPartyFlagLocationForClaimant1();
    await this.selectOtherFlagType();
    await this.addCaseFlagCommentsIfRequested(comment);
    await this.confirmActiveFlagStatusIfRequested();
  }

  async submitCreateCaseFlag(): Promise<void> {
    await this.page.getByRole('button', { name: /^Submit$/i }).click();
    await this.exuiSpinnerComponent.wait();
  }

  async isCreateCaseFlagSuccessVisible(caseNumber: string): Promise<boolean> {
    await this.throwIfCreateCaseFlagErrorVisible();

    const bannerVisible = await this.caseAlertSuccessMessage.isVisible().catch(() => false);
    if (!bannerVisible) {
      return false;
    }

    const bannerText = await this.caseAlertSuccessMessage.innerText();
    return this.isCreateCaseFlagBannerVisible(bannerText, caseNumber);
  }

  private resolveCreateCaseFlagTriggerIdFromCaseDetails(caseDetails: CcdCaseDetails): string | undefined {
    const triggers = Array.isArray(caseDetails.triggers) ? (caseDetails.triggers as CcdCaseTrigger[]) : [];
    return triggers.find((trigger) => trigger.id === EXPECTED_CREATE_CASE_FLAG_EVENT_ID)?.id;
  }

  private describeAvailableTriggers(caseDetails: CcdCaseDetails): string {
    const triggers = Array.isArray(caseDetails.triggers) ? (caseDetails.triggers as CcdCaseTrigger[]) : [];
    return triggers
      .map((trigger) => [trigger.id, trigger.name ?? trigger.label].filter(Boolean).join(': '))
      .filter(Boolean)
      .join(', ');
  }

  private async resolveCreateCaseFlagTriggerIdViaDirectProbe(
    caseNumber: string
  ): Promise<{ probeResults: string[]; triggerId?: string }> {
    const probeResults: string[] = [];
    const path = `data/internal/cases/${encodeURIComponent(caseNumber)}/event-triggers/${encodeURIComponent(
      EXPECTED_CREATE_CASE_FLAG_EVENT_ID
    )}?ignore-warning=false`;
    const response = await this.page.request.get(path, {
      failOnStatusCode: false,
      headers: CCD_INTERNAL_START_EVENT_HEADERS,
      timeout: 15_000,
    });

    if (response.ok()) {
      return { probeResults, triggerId: EXPECTED_CREATE_CASE_FLAG_EVENT_ID };
    }

    const body = await response.text().catch(() => '');
    probeResults.push(
      `${EXPECTED_CREATE_CASE_FLAG_EVENT_ID}: HTTP ${response.status()} ${body.slice(0, 180).replace(/\s+/g, ' ')}`.trim()
    );
    return { probeResults };
  }

  private async throwIfCreateCaseFlagErrorVisible(): Promise<void> {
    if (await this.hasCallbackValidationErrorAlert()) {
      throw new Error('Callback data failed validation while creating Civil party-level case flag.');
    }
    if (await this.eventCreationErrorHeading.isVisible().catch(() => false)) {
      throw new Error('CCD event creation failed while creating Civil party-level case flag.');
    }
  }

  private async hasCallbackValidationErrorAlert(timeoutMs = 1_000): Promise<boolean> {
    return this.page
      .getByRole('alert')
      .filter({ hasText: /callback data failed validation/i })
      .first()
      .isVisible({ timeout: timeoutMs })
      .catch(() => false);
  }

  private async selectFirstVisibleRadio(labels: RegExp[], context: string): Promise<void> {
    const deadline = Date.now() + 60_000;

    while (Date.now() < deadline) {
      for (const label of labels) {
        const radio = this.page.getByLabel(label).first();
        if (await radio.isVisible().catch(() => false)) {
          await radio.check();
          return;
        }
      }

      await this.page.waitForTimeout(500);
    }

    const availableRadioLabels = await this.page
      .locator('label')
      .evaluateAll((labels) =>
        labels.map((label) => label.textContent?.replace(/\s+/g, ' ').trim()).filter((label): label is string => Boolean(label))
      );
    throw new Error(
      `Unable to select radio for ${context}. Tried: ${labels.map((label) => label.toString()).join(', ')}. ` +
        `Available labels: ${availableRadioLabels.join(', ') || 'none'}`
    );
  }

  private async clickCaseFlagNext(): Promise<void> {
    const nextButton = this.page.getByRole('button', { name: /^(Next|Continue)$/i }).first();
    await nextButton.waitFor({ state: 'visible', timeout: 30_000 });
    await nextButton.click();
    await this.page
      .locator('xuilib-loading-spinner')
      .first()
      .waitFor({ state: 'hidden', timeout: 30_000 })
      .catch(() => undefined);
  }

  private async selectPartyFlagLocationForClaimant1(): Promise<void> {
    const partyLevelRadio = this.page.getByLabel(/^Party$/i).first();
    if (await partyLevelRadio.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await partyLevelRadio.check();
      await this.clickCaseFlagNext();
    }

    await this.selectFirstVisibleRadio([/^Claimant 1(?:\s*\(.*\))?$/i, /Claimant 1/i], 'Claimant 1 party flag location');
    await this.clickCaseFlagNext();
  }

  private async selectOtherFlagType(): Promise<void> {
    await this.selectFirstVisibleRadio([/^Other$/i, /Other/i], 'Other flag type');
    await this.clickCaseFlagNext();

    const customFlagTypeInput = this.page.getByLabel(/Enter a flag type|Other description/i).first();
    if (await customFlagTypeInput.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await customFlagTypeInput.fill('Other');
      await this.clickCaseFlagNext();
    }
  }

  private async addCaseFlagCommentsIfRequested(comment: string): Promise<void> {
    const comments = this.page.locator('ccd-add-comments textarea, textarea#flagComments, textarea').first();
    if (await comments.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await comments.fill(comment);
      await this.clickCaseFlagNext();
    }
  }

  private async confirmActiveFlagStatusIfRequested(): Promise<void> {
    const activeRadio = this.page.getByLabel(/^Active$/i).first();
    if (!(await activeRadio.isVisible({ timeout: 3_000 }).catch(() => false))) {
      return;
    }

    await activeRadio.check();
    const reason = this.page.getByLabel(/Describe reason/i).first();
    if (await reason.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await reason.fill('Created for data loss regression coverage');
    }
    await this.clickCaseFlagNext();
  }
}

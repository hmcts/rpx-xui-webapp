import { Page, Locator, expect } from '@playwright/test';
import { createLogger } from '@hmcts/playwright-common';
import { Base } from '../../base';
import { EXUI_TIMEOUTS } from './exui-timeouts';
import { extractCaseNumberFromUrl } from './caseDetails.po';
import { clickSubmitAndWaitFlow, startCreateCaseFlow } from './createCase.flow.js';
import { buildCreateCaseLocators } from './createCase.locators.js';

const logger = createLogger({
  serviceName: 'create-case',
  format: 'pretty',
});

const CRITICAL_WIZARD_API_PATTERNS: RegExp[] = [
  /\/cases\/\d+\/event-triggers\//,
  /\/cases\/\d+\/events/,
  /\/event-triggers\/[^/]+\/validate/,
];

export class CreateCasePage extends Base {
  readonly container!: Locator;
  readonly caseDetailsContainer!: Locator;
  readonly caseAlertSuccessMessage!: Locator;
  readonly createCaseButton!: Locator;
  readonly jurisdictionSelect!: Locator;
  readonly caseTypeSelect!: Locator;
  readonly eventTypeSelect!: Locator;
  readonly startButton!: Locator;
  readonly submitButton!: Locator;
  readonly continueButton!: Locator;

  readonly legalRepParty1Block!: Locator;
  readonly legalRepParty2Block!: Locator;
  readonly party1RoleOnCase!: Locator;
  readonly party1Name!: Locator;
  readonly party1GroupId!: Locator;
  readonly party1Visibility!: Locator;
  readonly party2RoleOnCase!: Locator;
  readonly party2Name!: Locator;
  readonly party2GroupId!: Locator;
  readonly party2Visibility!: Locator;

  readonly textFieldInput!: Locator;
  readonly emailFieldInput!: Locator;
  readonly phoneNumberFieldInput!: Locator;
  readonly dateFieldDayInput!: Locator;
  readonly dateFieldMonthInput!: Locator;
  readonly dateFieldYearInput!: Locator;
  readonly dateTimeFieldDayInput!: Locator;
  readonly dateTimeFieldMonthInput!: Locator;
  readonly dateTimeFieldYearInput!: Locator;
  readonly dateTimeFieldHourInput!: Locator;
  readonly dateTimeFieldMinuteInput!: Locator;
  readonly dateTimeFieldSecondInput!: Locator;
  readonly currencyFieldInput!: Locator;
  readonly yesNoRadioButtons!: Locator;
  readonly applicantPostcode!: Locator;
  readonly complexType1JudgeIsRightRadios!: Locator;
  readonly complexType1LevelOfJudgeRadioButtons!: Locator;
  readonly complexType1LevelOfJudgeDetailsInput!: Locator;
  readonly complexType1LevelOfJudgeKeyInput!: Locator;
  readonly complexType2AddressLine1Input!: Locator;
  readonly complexType2EmailInput!: Locator;
  readonly complexType3ComplianceButton!: Locator;
  readonly complexType3ComplianceInput!: Locator;
  readonly complexType3DateOfBirthDay!: Locator;
  readonly complexType3DateOfBirthMonth!: Locator;
  readonly complexType3DateOfBirthYear!: Locator;
  readonly complexType3FileUploadInput!: Locator;
  readonly complexType3DateOfHearingDay!: Locator;
  readonly complexType3DateOfHearingMonth!: Locator;
  readonly complexType3DateOfHearingYear!: Locator;
  readonly complexType3DateOfHearingHour!: Locator;
  readonly complexType3DateOfHearingMinute!: Locator;
  readonly complexType3DateOfHearingSecond!: Locator;
  readonly complexType4AmountInput!: Locator;
  readonly complexType4FirstTickBox!: Locator;
  readonly complexType4SelectList!: Locator;

  readonly person1Title!: Locator;
  readonly person1FirstNameInput!: Locator;
  readonly person1LastNameInput!: Locator;
  readonly person1GenderSelect!: Locator;
  readonly person1JobTitleInput!: Locator;
  readonly person1JobDescriptionInput!: Locator;
  readonly person2FirstNameInput!: Locator;
  readonly person2LastNameInput!: Locator;
  readonly doYouAgreeGroup!: Locator;
  readonly doYouAgreeYesRadio!: Locator;
  readonly doYouAgreeNoRadio!: Locator;

  readonly fileUploadInput!: Locator;
  readonly fileUploadStatusLabel!: Locator;
  readonly textField0Input!: Locator;
  readonly textField1Input!: Locator;
  readonly textField2Input!: Locator;
  readonly textField3Input!: Locator;
  readonly checkYourAnswersHeading!: Locator;
  readonly testSubmitButton!: Locator;

  readonly receiptDayInput!: Locator;
  readonly receiptMonthInput!: Locator;
  readonly receiptYearInput!: Locator;
  readonly tribunalOfficeSelect!: Locator;
  readonly claimantIndividualRadio!: Locator;
  readonly claimantCompanyRadio!: Locator;
  readonly claimantOrganisationNameInput!: Locator;
  readonly claimantIndividualFirstNameInput!: Locator;
  readonly claimantIndividualLastNameInput!: Locator;
  readonly addRespondentButton!: Locator;
  readonly respondentOneNameInput!: Locator;
  readonly respondentOrganisation!: Locator;
  readonly respondentCompanyNameInput!: Locator;
  readonly respondentAcasCertifcateSelectYes!: Locator;
  readonly respondentAcasCertificateNumberInput!: Locator;
  readonly respondentAddressLine1Input!: Locator;
  readonly respondentAddressPostcodeInput!: Locator;
  readonly sameAsClaimantWorkAddressYes!: Locator;
  readonly claimantRepresentedNo!: Locator;
  readonly hearingPreferenceVideo!: Locator;

  readonly manualEntryLink!: Locator;
  readonly claimantAddressLine1Input!: Locator;
  readonly externalTriageAddressLine1Input!: Locator;
  readonly externalTriagePostTownInput!: Locator;
  readonly externalTriagePostCodeInput!: Locator;
  readonly externalTriageAddressSelect!: Locator;
  readonly postCodeSearchInput!: Locator;
  readonly postCodeSearchButton!: Locator;
  readonly addressSelect!: Locator;

  readonly refreshModal!: Locator;
  readonly refreshModalConfirmButton!: Locator;
  readonly errorMessage!: Locator;
  readonly errorSummary!: Locator;
  readonly eventCreationErrorHeading!: Locator;
  readonly somethingWentWrongHeading!: Locator;

  constructor(page: Page) {
    super(page);
    Object.assign(this, buildCreateCaseLocators(page));
  }

  // CCD select boxes can become visible before their options are hydrated.
  private async waitForSelectReady(selector: string, timeoutMs?: number) {
    const effectiveTimeoutMs = timeoutMs ?? EXUI_TIMEOUTS.WAIT_FOR_SELECT_READY_DEFAULT;
    await this.page.waitForFunction(
      (sel) => {
        const el = document.querySelector(sel);
        return el instanceof HTMLSelectElement && el.options.length > 1 && !el.disabled;
      },
      selector,
      { timeout: effectiveTimeoutMs }
    );
  }

  // CCD mixes option values and labels, so selection needs tolerant matching.
  private async selectOptionSmart(selectLocator: Locator, option: string) {
    await selectLocator.waitFor({ state: 'visible' });
    const options = await selectLocator.evaluate((el) =>
      Array.from((el as HTMLSelectElement).options).map((o) => ({
        value: o.value,
        label: o.label,
      }))
    );

    const normalized = option.toLowerCase();
    const match =
      options.find((o) => o.value === option) ||
      options.find((o) => o.label === option) ||
      options.find((o) => o.value.toLowerCase() === normalized) ||
      options.find((o) => o.label.toLowerCase() === normalized);

    if (!match) {
      const available = options.map((o) => `${o.label} (${o.value})`).join(', ');
      throw new Error(`Option not found for "${option}". Available: ${available}`);
    }

    await selectLocator.selectOption({ value: match.value });
  }

  async assertNoEventCreationError(context: string) {
    const isVisible = await this.eventCreationErrorHeading.isVisible().catch(() => false);
    if (!isVisible) {
      return;
    }
    throw new Error(`Case event failed ${context}: The event could not be created.`);
  }

  private normalizePath(url: string): string {
    return new URL(url, this.page.url()).pathname;
  }

  async waitForCaseDetails(context: string) {
    await this.assertNoEventCreationError(context);
    try {
      await this.caseDetailsContainer.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.CASE_DETAILS_VISIBLE });
    } catch (error) {
      const recovered = await this.recoverCaseDetailsFromCreatedBanner(context, error);
      if (recovered) {
        return;
      }
      throw error;
    }
  }

  private async extractCreatedCaseNumberFromBanner(): Promise<string | null> {
    const bannerVisible = await this.caseAlertSuccessMessage.isVisible().catch(() => false);
    if (!bannerVisible) {
      return null;
    }

    const bannerText = await this.caseAlertSuccessMessage.innerText().catch(() => '');
    if (!/has been created/i.test(bannerText)) {
      return null;
    }

    const numericMatch = /\d{16}/.exec(bannerText.replace(/\D/g, '')); // NOSONAR typescript:S5852 — replaceAll requires ES2021; tsconfig targets ES2020
    return numericMatch?.[0] ?? null;
  }

  private normalizeUnknownError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    try {
      const serialized = JSON.stringify(error);
      return serialized ?? '[Unable to stringify error]';
    } catch {
      return '[Unstringifiable error object]';
    }
  }

  private async recoverCaseDetailsFromCreatedBanner(context: string, initialError: unknown): Promise<boolean> {
    if (this.page.isClosed()) {
      return false;
    }

    const caseNumber = extractCaseNumberFromUrl(this.page.url()) ?? (await this.extractCreatedCaseNumberFromBanner());
    if (!caseNumber) {
      return false;
    }

    const caseDetailsUrl = `/cases/case-details/${caseNumber}`;
    const initialErrorMessage = this.normalizeUnknownError(initialError);
    this.logger.warn('Case details did not render after submit; trying direct case details URL', {
      context,
      caseNumber,
      caseDetailsUrl,
      initialError: initialErrorMessage.slice(0, 220),
    });

    try {
      await this.page.goto(caseDetailsUrl);
      await this.assertNoEventCreationError(`${context} (after direct case details navigation)`);
      await this.caseDetailsContainer.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.CASE_DETAILS_VISIBLE });
      return true;
    } catch (recoveryError) {
      const recoveryErrorMessage = this.normalizeUnknownError(recoveryError);
      this.logger.warn('Direct case details recovery failed', {
        context,
        caseNumber,
        caseDetailsUrl,
        recoveryError: recoveryErrorMessage.slice(0, 220),
      });
      return false;
    }
  }

  private async getVisibleActionButton(buttons: Locator): Promise<Locator | null> {
    let fallbackVisibleButton: Locator | null = null;
    const count = await buttons.count();
    for (let index = count - 1; index >= 0; index -= 1) {
      const candidate = buttons.nth(index);
      const isVisible = await candidate.isVisible().catch(() => false);
      if (!isVisible) {
        continue;
      }
      if (!fallbackVisibleButton) {
        fallbackVisibleButton = candidate;
      }
      const isEnabled = await candidate.isEnabled().catch(() => false);
      if (isEnabled) {
        return candidate;
      }
    }
    return fallbackVisibleButton;
  }

  // Continue clicks need to guard against transient overlays and CCD validation failures.
  private async clickContinueAndWait(
    context: string,
    options: { force?: boolean; timeoutMs?: number; continueButton?: Locator } = {}
  ) {
    const visibleContinueButton = options.continueButton ?? (await this.getVisibleActionButton(this.continueButton));
    if (!visibleContinueButton) {
      throw new Error(`Continue button not visible ${context}`);
    }
    await visibleContinueButton.scrollIntoViewIfNeeded();
    await expect(visibleContinueButton).toBeEnabled();
    const stepTimeout = options.timeoutMs ?? EXUI_TIMEOUTS.CONTINUE_CLICK_DEFAULT;
    const clickTimeout = Math.min(stepTimeout, EXUI_TIMEOUTS.CONTINUE_CLICK_DEFAULT);
    try {
      await visibleContinueButton.click({ force: options.force, timeout: clickTimeout });
    } catch (error) {
      const message = this.normalizeUnknownError(error);
      if (!message.includes('intercepts pointer events')) {
        throw error;
      }
      this.logger.warn('Continue click intercepted by spinner; waiting and retrying click', { context });
      const spinnerSettleTimeout = Math.max(5_000, Math.min(stepTimeout, EXUI_TIMEOUTS.SUBMIT_AUTO_ADVANCE_MAX));
      await this.page
        .locator('xuilib-loading-spinner')
        .first()
        .waitFor({ state: 'hidden', timeout: spinnerSettleTimeout })
        .catch(() => {
          // Best-effort wait; retry click below handles residual spinner overlays.
        });
      try {
        await visibleContinueButton.click({ force: options.force, timeout: clickTimeout });
      } catch (retryError) {
        const retryMessage = this.normalizeUnknownError(retryError);
        if (!retryMessage.includes('intercepts pointer events') || options.force === true) {
          throw retryError;
        }
        this.logger.warn('Continue click still intercepted after wait; retrying with force', { context });
        await visibleContinueButton.click({ force: true, timeout: clickTimeout });
      }
    }
    await this.waitForSpinnerToComplete(`after ${context}`, stepTimeout);
    await this.assertNoEventCreationError(context);
    const hasValidationError = await this.checkForErrorMessage();
    if (hasValidationError) {
      throw new Error(`Validation error after ${context}`);
    }
  }

  async clickContinueAndWaitForNext(context: string, options: { force?: boolean; timeoutMs?: number } = {}) {
    await this.clickContinueAndWait(context, options);
  }

  private async clickSubmitButtonWithRetry(context: string, submitButton?: Locator) {
    const visibleSubmitButton = submitButton ?? (await this.getVisibleActionButton(this.submitButton));
    if (!visibleSubmitButton) {
      throw new Error(`Submit button not visible ${context}`);
    }
    await visibleSubmitButton.scrollIntoViewIfNeeded();
    await expect(visibleSubmitButton).toBeEnabled();
    try {
      await visibleSubmitButton.click({ timeout: EXUI_TIMEOUTS.SUBMIT_CLICK });
    } catch (error) {
      const message = this.normalizeUnknownError(error);
      if (!message.includes('intercepts pointer events')) {
        throw error;
      }
      this.logger.warn('Submit click intercepted; retrying with force', { context });
      await visibleSubmitButton.click({ force: true, timeout: EXUI_TIMEOUTS.SUBMIT_CLICK });
    }
  }

  async clickSubmitAndWait(context: string, options: { timeoutMs?: number; maxAutoAdvanceAttempts?: number } = {}) {
    const timeoutMs = options.timeoutMs ?? this.getRecommendedTimeoutMs();
    const maxAutoAdvanceAttempts =
      options.maxAutoAdvanceAttempts ?? Math.max(2, Math.min(8, Math.floor(timeoutMs / EXUI_TIMEOUTS.SUBMIT_AUTO_ADVANCE_MIN)));
    await clickSubmitAndWaitFlow({
      page: this.page,
      context,
      timeoutMs,
      maxAutoAdvanceAttempts,
      submitButton: this.submitButton,
      continueButton: this.continueButton,
      somethingWentWrongHeading: this.somethingWentWrongHeading,
      getApiCalls: () => this.getApiCalls(),
      getVisibleActionButton: (locator) => this.getVisibleActionButton(locator),
      clickSubmitButtonWithRetry: (submitContext, submitButton) => this.clickSubmitButtonWithRetry(submitContext, submitButton),
      clickContinueAndWait: (continueContext, continueOptions) => this.clickContinueAndWait(continueContext, continueOptions),
      waitForSpinnerToComplete: (spinnerContext, spinnerTimeoutMs) =>
        this.waitForSpinnerToComplete(spinnerContext, spinnerTimeoutMs),
      assertNoEventCreationError: (errorContext) => this.assertNoEventCreationError(errorContext),
      checkForErrorMessage: () => this.checkForErrorMessage(),
      getValidationErrorText: () => this.getValidationErrorText(),
      failFastOnCriticalWizardEndpointFailure: (failureContext, baselineIndex) =>
        this.failFastOnCriticalWizardEndpointFailure(failureContext, baselineIndex),
      warn: (message, meta) => this.logger.warn(message, meta),
    });
  }

  async waitForSpinnerToComplete(context: string, timeoutMs?: number) {
    const effectiveTimeoutMs = timeoutMs ?? this.getRecommendedTimeoutMs();
    const spinner = this.page.locator('xuilib-loading-spinner').first();
    try {
      await spinner.waitFor({ state: 'hidden', timeout: effectiveTimeoutMs });
    } catch (error) {
      const stillVisible = await spinner.isVisible().catch(() => false);
      if (stillVisible) {
        throw new Error(`Spinner still visible ${context}`);
      }
      this.logger.warn('Spinner hidden wait failed, proceeding because spinner not visible', { context, error });
    }
  }

  private failFastOnCriticalWizardEndpointFailure(context: string, baselineIndex = 0) {
    // Only inspect calls seen during the current submit cycle to avoid stale failures from earlier actions.
    const recentCalls = this.getApiCalls().slice(Math.max(0, baselineIndex));
    const criticalFailure = recentCalls.find(
      (call) => call.status >= 500 && CRITICAL_WIZARD_API_PATTERNS.some((pattern) => pattern.test(call.url))
    );

    if (criticalFailure) {
      throw new Error(
        `Critical wizard endpoint failure ${context}: ${criticalFailure.method} ${criticalFailure.url} returned HTTP ${criticalFailure.status}`
      );
    }
  }

  // CCD can complete the spinner before the next step is actually rendered.
  async ensureWizardAdvanced(
    context: string,
    initialUrl: string,
    options: {
      expectedPathIncludes?: string;
      expectedLocator?: Locator;
      timeoutMs?: number;
    } = {}
  ) {
    const timeoutMs = options.timeoutMs ?? EXUI_TIMEOUTS.WIZARD_ADVANCE_DEFAULT;
    const initialPath = this.normalizePath(initialUrl);
    const expectedPathIncludes = options.expectedPathIncludes;
    const expectedLocator = options.expectedLocator;
    const waitForAdvance = async () => {
      if (expectedPathIncludes) {
        await this.page.waitForURL((url) => url.pathname.includes(expectedPathIncludes), { timeout: timeoutMs });
      } else {
        await this.page.waitForURL((url) => this.normalizePath(url.toString()) !== initialPath, { timeout: timeoutMs });
      }
      if (expectedLocator) {
        await expectedLocator.waitFor({ state: 'visible', timeout: timeoutMs });
      }
    };

    try {
      await waitForAdvance();
      return;
    } catch {
      if (this.page.isClosed()) {
        throw new Error(`Page closed while waiting for wizard to advance after ${context}`);
      }
      const hasValidationError = await this.checkForErrorMessage();
      if (hasValidationError) {
        throw new Error(`Validation error after ${context}`);
      }
      if (this.page.isClosed()) {
        throw new Error(`Page closed before retrying wizard advance after ${context}`);
      }
      const visibleContinueButton = await this.getVisibleActionButton(this.continueButton);
      if (!visibleContinueButton) {
        throw new Error(`Continue button not visible while retrying wizard advance after ${context}`);
      }
      await this.clickContinueAndWait(`while retrying wizard advance after ${context}`, {
        continueButton: visibleContinueButton,
        timeoutMs,
      });
      await waitForAdvance();
    }
  }

  async clickContinueMultipleTimes(count: number, options: { force?: boolean } = {}) {
    for (let i = 0; i < count; i++) {
      const visibleContinueButton = await this.getVisibleActionButton(this.continueButton);
      if (!visibleContinueButton) {
        logger.info('Continue button not visible; stopping early', {
          iteration: i + 1,
          total: count,
        });
        break;
      }
      await this.clickContinueAndWait(`after continue ${i + 1} of ${count}`, {
        continueButton: visibleContinueButton,
        force: options.force,
      });
      logger.info('Clicked continue button', { iteration: i + 1, total: count });
    }
  }

  async checkForErrorMessage(message?: string, timeout = EXUI_TIMEOUTS.VALIDATION_ERROR_VISIBLE): Promise<boolean> {
    const check = async (sel: Locator) => {
      try {
        await sel.waitFor({ state: 'visible', timeout });
        if (message) {
          const txt = await sel.textContent();
          return !!txt && txt.includes(message);
        }
        return true;
      } catch {
        // Element not found or timeout - expected when no error present
        return false;
      }
    };

    const [a, b] = await Promise.all([check(this.errorMessage), check(this.errorSummary)]);

    const safeErrorMeta = async (
      sel: Locator
    ): Promise<{ present: boolean; length: number; containsCaseReference: boolean; containsEmail: boolean } | null> => {
      const visible = await sel.isVisible().catch(() => false);
      if (!visible) {
        return null;
      }
      return sel
        .first()
        .innerText({ timeout: EXUI_TIMEOUTS.ERROR_META_TEXT_READ })
        .then((text) => {
          const trimmed = text.trim();
          return {
            present: true,
            length: trimmed.length,
            containsCaseReference: /\b\d{16}\b/.test(trimmed),
            containsEmail: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(trimmed),
          };
        })
        .catch(() => null);
    };

    if (a || b) {
      logger.error('Error message displayed on page', {
        errorMessageMeta: a ? await safeErrorMeta(this.errorMessage) : null,
        errorSummaryMeta: b ? await safeErrorMeta(this.errorSummary) : null,
      });
      return true;
    }

    return false;
  }

  private async getValidationErrorText(): Promise<string> {
    const readText = async (locator: Locator): Promise<string> => {
      const visible = await locator.isVisible().catch(() => false);
      if (!visible) {
        return '';
      }
      return locator
        .first()
        .innerText({ timeout: EXUI_TIMEOUTS.ERROR_META_TEXT_READ })
        .then((text) => text.trim())
        .catch(() => '');
    };

    const [errorText, summaryText] = await Promise.all([readText(this.errorMessage), readText(this.errorSummary)]);
    return [errorText, summaryText].filter(Boolean).join(' | ');
  }

  async ensureDoYouAgreeAnswered(answer: 'Yes' | 'No' = 'Yes') {
    const groupVisible = await this.doYouAgreeGroup
      .first()
      .isVisible()
      .catch(() => false);
    if (!groupVisible) {
      return;
    }

    const target = answer === 'Yes' ? this.doYouAgreeYesRadio : this.doYouAgreeNoRadio;
    const alreadyChecked = await target.isChecked().catch(() => false);
    if (!alreadyChecked) {
      await target.check();
    }
  }

  async createCase(
    jurisdiction: string,
    caseType: string,
    eventType: string | undefined,
    options: {
      maxAttempts?: number;
    } = {}
  ) {
    const maxAttempts = options.maxAttempts ?? 2;
    await startCreateCaseFlow({
      page: this.page,
      jurisdiction,
      caseType,
      eventType,
      maxAttempts,
      createCaseButton: this.createCaseButton,
      jurisdictionSelect: this.jurisdictionSelect,
      caseTypeSelect: this.caseTypeSelect,
      eventTypeSelect: this.eventTypeSelect,
      startButton: this.startButton,
      somethingWentWrongHeading: this.somethingWentWrongHeading,
      getApiCalls: () => this.getApiCalls(),
      waitForSelectReady: (selector, timeoutMs) => this.waitForSelectReady(selector, timeoutMs),
      selectOptionSmart: (selectLocator, option) => this.selectOptionSmart(selectLocator, option),
      normalizeUnknownError: (error) => this.normalizeUnknownError(error),
      warn: (message, meta) => logger.warn(message, meta),
      debug: (message, meta) => logger.debug(message, meta),
    });
  }

  async addressLookup(postCode: string, addressOption: string) {
    await this.postCodeSearchInput.fill(postCode);
    await this.postCodeSearchButton.click();
    await this.addressSelect.selectOption(addressOption);
  }

  async uploadFile(fileName: string, mimeType: string, fileContent: string, fileInput?: Locator) {
    const maxRetries = 3;
    const baseDelayMs = 3000; // initial backoff
    const resolvedFileInput = fileInput ?? this.page.locator('input[type="file"]').first();
    const safeBackoff = async (attempt: number) => {
      if (this.page.isClosed()) {
        throw new Error('Page closed during upload retry backoff');
      }
      await this.page.waitForTimeout(baseDelayMs * Math.pow(2, attempt - 1));
    };

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      if (this.page.isClosed()) {
        throw new Error('Page closed before upload retry attempt');
      }
      const responsePromise = this.page.waitForResponse((r) => r.url().includes('/document') && r.request().method() === 'POST', {
        timeout: EXUI_TIMEOUTS.UPLOAD_RESPONSE,
      });
      await resolvedFileInput.setInputFiles({
        name: fileName,
        mimeType,
        buffer: Buffer.from(fileContent),
      });

      const res = await responsePromise.catch(() => null);

      if (!res) {
        // no response within timeout — treat as failure or retry depending on policy
        if (attempt < maxRetries) {
          await safeBackoff(attempt);
          continue;
        } else {
          throw new Error('Upload timed out after retries');
        }
      }

      if (res.status() !== 200) {
        if (attempt < maxRetries) {
          // exponential backoff before retrying
          await safeBackoff(attempt);
          continue;
        } else {
          throw new Error(`Upload failed: server returned status ${res.status()} after ${maxRetries} retries`);
        }
      }

      break;
    }
    await this.fileUploadStatusLabel.waitFor({ state: 'hidden' });
  }
}

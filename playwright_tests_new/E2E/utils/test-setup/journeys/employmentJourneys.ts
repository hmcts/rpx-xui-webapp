import { createLogger } from '@hmcts/playwright-common';
import { randomUUID } from 'node:crypto';

import type { CreateCasePage } from '../../../page-objects/pages/exui/createCase.po';
import type { Locator, Page } from '@playwright/test';
import { uploadDocumentViaApi } from '../uploadDocumentViaApi';

const logger = createLogger({
  serviceName: 'employment-case-journeys',
  format: 'pretty',
});

type CreateEmploymentCaseOptions = {
  allowDraftClaimFallback?: boolean;
  preferDraftClaim?: boolean;
};

type RespondentDetailsState = {
  respondentOrganisationChecked: boolean;
  respondentOrganisationVisible: boolean;
  respondentOrganisationEnabled: boolean;
  respondentCompanyNameVisible: boolean;
  respondentCompanyNameEnabled: boolean;
  respondentAcasQuestionVisible: boolean;
  respondentAcasQuestionEnabled: boolean;
};

type RespondentDetailsAction = 'select-organisation' | 'use-company-page-state' | 'use-name-only-page-state';

type InternalEventTriggerResponse = {
  event_token?: string;
};

const CCD_INTERNAL_START_EVENT_HEADERS = {
  experimental: 'true',
  Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json',
} as const;

const CCD_CREATE_EVENT_HEADERS = {
  experimental: 'true',
  Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json',
  'Content-Type': 'application/json',
} as const;

function resolveRespondentDetailsAction(state: RespondentDetailsState): RespondentDetailsAction {
  if (state.respondentOrganisationChecked) {
    if (state.respondentCompanyNameVisible && state.respondentCompanyNameEnabled) {
      return 'use-company-page-state';
    }
    throw new Error('Employment create: respondent organisation is selected but company name field is not ready.');
  }

  if (state.respondentOrganisationVisible && state.respondentOrganisationEnabled) {
    return 'select-organisation';
  }

  if (state.respondentCompanyNameVisible && state.respondentCompanyNameEnabled) {
    return 'use-company-page-state';
  }

  if (state.respondentAcasQuestionVisible && state.respondentAcasQuestionEnabled) {
    return 'use-name-only-page-state';
  }

  throw new Error(
    'Employment create: respondent details page shape is invalid; no supported organisation, company, or name-only controls are ready.'
  );
}

async function isLocatorChecked(locator: Locator): Promise<boolean> {
  if ((await locator.count().catch(() => 0)) === 0) {
    return false;
  }
  return locator
    .first()
    .isChecked({ timeout: 0 })
    .catch(() => false);
}

async function isLocatorVisible(locator: Locator): Promise<boolean> {
  if ((await locator.count().catch(() => 0)) === 0) {
    return false;
  }
  return locator
    .first()
    .isVisible()
    .catch(() => false);
}

async function isLocatorEnabled(locator: Locator): Promise<boolean> {
  if ((await locator.count().catch(() => 0)) === 0) {
    return false;
  }
  return locator
    .first()
    .isEnabled({ timeout: 0 })
    .catch(() => false);
}

export async function uploadEmploymentDraftDocument(
  createCasePage: CreateCasePage,
  fileName: string,
  mimeType: string,
  fileContent: string | Buffer
): Promise<void> {
  await prepareEmploymentDraftUploadPage(createCasePage);
  await clickEmploymentDocumentCollectionAddButton(createCasePage);
  await createCasePage.uploadFile(fileName, mimeType, fileContent);
  await createCasePage.selectEmploymentDocumentCategory('Misc', 'Other');
  await createCasePage.clickSubmitAndWait('after uploading employment document', {
    timeoutMs: 60_000,
    maxAutoAdvanceAttempts: 1,
  });
  await createCasePage.waitForCaseDetails('after uploading employment document');
}

export async function completeEmploymentDraftUpdate(createCasePage: CreateCasePage): Promise<void> {
  const maxAdvanceAttempts = 12;
  for (let attempt = 1; attempt <= maxAdvanceAttempts; attempt += 1) {
    if (!createCasePage.page.url().includes('/trigger/UPDATE_CASE_DRAFT/')) {
      await createCasePage.waitForCaseDetails('after completing employment draft update');
      return;
    }

    await createCasePage.assertNoEventCreationError(`during employment draft update completion (attempt ${attempt})`);
    await ensureEmploymentDraftReceiptDetails(createCasePage);
    await ensureEmploymentDraftClaimantDetails(createCasePage);
    await ensureEmploymentDraftRespondentCollectionItem(createCasePage);
    await ensureEmploymentDraftWorkAddressAnswered(createCasePage);
    await ensureEmploymentDraftClaimantRepresentationAnswered(createCasePage);
    await ensureEmploymentDraftHearingPreferenceAnswered(createCasePage);
    await ensureEmploymentDraftClaimDetails(createCasePage);

    if (await createCasePage.submitButton.isVisible().catch(() => false)) {
      await createCasePage.clickSubmitAndWait(`employment draft update completion step ${attempt}`, {
        timeoutMs: 60_000,
        maxAutoAdvanceAttempts: 1,
      });
      await createCasePage.waitForCaseDetails('after completing employment draft update');
      return;
    }

    if (!(await createCasePage.hasVisibleContinueButton())) {
      throw new Error(
        `Employment draft update could not continue; no Continue or Submit button visible at ${createCasePage.page.url()}`
      );
    }
    await advanceEmploymentDraftUpdateStep(createCasePage, attempt);
  }

  throw new Error(`Employment draft update did not complete after ${maxAdvanceAttempts} steps`);
}

export async function uploadEmploymentDraftDocumentViaApi(options: {
  page: Page;
  caseNumber: string;
  fileName: string;
  mimeType: string;
  fileContent: string | Buffer;
  topLevelDocuments?: string;
  miscDocuments?: string;
}): Promise<void> {
  const uploadedDocument = await uploadDocumentViaApi({
    page: options.page,
    jurisdictionId: 'EMPLOYMENT',
    caseTypeId: 'ET_EnglandWales',
    fileName: options.fileName,
    mimeType: options.mimeType,
    fileContent: options.fileContent,
  });

  const eventId = 'uploadDocument';
  const eventTriggerPath = `data/internal/cases/${encodeURIComponent(options.caseNumber)}/event-triggers/${encodeURIComponent(
    eventId
  )}?ignore-warning=false`;
  const eventTriggerResponse = await options.page.request.get(eventTriggerPath, {
    failOnStatusCode: false,
    headers: CCD_INTERNAL_START_EVENT_HEADERS,
    timeout: 60_000,
  });
  if (!eventTriggerResponse.ok()) {
    const body = await eventTriggerResponse.text().catch(() => '');
    throw new Error(
      `Employment document setup failed to fetch event trigger (HTTP ${eventTriggerResponse.status()}). ` +
        `Path='${eventTriggerPath}'. Body='${body.slice(0, 500)}'`
    );
  }

  const eventTrigger = (await eventTriggerResponse.json()) as InternalEventTriggerResponse;
  const eventToken = eventTrigger.event_token?.trim();
  if (!eventToken) {
    throw new Error('Employment document setup event trigger did not include event_token.');
  }

  const eventBody = {
    data: {
      documentCollection: [
        {
          id: randomUUID(),
          value: {
            uploadedDocument: uploadedDocument,
            topLevelDocuments: options.topLevelDocuments ?? 'Misc',
            miscDocuments: options.miscDocuments ?? 'Other',
          },
        },
      ],
    },
    event: {
      id: eventId,
      summary: 'Upload document for case file view',
      description: 'Uploaded via Playwright CCD API helper',
    },
    event_token: eventToken,
    ignore_warning: false,
  };

  const submitPath = `data/cases/${encodeURIComponent(options.caseNumber)}/events`;
  const submitResponse = await options.page.request.post(submitPath, {
    data: eventBody,
    failOnStatusCode: false,
    headers: CCD_CREATE_EVENT_HEADERS,
    timeout: 60_000,
  });
  if (!submitResponse.ok()) {
    const body = await submitResponse.text().catch(() => '');
    throw new Error(
      `Employment document setup submit failed (HTTP ${submitResponse.status()}). ` +
        `Path='${submitPath}'. Body='${body.slice(0, 500)}'`
    );
  }
}

export async function createEmploymentCase(
  createCasePage: CreateCasePage,
  jurisdiction: string,
  caseType: string,
  options: CreateEmploymentCaseOptions = {}
): Promise<void> {
  const maxAttempts = 2;
  const preferredEventLabels = options.preferDraftClaim
    ? ['Create draft claim', 'Create Case']
    : options.allowDraftClaimFallback
      ? ['Create Case', 'Create draft claim']
      : ['Create Case'];

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      let lastSelectionError: unknown;
      for (const eventLabel of preferredEventLabels) {
        try {
          await createCasePage.createCase(jurisdiction, caseType, eventLabel);
          lastSelectionError = undefined;
          break;
        } catch (error) {
          lastSelectionError = error;
          const message = describeUnknownError(error);
          const missingRequestedOption = message.includes(`Option not found for "${eventLabel}"`);
          const canTryAlternateEvent = missingRequestedOption && eventLabel !== preferredEventLabels.at(-1);
          if (canTryAlternateEvent) {
            logger.info('Employment case creation event label unavailable; trying fallback label', {
              attempt,
              requestedEventLabel: eventLabel,
            });
            continue;
          }
          throw error;
        }
      }

      if (lastSelectionError) {
        throw lastSelectionError;
      }

      logger.info('Employment case creation started', {
        attempt,
        jurisdiction,
        caseType,
        url: createCasePage.page.url(),
      });
      await createCasePage.assertNoEventCreationError('after starting employment case');
      const isExternalDraftClaimFlow =
        createCasePage.page.url().includes('/et1ReppedCreateCase/') ||
        (await createCasePage.postCodeSearchInput.isVisible().catch(() => false));

      if (isExternalDraftClaimFlow) {
        await createCasePage.postCodeSearchInput.waitFor({ state: 'visible' });
        logger.info('Employment create: external draft claim triage page ready', {
          attempt,
          url: createCasePage.page.url(),
        });
        const claimantWorkLocationPostcode = 'SW20 0BX';
        await createCasePage.postCodeSearchInput.fill(claimantWorkLocationPostcode);
        await createCasePage.postCodeSearchButton.click();
        const resolvedAddressMode = await Promise.race([
          createCasePage.externalTriageAddressSelect.waitFor({ state: 'visible' }).then(() => 'address-select' as const),
          createCasePage.externalTriageAddressLine1Input.waitFor({ state: 'visible' }).then(() => 'manual-address' as const),
        ]);

        if (resolvedAddressMode === 'address-select') {
          const addressOptions = await createCasePage.externalTriageAddressSelect.evaluate((element) => {
            const select = element as HTMLSelectElement;
            return Array.from(select.options).map((option) => ({
              text: option.text.trim(),
              value: option.value,
            }));
          });
          const firstResolvedAddressValue = addressOptions.find(
            (option) => option.value && option.value.trim().length > 0 && !/no address found/i.test(option.text)
          )?.value;
          if (firstResolvedAddressValue) {
            await createCasePage.externalTriageAddressSelect.selectOption(firstResolvedAddressValue);
          } else {
            await createCasePage.manualEntryLink.waitFor({ state: 'visible' });
            await createCasePage.manualEntryLink.click();
            await createCasePage.externalTriageAddressLine1Input.waitFor({ state: 'visible' });
            await createCasePage.externalTriageAddressLine1Input.fill('1 Test Street');
            await createCasePage.externalTriagePostTownInput.fill('London');
            await createCasePage.externalTriagePostCodeInput.fill(claimantWorkLocationPostcode);
          }
        } else {
          await createCasePage.externalTriageAddressLine1Input.waitFor({ state: 'visible' });
          await createCasePage.externalTriageAddressLine1Input.fill('1 Test Street');
          await createCasePage.externalTriagePostTownInput.fill('London');
          await createCasePage.externalTriagePostCodeInput.fill(claimantWorkLocationPostcode);
        }

        logger.info('Employment create: external draft claim work location resolved', {
          attempt,
          url: createCasePage.page.url(),
          mode: resolvedAddressMode,
        });
        await createCasePage.clickSubmitAndWait('after external draft claim work location', {
          timeoutMs: 60_000,
          maxAutoAdvanceAttempts: 1,
        });
        await createCasePage.waitForCaseDetails('after submitting employment draft claim');
        logger.info('Employment create: case details loaded', { attempt, url: createCasePage.page.url() });
        return;
      }

      await createCasePage.receiptDayInput.waitFor({ state: 'visible' });
      logger.info('Employment create: receipt details page ready', {
        attempt,
        url: createCasePage.page.url(),
      });
      const today = new Date();
      await createCasePage.receiptDayInput.fill(today.getDate().toString());
      await createCasePage.receiptMonthInput.fill((today.getMonth() + 1).toString());
      await createCasePage.receiptYearInput.fill(today.getFullYear().toString());
      await createCasePage.tribunalOfficeSelect.selectOption('Leeds');

      const receiptUrl = createCasePage.page.url();
      await createCasePage.clickContinueAndWaitForNext('after receipt details');
      await createCasePage.ensureWizardAdvanced('after receipt details', receiptUrl, {
        expectedPathIncludes: 'initiateCase2',
        expectedLocator: createCasePage.claimantIndividualRadio,
      });
      logger.info('Employment create: claimant details page ready', {
        attempt,
        url: createCasePage.page.url(),
      });
      await createCasePage.claimantIndividualRadio.check();
      await createCasePage.claimantIndividualFirstNameInput.fill('Test ');
      await createCasePage.claimantIndividualLastNameInput.fill('Person');
      await createCasePage.manualEntryLink.waitFor({ state: 'visible' });
      await createCasePage.manualEntryLink.click();
      await createCasePage.claimantAddressLine1Input.waitFor({ state: 'visible' });
      await createCasePage.claimantAddressLine1Input.fill('1 Test Street');

      await createCasePage.clickContinueAndWaitForNext('after claimant address');
      logger.info('Employment create: respondent details page ready', {
        attempt,
        url: createCasePage.page.url(),
      });

      await createCasePage.addRespondentButton.waitFor({ state: 'visible' });
      await createCasePage.addRespondentButton.click();
      await createCasePage.respondentOneNameInput.waitFor({ state: 'visible' });
      await createCasePage.respondentOneNameInput.fill('Respondent One');
      const respondentState: RespondentDetailsState = {
        respondentOrganisationChecked: await isLocatorChecked(createCasePage.respondentOrganisation),
        respondentOrganisationVisible: await isLocatorVisible(createCasePage.respondentOrganisation),
        respondentOrganisationEnabled: await isLocatorEnabled(createCasePage.respondentOrganisation),
        respondentCompanyNameVisible: await isLocatorVisible(createCasePage.respondentCompanyNameInput),
        respondentCompanyNameEnabled: await isLocatorEnabled(createCasePage.respondentCompanyNameInput),
        respondentAcasQuestionVisible: await isLocatorVisible(createCasePage.respondentAcasCertificateYesLabel),
        respondentAcasQuestionEnabled: await isLocatorEnabled(createCasePage.respondentAcasCertificateYesLabel),
      };
      const respondentDetailsAction = resolveRespondentDetailsAction(respondentState);

      if (respondentDetailsAction === 'select-organisation') {
        await createCasePage.respondentOrganisation.check();
        logger.info('Employment create: respondent organisation type selected explicitly', {
          attempt,
          url: createCasePage.page.url(),
        });
      } else if (respondentDetailsAction === 'use-company-page-state') {
        logger.info('Employment create: respondent organisation type already fixed by the page state', {
          attempt,
          url: createCasePage.page.url(),
        });
      } else {
        logger.info('Employment create: respondent details page uses name-only respondent shape', {
          attempt,
          url: createCasePage.page.url(),
        });
      }

      await createCasePage.respondentAcasCertificateYesLabel.waitFor({ state: 'visible' });
      await createCasePage.respondentAcasCertificateYesLabel.click();
      await createCasePage.respondentAcasCertificateNumberInput.fill('ACAS123456');
      if (respondentDetailsAction !== 'use-name-only-page-state') {
        if (
          !(await createCasePage.respondentCompanyNameInput.isVisible().catch(() => false)) ||
          !(await createCasePage.respondentCompanyNameInput.isEnabled().catch(() => false))
        ) {
          throw new Error(
            `Employment create: respondent company name field is not ready after organisation selection. URL='${createCasePage.page.url()}'.`
          );
        }
        await createCasePage.respondentCompanyNameInput.fill('Respondent Company');
        logger.info('Employment create: respondent company name captured', {
          attempt,
          url: createCasePage.page.url(),
        });
      }
      await createCasePage.manualEntryLink.waitFor({ state: 'visible' });
      await createCasePage.manualEntryLink.click();
      await createCasePage.respondentAddressLine1Input.waitFor({ state: 'visible' });
      await createCasePage.respondentAddressLine1Input.fill('1 Respondent Street');
      await createCasePage.respondentAddressPostcodeInput.waitFor({ state: 'visible' });
      await createCasePage.respondentAddressPostcodeInput.fill('SW1A 1AA');

      await createCasePage.clickContinueAndWaitForNext('after respondent details');
      logger.info('Employment create: work address page ready', {
        attempt,
        url: createCasePage.page.url(),
      });

      if (await createCasePage.sameAsClaimantWorkAddressYes.isVisible().catch(() => false)) {
        await createCasePage.sameAsClaimantWorkAddressYes.click();
        logger.info('Employment create: work address confirmation selected', {
          attempt,
          url: createCasePage.page.url(),
        });

        await createCasePage.clickContinueAndWaitForNext('after work address confirmation');
        logger.info('Employment create: claim details page ready', {
          attempt,
          url: createCasePage.page.url(),
        });
      } else {
        logger.info('Employment create: work address confirmation not shown; advancing with current wizard state', {
          attempt,
          url: createCasePage.page.url(),
        });
      }

      if (!(await createCasePage.claimantRepresentedNo.isVisible().catch(() => false))) {
        await createCasePage.clickContinueAndWaitForNext('after claim details');
      }

      await createCasePage.claimantRepresentedNo.waitFor({ state: 'visible' });
      logger.info('Employment create: claimant representation page ready', {
        attempt,
        url: createCasePage.page.url(),
      });
      await createCasePage.claimantRepresentedNo.click();

      await createCasePage.clickContinueAndWaitForNext('after claimant representation');

      await createCasePage.hearingPreferenceVideo.waitFor({ state: 'visible' });
      logger.info('Employment create: hearing preference page ready', {
        attempt,
        url: createCasePage.page.url(),
      });
      await createCasePage.hearingPreferenceVideo.click();

      await createCasePage.clickSubmitAndWait('after hearing preference selection', {
        timeoutMs: 60_000,
        maxAutoAdvanceAttempts: 1,
      });
      await createCasePage.waitForCaseDetails('after submitting employment case');
      logger.info('Employment create: case details loaded', {
        attempt,
        url: createCasePage.page.url(),
      });
      return;
    } catch (error) {
      const eventErrorVisible = await createCasePage.eventCreationErrorHeading.isVisible().catch(() => false);
      if (eventErrorVisible && attempt < maxAttempts) {
        logger.warn('Employment case creation failed; retrying', { attempt, maxAttempts });
        await createCasePage.page.goto('/cases/case-filter');
        continue;
      }
      throw error;
    }
  }
}

async function prepareEmploymentDraftUploadPage(createCasePage: CreateCasePage): Promise<void> {
  const maxAdvanceAttempts = 8;
  for (let attempt = 1; attempt <= maxAdvanceAttempts; attempt += 1) {
    if (await createCasePage.isEmploymentDocumentUploadReady()) {
      logger.info('Employment draft update: document upload controls ready', {
        attempt,
        url: createCasePage.page.url(),
      });
      return;
    }

    await createCasePage.assertNoEventCreationError(`during employment draft upload preparation (attempt ${attempt})`);
    await ensureEmploymentDraftReceiptDetails(createCasePage);
    await ensureEmploymentDraftClaimantDetails(createCasePage);
    await ensureEmploymentDraftRespondentCollectionItem(createCasePage);
    await ensureEmploymentDraftWorkAddressAnswered(createCasePage);
    await ensureEmploymentDraftClaimantRepresentationAnswered(createCasePage);
    await ensureEmploymentDraftHearingPreferenceAnswered(createCasePage);
    await ensureEmploymentDraftClaimDetails(createCasePage);

    if (!(await createCasePage.hasVisibleContinueButton())) {
      throw new Error(
        `Employment draft update did not reach a document upload page; no Continue button visible at ${createCasePage.page.url()}`
      );
    }
    await createCasePage.clickContinueAndWaitForNext(`employment draft upload preparation step ${attempt}`);
  }

  throw new Error(`Employment draft update did not reach the document upload page after ${maxAdvanceAttempts} steps`);
}

async function ensureEmploymentDraftReceiptDetails(createCasePage: CreateCasePage): Promise<void> {
  if (!createCasePage.page.url().includes('/UPDATE_CASE_DRAFT/UPDATE_CASE_DRAFT1')) {
    return;
  }

  const today = new Date();
  if (!(await createCasePage.receiptDayInput.inputValue().catch(() => ''))) {
    await createCasePage.receiptDayInput.fill(today.getDate().toString());
  }
  if (!(await createCasePage.receiptMonthInput.inputValue().catch(() => ''))) {
    await createCasePage.receiptMonthInput.fill((today.getMonth() + 1).toString());
  }
  if (!(await createCasePage.receiptYearInput.inputValue().catch(() => ''))) {
    await createCasePage.receiptYearInput.fill(today.getFullYear().toString());
  }

  const digitalCaseReferenceInput = createCasePage.page.getByLabel('Digital Case Reference');
  if (!(await digitalCaseReferenceInput.inputValue().catch(() => ''))) {
    const caseNumber = createCasePage.page.url().match(/\b\d{16}\b/)?.[0];
    if (!caseNumber) {
      throw new Error(`Employment draft update could not derive digital case reference from ${createCasePage.page.url()}`);
    }
    await digitalCaseReferenceInput.fill(caseNumber);
  }

  const tribunalOfficeSelect = createCasePage.page.getByLabel('Tribunal Office');
  const selectedTribunalOffice = await tribunalOfficeSelect.inputValue().catch(() => '');
  if (isUnselectedCcdFixedListValue(selectedTribunalOffice)) {
    await tribunalOfficeSelect.selectOption({ label: 'Leeds' });
    const selectedAfter = await tribunalOfficeSelect.inputValue().catch(() => '');
    if (isUnselectedCcdFixedListValue(selectedAfter)) {
      throw new Error('Employment draft update could not select Tribunal Office.');
    }
  }
}

async function advanceEmploymentDraftUpdateStep(createCasePage: CreateCasePage, attempt: number): Promise<void> {
  const initialUrl = createCasePage.page.url();
  await createCasePage.continueButton.waitFor({ state: 'visible', timeout: 15_000 });
  await createCasePage.continueButton.focus({ timeout: 15_000 });
  await Promise.all([
    createCasePage.page.waitForURL((url) => url.toString() !== initialUrl, { timeout: 30_000 }),
    createCasePage.page.keyboard.press('Enter'),
  ]);
  await createCasePage.page.waitForLoadState('domcontentloaded', { timeout: 5_000 }).catch(() => {
    // CCD wizard pages can keep long-running network activity open; the URL change is the contract here.
  });
  await createCasePage.assertNoEventCreationError(`after employment draft update completion step ${attempt}`);
}

function isUnselectedCcdFixedListValue(value: string): boolean {
  const normalizedValue = value.trim();
  return !normalizedValue || normalizedValue === '--Select a value--' || normalizedValue.endsWith(': null');
}

async function ensureEmploymentDraftClaimantDetails(createCasePage: CreateCasePage): Promise<void> {
  if (!createCasePage.page.url().includes('/UPDATE_CASE_DRAFT/UPDATE_CASE_DRAFT2')) {
    return;
  }

  if (!(await createCasePage.claimantIndividualRadio.isChecked().catch(() => false))) {
    await createCasePage.claimantIndividualRadio.check();
  }

  if (await createCasePage.claimantIndividualFirstNameInput.isVisible().catch(() => false)) {
    if (!(await createCasePage.claimantIndividualFirstNameInput.inputValue().catch(() => ''))) {
      await createCasePage.claimantIndividualFirstNameInput.fill('Test');
    }
  }

  if (await createCasePage.claimantIndividualLastNameInput.isVisible().catch(() => false)) {
    if (!(await createCasePage.claimantIndividualLastNameInput.inputValue().catch(() => ''))) {
      await createCasePage.claimantIndividualLastNameInput.fill('Person');
    }
  }

  if (!(await createCasePage.claimantAddressLine1Input.isVisible().catch(() => false))) {
    await createCasePage.manualEntryLink.waitFor({ state: 'visible' });
    await createCasePage.manualEntryLink.click();
  }

  await createCasePage.claimantAddressLine1Input.waitFor({ state: 'visible' });
  if (!(await createCasePage.claimantAddressLine1Input.inputValue().catch(() => ''))) {
    await createCasePage.claimantAddressLine1Input.fill('1 Test Street');
  }
}

async function clickEmploymentDocumentCollectionAddButton(createCasePage: CreateCasePage): Promise<void> {
  await createCasePage.clickEmploymentDocumentCollectionAddButton();
}

async function ensureEmploymentDraftRespondentCollectionItem(createCasePage: CreateCasePage): Promise<void> {
  if (!createCasePage.page.url().includes('/UPDATE_CASE_DRAFT3')) {
    return;
  }

  if (!(await createCasePage.hasEmploymentDraftRespondentCollectionItem())) {
    await createCasePage.addRespondentButton.waitFor({ state: 'visible' });
    await createCasePage.addRespondentButton.click();
    await createCasePage.expectEmploymentDraftRespondentCollectionItemAttached();
    logger.info('Employment draft update: added minimal respondent collection item', {
      url: createCasePage.page.url(),
    });
  }

  await createCasePage.respondentOneNameInput.waitFor({ state: 'visible' });
  if (!(await createCasePage.respondentOneNameInput.inputValue().catch(() => ''))) {
    await createCasePage.respondentOneNameInput.fill('Respondent One');
  }

  const acasCertificateQuestion = createCasePage.page.getByRole('group', {
    name: /Is there an ACAS Certificate number\?/,
  });
  const acasCertificateNo = acasCertificateQuestion.getByRole('radio', { name: 'No' });
  if (!(await acasCertificateNo.isChecked().catch(() => false))) {
    await acasCertificateNo.check();
  }

  const noAcasReasonQuestion = createCasePage.page.getByRole('group', {
    name: /What are the reasons for not having an ACAS Certificate number\?/,
  });
  const noAcasReason = noAcasReasonQuestion
    .getByRole('radio', {
      name: /ACAS doesn't have the power to conciliate on all or part of my claim/,
    })
    .first();
  await noAcasReason.waitFor({ state: 'visible', timeout: 5_000 }).catch(() => {
    // The ACAS reason list is conditional; only select it when the page exposes it after the "No" answer.
  });
  if ((await noAcasReason.isVisible().catch(() => false)) && !(await noAcasReason.isChecked().catch(() => false))) {
    await noAcasReason.check();
  }

  if (!(await createCasePage.respondentAddressLine1Input.isVisible().catch(() => false))) {
    await createCasePage.page.getByRole('link', { name: "I can't enter a UK postcode" }).last().click();
  }

  await createCasePage.respondentAddressLine1Input.waitFor({ state: 'visible' });
  if (!(await createCasePage.respondentAddressLine1Input.inputValue().catch(() => ''))) {
    await createCasePage.respondentAddressLine1Input.fill('1 Test Street');
  }
}

async function ensureEmploymentDraftWorkAddressAnswered(createCasePage: CreateCasePage): Promise<void> {
  if (!createCasePage.page.url().includes('/UPDATE_CASE_DRAFT4')) {
    return;
  }

  await createCasePage.sameAsClaimantWorkAddressYes.waitFor({ state: 'visible' });
  if (!(await createCasePage.sameAsClaimantWorkAddressYes.isChecked().catch(() => false))) {
    await createCasePage.sameAsClaimantWorkAddressYes.check();
  }
}

async function ensureEmploymentDraftClaimantRepresentationAnswered(createCasePage: CreateCasePage): Promise<void> {
  if (!createCasePage.page.url().includes('/UPDATE_CASE_DRAFT8')) {
    return;
  }

  if (!(await createCasePage.answerEmploymentClaimantRepresentationNoIfVisible())) {
    return;
  }

  logger.info('Employment draft update: answered claimant representation question', {
    answer: 'No',
    url: createCasePage.page.url(),
  });
}

async function ensureEmploymentDraftHearingPreferenceAnswered(createCasePage: CreateCasePage): Promise<void> {
  if (!createCasePage.page.url().includes('/UPDATE_CASE_DRAFT9')) {
    return;
  }

  await createCasePage.hearingPreferenceVideo.waitFor({ state: 'visible', timeout: 5_000 }).catch(() => {
    // This draft step can render without editable controls when the draft has no hearing preference field exposed.
  });

  if (!(await createCasePage.hearingPreferenceVideo.isVisible().catch(() => false))) {
    logger.info('Employment draft update: hearing preference control not exposed on draft step', {
      url: createCasePage.page.url(),
    });
    return;
  }

  if (!(await createCasePage.hearingPreferenceVideo.isChecked().catch(() => false))) {
    await createCasePage.hearingPreferenceVideo.check();
  }

  logger.info('Employment draft update: answered hearing preference question', {
    answer: 'Video',
    url: createCasePage.page.url(),
  });
}

async function ensureEmploymentDraftClaimDetails(createCasePage: CreateCasePage): Promise<void> {
  if (!createCasePage.page.url().includes('/UPDATE_CASE_DRAFT10')) {
    return;
  }

  const page = createCasePage.page;
  const caseTypeSelect = page.locator('#caseType');
  if ((await caseTypeSelect.isVisible().catch(() => false)) && isUnselectedCcdFixedListValue(await caseTypeSelect.inputValue())) {
    await caseTypeSelect.selectOption({ label: 'Single' }, { timeout: 5_000 });
  } else {
    const firstVisibleSelect = page.getByRole('combobox').first();
    if (
      (await firstVisibleSelect.isVisible().catch(() => false)) &&
      isUnselectedCcdFixedListValue(await firstVisibleSelect.inputValue())
    ) {
      await firstVisibleSelect.selectOption({ label: 'Single' }, { timeout: 5_000 });
    }
  }

  const et1OnlineSubmissionYes = page.locator('#et1OnlineSubmission_Yes');
  if (
    (await et1OnlineSubmissionYes.isVisible().catch(() => false)) &&
    !(await et1OnlineSubmissionYes.isChecked().catch(() => false))
  ) {
    await et1OnlineSubmissionYes.check({ timeout: 5_000 });
  }

  const positionTypeSelect = page.locator('#positionType');
  if (
    (await positionTypeSelect.isVisible().catch(() => false)) &&
    isUnselectedCcdFixedListValue(await positionTypeSelect.inputValue())
  ) {
    await positionTypeSelect.selectOption({ label: 'ET1 Online submission' }, { timeout: 5_000 });
  }

  const conciliationTrackSelect = page.locator('#conciliationTrack');
  if (
    (await conciliationTrackSelect.isVisible().catch(() => false)) &&
    isUnselectedCcdFixedListValue(await conciliationTrackSelect.inputValue())
  ) {
    await conciliationTrackSelect.selectOption({ label: 'Open Track' }, { timeout: 5_000 });
  }

  const discriminationClaimType = page
    .locator('#typesOfClaim-discrimination')
    .or(page.getByRole('checkbox', { name: 'discrimination' }));
  if (
    (await discriminationClaimType
      .first()
      .isVisible()
      .catch(() => false)) &&
    !(await discriminationClaimType
      .first()
      .isChecked()
      .catch(() => false))
  ) {
    await discriminationClaimType.first().check({ timeout: 5_000 });
  }

  logger.info('Employment draft update: completed minimal claim details', {
    url: createCasePage.page.url(),
  });
}

function describeUnknownError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  try {
    return JSON.stringify(error) ?? '[Unable to stringify error]';
  } catch {
    return '[Unstringifiable error object]';
  }
}

export const __test__ = {
  resolveRespondentDetailsAction,
};

import { createLogger } from '@hmcts/playwright-common';
import { expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

import type { CreateCasePage } from '../../../page-objects/pages/exui/createCase.po';
import type { Page } from '@playwright/test';
import { uploadDocumentViaApi } from '../uploadDocumentViaApi';

const logger = createLogger({
  serviceName: 'employment-case-journeys',
  format: 'pretty',
});

type CreateEmploymentCaseOptions = {
  allowDraftClaimFallback?: boolean;
};

type InternalEventTriggerResponse = {
  event_token?: string;
};

const CCD_API_JSON_HEADERS = {
  experimental: 'true',
  Accept: 'application/json',
  'Content-Type': 'application/json',
} as const;

const CCD_INTERNAL_START_EVENT_HEADERS = {
  experimental: 'true',
  Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json',
} as const;

const CCD_CREATE_EVENT_HEADERS = {
  experimental: 'true',
  Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json',
  'Content-Type': 'application/json',
} as const;

export async function uploadEmploymentDraftDocument(
  createCasePage: CreateCasePage,
  fileName: string,
  mimeType: string,
  fileContent: string | Buffer
): Promise<void> {
  await prepareEmploymentDraftUploadPage(createCasePage);
  await createCasePage.page.locator('#documentCollection button').click();
  await createCasePage.uploadFile(fileName, mimeType, fileContent);
  await createCasePage.page.locator('#documentCollection_0_topLevelDocuments').selectOption('Misc');
  await createCasePage.page.locator('#documentCollection_0_miscDocuments').selectOption('Other');
  await createCasePage.clickSubmitAndWait('after uploading employment document', {
    timeoutMs: 60_000,
    maxAutoAdvanceAttempts: 1,
  });
  await createCasePage.waitForCaseDetails('after uploading employment document');
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
  const preferredEventLabels = options.allowDraftClaimFallback ? ['Create Case', 'Create draft claim'] : ['Create Case'];

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
      await createCasePage.respondentOrganisation.waitFor({ state: 'visible' });
      await createCasePage.respondentOrganisation.check();
      await createCasePage.respondentAcasCertifcateSelectYes.waitFor({ state: 'visible' });
      await createCasePage.respondentAcasCertifcateSelectYes.check();
      await createCasePage.respondentAcasCertificateNumberInput.fill('ACAS123456');
      await createCasePage.respondentCompanyNameInput.fill('Respondent Company');
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
    const documentCollectionButton = createCasePage.page.locator('#documentCollection button');
    if (await documentCollectionButton.isVisible().catch(() => false)) {
      logger.info('Employment draft update: document upload controls ready', {
        attempt,
        url: createCasePage.page.url(),
      });
      return;
    }

    await createCasePage.assertNoEventCreationError(`during employment draft upload preparation (attempt ${attempt})`);
    await ensureEmploymentDraftRespondentCollectionItem(createCasePage);
    await ensureEmploymentDraftClaimantRepresentationAnswered(createCasePage);

    const visibleContinueButton = createCasePage.page.getByRole('button', { name: /^continue\b/i }).first();
    if (!(await visibleContinueButton.isVisible().catch(() => false))) {
      throw new Error(
        `Employment draft update did not reach a document upload page; no Continue button visible at ${createCasePage.page.url()}`
      );
    }
    await createCasePage.clickContinueAndWaitForNext(`employment draft upload preparation step ${attempt}`);
  }

  throw new Error(`Employment draft update did not reach the document upload page after ${maxAdvanceAttempts} steps`);
}

async function ensureEmploymentDraftRespondentCollectionItem(createCasePage: CreateCasePage): Promise<void> {
  if (!createCasePage.page.url().includes('/UPDATE_CASE_DRAFT3')) {
    return;
  }

  const existingCollectionItem = createCasePage.page.locator('[id^="respondentCollection_0"]').first();
  if ((await existingCollectionItem.count()) > 0) {
    return;
  }

  await createCasePage.addRespondentButton.waitFor({ state: 'visible' });
  await createCasePage.addRespondentButton.click();
  await expect(createCasePage.page.locator('[id^="respondentCollection_0"]').first()).toBeAttached();
  logger.info('Employment draft update: added minimal respondent collection item', {
    url: createCasePage.page.url(),
  });
}

async function ensureEmploymentDraftClaimantRepresentationAnswered(createCasePage: CreateCasePage): Promise<void> {
  if (!createCasePage.page.url().includes('/UPDATE_CASE_DRAFT8')) {
    return;
  }

  const claimantRepresentationGroup = createCasePage.page.getByRole('group', { name: 'Is the Claimant Represented?' });
  if (!(await claimantRepresentationGroup.isVisible().catch(() => false))) {
    return;
  }

  const noRadio = claimantRepresentationGroup.getByRole('radio', { name: 'No' });
  if (await noRadio.isChecked().catch(() => false)) {
    return;
  }

  await noRadio.check();
  logger.info('Employment draft update: answered claimant representation question', {
    answer: 'No',
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

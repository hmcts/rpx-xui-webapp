import { createLogger } from '@hmcts/playwright-common';
import type { Page } from '@playwright/test';

import { setupCaseForJourney } from '../caseSetup';
import { getCivilLipMediationApiMissingConfiguration, requireCivilApiConfig, resolveCivilApiConfig } from './civilConfig';
import {
  assignCivilCaseRoleToUser,
  extractCaseData,
  normaliseCasePayload,
  resolveCaseNumberFromCivilResponse,
  resolveEventId,
  submitCcdCaseEventViaApi,
  submitCivilCitizenDraftEvent,
  submitCivilCitizenEvent,
} from './civilEventApi';
import {
  createCivilApiTokens,
  createCivilCourtStaffAccountViaApi as createCivilCourtStaffAccount,
  createIdamCitizenAccount,
  getIdamUserId,
  withGeneratedCivilCitizenUsers,
} from './civilIdam';
import {
  claimantLipIntendsToProceedCarmPayload,
  createClaimAfterPaymentPayload,
  createLipClaimWithCompanyDefendantPayload,
  defendantResponseCarmCompanyPayload,
} from './civilPayloads';
import {
  fetchCaseDetailsViaApi,
  resolveCcdCaseStateId,
  waitForCaseState,
  waitForCivilCaseStateViaApi,
  waitForFinishedCivilBusinessProcess,
} from './civilPolling';
import { getCivilS2sToken } from './civilS2s';
import type {
  CcdCaseDetails,
  CivilApiUser,
  CreateCivilMediationCaseViaApiOptions,
  CreateCivilMediationCaseViaApiResult,
} from './civilTypes';

export type {
  CcdCaseDetails,
  CivilApiUser,
  CivilCaseProgressionEvent,
  CreateCivilMediationCaseViaApiOptions,
  CreateCivilMediationCaseViaApiResult,
} from './civilTypes';

export {
  fetchCaseDetailsViaApi,
  getCivilLipMediationApiMissingConfiguration,
  resolveCcdCaseStateId,
  waitForCivilCaseStateViaApi,
};

const logger = createLogger({
  serviceName: 'civil-case-journeys',
  format: 'pretty',
});

const DEFAULT_CIVIL_JURISDICTION = 'CIVIL';
const DEFAULT_CIVIL_CASE_TYPE = 'CIVIL';
const DEFAULT_CIVIL_CREATE_EVENT_ID = 'CREATE_CLAIM';
const DEFAULT_MEDIATION_STATE = 'IN_MEDIATION';

export async function createCivilCourtStaffAccountViaApi(page: Page): Promise<CivilApiUser> {
  const config = requireCivilApiConfig({ allowMissingCitizenUsers: true });
  return createCivilCourtStaffAccount(page, config);
}

export async function createCivilLipCaseInMediationViaApi(options: {
  page: Page;
  expectedState?: string;
  useGeneratedUsers?: boolean;
}): Promise<CreateCivilMediationCaseViaApiResult> {
  const expectedState = options.expectedState ?? DEFAULT_MEDIATION_STATE;
  const config = options.useGeneratedUsers
    ? withGeneratedCivilCitizenUsers(requireCivilApiConfig({ allowMissingCitizenUsers: true }))
    : requireCivilApiConfig();

  if (config.createClaimantAccount) {
    await createIdamCitizenAccount(options.page, config, config.claimantUser);
  }
  if (config.createDefendantAccount) {
    await createIdamCitizenAccount(options.page, config, config.defendantUser);
  }

  const tokens = await createCivilApiTokens(options.page, config, getCivilS2sToken);
  const claimantUserId = await getIdamUserId(options.page, config, tokens.claimantIdamToken);
  const defendantUserId = await getIdamUserId(options.page, config, tokens.defendantIdamToken);

  const createClaimResponse = await submitCivilCitizenDraftEvent({
    page: options.page,
    config,
    eventPayload: createLipClaimWithCompanyDefendantPayload(config.claimantUser, claimantUserId),
    userId: claimantUserId,
    idamToken: tokens.claimantIdamToken,
    s2sToken: tokens.s2sToken,
    context: 'create LiP claim',
  });
  const caseNumber = resolveCaseNumberFromCivilResponse(createClaimResponse);

  await waitForFinishedCivilBusinessProcess(options.page, config, tokens.claimantIdamToken, caseNumber);

  await submitCivilCitizenEvent({
    page: options.page,
    config,
    caseNumber,
    eventPayload: createClaimAfterPaymentPayload(),
    userId: claimantUserId,
    idamToken: tokens.claimantIdamToken,
    s2sToken: tokens.s2sToken,
    context: 'issue Civil LiP claim after payment',
  });
  await waitForFinishedCivilBusinessProcess(options.page, config, tokens.claimantIdamToken, caseNumber);

  await assignCivilCaseRoleToUser({
    page: options.page,
    config,
    caseNumber,
    caseRole: 'DEFENDANT',
    idamToken: tokens.defendantIdamToken,
  });

  await submitCivilCitizenEvent({
    page: options.page,
    config,
    caseNumber,
    eventPayload: defendantResponseCarmCompanyPayload(),
    userId: defendantUserId,
    idamToken: tokens.defendantIdamToken,
    s2sToken: tokens.s2sToken,
    context: 'submit defendant response',
  });
  await waitForFinishedCivilBusinessProcess(options.page, config, tokens.defendantIdamToken, caseNumber);

  await submitCivilCitizenEvent({
    page: options.page,
    config,
    caseNumber,
    eventPayload: claimantLipIntendsToProceedCarmPayload(),
    userId: claimantUserId,
    idamToken: tokens.claimantIdamToken,
    s2sToken: tokens.s2sToken,
    context: 'submit claimant response to defence',
  });
  await waitForFinishedCivilBusinessProcess(options.page, config, tokens.claimantIdamToken, caseNumber);

  const caseDetails = await waitForCivilLipMediationCaseDetails({
    page: options.page,
    caseNumber,
    expectedState,
  });

  logger.info('Created Civil LiP mediation case via Civil API', {
    caseNumber,
    claimantEmail: config.claimantUser.email,
    defendantEmail: config.defendantUser.email,
    expectedState,
  });

  return {
    caseNumber,
    caseDetails,
  };
}

async function waitForCivilLipMediationCaseDetails(
  options: {
    page: Page;
    caseNumber: string;
    expectedState: string;
  },
  waitForState: (options: {
    page: Page;
    caseNumber: string;
    expectedState: string;
    context: string;
  }) => Promise<CcdCaseDetails> = waitForCaseState
): Promise<CcdCaseDetails> {
  return waitForState({
    page: options.page,
    caseNumber: options.caseNumber,
    expectedState: options.expectedState,
    context: 'after Civil LiP mediation setup',
  });
}

export async function createCivilMediationCaseViaApi(
  options: CreateCivilMediationCaseViaApiOptions
): Promise<CreateCivilMediationCaseViaApiResult> {
  const jurisdiction = options.jurisdiction ?? DEFAULT_CIVIL_JURISDICTION;
  const caseType = options.caseType ?? DEFAULT_CIVIL_CASE_TYPE;
  const createEventId = options.createEventId ?? DEFAULT_CIVIL_CREATE_EVENT_ID;
  const expectedState = options.expectedState ?? DEFAULT_MEDIATION_STATE;

  const setup = await setupCaseForJourney({
    scenario: 'civil-mediation-create-case-flag-data-loss',
    jurisdiction,
    caseType,
    apiEventId: createEventId,
    mode: 'api-required',
    apiPayload: normaliseCasePayload(options.createPayload),
    page: options.page,
    createCasePage: options.createCasePage,
    caseDetailsPage: options.caseDetailsPage,
    testInfo: options.testInfo,
  });

  for (const event of options.progressionEvents) {
    const currentCaseDetails = await fetchCaseDetailsViaApi(options.page, setup.caseNumber);
    const eventId = resolveEventId(event);
    await submitCcdCaseEventViaApi({
      page: options.page,
      caseNumber: setup.caseNumber,
      caseType,
      eventId,
      baseCaseData: extractCaseData(currentCaseDetails),
      event,
      summary: event.summary ?? `Progress Civil case via ${eventId}`,
      description: event.description ?? 'Progressed via Playwright Civil API journey helper',
    });

    if (event.expectedState) {
      await waitForCaseState({
        page: options.page,
        caseNumber: setup.caseNumber,
        expectedState: event.expectedState,
        context: `after Civil event '${eventId}'`,
      });
    }
  }

  const caseDetails = await waitForCaseState({
    page: options.page,
    caseNumber: setup.caseNumber,
    expectedState,
    context: 'after Civil API mediation setup',
  });

  logger.info('Created Civil mediation case via API', {
    caseNumber: setup.caseNumber,
    jurisdiction,
    caseType,
    createEventId,
    progressionEventIds: options.progressionEvents.map((event) => resolveEventId(event)),
  });

  return {
    caseNumber: setup.caseNumber,
    caseDetails,
  };
}

export const __test__ = {
  assignCivilCaseRoleToUser,
  resolveCivilApiConfig,
  waitForCaseState,
  waitForCivilLipMediationCaseDetails,
  withGeneratedCivilCitizenUsers,
};

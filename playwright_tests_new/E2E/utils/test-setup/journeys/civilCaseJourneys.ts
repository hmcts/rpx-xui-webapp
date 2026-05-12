import { createLogger } from '@hmcts/playwright-common';
import type { Page, TestInfo } from '@playwright/test';
import { authenticator } from 'otplib';

import type { CaseDetailsPage } from '../../../page-objects/pages/exui/caseDetails.po';
import type { CreateCasePage } from '../../../page-objects/pages/exui/createCase.po';
import { setupCaseForJourney } from '../caseSetup';

type JsonRecord = Record<string, unknown>;

export type CcdCaseDetails = JsonRecord & {
  id?: string | number;
  case_id?: string | number;
  case_reference?: string | number;
  caseReference?: string | number;
  state?: string;
  data?: JsonRecord;
  case_data?: JsonRecord;
};

export type CivilCaseProgressionEvent = {
  eventId?: string;
  event?: string;
  payload?: JsonRecord;
  caseData?: JsonRecord;
  caseDataUpdate?: JsonRecord;
  userInput?: Record<string, JsonRecord>;
  expectedState?: string;
  summary?: string;
  description?: string;
};

export type CreateCivilMediationCaseViaApiOptions = {
  page: Page;
  createCasePage: CreateCasePage;
  caseDetailsPage: CaseDetailsPage;
  testInfo?: TestInfo;
  jurisdiction?: string;
  caseType?: string;
  createEventId?: string;
  createPayload: JsonRecord;
  progressionEvents: CivilCaseProgressionEvent[];
  expectedState?: string;
};

export type CreateCivilMediationCaseViaApiResult = {
  caseNumber: string;
  caseDetails: CcdCaseDetails;
};

type CivilApiUser = {
  email: string;
  password: string;
};

type CivilApiConfig = {
  civilServiceUrl: string;
  idamApiUrl: string;
  idamTestSupportApiUrl?: string;
  serviceAuthProviderUrl?: string;
  s2sToken?: string;
  s2sSecret?: string;
  claimantUser: CivilApiUser;
  defendantUser: CivilApiUser;
  createClaimantAccount: boolean;
  createDefendantAccount: boolean;
};

type InternalEventTriggerResponse = {
  event_token?: string;
  token?: string;
  data?: JsonRecord;
};

const logger = createLogger({
  serviceName: 'civil-case-journeys',
  format: 'pretty',
});

const DEFAULT_CIVIL_JURISDICTION = 'CIVIL';
const DEFAULT_CIVIL_CASE_TYPE = 'CIVIL';
const DEFAULT_CIVIL_CREATE_EVENT_ID = 'CREATE_CLAIM';
const DEFAULT_MEDIATION_STATE = 'IN_MEDIATION';
const DEFAULT_STATE_WAIT_TIMEOUT_MS = 180_000;
const DEFAULT_STATE_WAIT_INTERVAL_MS = 3_000;
const DEFAULT_BUSINESS_PROCESS_WAIT_TIMEOUT_MS = 180_000;
const DEFAULT_BUSINESS_PROCESS_WAIT_INTERVAL_MS = 3_000;
const DEFAULT_CIVIL_S2S_MICROSERVICE = 'civil_service';
const CIVIL_SMALL_CLAIM_AMOUNT = '1500';

const CCD_INTERNAL_START_EVENT_HEADERS = {
  experimental: 'true',
  Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json',
} as const;

const CCD_CREATE_EVENT_HEADERS = {
  experimental: 'true',
  Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json',
  'Content-Type': 'application/json',
} as const;

export function getCivilLipMediationApiMissingConfiguration(): string[] {
  const config = resolveCivilApiConfig();
  const missing: string[] = [];

  if (!config.civilServiceUrl) {
    missing.push('CIVIL_SERVICE_URL');
  }
  if (!config.idamApiUrl) {
    missing.push('IDAM_API_URL or SERVICES_IDAM_API_URL');
  }
  if (!config.s2sToken && !config.serviceAuthProviderUrl) {
    missing.push('SERVICE_AUTH_PROVIDER_API_BASE_URL or S2S_URL or S2S_TOKEN');
  }
  if (!config.s2sToken && config.serviceAuthProviderUrl && !config.s2sSecret) {
    missing.push('S2S_SECRET');
  }
  if (!config.claimantUser.password || !config.defendantUser.password) {
    missing.push('CITIZEN_PASSWORD or PW_CIVIL_CITIZEN_PASSWORD');
  }

  return missing;
}

export async function createCivilLipCaseInMediationViaApi(options: {
  page: Page;
  expectedState?: string;
}): Promise<CreateCivilMediationCaseViaApiResult> {
  const expectedState = options.expectedState ?? DEFAULT_MEDIATION_STATE;
  const config = requireCivilApiConfig();

  if (config.createClaimantAccount) {
    await createIdamCitizenAccount(options.page, config, config.claimantUser);
  }
  if (config.createDefendantAccount) {
    await createIdamCitizenAccount(options.page, config, config.defendantUser);
  }

  const tokens = await createCivilApiTokens(options.page, config);
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

  const caseDetails = await waitForCaseState({
    page: options.page,
    caseNumber,
    expectedState,
    context: 'after Civil LiP API mediation setup',
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

export async function fetchCaseDetailsViaApi(page: Page, caseNumber: string): Promise<CcdCaseDetails> {
  const response = await page.request.get(`data/internal/cases/${encodeURIComponent(caseNumber)}`, {
    failOnStatusCode: false,
    headers: {
      experimental: 'true',
      Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-case-view.v2+json;charset=UTF-8',
    },
  });

  if (!response.ok()) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `Failed to fetch case ${caseNumber} via API: HTTP ${response.status()}. ` +
        `Path='data/internal/cases/${caseNumber}'. Body='${body.slice(0, 500)}'`
    );
  }

  return (await response.json()) as CcdCaseDetails;
}

async function submitCcdCaseEventViaApi(options: {
  page: Page;
  caseNumber: string;
  caseType: string;
  eventId: string;
  baseCaseData: JsonRecord;
  event: CivilCaseProgressionEvent;
  summary: string;
  description: string;
}): Promise<void> {
  const eventTriggerPath = `data/internal/cases/${encodeURIComponent(options.caseNumber)}/event-triggers/${encodeURIComponent(
    options.eventId
  )}?ignore-warning=false`;
  const eventTriggerResponse = await options.page.request.get(eventTriggerPath, {
    failOnStatusCode: false,
    headers: CCD_INTERNAL_START_EVENT_HEADERS,
    timeout: 60_000,
  });
  if (!eventTriggerResponse.ok()) {
    const body = await eventTriggerResponse.text().catch(() => '');
    throw new Error(
      `Civil case setup failed to fetch event trigger (HTTP ${eventTriggerResponse.status()}). ` +
        `Path='${eventTriggerPath}'. Body='${body.slice(0, 500)}'`
    );
  }

  const eventTrigger = (await eventTriggerResponse.json()) as InternalEventTriggerResponse;
  const eventToken = eventTrigger.event_token?.trim() || eventTrigger.token?.trim();
  if (!eventToken) {
    throw new Error(`Civil case setup event '${options.eventId}' did not include an event token.`);
  }

  let eventData = {
    ...options.baseCaseData,
    ...extractFieldValues(eventTrigger.data),
    ...extractEventInitialData(options.event),
  };

  for (const [pageId, userInput] of Object.entries(options.event.userInput ?? {})) {
    eventData = {
      ...eventData,
      ...userInput,
    };
    eventData = await validateCcdCaseEventPage({
      page: options.page,
      caseType: options.caseType,
      caseNumber: options.caseNumber,
      eventId: options.eventId,
      eventToken,
      pageId,
      data: eventData,
    });
  }

  const eventBody = {
    data: eventData,
    event: {
      id: options.eventId,
      summary: options.summary,
      description: options.description,
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
      `Civil case setup failed to submit event '${options.eventId}' (HTTP ${submitResponse.status()}). ` +
        `Path='${submitPath}'. Body='${body.slice(0, 500)}'`
    );
  }
}

async function validateCcdCaseEventPage(options: {
  page: Page;
  caseType: string;
  caseNumber: string;
  eventId: string;
  eventToken: string;
  pageId: string;
  data: JsonRecord;
}): Promise<JsonRecord> {
  const validatePath = `data/case-types/${encodeURIComponent(options.caseType)}/validate?pageId=${encodeURIComponent(
    `${options.eventId}${options.pageId}`
  )}`;
  const validateResponse = await options.page.request.post(validatePath, {
    data: {
      data: options.data,
      event: {
        id: options.eventId,
      },
      event_token: options.eventToken,
      ignore_warning: false,
      case_reference: options.caseNumber,
    },
    failOnStatusCode: false,
    headers: CCD_CREATE_EVENT_HEADERS,
    timeout: 60_000,
  });

  if (!validateResponse.ok()) {
    const body = await validateResponse.text().catch(() => '');
    throw new Error(
      `Civil case setup failed to validate event '${options.eventId}' page '${options.pageId}' ` +
        `(HTTP ${validateResponse.status()}). Path='${validatePath}'. Body='${body.slice(0, 500)}'`
    );
  }

  const responseBody = (await validateResponse.json()) as { data?: JsonRecord };
  return responseBody.data ?? options.data;
}

function normaliseCasePayload(payload: JsonRecord): JsonRecord {
  return typeof payload.fieldValues === 'object' && payload.fieldValues !== null ? payload : { fieldValues: payload };
}

function extractFieldValues(payload: JsonRecord | undefined | null): JsonRecord {
  if (!payload) {
    return {};
  }

  return typeof payload.fieldValues === 'object' && payload.fieldValues !== null ? (payload.fieldValues as JsonRecord) : payload;
}

function extractEventInitialData(event: CivilCaseProgressionEvent): JsonRecord {
  return {
    ...extractFieldValues(event.payload),
    ...extractFieldValues(event.caseData),
    ...extractFieldValues(event.caseDataUpdate),
  };
}

function resolveEventId(event: CivilCaseProgressionEvent): string {
  const eventId = event.eventId ?? event.event;
  if (!eventId?.trim()) {
    throw new Error('Civil progression event requires eventId or event.');
  }
  return eventId;
}

async function waitForCaseState(options: {
  page: Page;
  caseNumber: string;
  expectedState: string;
  context: string;
}): Promise<CcdCaseDetails> {
  const deadline = Date.now() + DEFAULT_STATE_WAIT_TIMEOUT_MS;
  let lastCaseDetails: CcdCaseDetails | undefined;

  while (Date.now() < deadline) {
    lastCaseDetails = await fetchCaseDetailsViaApi(options.page, options.caseNumber);
    if (lastCaseDetails.state === options.expectedState) {
      return lastCaseDetails;
    }
    await options.page.waitForTimeout(DEFAULT_STATE_WAIT_INTERVAL_MS);
  }

  throw new Error(
    `Civil case ${options.caseNumber} expected state '${options.expectedState}' ${options.context} ` +
      `but was '${lastCaseDetails?.state ?? 'unknown'}'.`
  );
}

function extractCaseData(caseDetails: CcdCaseDetails): JsonRecord {
  if (caseDetails.data && typeof caseDetails.data === 'object') {
    return caseDetails.data;
  }
  if (caseDetails.case_data && typeof caseDetails.case_data === 'object') {
    return caseDetails.case_data;
  }
  return {};
}

function resolveCivilApiConfig(): CivilApiConfig {
  const citizenPassword = firstNonEmpty(
    process.env.PW_CIVIL_CITIZEN_PASSWORD,
    process.env.CIVIL_CITIZEN_PASSWORD,
    process.env.CITIZEN_PASSWORD
  );
  const claimantEmail = firstNonEmpty(process.env.PW_CIVIL_CLAIMANT_EMAIL, process.env.CLAIMANT_CITIZEN_EMAIL);
  const defendantEmail = firstNonEmpty(process.env.PW_CIVIL_DEFENDANT_EMAIL, process.env.DEFENDANT_CITIZEN_EMAIL);
  const generatedRunId = createUniqueRunId();
  const claimantGenerated = !claimantEmail;
  const defendantGenerated = !defendantEmail;

  return {
    civilServiceUrl: resolveCivilServiceUrl(),
    idamApiUrl: resolveIdamApiUrl(),
    idamTestSupportApiUrl: trimTrailingSlash(
      firstNonEmpty(process.env.IDAM_TEST_SUPPORT_API_URL, process.env.IDAM_TESTING_SUPPORT_URL) ?? ''
    ),
    serviceAuthProviderUrl: trimTrailingSlash(
      firstNonEmpty(process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL, process.env.S2S_URL) ?? ''
    ),
    s2sToken: firstNonEmpty(process.env.S2S_TOKEN),
    s2sSecret: firstNonEmpty(process.env.S2S_SECRET),
    claimantUser: {
      email: claimantEmail ?? `claimantcitizen-${generatedRunId}@gmail.com`,
      password: citizenPassword ?? '',
    },
    defendantUser: {
      email: defendantEmail ?? `defendantcitizen-${generatedRunId}@gmail.com`,
      password: citizenPassword ?? '',
    },
    createClaimantAccount: claimantGenerated,
    createDefendantAccount: defendantGenerated,
  };
}

function resolveIdamApiUrl(): string {
  const configured = trimTrailingSlash(firstNonEmpty(process.env.IDAM_API_URL, process.env.SERVICES_IDAM_API_URL) ?? '');
  return configured.replace(/\/o\/token$/i, '').replace(/\/o$/i, '');
}

function resolveCivilServiceUrl(): string {
  const configured = firstNonEmpty(process.env.CIVIL_SERVICE_URL);
  if (configured) {
    return trimTrailingSlash(configured);
  }

  const ccdDataStoreUrl = firstNonEmpty(process.env.CCD_DATA_STORE_URL, process.env.SERVICES_CCD_DATA_STORE_API);
  if (ccdDataStoreUrl?.includes('civil-cui-data-store-staging.aat.platform.hmcts.net')) {
    return 'https://civil-cui-civil-service-staging.aat.platform.hmcts.net';
  }
  if (ccdDataStoreUrl?.includes('ccd-data-store-api-aat.service.core-compute-aat.internal')) {
    return 'http://civil-service-aat.service.core-compute-aat.internal';
  }
  if (ccdDataStoreUrl?.includes('ccd-data-store-api-demo.service.core-compute-demo.internal')) {
    return 'http://civil-service-demo.service.core-compute-demo.internal';
  }

  const testEnv = firstNonEmpty(process.env.TEST_ENV, process.env.ENVIRONMENT)?.toLowerCase();
  if (testEnv === 'demo') {
    return 'http://civil-service-demo.service.core-compute-demo.internal';
  }

  if (testEnv === 'aat' || isAatUrl(firstNonEmpty(process.env.TEST_URL, process.env.EXUI_BASE_URL))) {
    return 'https://civil-cui-civil-service-staging.aat.platform.hmcts.net';
  }

  return '';
}

function requireCivilApiConfig(): CivilApiConfig {
  const missing = getCivilLipMediationApiMissingConfiguration();
  if (missing.length) {
    throw new Error(`Civil LiP mediation API setup is missing configuration: ${missing.join(', ')}`);
  }
  return resolveCivilApiConfig();
}

async function createCivilApiTokens(
  page: Page,
  config: CivilApiConfig
): Promise<{
  claimantIdamToken: string;
  defendantIdamToken: string;
  s2sToken: string;
}> {
  const [claimantIdamToken, defendantIdamToken, s2sToken] = await Promise.all([
    getIdamAccessToken(page, config, config.claimantUser),
    getIdamAccessToken(page, config, config.defendantUser),
    getCivilS2sToken(page, config),
  ]);

  return {
    claimantIdamToken,
    defendantIdamToken,
    s2sToken,
  };
}

async function createIdamCitizenAccount(page: Page, config: CivilApiConfig, user: CivilApiUser): Promise<void> {
  const response = await page.request.post(`${config.idamApiUrl}/testing-support/accounts`, {
    data: {
      email: user.email,
      forename: 'Civil',
      surname: 'Citizen',
      password: user.password,
      roles: [
        {
          code: 'citizen',
        },
      ],
      userGroup: {
        code: 'citizen',
      },
    },
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60_000,
  });

  if (response.ok() || response.status() === 409) {
    return;
  }

  const body = await response.text().catch(() => '');
  const fallbackError = await createIdamCitizenAccountViaLegacyEndpoint(page, config, user);
  if (fallbackError) {
    throw new Error(
      `Failed to create Civil citizen account '${user.email}' through IDAM testing-support/accounts ` +
        `(HTTP ${response.status()}). Body='${body.slice(0, 500)}'. Legacy fallback: ${fallbackError.message}`
    );
  }
}

async function createIdamCitizenAccountViaLegacyEndpoint(
  page: Page,
  config: CivilApiConfig,
  user: CivilApiUser
): Promise<Error | undefined> {
  if (!config.idamTestSupportApiUrl) {
    return new Error('IDAM_TEST_SUPPORT_API_URL or IDAM_TESTING_SUPPORT_URL is not configured.');
  }

  const adminEmail = firstNonEmpty(process.env.PW_CIVIL_IDAM_ADMIN_EMAIL);
  const adminPassword = firstNonEmpty(process.env.PW_CIVIL_IDAM_ADMIN_PASSWORD);
  if (!adminEmail || !adminPassword) {
    return new Error('PW_CIVIL_IDAM_ADMIN_EMAIL/PW_CIVIL_IDAM_ADMIN_PASSWORD are not configured.');
  }

  try {
    const adminToken = await getIdamAccessToken(page, config, {
      email: adminEmail,
      password: adminPassword,
    });
    const response = await page.request.post(`${config.idamTestSupportApiUrl}/test/idam/users`, {
      data: {
        password: user.password,
        user: {
          email: user.email,
          forename: 'Civil',
          surname: 'Citizen',
          displayName: 'Civil Citizen',
          roleNames: ['citizen'],
        },
      },
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 60_000,
    });

    if (response.ok() || response.status() === 409) {
      return undefined;
    }

    const body = await response.text().catch(() => '');
    return new Error(`HTTP ${response.status()}. Body='${body.slice(0, 500)}'`);
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

async function getIdamAccessToken(page: Page, config: CivilApiConfig, user: CivilApiUser): Promise<string> {
  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= 5; attempt++) {
    const response = await page.request.post(
      `${config.idamApiUrl}/loginUser?username=${encodeURIComponent(user.email)}&password=${encodeURIComponent(user.password)}`,
      {
        failOnStatusCode: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 60_000,
      }
    );

    if (response.ok()) {
      const body = (await response.json()) as { access_token?: string };
      if (!body.access_token) {
        throw new Error(`IDAM token response for '${user.email}' did not include access_token.`);
      }
      return body.access_token;
    }

    const body = await response.text().catch(() => '');
    lastError = new Error(
      `Failed to get IDAM token for '${user.email}' (HTTP ${response.status()}). Body='${body.slice(0, 500)}'`
    );
    await page.waitForTimeout(3_000);
  }

  throw lastError ?? new Error(`Failed to get IDAM token for '${user.email}'.`);
}

async function getIdamUserId(page: Page, config: CivilApiConfig, idamToken: string): Promise<string> {
  const response = await page.request.get(`${config.idamApiUrl}/o/userinfo`, {
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${idamToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    timeout: 60_000,
  });

  if (!response.ok()) {
    const body = await response.text().catch(() => '');
    throw new Error(`Failed to get Civil IDAM userinfo (HTTP ${response.status()}). Body='${body.slice(0, 500)}'`);
  }

  const body = (await response.json()) as { uid?: string };
  if (!body.uid) {
    throw new Error('Civil IDAM userinfo response did not include uid.');
  }
  return body.uid;
}

async function getCivilS2sToken(page: Page, config: CivilApiConfig): Promise<string> {
  if (config.s2sToken) {
    return config.s2sToken;
  }

  if (!config.serviceAuthProviderUrl || !config.s2sSecret) {
    throw new Error('Civil S2S token requires S2S_TOKEN or SERVICE_AUTH_PROVIDER_API_BASE_URL/S2S_URL and S2S_SECRET.');
  }

  const leaseUrl = config.serviceAuthProviderUrl.endsWith('/lease')
    ? config.serviceAuthProviderUrl
    : `${config.serviceAuthProviderUrl}/lease`;
  const response = await page.request.post(leaseUrl, {
    data: {
      microservice:
        firstNonEmpty(process.env.PW_CIVIL_S2S_MICROSERVICE, process.env.S2S_MICROSERVICE_NAME) ?? DEFAULT_CIVIL_S2S_MICROSERVICE,
      oneTimePassword: authenticator.generate(config.s2sSecret),
    },
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60_000,
  });

  if (!response.ok()) {
    const body = await response.text().catch(() => '');
    throw new Error(`Failed to get Civil S2S token (HTTP ${response.status()}). Body='${body.slice(0, 500)}'`);
  }

  return (await response.text()).replace(/^"|"$/g, '').trim();
}

async function submitCivilCitizenDraftEvent(options: {
  page: Page;
  config: CivilApiConfig;
  eventPayload: JsonRecord;
  userId: string;
  idamToken: string;
  s2sToken: string;
  context: string;
}): Promise<CcdCaseDetails> {
  return submitCivilServiceEvent({
    ...options,
    url: `${options.config.civilServiceUrl}/cases/draft/citizen/${encodeURIComponent(options.userId)}/event`,
  });
}

async function submitCivilCitizenEvent(options: {
  page: Page;
  config: CivilApiConfig;
  caseNumber: string;
  eventPayload: JsonRecord;
  userId: string;
  idamToken: string;
  s2sToken: string;
  context: string;
}): Promise<CcdCaseDetails> {
  return submitCivilServiceEvent({
    ...options,
    url: `${options.config.civilServiceUrl}/cases/${encodeURIComponent(options.caseNumber)}/citizen/${encodeURIComponent(
      options.userId
    )}/event`,
  });
}

async function submitCivilServiceEvent(options: {
  page: Page;
  url: string;
  eventPayload: JsonRecord;
  idamToken: string;
  s2sToken: string;
  context: string;
}): Promise<CcdCaseDetails> {
  const response = await options.page.request.post(options.url, {
    data: options.eventPayload,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${options.idamToken}`,
      ServiceAuthorization: options.s2sToken,
      'Content-Type': 'application/json',
    },
    timeout: 90_000,
  });

  if (!response.ok()) {
    const body = await response.text().catch(() => '');
    throw new Error(`Civil API failed to ${options.context} (HTTP ${response.status()}). Body='${body.slice(0, 500)}'`);
  }

  return (await response.json()) as CcdCaseDetails;
}

async function assignCivilCaseRoleToUser(options: {
  page: Page;
  config: CivilApiConfig;
  caseNumber: string;
  caseRole: string;
  idamToken: string;
}): Promise<void> {
  const response = await options.page.request.post(
    `${options.config.civilServiceUrl}/testing-support/assign-case/${encodeURIComponent(options.caseNumber)}/${encodeURIComponent(
      options.caseRole
    )}`,
    {
      data: {},
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${options.idamToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 60_000,
    }
  );

  if (!response.ok() && response.status() !== 409) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `Failed to assign Civil case role '${options.caseRole}' (HTTP ${response.status()}). Body='${body.slice(0, 500)}'`
    );
  }
}

async function waitForFinishedCivilBusinessProcess(
  page: Page,
  config: CivilApiConfig,
  idamToken: string,
  caseNumber: string
): Promise<void> {
  const deadline = Date.now() + DEFAULT_BUSINESS_PROCESS_WAIT_TIMEOUT_MS;
  let lastStatus = 'unknown';
  let incidentMessage = '';

  while (Date.now() < deadline) {
    const response = await page.request.get(
      `${config.civilServiceUrl}/testing-support/case/${encodeURIComponent(caseNumber)}/business-process`,
      {
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${idamToken}`,
        },
        timeout: 60_000,
      }
    );

    if (response.ok()) {
      const body = (await response.json()) as {
        businessProcess?: { status?: string; camundaEvent?: string; processInstanceId?: string };
        incidentMessage?: string;
      };
      incidentMessage = body.incidentMessage ?? '';
      lastStatus = body.businessProcess?.status ?? 'unknown';
      if (incidentMessage) {
        throw new Error(`Civil business process failed for case ${caseNumber}: ${incidentMessage}`);
      }
      if (lastStatus === 'FINISHED') {
        return;
      }
    } else {
      lastStatus = `HTTP ${response.status()}`;
    }

    await page.waitForTimeout(DEFAULT_BUSINESS_PROCESS_WAIT_INTERVAL_MS);
  }

  throw new Error(`Civil business process did not finish for case ${caseNumber}. Last status: ${lastStatus}`);
}

function resolveCaseNumberFromCivilResponse(payload: CcdCaseDetails): string {
  const candidate = payload.id ?? payload.case_id ?? payload.case_reference ?? payload.caseReference;
  if (typeof candidate === 'string' || typeof candidate === 'number') {
    return String(candidate).replace(/\D/g, '');
  }
  throw new Error('Civil create claim API response did not include a case id.');
}

function createLipClaimWithCompanyDefendantPayload(user: CivilApiUser, userId: string): JsonRecord {
  return {
    event: 'CREATE_LIP_CLAIM',
    caseDataUpdate: {
      applicant1: {
        individualDateOfBirth: '1995-08-28',
        individualFirstName: 'Jane',
        individualLastName: 'Doe',
        individualTitle: 'Miss',
        partyEmail: user.email,
        partyPhone: '07446777177',
        primaryAddress: {
          AddressLine1: '123',
          AddressLine2: 'Fake Street',
          AddressLine3: '',
          PostCode: 'S12eu',
          PostTown: 'sheffield',
        },
        type: 'INDIVIDUAL',
      },
      respondent1: {
        companyName: 'Test Company Defendant',
        partyEmail: user.email,
        partyPhone: '07800000000',
        primaryAddress: {
          AddressLine1: 'TestAddressLine1',
          AddressLine2: 'TestAddressLine2',
          AddressLine3: 'TestAddressLine3',
          PostCode: 'IG61JD',
          PostTown: 'TestCity',
        },
        type: 'COMPANY',
      },
      applicant1Represented: 'No',
      totalClaimAmount: CIVIL_SMALL_CLAIM_AMOUNT,
      claimAmountBreakup: [
        {
          id: '0',
          value: {
            claimAmount: CIVIL_SMALL_CLAIM_AMOUNT,
            claimReason: 'Injury',
          },
        },
      ],
      detailsOfClaim: 'Injury',
      claimInterest: 'No',
      claimantUserDetails: {
        email: user.email,
        id: userId,
      },
      respondent1LiPResponse: {
        respondent1DQExtraDetails: {
          whyPhoneOrVideoHearing: '',
          determinationWithoutHearingReason: '',
          considerClaimantDocumentsDetails: '',
          respondent1DQLiPExpert: {
            expertCanStillExamineDetails: '',
          },
        },
      },
      specRespondent1Represented: 'No',
      helpWithFees: {
        helpWithFee: 'No',
        helpWithFeesReferenceNumber: '',
      },
      pcqId: '4c10fec5-1278-45f3-89f0-d3d016d47f95',
      respondent1AdditionalLipPartyDetails: {
        correspondenceAddress: {},
        contactPerson: 'Test Company',
      },
      applicant1AdditionalLipPartyDetails: {
        correspondenceAddress: {
          AddressLine1: '123',
          AddressLine2: 'Test Street',
          AddressLine3: '',
          PostCode: 'L7 2pz',
          PostTown: 'Liverpool',
        },
        contactPerson: 'Test Company',
      },
      timelineOfEvents: [
        {
          id: '0',
          value: {
            timelineDate: '2000-01-01',
            timelineDescription: 'test',
          },
        },
      ],
      claimFee: {
        calculatedAmountInPence: '8000',
        code: 'FEE0206',
        version: '6',
      },
    },
  };
}

function createClaimAfterPaymentPayload(): JsonRecord {
  const currentDate = new Date().toISOString();
  return {
    event: 'CREATE_CLAIM_SPEC_AFTER_PAYMENT',
    caseDataUpdate: {
      claimIssuedPaymentDetails: {
        status: 'SUCCESS',
        reference: 'RC-1234-1234-1234-1234',
      },
      issueDate: currentDate,
      respondent1ResponseDeadline: currentDate,
    },
  };
}

function defendantResponseCarmCompanyPayload(): JsonRecord {
  return {
    event: 'DEFENDANT_RESPONSE_CUI',
    caseDataUpdate: {
      respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE',
      defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY',
      respondToClaimAdmitPartLRspec: {},
      responseClaimMediationSpecRequired: 'No',
      specAoSApplicantCorrespondenceAddressRequired: 'Yes',
      totalClaimAmount: 1500,
      respondent1: {
        companyName: 'Test Company Defendant',
        partyEmail: 'civilmoneyclaimsdemo@gmail.com',
        partyPhone: '07800000000',
        primaryAddress: {
          AddressLine1: 'TestAddressLine1',
          AddressLine2: 'TestAddressLine2',
          AddressLine3: 'TestAddressLine3',
          PostCode: 'IG61JD',
          PostTown: 'TestCity',
        },
        type: 'COMPANY',
      },
      respondent1LiPResponse: {
        timelineComment: 'Add any comments about their timeline (optional)',
        evidenceComment: 'disagree',
        respondent1DQExtraDetails: {
          wantPhoneOrVideoHearing: 'Yes',
          whyPhoneOrVideoHearing: 'video',
          giveEvidenceYourSelf: 'Yes',
          determinationWithoutHearingRequired: 'Yes',
          determinationWithoutHearingReason: '',
          considerClaimantDocumentsDetails: '',
          respondent1DQLiPExpert: {
            caseNeedsAnExpert: 'No',
            expertCanStillExamineDetails: '',
          },
        },
        respondent1DQHearingSupportLip: {
          supportRequirementLip: 'Yes',
          requirementsLip: [
            {
              value: {
                name: 'Whit Nessie',
                requirements: ['DISABLED_ACCESS', 'HEARING_LOOPS'],
                signLanguageRequired: '',
                languageToBeInterpreted: '',
                otherSupport: '',
              },
            },
          ],
        },
        respondent1LiPContactPerson: 'contact person',
        respondent1ResponseLanguage: 'ENGLISH',
      },
      respondent1LiPResponseCarm: {
        isMediationContactNameCorrect: 'No',
        alternativeMediationContactPerson: 'new defendant cp',
        isMediationEmailCorrect: 'No',
        alternativeMediationEmail: 'defendantmediation@email.com',
        isMediationPhoneCorrect: 'No',
        alternativeMediationTelephone: '07744444444',
        hasUnavailabilityNextThreeMonths: 'Yes',
        unavailableDatesForMediation: [createUnavailableDate('defendant', 30), createUnavailableDate('defendant', 40, 45)],
      },
      respondent1LiPFinancialDetails: {},
      detailsOfWhyDoesYouDisputeTheClaim: 'reasons',
      specClaimResponseTimelineList: 'MANUAL',
      specResponseTimelineOfEvents: [
        {
          value: {
            timelineDate: formatCivilDate(-100),
            timelineDescription: 'asd',
          },
        },
      ],
      specResponselistYourEvidenceList: [
        {
          id: '0',
          value: {
            evidenceType: 'PHOTO_EVIDENCE',
            photoEvidence: '',
          },
        },
      ],
      defenceRouteRequired: 'HAS_PAID_THE_AMOUNT_CLAIMED',
      respondToClaim: {
        howMuchWasPaid: 95000,
        howWasThisAmountPaid: 'OTHER',
        whenWasThisAmountPaid: '2000-01-01T00:00:00.000Z',
        howWasThisAmountPaidOther: 'card',
      },
      respondent1DQHomeDetails: {},
      respondent1PartnerAndDependent: {
        howManyChildrenByAgeGroup: {},
      },
      specDefendant1SelfEmploymentDetails: {},
      respondToClaimAdmitPartUnemployedLRspec: {},
      respondent1DQLanguage: {
        court: 'ENGLISH',
        documents: 'ENGLISH',
      },
      respondent1DQVulnerabilityQuestions: {
        vulnerabilityAdjustmentsRequired: 'Yes',
        vulnerabilityAdjustments: 'vulnerable',
      },
      respondent1DQRequestedCourt: {
        requestHearingAtSpecificCourt: 'Yes',
        otherPartyPreferredSite: '',
        responseCourtCode: '',
        reasonForHearingAtSpecificCourt: 'court',
        responseCourtLocations: [],
        caseLocation: {
          region: 'Clerkenwell and Shoreditch County Court and Family Court - 29-41 Gee Street - EC1V 3RE',
          baseLocation: 'Clerkenwell and Shoreditch County Court and Family Court - 29-41 Gee Street - EC1V 3RE',
        },
      },
      respondent1DQWitnesses: {
        witnessesToAppear: 'Yes',
        details: [
          {
            value: {
              name: 'Whit',
              firstName: 'Whit',
              lastName: 'Nessie',
              emailAddress: '',
              phoneNumber: '',
              reasonForWitness: 'asd',
            },
          },
        ],
      },
      respondent1DQHearingSmallClaim: {
        unavailableDatesRequired: 'Yes',
        smallClaimUnavailableDate: [createUnavailableDate('defendant', 30), createUnavailableDate('defendant', 40, 45)],
      },
      respondent1DQExperts: {},
    },
  };
}

function claimantLipIntendsToProceedCarmPayload(): JsonRecord {
  return {
    event: 'CLAIMANT_RESPONSE_CUI',
    caseDataUpdate: {
      applicant1LiPResponse: {
        applicant1DQExtraDetails: {
          wantPhoneOrVideoHearing: 'Yes',
          whyPhoneOrVideoHearing: 'skype',
          giveEvidenceYourSelf: 'Yes',
          determinationWithoutHearingRequired: 'No',
          determinationWithoutHearingReason: 'reasons',
          considerClaimantDocumentsDetails: '',
          applicant1DQLiPExpert: {
            caseNeedsAnExpert: 'No',
            expertCanStillExamineDetails: '',
          },
        },
        applicant1DQHearingSupportLip: {
          supportRequirementLip: 'Yes',
          requirementsLip: [
            {
              value: {
                name: 'Test Inc',
                requirements: ['DISABLED_ACCESS'],
                signLanguageRequired: '',
                languageToBeInterpreted: '',
                otherSupport: '',
              },
            },
            {
              value: {
                name: 'Whit Ness',
                requirements: ['HEARING_LOOPS'],
                signLanguageRequired: '',
                languageToBeInterpreted: '',
                otherSupport: '',
              },
            },
          ],
        },
        applicant1RejectedRepaymentReason: 'reasons',
      },
      applicant1LiPResponseCarm: {
        isMediationContactNameCorrect: 'No',
        alternativeMediationContactPerson: 'new contact person',
        isMediationEmailCorrect: 'No',
        alternativeMediationEmail: 'anotherem@ail.com',
        isMediationPhoneCorrect: 'No',
        alternativeMediationTelephone: '07755555555',
        hasUnavailabilityNextThreeMonths: 'Yes',
        unavailableDatesForMediation: [createUnavailableDate('defendant', 6), createUnavailableDate('defendant', 10, 15)],
      },
      applicant1DQLanguage: {
        court: 'ENGLISH',
        documents: 'ENGLISH',
      },
      applicant1DQVulnerabilityQuestions: {
        vulnerabilityAdjustmentsRequired: 'Yes',
        vulnerabilityAdjustments: 'vulnerable',
      },
      applicant1DQRequestedCourt: {
        requestHearingAtSpecificCourt: 'Yes',
        otherPartyPreferredSite: '',
        responseCourtCode: '',
        reasonForHearingAtSpecificCourt: 'reasons',
        responseCourtLocations: [],
        caseLocation: {
          region: 'Clerkenwell and Shoreditch County Court and Family Court - 29-41 Gee Street - EC1V 3RE',
          baseLocation: 'Clerkenwell and Shoreditch County Court and Family Court - 29-41 Gee Street - EC1V 3RE',
        },
      },
      applicant1DQWitnesses: {
        witnessesToAppear: 'Yes',
        details: [
          {
            value: {
              name: 'Whit',
              firstName: 'Whit',
              lastName: 'Ness',
              emailAddress: '',
              phoneNumber: '',
              reasonForWitness: 'terrible things',
            },
          },
        ],
      },
      applicant1DQSmallClaimHearing: {
        unavailableDatesRequired: 'Yes',
        smallClaimUnavailableDate: [createUnavailableDate('defendant', 6), createUnavailableDate('defendant', 10, 15)],
      },
      applicant1DQExperts: {},
      applicant1DQHearingSupport: {
        supportRequirements: 'Yes',
        supportRequirementsAdditional: 'Test Inc :Disabled access;Whit Ness :Hearing loop;',
      },
      applicant1PartAdmitIntentionToSettleClaimSpec: 'No',
      applicant1FullDefenceConfirmAmountPaidSpec: 'Yes',
      applicant1SettleClaim: 'No',
    },
  };
}

function createUnavailableDate(who: string, fromDays: number, toDays?: number): JsonRecord {
  return {
    value: {
      who,
      date: formatCivilDate(fromDays),
      fromDate: formatCivilDate(fromDays),
      ...(toDays === undefined
        ? { unavailableDateType: 'SINGLE_DATE' }
        : {
            toDate: formatCivilDate(toDays),
            unavailableDateType: 'DATE_RANGE',
          }),
    },
  };
}

function formatCivilDate(days = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  return values.map((value) => value?.trim()).find((value): value is string => Boolean(value));
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function isAatUrl(value: string | undefined): boolean {
  return value?.includes('.aat.platform.hmcts.net') ?? false;
}

function createUniqueRunId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toLowerCase();
}

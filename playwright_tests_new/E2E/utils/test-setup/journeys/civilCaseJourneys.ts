import { faker } from '@faker-js/faker';
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
  state?: string | { id?: string; name?: string };
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

export type CivilApiUser = {
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
const DEFAULT_CASE_DETAILS_FETCH_WAIT_TIMEOUT_MS = 60_000;
const DEFAULT_CIVIL_API_REQUEST_TIMEOUT_MS = 60_000;
const DEFAULT_CIVIL_SERVICE_EVENT_REQUEST_TIMEOUT_MS = 90_000;
const DEFAULT_CIVIL_SERVICE_BUSINESS_PROCESS_WAIT_TIMEOUT_MS = 420_000;
const DEFAULT_BUSINESS_PROCESS_WAIT_INTERVAL_MS = 3_000;
const DEFAULT_CCD_EVENT_TRIGGER_WAIT_TIMEOUT_MS = 420_000;
const DEFAULT_CCD_EVENT_TRIGGER_WAIT_INTERVAL_MS = 3_000;
const DEFAULT_CIVIL_ROLE_ASSIGNMENT_WAIT_TIMEOUT_MS = 60_000;
const DEFAULT_CIVIL_S2S_MICROSERVICE = 'civil_service';
const CIVIL_SERVICE_INTERNAL_URLS_BY_ENV = {
  aat: 'http://civil-service-aat.service.core-compute-aat.internal',
  demo: 'http://civil-service-demo.service.core-compute-demo.internal',
} as const;
const CIVIL_SERVICE_AAT_STAGING_HOST = 'civil-cui-civil-service-staging.aat.platform.hmcts.net';
const CCD_DATA_STORE_HOST_TO_CIVIL_SERVICE_ENV = new Map<string, keyof typeof CIVIL_SERVICE_INTERNAL_URLS_BY_ENV>([
  ['civil-cui-data-store-staging.aat.platform.hmcts.net', 'aat'],
  ['ccd-data-store-api-aat.service.core-compute-aat.internal', 'aat'],
  ['ccd-data-store-api-demo.service.core-compute-demo.internal', 'demo'],
]);
const DEFAULT_CIVIL_COURT_STAFF_ROLES = [
  'caseworker',
  'caseworker-civil',
  'caseworker-civil-staff',
  'caseworker-civil-admin',
  'wlu-admin',
  'pui-case-manager',
];
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

export function getCivilLipMediationApiMissingConfiguration(options: { allowMissingCitizenUsers?: boolean } = {}): string[] {
  const config = resolveCivilApiConfig();
  const missing: string[] = [];

  if (!config.civilServiceUrl) {
    missing.push('CIVIL_SERVICE_URL');
  }
  if (!config.idamApiUrl) {
    missing.push('IDAM_API_URL or SERVICES_IDAM_API_URL');
  }
  if (!config.s2sToken && !config.serviceAuthProviderUrl) {
    missing.push('SERVICE_AUTH_PROVIDER_API_BASE_URL or S2S_URL or PW_CIVIL_S2S_TOKEN');
  }
  if (!config.s2sToken && config.serviceAuthProviderUrl && !config.s2sSecret) {
    missing.push('S2S_SECRET');
  }
  if (!config.claimantUser.password || !config.defendantUser.password) {
    missing.push('CITIZEN_PASSWORD or PW_CIVIL_CITIZEN_PASSWORD');
  }
  if (!options.allowMissingCitizenUsers && (!config.claimantUser.email || !config.defendantUser.email)) {
    missing.push('generated Civil users or PW_CIVIL_CLAIMANT_EMAIL/PW_CIVIL_DEFENDANT_EMAIL');
  }

  return missing;
}

export async function createCivilCourtStaffAccountViaApi(page: Page): Promise<CivilApiUser> {
  const config = requireCivilApiConfig({ allowMissingCitizenUsers: true });
  const password = resolveCivilGeneratedAccountPassword();
  const generatedEmailDomain = firstNonEmpty(process.env.PW_CIVIL_COURT_STAFF_EMAIL_DOMAIN) ?? 'example.com';
  const email =
    firstNonEmpty(process.env.CIVIL_COURT_STAFF_USERNAME, process.env.PW_CIVIL_COURT_STAFF_EMAIL) ??
    `civilcourtstaff-${createUniqueRunId()}@${generatedEmailDomain}`;
  const forename = faker.person.firstName();
  const surname = faker.person.lastName();
  const roles =
    firstNonEmpty(process.env.PW_CIVIL_COURT_STAFF_ROLES)
      ?.split(',')
      .map((role) => role.trim())
      .filter(Boolean) ?? DEFAULT_CIVIL_COURT_STAFF_ROLES;

  const response = await postIdamAccountWithRetry(page, config, {
    email,
    forename,
    password,
    roles,
    surname,
    userGroup: 'caseworker',
  });

  if (!response.ok() && response.status() !== 409) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `Failed to create Civil court staff account '${email}' through IDAM testing support ` +
        `(HTTP ${response.status()}). Roles='${roles.join(',')}'. Body='${body.slice(0, 500)}'. ` +
        "Use a Civil admin role set that IDAM burner users accept, for example 'caseworker,caseworker-civil,caseworker-civil-admin,pui-case-manager'."
    );
  }

  return { email, password };
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

  const claimantResponseDetails = await submitCivilCitizenEvent({
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

  logger.info('Created Civil LiP mediation case via Civil API', {
    caseNumber,
    claimantEmail: config.claimantUser.email,
    defendantEmail: config.defendantUser.email,
    expectedState,
  });

  return {
    caseNumber,
    caseDetails: claimantResponseDetails,
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
  const path = `data/internal/cases/${encodeURIComponent(caseNumber)}`;
  const deadline = Date.now() + DEFAULT_CASE_DETAILS_FETCH_WAIT_TIMEOUT_MS;
  let lastStatus = 0;
  let lastBody = '';

  while (Date.now() < deadline) {
    const response = await page.request.get(path, {
      failOnStatusCode: false,
      headers: {
        experimental: 'true',
        Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-case-view.v2+json;charset=UTF-8',
      },
      timeout: resolveCivilApiRequestTimeoutMs(),
    });

    lastStatus = response.status();
    if (response.ok()) {
      return (await response.json()) as CcdCaseDetails;
    }

    lastBody = await response.text().catch(() => '');
    if (!isRetryableCaseDetailsFetchStatus(lastStatus)) {
      break;
    }

    await waitForCivilRetryDelay(page, deadline, `retrying case details fetch for ${caseNumber}`);
  }

  throw new Error(
    `Failed to fetch case ${caseNumber} via API: HTTP ${lastStatus}. Path='data/internal/cases/${caseNumber}'. ` +
      `Body='${lastBody.slice(0, 500)}'`
  );
}

export async function waitForCivilCaseStateViaApi(options: {
  page: Page;
  caseNumber: string;
  expectedState: string;
  context: string;
}): Promise<CcdCaseDetails> {
  return waitForCaseState(options);
}

function isRetryableCaseDetailsFetchStatus(status: number): boolean {
  return [404, 409, 429, 500, 502, 503, 504].includes(status);
}

export function resolveCcdCaseStateId(caseDetails: CcdCaseDetails): string | undefined {
  const state = caseDetails.state;
  if (typeof state === 'string') {
    return state;
  }
  return state?.id;
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
  const eventTrigger = await fetchCcdCaseEventTriggerWithRetry({
    page: options.page,
    caseNumber: options.caseNumber,
    eventId: options.eventId,
  });
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
    timeout: resolveCivilApiRequestTimeoutMs(),
  });
  if (!submitResponse.ok()) {
    const body = await submitResponse.text().catch(() => '');
    throw new Error(
      `Civil case setup failed to submit event '${options.eventId}' (HTTP ${submitResponse.status()}). ` +
        `Path='${submitPath}'. Body='${body.slice(0, 500)}'`
    );
  }
}

async function fetchCcdCaseEventTriggerWithRetry(options: {
  page: Page;
  caseNumber: string;
  eventId: string;
}): Promise<InternalEventTriggerResponse> {
  const eventTriggerPath = `data/internal/cases/${encodeURIComponent(options.caseNumber)}/event-triggers/${encodeURIComponent(
    options.eventId
  )}?ignore-warning=false`;
  const deadline = Date.now() + DEFAULT_CCD_EVENT_TRIGGER_WAIT_TIMEOUT_MS;
  let lastStatus = 0;
  let lastBody = '';

  while (Date.now() < deadline) {
    const response = await options.page.request.get(eventTriggerPath, {
      failOnStatusCode: false,
      headers: CCD_INTERNAL_START_EVENT_HEADERS,
      timeout: resolveCivilApiRequestTimeoutMs(),
    });
    lastStatus = response.status();

    if (response.ok()) {
      return (await response.json()) as InternalEventTriggerResponse;
    }

    lastBody = await response.text().catch(() => '');
    if (!isRetryableCcdEventTriggerResponse(lastStatus, lastBody)) {
      break;
    }
    await waitForCivilRetryDelay(options.page, deadline, `retrying event trigger '${options.eventId}'`);
  }

  throw new Error(
    `Civil case setup failed to fetch event trigger '${options.eventId}' (HTTP ${lastStatus}). ` +
      `Path='${eventTriggerPath}'. Body='${lastBody.slice(0, 500)}'`
  );
}

function isRetryableCcdEventTriggerResponse(status: number, body: string): boolean {
  if ([400, 404, 409, 429, 500, 502, 503, 504].includes(status)) {
    return true;
  }

  return status === 422 && /case status did not qualify for the event/i.test(body);
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
    timeout: resolveCivilApiRequestTimeoutMs(),
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

async function waitForCivilRetryDelay(
  page: Page,
  deadline?: number,
  context = 'waiting before Civil setup retry'
): Promise<void> {
  if (page.isClosed()) {
    throw new Error(`Civil setup ${context} aborted because the Playwright page was closed.`);
  }
  const remainingMs = deadline ? deadline - Date.now() : DEFAULT_CCD_EVENT_TRIGGER_WAIT_INTERVAL_MS;
  const delayMs = Math.min(DEFAULT_CCD_EVENT_TRIGGER_WAIT_INTERVAL_MS, remainingMs);
  if (delayMs <= 0) {
    return;
  }

  try {
    await page.waitForTimeout(delayMs);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/Target page, context or browser has been closed/i.test(message)) {
      throw new Error(`Civil setup ${context} aborted because the Playwright page was closed.`);
    }
    throw error;
  }
}

async function waitForCivilPollingDelay(page: Page, delayMs: number, context: string): Promise<void> {
  if (page.isClosed()) {
    throw new Error(`Civil setup ${context} aborted because the Playwright page was closed.`);
  }

  try {
    await page.waitForTimeout(delayMs);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/Target page, context or browser has been closed/i.test(message)) {
      throw new Error(`Civil setup ${context} aborted because the Playwright page was closed.`);
    }
    throw error;
  }
}

async function waitForCaseState(options: {
  page: Page;
  caseNumber: string;
  expectedState: string;
  context: string;
}): Promise<CcdCaseDetails> {
  const deadline = Date.now() + DEFAULT_STATE_WAIT_TIMEOUT_MS;
  let lastCaseDetails: CcdCaseDetails | undefined;
  let lastFetchError: string | undefined;

  while (Date.now() < deadline) {
    try {
      lastCaseDetails = await fetchCaseDetailsViaApi(options.page, options.caseNumber);
      lastFetchError = undefined;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!isRetryableCaseDetailsFetchError(message)) {
        throw error;
      }
      lastFetchError = message;
      await waitForCivilPollingDelay(options.page, DEFAULT_STATE_WAIT_INTERVAL_MS, 'waiting for Civil case state');
      continue;
    }

    if (resolveCcdCaseStateId(lastCaseDetails) === options.expectedState) {
      return lastCaseDetails;
    }
    await waitForCivilPollingDelay(options.page, DEFAULT_STATE_WAIT_INTERVAL_MS, 'waiting for Civil case state');
  }

  const actualState = lastCaseDetails
    ? (resolveCcdCaseStateId(lastCaseDetails) ?? JSON.stringify(lastCaseDetails.state))
    : 'unknown';
  const fetchErrorSuffix = lastFetchError ? ` Last fetch error: ${lastFetchError}` : '';
  throw new Error(
    `Civil case ${options.caseNumber} expected state '${options.expectedState}' ${options.context} ` +
      `but was '${actualState}'.${fetchErrorSuffix}`
  );
}

function isRetryableCaseDetailsFetchError(message: string): boolean {
  return /Failed to fetch case .* via API: HTTP (404|409|429|500|502|503|504)/i.test(message);
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
  const createCitizenAccounts = !isFalsy(process.env.PW_CIVIL_CREATE_CITIZEN_ACCOUNTS);
  const generatedRunId = createUniqueRunId();
  const claimantGenerated = createCitizenAccounts && !claimantEmail;
  const defendantGenerated = createCitizenAccounts && !defendantEmail;

  const idamApiUrl = resolveIdamApiUrl();

  return {
    civilServiceUrl: resolveCivilServiceUrl(),
    idamApiUrl,
    idamTestSupportApiUrl: resolveIdamTestingSupportApiUrl(idamApiUrl),
    serviceAuthProviderUrl: trimTrailingSlash(
      firstNonEmpty(process.env.SERVICE_AUTH_PROVIDER_API_BASE_URL, process.env.S2S_URL) ?? ''
    ),
    s2sToken: firstNonEmpty(process.env.PW_CIVIL_S2S_TOKEN, process.env.CIVIL_S2S_TOKEN),
    s2sSecret: firstNonEmpty(process.env.S2S_SECRET),
    claimantUser: {
      email: claimantEmail ?? (claimantGenerated ? `claimantcitizen-${generatedRunId}@example.com` : ''),
      password: citizenPassword ?? '',
    },
    defendantUser: {
      email: defendantEmail ?? (defendantGenerated ? `defendantcitizen-${generatedRunId}@example.com` : ''),
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

function resolveIdamTestingSupportApiUrl(idamApiUrl: string): string {
  const configured = trimTrailingSlash(
    firstNonEmpty(
      process.env.IDAM_TEST_SUPPORT_API_URL,
      process.env.IDAM_TESTING_SUPPORT_URL,
      process.env.PW_IDAM_TEST_SUPPORT_API_URL,
      process.env.PW_IDAM_TESTING_SUPPORT_API_URL
    ) ?? ''
  );
  if (configured) {
    return normaliseIdamTestingSupportBaseUrl(configured);
  }

  return normaliseIdamTestingSupportBaseUrl(
    idamApiUrl.replace(/^https?:\/\/idam-api\./i, (match) => match.replace(/idam-api/i, 'idam-testing-support-api'))
  );
}

function normaliseIdamTestingSupportBaseUrl(value: string): string {
  return trimTrailingSlash(value)
    .replace(/\/test\/idam\/burner\/users$/i, '')
    .replace(/\/test\/idam\/users$/i, '')
    .replace(/\/testing-support\/accounts$/i, '');
}

function resolveCivilServiceUrl(): string {
  const explicitOverride = firstNonEmpty(process.env.PW_CIVIL_SERVICE_URL);
  if (explicitOverride) {
    return trimTrailingSlash(explicitOverride);
  }

  const configured = firstNonEmpty(process.env.CIVIL_SERVICE_URL);
  if (configured?.includes(CIVIL_SERVICE_AAT_STAGING_HOST)) {
    return resolveCivilServiceInternalUrl('aat');
  }
  if (configured) {
    return trimTrailingSlash(configured);
  }

  const ccdDataStoreUrl = firstNonEmpty(process.env.CCD_DATA_STORE_URL, process.env.SERVICES_CCD_DATA_STORE_API);
  const civilServiceEnvFromCcd = resolveCivilServiceEnvironmentFromCcdDataStoreUrl(ccdDataStoreUrl);
  if (civilServiceEnvFromCcd) {
    return resolveCivilServiceInternalUrl(civilServiceEnvFromCcd);
  }

  const testEnv = firstNonEmpty(process.env.TEST_ENV, process.env.ENVIRONMENT)?.toLowerCase();
  if (testEnv === 'demo') {
    return resolveCivilServiceInternalUrl('demo');
  }

  if (testEnv === 'aat' || isAatUrl(firstNonEmpty(process.env.TEST_URL, process.env.EXUI_BASE_URL))) {
    return resolveCivilServiceInternalUrl('aat');
  }

  return '';
}

function resolveCivilServiceInternalUrl(environment: keyof typeof CIVIL_SERVICE_INTERNAL_URLS_BY_ENV): string {
  return CIVIL_SERVICE_INTERNAL_URLS_BY_ENV[environment];
}

function resolveCivilServiceEnvironmentFromCcdDataStoreUrl(
  ccdDataStoreUrl: string | undefined
): keyof typeof CIVIL_SERVICE_INTERNAL_URLS_BY_ENV | undefined {
  if (!ccdDataStoreUrl) {
    return undefined;
  }

  for (const [host, environment] of CCD_DATA_STORE_HOST_TO_CIVIL_SERVICE_ENV) {
    if (ccdDataStoreUrl.includes(host)) {
      return environment;
    }
  }

  return undefined;
}

function requireCivilApiConfig(options: { allowMissingCitizenUsers?: boolean } = {}): CivilApiConfig {
  const missing = getCivilLipMediationApiMissingConfiguration(options);
  if (missing.length) {
    throw new Error(`Civil LiP mediation API setup is missing configuration: ${missing.join(', ')}`);
  }
  return resolveCivilApiConfig();
}

function resolveCivilGeneratedAccountPassword(): string {
  const password = firstNonEmpty(
    process.env.CIVIL_COURT_STAFF_PASSWORD,
    process.env.PW_CIVIL_COURT_STAFF_PASSWORD,
    process.env.PW_CIVIL_CITIZEN_PASSWORD,
    process.env.CIVIL_CITIZEN_PASSWORD,
    process.env.CITIZEN_PASSWORD,
    process.env.PW_CIVIL_SOLICITOR_PASSWORD,
    process.env.TEST_PASSWORD
  );

  if (!password) {
    throw new Error(
      'Civil generated account setup is missing CIVIL_COURT_STAFF_PASSWORD, PW_CIVIL_CITIZEN_PASSWORD, CIVIL_CITIZEN_PASSWORD, or TEST_PASSWORD.'
    );
  }

  return password;
}

function withGeneratedCivilCitizenUsers(config: CivilApiConfig): CivilApiConfig {
  const password = resolveCivilGeneratedAccountPassword();

  const runId = createUniqueRunId();
  return {
    ...config,
    claimantUser: {
      email: `claimant-civil-${runId}@example.com`,
      password,
    },
    defendantUser: {
      email: `defendant-civil-${runId}@example.com`,
      password,
    },
    createClaimantAccount: true,
    createDefendantAccount: true,
  };
}

function resolveCivilApiRequestTimeoutMs(): number {
  return resolvePositiveInt(process.env.PW_CIVIL_API_REQUEST_TIMEOUT_MS, DEFAULT_CIVIL_API_REQUEST_TIMEOUT_MS);
}

function resolveCivilServiceEventRequestTimeoutMs(): number {
  return resolvePositiveInt(
    process.env.PW_CIVIL_SERVICE_EVENT_REQUEST_TIMEOUT_MS ?? process.env.PW_CIVIL_API_REQUEST_TIMEOUT_MS,
    DEFAULT_CIVIL_SERVICE_EVENT_REQUEST_TIMEOUT_MS
  );
}

function resolveCivilServiceBusinessProcessWaitTimeoutMs(): number {
  const parsed = Number.parseInt(process.env.PW_CIVIL_SERVICE_BUSINESS_PROCESS_WAIT_TIMEOUT_MS ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CIVIL_SERVICE_BUSINESS_PROCESS_WAIT_TIMEOUT_MS;
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
  const response = await postIdamCitizenAccountWithRetry(page, config, user);

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

async function postIdamCitizenAccountWithRetry(page: Page, config: CivilApiConfig, user: CivilApiUser) {
  return postIdamAccountWithRetry(page, config, {
    email: user.email,
    forename: 'Civil',
    password: user.password,
    roles: ['citizen'],
    surname: 'Citizen',
    userGroup: 'citizen',
  });
}

async function postIdamAccountWithRetry(
  page: Page,
  config: CivilApiConfig,
  account: {
    email: string;
    forename: string;
    password: string;
    roles: string[];
    surname: string;
    userGroup: string;
  }
) {
  let lastError: unknown;
  let lastResponse: Awaited<ReturnType<Page['request']['post']>> | undefined;
  const accountCreationTargets = resolveIdamAccountCreationTargets(config, account);
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    for (const target of accountCreationTargets) {
      try {
        const response = await page.request.post(target.url, {
          data: target.data,
          failOnStatusCode: false,
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: resolveCivilApiRequestTimeoutMs(),
        });
        lastResponse = response;
        if (response.ok() || response.status() === 409) {
          return response;
        }
        if (!isRetryableIdamAccountCreationStatus(response.status())) {
          return response;
        }
      } catch (error) {
        lastError = error;
      }
    }
    await page.waitForTimeout(5_000);
  }

  if (lastResponse) {
    return lastResponse;
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

function isRetryableIdamAccountCreationStatus(status: number): boolean {
  return [401, 403, 404, 409, 429, 500, 502, 503, 504].includes(status);
}

function resolveIdamAccountCreationTargets(
  config: CivilApiConfig,
  account: {
    email: string;
    forename: string;
    password: string;
    roles: string[];
    surname: string;
    userGroup: string;
  }
): Array<{ data: JsonRecord; url: string }> {
  const accountPayload = {
    email: account.email,
    forename: account.forename,
    surname: account.surname,
    password: account.password,
    roles: account.roles.map((code) => ({ code })),
    userGroup: {
      code: account.userGroup,
    },
  };
  const userPayload = {
    password: account.password,
    user: {
      email: account.email,
      forename: account.forename,
      surname: account.surname,
      displayName: `${account.forename} ${account.surname}`,
      roleNames: account.roles,
    },
  };

  return [
    ...(config.idamTestSupportApiUrl
      ? [
          { url: `${config.idamTestSupportApiUrl}/test/idam/users`, data: userPayload },
          { url: `${config.idamTestSupportApiUrl}/test/idam/burner/users`, data: accountPayload },
          { url: `${config.idamTestSupportApiUrl}/testing-support/accounts`, data: accountPayload },
        ]
      : []),
    ...(config.idamApiUrl ? [{ url: `${config.idamApiUrl}/testing-support/accounts`, data: accountPayload }] : []),
  ];
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
      timeout: resolveCivilApiRequestTimeoutMs(),
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
    try {
      const response = await page.request.post(`${config.idamApiUrl}/loginUser`, {
        failOnStatusCode: false,
        form: {
          username: user.email,
          password: user.password,
        },
        timeout: resolveCivilApiRequestTimeoutMs(),
      });

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
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
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
    timeout: resolveCivilApiRequestTimeoutMs(),
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
    throw new Error('Civil S2S token requires PW_CIVIL_S2S_TOKEN or SERVICE_AUTH_PROVIDER_API_BASE_URL/S2S_URL and S2S_SECRET.');
  }

  const leaseUrl = config.serviceAuthProviderUrl.endsWith('/lease')
    ? config.serviceAuthProviderUrl
    : `${config.serviceAuthProviderUrl}/lease`;
  let response;
  try {
    response = await page.request.post(leaseUrl, {
      data: {
        microservice: firstNonEmpty(process.env.PW_CIVIL_S2S_MICROSERVICE) ?? DEFAULT_CIVIL_S2S_MICROSERVICE,
        oneTimePassword: authenticator.generate(config.s2sSecret),
      },
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: resolveCivilApiRequestTimeoutMs(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/ENOTFOUND|getaddrinfo/i.test(message)) {
      throw new Error(
        `Civil S2S token setup cannot reach '${leaseUrl}'. ` +
          'Provide a civil_service token through PW_CIVIL_S2S_TOKEN, or run from an environment that can resolve the HMCTS internal S2S host.'
      );
    }
    throw error;
  }

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
    timeout: resolveCivilServiceEventRequestTimeoutMs(),
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
  const assignUrl = `${options.config.civilServiceUrl}/testing-support/assign-case/${encodeURIComponent(
    options.caseNumber
  )}/${encodeURIComponent(options.caseRole)}`;
  const timeoutMs = resolveCivilRoleAssignmentWaitTimeoutMs();
  const deadline = Date.now() + timeoutMs;
  let lastStatus = 0;
  let lastBody = '';

  while (Date.now() < deadline) {
    const response = await options.page.request.post(assignUrl, {
      data: {},
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${options.idamToken}`,
        'Content-Type': 'application/json',
      },
      timeout: resolveCivilApiRequestTimeoutMs(),
    });

    lastStatus = response.status();
    if (response.ok() || response.status() === 409) {
      return;
    }

    lastBody = await response.text().catch(() => '');
    if (!isRetryableCivilRoleAssignmentResponse(lastStatus, lastBody)) {
      break;
    }

    await waitForCivilRetryDelay(
      options.page,
      deadline,
      `retrying Civil case role '${options.caseRole}' assignment for case ${options.caseNumber}`
    );
  }

  throw new Error(
    `Failed to assign Civil case role '${options.caseRole}' after ${timeoutMs}ms (HTTP ${lastStatus}). ` +
      `Body='${lastBody.slice(0, 500)}'`
  );
}

function isRetryableCivilRoleAssignmentResponse(status: number, body: string): boolean {
  if ([429, 500, 502, 503, 504].includes(status) && /case status did not qualify for the event/i.test(body)) {
    return true;
  }

  return [429, 502, 503, 504].includes(status);
}

function resolveCivilRoleAssignmentWaitTimeoutMs(): number {
  const parsed = Number.parseInt(process.env.PW_CIVIL_ROLE_ASSIGNMENT_WAIT_TIMEOUT_MS ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CIVIL_ROLE_ASSIGNMENT_WAIT_TIMEOUT_MS;
}

async function waitForFinishedCivilBusinessProcess(
  page: Page,
  config: CivilApiConfig,
  idamToken: string,
  caseNumber: string,
  options: { timeoutMs?: number } = {}
): Promise<void> {
  const timeoutMs = options.timeoutMs ?? resolveCivilServiceBusinessProcessWaitTimeoutMs();
  const deadline = Date.now() + timeoutMs;
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
        timeout: resolveCivilApiRequestTimeoutMs(),
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

  throw new Error(
    `Civil business process did not finish for case ${caseNumber} after ${timeoutMs}ms. Last status: ${lastStatus}`
  );
}

function resolveCaseNumberFromCivilResponse(payload: CcdCaseDetails): string {
  const candidate = payload.id ?? payload.case_id ?? payload.case_reference ?? payload.caseReference;
  if (typeof candidate === 'string' || typeof candidate === 'number') {
    return String(candidate).replace(/\D/g, '');
  }
  throw new Error('Civil create claim API response did not include a case id.');
}

function createLipClaimWithCompanyDefendantPayload(user: CivilApiUser, userId: string): JsonRecord {
  const applicantFirstName = faker.person.firstName();
  const applicantLastName = faker.person.lastName();
  const applicantTitle = faker.person.prefix();
  const defendantCompanyName = faker.company.name();
  const claimReason = faker.lorem.words(3);
  const claimantContactPerson = faker.person.fullName();
  const timelineDescription = faker.lorem.sentence();

  return {
    event: 'CREATE_LIP_CLAIM',
    caseDataUpdate: {
      applicant1: {
        individualDateOfBirth: '1995-08-28',
        individualFirstName: applicantFirstName,
        individualLastName: applicantLastName,
        individualTitle: applicantTitle,
        partyEmail: user.email,
        partyPhone: '07446777177',
        primaryAddress: {
          AddressLine1: faker.location.buildingNumber(),
          AddressLine2: faker.location.street(),
          AddressLine3: '',
          PostCode: 'S12eu',
          PostTown: faker.location.city(),
        },
        type: 'INDIVIDUAL',
      },
      respondent1: {
        companyName: defendantCompanyName,
        partyEmail: user.email,
        partyPhone: '07800000000',
        primaryAddress: {
          AddressLine1: faker.location.buildingNumber(),
          AddressLine2: faker.location.street(),
          AddressLine3: '',
          PostCode: 'IG61JD',
          PostTown: faker.location.city(),
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
            claimReason,
          },
        },
      ],
      detailsOfClaim: claimReason,
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
        contactPerson: defendantCompanyName,
      },
      applicant1AdditionalLipPartyDetails: {
        correspondenceAddress: {
          AddressLine1: faker.location.buildingNumber(),
          AddressLine2: faker.location.street(),
          AddressLine3: '',
          PostCode: 'L7 2pz',
          PostTown: faker.location.city(),
        },
        contactPerson: claimantContactPerson,
      },
      timelineOfEvents: [
        {
          id: '0',
          value: {
            timelineDate: '2000-01-01',
            timelineDescription,
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
        partyEmail: faker.internet.email({ provider: 'example.com' }),
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
        alternativeMediationEmail: faker.internet.email({ provider: 'example.com' }),
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
        alternativeMediationEmail: faker.internet.email({ provider: 'example.com' }),
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

function resolvePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function isAatUrl(value: string | undefined): boolean {
  return value?.includes('.aat.platform.hmcts.net') ?? false;
}

function isFalsy(value: string | undefined): boolean {
  return ['0', 'false', 'no', 'n'].includes(value?.trim().toLowerCase() ?? '');
}

function createUniqueRunId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toLowerCase();
}

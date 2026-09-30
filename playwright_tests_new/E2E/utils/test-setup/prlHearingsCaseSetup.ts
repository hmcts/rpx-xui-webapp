import { createLogger, IdamUtils } from '@hmcts/playwright-common';
import { request } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import * as dotenv from 'dotenv';
import prlC100DummyCaseData from '../../testData/hearings/prlC100DummyCaseData.json' with { type: 'json' };

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH ?? '.env' });
dotenv.config();

type UserCredentials = {
  username: string;
  password: string;
};

export type PrlHearingsCaseSetupConfig = {
  idamApiUrl?: string;
  idamWebUrl?: string;
  idamTestingSupportUrl?: string;
  ccdDataStoreUrl?: string;
  prlCosApiUrl?: string;
  idamClientId?: string;
  idamSecret?: string;
  redirectUri?: string;
  s2sUrl?: string;
  s2sToken?: string;
  serviceMicroservice?: string;
  citizenUsername?: string;
  citizenPassword?: string;
  courtAdminUsername?: string;
  courtAdminPassword?: string;
};

export type PrlCourtLocation = {
  code: string;
  label: string;
};

export type PrlHearingsCaseSetupResult = {
  caseReference: string;
};

type CaseCreateResponse = {
  id?: string | number;
  case_id?: string | number;
  caseReference?: string | number;
  case_reference?: string | number;
};

type CcdCaseResponse = CaseCreateResponse & {
  state?: string;
  data?: Record<string, unknown>;
  case_data?: Record<string, unknown>;
};

type EventTokenResponse = {
  token?: string;
  case_details?: {
    case_data?: {
      courtList?: {
        list_items?: Array<Partial<PrlCourtLocation>>;
      };
    };
  };
};

type WorkAllocationCourtResponse = {
  data?: {
    courtList?: {
      list_items?: Array<Partial<PrlCourtLocation>>;
    };
  };
};

const CASE_REFERENCE_REGEX = /^\d{16}$/;
const PRL_JURISDICTION = 'PRIVATELAW';
const PRL_CASE_TYPE = 'PRLAPPS';
const ISSUE_AND_SEND_TO_LOCAL_COURT_EVENT_ID = 'issueAndSendToLocalCourtCallback';
const TRANSFER_TO_ANOTHER_COURT_EVENT_ID = 'transferToAnotherCourt';
const CASE_ISSUED_STATE = 'CASE_ISSUED';
const DEFAULT_SERVICE_MICROSERVICE = 'ccd_data';
const REQUIRED_ENV_MESSAGE =
  'PRL hearings setup requires CCD_DATA_STORE_URL, PRL_COS_API_URL, IDAM_SECRET, ' +
  'S2S_URL or PRL_HEARINGS_S2S_TOKEN, a redirect URI, citizen credentials, and court admin credentials.';

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  return values.map((value) => value?.trim()).find((value): value is string => Boolean(value));
}

function resolveManageCaseRedirectUri(testUrl?: string): string | undefined {
  const baseUrl = firstNonEmpty(testUrl);
  if (!baseUrl) {
    return undefined;
  }
  try {
    return new URL('/oauth2/callback', baseUrl).toString();
  } catch {
    return undefined;
  }
}

export function resolvePrlHearingsCaseSetupConfig(env: NodeJS.ProcessEnv = process.env): PrlHearingsCaseSetupConfig {
  return {
    idamApiUrl: firstNonEmpty(
      env.IDAM_API_URL,
      env.IDAM_TESTING_SUPPORT_URL,
      env.IDAM_TESTING_SUPPORT_USERS_URL,
      env.IDAM_WEB_URL
    ),
    idamWebUrl: firstNonEmpty(env.IDAM_WEB_URL),
    idamTestingSupportUrl: firstNonEmpty(env.IDAM_TESTING_SUPPORT_URL, env.IDAM_TESTING_SUPPORT_USERS_URL),
    ccdDataStoreUrl: firstNonEmpty(env.CCD_DATA_STORE_URL),
    prlCosApiUrl: firstNonEmpty(env.PRL_COS_API_URL, env.PRL_HEARINGS_PRL_COS_API_URL, env.PRL_COS_API),
    idamClientId: firstNonEmpty(env.IDAM_CLIENT_ID, env.SERVICES_IDAM_CLIENT_ID, 'xuiwebapp'),
    idamSecret: firstNonEmpty(env.IDAM_SECRET),
    redirectUri: firstNonEmpty(
      env.MANAGE_CASE_REDIRECT_URI,
      env.ORG_USER_ASSIGNMENT_REDIRECT_URI,
      resolveManageCaseRedirectUri(env.TEST_URL)
    ),
    s2sUrl: firstNonEmpty(env.PRL_HEARINGS_S2S_URL, env.S2S_URL),
    s2sToken: firstNonEmpty(env.PRL_HEARINGS_S2S_TOKEN),
    serviceMicroservice: firstNonEmpty(env.PRL_HEARINGS_SERVICE_MICROSERVICE, DEFAULT_SERVICE_MICROSERVICE),
    citizenUsername: firstNonEmpty(env.CITIZEN_USERNAME),
    citizenPassword: firstNonEmpty(env.CITIZEN_PASSWORD),
    courtAdminUsername: firstNonEmpty(env.COURT_ADMIN_STOKE_USERNAME, env.PRL_HEARINGS_SETUP_USERNAME),
    courtAdminPassword: firstNonEmpty(env.COURT_ADMIN_STOKE_PASSWORD, env.PRL_HEARINGS_SETUP_PASSWORD),
  };
}

export function validatePrlHearingsCaseSetupConfig(config: PrlHearingsCaseSetupConfig): string[] {
  const missing: string[] = [];
  if (!config.idamApiUrl?.trim()) {
    missing.push('IDAM_API_URL, IDAM_TESTING_SUPPORT_URL, or IDAM_TESTING_SUPPORT_USERS_URL');
  }
  if (!config.idamWebUrl?.trim()) missing.push('IDAM_WEB_URL');
  if (!config.idamTestingSupportUrl?.trim()) missing.push('IDAM_TESTING_SUPPORT_URL or IDAM_TESTING_SUPPORT_USERS_URL');
  if (!config.ccdDataStoreUrl?.trim()) missing.push('CCD_DATA_STORE_URL');
  if (!config.prlCosApiUrl?.trim()) missing.push('PRL_COS_API_URL');
  if (!config.idamSecret?.trim()) missing.push('IDAM_SECRET');
  if (!config.redirectUri?.trim()) missing.push('MANAGE_CASE_REDIRECT_URI or ORG_USER_ASSIGNMENT_REDIRECT_URI');
  if (!config.s2sUrl?.trim() && !config.s2sToken?.trim()) missing.push('S2S_URL or PRL_HEARINGS_S2S_TOKEN');
  if (!config.serviceMicroservice?.trim()) missing.push('PRL_HEARINGS_SERVICE_MICROSERVICE');
  if (!config.citizenUsername?.trim()) missing.push('CITIZEN_USERNAME');
  if (!config.citizenPassword?.trim()) missing.push('CITIZEN_PASSWORD');
  if (!config.courtAdminUsername?.trim()) missing.push('COURT_ADMIN_STOKE_USERNAME');
  if (!config.courtAdminPassword?.trim()) missing.push('COURT_ADMIN_STOKE_PASSWORD');
  return missing;
}

export function isPrlHearingsCaseSetupEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const configuredValue = env.PRL_HEARINGS_CASE_SETUP?.trim().toLowerCase();
  return configuredValue === 'true';
}

function formatHttpFailure(action: string, status: number): Error {
  return new Error(`${action} (HTTP ${status}). Check sanitized service logs for response details.`);
}

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

function buildIssueAndSendToLocalCourtEventData(courtLocation: PrlCourtLocation): Record<string, unknown> {
  return {
    data: {
      courtList: {
        value: courtLocation,
        list_items: [courtLocation],
      },
    },
  };
}

function selectCourtLocationFromList(
  listItems: Array<Partial<PrlCourtLocation>> | undefined,
  primaryLocation: string,
  source: string
): PrlCourtLocation {
  const matches = (listItems ?? []).filter(
    (location): location is PrlCourtLocation =>
      location.code?.split(':', 1)[0]?.trim() === primaryLocation && Boolean(location.label?.trim())
  );

  if (matches.length !== 1) {
    throw new Error(
      `PRL hearings setup expected exactly one ${source} for hearing manager location ${primaryLocation}, found ${matches.length}.`
    );
  }

  return matches[0];
}

function selectCourtLocation(eventTokenResponse: EventTokenResponse, primaryLocation: string): PrlCourtLocation {
  return selectCourtLocationFromList(
    eventTokenResponse.case_details?.case_data?.courtList?.list_items,
    primaryLocation,
    'CCD court option'
  );
}

function selectWorkAllocationCourtLocation(response: WorkAllocationCourtResponse, primaryLocation: string): PrlCourtLocation {
  return selectCourtLocationFromList(response.data?.courtList?.list_items, primaryLocation, 'PRL Work Allocation court option');
}

function buildWorkAllocationPreflightRequest(primaryLocation: string): Record<string, unknown> {
  return {
    event_id: TRANSFER_TO_ANOTHER_COURT_EVENT_ID,
    case_details: {
      jurisdiction: PRL_JURISDICTION,
      case_type_id: PRL_CASE_TYPE,
      state: 'SUBMITTED_PAID',
      data: {
        caseTypeOfApplication: 'C100',
        courtId: primaryLocation,
      },
    },
  };
}

function normalizeIdamApiUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hostname = parsed.hostname
      .replace(/^idam-testing-support-api\./i, 'idam-api.')
      .replace(/^idam-web-public\./i, 'idam-api.');
    parsed.pathname = parsed.pathname
      .replace(/\/+$/, '')
      .replace(/\/testing-support\/accounts$/i, '')
      .replace(/\/test\/idam\/users$/i, '')
      .replace(/\/o\/token$/i, '');
    parsed.search = '';
    parsed.hash = '';
    return normalizeBaseUrl(parsed.toString());
  } catch {
    return normalizeBaseUrl(url);
  }
}

function normalizeIdamTestingSupportUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.pathname = parsed.pathname
      .replace(/\/+$/, '')
      .replace(/\/test\/idam\/burner\/users$/i, '')
      .replace(/\/test\/idam\/users$/i, '');
    parsed.search = '';
    parsed.hash = '';
    return normalizeBaseUrl(parsed.toString());
  } catch {
    return normalizeBaseUrl(url);
  }
}

function extractCaseReference(response: CaseCreateResponse): string {
  const value = response.caseReference ?? response.case_reference ?? response.case_id ?? response.id;
  const caseReference = String(value ?? '').trim();
  if (!CASE_REFERENCE_REGEX.test(caseReference)) {
    createLogger().error(`PRL hearings case setup - invalid case reference`);
    throw new Error('PRL hearings setup created a case but CCD did not return a valid 16-digit case reference.');
  }
  return caseReference;
}

async function getBearerToken(credentials: UserCredentials, config: Required<PrlHearingsCaseSetupConfig>): Promise<string> {
  const previousIdamWebUrl = process.env.IDAM_WEB_URL;
  const previousTestingSupportUrl = process.env.IDAM_TESTING_SUPPORT_URL;
  process.env.IDAM_WEB_URL = normalizeBaseUrl(config.idamWebUrl);
  process.env.IDAM_TESTING_SUPPORT_URL = normalizeIdamTestingSupportUrl(config.idamTestingSupportUrl);
  try {
    return await new IdamUtils().generateIdamToken({
      grantType: 'password',
      username: credentials.username,
      password: credentials.password,
      scope: 'openid profile roles',
      clientId: config.idamClientId,
      clientSecret: config.idamSecret,
      redirectUri: config.redirectUri,
    });
  } finally {
    if (previousIdamWebUrl === undefined) {
      delete process.env.IDAM_WEB_URL;
    } else {
      process.env.IDAM_WEB_URL = previousIdamWebUrl;
    }
    if (previousTestingSupportUrl === undefined) {
      delete process.env.IDAM_TESTING_SUPPORT_URL;
    } else {
      process.env.IDAM_TESTING_SUPPORT_URL = previousTestingSupportUrl;
    }
  }
}

async function getUserId(
  apiContext: APIRequestContext,
  config: Required<PrlHearingsCaseSetupConfig>,
  token: string
): Promise<string> {
  const response = await apiContext.get(`${normalizeIdamApiUrl(config.idamApiUrl)}/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    failOnStatusCode: false,
  });

  if (!response.ok()) {
    throw new Error(`PRL hearings setup could not resolve IDAM user details (HTTP ${response.status()}).`);
  }

  const body = (await response.json()) as { id?: string; uid?: string };
  const userId = body.uid ?? body.id;
  if (!userId?.trim()) {
    throw new Error('PRL hearings setup could not resolve an IDAM user id.');
  }
  return userId;
}

async function getServiceToken(
  apiContext: APIRequestContext,
  config: Required<PrlHearingsCaseSetupConfig>,
  microservice: string
): Promise<string> {
  const configuredToken = firstNonEmpty(config.s2sToken);
  if (configuredToken) {
    return configuredToken;
  }

  const response = await apiContext.post(config.s2sUrl, {
    data: {
      microservice,
    },
    failOnStatusCode: false,
  });

  if (!response.ok()) {
    throw new Error(`PRL hearings setup could not fetch S2S token (HTTP ${response.status()}).`);
  }

  const token = (await response.text()).trim();
  if (!token) {
    throw new Error('PRL hearings setup S2S response did not include a token.');
  }
  return token;
}

async function preflightWorkAllocationCourt(
  apiContext: APIRequestContext,
  config: Required<PrlHearingsCaseSetupConfig>,
  bearerToken: string,
  serviceToken: string,
  primaryLocation: string
): Promise<PrlCourtLocation> {
  const response = await apiContext.post(`${normalizeBaseUrl(config.prlCosApiUrl)}/transfer-court/about-to-start`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      ServiceAuthorization: `Bearer ${serviceToken}`,
      'Content-Type': 'application/json',
    },
    data: buildWorkAllocationPreflightRequest(primaryLocation),
    failOnStatusCode: false,
  });

  if (!response.ok()) {
    throw formatHttpFailure('PRL hearings setup Work Allocation court preflight failed', response.status());
  }

  return selectWorkAllocationCourtLocation((await response.json()) as WorkAllocationCourtResponse, primaryLocation);
}

async function prepareCitizenCaseAfterPreflight(
  preflight: () => Promise<unknown>,
  getCitizenToken: () => Promise<string>,
  createDraft: (citizenToken: string) => Promise<CcdCaseResponse>
): Promise<{ citizenToken: string; createdCase: CcdCaseResponse }> {
  await preflight();
  const citizenToken = await getCitizenToken();
  return {
    citizenToken,
    createdCase: await createDraft(citizenToken),
  };
}

async function getEventToken(
  apiContext: APIRequestContext,
  config: Required<PrlHearingsCaseSetupConfig>,
  userId: string,
  bearerToken: string,
  serviceToken: string,
  eventId: string,
  caseReference: string,
  primaryLocation: string
): Promise<{ token: string; courtLocation: PrlCourtLocation }> {
  const tokenUrl =
    `${normalizeBaseUrl(config.ccdDataStoreUrl)}/caseworkers/${encodeURIComponent(userId)}` +
    `/jurisdictions/${PRL_JURISDICTION}/case-types/${PRL_CASE_TYPE}` +
    `/cases/${caseReference}/event-triggers/${eventId}/token`;
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      ServiceAuthorization: `Bearer ${serviceToken}`,
      Experimental: 'true',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    failOnStatusCode: false,
  };

  let response = await apiContext.get(tokenUrl, requestOptions);
  if (response.status() === 415) {
    response = await apiContext.post(tokenUrl, {
      ...requestOptions,
      data: {},
    });
  }

  if (!response.ok()) {
    throw new Error(`PRL hearings setup could not fetch CCD event token for ${eventId} (HTTP ${response.status()}).`);
  }

  const body = (await response.json()) as EventTokenResponse;
  if (!body.token?.trim()) {
    throw new Error('PRL hearings setup event token response did not include a token.');
  }
  return {
    token: body.token,
    courtLocation: selectCourtLocation(body, primaryLocation),
  };
}

async function createDraftCitizenCase(
  apiContext: APIRequestContext,
  config: Required<PrlHearingsCaseSetupConfig>,
  bearerToken: string,
  serviceToken: string
): Promise<CcdCaseResponse> {
  const response = await apiContext.post(
    `${normalizeBaseUrl(config.prlCosApiUrl)}/testing-support/create-dummy-citizen-case-with-body`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        ServiceAuthorization: `Bearer ${serviceToken}`,
        'Content-Type': 'application/json',
      },
      data: prlC100DummyCaseData,
      failOnStatusCode: false,
    }
  );

  if (!response.ok()) {
    throw formatHttpFailure('PRL hearings setup citizen case create failed', response.status());
  }

  return (await response.json()) as CcdCaseResponse;
}

async function submitCitizenCase(
  apiContext: APIRequestContext,
  config: Required<PrlHearingsCaseSetupConfig>,
  bearerToken: string,
  serviceToken: string,
  createdCase: CcdCaseResponse
): Promise<void> {
  const caseReference = extractCaseReference(createdCase);
  const response = await apiContext.post(
    `${normalizeBaseUrl(config.prlCosApiUrl)}/citizen/${caseReference}/citizen-case-submit/submit-c100-application`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        ServiceAuthorization: `Bearer ${serviceToken}`,
        'Content-Type': 'application/json',
      },
      data: createdCase,
      failOnStatusCode: false,
    }
  );

  if (!response.ok()) {
    throw formatHttpFailure('PRL hearings setup citizen case submit failed', response.status());
  }
}

async function submitCcdEvent(
  apiContext: APIRequestContext,
  config: Required<PrlHearingsCaseSetupConfig>,
  userId: string,
  bearerToken: string,
  serviceToken: string,
  caseReference: string,
  eventId: string,
  primaryLocation: string
): Promise<PrlCourtLocation> {
  const { token, courtLocation } = await getEventToken(
    apiContext,
    config,
    userId,
    bearerToken,
    serviceToken,
    eventId,
    caseReference,
    primaryLocation
  );
  const response = await apiContext.post(
    `${normalizeBaseUrl(config.ccdDataStoreUrl)}/caseworkers/${encodeURIComponent(userId)}` +
      `/jurisdictions/${PRL_JURISDICTION}/case-types/${PRL_CASE_TYPE}/cases/${caseReference}/events`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        ServiceAuthorization: `Bearer ${serviceToken}`,
        Experimental: 'true',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: {
        ...buildIssueAndSendToLocalCourtEventData(courtLocation),
        event: {
          id: eventId,
          summary: '',
          description: '',
        },
        event_token: token,
        ignore_warning: false,
      },
      failOnStatusCode: false,
    }
  );

  if (!response.ok()) {
    throw formatHttpFailure(`PRL hearings setup event ${eventId} failed`, response.status());
  }
  return courtLocation;
}

async function getCaseInfo(
  apiContext: APIRequestContext,
  config: Required<PrlHearingsCaseSetupConfig>,
  bearerToken: string,
  serviceToken: string,
  caseReference: string
): Promise<CcdCaseResponse> {
  const response = await apiContext.get(`${normalizeBaseUrl(config.ccdDataStoreUrl)}/cases/${caseReference}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      ServiceAuthorization: `Bearer ${serviceToken}`,
      Experimental: 'true',
    },
    failOnStatusCode: false,
  });

  if (!response.ok()) {
    throw formatHttpFailure('PRL hearings setup case read failed', response.status());
  }

  return (await response.json()) as CcdCaseResponse;
}

function validateIssuedCase(caseInfo: CcdCaseResponse, primaryLocation: string): void {
  if (caseInfo.state !== CASE_ISSUED_STATE) {
    throw new Error(
      `PRL hearings setup expected state ${CASE_ISSUED_STATE} after issuing the case, found ${caseInfo.state ?? 'missing'}.`
    );
  }

  const caseData = caseInfo.data ?? caseInfo.case_data ?? {};
  if (caseData.isNonWorkAllocationEnabledCourtSelected === 'Yes') {
    throw new Error('PRL hearings setup issued the case outside the Work Allocation path.');
  }

  const caseManagementLocation = caseData.caseManagementLocation as { baseLocation?: unknown } | undefined;
  const actualLocation = String(caseManagementLocation?.baseLocation ?? '').trim();
  if (actualLocation !== primaryLocation) {
    throw new Error(
      `PRL hearings setup expected case location ${primaryLocation} after issuing the case, found ${actualLocation || 'missing'}.`
    );
  }
}

export async function createPrlHearingsCase(primaryLocation: string): Promise<PrlHearingsCaseSetupResult> {
  const resolved = resolvePrlHearingsCaseSetupConfig(process.env);
  const missing = validatePrlHearingsCaseSetupConfig(resolved);
  if (missing.length > 0) {
    throw new Error(`${REQUIRED_ENV_MESSAGE} Missing: ${missing.join(', ')}.`);
  }

  const config = resolved as Required<PrlHearingsCaseSetupConfig>;
  const apiContext = await request.newContext();
  try {
    const courtAdminToken = await getBearerToken(
      { username: config.courtAdminUsername, password: config.courtAdminPassword },
      config
    );
    const serviceToken = await getServiceToken(apiContext, config, config.serviceMicroservice);
    const { citizenToken, createdCase } = await prepareCitizenCaseAfterPreflight(
      () => preflightWorkAllocationCourt(apiContext, config, courtAdminToken, serviceToken, primaryLocation),
      () => getBearerToken({ username: config.citizenUsername, password: config.citizenPassword }, config),
      (token) => createDraftCitizenCase(apiContext, config, token, serviceToken)
    );
    const caseReference = extractCaseReference(createdCase);
    await submitCitizenCase(apiContext, config, citizenToken, serviceToken, createdCase);

    const courtAdminUserId = await getUserId(apiContext, config, courtAdminToken);
    await submitCcdEvent(
      apiContext,
      config,
      courtAdminUserId,
      courtAdminToken,
      serviceToken,
      caseReference,
      ISSUE_AND_SEND_TO_LOCAL_COURT_EVENT_ID,
      primaryLocation
    );
    const caseInfo = await getCaseInfo(apiContext, config, courtAdminToken, serviceToken, caseReference);
    validateIssuedCase(caseInfo, primaryLocation);
    return { caseReference };
  } finally {
    await apiContext.dispose();
  }
}

export async function createPrlHearingsCaseIfEnabled(primaryLocation: string): Promise<PrlHearingsCaseSetupResult | undefined> {
  if (!isPrlHearingsCaseSetupEnabled()) {
    return undefined;
  }

  return createPrlHearingsCase(primaryLocation);
}

export const __test__ = {
  extractCaseReference,
  formatHttpFailure,
  buildIssueAndSendToLocalCourtEventData,
  buildWorkAllocationPreflightRequest,
  isPrlHearingsCaseSetupEnabled,
  preflightWorkAllocationCourt,
  prepareCitizenCaseAfterPreflight,
  resolvePrlHearingsCaseSetupConfig,
  selectCourtLocation,
  selectWorkAllocationCourtLocation,
  validateIssuedCase,
  validatePrlHearingsCaseSetupConfig,
};

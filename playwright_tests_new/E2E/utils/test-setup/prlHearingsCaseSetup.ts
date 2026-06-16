import { IdamUtils } from '@hmcts/playwright-common';
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
  ccdDataStoreUrl?: string;
  prlCosApiUrl?: string;
  ccdClientId?: string;
  idamSecret?: string;
  redirectUri?: string;
  s2sUrl?: string;
  serviceMicroservice?: string;
  citizenUsername?: string;
  citizenPassword?: string;
  courtAdminUsername?: string;
  courtAdminPassword?: string;
  courtLocationCode?: string;
  courtLocationLabel?: string;
};

type CaseCreateResponse = {
  id?: string | number;
  case_id?: string | number;
  caseReference?: string | number;
  case_reference?: string | number;
};

type CcdCaseResponse = CaseCreateResponse & {
  data?: Record<string, unknown>;
  case_data?: Record<string, unknown>;
};

const CASE_REFERENCE_REGEX = /^\d{16}$/;
const PRL_JURISDICTION = 'PRIVATELAW';
const PRL_CASE_TYPE = 'PRLAPPS';
const ISSUE_AND_SEND_TO_LOCAL_COURT_EVENT_ID = 'issueAndSendToLocalCourtCallback';
const DEFAULT_SERVICE_MICROSERVICE = 'ccd_data';
const REQUIRED_ENV_MESSAGE =
  'PRL hearings setup requires CCD_DATA_STORE_URL, PRL_COS_API_URL, CCD_DATA_STORE_CLIENT_ID, ' +
  'PRL_HEARINGS_IDAM_SECRET or IDAM_SECRET, ' +
  'S2S_URL, a redirect URI, citizen credentials, and court admin credentials.';
const DEFAULT_HEARING_MANAGER_COURT_LOCATION = {
  code: '898213:',
  label: 'East London Family Court',
};

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
    idamApiUrl: firstNonEmpty(env.IDAM_API_URL, env.IDAM_TESTING_SUPPORT_URL),
    ccdDataStoreUrl: firstNonEmpty(env.CCD_DATA_STORE_URL),
    prlCosApiUrl: firstNonEmpty(env.PRL_COS_API_URL, env.PRL_HEARINGS_PRL_COS_API_URL, env.PRL_COS_API),
    ccdClientId: firstNonEmpty(env.IDAM_CLIENT_ID, env.CCD_DATA_STORE_CLIENT_ID),
    idamSecret: firstNonEmpty(env.PRL_HEARINGS_IDAM_SECRET, env.IDAM_SECRET),
    redirectUri: firstNonEmpty(
      env.MANAGE_CASE_REDIRECT_URI,
      env.ORG_USER_ASSIGNMENT_REDIRECT_URI,
      resolveManageCaseRedirectUri(env.TEST_URL)
    ),
    s2sUrl: firstNonEmpty(env.S2S_URL),
    serviceMicroservice: firstNonEmpty(env.PRL_HEARINGS_SERVICE_MICROSERVICE, DEFAULT_SERVICE_MICROSERVICE),
    citizenUsername: firstNonEmpty(env.CITIZEN_USERNAME),
    citizenPassword: firstNonEmpty(env.CITIZEN_PASSWORD),
    courtAdminUsername: firstNonEmpty(env.COURT_ADMIN_STOKE_USERNAME, env.PRL_HEARINGS_SETUP_USERNAME),
    courtAdminPassword: firstNonEmpty(env.COURT_ADMIN_STOKE_PASSWORD, env.PRL_HEARINGS_SETUP_PASSWORD),
    courtLocationCode: firstNonEmpty(env.PRL_HEARINGS_COURT_LOCATION_CODE, DEFAULT_HEARING_MANAGER_COURT_LOCATION.code),
    courtLocationLabel: firstNonEmpty(env.PRL_HEARINGS_COURT_LOCATION_LABEL, DEFAULT_HEARING_MANAGER_COURT_LOCATION.label),
  };
}

export function validatePrlHearingsCaseSetupConfig(config: PrlHearingsCaseSetupConfig): string[] {
  const missing: string[] = [];
  if (!config.idamApiUrl?.trim()) missing.push('IDAM_API_URL or IDAM_TESTING_SUPPORT_URL');
  if (!config.ccdDataStoreUrl?.trim()) missing.push('CCD_DATA_STORE_URL');
  if (!config.prlCosApiUrl?.trim()) missing.push('PRL_COS_API_URL');
  if (!config.ccdClientId?.trim()) missing.push('CCD_DATA_STORE_CLIENT_ID');
  if (!config.idamSecret?.trim()) missing.push('PRL_HEARINGS_IDAM_SECRET or IDAM_SECRET');
  if (!config.redirectUri?.trim()) missing.push('MANAGE_CASE_REDIRECT_URI or ORG_USER_ASSIGNMENT_REDIRECT_URI');
  if (!config.s2sUrl?.trim()) missing.push('S2S_URL');
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

function normalizeCourtLocationCode(code: string): string {
  return code.endsWith(':') ? code : `${code}:`;
}

function buildIssueAndSendToLocalCourtEventData(config: Required<PrlHearingsCaseSetupConfig>): Record<string, unknown> {
  const courtLocation = {
    code: normalizeCourtLocationCode(config.courtLocationCode),
    label: config.courtLocationLabel,
  };

  return {
    data: {
      courtList: {
        value: courtLocation,
        list_items: [courtLocation],
      },
    },
  };
}

function normalizeIdamApiUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hostname = parsed.hostname.replace(/^idam-testing-support-api\./i, 'idam-api.');
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

function extractCaseReference(response: CaseCreateResponse): string {
  const value = response.caseReference ?? response.case_reference ?? response.case_id ?? response.id;
  const caseReference = String(value ?? '').trim();
  if (!CASE_REFERENCE_REGEX.test(caseReference)) {
    throw new Error('PRL hearings setup created a case but CCD did not return a valid 16-digit case reference.');
  }
  return caseReference;
}

async function getBearerToken(credentials: UserCredentials, config: Required<PrlHearingsCaseSetupConfig>): Promise<string> {
  return new IdamUtils().generateIdamToken({
    grantType: 'password',
    username: credentials.username,
    password: credentials.password,
    scope: 'openid profile roles',
    clientId: config.ccdClientId,
    clientSecret: config.idamSecret,
    redirectUri: config.redirectUri,
  });
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

async function getEventToken(
  apiContext: APIRequestContext,
  config: Required<PrlHearingsCaseSetupConfig>,
  userId: string,
  bearerToken: string,
  serviceToken: string,
  eventId: string,
  caseReference: string
): Promise<string> {
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

  const body = (await response.json()) as { token?: string };
  if (!body.token?.trim()) {
    throw new Error('PRL hearings setup event token response did not include a token.');
  }
  return body.token;
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
  eventData: Record<string, unknown>
): Promise<void> {
  const eventToken = await getEventToken(apiContext, config, userId, bearerToken, serviceToken, eventId, caseReference);
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
        ...eventData,
        event: {
          id: eventId,
          summary: '',
          description: '',
        },
        event_token: eventToken,
        ignore_warning: false,
      },
      failOnStatusCode: false,
    }
  );

  if (!response.ok()) {
    throw formatHttpFailure(`PRL hearings setup event ${eventId} failed`, response.status());
  }
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

export async function createPrlHearingsCase(): Promise<string> {
  const resolved = resolvePrlHearingsCaseSetupConfig(process.env);
  const missing = validatePrlHearingsCaseSetupConfig(resolved);
  if (missing.length > 0) {
    throw new Error(`${REQUIRED_ENV_MESSAGE} Missing: ${missing.join(', ')}.`);
  }

  const config = resolved as Required<PrlHearingsCaseSetupConfig>;
  const apiContext = await request.newContext();
  try {
    const citizenToken = await getBearerToken({ username: config.citizenUsername, password: config.citizenPassword }, config);
    const serviceToken = await getServiceToken(apiContext, config, config.serviceMicroservice);
    const createdCase = await createDraftCitizenCase(apiContext, config, citizenToken, serviceToken);
    const caseReference = extractCaseReference(createdCase);
    await submitCitizenCase(apiContext, config, citizenToken, serviceToken, createdCase);

    const courtAdminToken = await getBearerToken(
      { username: config.courtAdminUsername, password: config.courtAdminPassword },
      config
    );
    const courtAdminUserId = await getUserId(apiContext, config, courtAdminToken);
    await submitCcdEvent(
      apiContext,
      config,
      courtAdminUserId,
      courtAdminToken,
      serviceToken,
      caseReference,
      ISSUE_AND_SEND_TO_LOCAL_COURT_EVENT_ID,
      buildIssueAndSendToLocalCourtEventData(config)
    );
    await getCaseInfo(apiContext, config, courtAdminToken, serviceToken, caseReference);
    return caseReference;
  } finally {
    await apiContext.dispose();
  }
}

export async function createPrlHearingsCaseIfEnabled(): Promise<string | undefined> {
  if (!isPrlHearingsCaseSetupEnabled()) {
    return undefined;
  }

  return createPrlHearingsCase();
}

export const __test__ = {
  extractCaseReference,
  formatHttpFailure,
  buildIssueAndSendToLocalCourtEventData,
  isPrlHearingsCaseSetupEnabled,
  normalizeCourtLocationCode,
  resolvePrlHearingsCaseSetupConfig,
  validatePrlHearingsCaseSetupConfig,
};

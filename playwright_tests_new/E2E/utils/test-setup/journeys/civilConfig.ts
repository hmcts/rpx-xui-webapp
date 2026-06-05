import type { CivilApiConfig } from './civilTypes';

const DEFAULT_CIVIL_API_REQUEST_TIMEOUT_MS = 60_000;
const DEFAULT_CIVIL_SERVICE_EVENT_REQUEST_TIMEOUT_MS = 90_000;
const DEFAULT_CIVIL_SERVICE_BUSINESS_PROCESS_WAIT_TIMEOUT_MS = 420_000;
const DEFAULT_CIVIL_ROLE_ASSIGNMENT_WAIT_TIMEOUT_MS = 60_000;

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

export function resolveCivilApiConfig(): CivilApiConfig {
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

export function requireCivilApiConfig(options: { allowMissingCitizenUsers?: boolean } = {}): CivilApiConfig {
  const missing = getCivilLipMediationApiMissingConfiguration(options);
  if (missing.length) {
    throw new Error(`Civil LiP mediation API setup is missing configuration: ${missing.join(', ')}`);
  }
  return resolveCivilApiConfig();
}

export function resolveCivilGeneratedAccountPassword(): string {
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

export function resolveCivilApiRequestTimeoutMs(): number {
  return resolvePositiveInt(process.env.PW_CIVIL_API_REQUEST_TIMEOUT_MS, DEFAULT_CIVIL_API_REQUEST_TIMEOUT_MS);
}

export function resolveCivilServiceEventRequestTimeoutMs(): number {
  return resolvePositiveInt(
    process.env.PW_CIVIL_SERVICE_EVENT_REQUEST_TIMEOUT_MS ?? process.env.PW_CIVIL_API_REQUEST_TIMEOUT_MS,
    DEFAULT_CIVIL_SERVICE_EVENT_REQUEST_TIMEOUT_MS
  );
}

export function resolveCivilServiceBusinessProcessWaitTimeoutMs(): number {
  const parsed = Number.parseInt(process.env.PW_CIVIL_SERVICE_BUSINESS_PROCESS_WAIT_TIMEOUT_MS ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CIVIL_SERVICE_BUSINESS_PROCESS_WAIT_TIMEOUT_MS;
}

export function resolveCivilRoleAssignmentWaitTimeoutMs(): number {
  const parsed = Number.parseInt(process.env.PW_CIVIL_ROLE_ASSIGNMENT_WAIT_TIMEOUT_MS ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CIVIL_ROLE_ASSIGNMENT_WAIT_TIMEOUT_MS;
}

export function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  return values.map((value) => value?.trim()).find((value): value is string => Boolean(value));
}

export function resolvePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function createUniqueRunId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toLowerCase();
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

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function isAatUrl(value: string | undefined): boolean {
  return value?.includes('.aat.platform.hmcts.net') ?? false;
}

function isFalsy(value: string | undefined): boolean {
  return ['0', 'false', 'no', 'n'].includes(value?.trim().toLowerCase() ?? '');
}

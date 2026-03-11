import { faker } from '@faker-js/faker';

import { type SolicitorJurisdiction, SOLICITOR_ROLE_AUGMENT_BY_TEST_TYPE } from './roleStrategy.js';
import type { OrganisationAssignmentMode, OrganisationAssignmentStrategy } from './types.js';

export const DEFAULT_IDAM_CLIENT_ID = 'xuiwebapp';
export const DEFAULT_PASSWORD_GRANT_SCOPE = 'openid profile roles manage-user create-user'; // NOSONAR: OAuth2 password-grant scope string, not a credential
export const DEFAULT_ASSIGNMENT_SCOPE = 'openid profile roles';
export const DEFAULT_ORGANISATION_ASSIGNMENT_MODE = 'auto';

const DEFAULT_ASSIGNMENT_REQUEST_TIMEOUT_MS = 20_000;
const IDAM_RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
const ORGANISATION_ASSIGNMENT_ALLOWED_ROLES = new Set<string>([
  'pui-case-manager',
  'pui-user-manager',
  'pui-organisation-manager',
  'pui-finance-manager',
  'pui-caa',
  'payments',
  'caseworker',
  'caseworker-divorce',
  'caseworker-divorce-solicitor',
  'caseworker-divorce-financialremedy',
  'caseworker-divorce-financialremedy-solicitor',
  'caseworker-probate',
  'caseworker-probate-solicitor',
  'caseworker-ia',
  'caseworker-ia-legalrep-solicitor',
  'caseworker-publiclaw',
  'caseworker-publiclaw-solicitor',
  'caseworker-civil',
  'caseworker-civil-solicitor',
  'caseworker-employment',
  'caseworker-employment-legalrep-solicitor',
  'caseworker-privatelaw',
  'caseworker-privatelaw-solicitor',
]);

type AssignmentUserRoleProfile = 'citizen' | 'minimal' | 'org-admin' | 'extended';

export type AssignmentUserRolesResolution = {
  source: string;
  profile?: string;
  roles?: string[];
};

export function getRequiredEnvSecret(name: 'IDAM_SOLICITOR_USER_PASSWORD' | 'IDAM_CASEWORKER_DIVORCE_PASSWORD'): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env secret ${name}. Populate it via the Playwright env setup before provisioning users.`);
  }
  return value;
}

function describeError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return JSON.stringify(error);
}

export function parseStatusCode(error: unknown): number | undefined {
  const message = describeError(error);
  const explicit = /Status Code:\s*(\d{3})/i.exec(message);
  if (explicit) {
    const parsed = Number.parseInt(explicit[1], 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  const generic = /status(?:\s+code)?\s*(\d{3})/i.exec(message);
  if (!generic) {
    return undefined;
  }
  const parsed = Number.parseInt(generic[1], 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function isRetryableStatus(statusCode: number | undefined): boolean {
  return statusCode !== undefined && IDAM_RETRYABLE_STATUSES.has(statusCode);
}

export function shouldRetryTokenHydrationError(error: unknown): boolean {
  const statusCode = parseStatusCode(error);
  if (statusCode !== undefined) {
    return [408, 429, 500, 502, 503, 504].includes(statusCode);
  }
  const message = describeError(error).toLowerCase();
  return (
    message.includes('timeout') ||
    message.includes('econnreset') ||
    message.includes('socket hang up') ||
    message.includes('temporarily unavailable')
  );
}

export function shouldFallbackToSidamAccounts(statusCode: number | undefined, error: unknown): boolean {
  if (statusCode !== undefined && [401, 403, 404, 405].includes(statusCode)) {
    return true;
  }
  const message = describeError(error);
  const lower = message.toLowerCase();
  return lower.includes('/test/idam/users') && lower.includes('not found');
}

export function resolveClientId(): string {
  return (
    firstNonEmpty(
      process.env.CREATE_USER_CLIENT_ID,
      process.env.CCD_DATA_STORE_CLIENT_ID,
      process.env.IDAM_OAUTH2_CLIENT_ID,
      process.env.IDAM_CLIENT_ID,
      process.env.SERVICES_IDAM_CLIENT_ID,
      process.env.CLIENT_ID
    ) ?? DEFAULT_IDAM_CLIENT_ID
  );
}

export function resolveClientSecret(): string | undefined {
  return firstNonEmpty(
    process.env.CREATE_USER_CLIENT_SECRET,
    process.env.CCD_DATA_STORE_SECRET,
    process.env.IDAM_OAUTH2_CLIENT_SECRET,
    process.env.IDAM_SECRET
  );
}

export function resolveAssignmentClientId(): string {
  return (
    firstNonEmpty(
      process.env.ORG_USER_ASSIGNMENT_CLIENT_ID,
      process.env.IDAM_CLIENT_ID,
      process.env.SERVICES_IDAM_CLIENT_ID,
      process.env.CLIENT_ID,
      process.env.CREATE_USER_CLIENT_ID,
      process.env.CCD_DATA_STORE_CLIENT_ID,
      process.env.IDAM_OAUTH2_CLIENT_ID
    ) ?? DEFAULT_IDAM_CLIENT_ID
  );
}

export function resolveAssignmentClientSecret(): string | undefined {
  return firstNonEmpty(
    process.env.ORG_USER_ASSIGNMENT_CLIENT_SECRET,
    process.env.IDAM_SECRET,
    process.env.CREATE_USER_CLIENT_SECRET,
    process.env.CCD_DATA_STORE_SECRET,
    process.env.IDAM_OAUTH2_CLIENT_SECRET
  );
}

export function uniqueScopes(values: Array<string | undefined>): string[] {
  const result: string[] = [];
  for (const value of values) {
    const normalized = value?.trim();
    if (!normalized || result.includes(normalized)) {
      continue;
    }
    result.push(normalized);
  }
  return result;
}

export function isInvalidScopeError(message: string): boolean {
  const lower = message.toLowerCase();
  return lower.includes('invalid_scope') || lower.includes('unknown/invalid scope');
}

export function resolveIdamApiPath(): string {
  const testingSupportUrl = firstNonEmpty(process.env.IDAM_TESTING_SUPPORT_URL);
  if (testingSupportUrl) {
    return normalizeIdamApiBaseUrl(testingSupportUrl);
  }

  const explicit = firstNonEmpty(process.env.IDAM_API_URL, process.env.SERVICES_IDAM_API_URL);
  if (explicit) {
    return normalizeIdamApiBaseUrl(explicit);
  }

  const idamWebUrl = firstNonEmpty(process.env.IDAM_WEB_URL);
  if (idamWebUrl) {
    try {
      const parsed = new URL(idamWebUrl);
      parsed.hostname = parsed.hostname.replace(/^idam-web-public\./, 'idam-api.');
      parsed.pathname = '';
      parsed.search = '';
      parsed.hash = '';
      return parsed.toString().replace(/\/+$/, '');
    } catch {
      // ignore invalid URL and use environment fallback below
    }
  }

  const env = firstNonEmpty(process.env.TEST_ENV, 'aat');
  return `https://idam-api.${env}.platform.hmcts.net`;
}

export function resolveIdamApiPathFromOverride(override: string | undefined): string {
  const trimmed = override?.trim();
  if (trimmed) {
    return normalizeIdamApiBaseUrl(trimmed);
  }
  return resolveIdamApiPath();
}

export function normalizeIdamApiBaseUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');
  try {
    const parsed = new URL(trimmed);
    parsed.hostname = parsed.hostname.replace(/^idam-testing-support-api\./, 'idam-api.');
    const normalizedPath = parsed.pathname
      .replace(/\/+$/, '')
      .replace(/\/test\/idam\/burner\/users$/i, '')
      .replace(/\/test\/idam\/users$/i, '')
      .replace(/\/testing-support\/accounts$/i, '')
      .replace(/\/o\/token$/i, '')
      .replace(/\/o\/authorize$/i, '')
      .replace(/\/o$/i, '');
    parsed.pathname = normalizedPath || '';
    parsed.search = '';
    parsed.hash = '';
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return trimmed
      .replace(/^https?:\/\/idam-testing-support-api\./i, (match) => match.replace(/idam-testing-support-api/i, 'idam-api'))
      .replace(/\/o\/token\/?$/i, '')
      .replace(/\/o\/authorize\/?$/i, '')
      .replace(/\/o\/?$/i, '');
  }
}

export function resolveIdamWebUrl(): string | undefined {
  const direct = firstNonEmpty(process.env.IDAM_WEB_URL, process.env.SERVICES_IDAM_WEB_URL);
  if (direct) {
    return direct.replace(/\/+$/, '');
  }

  const apiUrl = firstNonEmpty(process.env.IDAM_API_URL, process.env.SERVICES_IDAM_API_URL);
  if (!apiUrl) {
    return undefined;
  }
  try {
    const parsed = new URL(apiUrl);
    parsed.hostname = parsed.hostname.replace(/^idam-api\./, 'idam-web-public.');
    parsed.pathname = '';
    parsed.search = '';
    parsed.hash = '';
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return undefined;
  }
}

export function resolveRdProfessionalApiPath(value?: string): string {
  const fromOverride = value?.trim();
  if (fromOverride) {
    return fromOverride.replace(/\/+$/, '');
  }
  const fromEnv = firstNonEmpty(
    process.env.RD_PROFESSIONAL_API_URL,
    process.env.RD_PROFESSIONAL_API_PATH,
    process.env.SERVICES_RD_PROFESSIONAL_API_URL,
    process.env.SERVICES_PRD_API
  );
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, '');
  }
  const env = firstNonEmpty(process.env.TEST_ENV, 'aat');
  return `https://rd-professional-api.${env}.platform.hmcts.net`;
}

export function resolveManageOrgApiPath(value?: string): string {
  const fromOverride = value?.trim();
  if (fromOverride) {
    return fromOverride.replace(/\/+$/, '');
  }
  const fromEnv = firstNonEmpty(process.env.MANAGE_ORG_API_URL, process.env.SERVICES_MANAGE_ORG_API_URL);
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, '');
  }
  const env = firstNonEmpty(process.env.TEST_ENV, 'aat');
  return `https://manage-org.${env}.platform.hmcts.net`;
}

export function resolveOrganisationAssignmentMode(value?: OrganisationAssignmentStrategy): OrganisationAssignmentStrategy {
  const normalized = (value ?? process.env.ORG_USER_ASSIGNMENT_MODE ?? DEFAULT_ORGANISATION_ASSIGNMENT_MODE).trim().toLowerCase();
  if (normalized === 'internal' || normalized === 'external' || normalized === 'auto') {
    return normalized;
  }
  return DEFAULT_ORGANISATION_ASSIGNMENT_MODE;
}

export function resolveAssignmentModesToTry(mode: OrganisationAssignmentStrategy): OrganisationAssignmentMode[] {
  if (mode === 'internal') {
    return ['internal'];
  }
  if (mode === 'external') {
    return ['external'];
  }
  const fromEnv = parseAssignmentModeOrder(process.env.ORG_USER_ASSIGNMENT_MODE_ORDER);
  if (fromEnv.length > 0) {
    return fromEnv;
  }
  return ['external', 'internal'];
}

export function parseAssignmentModeOrder(value: string | undefined): OrganisationAssignmentMode[] {
  const entries = value
    ?.split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry): entry is OrganisationAssignmentMode => entry === 'internal' || entry === 'external');
  if (!entries || entries.length === 0) {
    return [];
  }
  return [...new Set(entries)];
}

export function resolveAssignmentRequestTimeoutMs(): number {
  const raw = firstNonEmpty(process.env.ORG_USER_ASSIGNMENT_REQUEST_TIMEOUT_MS);
  if (!raw) {
    return DEFAULT_ASSIGNMENT_REQUEST_TIMEOUT_MS;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_ASSIGNMENT_REQUEST_TIMEOUT_MS;
  }
  return parsed;
}

export function shouldFallbackToAlternateAssignmentMode(statusCode: number | undefined): boolean {
  return statusCode === 400 || statusCode === 403 || statusCode === 404 || statusCode === 409 || statusCode === 422;
}

export function createFakerIdentity(
  emailPrefix: string,
  jurisdiction?: SolicitorJurisdiction
): {
  email: string;
  forename: string;
  surname: string;
} {
  const forename = faker.person.firstName();
  const surname = faker.person.lastName();
  const timestamp = faker.date.recent().getTime().toString(36);
  const suffix = faker.string.alphanumeric(8).toLowerCase();
  const prefix = resolveEmailAccountPrefix(jurisdiction);
  const email = `${sanitiseIdentityToken(prefix, 'xui')}.${sanitiseIdentityToken(emailPrefix, 'user')}.${timestamp}.${suffix}@mailinator.com`;
  return {
    email,
    forename,
    surname,
  };
}

export function resolveEmailAccountPrefix(jurisdiction?: SolicitorJurisdiction): string {
  const direct = firstNonEmpty(process.env.DYNAMIC_USER_EMAIL_ACCOUNT_PREFIX);
  if (direct) {
    return direct;
  }
  switch (jurisdiction) {
    case 'employment':
      return (
        firstNonEmpty(
          process.env.EMPLOYMENT_DYNAMIC_USER_EMAIL_ACCOUNT_PREFIX,
          process.env.SOLICITOR_EMAIL_ACCOUNT_PREFIX,
          process.env.AAT_EMAIL_ACCOUNT_PREFIX
        ) ?? 'xui-emp'
      );
    case 'divorce':
    case 'finrem':
      return (
        firstNonEmpty(
          process.env.DIVORCE_DYNAMIC_USER_EMAIL_ACCOUNT_PREFIX,
          process.env.SOLICITOR_EMAIL_ACCOUNT_PREFIX,
          process.env.AAT_EMAIL_ACCOUNT_PREFIX
        ) ?? 'xui-div'
      );
    default:
      return firstNonEmpty(process.env.SOLICITOR_EMAIL_ACCOUNT_PREFIX, process.env.AAT_EMAIL_ACCOUNT_PREFIX) ?? 'xui';
  }
}

export function sanitiseIdentityToken(value: string, fallback: string): string {
  const normalized = value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '');
  if (normalized) {
    return normalized.slice(0, 24);
  }
  return fallback;
}

export function shouldOutputCreatedUserData(override: boolean | undefined): boolean {
  if (typeof override === 'boolean') {
    return override;
  }
  if (allowCredentialOutputInCi()) {
    return resolveBooleanFlag(process.env.OUTPUT_CREATED_USER_DATA);
  }
  if (isCiEnvironment()) {
    return false;
  }
  return resolveBooleanFlag(process.env.OUTPUT_CREATED_USER_DATA);
}

export function resolveBooleanFlag(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

export function isCiEnvironment(): boolean {
  return resolveBooleanFlag(process.env.CI) || resolveBooleanFlag(process.env.BUILD_ID);
}

export function allowCredentialOutputInCi(): boolean {
  return resolveBooleanFlag(process.env.ALLOW_CREATED_USER_DATA_IN_CI);
}

export function uniqueStringList(values: readonly string[] | undefined): string[] {
  const result: string[] = [];
  for (const value of values ?? []) {
    const normalized = value.trim();
    if (!normalized || result.includes(normalized)) {
      continue;
    }
    result.push(normalized);
  }
  return result;
}

export function buildHeaders(
  assignmentBearerToken: string,
  serviceToken: string | undefined,
  assignmentRoles: readonly string[] | undefined
): Record<string, string> {
  const headers: Record<string, string> = {
    Authorization: withBearerPrefix(assignmentBearerToken),
    accept: 'application/json',
    'content-type': 'application/json',
  };
  if (serviceToken) {
    headers.ServiceAuthorization = withBearerPrefix(serviceToken);
  }
  if (assignmentRoles && assignmentRoles.length > 0) {
    headers['x-user-roles'] = assignmentRoles.join(',');
  }
  return headers;
}

export function resolveAssignmentUserRolesResolution(assignmentBearerToken: string): AssignmentUserRolesResolution {
  const claims = decodeJwtPayload(assignmentBearerToken);
  if (!claims) {
    return {
      source: 'unavailable',
    };
  }

  const roles = readStringArrayFromRecord(claims, 'roles');
  if (roles && roles.length > 0) {
    return {
      source: 'jwt-roles',
      roles,
    };
  }

  const profile = resolveAssignmentUserRoleProfile(readStringFromRecord(claims, 'user-role'));
  if (!profile) {
    return {
      source: 'jwt-claims-unmapped',
    };
  }
  const roleNames = uniqueStringList(
    (SOLICITOR_ROLE_AUGMENT_BY_TEST_TYPE as Record<string, readonly string[] | undefined>)[profile] ?? []
  );
  return {
    source: 'role-profile',
    profile,
    roles: roleNames,
  };
}

export function hydrateAssignmentUserRolesResolutionFromIdamUserInfo(
  resolved: AssignmentUserRolesResolution,
  idamUserInfoProbe: unknown
): AssignmentUserRolesResolution {
  if (resolved.roles && resolved.roles.length > 0) {
    return resolved;
  }
  if (!isRecord(idamUserInfoProbe)) {
    return resolved;
  }
  const probeStatus = typeof idamUserInfoProbe.status === 'number' ? idamUserInfoProbe.status : undefined;
  if (probeStatus !== 200) {
    return resolved;
  }
  const body = isRecord(idamUserInfoProbe.body) ? idamUserInfoProbe.body : undefined;
  const roles =
    body && Array.isArray(body.roles)
      ? body.roles
          .map((value) => (typeof value === 'string' ? value.trim() : ''))
          .filter((value): value is string => Boolean(value))
      : undefined;
  if (!roles || roles.length === 0) {
    return resolved;
  }
  return {
    source: 'idam-userinfo-roles',
    roles: uniqueStringList(roles),
  };
}

export function filterSupportedOrganisationAssignmentRoles(candidateRoles: readonly string[] | undefined): string[] {
  const unique = uniqueStringList(candidateRoles);
  return unique.filter((role) => ORGANISATION_ASSIGNMENT_ALLOWED_ROLES.has(role));
}

export function resolveOrganisationAssignmentRoles(requestedRoles: readonly string[]): string[] {
  const unique = uniqueStringList(requestedRoles);
  const assignable = filterSupportedOrganisationAssignmentRoles(unique);
  if (assignable.length > 0) {
    return assignable;
  }
  return unique;
}

export function resolveAssignmentUserRoleProfile(value: string | undefined): AssignmentUserRoleProfile | undefined {
  switch ((value ?? '').trim().toLowerCase()) {
    case 'citizen':
      return 'citizen';
    case 'minimal':
      return 'minimal';
    case 'org-admin':
    case 'organisation-admin':
      return 'org-admin';
    case 'extended':
      return 'extended';
    default:
      return undefined;
  }
}

export function readStringProperty(record: Record<string, unknown> | undefined, key: string): string | undefined {
  if (!record) {
    return undefined;
  }
  const value = record[key];
  return typeof value === 'string' && value.trim().length > 0 ? value : undefined;
}

export function summariseIdamUserInfo(data: unknown): unknown {
  if (!isRecord(data)) {
    return data;
  }
  return {
    sub: readStringFromRecord(data, 'sub'),
    uid: readStringFromRecord(data, 'uid'),
    email: readStringFromRecord(data, 'email'),
    forename: readStringFromRecord(data, 'given_name'),
    surname: readStringFromRecord(data, 'family_name'),
    roles: readStringArrayFromRecord(data, 'roles'),
  };
}

export function summarisePrdUsersResponse(data: unknown): unknown {
  if (!isRecord(data)) {
    return data;
  }
  const users =
    extractPrdUsers(data).map((user) => ({
      userIdentifier: readStringFromRecord(user, 'userIdentifier'),
      email: readStringFromRecord(user, 'email') ?? readStringFromRecord(user, 'userName'),
      status: readStringFromRecord(user, 'status') ?? readStringFromRecord(user, 'idamStatus'),
      roles:
        readStringArrayFromRecord(user, 'roles') ??
        (Array.isArray(user.roles)
          ? (user.roles as unknown[])
              .map((entry) => (isRecord(entry) ? readStringFromRecord(entry, 'name') : undefined))
              .filter((entry): entry is string => Boolean(entry))
          : undefined),
    })) ?? [];

  return {
    usersCount: users.length,
    users: users.slice(0, 10),
  };
}

export function findUserIdentifierByEmail(data: unknown, email: string): string | undefined {
  const normalizedEmail = email.trim().toLowerCase();
  for (const user of extractPrdUsers(data)) {
    const candidateEmail = (readStringFromRecord(user, 'email') ?? readStringFromRecord(user, 'userName') ?? '')
      .trim()
      .toLowerCase();
    if (candidateEmail === normalizedEmail) {
      return readStringFromRecord(user, 'userIdentifier') ?? readStringFromRecord(user, 'idamId');
    }
  }
  return undefined;
}

export function extractPrdUsers(data: unknown): Record<string, unknown>[] {
  if (!isRecord(data)) {
    return [];
  }
  const candidates = data.users;
  if (!Array.isArray(candidates)) {
    return [];
  }
  return candidates.filter(isRecord);
}

export function summariseUserLikeRecord(value: unknown): unknown {
  if (!isRecord(value)) {
    return value;
  }
  return {
    userIdentifier: readStringFromRecord(value, 'userIdentifier') ?? readStringFromRecord(value, 'idamId'),
    email: readStringFromRecord(value, 'email') ?? readStringFromRecord(value, 'userName'),
    status: readStringFromRecord(value, 'status') ?? readStringFromRecord(value, 'idamStatus'),
    roles:
      readStringArrayFromRecord(value, 'roles') ??
      (Array.isArray(value.roles)
        ? (value.roles as unknown[])
            .map((entry) => (isRecord(entry) ? readStringFromRecord(entry, 'name') : undefined))
            .filter((entry): entry is string => Boolean(entry))
        : undefined),
  };
}

export function decodeJwtPayload(token: string): Record<string, unknown> | undefined {
  const parts = token.split('.');
  if (parts.length < 2) {
    return undefined;
  }
  const payload = parts[1];
  const normalized = payload.replaceAll('-', '+').replaceAll('_', '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  try {
    const decoded = Buffer.from(normalized + padding, 'base64').toString('utf8');
    const parsed = JSON.parse(decoded) as unknown;
    return isRecord(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function summarizeTokenPrincipal(claims: Record<string, unknown> | undefined): Record<string, unknown> {
  if (!claims) {
    return { available: false };
  }
  return {
    available: true,
    uid: readStringFromRecord(claims, 'uid'),
    sub: readStringFromRecord(claims, 'sub'),
    azp: readStringFromRecord(claims, 'azp'),
    aud: claims.aud,
    roles: readStringArrayFromRecord(claims, 'roles'),
    exp: toIsoDateClaim(claims.exp),
    iat: toIsoDateClaim(claims.iat),
    email: resolveTokenPrincipalUsername(claims),
  };
}

export function resolveExpectedAssignmentPrincipalEmail(): string | undefined {
  return firstNonEmpty(process.env.ORG_USER_ASSIGNMENT_EXPECTED_EMAIL, process.env.ORG_USER_ASSIGNMENT_USERNAME)?.toLowerCase();
}

export function resolveTokenPrincipalUsername(claims: Record<string, unknown> | undefined): string | undefined {
  if (!claims) {
    return undefined;
  }
  return firstNonEmpty(
    readStringFromRecord(claims, 'email'),
    readStringFromRecord(claims, 'preferred_username'),
    readStringFromRecord(claims, 'username'),
    readStringFromRecord(claims, 'sub')
  );
}

export function toIsoDateClaim(value: unknown): string | undefined {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return undefined;
  }
  try {
    return new Date(value * 1000).toISOString();
  } catch {
    return undefined;
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function readStringFromRecord(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === 'string' && value.trim().length > 0 ? value : undefined;
}

export function readStringArrayFromRecord(record: Record<string, unknown>, key: string): string[] | undefined {
  const value = record[key];
  if (!Array.isArray(value)) {
    return undefined;
  }
  const items = value.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0);
  return items.length > 0 ? items : undefined;
}

export function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const candidate of values) {
    const normalized = candidate?.trim();
    if (normalized) {
      return normalized;
    }
  }
  return undefined;
}

export function sanitiseClientCredentialsScope(scopeValue: string): string {
  return scopeValue
    .split(/\s+/)
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0 && entry !== 'openid')
    .join(' ');
}

export function withBearerPrefix(token: string): string {
  return token.toLowerCase().startsWith('bearer ') ? token : `Bearer ${token}`;
}

export function stripBearerPrefix(token: string): string {
  return token.replace(/^bearer\s+/i, '').trim();
}

export function isPlaywrightArtifactIoError(error: unknown): boolean {
  const message = describeError(error);
  return /EBUSY|ENOSPC|EIO|EMFILE|ENFILE/i.test(message);
}

export function toError(error: unknown, fallbackMessage: string): Error {
  if (error instanceof Error) {
    return error;
  }
  return new Error(typeof error === 'string' && error ? error : fallbackMessage);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

import { chromium, request, type APIRequestContext, type Browser, type Page } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { firstNonEmpty, resolveDynamicOrganisationRunId } from '../dynamicOrganisationRunId.js';

type OrganisationStatus = 'PENDING' | 'ACTIVE';

type DynamicOrganisationPayload = {
  name: string;
  status: OrganisationStatus;
  sraId: string;
  sraRegulated: boolean;
  superUser: {
    email: string;
    firstName: string;
    lastName: string;
  };
  paymentAccount: string[];
  contactInformation: Array<{
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    townCity: string;
    county: string;
    country: string;
    postCode: string;
    dxAddress: Array<{
      dxNumber: string;
      dxExchange: string;
    }>;
  }>;
};

type OrganisationProvisioningPrerequisites = {
  rdProfessionalApiPath: string;
  headers: Record<string, string>;
};

export type DynamicOrganisationProvisioningOptions = {
  name?: string;
  runId?: string;
  superUserEmail?: string;
  timeoutMs?: number;
  pollIntervalMs?: number;
  approvalStrategy?: DynamicOrganisationApprovalStrategy;
};

export type DynamicOrganisationApprovalStrategy = 'rd-professional-api' | 'approve-org-api' | 'auto';

export type DynamicOrganisationResolvedApprovalStrategy = Exclude<DynamicOrganisationApprovalStrategy, 'auto'>;

export type DynamicOrganisationProvisioningStageName = 'create' | 'approve' | 'poll-active';

export type DynamicOrganisationProvisioningStageTiming = {
  stage: DynamicOrganisationProvisioningStageName;
  elapsedMs: number;
  status?: number | 'timeout' | 'unknown';
  strategy?: DynamicOrganisationResolvedApprovalStrategy;
};

export type DynamicOrganisationProvisioningResult = {
  organisationId: string;
  name: string;
  status: 'ACTIVE';
  createStatus: number;
  approveStatus: number;
  pollAttempts: number;
  approvalStrategy: DynamicOrganisationResolvedApprovalStrategy;
  timings: DynamicOrganisationProvisioningStageTiming[];
  totalElapsedMs: number;
};

type CreateApprovedOrganisationDeps = {
  resolvePrerequisites: () => Promise<OrganisationProvisioningPrerequisites>;
  createApiContext: (baseURL: string, headers: Record<string, string>) => Promise<APIRequestContext>;
  createApproveOrgApiContext?: (baseURL: string) => Promise<APIRequestContext>;
  now: () => number;
  sleep: (ms: number) => Promise<void>;
};

type CreatedOrganisation = {
  organisationId: string;
  status: number;
  existingStatus?: OrganisationStatus;
  reusedExisting?: boolean;
};

export class DynamicOrganisationProvisioningError extends Error {
  timings?: DynamicOrganisationProvisioningStageTiming[];
  totalElapsedMs?: number;

  constructor(
    readonly stage: 'create' | 'approve' | 'poll-active',
    readonly endpoint: string,
    readonly status: number | 'timeout' | 'unknown',
    readonly organisationName: string,
    readonly responsePreview?: unknown
  ) {
    super(
      `Dynamic organisation ${stage} failed for '${organisationName}' at ${endpoint}: status=${String(status)}, response=${JSON.stringify(
        responsePreview ?? null
      )}`
    );
    this.name = 'DynamicOrganisationProvisioningError';
  }
}

const DEFAULT_DYNAMIC_ORG_NAME_PREFIX = 'PW Dynamic Org';
const DEFAULT_DYNAMIC_ORG_TIMEOUT_MS = 60_000;
const DEFAULT_DYNAMIC_ORG_POLL_INTERVAL_MS = 2_000;
const DEFAULT_DYNAMIC_ORG_SUPER_USER_DOMAIN = 'example.test';
const RD_PROFESSIONAL_SRA_ID_MAX_LENGTH = 15;
const RD_PROFESSIONAL_DX_NUMBER_MAX_LENGTH = 13;
const DEFAULT_APPROVE_ORG_API_BASE_URL = 'https://administer-orgs.aat.platform.hmcts.net';
const DEFAULT_APPROVE_ORG_SESSION_MAX_AGE_MS = 60 * 60_000;
const APPROVE_ORG_AUTH_COOKIE_NAMES = new Set(['__auth__', 'Idam.Session', 'ao-webapp']);

function sanitizeRunToken(value: string): string {
  return resolveDynamicOrganisationRunId({ explicitRunId: value, maxLength: 32 });
}

function resolveRunId(options: DynamicOrganisationProvisioningOptions): string {
  return resolveDynamicOrganisationRunId({ explicitRunId: options.runId, maxLength: 32 });
}

function resolveOrganisationName(options: DynamicOrganisationProvisioningOptions, runId: string): string {
  const explicitName = options.name?.trim();
  if (explicitName) return explicitName.slice(0, 120);
  const prefix = firstNonEmpty(process.env.PW_DYNAMIC_ORGANISATION_NAME_PREFIX) ?? DEFAULT_DYNAMIC_ORG_NAME_PREFIX;
  return `${prefix} ${runId}`.slice(0, 120);
}

function resolveSuperUserEmail(options: DynamicOrganisationProvisioningOptions, runId: string): string {
  const explicit = firstNonEmpty(options.superUserEmail, process.env.PW_DYNAMIC_ORGANISATION_SUPER_USER_EMAIL);
  if (explicit) return explicit;
  const domain = firstNonEmpty(process.env.PW_DYNAMIC_ORGANISATION_SUPER_USER_DOMAIN) ?? DEFAULT_DYNAMIC_ORG_SUPER_USER_DOMAIN;
  return `pw-dynamic-org-${runId.toLowerCase()}@${domain}`;
}

function resolvePositiveInt(value: number | undefined, envValue: string | undefined, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return value;
  }
  const parsed = Number.parseInt(envValue ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function resolveApprovalStrategy(options: DynamicOrganisationProvisioningOptions): DynamicOrganisationApprovalStrategy {
  const rawValue = firstNonEmpty(options.approvalStrategy, process.env.PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY);
  if (!rawValue) {
    return 'rd-professional-api';
  }
  const value = rawValue.toLowerCase();
  if (value === 'rd-professional-api' || value === 'approve-org-api' || value === 'auto') {
    return value;
  }
  throw new Error(
    `Unsupported PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY='${rawValue}'. Supported values: rd-professional-api, approve-org-api, auto.`
  );
}

function resolveApproveOrgApiBaseUrl(): string {
  return firstNonEmpty(process.env.PW_APPROVE_ORG_API_BASE_URL) ?? DEFAULT_APPROVE_ORG_API_BASE_URL;
}

function resolveApproveOrgStorageStatePath(): string {
  return (
    firstNonEmpty(process.env.PW_APPROVE_ORG_API_STORAGE_STATE) ??
    path.join(process.cwd(), '.sessions', 'approve-org-api.storage.json')
  );
}

function resolveApproveOrgAdminCredential(kind: 'username' | 'password'): string | undefined {
  if (kind === 'username') {
    return firstNonEmpty(
      process.env.APPROVE_ORG_ADMIN_USERNAME,
      process.env.AO_ADMIN_USERNAME,
      process.env.TEST_EMAIL,
      process.env.TEST_API_EMAIL_ADMIN
    );
  }
  return firstNonEmpty(
    process.env.APPROVE_ORG_ADMIN_PASSWORD,
    process.env.AO_ADMIN_PASSWORD,
    process.env.TEST_PASSWORD,
    process.env.TEST_API_PASSWORD_ADMIN
  );
}

function resolveApproveOrgSessionMaxAgeMs(): number {
  const configured = Number.parseInt(process.env.PW_APPROVE_ORG_API_SESSION_MAX_AGE_MS ?? '', 10);
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_APPROVE_ORG_SESSION_MAX_AGE_MS;
}

function hasUnexpiredApproveOrgAuthCookie(storageStatePath: string): boolean {
  try {
    const state = JSON.parse(fs.readFileSync(storageStatePath, 'utf8')) as {
      cookies?: Array<{ name?: string; expires?: number }>;
    };
    const nowSeconds = Date.now() / 1000;
    return (state.cookies ?? []).some((cookie) => {
      if (!cookie.name || !APPROVE_ORG_AUTH_COOKIE_NAMES.has(cookie.name)) {
        return false;
      }
      if (cookie.expires === undefined || cookie.expires === -1) {
        return true;
      }
      return cookie.expires > nowSeconds + 30;
    });
  } catch {
    return false;
  }
}

function isApproveOrgStorageStateFresh(storageStatePath: string): boolean {
  if (!fs.existsSync(storageStatePath)) {
    return false;
  }
  const stats = fs.statSync(storageStatePath);
  if (Date.now() - stats.mtimeMs > resolveApproveOrgSessionMaxAgeMs()) {
    return false;
  }
  return hasUnexpiredApproveOrgAuthCookie(storageStatePath);
}

async function isApproveOrgApiContextAuthenticated(apiContext: APIRequestContext): Promise<boolean> {
  try {
    const response = await apiContext.get('auth/isAuthenticated', { failOnStatusCode: false });
    if (response.status() !== 200) {
      return false;
    }
    const body = (await response.text()).trim().toLowerCase();
    if (body === 'true') {
      return true;
    }
    if (!body || body === 'false') {
      return false;
    }
    try {
      return JSON.parse(body) === true;
    } catch {
      return false;
    }
  } catch {
    return false;
  }
}

async function launchApproveOrgSessionBrowser(): Promise<Browser> {
  const headless = process.env.PW_APPROVE_ORG_API_SESSION_HEADLESS !== 'false';
  try {
    return await chromium.launch({ headless, channel: 'chrome' });
  } catch {
    return chromium.launch({ headless });
  }
}

async function completeApproveOrgLogin(page: Page, baseURL: string, username: string, password: string): Promise<void> {
  await page.goto(baseURL, { waitUntil: 'networkidle' });

  const requestContext = await request.newContext({
    baseURL,
    ignoreHTTPSErrors: true,
    storageState: await page.context().storageState(),
  });
  try {
    if (await isApproveOrgApiContextAuthenticated(requestContext)) {
      return;
    }
  } finally {
    await requestContext.dispose();
  }

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const namedUsernameInput = page.locator('input[name="username"]');
    const roleEmailInput = page.getByRole('textbox', { name: /Email address|Enter your work email address/i });
    const fallbackEmailInput = page.locator('input[type="email"]').first();
    const hasNamedUsernameInput = await namedUsernameInput.isVisible().catch(() => false);
    const hasRoleEmailInput = await roleEmailInput.isVisible().catch(() => false);
    const hasFallbackEmailInput = await fallbackEmailInput.isVisible().catch(() => false);
    const isOnLoginSurface =
      page.url().includes('idam') ||
      page.url().includes('/login') ||
      hasNamedUsernameInput ||
      hasRoleEmailInput ||
      hasFallbackEmailInput;

    if (isOnLoginSurface) {
      if (hasNamedUsernameInput) {
        await namedUsernameInput.fill(username);
        await page.locator('input[name="password"]').fill(password);
        await page.locator('#login-submit-btn').click();
      } else if (hasRoleEmailInput || hasFallbackEmailInput) {
        const emailInput = hasRoleEmailInput ? roleEmailInput : fallbackEmailInput;
        await emailInput.fill(username);
        await page.locator('input[type="password"], input[name="password"]').first().fill(password);
        await page.getByRole('button', { name: 'Sign in' }).click();
      } else {
        await page.waitForTimeout(500 * attempt);
      }
      await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => undefined);
    }

    const authCheckContext = await request.newContext({
      baseURL,
      ignoreHTTPSErrors: true,
      storageState: await page.context().storageState(),
    });
    try {
      if (await isApproveOrgApiContextAuthenticated(authCheckContext)) {
        return;
      }
    } finally {
      await authCheckContext.dispose();
    }

    await page.waitForTimeout(1000 * attempt);
  }

  throw new Error(`Unable to authenticate approve-org admin user "${username}" for API approval.`);
}

async function captureApproveOrgStorageState(baseURL: string, storageStatePath: string): Promise<string> {
  const username = resolveApproveOrgAdminCredential('username');
  const password = resolveApproveOrgAdminCredential('password');
  if (!username || !password) {
    throw new Error(
      'Approve-org API approval requires a fresh storage state or approval-capable credentials. Set PW_APPROVE_ORG_API_STORAGE_STATE to a valid authenticated storage state, or set APPROVE_ORG_ADMIN_USERNAME/APPROVE_ORG_ADMIN_PASSWORD (fallbacks: AO_ADMIN_USERNAME/AO_ADMIN_PASSWORD, TEST_EMAIL/TEST_PASSWORD, or TEST_API_EMAIL_ADMIN/TEST_API_PASSWORD_ADMIN).'
    );
  }

  fs.mkdirSync(path.dirname(storageStatePath), { recursive: true });
  const browser = await launchApproveOrgSessionBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await completeApproveOrgLogin(page, baseURL, username, password);
    await context.storageState({ path: storageStatePath });
    return storageStatePath;
  } finally {
    await browser.close();
  }
}

async function createApproveOrgContextFromStorageState(baseURL: string, storageStatePath: string): Promise<APIRequestContext> {
  return request.newContext({
    baseURL,
    ignoreHTTPSErrors: true,
    storageState: storageStatePath,
  });
}

function buildBoundedIdentifier(prefix: string, runId: string, maxLength: number, fallback: string): string {
  const compactRunId = runId.replaceAll(/[^A-Za-z0-9]/g, '');
  const maxRunIdLength = Math.max(0, maxLength - prefix.length);
  const runIdToken = compactRunId.slice(-maxRunIdLength);
  return `${prefix}${runIdToken}`.slice(0, maxLength) || fallback;
}

function buildDynamicOrganisationPayload(
  options: DynamicOrganisationProvisioningOptions,
  status: OrganisationStatus
): DynamicOrganisationPayload {
  const runId = resolveRunId(options);
  const name = resolveOrganisationName(options, runId);
  return {
    name,
    status,
    sraId: buildBoundedIdentifier('PW', runId, RD_PROFESSIONAL_SRA_ID_MAX_LENGTH, 'PWLOCAL'),
    sraRegulated: true,
    superUser: {
      email: resolveSuperUserEmail(options, runId),
      firstName: 'Playwright',
      lastName: 'Dynamic',
    },
    paymentAccount: [],
    contactInformation: [
      {
        addressLine1: '102 Petty France',
        addressLine2: 'Playwright Dynamic Organisation',
        addressLine3: 'Westminster',
        townCity: 'London',
        county: 'London',
        country: 'UK',
        postCode: 'SW1H 9AJ',
        dxAddress: [
          {
            dxNumber: buildBoundedIdentifier('DX', runId, RD_PROFESSIONAL_DX_NUMBER_MAX_LENGTH, 'DXPW'),
            dxExchange: 'LONDON',
          },
        ],
      },
    ],
  };
}

async function parseResponseBody(response: { text: () => Promise<string> }): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function readOrganisationIdentifier(body: unknown): string | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const record = body as Record<string, unknown>;
  for (const key of ['organisationIdentifier', 'organisationId', 'id']) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
}

function readStringField(record: Record<string, unknown>, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
}

function readOrganisationStatus(record: Record<string, unknown>): OrganisationStatus | undefined {
  const status = readStringField(record, 'status')?.toUpperCase();
  return status === 'ACTIVE' || status === 'PENDING' ? status : undefined;
}

function isDuplicateSraCreateResponse(body: unknown, payload: DynamicOrganisationPayload): boolean {
  const preview = typeof body === 'string' ? body : JSON.stringify(body ?? {});
  const normalizedPreview = preview.toLowerCase();
  const mentionsSra = normalizedPreview.includes('sra_id') || normalizedPreview.includes('sra id');
  return (
    (normalizedPreview.includes(payload.sraId.toLowerCase()) || mentionsSra) &&
    (normalizedPreview.includes('already exists') ||
      normalizedPreview.includes('duplicate key') ||
      normalizedPreview.includes('sra_id'))
  );
}

function extractOrganisationEntries(body: unknown): Record<string, unknown>[] {
  if (Array.isArray(body)) {
    return body.filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object');
  }
  if (!body || typeof body !== 'object') return [];
  const record = body as Record<string, unknown>;
  for (const key of ['organisations', 'organisationEntities', 'data']) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value.filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object');
    }
  }
  return [];
}

function extractSingleOrganisation(body: unknown, organisationId: string): Record<string, unknown> | undefined {
  if (body && typeof body === 'object' && readOrganisationIdentifier(body) === organisationId) {
    return body as Record<string, unknown>;
  }
  return extractOrganisationEntries(body).find((entry) => readOrganisationIdentifier(entry) === organisationId);
}

function cookieMatchesHost(cookieDomain: string | undefined, hostName: string): boolean {
  if (!cookieDomain) {
    return false;
  }
  const normalizedDomain = cookieDomain.replace(/^\./, '').toLowerCase();
  const normalizedHost = hostName.toLowerCase();
  return normalizedHost === normalizedDomain || normalizedHost.endsWith(`.${normalizedDomain}`);
}

async function getApproveOrgXsrfHeaders(apiContext: APIRequestContext): Promise<Record<string, string>> {
  const maybeStorageState = (apiContext as { storageState?: APIRequestContext['storageState'] }).storageState;
  if (!maybeStorageState) {
    return {};
  }

  let apiHostName: string | undefined;
  const environmentResponse = await apiContext.get('/api/environment', { failOnStatusCode: false });
  try {
    apiHostName = new URL(environmentResponse.url()).hostname;
  } catch {
    apiHostName = undefined;
  }

  const state = await maybeStorageState.call(apiContext);
  const xsrfCookies = state.cookies.filter((cookie) => cookie.name === 'XSRF-TOKEN');
  if (xsrfCookies.length === 0) {
    return {};
  }

  const xsrfToken =
    (apiHostName ? xsrfCookies.find((cookie) => cookieMatchesHost(cookie.domain, apiHostName))?.value : undefined) ??
    xsrfCookies[xsrfCookies.length - 1]?.value;

  return xsrfToken ? { 'x-xsrf-token': xsrfToken } : {};
}

function findMatchingOrganisationEntry(
  body: unknown,
  payload: DynamicOrganisationPayload
): { organisationId: string; status?: OrganisationStatus } | undefined {
  const match = extractOrganisationEntries(body)
    .map((entry) => ({
      organisationId: readOrganisationIdentifier(entry),
      name: readStringField(entry, 'name', 'organisationName'),
      sraId: readStringField(entry, 'sraId', 'sra_id', 'sra'),
      status: readOrganisationStatus(entry),
    }))
    .find(({ organisationId, name, sraId }) => {
      return Boolean(
        organisationId &&
        (sraId?.toLowerCase() === payload.sraId.toLowerCase() || name?.toLowerCase() === payload.name.toLowerCase())
      );
    });
  return match?.organisationId ? { organisationId: match.organisationId, status: match.status } : undefined;
}

function isActiveOrganisation(body: unknown, organisationId: string): boolean {
  return extractOrganisationEntries(body).some((entry) => {
    const id = readOrganisationIdentifier(entry);
    const status = typeof entry.status === 'string' ? entry.status.trim().toUpperCase() : '';
    return id === organisationId && status === 'ACTIVE';
  });
}

async function createOrganisation(
  apiContext: APIRequestContext,
  payload: DynamicOrganisationPayload
): Promise<CreatedOrganisation> {
  const endpoint = '/refdata/internal/v1/organisations';
  const response = await apiContext.post(endpoint, {
    data: payload,
    failOnStatusCode: false,
  });
  const body = await parseResponseBody(response);
  if (!response.ok()) {
    if (isDuplicateSraCreateResponse(body, payload)) {
      const existing = await findExistingOrganisation(apiContext, payload);
      if (existing) {
        return {
          ...existing,
          status: response.status(),
          reusedExisting: true,
        };
      }
    }
    throw new DynamicOrganisationProvisioningError('create', endpoint, response.status(), payload.name, body);
  }
  const organisationId = readOrganisationIdentifier(body);
  if (!organisationId) {
    throw new DynamicOrganisationProvisioningError('create', endpoint, response.status(), payload.name, body);
  }
  return { organisationId, status: response.status() };
}

async function findExistingOrganisation(
  apiContext: APIRequestContext,
  payload: DynamicOrganisationPayload
): Promise<{ organisationId: string; existingStatus?: OrganisationStatus } | undefined> {
  for (const status of ['Active', 'Pending']) {
    const endpoint = `/refdata/internal/v1/organisations?status=${status}`;
    const response = await apiContext.get(endpoint, { failOnStatusCode: false });
    if (!response.ok()) {
      continue;
    }
    const body = await parseResponseBody(response);
    const existing = findMatchingOrganisationEntry(body, payload);
    if (existing?.organisationId) {
      return {
        organisationId: existing.organisationId,
        existingStatus: existing.status,
      };
    }
  }
  return undefined;
}

async function approveOrganisation(
  apiContext: APIRequestContext,
  organisationId: string,
  payload: DynamicOrganisationPayload
): Promise<number> {
  const endpoint = `/refdata/internal/v1/organisations/${encodeURIComponent(organisationId)}`;
  const response = await apiContext.put(endpoint, {
    data: {
      ...payload,
      status: 'ACTIVE',
      organisationIdentifier: organisationId,
    },
    failOnStatusCode: false,
  });
  const body = await parseResponseBody(response);
  if (!response.ok()) {
    throw new DynamicOrganisationProvisioningError('approve', endpoint, response.status(), payload.name, body);
  }
  return response.status();
}

async function createDefaultApproveOrgApiContext(baseURL: string): Promise<APIRequestContext> {
  const storageStatePath = resolveApproveOrgStorageStatePath();
  if (isApproveOrgStorageStateFresh(storageStatePath)) {
    const existingContext = await createApproveOrgContextFromStorageState(baseURL, storageStatePath);
    if (await isApproveOrgApiContextAuthenticated(existingContext)) {
      return existingContext;
    }
    await existingContext.dispose();
  }

  const refreshedStorageStatePath = await captureApproveOrgStorageState(baseURL, storageStatePath);
  const refreshedContext = await createApproveOrgContextFromStorageState(baseURL, refreshedStorageStatePath);
  if (await isApproveOrgApiContextAuthenticated(refreshedContext)) {
    return refreshedContext;
  }
  await refreshedContext.dispose();
  throw new Error(`Captured approve-org storage state is not authenticated: ${refreshedStorageStatePath}`);
}

async function approveOrganisationViaApproveOrgApi(
  deps: CreateApprovedOrganisationDeps,
  organisationId: string,
  payload: DynamicOrganisationPayload
): Promise<number> {
  const baseURL = resolveApproveOrgApiBaseUrl();
  const createContext = deps.createApproveOrgApiContext ?? createDefaultApproveOrgApiContext;
  let apiContext: APIRequestContext;
  try {
    apiContext = await createContext(baseURL);
  } catch (error) {
    throw new DynamicOrganisationProvisioningError('approve', baseURL, 'unknown', payload.name, {
      message: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    const readEndpoint = `/api/organisations?organisationId=${encodeURIComponent(organisationId)}&version=v1`;
    const readResponse = await apiContext.get(readEndpoint, { failOnStatusCode: false });
    const readBody = await parseResponseBody(readResponse);
    if (!readResponse.ok()) {
      throw new DynamicOrganisationProvisioningError('approve', readEndpoint, readResponse.status(), payload.name, readBody);
    }

    const approveEndpoint = `/api/organisations/${encodeURIComponent(organisationId)}`;
    const organisation = extractSingleOrganisation(readBody, organisationId);
    if (!organisation) {
      throw new DynamicOrganisationProvisioningError('approve', readEndpoint, readResponse.status(), payload.name, {
        message: `Approve-org API did not return organisation '${organisationId}'.`,
        responsePreview: readBody,
      });
    }
    const xsrfHeaders = await getApproveOrgXsrfHeaders(apiContext);
    const approveResponse = await apiContext.put(approveEndpoint, {
      data: {
        ...organisation,
        organisationIdentifier: organisationId,
        status: 'ACTIVE',
      },
      headers: xsrfHeaders,
      failOnStatusCode: false,
    });
    const approveBody = await parseResponseBody(approveResponse);
    if (!approveResponse.ok()) {
      throw new DynamicOrganisationProvisioningError(
        'approve',
        approveEndpoint,
        approveResponse.status(),
        payload.name,
        approveBody
      );
    }
    return approveResponse.status();
  } finally {
    await apiContext.dispose();
  }
}

async function approveOrganisationWithStrategy(
  apiContext: APIRequestContext,
  deps: CreateApprovedOrganisationDeps,
  organisationId: string,
  payload: DynamicOrganisationPayload,
  strategy: DynamicOrganisationApprovalStrategy
): Promise<{ status: number; strategy: DynamicOrganisationResolvedApprovalStrategy }> {
  if (strategy === 'approve-org-api') {
    return {
      status: await approveOrganisationViaApproveOrgApi(deps, organisationId, payload),
      strategy: 'approve-org-api',
    };
  }

  try {
    return {
      status: await approveOrganisation(apiContext, organisationId, payload),
      strategy: 'rd-professional-api',
    };
  } catch (error) {
    if (strategy !== 'auto' || !(error instanceof DynamicOrganisationProvisioningError) || error.status !== 403) {
      throw error;
    }
    return {
      status: await approveOrganisationViaApproveOrgApi(deps, organisationId, payload),
      strategy: 'approve-org-api',
    };
  }
}

async function waitForActiveOrganisation(
  apiContext: APIRequestContext,
  organisationId: string,
  organisationName: string,
  timeoutMs: number,
  pollIntervalMs: number,
  deps: Pick<CreateApprovedOrganisationDeps, 'now' | 'sleep'>
): Promise<number> {
  const endpoint = '/refdata/internal/v1/organisations?status=Active';
  const deadline = deps.now() + timeoutMs;
  let attempts = 0;
  let lastStatus: number | 'unknown' = 'unknown';
  let lastBody: unknown;
  while (deps.now() < deadline) {
    attempts += 1;
    const response = await apiContext.get(endpoint, { failOnStatusCode: false });
    lastStatus = response.status();
    lastBody = await parseResponseBody(response);
    if (response.ok() && isActiveOrganisation(lastBody, organisationId)) {
      return attempts;
    }
    await deps.sleep(Math.min(pollIntervalMs, Math.max(0, deadline - deps.now())));
  }
  throw new DynamicOrganisationProvisioningError('poll-active', endpoint, lastStatus, organisationName, lastBody);
}

function enrichProvisioningError(
  error: unknown,
  timings: DynamicOrganisationProvisioningStageTiming[],
  totalElapsedMs: number
): never {
  if (error instanceof DynamicOrganisationProvisioningError) {
    error.timings = [...timings];
    error.totalElapsedMs = totalElapsedMs;
  }
  throw error;
}

export async function createApprovedOrganisationFlow(
  options: DynamicOrganisationProvisioningOptions,
  deps: CreateApprovedOrganisationDeps
): Promise<DynamicOrganisationProvisioningResult> {
  const pendingPayload = buildDynamicOrganisationPayload(options, 'PENDING');
  const timings: DynamicOrganisationProvisioningStageTiming[] = [];
  const flowStartedAt = deps.now();
  const timeoutMs = resolvePositiveInt(
    options.timeoutMs,
    process.env.PW_DYNAMIC_ORGANISATION_ACTIVE_TIMEOUT_MS,
    DEFAULT_DYNAMIC_ORG_TIMEOUT_MS
  );
  const pollIntervalMs = resolvePositiveInt(
    options.pollIntervalMs,
    process.env.PW_DYNAMIC_ORGANISATION_ACTIVE_POLL_INTERVAL_MS,
    DEFAULT_DYNAMIC_ORG_POLL_INTERVAL_MS
  );
  const approvalStrategy = resolveApprovalStrategy(options);
  const prereqs = await deps.resolvePrerequisites();
  const apiContext = await deps.createApiContext(prereqs.rdProfessionalApiPath, prereqs.headers);
  try {
    const createStartedAt = deps.now();
    let created: Awaited<ReturnType<typeof createOrganisation>>;
    try {
      created = await createOrganisation(apiContext, pendingPayload);
      timings.push({
        stage: 'create',
        elapsedMs: deps.now() - createStartedAt,
        status: created.status,
      });
    } catch (error) {
      timings.push({
        stage: 'create',
        elapsedMs: deps.now() - createStartedAt,
        status: error instanceof DynamicOrganisationProvisioningError ? error.status : 'unknown',
      });
      enrichProvisioningError(error, timings, deps.now() - flowStartedAt);
    }

    const approveStartedAt = deps.now();
    let approved: Awaited<ReturnType<typeof approveOrganisationWithStrategy>>;
    try {
      approved =
        created.reusedExisting && created.existingStatus === 'ACTIVE'
          ? { status: 200, strategy: 'rd-professional-api' }
          : await approveOrganisationWithStrategy(apiContext, deps, created.organisationId, pendingPayload, approvalStrategy);
      timings.push({
        stage: 'approve',
        elapsedMs: deps.now() - approveStartedAt,
        status: approved.status,
        strategy: approved.strategy,
      });
    } catch (error) {
      timings.push({
        stage: 'approve',
        elapsedMs: deps.now() - approveStartedAt,
        status: error instanceof DynamicOrganisationProvisioningError ? error.status : 'unknown',
        strategy: approvalStrategy === 'auto' ? undefined : approvalStrategy,
      });
      enrichProvisioningError(error, timings, deps.now() - flowStartedAt);
    }

    const pollStartedAt = deps.now();
    let pollAttempts: number;
    try {
      pollAttempts = await waitForActiveOrganisation(
        apiContext,
        created.organisationId,
        pendingPayload.name,
        timeoutMs,
        pollIntervalMs,
        deps
      );
      timings.push({
        stage: 'poll-active',
        elapsedMs: deps.now() - pollStartedAt,
        status: 200,
      });
    } catch (error) {
      timings.push({
        stage: 'poll-active',
        elapsedMs: deps.now() - pollStartedAt,
        status: error instanceof DynamicOrganisationProvisioningError ? error.status : 'unknown',
      });
      enrichProvisioningError(error, timings, deps.now() - flowStartedAt);
    }
    return {
      organisationId: created.organisationId,
      name: pendingPayload.name,
      status: 'ACTIVE',
      createStatus: created.status,
      approveStatus: approved.status,
      pollAttempts,
      approvalStrategy: approved.strategy,
      timings,
      totalElapsedMs: deps.now() - flowStartedAt,
    };
  } finally {
    await apiContext.dispose();
  }
}

export const __test__ = {
  buildDynamicOrganisationPayload,
  createApprovedOrganisationFlow,
  isActiveOrganisation,
  readOrganisationIdentifier,
  resolveApprovalStrategy,
  resolveRunId,
  sanitizeRunToken,
};

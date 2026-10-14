import { type APIRequestContext } from '@playwright/test';

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

export type DynamicOrganisationSuperUser = DynamicOrganisationPayload['superUser'];

export type DynamicOrganisationProvisioningOptions = {
  name?: string;
  runId?: string;
  superUserEmail?: string;
  superUser?: DynamicOrganisationSuperUser;
  timeoutMs?: number;
  pollIntervalMs?: number;
};

export type DynamicOrganisationApprovalStrategy = 'rd-professional-api';
export type DynamicOrganisationResolvedApprovalStrategy = DynamicOrganisationApprovalStrategy;

export type DynamicOrganisationProvisioningStageName = 'create' | 'approve' | 'poll-active';

export type DynamicOrganisationProvisioningStageTiming = {
  stage: DynamicOrganisationProvisioningStageName;
  elapsedMs: number;
  status?: number | 'timeout' | 'unknown';
  strategy?: DynamicOrganisationApprovalStrategy;
};

export type DynamicOrganisationProvisioningResult = {
  organisationId: string;
  name: string;
  status: 'ACTIVE';
  superUser: DynamicOrganisationPayload['superUser'];
  createStatus: number;
  approveStatus: number;
  pollAttempts: number;
  approvalStrategy: DynamicOrganisationApprovalStrategy;
  timings: DynamicOrganisationProvisioningStageTiming[];
  totalElapsedMs: number;
};

type CreateApprovedOrganisationDeps = {
  resolvePrerequisites: () => Promise<OrganisationProvisioningPrerequisites>;
  createApiContext: (baseURL: string, headers: Record<string, string>) => Promise<APIRequestContext>;
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
  const preCreatedSuperUserEmail = firstNonEmpty(options.superUser?.email);
  if (preCreatedSuperUserEmail) return preCreatedSuperUserEmail;
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
  const superUser = options.superUser ?? {
    email: resolveSuperUserEmail(options, runId),
    firstName: 'Playwright',
    lastName: 'Dynamic',
  };
  return {
    name,
    status,
    sraId: buildBoundedIdentifier('PW', runId, RD_PROFESSIONAL_SRA_ID_MAX_LENGTH, 'PWLOCAL'),
    sraRegulated: true,
    superUser,
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
    let approveStatus: number;
    try {
      approveStatus =
        created.reusedExisting && created.existingStatus === 'ACTIVE'
          ? 200
          : await approveOrganisation(apiContext, created.organisationId, pendingPayload);
      timings.push({
        stage: 'approve',
        elapsedMs: deps.now() - approveStartedAt,
        status: approveStatus,
        strategy: 'rd-professional-api',
      });
    } catch (error) {
      timings.push({
        stage: 'approve',
        elapsedMs: deps.now() - approveStartedAt,
        status: error instanceof DynamicOrganisationProvisioningError ? error.status : 'unknown',
        strategy: 'rd-professional-api',
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
      superUser: pendingPayload.superUser,
      createStatus: created.status,
      approveStatus,
      pollAttempts,
      approvalStrategy: 'rd-professional-api',
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
  resolveRunId,
  sanitizeRunToken,
};

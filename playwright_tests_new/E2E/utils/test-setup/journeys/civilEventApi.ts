import type { Page } from '@playwright/test';

import {
  resolveCivilApiRequestTimeoutMs,
  resolveCivilRoleAssignmentWaitTimeoutMs,
  resolveCivilServiceEventRequestTimeoutMs,
} from './civilConfig';
import { waitForCivilRetryDelay } from './civilPolling';
import type { CcdCaseDetails, CivilApiConfig, CivilCaseProgressionEvent, JsonRecord } from './civilTypes';

type InternalEventTriggerResponse = {
  event_token?: string;
  token?: string;
  data?: JsonRecord;
};

const DEFAULT_CCD_EVENT_TRIGGER_WAIT_TIMEOUT_MS = 420_000;

const CCD_INTERNAL_START_EVENT_HEADERS = {
  experimental: 'true',
  Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json',
} as const;

const CCD_CREATE_EVENT_HEADERS = {
  experimental: 'true',
  Accept: 'application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json',
  'Content-Type': 'application/json',
} as const;

export async function submitCcdCaseEventViaApi(options: {
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

export function normaliseCasePayload(payload: JsonRecord): JsonRecord {
  return typeof payload.fieldValues === 'object' && payload.fieldValues !== null ? payload : { fieldValues: payload };
}

export function resolveEventId(event: CivilCaseProgressionEvent): string {
  const eventId = event.eventId ?? event.event;
  if (!eventId?.trim()) {
    throw new Error('Civil progression event requires eventId or event.');
  }
  return eventId;
}

export function extractCaseData(caseDetails: CcdCaseDetails): JsonRecord {
  if (caseDetails.data && typeof caseDetails.data === 'object') {
    return caseDetails.data;
  }
  if (caseDetails.case_data && typeof caseDetails.case_data === 'object') {
    return caseDetails.case_data;
  }
  return {};
}

export async function submitCivilCitizenDraftEvent(options: {
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

export async function submitCivilCitizenEvent(options: {
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

export async function assignCivilCaseRoleToUser(options: {
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

export function resolveCaseNumberFromCivilResponse(payload: CcdCaseDetails): string {
  const candidate = payload.id ?? payload.case_id ?? payload.case_reference ?? payload.caseReference;
  if (typeof candidate === 'string' || typeof candidate === 'number') {
    return String(candidate).replace(/\D/g, '');
  }
  throw new Error('Civil create claim API response did not include a case id.');
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

function isRetryableCivilRoleAssignmentResponse(status: number, body: string): boolean {
  if ([429, 500, 502, 503, 504].includes(status) && /case status did not qualify for the event/i.test(body)) {
    return true;
  }

  return [429, 502, 503, 504].includes(status);
}

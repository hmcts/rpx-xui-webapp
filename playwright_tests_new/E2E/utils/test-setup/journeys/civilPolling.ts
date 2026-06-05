import type { Page } from '@playwright/test';

import { resolveCivilApiRequestTimeoutMs, resolveCivilServiceBusinessProcessWaitTimeoutMs } from './civilConfig';
import type { CcdCaseDetails, CivilApiConfig } from './civilTypes';

const DEFAULT_STATE_WAIT_TIMEOUT_MS = 180_000;
const DEFAULT_STATE_WAIT_INTERVAL_MS = 3_000;
const DEFAULT_CASE_DETAILS_FETCH_WAIT_TIMEOUT_MS = 60_000;
const DEFAULT_CCD_EVENT_TRIGGER_WAIT_INTERVAL_MS = 3_000;
const DEFAULT_BUSINESS_PROCESS_WAIT_INTERVAL_MS = 3_000;

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

export function resolveCcdCaseStateId(caseDetails: CcdCaseDetails): string | undefined {
  const state = caseDetails.state;
  if (typeof state === 'string') {
    return state;
  }
  return state?.id;
}

export async function waitForCivilRetryDelay(
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

export async function waitForCaseState(
  options: {
    page: Page;
    caseNumber: string;
    expectedState: string;
    context: string;
  },
  fetchCaseDetails: (page: Page, caseNumber: string) => Promise<CcdCaseDetails> = fetchCaseDetailsViaApi
): Promise<CcdCaseDetails> {
  const deadline = Date.now() + DEFAULT_STATE_WAIT_TIMEOUT_MS;
  let lastCaseDetails: CcdCaseDetails | undefined;
  let lastFetchError: string | undefined;

  while (Date.now() < deadline) {
    try {
      lastCaseDetails = await fetchCaseDetails(options.page, options.caseNumber);
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

export async function waitForFinishedCivilBusinessProcess(
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

function isRetryableCaseDetailsFetchStatus(status: number): boolean {
  return [404, 409, 429, 500, 502, 503, 504].includes(status);
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

function isRetryableCaseDetailsFetchError(message: string): boolean {
  return /Failed to fetch case .* via API: HTTP (404|409|429|500|502|503|504)/i.test(message);
}

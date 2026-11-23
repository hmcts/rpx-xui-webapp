import type { TestInfo } from '@playwright/test';

/**
 * Producer-contract markers read by the CI failure analytics harness (agent-harness docs/producer-contract.md).
 * `service-failure` (section 3) is parsed by `serviceFailureSignals` in agent-harness src/playwright-json-evidence.ts.
 */
export const SERVICE_FAILURE_ATTACHMENT = 'service-failure';
export const IDENTITY_LEASE_WAIT_ANNOTATION = 'identity-lease-wait';

const MAX_SERVICE_FAILURE_RECORDS = 5;
const MAX_URL_PATH_LENGTH = 240;

export type ServiceFailureRecord = { service: string; method: string; url_path: string; status: number };

export type ObservedApiFailure = {
  url: string;
  method: string;
  status: number;
  /** True only when the response came from a real server; route-fulfilled (mocked) responses are false. */
  servedByNetwork?: boolean;
};

// Only routes that pass through to a named downstream service. XUI's own node routes (`/api/`, `/auth/`) are the
// product under test, so a 5xx there is not attributed to an external service.
const DOWNSTREAM_SERVICE_ROUTES: ReadonlyArray<[RegExp, string]> = [
  [/^\/workallocation\//i, 'work-allocation'],
  [/^\/(?:aggregated\/caseworkers|data|caseworkers)\//i, 'ccd-data-store'],
];

export function downstreamServiceForPath(path: string): string | undefined {
  return DOWNSTREAM_SERVICE_ROUTES.find(([pattern]) => pattern.test(path))?.[1];
}

function pathOf(url: string): string | undefined {
  try {
    const path = new URL(url).pathname;
    return path.startsWith('/') && path.length <= MAX_URL_PATH_LENGTH ? path : undefined;
  } catch {
    return undefined;
  }
}

/** Real (not mocked) 5xx responses from named downstream services, de-duplicated and bounded. Expects redacted URLs. */
export function buildServiceFailureRecords(failures: ReadonlyArray<ObservedApiFailure>): ServiceFailureRecord[] {
  const records = new Map<string, ServiceFailureRecord>();
  for (const failure of failures) {
    if (failure.status < 500 || failure.status > 599 || failure.servedByNetwork !== true) {
      continue;
    }
    const urlPath = pathOf(failure.url);
    const service = urlPath ? downstreamServiceForPath(urlPath) : undefined;
    if (!urlPath || !service) {
      continue;
    }
    const record = { service, method: failure.method.toUpperCase(), url_path: urlPath, status: failure.status };
    records.set(`${record.method} ${record.url_path} ${record.status}`, record);
  }
  return [...records.values()].slice(0, MAX_SERVICE_FAILURE_RECORDS);
}

export async function attachServiceFailures(
  testInfo: Pick<TestInfo, 'attach'>,
  failures: ReadonlyArray<ObservedApiFailure>
): Promise<void> {
  for (const record of buildServiceFailureRecords(failures)) {
    await testInfo.attach(SERVICE_FAILURE_ATTACHMENT, { body: JSON.stringify(record), contentType: 'application/json' });
  }
}

/** Records how long identity-lease acquisition waited and the test timeout that resulted, for timeout analysis. */
// Waits shorter than this are an uncontended acquire; annotating them would only add report noise.
const MIN_REPORTED_LEASE_WAIT_MS = 1_000;

export function annotateIdentityLeaseWait(testInfo: Pick<TestInfo, 'annotations'>, waitedMs: number, timeoutMs: number): void {
  if (!(waitedMs >= MIN_REPORTED_LEASE_WAIT_MS)) return;
  testInfo.annotations.push({
    type: IDENTITY_LEASE_WAIT_ANNOTATION,
    description: `waited_ms=${Math.max(0, Math.round(waitedMs))} timeout_ms=${timeoutMs}`,
  });
}

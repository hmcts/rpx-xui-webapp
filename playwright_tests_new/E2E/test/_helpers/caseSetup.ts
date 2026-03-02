import { createLogger } from '@hmcts/playwright-common';
import type { Page, TestInfo } from '@playwright/test';

import type { CaseDetailsPage } from '../../page-objects/pages/exui/caseDetails.po';
import type { CreateCasePage } from '../../page-objects/pages/exui/createCase.po';

type SetupMode = 'api-required' | 'api-first' | 'ui-only';

type SetupCaseRequest = {
  scenario: string;
  jurisdiction: string;
  caseType: string;
  mode?: SetupMode;
  allowUiFallback?: boolean;
  apiPayload?: Record<string, unknown>;
  uiCreate: () => Promise<void>;
  page: Page;
  createCasePage: CreateCasePage;
  caseDetailsPage: CaseDetailsPage;
  testInfo?: TestInfo;
};

type SetupCaseResult = {
  caseNumber: string;
  mode: 'api' | 'ui';
};

type ApiSetupResponse = {
  caseId?: string;
  caseReference?: string;
  caseNumber?: string;
  jurisdictionId?: string;
  caseTypeId?: string;
  caseDetailsPath?: string;
};

const logger = createLogger({
  serviceName: 'e2e-case-setup',
  format: 'pretty',
});

const TRUTHY_VALUES = new Set(['1', 'true', 'yes', 'on']);
const DEFAULT_CASE_SETUP_TIMEOUT_MS = 60_000;

function isTruthy(value: string | undefined): boolean {
  return TRUTHY_VALUES.has((value ?? '').trim().toLowerCase());
}

function resolveSetupMode(mode: SetupMode | undefined): SetupMode {
  if (mode) {
    return mode;
  }
  const configured = process.env.PW_E2E_CASE_SETUP_MODE?.trim().toLowerCase();
  if (configured === 'api-required') {
    return 'api-required';
  }
  if (configured === 'ui-only') {
    return 'ui-only';
  }
  return 'api-first';
}

function resolveUiFallbackFlag(value: boolean | undefined): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  return isTruthy(process.env.PW_E2E_CASE_SETUP_ALLOW_UI_FALLBACK);
}

function buildCaseDetailsPath(response: ApiSetupResponse): string | undefined {
  if (response.caseDetailsPath?.trim()) {
    return response.caseDetailsPath.trim();
  }
  const caseNumber = response.caseNumber?.trim() || response.caseReference?.trim() || response.caseId?.trim();
  if (!caseNumber) {
    return undefined;
  }
  const jurisdictionId = response.jurisdictionId?.trim();
  const caseTypeId = response.caseTypeId?.trim();
  if (!jurisdictionId || !caseTypeId) {
    return undefined;
  }
  return `/cases/case-details/${jurisdictionId}/${caseTypeId}/${caseNumber}`;
}

async function createCaseViaApi(request: SetupCaseRequest): Promise<string | undefined> {
  const endpoint = process.env.PW_E2E_CASE_SETUP_API_ENDPOINT?.trim();
  if (!endpoint) {
    return undefined;
  }

  const timeoutMs = Number.parseInt(process.env.PW_E2E_CASE_SETUP_TIMEOUT_MS ?? '', 10);
  const effectiveTimeoutMs = Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : DEFAULT_CASE_SETUP_TIMEOUT_MS;

  const payload = {
    scenario: request.scenario,
    jurisdiction: request.jurisdiction,
    caseType: request.caseType,
    ...(request.apiPayload ?? {}),
  };

  const response = await request.page.request.post(endpoint, {
    data: payload,
    failOnStatusCode: false,
    timeout: effectiveTimeoutMs,
  });

  const responseText = await response.text();
  let parsed: ApiSetupResponse = {};
  try {
    parsed = responseText ? (JSON.parse(responseText) as ApiSetupResponse) : {};
  } catch {
    parsed = {};
  }

  if (request.testInfo) {
    await request.testInfo.attach('case-setup-api-response.json', {
      body: JSON.stringify(
        {
          endpoint,
          status: response.status(),
          payload,
          body: parsed,
        },
        null,
        2
      ),
      contentType: 'application/json',
    });
  }

  if (response.status() < 200 || response.status() >= 300) {
    throw new Error(`API case setup failed with HTTP ${response.status()} for scenario '${request.scenario}'.`);
  }

  const path = buildCaseDetailsPath(parsed);
  if (!path) {
    throw new Error(`API case setup returned HTTP ${response.status()} but no case identifier/path for '${request.scenario}'.`);
  }

  await request.page.goto(path);
  await request.caseDetailsPage.exuiSpinnerComponent.wait();
  return request.caseDetailsPage.getCaseNumberFromUrl();
}

export async function setupCaseForJourney(request: SetupCaseRequest): Promise<SetupCaseResult> {
  const mode = resolveSetupMode(request.mode);
  const allowUiFallback = resolveUiFallbackFlag(request.allowUiFallback);

  if (mode !== 'ui-only') {
    try {
      const apiCaseNumber = await createCaseViaApi(request);
      if (apiCaseNumber) {
        logger.info('Case setup created via API', {
          scenario: request.scenario,
          caseNumber: apiCaseNumber,
          jurisdiction: request.jurisdiction,
          caseType: request.caseType,
        });
        return {
          caseNumber: apiCaseNumber,
          mode: 'api',
        };
      }
      if (mode === 'api-required') {
        throw new Error(`API case setup endpoint is not configured (PW_E2E_CASE_SETUP_API_ENDPOINT) for '${request.scenario}'.`);
      }
    } catch (error) {
      if (mode === 'api-required' || !allowUiFallback) {
        throw error;
      }
      logger.warn('Falling back to UI case setup after API setup failure', {
        scenario: request.scenario,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  await request.uiCreate();
  const uiCaseNumber = await request.caseDetailsPage.getCaseNumberFromUrl();
  logger.info('Case setup created via UI fallback', {
    scenario: request.scenario,
    caseNumber: uiCaseNumber,
    jurisdiction: request.jurisdiction,
    caseType: request.caseType,
  });
  return {
    caseNumber: uiCaseNumber,
    mode: 'ui',
  };
}

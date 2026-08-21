import { expect, test } from '@playwright/test';

import { __test__ as diagnosticsTest } from '../../E2E/fixtures.js';
import { TEST_AVAILABLE_TASKS_URL, TEST_SERVICE_DOWN_URL } from './testAppUrls.js';

test.describe.configure({ mode: 'serial' });

const baseExecutionSignals = {
  lastMainFrameUrl: 'about:blank',
  mainFrameNavigationCount: 0,
  totalRequestsObserved: 0,
  backendRequestsObserved: 0,
};

test.describe('Failure diagnosis unit tests', { tag: '@svc-internal' }, () => {
  test('classifyFailure treats direct CCD event-token 502 failures as backend 5xx', () => {
    const failureType = diagnosticsTest.classifyFailure({
      error: "Error: Failed to fetch direct CCD event token (HTTP 502) for 'case-flags-employment-case-level'.",
      serverErrors: [],
      clientErrors: [],
      slowCalls: [],
      failedRequests: [],
      networkTimeout: false,
      testStatus: 'failed',
      executionSignals: {
        lastMainFrameUrl: 'https://manage-case.aat.platform.hmcts.net/cases/case-filter',
        mainFrameNavigationCount: 2,
        totalRequestsObserved: 23,
        backendRequestsObserved: 6,
      },
      failureLocation: '/tmp/caseSetup.ts:329',
      actionableErrorLine: "Failed to fetch direct CCD event token (HTTP 502) for 'case-flags-employment-case-level'.",
    });

    expect(failureType).toBe('DOWNSTREAM_API_5XX');
  });

  test('classifies a direct CCD case-create 504 with its owning route', () => {
    const error =
      "Error: Direct CCD case create failed with HTTP 504 for 'case-flags-employment-case-level'. Route='POST /data/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:caseType/cases?ignore-warning=false'.";
    const failureType = diagnosticsTest.classifyFailure({
      error,
      serverErrors: [],
      clientErrors: [],
      slowCalls: [],
      failedRequests: [],
      networkTimeout: false,
      testStatus: 'failed',
      executionSignals: baseExecutionSignals,
      failureLocation: '/tmp/caseSetup.ts:530',
      actionableErrorLine: error,
    });

    expect(failureType).toBe('DOWNSTREAM_API_5XX');
    expect(diagnosticsTest.deriveFailureSource(failureType, error, '')).toBe(
      'CCD Data Store direct case-create route: POST /data/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:caseType/cases?ignore-warning=false'
    );
  });

  test('classifyFailure reports session-capture login-surface failures as authentication infrastructure', () => {
    const failureType = diagnosticsTest.classifyFailure({
      error: 'SessionCaptureError: IDAM login surface did not render within 20000ms for FPL_GLOBAL_SEARCH',
      serverErrors: [],
      clientErrors: [],
      slowCalls: [],
      failedRequests: [],
      networkTimeout: false,
      testStatus: 'failed',
      executionSignals: baseExecutionSignals,
    });

    expect(failureType).toBe('AUTHENTICATION_SESSION_UNAVAILABLE');
    expect(diagnosticsTest.deriveFailureSource(failureType, 'SessionCaptureError: IDAM login surface did not render', '')).toBe(
      'XUI/IDAM authentication session capture'
    );
  });

  test('classifies a reused-session app-shell timeout as authentication infrastructure', () => {
    const error =
      'App shell not detected within 60000ms (preferred=exui-header, url=https://manage-case.aat.platform.hmcts.net/)';
    const failureType = diagnosticsTest.classifyFailure({
      error,
      serverErrors: [],
      clientErrors: [],
      slowCalls: [],
      failedRequests: [],
      networkTimeout: false,
      testStatus: 'failed',
      executionSignals: baseExecutionSignals,
      failureLocation: '/tmp/sessionCapture.ts:1067',
      actionableErrorLine: error,
    });

    expect(failureType).toBe('AUTHENTICATION_SESSION_UNAVAILABLE');
    expect(diagnosticsTest.deriveFailureSource(failureType, error, '')).toBe('XUI/IDAM authentication session capture');
  });

  test('derives the owning downstream route instead of reporting a generic backend failure', () => {
    expect(
      diagnosticsTest.deriveFailureSource(
        'DOWNSTREAM_API_5XX',
        'Request failed with status 504',
        'GET https://manage-case.aat.platform.hmcts.net/aggregated/caseworkers/:uid/jurisdictions -> HTTP 504'
      )
    ).toBe(
      'XUI aggregated caseworker route: https://manage-case.aat.platform.hmcts.net/aggregated/caseworkers/:uid/jurisdictions'
    );
  });

  test('deriveLikelyRootCause explains direct CCD event-token bootstrap failures', () => {
    const message = diagnosticsTest.deriveLikelyRootCause({
      failureType: 'DOWNSTREAM_API_5XX',
      testStatus: 'failed',
      error: "Error: Failed to fetch direct CCD event token (HTTP 502) for 'case-flags-employment-case-level'.",
      timeoutSummary: '',
      dominantSlowEndpoint: null,
      topSuspect: 'No backend/API suspect identified',
      executionSignals: {
        lastMainFrameUrl: 'https://manage-case.aat.platform.hmcts.net/cases/case-filter',
        mainFrameNavigationCount: 2,
        totalRequestsObserved: 23,
        backendRequestsObserved: 6,
      },
      failureLocation: '/tmp/caseSetup.ts:329',
      actionableErrorLine: "Failed to fetch direct CCD event token (HTTP 502) for 'case-flags-employment-case-level'.",
    });

    expect(message).toContain('Direct CCD event-token bootstrap failed');
    expect(message).toContain('downstream 5xx response');
  });

  test('deriveLikelyRootCause names the direct CCD case-create stage', () => {
    const message = diagnosticsTest.deriveLikelyRootCause({
      failureType: 'DOWNSTREAM_API_5XX',
      testStatus: 'failed',
      error: 'Direct CCD case create failed with HTTP 504.',
      timeoutSummary: '',
      dominantSlowEndpoint: null,
      topSuspect: 'No backend/API suspect identified',
      executionSignals: baseExecutionSignals,
      failureLocation: '/tmp/caseSetup.ts:530',
      actionableErrorLine: 'Direct CCD case create failed with HTTP 504.',
    });

    expect(message).toContain('case-create submission');
    expect(message).toContain('downstream 5xx response');
  });

  test('classifyFailure treats locator timeouts without backend traffic as UI stalls', () => {
    const failureType = diagnosticsTest.classifyFailure({
      error: 'Test timeout of 120000ms exceeded.\nError: locator.waitFor: Test timeout of 120000ms exceeded.',
      serverErrors: [],
      clientErrors: [],
      slowCalls: [],
      failedRequests: [],
      networkTimeout: false,
      testStatus: 'timedOut',
      executionSignals: baseExecutionSignals,
    });

    expect(failureType).toBe('GLOBAL_TIMEOUT_UI_STALL');
  });

  test('deriveLikelyRootCause identifies dynamic provisioning setup timeout as non-UI failure', () => {
    const message = diagnosticsTest.deriveLikelyRootCause({
      failureType: 'TIMEOUT_NO_API_ACTIVITY',
      testStatus: 'timedOut',
      error: 'Dynamic user provisioning failed for alias SOLICITOR after 2 attempt(s).',
      timeoutSummary: '',
      dominantSlowEndpoint: null,
      topSuspect: 'No backend/API suspect identified',
      executionSignals: baseExecutionSignals,
      failureLocation: '/tmp/dynamicProvisioningFlow.ts:107',
      actionableErrorLine: 'Dynamic user provisioning timed out after 120000ms for alias SOLICITOR on attempt 2/2.',
    });

    expect(message).toContain('setup/provisioning timeout');
    expect(message).toContain('not a document-upload UI failure');
  });

  test('deriveLikelyRootCause identifies task-list shell stalls before blaming backend', () => {
    const message = diagnosticsTest.deriveLikelyRootCause({
      failureType: 'GLOBAL_TIMEOUT_UI_STALL',
      testStatus: 'timedOut',
      error: 'Error: locator.waitFor: Test timeout of 120000ms exceeded.',
      timeoutSummary: '',
      dominantSlowEndpoint: null,
      topSuspect: 'No backend/API suspect identified',
      executionSignals: {
        lastMainFrameUrl: TEST_AVAILABLE_TASKS_URL,
        mainFrameNavigationCount: 7,
        totalRequestsObserved: 65,
        backendRequestsObserved: 17,
      },
      failureLocation: '/tmp/taskList.po.ts:80',
      actionableErrorLine: 'Task list filter panel did not become ready within 5000ms.',
    });

    expect(message).toContain('filter panel never became usable');
    expect(message).toContain('filter-panel readiness');
  });

  test('deriveLikelyRootCause identifies missing task-list filter controls before blaming backend', () => {
    const message = diagnosticsTest.deriveLikelyRootCause({
      failureType: 'GLOBAL_TIMEOUT_UI_STALL',
      testStatus: 'timedOut',
      error: 'Test timeout of 120000ms exceeded.',
      timeoutSummary: '',
      dominantSlowEndpoint: null,
      topSuspect: 'No backend/API suspect identified',
      executionSignals: {
        lastMainFrameUrl: TEST_AVAILABLE_TASKS_URL,
        mainFrameNavigationCount: 7,
        totalRequestsObserved: 65,
        backendRequestsObserved: 17,
      },
      failureLocation: '/tmp/availableTasksList.negative.spec.ts:43',
      actionableErrorLine: 'Task list filter controls did not become visible within 15000ms.',
    });

    expect(message).toContain('filter controls never became visible');
    expect(message).toContain('filter-shell readiness');
  });

  test('deriveLikelyRootCause identifies task-list checkbox state-read failures before blaming backend', () => {
    const message = diagnosticsTest.deriveLikelyRootCause({
      failureType: 'GLOBAL_TIMEOUT_UI_STALL',
      testStatus: 'timedOut',
      error: 'Test timeout of 120000ms exceeded.\nError: locator.isChecked: Target page, context or browser has been closed',
      timeoutSummary: '',
      dominantSlowEndpoint: null,
      topSuspect: 'No backend/API suspect identified',
      executionSignals: {
        lastMainFrameUrl: TEST_AVAILABLE_TASKS_URL,
        mainFrameNavigationCount: 7,
        totalRequestsObserved: 65,
        backendRequestsObserved: 17,
      },
      failureLocation: '/tmp/taskList.po.ts:218',
      actionableErrorLine:
        'Task list filter checkbox "services option 1" state could not be read because the page or browser closed before the operation completed.',
    });

    expect(message).toContain('checkbox never became usable');
    expect(message).toContain('state/interaction');
  });

  test('classifyFailure treats custom case-list readiness errors as UI failures', () => {
    const failureType = diagnosticsTest.classifyFailure({
      error: 'Error: Cases page shell did not become ready within 30000ms.',
      serverErrors: [],
      clientErrors: [],
      slowCalls: [],
      failedRequests: [],
      networkTimeout: false,
      testStatus: 'failed',
      executionSignals: baseExecutionSignals,
    });

    expect(failureType).toBe('UI_ELEMENT_MISSING');
  });

  test('classifyFailure treats generic timeout plus task-list actionable line as a UI stall', () => {
    const failureType = diagnosticsTest.classifyFailure({
      error: 'Test timeout of 120000ms exceeded.',
      serverErrors: [],
      clientErrors: [],
      slowCalls: [],
      failedRequests: [],
      networkTimeout: false,
      testStatus: 'timedOut',
      executionSignals: baseExecutionSignals,
      failureLocation: '/tmp/taskList.po.ts:105',
      actionableErrorLine: 'Task list shell did not become ready within 20000ms (task list navigation).',
    });

    expect(failureType).toBe('GLOBAL_TIMEOUT_UI_STALL');
  });

  test('derivePhaseMarker prioritises task-list filter control stalls over generic UI timeout markers', () => {
    const phaseMarker = diagnosticsTest.derivePhaseMarker(
      'GLOBAL_TIMEOUT_UI_STALL',
      'Test timeout of 120000ms exceeded.',
      {
        lastMainFrameUrl: TEST_AVAILABLE_TASKS_URL,
        mainFrameNavigationCount: 7,
        totalRequestsObserved: 65,
        backendRequestsObserved: 17,
      },
      'no',
      '/tmp/availableTasksList.negative.spec.ts:43',
      'Task list filter controls did not become visible within 15000ms.'
    );

    expect(phaseMarker).toBe('ui-filter-controls-timeout');
  });

  test('derivePhaseMarker classifies task-list checkbox state-read failures as filter checkbox timeouts', () => {
    const phaseMarker = diagnosticsTest.derivePhaseMarker(
      'GLOBAL_TIMEOUT_UI_STALL',
      'Test timeout of 120000ms exceeded.\nError: locator.isChecked: Target page, context or browser has been closed',
      {
        lastMainFrameUrl: TEST_AVAILABLE_TASKS_URL,
        mainFrameNavigationCount: 7,
        totalRequestsObserved: 65,
        backendRequestsObserved: 17,
      },
      'no',
      '/tmp/taskList.po.ts:218',
      'Task list filter checkbox "services option 1" state could not be read because the page or browser closed before the operation completed.'
    );

    expect(phaseMarker).toBe('ui-filter-checkbox-timeout');
  });

  test('deriveLikelyRootCause identifies case-list bootstrap readiness failures', () => {
    const message = diagnosticsTest.deriveLikelyRootCause({
      failureType: 'UI_ELEMENT_MISSING',
      testStatus: 'failed',
      error: 'Error: Cases page shell did not become ready within 30000ms.',
      timeoutSummary: '',
      dominantSlowEndpoint: null,
      topSuspect: 'No backend/API suspect identified',
      executionSignals: baseExecutionSignals,
      failureLocation: '/tmp/caseList.po.ts:102',
      actionableErrorLine: 'Cases page shell did not become ready within 30000ms.',
    });

    expect(message).toContain('/cases shell did not become interactive');
    expect(message).toContain('case-list bootstrap readiness');
  });

  test('classifyFailure treats task-list service-down readiness errors as UI failures', () => {
    const failureType = diagnosticsTest.classifyFailure({
      error: 'Error: Task list showed service down while waiting for task list shell (task list navigation).',
      serverErrors: [],
      clientErrors: [],
      slowCalls: [],
      failedRequests: [],
      networkTimeout: false,
      testStatus: 'failed',
      executionSignals: baseExecutionSignals,
    });

    expect(failureType).toBe('UI_ELEMENT_MISSING');
  });

  test('deriveLikelyRootCause identifies task-list service-down readiness failures', () => {
    const message = diagnosticsTest.deriveLikelyRootCause({
      failureType: 'UI_ELEMENT_MISSING',
      testStatus: 'failed',
      error: 'Error: Task list showed service down while waiting for task list shell (task list navigation).',
      timeoutSummary: '',
      dominantSlowEndpoint: null,
      topSuspect: 'No backend/API suspect identified',
      executionSignals: {
        lastMainFrameUrl: TEST_SERVICE_DOWN_URL,
        mainFrameNavigationCount: 2,
        totalRequestsObserved: 4,
        backendRequestsObserved: 0,
      },
      failureLocation: '/tmp/taskList.po.ts:120',
      actionableErrorLine: 'Task list showed service down while waiting for task list shell (task list navigation).',
    });

    expect(message).toContain('error/service-down state');
    expect(message).toContain('task-list readiness');
  });
});

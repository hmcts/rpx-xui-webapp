import { expect, test } from '@playwright/test';

import {
  clickSubmitAndWaitFlow,
  findCreateCaseBootstrapFailure,
  startCreateCaseFlow,
} from '../../E2E/page-objects/pages/exui/createCase.flow.js';
import { buildTestAppUrl } from './testAppUrls.js';
import { SUBMIT_ENDPOINT, submitFlowScenario } from './create-case-submit-support.js';

function createLocator(overrides: Partial<Record<'isVisible' | 'isEnabled' | 'click' | 'waitFor', () => Promise<unknown>>> = {}) {
  return {
    isVisible: overrides.isVisible ?? (async () => false),
    isEnabled: overrides.isEnabled ?? (async () => true),
    click: overrides.click ?? (async () => undefined),
    waitFor: overrides.waitFor ?? (async () => undefined),
    first() {
      return this;
    },
    evaluate: async () => [],
    selectOption: async () => undefined,
  };
}

test.describe.configure({ mode: 'serial' });

test.describe('Create case flow unit tests', { tag: '@svc-internal' }, () => {
  for (const errorAt of ['click', 'spinner', 'event-error', undefined] as const) {
    test(`fresh submit HTTP failure takes precedence over ${errorAt ?? 'validation'} error`, async () => {
      const scenario = submitFlowScenario({
        submitCall: { method: 'POST', status: 502, url: SUBMIT_ENDPOINT },
        errorAt,
        error: new Error("Cannot read properties of null (reading 'indexOf')"),
        validationText: "The event could not be created. Cannot read properties of null (reading 'indexOf')",
      });
      await expect(clickSubmitAndWaitFlow(scenario.options)).rejects.toThrow(
        `Critical wizard endpoint failure after submit document upload submit: POST ${SUBMIT_ENDPOINT} returned HTTP 502`
      );
      expect(scenario.clicks()).toBe(1);
    });
  }

  for (const [priorCount, burstCount] of [
    [500, 0],
    [499, 4],
    [500, 500],
  ]) {
    test(`fresh submit failure survives FIFO history with ${priorCount} prior and ${burstCount} concurrent calls`, async () => {
      const scenario = submitFlowScenario({
        previousCalls: Array.from({ length: priorCount }, () => ({ method: 'POST', status: 502, url: SUBMIT_ENDPOINT })),
        submitCalls: Array.from({ length: burstCount }, () => ({
          method: 'GET',
          status: 200,
          url: buildTestAppUrl('/unrelated/resource'),
        })),
        submitCall: { method: 'POST', status: 502, url: SUBMIT_ENDPOINT },
        validationText: 'Secondary validation error',
      });
      await expect(clickSubmitAndWaitFlow(scenario.options)).rejects.toThrow(`POST ${SUBMIT_ENDPOINT} returned HTTP 502`);
      expect(scenario.clicks()).toBe(1);
    });
  }

  test('stale and unrelated HTTP failures do not replace the original submit error', async () => {
    const original = new Error('Original spinner failure');
    const scenario = submitFlowScenario({
      previousCalls: [{ method: 'POST', status: 502, url: SUBMIT_ENDPOINT }],
      submitCall: { method: 'GET', status: 503, url: buildTestAppUrl('/unrelated/resource') },
      errorAt: 'spinner',
      error: original,
    });
    await expect(clickSubmitAndWaitFlow(scenario.options)).rejects.toBe(original);
    expect(scenario.clicks()).toBe(1);
  });

  test('validation failures without fresh critical HTTP evidence remain failures', async () => {
    const scenario = submitFlowScenario({ validationText: 'A required field is missing' });
    await expect(clickSubmitAndWaitFlow(scenario.options)).rejects.toThrow(
      'Validation error after submit document upload submit: A required field is missing'
    );
    expect(scenario.clicks()).toBe(1);
  });

  test('successful submit ignores an earlier failed request and submits once', async () => {
    const scenario = submitFlowScenario({
      previousCalls: [{ method: 'POST', status: 502, url: SUBMIT_ENDPOINT }],
      submitCall: { method: 'POST', status: 201, url: SUBMIT_ENDPOINT },
    });
    await clickSubmitAndWaitFlow(scenario.options);
    expect(scenario.clicks()).toBe(1);
  });

  test('waits for delayed usable summary despite an absent spinner and submits once', async () => {
    const scenario = submitFlowScenario({ completion: { afterPolls: 2 } });
    await clickSubmitAndWaitFlow(scenario.options);
    expect(scenario.polls()).toBe(2);
    expect(scenario.clicks()).toBe(1);
  });

  for (const [initialPath, path] of [
    ['/cases/case-details/1234567890123456/trigger/updateCase', '/cases/case-details/DIVORCE/test/1234567890123456'],
    ['/cases/case-details/DIVORCE/test/1234567890123456/trigger/updateCase', '/cases/case-details/1234567890123456'],
  ]) {
    test(`accepts the same case summary alias ${path}`, async () => {
      const scenario = submitFlowScenario({ initialPath, completion: { path } });
      scenario.options.timeoutMs = 50;
      await clickSubmitAndWaitFlow(scenario.options);
      expect(scenario.clicks()).toBe(1);
    });
  }

  test('new case submission accepts its newly assigned summary route', async () => {
    const scenario = submitFlowScenario({
      initialPath: '/cases/create/DIVORCE/test/createCase',
      completion: { afterPolls: 1, path: '/cases/case-details/DIVORCE/test/9999999999999999' },
    });
    await clickSubmitAndWaitFlow(scenario.options);
    expect(scenario.polls()).toBe(1);
  });

  for (const completion of [
    { afterPolls: 1, call: { method: 'POST', status: 502, url: SUBMIT_ENDPOINT } },
    { afterPolls: 1, validationText: 'Delayed validation failure' },
    { afterPolls: 1, closed: true },
  ]) {
    test(`rejects delayed submit failure ${JSON.stringify(completion)}`, async () => {
      const scenario = submitFlowScenario({ completion });
      await expect(clickSubmitAndWaitFlow(scenario.options)).rejects.toThrow(
        completion.call ? /returned HTTP 502/ : completion.closed ? /Page closed/ : /Delayed validation failure/
      );
      expect(scenario.clicks()).toBe(1);
    });
  }

  for (const completion of [
    { path: '/cases/case-details/9999999999999999' },
    { path: '/not-authorised' },
    { path: '/cases/case-details/1234567890123456/trigger/other' },
    { path: '/cases/case-details/1234567890123456/trigger/1234567890123456' },
    { path: '/cases/case-details/DIVORCE/test/9999999999999999' },
    { ready: false },
    { stalled: true },
  ]) {
    test(`does not finish on unusable submit destination ${JSON.stringify(completion)}`, async () => {
      const scenario = submitFlowScenario({ completion });
      scenario.options.timeoutMs = 10;
      await expect(clickSubmitAndWaitFlow(scenario.options)).rejects.toThrow(/Case details summary did not become usable/);
      expect(scenario.clicks()).toBe(1);
    });
  }

  test('findCreateCaseBootstrapFailure returns the first recent bootstrap endpoint failure', () => {
    const failure = findCreateCaseBootstrapFailure(
      [
        {
          method: 'GET',
          status: 200,
          url: buildTestAppUrl('/aggregated/caseworkers/123/jurisdictions'),
        },
        {
          method: 'GET',
          status: 502,
          url: buildTestAppUrl('/data/internal/case-types/ET_EnglandWales/event-triggers/initiateCase'),
        },
      ],
      1
    );

    expect(failure).toEqual({
      method: 'GET',
      status: 502,
      url: buildTestAppUrl('/data/internal/case-types/ET_EnglandWales/event-triggers/initiateCase'),
    });
  });

  test('clickSubmitAndWaitFlow auto-advances, submits, and stops on case details summary', async () => {
    let currentUrl = buildTestAppUrl('/cases/case-details/1/trigger/start');
    let continueVisible = true;
    let submitVisible = false;
    const actionSequence: string[] = [];

    const continueButton = createLocator({
      isEnabled: async () => true,
    });
    const submitButton = createLocator();
    const somethingWentWrongHeading = createLocator();

    const page = {
      isClosed: () => false,
      url: () => currentUrl,
      locator: (selector: string) => {
        if (selector === '#next-step') {
          return createLocator({
            isVisible: async () => !currentUrl.includes('/trigger/'),
          });
        }
        if (selector === 'xuilib-loading-spinner') {
          return createLocator({
            isVisible: async () => false,
          });
        }
        throw new Error(`Unexpected selector: ${selector}`);
      },
      waitForTimeout: async () => undefined,
      getByRole: () => ({
        allInnerTexts: async () => ['Continue', 'Submit'],
      }),
    };

    await clickSubmitAndWaitFlow({
      page: page as never,
      context: 'unit test submit flow',
      timeoutMs: 5_000,
      maxAutoAdvanceAttempts: 2,
      submitButton: submitButton as never,
      continueButton: continueButton as never,
      somethingWentWrongHeading: somethingWentWrongHeading as never,
      getApiCalls: () => [],
      getVisibleActionButton: async (locator) => {
        if (locator === (submitButton as never)) {
          return submitVisible ? (submitButton as never) : undefined;
        }
        if (locator === (continueButton as never)) {
          return continueVisible ? (continueButton as never) : undefined;
        }
        return undefined;
      },
      clickSubmitButtonWithRetry: async () => {
        actionSequence.push('submit');
        currentUrl = buildTestAppUrl('/cases/case-details/1');
        submitVisible = false;
      },
      clickContinueAndWait: async () => {
        actionSequence.push('continue');
        continueVisible = false;
        submitVisible = true;
        currentUrl = buildTestAppUrl('/cases/case-details/1/trigger/confirm');
      },
      waitForSpinnerToComplete: async () => undefined,
      assertNoEventCreationError: async () => undefined,
      checkForErrorMessage: async () => false,
      getValidationErrorText: async () => '',
      failFastOnCriticalWizardEndpointFailure: () => undefined,
      warn: () => undefined,
    });

    expect(actionSequence).toEqual(['continue', 'submit']);
    expect(currentUrl).toBe(buildTestAppUrl('/cases/case-details/1'));
  });

  test('clickSubmitAndWaitFlow does not mistake the generic cases route for case details success', async () => {
    let currentUrl = buildTestAppUrl('/cases');
    const actionSequence: string[] = [];
    const submitButton = createLocator();
    const continueButton = createLocator();
    const somethingWentWrongHeading = createLocator();
    const page = {
      isClosed: () => false,
      url: () => currentUrl,
      locator: (selector: string) => {
        if (selector === '#next-step') {
          return createLocator({ isVisible: async () => true });
        }
        throw new Error(`Unexpected selector: ${selector}`);
      },
      waitForTimeout: async () => undefined,
      getByRole: () => ({ allInnerTexts: async () => ['Submit'] }),
    };

    await clickSubmitAndWaitFlow({
      page: page as never,
      context: 'generic cases route regression',
      timeoutMs: 5_000,
      maxAutoAdvanceAttempts: 1,
      submitButton: submitButton as never,
      continueButton: continueButton as never,
      somethingWentWrongHeading: somethingWentWrongHeading as never,
      getApiCalls: () => [],
      getVisibleActionButton: async (locator) => (locator === (submitButton as never) ? (submitButton as never) : undefined),
      clickSubmitButtonWithRetry: async () => {
        actionSequence.push('submit');
        currentUrl = buildTestAppUrl('/cases/case-details/DIVORCE/xuiTestJurisdiction/1234567890123456');
      },
      clickContinueAndWait: async () => undefined,
      waitForSpinnerToComplete: async () => undefined,
      assertNoEventCreationError: async () => undefined,
      checkForErrorMessage: async () => false,
      getValidationErrorText: async () => '',
      failFastOnCriticalWizardEndpointFailure: () => undefined,
      warn: () => undefined,
    });

    expect(actionSequence).toEqual(['submit']);
  });

  test('startCreateCaseFlow retries case filter bootstrap failures and succeeds on the next attempt', async () => {
    let currentUrl = buildTestAppUrl('/cases/case-filter');
    let attempt = 0;
    const warnMessages: string[] = [];

    const createCaseButton = createLocator();
    const jurisdictionSelect = createLocator();
    const caseTypeSelect = createLocator();
    const eventTypeSelect = createLocator({
      click: async () => undefined,
    });
    const startButton = createLocator({
      click: async () => {
        currentUrl = buildTestAppUrl('/cases/case-create/DIVORCE/xuiTestCaseType/start');
      },
    });
    const somethingWentWrongHeading = createLocator();

    const page = {
      url: () => currentUrl,
      goto: async (url: string) => {
        currentUrl = buildTestAppUrl(url);
      },
      waitForURL: async () => undefined,
      waitForTimeout: async () => undefined,
      isClosed: () => false,
    };

    await startCreateCaseFlow({
      page: page as never,
      jurisdiction: 'DIVORCE',
      caseType: 'xuiTestCaseType',
      eventType: 'createCase',
      maxAttempts: 2,
      createCaseButton: createCaseButton as never,
      jurisdictionSelect: jurisdictionSelect as never,
      caseTypeSelect: caseTypeSelect as never,
      eventTypeSelect: eventTypeSelect as never,
      startButton: startButton as never,
      somethingWentWrongHeading: somethingWentWrongHeading as never,
      getApiCalls: () =>
        attempt === 1
          ? [
              {
                method: 'GET',
                status: 500,
                url: buildTestAppUrl('/aggregated/caseworkers/123/jurisdictions'),
              },
            ]
          : [],
      waitForSelectReady: async () => undefined,
      selectOptionSmart: async () => {
        if (attempt === 0) {
          attempt += 1;
          throw new Error('jurisdictions not loaded');
        }
      },
      normalizeUnknownError: (error) => (error instanceof Error ? error.message : String(error)),
      warn: (message) => warnMessages.push(message),
      debug: () => undefined,
    });

    expect(warnMessages).toContain('Jurisdiction bootstrap failed; retrying case filter');
    expect(currentUrl).toContain('/cases/case-create/DIVORCE/xuiTestCaseType/start');
  });

  test('startCreateCaseFlow reports bootstrap endpoint failures instead of a generic navigation timeout', async () => {
    let currentUrl = buildTestAppUrl('/cases/case-filter');
    const apiCalls: Array<{ method: string; status: number; url: string }> = [];

    const createCaseButton = createLocator();
    const jurisdictionSelect = createLocator();
    const caseTypeSelect = createLocator();
    const eventTypeSelect = createLocator({
      click: async () => undefined,
    });
    const startButton = createLocator({
      click: async () => {
        apiCalls.push({
          method: 'GET',
          status: 502,
          url: buildTestAppUrl('/data/internal/case-types/ET_EnglandWales/event-triggers/initiateCase'),
        });
      },
    });
    const somethingWentWrongHeading = createLocator();

    const page = {
      url: () => currentUrl,
      goto: async (url: string) => {
        currentUrl = buildTestAppUrl(url);
      },
      waitForTimeout: async () => undefined,
      isClosed: () => false,
    };

    await expect(
      startCreateCaseFlow({
        page: page as never,
        jurisdiction: 'EMPLOYMENT',
        caseType: 'ET_EnglandWales',
        eventType: 'initiateCase',
        maxAttempts: 1,
        createCaseButton: createCaseButton as never,
        jurisdictionSelect: jurisdictionSelect as never,
        caseTypeSelect: caseTypeSelect as never,
        eventTypeSelect: eventTypeSelect as never,
        startButton: startButton as never,
        somethingWentWrongHeading: somethingWentWrongHeading as never,
        getApiCalls: () => apiCalls,
        waitForSelectReady: async () => undefined,
        selectOptionSmart: async () => undefined,
        normalizeUnknownError: (error) => (error instanceof Error ? error.message : String(error)),
        warn: () => undefined,
        debug: () => undefined,
      })
    ).rejects.toThrow(
      `Create case bootstrap failed (attempt 1/1): GET ${buildTestAppUrl('/data/internal/case-types/ET_EnglandWales/event-triggers/initiateCase')} returned HTTP 502`
    );
  });
});

import { expect, test } from '@playwright/test';

import { clickSubmitAndWaitFlow, startCreateCaseFlow } from '../../E2E/page-objects/pages/exui/createCase.flow.js';

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
  test('clickSubmitAndWaitFlow auto-advances, submits, and stops on case details summary', async () => {
    let currentUrl = 'https://manage-case.aat.platform.hmcts.net/cases/case-details/1/trigger/start';
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
        currentUrl = 'https://manage-case.aat.platform.hmcts.net/cases/case-details/1';
        submitVisible = false;
      },
      clickContinueAndWait: async () => {
        actionSequence.push('continue');
        continueVisible = false;
        submitVisible = true;
        currentUrl = 'https://manage-case.aat.platform.hmcts.net/cases/case-details/1/trigger/confirm';
      },
      waitForSpinnerToComplete: async () => undefined,
      assertNoEventCreationError: async () => undefined,
      checkForErrorMessage: async () => false,
      getValidationErrorText: async () => '',
      failFastOnCriticalWizardEndpointFailure: () => undefined,
      warn: () => undefined,
    });

    expect(actionSequence).toEqual(['continue', 'submit']);
    expect(currentUrl).toBe('https://manage-case.aat.platform.hmcts.net/cases/case-details/1');
  });

  test('startCreateCaseFlow retries case filter bootstrap failures and succeeds on the next attempt', async () => {
    let currentUrl = 'https://manage-case.aat.platform.hmcts.net/cases/case-filter';
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
        currentUrl = 'https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/xuiTestCaseType/start';
      },
    });
    const somethingWentWrongHeading = createLocator();

    const page = {
      url: () => currentUrl,
      goto: async (url: string) => {
        currentUrl = `https://manage-case.aat.platform.hmcts.net${url}`;
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
                url: 'https://manage-case.aat.platform.hmcts.net/aggregated/caseworkers/123/jurisdictions',
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
});

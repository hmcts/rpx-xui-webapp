import type { Locator, Page } from '@playwright/test';

import { EXUI_TIMEOUTS } from './exui-timeouts.js';

type VisibleActionButtonResolver = (locator: Locator) => Promise<Locator | undefined>;
type ApiCall = { method: string; status: number; url: string };

const CREATE_CASE_BOOTSTRAP_API_PATTERNS: RegExp[] = [
  /\/aggregated\/caseworkers\/[^/]+\/jurisdictions(?:\/|$)/,
  /\/data\/internal\/case-types\/[^/]+\/event-triggers\/[^/]+(?:\/|$)/,
];

export function findCreateCaseBootstrapFailure(apiCalls: ApiCall[], baselineIndex = 0): ApiCall | undefined {
  const recentCalls = apiCalls.slice(Math.max(0, baselineIndex));
  return recentCalls.find(
    (call) =>
      call.status >= 400 && call.method === 'GET' && CREATE_CASE_BOOTSTRAP_API_PATTERNS.some((pattern) => pattern.test(call.url))
  );
}

function buildCreateCaseBootstrapFailureMessage(context: string, failure: ApiCall): string {
  return `Create case bootstrap failed ${context}: ${failure.method} ${failure.url} returned HTTP ${failure.status}`;
}

export async function clickSubmitAndWaitFlow({
  page,
  context,
  timeoutMs,
  maxAutoAdvanceAttempts,
  submitButton,
  continueButton,
  somethingWentWrongHeading,
  getApiCalls,
  getVisibleActionButton,
  clickSubmitButtonWithRetry,
  clickContinueAndWait,
  waitForSpinnerToComplete,
  assertNoEventCreationError,
  checkForErrorMessage,
  getValidationErrorText,
  failFastOnCriticalWizardEndpointFailure,
  warn,
}: {
  page: Page;
  context: string;
  timeoutMs: number;
  maxAutoAdvanceAttempts: number;
  submitButton: Locator;
  continueButton: Locator;
  somethingWentWrongHeading: Locator;
  getApiCalls: () => Array<{ status: number; url: string; method: string }>;
  getVisibleActionButton: VisibleActionButtonResolver;
  clickSubmitButtonWithRetry: (context: string, submitButton?: Locator) => Promise<void>;
  clickContinueAndWait: (
    context: string,
    options?: { continueButton?: Locator; force?: boolean; timeoutMs?: number }
  ) => Promise<void>;
  waitForSpinnerToComplete: (context: string, timeoutMs?: number) => Promise<void>;
  assertNoEventCreationError: (context: string) => Promise<void>;
  checkForErrorMessage: () => Promise<boolean>;
  getValidationErrorText: () => Promise<string>;
  failFastOnCriticalWizardEndpointFailure: (context: string, baselineIndex?: number) => void;
  warn: (message: string, meta: Record<string, unknown>) => void;
}): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  const apiCallsBaseline = getApiCalls().length;
  let autoAdvanceCount = 0;
  const autoAdvanceTimeoutMs = Math.max(
    EXUI_TIMEOUTS.SUBMIT_AUTO_ADVANCE_MIN,
    Math.min(EXUI_TIMEOUTS.SUBMIT_AUTO_ADVANCE_MAX, Math.floor(timeoutMs / 2))
  );

  while (Date.now() < deadline) {
    if (page.isClosed()) {
      throw new Error(`Page closed while waiting for submit button ${context}`);
    }

    await assertNoEventCreationError(`while waiting for submit ${context}`);
    failFastOnCriticalWizardEndpointFailure(context, apiCallsBaseline);
    const onSomethingWentWrongPage = await somethingWentWrongHeading.isVisible().catch(() => false);
    if (onSomethingWentWrongPage) {
      throw new Error(`Case event failed ${context}: Something went wrong page was displayed.`);
    }

    const onCaseDetailsSummaryPage =
      !page.url().includes('/trigger/') &&
      (await page
        .locator('#next-step')
        .isVisible()
        .catch(() => false));
    if (onCaseDetailsSummaryPage) {
      return;
    }

    const visibleSubmitButton = await getVisibleActionButton(submitButton);
    if (visibleSubmitButton) {
      await clickSubmitButtonWithRetry(context, visibleSubmitButton);
      await waitForSpinnerToComplete(`after submit ${context}`, timeoutMs);
      await assertNoEventCreationError(`after submit ${context}`);
      const submitFailedPage = await somethingWentWrongHeading.isVisible().catch(() => false);
      if (submitFailedPage) {
        throw new Error(`Case event failed after submit ${context}: Something went wrong page was displayed.`);
      }
      const hasValidationError = await checkForErrorMessage();
      if (hasValidationError) {
        const validationText = await getValidationErrorText();
        throw new Error(`Validation error after submit ${context}: ${validationText || 'unknown validation error'}`);
      }
      return;
    }

    const visibleContinueButton = await getVisibleActionButton(continueButton);
    if (visibleContinueButton) {
      const continueEnabled = await visibleContinueButton.isEnabled().catch(() => false);
      if (!continueEnabled) {
        warn('Continue button visible but disabled while waiting for submit; polling for stable action state', {
          context,
          autoAdvanceCount,
        });
        await page.waitForTimeout(EXUI_TIMEOUTS.SUBMIT_POLL_INTERVAL);
        continue;
      }
      const nextAutoAdvanceAttempt = autoAdvanceCount + 1;
      if (nextAutoAdvanceAttempt > maxAutoAdvanceAttempts) {
        throw new Error(`Exceeded ${maxAutoAdvanceAttempts} auto-advance attempts before submit ${context}`);
      }
      autoAdvanceCount = nextAutoAdvanceAttempt;
      await clickContinueAndWait(`auto-advance ${autoAdvanceCount} before submit ${context}`, {
        continueButton: visibleContinueButton,
        timeoutMs: autoAdvanceTimeoutMs,
      });
      continue;
    }

    const spinnerVisible = await page
      .locator('xuilib-loading-spinner')
      .first()
      .isVisible()
      .catch(() => false);
    if (spinnerVisible) {
      await waitForSpinnerToComplete(`while waiting for submit ${context}`, autoAdvanceTimeoutMs).catch(() => {
        // Keep polling in the main loop even when spinner is slow or intermittent.
      });
      await page.waitForTimeout(EXUI_TIMEOUTS.SUBMIT_SPINNER_STABILIZE_WAIT);
      continue;
    }

    await page.waitForTimeout(EXUI_TIMEOUTS.SUBMIT_POLL_INTERVAL);
  }

  const visibleActionButtons = await page
    .getByRole('button')
    .allInnerTexts()
    .then((texts) =>
      texts
        .map((text) => text.trim())
        .filter((text) => text.length > 0)
        .filter((text) => /(continue|submit|save)/i.test(text))
        .slice(0, 10)
    )
    .catch(() => []);

  throw new Error(
    `Submit button did not become available ${context}. URL=${page.url()} autoAdvance=${autoAdvanceCount}/${maxAutoAdvanceAttempts} visibleActionButtons=${visibleActionButtons.join(' | ') || 'none'}`
  );
}

export async function startCreateCaseFlow({
  page,
  jurisdiction,
  caseType,
  eventType,
  maxAttempts,
  createCaseButton,
  jurisdictionSelect,
  caseTypeSelect,
  eventTypeSelect,
  startButton,
  somethingWentWrongHeading,
  getApiCalls,
  waitForSelectReady,
  selectOptionSmart,
  normalizeUnknownError,
  warn,
  debug,
}: {
  page: Page;
  jurisdiction: string;
  caseType: string;
  eventType?: string;
  maxAttempts: number;
  createCaseButton: Locator;
  jurisdictionSelect: Locator;
  caseTypeSelect: Locator;
  eventTypeSelect: Locator;
  startButton: Locator;
  somethingWentWrongHeading: Locator;
  getApiCalls: () => Array<{ method: string; status: number; url: string }>;
  waitForSelectReady: (selector: string, timeoutMs?: number) => Promise<void>;
  selectOptionSmart: (selectLocator: Locator, option: string) => Promise<void>;
  normalizeUnknownError: (error: unknown) => string;
  warn: (message: string, meta: Record<string, unknown>) => void;
  debug: (message: string, meta: Record<string, unknown>) => void;
}): Promise<void> {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const apiCallsBaseline = getApiCalls().length;
    try {
      if (!page.url().includes('/cases/case-filter')) {
        try {
          await createCaseButton.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.CREATE_CASE_BUTTON_VISIBLE });
          await createCaseButton.click();
        } catch (error: unknown) {
          debug('Create case button not visible, navigating to filter page', {
            error: normalizeUnknownError(error),
          });
          await page.goto('/cases/case-filter');
        }
      }
      await jurisdictionSelect.waitFor({ state: 'visible' });
      await waitForSelectReady('#cc-jurisdiction', EXUI_TIMEOUTS.WAIT_FOR_SELECT_READY_EXTENDED).catch((error) => {
        const bootstrapFailure = findCreateCaseBootstrapFailure(getApiCalls(), apiCallsBaseline);
        if (bootstrapFailure) {
          throw new Error(buildCreateCaseBootstrapFailureMessage('(while loading jurisdiction options)', bootstrapFailure));
        }
        throw error;
      });
      await selectOptionSmart(jurisdictionSelect, jurisdiction);

      await caseTypeSelect.waitFor({ state: 'visible' });
      await waitForSelectReady('#cc-case-type', EXUI_TIMEOUTS.WAIT_FOR_SELECT_READY_EXTENDED).catch((error) => {
        const bootstrapFailure = findCreateCaseBootstrapFailure(getApiCalls(), apiCallsBaseline);
        if (bootstrapFailure) {
          throw new Error(buildCreateCaseBootstrapFailureMessage('(while loading case type options)', bootstrapFailure));
        }
        throw error;
      });
      await selectOptionSmart(caseTypeSelect, caseType);

      if (eventType) {
        await eventTypeSelect.click();
        await waitForSelectReady('#cc-event', EXUI_TIMEOUTS.WAIT_FOR_SELECT_READY_EXTENDED).catch((error) => {
          const bootstrapFailure = findCreateCaseBootstrapFailure(getApiCalls(), apiCallsBaseline);
          if (bootstrapFailure) {
            throw new Error(buildCreateCaseBootstrapFailureMessage('(while loading event options)', bootstrapFailure));
          }
          throw error;
        });
        await selectOptionSmart(eventTypeSelect, eventType);
      }

      await startButton.click();
      const navigationDeadline = Date.now() + EXUI_TIMEOUTS.WAIT_FOR_SELECT_READY_EXTENDED;
      while (Date.now() < navigationDeadline) {
        if (!page.url().includes('/cases/case-filter')) {
          return;
        }
        const bootstrapFailure = findCreateCaseBootstrapFailure(getApiCalls(), apiCallsBaseline);
        if (bootstrapFailure) {
          throw new Error(buildCreateCaseBootstrapFailureMessage('(after clicking Start)', bootstrapFailure));
        }
        await page.waitForTimeout(EXUI_TIMEOUTS.SUBMIT_POLL_INTERVAL);
      }
      if (page.url().includes('/cases/case-filter')) {
        throw new Error(
          `Create case start navigation did not leave /cases/case-filter within ${EXUI_TIMEOUTS.WAIT_FOR_SELECT_READY_EXTENDED}ms`
        );
      }
      return;
    } catch (error) {
      const bootstrapFailure = findCreateCaseBootstrapFailure(getApiCalls(), apiCallsBaseline);
      const jurisdictionBootstrapFailed =
        bootstrapFailure?.url.includes('/aggregated/caseworkers/') && bootstrapFailure.url.includes('/jurisdictions');
      const onSomethingWentWrongPage = await somethingWentWrongHeading.isVisible().catch(() => false);

      if (attempt === maxAttempts) {
        if (bootstrapFailure) {
          throw new Error(buildCreateCaseBootstrapFailureMessage(`(attempt ${attempt}/${maxAttempts})`, bootstrapFailure));
        }
        throw error;
      }
      if (bootstrapFailure || jurisdictionBootstrapFailed || onSomethingWentWrongPage) {
        warn('Jurisdiction bootstrap failed; retrying case filter', {
          attempt,
          maxAttempts,
          bootstrapFailureUrl: bootstrapFailure?.url,
          bootstrapFailureStatus: bootstrapFailure?.status,
          jurisdictionBootstrapFailed,
          onSomethingWentWrongPage,
        });
        await page.waitForTimeout(EXUI_TIMEOUTS.CREATE_CASE_RETRY_BACKOFF);
      } else {
        warn('Create case selection failed; retrying case filter', { attempt, maxAttempts });
      }
      if (page.isClosed()) {
        throw error;
      }
      await page.goto('/cases/case-filter');
    }
  }
}

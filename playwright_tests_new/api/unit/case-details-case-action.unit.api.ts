import { expect, test } from '@playwright/test';
import type { Locator } from '@playwright/test';

import { CaseDetailsPage, isCaseEventTriggerResponse } from '../../E2E/page-objects/pages/exui/caseDetails.po.js';

const okEventTrigger = { status: () => 200, url: () => 'https://xui.example/data/internal/cases/1/event-triggers/x' };

test.describe('Case details case action helper', { tag: '@svc-internal' }, () => {
  test('waits for the action spinner before submitting once', async () => {
    let goClicks = 0;
    let optionSelections = 0;
    let spinnerVisible = false;
    let spinnerWaits = 0;
    const spinnerTimeouts: number[] = [];
    let expectedWaits = 0;
    let enabledWaits = 0;

    const spinner = {
      first: () => ({
        isVisible: async () => spinnerVisible,
        waitFor: async ({ state, timeout }: { state: 'hidden' | 'visible'; timeout?: number }) => {
          spinnerWaits += 1;
          if (timeout !== undefined) {
            spinnerTimeouts.push(timeout);
          }
          if (state === 'hidden') {
            spinnerVisible = false;
          }
        },
      }),
    };
    const dropdown = {
      locator: () => ({
        evaluateAll: async () => [{ label: 'Upload Document', value: 'uploadDocument' }],
      }),
      selectOption: async () => {
        optionSelections += 1;
        spinnerVisible = true;
      },
      waitFor: async () => undefined,
    };
    const expectedLocator = {
      waitFor: async () => {
        expectedWaits += 1;
      },
    } as unknown as Locator;
    const caseDetailsPage = Object.assign(Object.create(CaseDetailsPage.prototype), {
      caseActionGoButton: {
        click: async () => {
          if (spinnerVisible) {
            throw new Error('Go clicked while the previous action is still loading');
          }
          goClicks += 1;
        },
        waitFor: async () => undefined,
      },
      caseActionsDropdown: dropdown,
      enabledCaseActionGoButton: {
        waitFor: async () => {
          enabledWaits += 1;
          if (optionSelections === 0) throw new Error('Go enabled wait ran before selection');
        },
      },
      eventCreationErrorHeading: { isVisible: async () => false },
      logger: { warn: () => undefined },
      page: {
        locator: () => spinner,
        waitForLoadState: async () => undefined,
        waitForResponse: async () => okEventTrigger,
      },
    });

    await CaseDetailsPage.prototype.selectCaseAction.call(caseDetailsPage, 'Upload Document', {
      expectedLocator,
      timeoutMs: 50,
    });

    expect(goClicks).toBe(1);
    expect(optionSelections).toBe(1);
    expect(spinnerWaits).toBe(2);
    expect(spinnerTimeouts).toHaveLength(2);
    expect(spinnerTimeouts.every((timeout) => timeout > 0 && timeout <= 50)).toBe(true);
    expect(expectedWaits).toBe(1);
    expect(enabledWaits).toBe(1);
  });

  test('reports redacted Update Case readiness diagnostics without replaying the action', async () => {
    let goClicks = 0;
    let optionSelections = 0;
    const caseDetailsPage = Object.assign(Object.create(CaseDetailsPage.prototype), {
      caseActionGoButton: {
        waitFor: async () => undefined,
        click: async () => {
          goClicks += 1;
        },
      },
      caseActionsDropdown: {
        waitFor: async () => undefined,
        locator: () => ({ evaluateAll: async () => [{ label: 'Update case', value: 'updateCase' }] }),
        selectOption: async () => {
          optionSelections += 1;
        },
      },
      enabledCaseActionGoButton: { waitFor: async () => undefined },
      eventCreationErrorHeading: { isVisible: async () => false },
      logger: { warn: () => undefined },
      page: {
        waitForResponse: async () => okEventTrigger,
        locator: () => ({ first: () => ({ isVisible: async () => false, waitFor: async () => undefined }) }),
        url: () => 'https://xui.example/cases/case-details/1234567890123456?token=secret-value',
        waitForLoadState: async () => undefined,
      },
    });
    const expectedLocator = {
      waitFor: async () => {
        throw new Error('field missing for case ABC1234567 token=secret-value');
      },
    } as unknown as Locator;

    let diagnostic = '';
    try {
      await CaseDetailsPage.prototype.selectCaseAction.call(caseDetailsPage, 'Update case', {
        expectedLocator,
        expectedTarget: 'Update Case person 2 first-name input',
        retry: false,
      });
    } catch (error) {
      diagnostic = error instanceof Error ? error.message : String(error);
    }

    expect(goClicks).toBe(1);
    expect(optionSelections).toBe(1);
    expect(diagnostic).toContain('expected target "Update Case person 2 first-name input"');
    expect(diagnostic).toContain('url=https://xui.example/cases/case-details/:id');
    expect(diagnostic).toContain('spinnerVisible=false');
    expect(diagnostic).toContain('eventErrorVisible=false');
    expect(diagnostic).not.toContain('1234567890123456');
    expect(diagnostic).not.toContain('ABC1234567');
    expect(diagnostic).not.toContain('secret-value');
  });
});

// Exercise the real helper: the upload journey must not switch language until
// its own form is visible, and must never start a second case event on failure.
for (const state of ['missing', 'wrong form', 'delayed upload form'] as const) {
  test(`upload readiness blocks ${state} until the expected form is visible`, { tag: '@svc-internal' }, async () => {
    let goClicks = 0;
    let languageSwitches = 0;
    let waitedForUpload = false;
    let releaseUpload: () => void = () => undefined;
    const uploadVisible = new Promise<void>((resolve) => {
      releaseUpload = resolve;
    });
    const expectedLocator = {
      waitFor: async (options: { state: string }) => {
        expect(options.state).toBe('visible');
        waitedForUpload = true;
        if (state !== 'delayed upload form') throw new Error(`Upload form unavailable: ${state}`);
        await uploadVisible;
      },
    } as unknown as Locator;
    const details = Object.assign(Object.create(CaseDetailsPage.prototype), {
      caseActionGoButton: {
        waitFor: async () => undefined,
        click: async () => {
          goClicks++;
        },
      },
      caseActionsDropdown: {
        waitFor: async () => undefined,
        locator: () => ({ evaluateAll: async () => [{ label: 'Upload Document', value: 'uploadDocument' }] }),
        selectOption: async () => undefined,
      },
      enabledCaseActionGoButton: { waitFor: async () => undefined },
      eventCreationErrorHeading: { isVisible: async () => false },
      logger: { warn: () => undefined },
      page: {
        waitForResponse: async () => okEventTrigger,
        locator: () => ({ first: () => ({ isVisible: async () => false, waitFor: async () => undefined }) }),
        url: () => 'https://xui.example/cases/case-details/1234567890123456',
        waitForLoadState: async () => undefined,
      },
    });
    const journey = CaseDetailsPage.prototype.selectCaseAction
      .call(details, 'Upload Document', {
        expectedLocator,
        retry: false,
      })
      .then(() => {
        languageSwitches++;
      });
    if (state === 'delayed upload form') {
      await expect.poll(() => waitedForUpload).toBe(true);
      expect(languageSwitches).toBe(0);
      releaseUpload();
      await journey;
      expect(languageSwitches).toBe(1);
    } else {
      await expect(journey).rejects.toThrow(`Upload form unavailable: ${state}`);
      expect(languageSwitches).toBe(0);
    }
    expect(goClicks).toBe(1);
  });
}

type EventTriggerState = { status: number } | 'none';

function createEventTriggerHarness(eventTrigger: EventTriggerState) {
  let goClicks = 0;
  let responseWaitStartedBeforeClick = false;
  let releaseResponse: () => void = () => undefined;
  const responseReleased = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });
  const details = Object.assign(Object.create(CaseDetailsPage.prototype), {
    caseActionGoButton: {
      waitFor: async () => undefined,
      click: async () => {
        goClicks++;
        releaseResponse();
      },
    },
    caseActionsDropdown: {
      waitFor: async () => undefined,
      locator: () => ({ evaluateAll: async () => [{ label: 'Upload Document', value: 'uploadDocument' }] }),
      selectOption: async () => undefined,
    },
    enabledCaseActionGoButton: { waitFor: async () => undefined },
    eventCreationErrorHeading: { isVisible: async () => false },
    logger: { warn: () => undefined },
    page: {
      locator: () => ({ first: () => ({ isVisible: async () => false, waitFor: async () => undefined }) }),
      url: () => 'https://xui.example/cases/case-details/1234567890123456',
      waitForLoadState: async () => undefined,
      waitForResponse: async (_predicate: unknown, { timeout }: { timeout: number }) => {
        responseWaitStartedBeforeClick = goClicks === 0;
        expect(timeout).toBeGreaterThan(0);
        await responseReleased;
        if (eventTrigger === 'none') throw new Error('page.waitForResponse: Timeout exceeded');
        return {
          status: () => eventTrigger.status,
          url: () => 'https://xui.example/data/internal/cases/1234567890123456/event-triggers/uploadDocument',
        };
      },
    },
  });
  return { details, goClicks: () => goClicks, startedBeforeClick: () => responseWaitStartedBeforeClick };
}

test.describe('Case details event-trigger response', { tag: '@svc-internal' }, () => {
  for (const status of [403, 500]) {
    test(`fails fast with HTTP ${status} instead of waiting out the destination locator`, async () => {
      const harness = createEventTriggerHarness({ status });
      const neverVisible = { waitFor: () => new Promise<never>(() => undefined) } as unknown as Locator;
      const started = Date.now();
      await expect(
        CaseDetailsPage.prototype.selectCaseAction.call(harness.details, 'Upload Document', {
          expectedLocator: neverVisible,
          retry: false,
          timeoutMs: 10_000,
        })
      ).rejects.toThrow(`Case action "Upload Document" event trigger request failed with HTTP ${status}`);
      expect(Date.now() - started).toBeLessThan(5_000);
      expect(harness.startedBeforeClick()).toBe(true);
      expect(harness.goClicks()).toBe(1);
    });
  }

  test('proves the event started from the trigger response when no destination is supplied', async () => {
    const harness = createEventTriggerHarness({ status: 200 });
    await CaseDetailsPage.prototype.selectCaseAction.call(harness.details, 'Upload Document');
    expect(harness.goClicks()).toBe(1);
  });

  test('fails when no destination is supplied and no trigger response arrives', async () => {
    const harness = createEventTriggerHarness('none');
    await expect(
      CaseDetailsPage.prototype.selectCaseAction.call(harness.details, 'Upload Document', { timeoutMs: 1_000 })
    ).rejects.toThrow('received no event-trigger response before the deadline');
  });

  test('keeps waiting for the destination when no trigger response is observed', async () => {
    const harness = createEventTriggerHarness('none');
    const destination = { waitFor: async () => undefined } as unknown as Locator;
    await CaseDetailsPage.prototype.selectCaseAction.call(harness.details, 'Upload Document', {
      expectedLocator: destination,
    });
    expect(harness.goClicks()).toBe(1);
  });

  test('lets negative journeys opt in to a failed trigger response', async () => {
    const harness = createEventTriggerHarness({ status: 400 });
    await CaseDetailsPage.prototype.selectCaseAction.call(harness.details, 'Upload Document', {
      allowEventTriggerFailure: true,
    });
    expect(harness.goClicks()).toBe(1);
  });

  test('matches only the case event-trigger GET, not validate or create-case triggers', () => {
    const response = (url: string, method = 'GET') => ({ url: () => url, request: () => ({ method: () => method }) });
    const base = 'https://xui.example/data/internal';
    expect(isCaseEventTriggerResponse(response(`${base}/cases/1/event-triggers/upload?ignore-warning=false`) as never)).toBe(
      true
    );
    expect(isCaseEventTriggerResponse(response(`${base}/cases/1/event-triggers/upload/validate`) as never)).toBe(false);
    expect(isCaseEventTriggerResponse(response(`${base}/case-types/T/event-triggers/createCase`) as never)).toBe(false);
    expect(isCaseEventTriggerResponse(response(`${base}/cases/1/event-triggers/upload`, 'POST') as never)).toBe(false);
  });
});

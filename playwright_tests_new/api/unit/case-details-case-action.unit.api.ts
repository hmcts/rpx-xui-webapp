import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { expect, test } from '@playwright/test';
import type { Locator } from '@playwright/test';

import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po.js';

test.describe('Case details case action helper', { tag: '@svc-internal' }, () => {
  test('waits for a visible action spinner before submitting or retrying it', async () => {
    let goClicks = 0;
    let goClickAttempts = 0;
    let optionSelections = 0;
    let spinnerVisible = false;
    let spinnerWaits = 0;
    const spinnerTimeouts: number[] = [];
    let expectedWaits = 0;

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
        if (expectedWaits === 1) {
          spinnerVisible = true;
          throw new Error('action page is still loading');
        }
      },
    } as unknown as Locator;
    const caseDetailsPage = Object.assign(Object.create(CaseDetailsPage.prototype), {
      caseActionGoButton: {
        click: async () => {
          goClickAttempts += 1;
          if (goClickAttempts === 1) {
            spinnerVisible = true;
            throw new Error('loading spinner intercepted the click');
          }
          if (spinnerVisible) {
            throw new Error('Go clicked while the previous action is still loading');
          }
          goClicks += 1;
        },
        waitFor: async () => undefined,
      },
      caseActionsDropdown: dropdown,
      eventCreationErrorHeading: { isVisible: async () => false },
      logger: { warn: () => undefined },
      page: {
        locator: () => spinner,
        waitForLoadState: async () => undefined,
      },
    });

    await CaseDetailsPage.prototype.selectCaseAction.call(caseDetailsPage, 'Upload Document', {
      expectedLocator,
      timeoutMs: 50,
    });

    expect(goClicks).toBe(1);
    expect(optionSelections).toBe(1);
    expect(spinnerWaits).toBe(4);
    expect(spinnerTimeouts).toEqual([50, 50, 50, 50]);
    expect(expectedWaits).toBe(2);
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
      eventCreationErrorHeading: { isVisible: async () => false },
      logger: { warn: () => undefined },
      page: {
        locator: () => ({ first: () => ({ waitFor: async () => undefined }) }),
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

// Pair the helper behaviour checks with the actual V2 caller: changing the
// journey back to its unguarded call must fail this focused regression suite.
test('document upload V2 binds its own form readiness before changing language', { tag: '@svc-internal' }, () => {
  const source = readFileSync(resolve('playwright_tests_new/E2E/test/documentUpload/documentUpload.positive.spec.ts'), 'utf8');
  const call = source.match(/await caseDetailsPage\.selectCaseAction\(TEST_DATA\.V2\.ACTION([\s\S]*?)\);/);
  expect(call, 'V2 must await its case action').not.toBeNull();
  expect(call![1]).toMatch(/expectedLocator:\s*createCasePage\.fileUploadInput\b/);
  expect(call![1]).toMatch(/retry:\s*false\b/);
  expect(source.indexOf(call![0])).toBeLessThan(source.indexOf('switchLanguage(scenario.language'));
});

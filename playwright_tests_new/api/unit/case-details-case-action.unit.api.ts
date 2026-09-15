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

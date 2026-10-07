import { expect, test } from '@playwright/test';

import { SearchCasePage } from '../../E2E/page-objects/pages/exui/searchCase.po.js';

function visibleLocator() {
  return {
    async click() {
      return undefined;
    },
    async fill() {
      return undefined;
    },
    async isVisible() {
      return true;
    },
    async scrollIntoViewIfNeeded() {
      return undefined;
    },
    async waitFor() {
      return undefined;
    },
  };
}

test.describe('Search case action helper unit tests', { tag: '@svc-internal' }, () => {
  test('searchWith16DigitCaseId does not resubmit when no immediate outcome is observed', async () => {
    let pressCount = 0;
    const warnings: Array<{ message: string; meta: Record<string, unknown> }> = [];
    const caseIdTextBox = {
      ...visibleLocator(),
      async press() {
        pressCount += 1;
      },
    };

    await SearchCasePage.prototype.searchWith16DigitCaseId.call(
      {
        caseIdTextBox,
        logger: {
          warn: (message: string, meta: Record<string, unknown>) => warnings.push({ message, meta }),
        },
        page: {
          url: () => 'https://manage-case.aat.platform.hmcts.net/cases',
        },
        searchCaseFindButton: visibleLocator(),
        searchCaseFindButtonFallback: visibleLocator(),
        waitForImmediateSearchOutcome: async () => false,
        waitForPostSearchSpinnerCycle: async () => undefined,
      },
      '1111222233334444'
    );

    expect(pressCount).toBe(0);
    expect(warnings).toEqual([
      {
        message: 'Header quick-search produced no immediate outcome after submit',
        meta: {
          caseId: '1111222233334444',
          currentUrl: 'https://manage-case.aat.platform.hmcts.net/cases',
        },
      },
    ]);
  });
});

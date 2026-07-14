import { expect, test, type Locator } from '@playwright/test';

import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po.js';

test.describe('Case action selection', { tag: '@svc-internal' }, () => {
  test('waits for the loading spinner before submitting the selected action', async () => {
    let clickCount = 0;
    const actionSequence: string[] = [];
    const expectedLocator = {
      toString: () => 'getByLabel(First name)',
      waitFor: async () => {
        actionSequence.push('wait-for-expected');
      },
    };
    const pageObject = {
      caseActionGoButton: {
        waitFor: async () => undefined,
        click: async () => {
          actionSequence.push('click-go');
          clickCount += 1;
        },
      },
      caseActionsDropdown: {
        waitFor: async () => undefined,
        locator: () => ({
          evaluateAll: async () => [{ label: 'Update case', value: 'updateCase' }],
        }),
        selectOption: async () => {
          actionSequence.push('select-option');
        },
      },
      eventCreationErrorHeading: {
        isVisible: async () => false,
      },
      logger: {
        warn: () => undefined,
      },
      page: {
        waitForLoadState: async () => undefined,
      },
      waitForSpinnerToComplete: async (context: string) => {
        actionSequence.push(context);
      },
    } as unknown as CaseDetailsPage;

    const attempt = CaseDetailsPage.prototype.selectCaseAction.call(pageObject, 'Update case', {
      expectedLocator: expectedLocator as unknown as Locator,
      retry: false,
    });

    await expect(attempt).resolves.toBeUndefined();

    expect(clickCount).toBe(1);
    expect(actionSequence).toEqual([
      'before selecting case action "Update case"',
      'select-option',
      'before submitting case action "Update case"',
      'click-go',
      'after selecting case action',
      'wait-for-expected',
    ]);
  });
});

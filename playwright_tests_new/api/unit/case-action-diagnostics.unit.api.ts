import { expect, test, type Locator } from '@playwright/test';

import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po.js';

test.describe('Case action diagnostics', { tag: '@svc-internal' }, () => {
  test('does not retry and reports live page state when the expected target is missing', async () => {
    const caseReference = '1781862986135651';
    let clickCount = 0;
    const actionSequence: string[] = [];
    const expectedLocator = {
      toString: () => 'getByLabel(First name)',
      waitFor: async () => {
        actionSequence.push('wait-for-expected');
        throw new Error(
          `Target did not become visible at https://xui.example/cases/${caseReference}?access_token=secret&signature=signed-value`
        );
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
        locator: () => ({
          first: () => ({ isVisible: async () => true }),
        }),
        url: () =>
          `https://xui.example/cases/case-details/DIVORCE/xuiTestCaseType/${caseReference}/trigger/updateCase?token=secret`,
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

    const failure = await attempt.catch((error: Error & { cause?: Error }) => error);
    expect(failure).toBeInstanceOf(Error);
    expect(failure.message).toMatch(
      /action="Update case".*\[redacted-case-reference\].*spinnerVisible=true.*eventErrorVisible=false.*expectedTarget="getByLabel\(First name\)".*cause="Target did not become visible at https:\/\/xui.example\/cases\/\[redacted-case-reference\]"/
    );

    expect(clickCount).toBe(1);
    expect(actionSequence).toEqual([
      'before selecting case action "Update case"',
      'select-option',
      'before submitting case action "Update case"',
      'click-go',
      'after selecting case action',
      'wait-for-expected',
    ]);
    expect(failure.cause).toBeInstanceOf(Error);
    expect(`${failure.message}\n${failure.cause?.message}`).not.toMatch(
      /1781862986135651|token=secret|access_token|signed-value/
    );
  });
});

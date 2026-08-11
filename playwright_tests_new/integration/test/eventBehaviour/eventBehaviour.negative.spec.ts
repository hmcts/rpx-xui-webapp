import { expect, test } from '../../../E2E/fixtures';
import { openEventBehaviourJourney } from '../../helpers';
import {
  EVENT_BEHAVIOUR_CASE_REFERENCE,
  EVENT_BEHAVIOUR_CASE_TYPE,
  EVENT_BEHAVIOUR_JURISDICTION,
  EVENT_BEHAVIOUR_TRIGGER_NAME,
} from '../../mocks/eventBehaviour.mock';

test.describe('Event behaviour integration failures', { tag: ['@integration', '@integration-event-behaviour'] }, () => {
  test('does not offer an unavailable event action', async ({ caseDetailsPage, page }) => {
    await openEventBehaviourJourney(page, caseDetailsPage, { eventAvailable: false });

    const actionLabels = await caseDetailsPage.caseActionsDropdown.locator('option').allTextContents();
    expect(actionLabels).not.toContain(EVENT_BEHAVIOUR_TRIGGER_NAME);
  });

  test('blocks a conditional mandatory field and preserves the wizard values', async ({ caseDetailsPage, page }) => {
    await openEventBehaviourJourney(page, caseDetailsPage);
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: page.getByLabel('Outcome type'),
    });

    await page.getByLabel('Outcome type').selectOption({ label: 'Needs more information' });
    await caseDetailsPage.continueCaseEvent();

    await expect(caseDetailsPage.generalProblemHeading).toBeVisible();
    await expect(page.getByText('Outcome note is required').first()).toBeVisible();
    await expect(page.getByLabel('Outcome type')).toHaveValue(/needsMoreInfo$/);
    await expect(page.getByLabel('Outcome note')).toBeVisible();

    await page.getByLabel('Outcome note').fill('Please provide the missing evidence');
    await caseDetailsPage.continueCaseEvent();
    await expect(page.getByLabel('Decision reference')).toBeVisible();
  });

  test('blocks an invalid configured field before check-your-answers', async ({ caseDetailsPage, page }) => {
    await openEventBehaviourJourney(page, caseDetailsPage);
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: page.getByLabel('Outcome type'),
    });
    await caseDetailsPage.continueCaseEvent();

    await page.getByLabel('Decision reference').fill('invalid');
    await caseDetailsPage.continueCaseEvent();

    await expect(caseDetailsPage.generalProblemHeading).toBeVisible();
    await expect(page.getByText(/Decision reference/i).first()).toBeVisible();
    await expect(page.getByLabel('Decision reference')).toHaveValue('invalid');
    await expect(caseDetailsPage.checkYourAnswersHeading).toBeHidden();
  });

  for (const [status, message] of [
    [500, 'event-submit-failed'],
    [403, 'event-submit-forbidden'],
    [400, 'event-submit-invalid'],
  ] as const) {
    test(`stays on check-your-answers when event creation returns ${status}`, async ({ caseDetailsPage, page }) => {
      await openEventBehaviourJourney(page, caseDetailsPage, { submit: { status, body: { message } } });
      await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
        expectedLocator: page.getByLabel('Outcome type'),
      });
      await caseDetailsPage.continueCaseEvent();
      await page.getByLabel('Decision reference').fill('EVT-123');
      await caseDetailsPage.continueCaseEvent();
      await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();

      const failedResponse = page.waitForResponse(
        (response) => response.url().includes('/events') && response.request().method() === 'POST' && response.status() === status
      );
      await caseDetailsPage.submitCaseEvent();
      await failedResponse;

      await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
      await expect(caseDetailsPage.eventCreationErrorHeading).toBeVisible();
      if (status !== 403) {
        await expect(page.getByText(message)).toBeVisible();
      }
    });
  }

  test('stays on check-your-answers when event creation times out', async ({ caseDetailsPage, page }) => {
    await openEventBehaviourJourney(page, caseDetailsPage, { submit: { abortErrorCode: 'timedout' } });
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: page.getByLabel('Outcome type'),
    });
    await caseDetailsPage.continueCaseEvent();
    await page.getByLabel('Decision reference').fill('EVT-123');
    await caseDetailsPage.continueCaseEvent();
    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();

    const submitRequest = page.waitForRequest((request) => request.url().includes('/events') && request.method() === 'POST');
    await caseDetailsPage.submitCaseEvent();
    await submitRequest;

    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
    await expect(caseDetailsPage.eventCreationErrorHeading).toBeVisible();

    const refreshedCaseDetails = page.waitForResponse(
      (response) =>
        response.url().includes(`/data/internal/cases/${EVENT_BEHAVIOUR_CASE_REFERENCE}`) &&
        response.request().method() === 'GET' &&
        response.status() === 200
    );
    await page.goto(
      `/cases/case-details/${EVENT_BEHAVIOUR_JURISDICTION}/${EVENT_BEHAVIOUR_CASE_TYPE}/${EVENT_BEHAVIOUR_CASE_REFERENCE}`
    );
    await caseDetailsPage.waitForCaseDetailsReady();
    const refreshedResponse = await refreshedCaseDetails;
    const refreshedBody = (await refreshedResponse.json()) as {
      events?: Array<{ event_name?: string; state_name?: string }>;
    };
    expect(refreshedBody.events).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ event_name: EVENT_BEHAVIOUR_TRIGGER_NAME, state_name: 'Outcome recorded' }),
      ])
    );
  });
});

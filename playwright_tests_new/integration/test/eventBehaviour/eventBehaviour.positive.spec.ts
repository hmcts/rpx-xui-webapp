import { expect, test } from '../../../E2E/fixtures';
import { openEventBehaviourJourney } from '../../helpers';
import {
  EVENT_BEHAVIOUR_CASE_REFERENCE,
  EVENT_BEHAVIOUR_EVENT_TOKEN,
  EVENT_BEHAVIOUR_TRIGGER_ID,
  EVENT_BEHAVIOUR_TRIGGER_NAME,
} from '../../mocks/eventBehaviour.mock';

test.describe('Event behaviour integration', { tag: ['@integration', '@integration-event-behaviour'] }, () => {
  test('renders a configured multi-page event and submits the exact event payload', async ({ caseDetailsPage, page }) => {
    await openEventBehaviourJourney(page, caseDetailsPage);

    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: page.getByLabel('Outcome type'),
    });

    await expect(page.getByLabel('Outcome type')).toHaveValue(/approved$/);
    await expect(page.getByText('Select the outcome for this case')).toBeVisible();
    await expect(page.getByLabel('Outcome note')).toBeHidden();
    await expect(page.getByLabel('Decision reference')).toBeHidden();

    await caseDetailsPage.continueCaseEvent();
    await expect(page.getByLabel('Decision reference')).toBeVisible();
    await expect(page.getByLabel('Internal note')).toBeVisible();
    await expect(page.getByLabel('Internal note')).toHaveValue('retained internal note');

    await page.getByLabel('Decision reference').fill('EVT-123');
    await caseDetailsPage.continueCaseEvent();
    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();

    const answers = await caseDetailsPage.trRowsToObjectInPage(page.getByRole('table').first());
    expect(answers).toMatchObject({
      'Outcome type': 'Approved',
      'Decision reference': 'EVT-123',
      'Internal note': 'retained internal note',
    });

    const submitRequest = page.waitForRequest(
      (request) => request.url().includes(`/data/cases/${EVENT_BEHAVIOUR_CASE_REFERENCE}/events`) && request.method() === 'POST'
    );
    const submitResponse = page.waitForResponse(
      (response) =>
        response.url().includes(`/data/cases/${EVENT_BEHAVIOUR_CASE_REFERENCE}/events`) && response.request().method() === 'POST'
    );
    const refreshedCaseDetails = page.waitForResponse(
      (response) =>
        response.url().includes(`/data/internal/cases/${EVENT_BEHAVIOUR_CASE_REFERENCE}`) &&
        response.request().method() === 'GET' &&
        response.status() === 200
    );

    await caseDetailsPage.submitCaseEvent();

    const request = await submitRequest;
    const response = await submitResponse;
    const refreshedResponse = await refreshedCaseDetails;
    const payload = request.postDataJSON() as Record<string, unknown>;
    expect(payload).toEqual({
      event: { id: EVENT_BEHAVIOUR_TRIGGER_ID, description: '', summary: '' },
      event_token: EVENT_BEHAVIOUR_EVENT_TOKEN,
      ignore_warning: false,
      data: {
        OutcomeType: 'approved',
        DecisionReference: 'EVT-123',
        InternalNote: 'retained internal note',
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = (await response.json()) as { state?: { id?: string; name?: string } };
    expect(responseBody.state).toEqual({ id: 'outcomeRecorded', name: 'Outcome recorded' });
    const refreshedBody = (await refreshedResponse.json()) as {
      state?: { id?: string; name?: string };
      events?: Array<{ event_name?: string; state_name?: string }>;
    };
    expect(refreshedBody.state).toEqual({ id: 'outcomeRecorded', name: 'Outcome recorded' });
    expect(refreshedBody.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ event_name: EVENT_BEHAVIOUR_TRIGGER_NAME, state_name: 'Outcome recorded' }),
      ])
    );

    await expect(page).toHaveURL(new RegExp(`/cases/case-details/.*/.*/${EVENT_BEHAVIOUR_CASE_REFERENCE}(?:$|#)`));
    await expect(page.getByText(/has been updated with event: Record outcome/)).toBeVisible();
    await caseDetailsPage.selectCaseDetailsTab('Activity and history');
    const eventRow = caseDetailsPage.historyTable.getByRole('row', { name: new RegExp(EVENT_BEHAVIOUR_TRIGGER_NAME) });
    await expect(eventRow).toBeVisible();
    await eventRow.click();
    const eventDetails = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.historyDetailsTable);
    expect(eventDetails).toMatchObject({
      'End state': 'Outcome recorded',
      Event: EVENT_BEHAVIOUR_TRIGGER_NAME,
      Summary: 'Record outcome',
      Comment: 'Outcome recorded',
    });
  });

  test('shows conditional fields on the configured wizard page', async ({ caseDetailsPage, page }) => {
    await openEventBehaviourJourney(page, caseDetailsPage);
    await caseDetailsPage.selectCaseAction(EVENT_BEHAVIOUR_TRIGGER_NAME, {
      expectedLocator: page.getByLabel('Outcome type'),
    });

    await page.getByLabel('Outcome type').selectOption({ label: 'Needs more information' });
    await expect(page.getByLabel('Outcome note')).toBeVisible();
    await page.getByLabel('Outcome note').fill('Please provide the missing evidence');
    await caseDetailsPage.continueCaseEvent();

    await expect(page.getByLabel('Decision reference')).toBeVisible();
    await expect(page.getByLabel('Internal note')).toBeHidden();
    await expect(page.getByText('Use the format EVT-123')).toBeVisible();
  });
});

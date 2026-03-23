import { expect, test } from '../../../E2E/fixtures';
import {
  CASE_LINKING_CASE_REFERENCE,
  CASE_LINKING_REASON_CODE,
  CASE_LINKING_REASON_LABEL,
  CASE_LINKING_RELATED_CASE_REFERENCE,
} from '../../mocks/caseLinking.mock';
import { openCaseLinkingJourney } from '../../helpers';

const caseLinkingRoles = ['hmcts-staff'];

test.describe('Case linking integration', { tag: ['@integration', '@integration-case-linking'] }, () => {
  test('links a case from case details and persists the selected reason', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
      userRoles: caseLinkingRoles,
    });

    await test.step('Open the Link cases event from the case-actions dropdown', async () => {
      await caseDetailsPage.caseActionsDropdown.selectOption({ label: 'Link cases' });
      await caseDetailsPage.caseActionGoButton.click();
      await expect(page.getByLabel('Linked case reference')).toBeVisible();
      await expect(page.getByLabel('Reason for link')).toBeVisible();
    });

    await test.step('Enter the linked case details and continue to check-your-answers', async () => {
      await page.getByLabel('Linked case reference').fill(CASE_LINKING_RELATED_CASE_REFERENCE);
      await page.getByLabel('Reason for link').selectOption(CASE_LINKING_REASON_CODE);
      await page.getByRole('button', { name: /^continue$/i }).click();

      await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();
      const answers = await caseDetailsPage.trRowsToObjectInPage(page.getByRole('table').first());
      expect(answers).toMatchObject({
        'Linked case reference': CASE_LINKING_RELATED_CASE_REFERENCE,
        'Reason for link': CASE_LINKING_REASON_LABEL,
      });
    });

    await test.step('Submit the link-cases event and assert the CCD request payload', async () => {
      const submitRequest = page.waitForRequest(
        (request) => request.url().includes(`/data/cases/${CASE_LINKING_CASE_REFERENCE}/events`) && request.method() === 'POST'
      );

      await page.getByRole('button', { name: /^submit$/i }).click();

      const request = await submitRequest;
      const payload = request.postDataJSON();
      expect(payload.event).toMatchObject({ id: 'linkCases' });
      expect(payload.data).toMatchObject({
        LinkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
        CaseLinkReasonCode: CASE_LINKING_REASON_CODE,
      });
      expect(payload.event_token).toBeTruthy();
    });

    await test.step('Return to case details and show the linked case in the Linked cases tab', async () => {
      await expect(page).toHaveURL(new RegExp(`/cases/case-details/.*/.*/${CASE_LINKING_CASE_REFERENCE}(?:$|#)`));
      await caseDetailsPage.selectCaseDetailsTab('Linked cases');
      await expect(page.getByText(CASE_LINKING_RELATED_CASE_REFERENCE, { exact: true })).toBeVisible();
    });
  });
});

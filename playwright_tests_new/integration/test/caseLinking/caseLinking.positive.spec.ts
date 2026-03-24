import { expect, test } from '../../../E2E/fixtures';
import {
  CASE_LINKING_CASE_REFERENCE,
  CASE_LINKING_OTHER_DESCRIPTION,
  CASE_LINKING_OTHER_REASON_CODE,
  CASE_LINKING_OTHER_REASON_LABEL,
  CASE_LINKING_REASON_CODE,
  CASE_LINKING_REASON_LABEL,
  CASE_LINKING_RELATED_CASE_REFERENCE,
  CASE_LINKING_SECOND_RELATED_CASE_REFERENCE,
  CASE_LINKING_SECONDARY_REASON_CODE,
} from '../../mocks/caseLinking.mock';
import { openCaseLinkingJourney } from '../../helpers';

const linkCaseAccessScenarios = [
  { label: 'hmcts-staff', userRoles: ['hmcts-staff'] },
  { label: 'hmcts-judiciary', userRoles: ['hmcts-judiciary'] },
] as const;

function formatCaseReference(caseReference: string): string {
  return caseReference.replace(/(\d{4})(?=\d)/g, '$1-');
}

test.describe('Case linking integration', { tag: ['@integration', '@integration-case-linking'] }, () => {
  linkCaseAccessScenarios.forEach(({ label, userRoles }) => {
    test(`links a case from case details and submits the selected reason as ${label}`, async ({ page, caseDetailsPage }) => {
      await openCaseLinkingJourney(page, caseDetailsPage, {
        userRoles: [...userRoles],
      });

      await test.step('Open the Link cases event from the case-actions dropdown', async () => {
        await caseDetailsPage.caseActionsDropdown.selectOption({ label: 'Link cases' });
        await caseDetailsPage.caseActionGoButton.click();
        await expect(page.getByLabel('Linked case reference')).toBeVisible();
        await expect(page.getByLabel('Reason for link')).toBeVisible();
      });

      await test.step('Enter the linked case details and continue to check-your-answers', async () => {
        await page.getByLabel('Linked case reference').fill(CASE_LINKING_RELATED_CASE_REFERENCE);
        await page.getByLabel('Reason for link').selectOption({ label: CASE_LINKING_REASON_LABEL });
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
        const linkedCasesPanel = page.locator('[role="tabpanel"]:visible').first();
        await expect(
          linkedCasesPanel.getByRole('link', { name: formatCaseReference(CASE_LINKING_RELATED_CASE_REFERENCE) })
        ).toBeVisible();
      });
    });
  });

  test('shows linked cases in their supplied order on the Linked cases tab', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
      userRoles: ['hmcts-staff'],
      initialLinkedCases: [
        {
          linkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
          reasonCode: CASE_LINKING_REASON_CODE,
        },
        {
          linkedCaseReference: CASE_LINKING_SECOND_RELATED_CASE_REFERENCE,
          reasonCode: CASE_LINKING_SECONDARY_REASON_CODE,
        },
      ],
    });

    await caseDetailsPage.selectCaseDetailsTab('Linked cases');
    const linkedCasesPanel = page.locator('[role="tabpanel"]:visible').first();
    const linkedCaseReferences = await linkedCasesPanel.getByRole('link').allInnerTexts();

    expect(linkedCaseReferences.slice(0, 2)).toEqual([
      formatCaseReference(CASE_LINKING_RELATED_CASE_REFERENCE),
      formatCaseReference(CASE_LINKING_SECOND_RELATED_CASE_REFERENCE),
    ]);
  });

  test('submits the Other case-link reason with a custom description', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
      userRoles: ['hmcts-staff'],
    });

    await caseDetailsPage.caseActionsDropdown.selectOption({ label: 'Link cases' });
    await caseDetailsPage.caseActionGoButton.click();

    await page.getByLabel('Linked case reference').fill(CASE_LINKING_RELATED_CASE_REFERENCE);
    await page.getByLabel('Reason for link').selectOption({ label: CASE_LINKING_OTHER_REASON_LABEL });
    await expect(page.getByLabel('Other description')).toBeVisible();
    await page.getByLabel('Other description').fill(CASE_LINKING_OTHER_DESCRIPTION);
    await page.getByRole('button', { name: /^continue$/i }).click();

    await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();
    const answers = await caseDetailsPage.trRowsToObjectInPage(page.getByRole('table').first());
    expect(answers).toMatchObject({
      'Linked case reference': CASE_LINKING_RELATED_CASE_REFERENCE,
      'Reason for link': CASE_LINKING_OTHER_REASON_LABEL,
      'Other description': CASE_LINKING_OTHER_DESCRIPTION,
    });

    const submitRequest = page.waitForRequest(
      (request) => request.url().includes(`/data/cases/${CASE_LINKING_CASE_REFERENCE}/events`) && request.method() === 'POST'
    );
    await page.getByRole('button', { name: /^submit$/i }).click();

    const request = await submitRequest;
    const payload = request.postDataJSON();
    expect(payload.event).toMatchObject({ id: 'linkCases' });
    expect(payload.data).toMatchObject({
      LinkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
      CaseLinkReasonCode: CASE_LINKING_OTHER_REASON_CODE,
      OtherDescription: CASE_LINKING_OTHER_DESCRIPTION,
    });

    await expect(page).toHaveURL(new RegExp(`/cases/case-details/.*/.*/${CASE_LINKING_CASE_REFERENCE}(?:$|#)`));
    await caseDetailsPage.selectCaseDetailsTab('Linked cases');
    const linkedCasesPanel = page.locator('[role="tabpanel"]:visible').first();
    await expect(
      linkedCasesPanel.getByRole('link', { name: formatCaseReference(CASE_LINKING_RELATED_CASE_REFERENCE) })
    ).toBeVisible();
  });
});

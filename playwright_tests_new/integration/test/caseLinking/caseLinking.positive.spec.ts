import { expect, test } from '../../../E2E/fixtures';
import { openCaseLinkingJourney } from '../../helpers';
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
  formatCaseReferenceForDisplay,
} from '../../mocks/caseLinking.mock';

test.describe('Case linking integration', { tag: ['@integration', '@integration-case-linking'] }, () => {
  test('links a case from case details and submits the selected reason', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage);

    await test.step('Open the Link cases event from the case-actions dropdown', async () => {
      await caseDetailsPage.openLinkCasesEvent();
      await expect(caseDetailsPage.linkedCaseReferenceInput).toBeVisible();
      await expect(caseDetailsPage.caseLinkReasonSelect).toBeVisible();
    });

    await test.step('Enter the linked case details and continue to check-your-answers', async () => {
      await caseDetailsPage.fillCaseLinkDetails({
        linkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
        reasonLabel: CASE_LINKING_REASON_LABEL,
      });
      await caseDetailsPage.continueCaseEvent();

      await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
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
      const submitResponse = page.waitForResponse(
        (response) =>
          response.url().includes(`/data/cases/${CASE_LINKING_CASE_REFERENCE}/events`) && response.request().method() === 'POST'
      );

      await caseDetailsPage.submitCaseEvent();

      const request = await submitRequest;
      const response = await submitResponse;
      const payload = request.postDataJSON();
      const responseBody = JSON.stringify(await response.json());
      expect(payload.event).toMatchObject({ id: 'linkCases' });
      expect(payload.data).toMatchObject({
        LinkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
        CaseLinkReasonCode: CASE_LINKING_REASON_CODE,
      });
      expect(payload.event_token).toBeTruthy();
      expect(responseBody).toContain(CASE_LINKING_RELATED_CASE_REFERENCE);
      expect(responseBody).toContain(`"reasonCode":"${CASE_LINKING_REASON_CODE}"`);
      expect(responseBody).toContain('"OtherDescription":""');
    });

    await test.step('Return to case details and show the linked case in the Linked cases tab', async () => {
      await expect(page).toHaveURL(new RegExp(`/cases/case-details/.*/.*/${CASE_LINKING_CASE_REFERENCE}(?:$|#)`));
      await caseDetailsPage.selectCaseDetailsTab('Linked cases');
      const linkedCasesPanel = page.locator('[role="tabpanel"]:visible').first();
      const linkedCaseLink = linkedCasesPanel
        .getByRole('link', { name: formatCaseReferenceForDisplay(CASE_LINKING_RELATED_CASE_REFERENCE) })
        .first();
      await expect(linkedCaseLink).toBeVisible();
      await expect(linkedCaseLink).toHaveAttribute('href', new RegExp(`/v2/case/${CASE_LINKING_RELATED_CASE_REFERENCE}$`));
    });
  });

  test('allows a judiciary user to open the Link cases event from case details', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
      userIdentifier: 'IAC_Judge_WA_R1',
      userRoles: ['hmcts-judiciary'],
    });

    await caseDetailsPage.openLinkCasesEvent();
    await expect(caseDetailsPage.linkedCaseReferenceInput).toBeVisible();
    await expect(caseDetailsPage.caseLinkReasonSelect).toBeVisible();
  });

  test('shows linked cases in their supplied order on the Linked cases tab', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
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
    const firstLinkedCaseLink = linkedCasesPanel
      .getByRole('link', { name: formatCaseReferenceForDisplay(CASE_LINKING_RELATED_CASE_REFERENCE) })
      .first();
    const secondLinkedCaseLink = linkedCasesPanel
      .getByRole('link', { name: formatCaseReferenceForDisplay(CASE_LINKING_SECOND_RELATED_CASE_REFERENCE) })
      .first();
    const linkedCaseReferences = await linkedCasesPanel.getByRole('link').allInnerTexts();

    expect(linkedCaseReferences.slice(0, 2)).toEqual([
      formatCaseReferenceForDisplay(CASE_LINKING_RELATED_CASE_REFERENCE),
      formatCaseReferenceForDisplay(CASE_LINKING_SECOND_RELATED_CASE_REFERENCE),
    ]);
    await expect(firstLinkedCaseLink).toHaveAttribute('href', new RegExp(`/v2/case/${CASE_LINKING_RELATED_CASE_REFERENCE}$`));
    await expect(secondLinkedCaseLink).toHaveAttribute(
      'href',
      new RegExp(`/v2/case/${CASE_LINKING_SECOND_RELATED_CASE_REFERENCE}$`)
    );
  });

  test('submits the Other case-link reason with a custom description', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage);

    await caseDetailsPage.openLinkCasesEvent();
    await caseDetailsPage.fillCaseLinkDetails({
      linkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
      reasonLabel: CASE_LINKING_OTHER_REASON_LABEL,
      otherDescription: CASE_LINKING_OTHER_DESCRIPTION,
    });
    await expect(caseDetailsPage.caseLinkOtherDescriptionInput).toBeVisible();
    await caseDetailsPage.continueCaseEvent();

    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
    const answers = await caseDetailsPage.trRowsToObjectInPage(page.getByRole('table').first());
    expect(answers).toMatchObject({
      'Linked case reference': CASE_LINKING_RELATED_CASE_REFERENCE,
      'Reason for link': CASE_LINKING_OTHER_REASON_LABEL,
      'Other description': CASE_LINKING_OTHER_DESCRIPTION,
    });

    const submitRequest = page.waitForRequest(
      (request) => request.url().includes(`/data/cases/${CASE_LINKING_CASE_REFERENCE}/events`) && request.method() === 'POST'
    );
    const submitResponse = page.waitForResponse(
      (response) =>
        response.url().includes(`/data/cases/${CASE_LINKING_CASE_REFERENCE}/events`) && response.request().method() === 'POST'
    );
    await caseDetailsPage.submitCaseEvent();

    const request = await submitRequest;
    const response = await submitResponse;
    const payload = request.postDataJSON();
    const responseBody = JSON.stringify(await response.json());
    expect(payload.event).toMatchObject({ id: 'linkCases' });
    expect(payload.data).toMatchObject({
      LinkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
      CaseLinkReasonCode: CASE_LINKING_OTHER_REASON_CODE,
      OtherDescription: CASE_LINKING_OTHER_DESCRIPTION,
    });
    expect(responseBody).toContain(CASE_LINKING_RELATED_CASE_REFERENCE);
    expect(responseBody).toContain(`"reasonCode":"${CASE_LINKING_OTHER_REASON_CODE}"`);
    expect(responseBody).toContain(`"OtherDescription":"${CASE_LINKING_OTHER_DESCRIPTION}"`);

    await expect(page).toHaveURL(new RegExp(`/cases/case-details/.*/.*/${CASE_LINKING_CASE_REFERENCE}(?:$|#)`));
    await caseDetailsPage.selectCaseDetailsTab('Linked cases');
    const linkedCasesPanel = page.locator('[role="tabpanel"]:visible').first();
    const linkedCaseLink = linkedCasesPanel
      .getByRole('link', { name: formatCaseReferenceForDisplay(CASE_LINKING_RELATED_CASE_REFERENCE) })
      .first();
    await expect(linkedCaseLink).toBeVisible();
    await expect(linkedCaseLink).toHaveAttribute('href', new RegExp(`/v2/case/${CASE_LINKING_RELATED_CASE_REFERENCE}$`));
  });
});

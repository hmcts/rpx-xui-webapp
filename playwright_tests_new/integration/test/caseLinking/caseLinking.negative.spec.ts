import { expect, test } from '../../../E2E/fixtures';
import { caseLinkingStaffAccess, openCaseLinkingJourney } from '../../helpers';
import {
  CASE_LINKING_CASE_REFERENCE,
  CASE_LINKING_REASON_LABEL,
  CASE_LINKING_RELATED_CASE_REFERENCE,
} from '../../mocks/caseLinking.mock';

test.describe('Case linking integration', { tag: ['@integration', '@integration-case-linking'] }, () => {
  test('shows validation errors when the user continues without entering mandatory link details', async ({
    page,
    caseDetailsPage,
  }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
      access: caseLinkingStaffAccess,
    });

    await caseDetailsPage.openLinkCasesEvent();
    await caseDetailsPage.continueCaseEvent();

    await expect(caseDetailsPage.generalProblemHeading).toBeVisible();
    await expect(page.getByText('Linked case reference is required').first()).toBeVisible();
    await expect(page.getByText('Reason for link is required').first()).toBeVisible();
    await expect(caseDetailsPage.linkedCaseReferenceInput).toBeVisible();
    await expect(caseDetailsPage.caseLinkReasonSelect).toBeVisible();
  });

  test('shows a backend error when the user tries to link the case to itself', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
      access: caseLinkingStaffAccess,
      submitCaseLinks: {
        status: 400,
        body: { message: 'A case cannot be linked to itself' },
      },
    });

    await test.step(`Open Link cases and continue with self-link reference ${CASE_LINKING_CASE_REFERENCE} using reason ${CASE_LINKING_REASON_LABEL}`, async () => {
      await caseDetailsPage.openLinkCasesEvent();
      await caseDetailsPage.fillCaseLinkDetails({
        linkedCaseReference: CASE_LINKING_CASE_REFERENCE,
        reasonLabel: CASE_LINKING_REASON_LABEL,
      });
      await caseDetailsPage.continueCaseEvent();
    });

    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();

    const failedResponse = page.waitForResponse(
      (response) =>
        response.url().includes(`/data/cases/${CASE_LINKING_CASE_REFERENCE}/events`) &&
        response.request().method() === 'POST' &&
        response.status() === 400
    );

    await test.step('Submit and verify the 400 self-link error "A case cannot be linked to itself"', async () => {
      await caseDetailsPage.submitCaseEvent();
      await failedResponse;

      await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
      await expect(caseDetailsPage.eventCreationErrorHeading).toBeVisible();
      await expect(page.getByText('A case cannot be linked to itself')).toBeVisible();
    });
  });

  test('shows an error and stays on check-your-answers when the case-link submit fails', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
      access: caseLinkingStaffAccess,
      submitCaseLinks: {
        status: 500,
        body: { message: 'case-link-submit-failed' },
      },
    });

    await test.step(`Open Link cases and continue with linked case ${CASE_LINKING_RELATED_CASE_REFERENCE} using reason ${CASE_LINKING_REASON_LABEL}`, async () => {
      await caseDetailsPage.openLinkCasesEvent();
      await caseDetailsPage.fillCaseLinkDetails({
        linkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
        reasonLabel: CASE_LINKING_REASON_LABEL,
      });
      await caseDetailsPage.continueCaseEvent();
    });

    await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();

    const failedResponse = page.waitForResponse(
      (response) =>
        response.url().includes(`/data/cases/${CASE_LINKING_CASE_REFERENCE}/events`) &&
        response.request().method() === 'POST' &&
        response.status() === 500
    );

    await test.step('Submit and verify the 500 error "case-link-submit-failed" while remaining on check-your-answers', async () => {
      await caseDetailsPage.submitCaseEvent();
      await failedResponse;

      await expect(caseDetailsPage.checkYourAnswersHeading).toBeVisible();
      await expect(caseDetailsPage.eventCreationErrorHeading).toBeVisible();
      await expect(page.getByText('case-link-submit-failed')).toBeVisible();
      await expect(page).not.toHaveURL(new RegExp(`/cases/case-details/.*/.*/${CASE_LINKING_CASE_REFERENCE}(?:$|#)`));
    });
  });
});

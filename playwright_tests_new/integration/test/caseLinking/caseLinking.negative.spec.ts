import { expect, test } from '../../../E2E/fixtures';
import {
  CASE_LINKING_CASE_REFERENCE,
  CASE_LINKING_REASON_LABEL,
  CASE_LINKING_RELATED_CASE_REFERENCE,
} from '../../mocks/caseLinking.mock';
import { openCaseLinkingJourney } from '../../helpers';

const caseLinkingRoles = ['hmcts-staff'];

test.describe('Case linking integration', { tag: ['@integration', '@integration-case-linking'] }, () => {
  test('shows validation errors when the user continues without entering mandatory link details', async ({
    page,
    caseDetailsPage,
  }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
      userRoles: caseLinkingRoles,
    });

    await caseDetailsPage.caseActionsDropdown.selectOption({ label: 'Link cases' });
    await caseDetailsPage.caseActionGoButton.click();
    await page.getByRole('button', { name: /^continue$/i }).click();

    await expect(page.getByText('There is a problem')).toBeVisible();
    await expect(page.getByText('Linked case reference is required').first()).toBeVisible();
    await expect(page.getByText('Reason for link is required').first()).toBeVisible();
    await expect(page.getByLabel('Linked case reference')).toBeVisible();
    await expect(page.getByLabel('Reason for link')).toBeVisible();
  });

  test('shows a backend error when the user tries to link the case to itself', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
      userRoles: caseLinkingRoles,
      submitCaseLinks: {
        status: 400,
        body: { message: 'A case cannot be linked to itself' },
      },
    });

    await caseDetailsPage.caseActionsDropdown.selectOption({ label: 'Link cases' });
    await caseDetailsPage.caseActionGoButton.click();
    await page.getByLabel('Linked case reference').fill(CASE_LINKING_CASE_REFERENCE);
    await page.getByLabel('Reason for link').selectOption({ label: CASE_LINKING_REASON_LABEL });
    await page.getByRole('button', { name: /^continue$/i }).click();

    await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();

    const failedResponse = page.waitForResponse(
      (response) =>
        response.url().includes(`/data/cases/${CASE_LINKING_CASE_REFERENCE}/events`) &&
        response.request().method() === 'POST' &&
        response.status() === 400
    );

    await page.getByRole('button', { name: /^submit$/i }).click();
    await failedResponse;

    await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The event could not be created' })).toBeVisible();
    await expect(page.getByText('A case cannot be linked to itself')).toBeVisible();
  });

  test('shows an error and stays on check-your-answers when the case-link submit fails', async ({ page, caseDetailsPage }) => {
    await openCaseLinkingJourney(page, caseDetailsPage, {
      userRoles: caseLinkingRoles,
      submitCaseLinks: {
        status: 500,
        body: { message: 'case-link-submit-failed' },
      },
    });

    await caseDetailsPage.caseActionsDropdown.selectOption({ label: 'Link cases' });
    await caseDetailsPage.caseActionGoButton.click();

    await page.getByLabel('Linked case reference').fill(CASE_LINKING_RELATED_CASE_REFERENCE);
    await page.getByLabel('Reason for link').selectOption({ label: CASE_LINKING_REASON_LABEL });
    await page.getByRole('button', { name: /^continue$/i }).click();

    await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();

    const failedResponse = page.waitForResponse(
      (response) =>
        response.url().includes(`/data/cases/${CASE_LINKING_CASE_REFERENCE}/events`) &&
        response.request().method() === 'POST' &&
        response.status() === 500
    );

    await page.getByRole('button', { name: /^submit$/i }).click();
    await failedResponse;

    await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The event could not be created' })).toBeVisible();
    await expect(page.getByText('case-link-submit-failed')).toBeVisible();
    await expect(page).not.toHaveURL(new RegExp(`/cases/case-details/.*/.*/${CASE_LINKING_CASE_REFERENCE}(?:$|#)`));
  });
});

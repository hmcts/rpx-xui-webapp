import { expect, test } from '../../../E2E/fixtures';
import {
  caseDetailsEventErrorsCaseId,
  caseDetailsEventErrorsCaseTypeId,
  caseDetailsEventErrorsEventName,
  caseDetailsEventErrorsErrorMessage,
  caseDetailsEventErrorsJurisdictionId,
  caseDetailsEventErrorsUserIdentifier,
  registerCaseDetailsEventErrorsBenignRule,
  seedCaseDetailsEventErrorsSession,
} from '../../helpers';

test.beforeEach(async ({ page, registerBenignApiErrorRule }) => {
  registerCaseDetailsEventErrorsBenignRule(registerBenignApiErrorRule);
  await seedCaseDetailsEventErrorsSession(page);
});

test.describe(
  `Case details event errors as ${caseDetailsEventErrorsUserIdentifier}`,
  { tag: ['@integration', '@integration-case-details'] },
  () => {
    test('shows the backend error message when Record remission decision cannot start', async ({ page, caseDetailsPage }) => {
      await test.step('Open the case and trigger the event from the next step menu', async () => {
        await caseDetailsPage.openCaseDetails(
          caseDetailsEventErrorsJurisdictionId,
          caseDetailsEventErrorsCaseTypeId,
          caseDetailsEventErrorsCaseId
        );
        await caseDetailsPage.selectCaseAction(caseDetailsEventErrorsEventName);
      });

      await test.step('Verify the expected callback validation error is shown instead of the trim failure', async () => {
        const callbackValidationErrorSummary = page
          .locator('.error-summary')
          .filter({ hasText: /the callback data failed validation/i })
          .first();

        await expect(callbackValidationErrorSummary).toBeVisible();
        await expect(callbackValidationErrorSummary).toContainText(caseDetailsEventErrorsErrorMessage);
        await expect(page.getByText(/can't access property "trim", e is undefined/i)).toHaveCount(0);
      });
    });
  }
);

import { test, expect } from '@playwright/test';
import { signIn } from "../steps/login-steps"
// import axeTest from "../helpers/accessibilityTestHelper";
// import config from "../config"
import { validateCaseEventNextStepTriggerActions, validateUpdateFormPageNextStepTriggerActions, validateInvalidDateErrorMessage } from '../steps/search-steps';

test.beforeEach(async ({ page }) => {
    await signIn(page, 'PROD_LIKE');
    await expect(page.getByRole('heading', { name: 'Case list' })).toBeVisible();
});

test('Validate Case event next step trigger actions', async ({ page }) => {
  await validateCaseEventNextStepTriggerActions(page);
});

test('Validate update form page click on next step trigger actions', async ({ page }) => {
  await validateUpdateFormPageNextStepTriggerActions(page);
});

test('Validate invalid date error message @test', async ({ page }) => {
  await validateInvalidDateErrorMessage(page);
});

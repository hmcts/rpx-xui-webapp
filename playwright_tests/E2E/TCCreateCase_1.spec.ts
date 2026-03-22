import { test, expect } from '@playwright/test';
import { signIn } from "../steps/login-steps"
import { validateCaseEventNextStepTriggerActions, validateUpdateFormPageNextStepTriggerActions } from '../steps/search-steps';
import { validateInvalidDateErrorMessage } from '../steps/createCase-steps';

test.beforeEach(async ({ page }) => {
    await signIn(page, 'PROD_LIKE');
    await expect(page.getByRole('heading', { name: 'Case list' })).toBeVisible();
});

test('Validate Case event next step trigger actions @test', async ({ page }) => {
  await validateCaseEventNextStepTriggerActions(page);
});

test('Validate update form page click on next step trigger actions @test', async ({ page }) => {
  await validateUpdateFormPageNextStepTriggerActions(page);
});

test('Validate invalid date error message @test', async ({ page }) => {
  await validateInvalidDateErrorMessage(page);
});

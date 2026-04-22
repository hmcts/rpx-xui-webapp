import { RolesAccessPage } from '../../../E2E/page-objects/pages/exui/rolesAccess.po';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../helpers';
import { setupRolesAccessMockRoutes } from '../../helpers/rolesAccessMockRoutes.helper';
import { rolesAccessAllocatorRoleAssignments, rolesAccessNonAllocatorRoleAssignments } from '../../mocks/rolesAccess.mock';

const authenticatedUserIdentifier = 'STAFF_ADMIN';
const caseId = '1234567812345678';

test.describe('Roles and access parity', { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test.beforeEach(async ({ page }) => {
    await applySessionCookies(page, authenticatedUserIdentifier);
  });

  test('shows allocator and non-allocator roles-and-access states with the expected actions', async ({ page }) => {
    const rolesAccessPage = new RolesAccessPage(page);

    await setupRolesAccessMockRoutes(page, {
      caseId,
      roleAssignmentInfo: [...rolesAccessAllocatorRoleAssignments],
      withExistingRoles: false,
    });

    await test.step('Show the allocator empty states and add links', async () => {
      await rolesAccessPage.open(caseId);

      await expect(rolesAccessPage.getLink('Allocate a judicial role')).toBeVisible();
      await expect(rolesAccessPage.getLink('Allocate a legal ops role')).toBeVisible();
      await expect(rolesAccessPage.getExclusionsAddLink()).toBeVisible();

      await expect(rolesAccessPage.tabPanel).toContainText('There are no judicial roles for this case.');
      await expect(rolesAccessPage.tabPanel).toContainText('There are no legal Ops roles for this case.');
      await expect(rolesAccessPage.tabPanel).toContainText('There are no exclusions for this case.');
    });

    await test.step('Show the populated allocator state with mapped names and no duplicate legal-ops add link', async () => {
      await setupRolesAccessMockRoutes(page, {
        caseId,
        roleAssignmentInfo: [...rolesAccessAllocatorRoleAssignments],
      });
      await rolesAccessPage.open(caseId);

      await expect(rolesAccessPage.tabPanel).toContainText('Judge One Full');
      await expect(rolesAccessPage.tabPanel).toContainText('Alice Example');
      await expect(rolesAccessPage.tabPanel).toContainText('Judge One Alias');
      await expect(rolesAccessPage.getLink('Allocate a judicial role')).toBeVisible();
      await expect(rolesAccessPage.getLink('Allocate a legal ops role')).toHaveCount(0);
      await expect(rolesAccessPage.getLink('Manage')).toHaveCount(2);
      await expect(rolesAccessPage.getLink('Delete')).toHaveCount(1);
    });

    await test.step('Hide manage and allocate links for a non-allocator while leaving the exclusion add link visible', async () => {
      await setupRolesAccessMockRoutes(page, {
        caseId,
        roleAssignmentInfo: [...rolesAccessNonAllocatorRoleAssignments],
      });
      await rolesAccessPage.open(caseId);

      await expect(rolesAccessPage.getLink('Manage')).toHaveCount(0);
      await expect(rolesAccessPage.getLink('Delete')).toHaveCount(0);
      await expect(rolesAccessPage.getLink('Allocate a judicial role')).toHaveCount(0);
      await expect(rolesAccessPage.getLink('Allocate a legal ops role')).toHaveCount(0);
      await expect(rolesAccessPage.getExclusionsAddLink()).toBeVisible();
    });
  });

  test('reallocates and removes a judicial role from the Roles and access tab', async ({ page }) => {
    const rolesAccessPage = new RolesAccessPage(page);

    await setupRolesAccessMockRoutes(page, {
      caseId,
      roleAssignmentInfo: [...rolesAccessAllocatorRoleAssignments],
    });

    await test.step('Open the judicial manage links and reallocate the role', async () => {
      await rolesAccessPage.open(caseId);

      await rolesAccessPage.getLink('Manage').first().click();
      await expect(rolesAccessPage.getLink('Reallocate').first()).toBeVisible();
      await expect(rolesAccessPage.getLink('Remove Allocation').first()).toBeVisible();

      await rolesAccessPage.getLink('Reallocate').first().click();
      await expect(page.locator('main')).toContainText('Find the person');

      await rolesAccessPage.searchAndSelectPerson('Replacement', 'Replacement Judge');
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('main')).toContainText('Duration of role');
      await page.getByLabel('Indefinite').check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('main')).toContainText('Check your changes');
      await expect(page.locator('.govuk-summary-list')).toContainText('Replacement Judge');

      const reallocateRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/allocate-role/reallocate')
      );

      await page.getByRole('button', { name: 'Confirm allocation' }).click();

      const reallocateRequest = await reallocateRequestPromise;
      expect(reallocateRequest.postDataJSON()).toEqual(
        expect.objectContaining({
          action: 'reallocate',
          assignmentId: 'judicial-role-1',
          caseId,
          durationOfRole: 'Indefinite',
          jurisdiction: 'IA',
          person: expect.objectContaining({
            id: 'judicial-replacement-1',
          }),
        })
      );

      await expect(page).toHaveURL(new RegExp(`/cases/case-details/IA/Asylum/${caseId}(?:#.*)?$`));
      await rolesAccessPage.open(caseId);
      await expect(rolesAccessPage.tabPanel).toContainText('Replacement Judge');
    });

    await test.step('Remove the reallocated judicial role and verify the submitted payload', async () => {
      await rolesAccessPage.getLink('Manage').first().click();
      await rolesAccessPage.getLink('Remove Allocation').first().click();

      await expect(page.locator('main')).toContainText('Remove allocation');

      const removeRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/allocate-role/delete')
      );

      await page.getByRole('button', { name: 'Remove allocation' }).click();

      const removeRequest = await removeRequestPromise;
      expect(removeRequest.postDataJSON()).toEqual({ assigmentId: 'judicial-role-1' });

      await expect(page).toHaveURL(new RegExp(`/cases/case-details/IA/Asylum/${caseId}(?:#.*)?$`));
      await rolesAccessPage.open(caseId);
      await expect(rolesAccessPage.tabPanel).toContainText('There are no judicial roles for this case.');
      await expect(rolesAccessPage.tabPanel).toContainText('Alice Example');
    });
  });

  test('supports exclusion change links and confirms the updated exclusion payload', async ({ page }) => {
    const rolesAccessPage = new RolesAccessPage(page);

    await setupRolesAccessMockRoutes(page, {
      caseId,
      roleAssignmentInfo: [...rolesAccessAllocatorRoleAssignments],
    });

    await test.step('Open the add-exclusion workflow and reach check answers', async () => {
      await rolesAccessPage.open(caseId);

      await rolesAccessPage.getExclusionsAddLink().click();
      await expect(page.locator('main')).toContainText('Choose who the exclusion is for');
      await page.getByRole('radio', { name: 'Exclude another person' }).check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('main')).toContainText("Choose the person's role");
      await page.getByRole('radio', { name: 'Judicial' }).check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('main')).toContainText('Find the person');
      await rolesAccessPage.searchAndSelectPerson('Replacement', 'Replacement Judge');
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('main')).toContainText('Describe the exclusion');
      await page.locator('#exclusion-description').fill('Initial judicial exclusion');
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('main')).toContainText('Check your answers');
      await expect(rolesAccessPage.getSummaryRow('Who is the exclusion for')).toContainText('Exclude another person');
      await expect(rolesAccessPage.getSummaryRow("What's the person's role")).toContainText('Judicial');
      await expect(rolesAccessPage.getSummaryRow('Person')).toContainText('Replacement Judge');
      await expect(rolesAccessPage.getSummaryRow('Describe the exclusion')).toContainText('Initial judicial exclusion');
    });

    await test.step('Exercise each change link and confirm the updated answers', async () => {
      await rolesAccessPage
        .getSummaryRow('Who is the exclusion for')
        .getByRole('button', { name: /change/i })
        .click();
      await expect(page.locator('main')).toContainText('Choose who the exclusion is for');
      await page.getByRole('radio', { name: 'Exclude another person' }).check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText("Choose the person's role");
      await page.getByRole('radio', { name: 'Judicial' }).check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText('Find the person');
      await rolesAccessPage.searchAndSelectPerson('Alternate', 'Alternate Judge');
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText('Describe the exclusion');
      await page.locator('#exclusion-description').fill('Initial judicial exclusion');
      await page.getByRole('button', { name: 'Continue' }).click();

      await rolesAccessPage
        .getSummaryRow("What's the person's role")
        .getByRole('button', { name: /change/i })
        .click();
      await expect(page.locator('main')).toContainText("Choose the person's role");
      await page.getByRole('radio', { name: 'Judicial' }).check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText('Find the person');
      await rolesAccessPage.searchAndSelectPerson('Replacement', 'Replacement Judge');
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText('Describe the exclusion');
      await page.locator('#exclusion-description').fill('Initial judicial exclusion');
      await page.getByRole('button', { name: 'Continue' }).click();

      await rolesAccessPage
        .getSummaryRow('Person')
        .getByRole('button', { name: /change/i })
        .click();
      await expect(page.locator('main')).toContainText('Find the person');
      await rolesAccessPage.searchAndSelectPerson('Alternate', 'Alternate Judge');
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText('Describe the exclusion');
      await page.locator('#exclusion-description').fill('Initial judicial exclusion');
      await page.getByRole('button', { name: 'Continue' }).click();

      await rolesAccessPage
        .getSummaryRow('Describe the exclusion')
        .getByRole('button', { name: /change/i })
        .click();
      await expect(page.locator('main')).toContainText('Describe the exclusion');
      await page.locator('#exclusion-description').fill('Updated judicial exclusion');
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(rolesAccessPage.getSummaryRow('Person')).toContainText('Alternate Judge');
      await expect(rolesAccessPage.getSummaryRow('Describe the exclusion')).toContainText('Updated judicial exclusion');
    });

    await test.step('Confirm the exclusion and verify the payload', async () => {
      const confirmExclusionRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/exclusions/confirm')
      );

      await page.getByRole('button', { name: 'Confirm exclusion' }).click();

      const confirmExclusionRequest = await confirmExclusionRequestPromise;
      expect(confirmExclusionRequest.postDataJSON()).toEqual(
        expect.objectContaining({
          caseId,
          caseType: 'Asylum',
          exclusionDescription: 'Updated judicial exclusion',
          jurisdiction: 'IA',
          person: expect.objectContaining({
            id: 'judicial-replacement-2',
          }),
        })
      );

      await expect(page).toHaveURL(new RegExp(`/cases/case-details/IA/Asylum/${caseId}/roles-and-access(?:\\?.*)?$`));
      await expect(rolesAccessPage.tabPanel).toContainText('Alternate Judge');
      await expect(rolesAccessPage.tabPanel).toContainText('Updated judicial exclusion');
    });
  });
});

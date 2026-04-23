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

      await expect(rolesAccessPage.getAllocateJudicialRoleLink()).toBeVisible();
      await expect(rolesAccessPage.getAllocateLegalOpsRoleLink()).toBeVisible();
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
      await expect(rolesAccessPage.getAllocateJudicialRoleLink()).toBeVisible();
      await expect(rolesAccessPage.getAllocateLegalOpsRoleLink()).toHaveCount(0);
      await expect(rolesAccessPage.getManageLinks()).toHaveCount(2);
      await expect(rolesAccessPage.getDeleteLinks()).toHaveCount(1);
    });

    await test.step('Hide manage and allocate links for a non-allocator while leaving the exclusion add link visible', async () => {
      await setupRolesAccessMockRoutes(page, {
        caseId,
        roleAssignmentInfo: [...rolesAccessNonAllocatorRoleAssignments],
      });
      await rolesAccessPage.open(caseId);

      await expect(rolesAccessPage.getManageLinks()).toHaveCount(0);
      await expect(rolesAccessPage.getDeleteLinks()).toHaveCount(0);
      await expect(rolesAccessPage.getAllocateJudicialRoleLink()).toHaveCount(0);
      await expect(rolesAccessPage.getAllocateLegalOpsRoleLink()).toHaveCount(0);
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

      await rolesAccessPage.openFirstManageLink();
      await expect(rolesAccessPage.getReallocateLinks().first()).toBeVisible();
      await expect(rolesAccessPage.getRemoveAllocationLinks().first()).toBeVisible();

      await rolesAccessPage.openFirstReallocateLink();
      await expect(rolesAccessPage.mainContent).toContainText('Find the person');

      await rolesAccessPage.searchAndSelectPerson('Replacement', 'Replacement Judge');
      await rolesAccessPage.continue();

      await expect(rolesAccessPage.mainContent).toContainText('Duration of role');
      await rolesAccessPage.selectIndefiniteDuration();
      await rolesAccessPage.continue();

      await expect(rolesAccessPage.mainContent).toContainText('Check your changes');
      await expect(page.locator('.govuk-summary-list')).toContainText('Replacement Judge');

      const reallocateRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/allocate-role/reallocate')
      );

      await rolesAccessPage.confirmAllocation();

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
      await rolesAccessPage.openFirstManageLink();
      await rolesAccessPage.openFirstRemoveAllocationLink();

      await expect(rolesAccessPage.mainContent).toContainText('Remove allocation');

      const removeRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/allocate-role/delete')
      );

      await rolesAccessPage.removeAllocation();

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
      await expect(rolesAccessPage.mainContent).toContainText('Choose who the exclusion is for');
      await rolesAccessPage.chooseExclusionForAnotherPerson();
      await rolesAccessPage.continue();

      await expect(rolesAccessPage.mainContent).toContainText("Choose the person's role");
      await rolesAccessPage.chooseJudicialPersonRole();
      await rolesAccessPage.continue();

      await expect(rolesAccessPage.mainContent).toContainText('Find the person');
      await rolesAccessPage.searchAndSelectPerson('Replacement', 'Replacement Judge');
      await rolesAccessPage.continue();

      await expect(rolesAccessPage.mainContent).toContainText('Describe the exclusion');
      await rolesAccessPage.fillExclusionDescription('Initial judicial exclusion');
      await rolesAccessPage.continue();

      await expect(rolesAccessPage.mainContent).toContainText('Check your answers');
      await expect(rolesAccessPage.getSummaryRow('Who is the exclusion for')).toContainText('Exclude another person');
      await expect(rolesAccessPage.getSummaryRow("What's the person's role")).toContainText('Judicial');
      await expect(rolesAccessPage.getSummaryRow('Person')).toContainText('Replacement Judge');
      await expect(rolesAccessPage.getSummaryRow('Describe the exclusion')).toContainText('Initial judicial exclusion');
    });

    await test.step('Exercise each change link and confirm the updated answers', async () => {
      await rolesAccessPage.getSummaryChangeButton('Who is the exclusion for').click();
      await expect(rolesAccessPage.mainContent).toContainText('Choose who the exclusion is for');
      await rolesAccessPage.chooseExclusionForAnotherPerson();
      await rolesAccessPage.continue();
      await expect(rolesAccessPage.mainContent).toContainText("Choose the person's role");
      await rolesAccessPage.chooseJudicialPersonRole();
      await rolesAccessPage.continue();
      await expect(rolesAccessPage.mainContent).toContainText('Find the person');
      await rolesAccessPage.searchAndSelectPerson('Alternate', 'Alternate Judge');
      await rolesAccessPage.continue();
      await expect(rolesAccessPage.mainContent).toContainText('Describe the exclusion');
      await rolesAccessPage.fillExclusionDescription('Initial judicial exclusion');
      await rolesAccessPage.continue();

      await rolesAccessPage.getSummaryChangeButton("What's the person's role").click();
      await expect(rolesAccessPage.mainContent).toContainText("Choose the person's role");
      await rolesAccessPage.chooseJudicialPersonRole();
      await rolesAccessPage.continue();
      await expect(rolesAccessPage.mainContent).toContainText('Find the person');
      await rolesAccessPage.searchAndSelectPerson('Replacement', 'Replacement Judge');
      await rolesAccessPage.continue();
      await expect(rolesAccessPage.mainContent).toContainText('Describe the exclusion');
      await rolesAccessPage.fillExclusionDescription('Initial judicial exclusion');
      await rolesAccessPage.continue();

      await rolesAccessPage.getSummaryChangeButton('Person').click();
      await expect(rolesAccessPage.mainContent).toContainText('Find the person');
      await rolesAccessPage.searchAndSelectPerson('Alternate', 'Alternate Judge');
      await rolesAccessPage.continue();
      await expect(rolesAccessPage.mainContent).toContainText('Describe the exclusion');
      await rolesAccessPage.fillExclusionDescription('Initial judicial exclusion');
      await rolesAccessPage.continue();

      await rolesAccessPage.getSummaryChangeButton('Describe the exclusion').click();
      await expect(rolesAccessPage.mainContent).toContainText('Describe the exclusion');
      await rolesAccessPage.fillExclusionDescription('Updated judicial exclusion');
      await rolesAccessPage.continue();

      await expect(rolesAccessPage.getSummaryRow('Person')).toContainText('Alternate Judge');
      await expect(rolesAccessPage.getSummaryRow('Describe the exclusion')).toContainText('Updated judicial exclusion');
    });

    await test.step('Confirm the exclusion and verify the payload', async () => {
      const confirmExclusionRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/exclusions/confirm')
      );

      await rolesAccessPage.confirmExclusion();

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

      await expect(page).toHaveURL(
        new RegExp(`/cases/case-details/IA/Asylum/${caseId}(?:/roles-and-access(?:\\?.*)?|#Roles%20and%20access)$`)
      );
      await expect(rolesAccessPage.tabPanel).toContainText('Alternate Judge');
      await expect(rolesAccessPage.tabPanel).toContainText('Updated judicial exclusion');
    });
  });
});

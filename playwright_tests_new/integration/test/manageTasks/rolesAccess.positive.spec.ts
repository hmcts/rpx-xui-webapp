import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, buildNgIntegrationUserDetailsMock } from '../../helpers';
import { buildAsylumCaseMock } from '../../mocks/cases/asylumCase.mock';

const authenticatedUserIdentifier = 'STAFF_ADMIN';
const caseId = '1234567812345678';
const caseMockResponse = buildAsylumCaseMock({ caseId });
const allocatorRoleAssignments = [
  {
    jurisdiction: 'IA',
    substantive: 'N',
    roleType: 'ORGANISATION',
    baseLocation: '20001',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'case-allocator',
    isCaseAllocator: true,
  },
  {
    jurisdiction: 'SSCS',
    substantive: 'N',
    roleType: 'ORGANISATION',
    baseLocation: '30001',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'case-allocator',
    isCaseAllocator: true,
  },
] as const;
const nonAllocatorRoleAssignments = [
  {
    jurisdiction: 'IA',
    substantive: 'N',
    roleType: 'ORGANISATION',
    baseLocation: '20001',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'task-supervisor',
    isCaseAllocator: false,
  },
  {
    jurisdiction: 'SSCS',
    substantive: 'N',
    roleType: 'ORGANISATION',
    baseLocation: '30001',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'task-supervisor',
    isCaseAllocator: false,
  },
] as const;

type RoleAccessRouteOptions = {
  roleAssignmentInfo: Array<Record<string, unknown>>;
  withExistingRoles?: boolean;
};

function hasCaseAllocatorAssignment(roleAssignmentInfo: Array<Record<string, unknown>>): boolean {
  return roleAssignmentInfo.some((assignment) => assignment.isCaseAllocator === true || assignment.roleName === 'case-allocator');
}

type CaseRoleMock = {
  id: string;
  actorId: string;
  name: string;
  email: string;
  roleCategory: 'JUDICIAL' | 'LEGAL_OPERATIONS';
  roleName: string;
  location: string;
  start: string;
  end: string;
  actions: Array<{ id: string; title: string }>;
};

type RoleExclusionMock = {
  actorId: string;
  added: string;
  id: string;
  name: string;
  notes: string;
  type: string;
  userType: string;
};

const legalOpsCaseworker = {
  email: 'alice.example@justice.gov.uk',
  firstName: 'Alice',
  idamId: 'legal-ops-person-1',
  lastName: 'Example',
  location: {
    id: 20001,
    locationName: 'Taylor House',
    services: ['IA'],
  },
  roleCategory: 'LEGAL_OPERATIONS',
  service: 'IA',
};

const judicialPeople = [
  {
    appointments: [],
    email_id: 'judge.one@example.com',
    full_name: 'Judge One Full',
    idam_id: 'judicial-person-1',
    known_as: 'Judge One Alias',
    sidam_id: 'judicial-person-1',
    surname: 'One',
  },
  {
    appointments: [],
    email_id: 'replacement.judge@example.com',
    full_name: 'Replacement Judge',
    idam_id: 'judicial-replacement-1',
    known_as: 'Replacement Judge',
    sidam_id: 'judicial-replacement-1',
    surname: 'Judge',
  },
  {
    appointments: [],
    email_id: 'alternate.judge@example.com',
    full_name: 'Alternate Judge',
    idam_id: 'judicial-replacement-2',
    known_as: 'Alternate Judge',
    sidam_id: 'judicial-replacement-2',
    surname: 'Judge',
  },
] as const;

function buildCaseRoles(): CaseRoleMock[] {
  return [
    {
      id: 'judicial-role-1',
      actorId: 'judicial-person-1',
      name: '',
      email: '',
      roleCategory: 'JUDICIAL',
      roleName: 'Lead Judge',
      location: 'Taylor House',
      start: '2030-01-10T12:00:00.000Z',
      end: '2030-02-10T12:00:00.000Z',
      actions: [
        { id: 'reallocate', title: 'Reallocate' },
        { id: 'remove', title: 'Remove Allocation' },
      ],
    },
    {
      id: 'legal-ops-role-1',
      actorId: legalOpsCaseworker.idamId,
      name: '',
      email: '',
      roleCategory: 'LEGAL_OPERATIONS',
      roleName: 'Case Manager',
      location: 'Taylor House',
      start: '2030-01-12T12:00:00.000Z',
      end: '2030-02-12T12:00:00.000Z',
      actions: [
        { id: 'reallocate', title: 'Reallocate' },
        { id: 'remove', title: 'Remove Allocation' },
      ],
    },
  ];
}

function buildExistingExclusions(): RoleExclusionMock[] {
  return [
    {
      actorId: 'judicial-person-1',
      added: '2030-01-08T12:00:00.000Z',
      id: 'existing-exclusion-1',
      name: '',
      notes: 'Existing judicial exclusion',
      type: 'EXCLUDED',
      userType: 'JUDICIAL',
    },
  ];
}

function getExclusionsAddLink(page: Page) {
  return page.getByRole('heading', { name: 'Exclusions' }).locator('xpath=following::a[normalize-space()="Add"][1]');
}

function summaryRow(page: Page, label: string) {
  return page.locator(
    `xpath=//div[contains(@class,"govuk-summary-list__row")][.//*[contains(@class,"govuk-summary-list__key") and normalize-space(.)="${label}"]]`
  );
}

function rolesAndAccessTabPanel(page: Page) {
  return page.getByRole('tabpanel', { name: 'Roles and access' });
}

function rolesAndAccessLink(page: Page, name: string) {
  return rolesAndAccessTabPanel(page).getByRole('link', { name, exact: true });
}

async function openRolesAndAccess(page: Page) {
  await page.goto(`/cases/case-details/IA/Asylum/${caseId}/roles-and-access`);
  await page.waitForURL(new RegExp(`/cases/case-details/IA/Asylum/${caseId}/roles-and-access(?:\\?.*)?$`));
  await expect(page.getByRole('heading', { name: 'Roles and access' })).toBeVisible();
}

async function searchAndSelectPerson(page: Page, searchTerm: string, optionName: string) {
  const searchInput = page.locator('#inputSelectPerson');
  const autocompleteOverlay = page.locator('.cdk-overlay-pane').filter({
    has: page.locator('[role="option"]'),
  });
  const matchingOption = autocompleteOverlay.last().getByRole('option', { name: new RegExp(optionName, 'i') });

  await searchInput.fill('');
  await searchInput.fill(searchTerm);
  await autocompleteOverlay.last().waitFor({ state: 'visible' });
  await matchingOption.click();
  await expect(searchInput).toHaveValue(new RegExp(optionName, 'i'));
}

async function setupRolesAndAccessRoutes(page: Page, options: RoleAccessRouteOptions): Promise<void> {
  let currentCaseRoles = options.withExistingRoles === false ? [] : buildCaseRoles();
  let currentExclusions = options.withExistingRoles === false ? [] : buildExistingExclusions();
  const roles = ['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-ia-admofficer'];
  if (hasCaseAllocatorAssignment(options.roleAssignmentInfo)) {
    roles.push('case-allocator');
  }

  const userDetails = buildNgIntegrationUserDetailsMock({
    userId: 'wave2-roles-user',
    roles,
    roleAssignmentInfo: [...options.roleAssignmentInfo],
  });

  await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseMockResponse),
    });
  });

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.route('**/api/role-access/roles/manageLabellingRoleAssignment/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/api/role-access/roles/access-get-by-caseId*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([legalOpsCaseworker]),
    });
  });

  await page.route('**/api/role-access/roles/post', async (route) => {
    const requestBody = (route.request().postDataJSON() as { assignmentId?: string }) ?? {};
    const matchingRole = currentCaseRoles.find((role) => role.id === requestBody.assignmentId);

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(matchingRole ? [matchingRole] : currentCaseRoles),
    });
  });

  await page.route('**/api/role-access/exclusions/post', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(currentExclusions),
    });
  });

  await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
    const requestBody = (route.request().postDataJSON() as { userIds?: string[] }) ?? {};
    const requestedUserIds = requestBody.userIds ?? [];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(judicialPeople.filter((person) => requestedUserIds.includes(person.sidam_id))),
    });
  });

  await page.route('**/workallocation/exclusion/rolesCategory*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { roleId: 'judicial', roleName: 'Judicial' },
        { roleId: 'legalOps', roleName: 'Legal Ops' },
        { roleId: 'admin', roleName: 'Admin' },
      ]),
    });
  });

  await page.route('**/workallocation/findPerson*', async (route) => {
    const requestBody =
      (route.request().postDataJSON() as {
        searchOptions?: { searchTerm?: string; userRole?: string };
      }) ?? {};
    const searchTerm = requestBody.searchOptions?.searchTerm?.toLowerCase() ?? '';
    const userRole = requestBody.searchOptions?.userRole ?? 'Judicial';

    const results = judicialPeople
      .filter((person) => userRole === 'Judicial')
      .filter((person) => person.full_name.toLowerCase().includes(searchTerm))
      .map((person) => ({
        ...person,
        email: person.email_id,
        id: person.sidam_id,
        name: person.full_name,
      }));

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(results),
    });
  });

  await page.route('**/api/role-access/allocate-role/reallocate', async (route) => {
    const requestBody =
      (route.request().postDataJSON() as {
        assignmentId?: string;
        person?: { id?: string };
      }) ?? {};

    if (requestBody.assignmentId && requestBody.person?.id) {
      currentCaseRoles = currentCaseRoles.map((role) =>
        role.id === requestBody.assignmentId ? { ...role, actorId: requestBody.person.id ?? role.actorId } : role
      );
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/api/role-access/allocate-role/delete', async (route) => {
    const requestBody = (route.request().postDataJSON() as { assigmentId?: string }) ?? {};
    currentCaseRoles = currentCaseRoles.filter((role) => role.id !== requestBody.assigmentId);

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/api/role-access/exclusions/confirm', async (route) => {
    const requestBody =
      (route.request().postDataJSON() as {
        exclusionDescription?: string;
        person?: { id?: string };
      }) ?? {};

    currentExclusions = [
      ...currentExclusions,
      {
        actorId: requestBody.person?.id ?? 'judicial-replacement-2',
        added: '2030-01-16T12:00:00.000Z',
        id: 'new-exclusion-1',
        name: '',
        notes: requestBody.exclusionDescription ?? 'Wave 2 exclusion',
        type: 'EXCLUDED',
        userType: 'JUDICIAL',
      },
    ];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });
}

test.describe('Roles and access parity', { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test.beforeEach(async ({ page }) => {
    await applySessionCookies(page, authenticatedUserIdentifier);
  });

  test('shows allocator and non-allocator roles-and-access states with the expected actions', async ({ page }) => {
    await setupRolesAndAccessRoutes(page, {
      roleAssignmentInfo: [...allocatorRoleAssignments],
      withExistingRoles: false,
    });

    await test.step('Show the allocator empty states and add links', async () => {
      await openRolesAndAccess(page);

      await expect(rolesAndAccessLink(page, 'Allocate a judicial role')).toBeVisible();
      await expect(rolesAndAccessLink(page, 'Allocate a legal ops role')).toBeVisible();
      await expect(getExclusionsAddLink(page)).toBeVisible();

      await expect(rolesAndAccessTabPanel(page)).toContainText('There are no judicial roles for this case.');
      await expect(rolesAndAccessTabPanel(page)).toContainText('There are no legal Ops roles for this case.');
      await expect(rolesAndAccessTabPanel(page)).toContainText('There are no exclusions for this case.');
    });

    await test.step('Show the populated allocator state with mapped names and no duplicate legal-ops add link', async () => {
      await setupRolesAndAccessRoutes(page, {
        roleAssignmentInfo: [...allocatorRoleAssignments],
      });
      await openRolesAndAccess(page);

      await expect(rolesAndAccessTabPanel(page)).toContainText('Judge One Full');
      await expect(rolesAndAccessTabPanel(page)).toContainText('Alice Example');
      await expect(rolesAndAccessTabPanel(page)).toContainText('Judge One Alias');
      await expect(rolesAndAccessLink(page, 'Allocate a judicial role')).toBeVisible();
      await expect(rolesAndAccessLink(page, 'Allocate a legal ops role')).toHaveCount(0);
      await expect(rolesAndAccessLink(page, 'Manage')).toHaveCount(2);
      await expect(rolesAndAccessLink(page, 'Delete')).toHaveCount(1);
    });

    await test.step('Hide manage, delete, and allocate links for a non-allocator', async () => {
      await setupRolesAndAccessRoutes(page, {
        roleAssignmentInfo: [...nonAllocatorRoleAssignments],
      });
      await openRolesAndAccess(page);

      await expect(rolesAndAccessLink(page, 'Manage')).toHaveCount(0);
      await expect(rolesAndAccessLink(page, 'Delete')).toHaveCount(0);
      await expect(rolesAndAccessLink(page, 'Allocate a judicial role')).toHaveCount(0);
      await expect(rolesAndAccessLink(page, 'Allocate a legal ops role')).toHaveCount(0);
      await expect(getExclusionsAddLink(page)).toBeVisible();
    });
  });

  test('reallocates and removes a judicial role from the Roles and access tab', async ({ page }) => {
    await setupRolesAndAccessRoutes(page, {
      roleAssignmentInfo: [...allocatorRoleAssignments],
    });

    await test.step('Open the Judicial manage links and reallocate the role', async () => {
      await openRolesAndAccess(page);

      await rolesAndAccessLink(page, 'Manage').first().click();
      await expect(rolesAndAccessLink(page, 'Reallocate').first()).toBeVisible();
      await expect(rolesAndAccessLink(page, 'Remove Allocation').first()).toBeVisible();

      await rolesAndAccessLink(page, 'Reallocate').first().click();
      await expect(page.locator('main')).toContainText('Find the person');

      await searchAndSelectPerson(page, 'Replacement', 'Replacement Judge');
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
      await openRolesAndAccess(page);
      await expect(rolesAndAccessTabPanel(page)).toContainText('Replacement Judge');
    });

    await test.step('Remove the reallocated judicial role and verify the submitted payload', async () => {
      await rolesAndAccessLink(page, 'Manage').first().click();
      await rolesAndAccessLink(page, 'Remove Allocation').first().click();

      await expect(page.locator('main')).toContainText('Remove allocation');

      const removeRequestPromise = page.waitForRequest(
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/allocate-role/delete')
      );

      await page.getByRole('button', { name: 'Remove allocation' }).click();

      const removeRequest = await removeRequestPromise;
      expect(removeRequest.postDataJSON()).toEqual({ assigmentId: 'judicial-role-1' });

      await expect(page).toHaveURL(new RegExp(`/cases/case-details/IA/Asylum/${caseId}(?:#.*)?$`));
      await openRolesAndAccess(page);
      await expect(rolesAndAccessTabPanel(page)).toContainText('There are no judicial roles for this case.');
      await expect(rolesAndAccessTabPanel(page)).toContainText('Alice Example');
    });
  });

  test('supports exclusion change links and confirms the updated exclusion payload', async ({ page }) => {
    await setupRolesAndAccessRoutes(page, {
      roleAssignmentInfo: [...allocatorRoleAssignments],
    });

    await test.step('Open the add-exclusion workflow and reach check answers', async () => {
      await openRolesAndAccess(page);

      await getExclusionsAddLink(page).click();
      await expect(page.locator('main')).toContainText('Choose who the exclusion is for');
      await page.getByRole('radio', { name: 'Exclude another person' }).check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('main')).toContainText("Choose the person's role");
      await page.getByRole('radio', { name: 'Judicial' }).check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('main')).toContainText('Find the person');
      await searchAndSelectPerson(page, 'Replacement', 'Replacement Judge');
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('main')).toContainText('Describe the exclusion');
      await page.locator('#exclusion-description').fill('Initial judicial exclusion');
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('main')).toContainText('Check your answers');
      await expect(summaryRow(page, 'Who is the exclusion for')).toContainText('Exclude another person');
      await expect(summaryRow(page, "What's the person's role")).toContainText('Judicial');
      await expect(summaryRow(page, 'Person')).toContainText('Replacement Judge');
      await expect(summaryRow(page, 'Describe the exclusion')).toContainText('Initial judicial exclusion');
    });

    await test.step('Exercise each change link and confirm the updated answers', async () => {
      await summaryRow(page, 'Who is the exclusion for')
        .getByRole('button', { name: /change/i })
        .click();
      await expect(page.locator('main')).toContainText('Choose who the exclusion is for');
      await page.getByRole('radio', { name: 'Exclude another person' }).check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText("Choose the person's role");
      await page.getByRole('radio', { name: 'Judicial' }).check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText('Find the person');
      await searchAndSelectPerson(page, 'Alternate', 'Alternate Judge');
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText('Describe the exclusion');
      await page.locator('#exclusion-description').fill('Initial judicial exclusion');
      await page.getByRole('button', { name: 'Continue' }).click();

      await summaryRow(page, "What's the person's role")
        .getByRole('button', { name: /change/i })
        .click();
      await expect(page.locator('main')).toContainText("Choose the person's role");
      await page.getByRole('radio', { name: 'Judicial' }).check({ force: true });
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText('Find the person');
      await searchAndSelectPerson(page, 'Replacement', 'Replacement Judge');
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText('Describe the exclusion');
      await page.locator('#exclusion-description').fill('Initial judicial exclusion');
      await page.getByRole('button', { name: 'Continue' }).click();

      await summaryRow(page, 'Person')
        .getByRole('button', { name: /change/i })
        .click();
      await expect(page.locator('main')).toContainText('Find the person');
      await searchAndSelectPerson(page, 'Alternate', 'Alternate Judge');
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('main')).toContainText('Describe the exclusion');
      await page.locator('#exclusion-description').fill('Initial judicial exclusion');
      await page.getByRole('button', { name: 'Continue' }).click();

      await summaryRow(page, 'Describe the exclusion')
        .getByRole('button', { name: /change/i })
        .click();
      await expect(page.locator('main')).toContainText('Describe the exclusion');
      await page.locator('#exclusion-description').fill('Updated judicial exclusion');
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(summaryRow(page, 'Person')).toContainText('Alternate Judge');
      await expect(summaryRow(page, 'Describe the exclusion')).toContainText('Updated judicial exclusion');
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
      await expect(rolesAndAccessTabPanel(page)).toContainText('Alternate Judge');
      await expect(rolesAndAccessTabPanel(page)).toContainText('Updated judicial exclusion');
    });
  });
});

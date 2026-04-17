import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, setupRolesAndAccessMockRoutes } from '../../helpers';
import {
  rolesAndAccessScenarioCaseId as populatedCaseId,
  rolesAndAccessScenarioRecords as scenarioRecords,
} from '../../mocks/workAllocationAccessScenarios.mock';

const userIdentifier = 'STAFF_ADMIN';
const emptyCaseId = '1000000000000200';

const getRoleAccessSection = (page: Page, title: 'Judiciary' | 'Legal Ops') =>
  page.locator('exui-role-access-section').filter({
    has: page.getByRole('heading', { level: 2, name: title }),
  });

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Roles and access as ${userIdentifier}`, { tag: ['@integration', '@integration-case-details'] }, () => {
  test('Case allocator sees empty-state messages and allocate links when no roles or exclusions exist', async ({ page }) => {
    const judiciarySection = getRoleAccessSection(page, 'Judiciary');
    const legalOpsSection = getRoleAccessSection(page, 'Legal Ops');
    const addExclusionLink = page.locator('a.govuk-link[href*="/role-access/add-exclusion"]').first();

    await test.step('Setup route mocks for an empty Roles and access case', async () => {
      await setupRolesAndAccessMockRoutes(page, {
        caseId: emptyCaseId,
        records: [],
        isCaseAllocator: true,
      });
    });

    await test.step('Open the Roles and access page directly on case details', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${emptyCaseId}/roles-and-access`);
      await expect(page.getByRole('heading', { level: 2, name: 'Roles and access' })).toBeVisible();
    });

    await test.step('Verify allocate links and empty-state messaging are rendered', async () => {
      await expect(judiciarySection.getByRole('link', { name: 'Allocate a judicial role' })).toBeVisible();
      await expect(legalOpsSection.getByRole('link', { name: 'Allocate a legal ops role' })).toBeVisible();
      await expect(addExclusionLink).toBeVisible();

      await expect(judiciarySection.locator('table.govuk-table')).toHaveCount(0);
      await expect(legalOpsSection.locator('table.govuk-table')).toHaveCount(0);
      await expect(page.locator('exui-exclusions-table table.govuk-table')).toHaveCount(0);

      await expect(judiciarySection).toContainText('There are no judicial roles for this case.');
      await expect(legalOpsSection).toContainText('There are no legal Ops roles for this case.');
      await expect(page.locator('exui-exclusions-table')).toContainText('There are no exclusions for this case.');
    });
  });

  test('Case allocator sees active roles, exclusions, headers, and manage actions', async ({ page, tableUtils }) => {
    const judicialLookupRequestPromise = page.waitForRequest('**/api/role-access/roles/getJudicialUsers*');
    const judiciarySection = getRoleAccessSection(page, 'Judiciary');
    const legalOpsSection = getRoleAccessSection(page, 'Legal Ops');
    const addExclusionLink = page.locator('a.govuk-link[href*="/role-access/add-exclusion"]').first();

    await test.step('Setup route mocks for a populated Roles and access case', async () => {
      await setupRolesAndAccessMockRoutes(page, {
        caseId: populatedCaseId,
        records: scenarioRecords,
        isCaseAllocator: true,
      });
    });

    await test.step('Open the Roles and access page directly on case details', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${populatedCaseId}/roles-and-access`);
      await expect(page.getByRole('heading', { level: 2, name: 'Roles and access' })).toBeVisible();
    });

    await test.step('Verify links, headers, and judicial lookup payload for the populated view', async () => {
      const judicialLookupRequest = await judicialLookupRequestPromise;
      expect(judicialLookupRequest.postDataJSON()).toEqual({
        userIds: ['judge-bob'],
        services: ['IA'],
      });

      await expect(judiciarySection.getByRole('link', { name: 'Allocate a judicial role' })).toBeVisible();
      await expect(legalOpsSection.getByRole('link', { name: 'Allocate a legal ops role' })).toHaveCount(0);
      await expect(addExclusionLink).toBeVisible();

      expect(
        (await judiciarySection.locator('table.govuk-table thead th').allInnerTexts())
          .map((value) => value.trim())
          .filter(Boolean)
      ).toEqual(['Name', 'Role', 'Start', 'End']);
      expect(
        (await legalOpsSection.locator('table.govuk-table thead th').allInnerTexts()).map((value) => value.trim()).filter(Boolean)
      ).toEqual(['Name', 'Role', 'Start', 'End']);
      expect(
        (await page.locator('exui-exclusions-table table.govuk-table thead th').allInnerTexts())
          .map((value) => value.trim())
          .filter(Boolean)
      ).toEqual(['Name', 'User type', 'Notes', 'Added']);
    });

    await test.step('Verify active roles remain visible even when exclusions exist for the same user', async () => {
      const judiciaryTable = judiciarySection.locator('table.govuk-table').first();
      const judiciaryRows = await tableUtils.parseDataTable(judiciaryTable);

      expect(judiciaryRows).toHaveLength(1);
      expect(judiciaryRows[0]).toEqual(
        expect.objectContaining({
          Name: 'Bob Judge',
          Role: 'Lead Judge',
          Start: '10 January 2026',
          End: '10 February 2026',
        })
      );

      const legalOpsTable = legalOpsSection.locator('table.govuk-table').first();
      const legalOpsRows = await tableUtils.parseDataTable(legalOpsTable);

      expect(legalOpsRows).toHaveLength(1);
      expect(legalOpsRows[0]).toEqual(
        expect.objectContaining({
          Name: 'Alice Example',
          Role: 'Case Manager',
          Start: '11 January 2026',
          End: '11 February 2026',
        })
      );
    });

    await test.step('Verify EXCLUDED grant behaviour and allocator controls are rendered', async () => {
      const exclusionsTable = page.locator('exui-exclusions-table table.govuk-table').first();
      const exclusionRows = await tableUtils.parseDataTable(exclusionsTable);

      expect(exclusionRows).toHaveLength(1);
      expect(exclusionRows[0]).toEqual(
        expect.objectContaining({
          Name: 'Bob Judge',
          'User type': 'JUDICIAL',
          Notes: 'Judicial conflict flagged.',
          Added: '15 January 2026',
        })
      );

      await expect(judiciarySection.getByRole('link', { name: 'Manage' })).toHaveCount(1);
      await expect(legalOpsSection.getByRole('link', { name: 'Manage' })).toHaveCount(1);
      await expect(page.locator('exui-exclusions-table').getByRole('link', { name: 'Delete' })).toHaveCount(1);
    });
  });

  test('Non case allocators can view roles and exclusions but not manage or delete them', async ({ page, tableUtils }) => {
    const judiciarySection = getRoleAccessSection(page, 'Judiciary');
    const legalOpsSection = getRoleAccessSection(page, 'Legal Ops');

    await test.step('Setup route mocks for a non-case allocator user', async () => {
      await setupRolesAndAccessMockRoutes(page, {
        caseId: populatedCaseId,
        records: scenarioRecords,
        isCaseAllocator: false,
      });
    });

    await test.step('Open the Roles and access page directly on case details', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${populatedCaseId}/roles-and-access`);
      await expect(page.getByRole('heading', { level: 2, name: 'Roles and access' })).toBeVisible();
    });

    await test.step('Verify non-case allocators still see the role and exclusion data', async () => {
      const judiciaryRows = await tableUtils.parseDataTable(judiciarySection.locator('table.govuk-table').first());
      const legalOpsRows = await tableUtils.parseDataTable(legalOpsSection.locator('table.govuk-table').first());
      const exclusionRows = await tableUtils.parseDataTable(page.locator('exui-exclusions-table table.govuk-table').first());

      expect(judiciaryRows).toHaveLength(1);
      expect(legalOpsRows).toHaveLength(1);
      expect(exclusionRows).toHaveLength(1);
    });

    await test.step('Verify non-case allocators cannot allocate, manage, or delete', async () => {
      await expect(judiciarySection.getByRole('link', { name: 'Allocate a judicial role' })).toHaveCount(0);
      await expect(legalOpsSection.getByRole('link', { name: 'Allocate a legal ops role' })).toHaveCount(0);
      await expect(judiciarySection.getByRole('link', { name: 'Manage' })).toHaveCount(0);
      await expect(legalOpsSection.getByRole('link', { name: 'Manage' })).toHaveCount(0);
      await expect(page.locator('exui-exclusions-table').getByRole('link', { name: 'Delete' })).toHaveCount(0);
    });
  });
});

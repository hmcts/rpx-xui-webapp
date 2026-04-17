import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, buildEntityToUsersAccessView } from '../../helpers';
import { buildAsylumCaseMock } from '../../mocks/cases/asylumCase.mock';
import {
  rolesAndAccessScenarioCaseId as caseId,
  rolesAndAccessScenarioRecords as scenarioRecords,
} from '../../mocks/workAllocationAccessScenarios.mock';

const userIdentifier = 'STAFF_ADMIN';
const caseMockResponse = buildAsylumCaseMock({ caseId });

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);

  const entityView = buildEntityToUsersAccessView(scenarioRecords, caseId);

  await page.route(`**data/internal/cases/${caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseMockResponse),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(entityView.caseworkers),
    });
  });

  await page.route('**/api/role-access/roles/post*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(entityView.roles),
    });
  });

  await page.route('**/api/role-access/exclusions/post*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(entityView.exclusions),
    });
  });

  await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
    const requestBody = (route.request().postDataJSON() as { userIds?: string[]; services?: string[] }) ?? {};
    const requestedUserIds = Array.isArray(requestBody.userIds) ? requestBody.userIds : [];
    const requestedServices = Array.isArray(requestBody.services) ? requestBody.services : [];
    const filteredJudicialUsers =
      requestedUserIds.length > 0 && requestedServices.includes('IA')
        ? entityView.judicialUsers.filter((user) => requestedUserIds.includes(user.sidam_id))
        : [];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(filteredJudicialUsers),
    });
  });
});

test.describe(`Roles and access as ${userIdentifier}`, { tag: ['@integration', '@integration-case-details'] }, () => {
  test('Entity->users access view separates active roles from EXCLUDED users', async ({ page, tableUtils }) => {
    const judicialLookupRequestPromise = page.waitForRequest('**/api/role-access/roles/getJudicialUsers*');
    const judiciarySection = page.locator('exui-role-access-section').filter({
      has: page.getByRole('heading', { level: 2, name: 'Judiciary' }),
    });
    const legalOpsSection = page.locator('exui-role-access-section').filter({
      has: page.getByRole('heading', { level: 2, name: 'Legal Ops' }),
    });

    await test.step('Open the Roles and access tab directly on case details', async () => {
      await page.goto(`/cases/case-details/IA/Asylum/${caseId}/roles-and-access`);
      await expect(page.getByRole('heading', { level: 2, name: 'Roles and access' })).toBeVisible();
    });

    await test.step('Verify active roles remain visible even when exclusions exist for the same user', async () => {
      const judicialLookupRequest = await judicialLookupRequestPromise;
      expect(judicialLookupRequest).toBeTruthy();
      expect(judicialLookupRequest.postDataJSON()).toEqual({
        userIds: ['judge-bob'],
        services: ['IA'],
      });

      const judiciaryTable = judiciarySection.locator('table.govuk-table').first();
      await expect(judiciaryTable).toBeVisible();
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

    await test.step('Verify EXCLUDED grant behaviour is rendered in the Exclusions table', async () => {
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
    });
  });
});

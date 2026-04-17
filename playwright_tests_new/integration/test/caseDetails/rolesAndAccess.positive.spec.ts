import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies, buildEntityToUsersAccessView, type WorkAllocationAccessScenarioRecord } from '../../helpers';
import { buildAsylumCaseMock } from '../../mocks/cases/asylumCase.mock';

const userIdentifier = 'STAFF_ADMIN';
const caseId = '1000000000000100';
const caseMockResponse = buildAsylumCaseMock({ caseId });

const scenarioRecords: WorkAllocationAccessScenarioRecord[] = [
  {
    assignmentId: 'assignment-legal-ops-case-100',
    actorId: 'user-alice',
    actorName: 'Alice Example',
    actorEmail: 'alice@example.com',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'Case Manager',
    caseId,
    caseName: 'Access Case 100',
    caseCategory: 'Protection',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    grantType: 'SPECIFIC',
    created: '2026-01-10T12:00:00.000Z',
    start: '2026-01-11T12:00:00.000Z',
    end: '2026-02-11T12:00:00.000Z',
  },
  {
    assignmentId: 'assignment-judge-case-100',
    actorId: 'judge-bob',
    actorName: 'Bob Judge',
    actorEmail: 'judge.bob@example.com',
    roleCategory: 'JUDICIAL',
    roleName: 'Lead Judge',
    caseId,
    caseName: 'Access Case 100',
    caseCategory: 'Protection',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    grantType: 'STANDARD',
    created: '2026-01-09T12:00:00.000Z',
    start: '2026-01-10T12:00:00.000Z',
    end: '2026-02-10T12:00:00.000Z',
  },
  {
    assignmentId: 'assignment-judge-case-100-excluded',
    actorId: 'judge-bob',
    actorName: 'Bob Judge',
    actorEmail: 'judge.bob@example.com',
    roleCategory: 'JUDICIAL',
    roleName: 'Lead Judge',
    caseId,
    caseName: 'Access Case 100',
    caseCategory: 'Protection',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    grantType: 'EXCLUDED',
    created: '2026-01-15T12:00:00.000Z',
    notes: 'Judicial conflict flagged.',
  },
];

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

    await test.step('Verify only active non-excluded users remain in the case-role sections', async () => {
      await expect(judiciarySection.getByText('There are no judicial roles for this case.')).toBeVisible();

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
      const judicialLookupRequest = await judicialLookupRequestPromise;
      expect(judicialLookupRequest).toBeTruthy();
      expect(judicialLookupRequest.postDataJSON()).toEqual({
        userIds: ['judge-bob'],
        services: ['IA'],
      });

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

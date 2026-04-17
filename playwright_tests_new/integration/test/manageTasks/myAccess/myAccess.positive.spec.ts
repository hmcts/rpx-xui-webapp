import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies, buildMyAccessResponseFromScenario, setupMyAccessRoutes } from '../../../helpers';
import { buildMyAccessCases, buildMyAccessMock } from '../../../mocks/myAccess.mock';
import { formatUiDate } from '../../../utils/tableUtils';
import type { WorkAllocationAccessScenarioRecord } from '../../../helpers';

const userIdentifier = 'STAFF_ADMIN';
const scenarioActorId = 'scenario-user-alice';

const myAccessScenarioRecords: WorkAllocationAccessScenarioRecord[] = [
  {
    assignmentId: 'assignment-scenario-case-100',
    actorId: scenarioActorId,
    actorName: 'Alice Example',
    actorEmail: 'alice@example.com',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'Case Manager',
    caseId: '1000000000000100',
    caseName: 'Scenario Access Case 100',
    caseCategory: 'Protection',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    serviceLabel: 'Immigration & Asylum',
    grantType: 'SPECIFIC',
    created: '2026-01-10T12:00:00.000Z',
    start: '2026-01-11T12:00:00.000Z',
    end: '2026-02-11T12:00:00.000Z',
    myAccessRole: 'specific-access-granted',
    myAccessLabel: 'Specific access granted',
    hasAccess: true,
    isNew: false,
  },
  {
    assignmentId: 'assignment-scenario-case-200',
    actorId: scenarioActorId,
    actorName: 'Alice Example',
    actorEmail: 'alice@example.com',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'Case Allocator',
    caseId: '1000000000000200',
    caseName: 'Scenario Access Case 200',
    caseCategory: 'Human rights',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    serviceLabel: 'Immigration & Asylum',
    grantType: 'CHALLENGED',
    created: '2026-01-12T12:00:00.000Z',
    start: '2026-01-13T12:00:00.000Z',
    end: '2026-02-13T12:00:00.000Z',
    myAccessRole: 'challenged-access-legal-ops',
    myAccessLabel: 'Challenged access granted',
    hasAccess: true,
    isNew: true,
  },
  {
    assignmentId: 'assignment-scenario-case-300-active',
    actorId: scenarioActorId,
    actorName: 'Alice Example',
    actorEmail: 'alice@example.com',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'Case Manager',
    caseId: '1000000000000300',
    caseName: 'Scenario Access Case 300',
    caseCategory: 'EUSS',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    serviceLabel: 'Immigration & Asylum',
    grantType: 'SPECIFIC',
    created: '2026-01-14T12:00:00.000Z',
    start: '2026-01-15T12:00:00.000Z',
    end: '2026-02-15T12:00:00.000Z',
    myAccessRole: 'specific-access-granted',
    myAccessLabel: 'Specific access granted',
    hasAccess: true,
    isNew: false,
  },
  {
    assignmentId: 'assignment-scenario-case-300-excluded',
    actorId: scenarioActorId,
    actorName: 'Alice Example',
    actorEmail: 'alice@example.com',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'Case Manager',
    caseId: '1000000000000300',
    caseName: 'Scenario Access Case 300',
    caseCategory: 'EUSS',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    serviceLabel: 'Immigration & Asylum',
    grantType: 'EXCLUDED',
    created: '2026-01-16T12:00:00.000Z',
    notes: 'Conflict noted against the case.',
  },
];

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`My Access as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test(`User can view cases on the My access page from My work`, async ({ taskListPage, page, tableUtils }) => {
    const myAccessMockResponse = buildMyAccessMock();
    const isNewCount = (myAccessMockResponse.cases ?? []).filter((c) => c.isNew === true).length;

    await test.step('Setup route mocks for My access', async () => {
      await setupMyAccessRoutes(page, myAccessMockResponse, { newCount: isNewCount });
    });

    await test.step('Open My work and navigate to My access', async () => {
      await taskListPage.gotoMyAccess();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify the access table columns and data', async () => {
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      expect(Object.keys(table[0] ?? {})).toEqual(
        expect.arrayContaining(['Case name', 'Service', 'Case category', 'Date submitted', 'Access', 'Start', 'End'])
      );

      await expect(taskListPage.myAccessNewCasesBadge).toHaveText(`${isNewCount}`);

      for (let i = 0; i < table.length; i++) {
        const expectedCase = myAccessMockResponse.cases[i];
        expect(table[i]['Case name']).toBe(expectedCase.case_name);
        expect(table[i]['Service']).toBe(expectedCase.expectedServiceLabel);
        expect(table[i]['Case category']).toBe(expectedCase.case_category);
        expect(table[i]['Date submitted']).toBe(formatUiDate(expectedCase.dateSubmitted));
        expect(table[i]['Access']).toBe(expectedCase.access);
        expect(table[i]['Start']).toBe(expectedCase.startDate);
        expect(table[i]['End']).toBe(expectedCase.endDate);
      }
    });

    await test.step('Verify rows with access render case name links to case details', async () => {
      for (const c of myAccessMockResponse.cases.filter((item) => item.hasAccess)) {
        const caseLink = taskListPage.taskListTable.getByRole('link', { name: c.case_name }).first();
        await expect(taskListPage.taskListTable.getByRole('link', { name: c.case_name })).toBeVisible();
        await expect(caseLink).toBeVisible();
        await expect(caseLink).toHaveAttribute('href', `/cases/case-details/${c.jurisdictionId}/${c.case_type}/${c.case_id}`);
      }
    });

    await test.step('Verify denied access rows render the trailing View link instead of a case link', async () => {
      const deniedCase = myAccessMockResponse.cases.find((c) => c.role === 'specific-access-denied');
      const deniedRow = taskListPage.taskListTable
        .locator('tr')
        .filter({ hasText: deniedCase?.case_name ?? '' })
        .first();
      const deniedCaseLink = deniedRow.getByRole('link', { name: deniedCase?.case_name ?? '' });
      const viewLink = deniedRow.locator('a.xui-access-view-field');

      await expect(deniedCaseLink).toHaveCount(0);
      await expect(viewLink).toBeVisible();
      await expect(viewLink).toHaveText('View');
    });
  });

  test(`Large datasets render correctly`, async ({ taskListPage, tableUtils, page }) => {
    const myAccessMockResponse = buildMyAccessCases(999);
    const isNewCount = (myAccessMockResponse.cases ?? []).filter((c) => c.isNew === true).length;

    await test.step('Setup route mocks for a large datasets', async () => {
      await setupMyAccessRoutes(page, myAccessMockResponse, { newCount: isNewCount });
    });

    await test.step('Open My access with the large dataset', async () => {
      await taskListPage.gotoMyAccess();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Check large dataset rendering', async () => {
      await expect(taskListPage.myAccessNewCasesBadge).toHaveText(`${isNewCount}`);
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      for (let i = 0; i < table.length; i++) {
        const expectedCase = myAccessMockResponse.cases[i];
        expect(table[i]['Case name']).toBe(expectedCase.case_name);
        expect(table[i]['Service']).toBe(expectedCase.expectedServiceLabel);
        expect(table[i]['Case category']).toBe(expectedCase.case_category);
        expect(table[i]['Date submitted']).toBe(formatUiDate(expectedCase.dateSubmitted));
        expect(table[i]['Access']).toBe(expectedCase.access);
        expect(table[i]['Start']).toBe(expectedCase.startDate);
        expect(table[i]['End']).toBe(expectedCase.endDate);
      }
    });
  });

  test(`Scenario-driven access queries exclude conflicts from the My access view`, async ({ taskListPage, page, tableUtils }) => {
    const scenarioResponse = buildMyAccessResponseFromScenario(myAccessScenarioRecords, scenarioActorId);
    const isNewCount = scenarioResponse.cases.filter((item) => item.isNew).length;

    await test.step('Setup a scenario-driven My access response', async () => {
      await setupMyAccessRoutes(page, scenarioResponse, { newCount: isNewCount });
    });

    await test.step('Open My access and wait for the mocked scenario data', async () => {
      await taskListPage.gotoMyAccess();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Verify user->entities results include only active, non-excluded assignments', async () => {
      const table = await tableUtils.parseWorkAllocationTable(taskListPage.taskListTable);
      const visibleCaseNames = table.map((row) => row['Case name']);

      expect(visibleCaseNames).toEqual(['Scenario Access Case 100', 'Scenario Access Case 200']);
      expect(visibleCaseNames).not.toContain('Scenario Access Case 300');
      await expect(taskListPage.myAccessNewCasesBadge).toHaveText('1');
      expect(table[0]['Access']).toBe('Specific access granted');
      expect(table[1]['Access']).toBe('Challenged access granted');
    });
  });
});

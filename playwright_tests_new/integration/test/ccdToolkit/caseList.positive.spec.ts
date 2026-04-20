import type { Route } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  assertNgIntegrationToolkitFieldsVisible,
  assertNgIntegrationToolkitFixedListOptions,
  fillNgIntegrationToolkitFilters,
  setupNgIntegrationToolkitRoutes,
} from '../../helpers';
import {
  buildNgIntegrationToolkitSearchResults,
  buildNgIntegrationToolkitWorkbasketConfig,
  type NgIntegrationToolkitConfigField,
  type NgIntegrationToolkitSearchConfig,
} from '../../mocks/ngIntegration.mock';

const authenticatedUserIdentifier = 'STAFF_ADMIN';
const workbasketConfig = buildNgIntegrationToolkitWorkbasketConfig() as NgIntegrationToolkitSearchConfig;
const workbasketFields = workbasketConfig.workbasketInputs ?? [];

function normalizeCellValue(value: string | undefined): string {
  return (value ?? '').replaceAll('-', '').replaceAll(/\s+/g, ' ').trim();
}

function normalizeExpectedValue(value: string | string[] | undefined): string {
  return normalizeCellValue(Array.isArray(value) ? value.join(' ') : value);
}

function assertCaseListSearchParams(route: Route | undefined, expectedFilters: Record<string, string | string[] | null>): void {
  expect(route, 'expected the case-list search request to be captured').toBeTruthy();
  const searchParams = new URL(route!.request().url()).searchParams;

  for (const [fieldId, value] of Object.entries(expectedFilters)) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        expect(searchParams.get(`case.${fieldId}.${index}`)).toBe(item);
      });
      continue;
    }

    expect(searchParams.get(`case.${fieldId}`)).toBe(value);
  }
}

test.describe('CCD toolkit case list parity', { tag: ['@integration', '@integration-ccd-toolkit'] }, () => {
  test('covers the legacy case-list navigation, filters, values, and pagination behaviour', async ({
    caseListPage,
    page,
    tableUtils,
  }) => {
    let lastSearchRoute: Route | undefined;

    await applySessionCookies(page, authenticatedUserIdentifier);
    await setupNgIntegrationToolkitRoutes(page, {
      source: 'workbasket',
      onSearchRequest: (route) => {
        lastSearchRoute = route;
      },
    });

    await test.step('Navigate to the case list and verify the workbasket fields are rendered', async () => {
      await caseListPage.navigateTo();
      await expect(caseListPage.exuiHeader.header).toBeVisible();
      await assertNgIntegrationToolkitFieldsVisible(
        caseListPage.filtersContainer,
        workbasketFields as NgIntegrationToolkitConfigField[]
      );
    });

    await test.step('Verify the fixed list and radio-backed filter options match the legacy config', async () => {
      await assertNgIntegrationToolkitFixedListOptions(
        caseListPage.filtersContainer,
        workbasketFields as NgIntegrationToolkitConfigField[]
      );
    });

    await test.step('Apply populated filters and verify the outgoing request matches the legacy query shape', async () => {
      const enteredValues = await fillNgIntegrationToolkitFilters(
        caseListPage.filtersContainer,
        workbasketFields as NgIntegrationToolkitConfigField[]
      );

      await caseListPage.applyFilters();

      await expect.poll(() => Boolean(lastSearchRoute)).toBe(true);

      assertCaseListSearchParams(lastSearchRoute, enteredValues);
    });

    await test.step('Verify the case-list table headers and values match the mocked CCD toolkit response', async () => {
      const expectedResponse = buildNgIntegrationToolkitSearchResults('workbasket', { pageNumber: 1, total: 26 });
      const renderedRows = await tableUtils.parseDataTable(caseListPage.caseResultsTable);

      expect(renderedRows).toHaveLength(25);
      expect(await caseListPage.caseListResultsAmount.textContent()).toContain('Showing 1 to 25 of 26 results');

      const firstRow = renderedRows[0];
      for (const column of expectedResponse.columns) {
        expect(firstRow).toHaveProperty(column.label);
      }

      const expectedCaseFields = expectedResponse.results[0].case_fields as Record<string, string | string[]>;
      const expectedFormattedCaseFields = expectedResponse.results[0].case_fields_formatted as Record<string, string | string[]>;
      expect(normalizeCellValue(firstRow['Case reference'])).toBe(String(expectedCaseFields['[CASE_REFERENCE]'] ?? ''));
      for (const field of workbasketFields) {
        expect(normalizeCellValue(firstRow[field.label])).toBe(
          normalizeExpectedValue(expectedFormattedCaseFields[field.field.id])
        );
      }
    });

    await test.step('Verify next and previous pagination actions reload the expected result set', async () => {
      await expect(caseListPage.pagination.getByText('Next', { exact: true })).toBeVisible();
      await expect(caseListPage.pagination.getByText('Previous', { exact: true })).not.toBeVisible();

      await caseListPage.pagination.getByText('Next', { exact: true }).click();
      await expect(caseListPage.caseListResultsAmount).toContainText('Showing 26 to 26 of 26 results');
      await expect(caseListPage.pagination.getByText('Previous', { exact: true })).toBeVisible();

      await caseListPage.pagination.getByText('Previous', { exact: true }).click();
      await expect(caseListPage.caseListResultsAmount).toContainText('Showing 1 to 25 of 26 results');
    });
  });
});

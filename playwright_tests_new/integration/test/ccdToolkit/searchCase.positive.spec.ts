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
  buildNgIntegrationToolkitSearchInputConfig,
  buildNgIntegrationToolkitSearchResults,
  NG_INTEGRATION_TOOLKIT_CASE_TYPE_NAME,
  NG_INTEGRATION_TOOLKIT_JURISDICTION_NAME,
  type NgIntegrationToolkitConfigField,
  type NgIntegrationToolkitSearchConfig,
} from '../../mocks/ngIntegration.mock';

const authenticatedUserIdentifier = 'STAFF_ADMIN';
const searchInputConfig = buildNgIntegrationToolkitSearchInputConfig() as NgIntegrationToolkitSearchConfig;
const searchFields = searchInputConfig.searchInputs ?? [];

function normalizeCellValue(value: string | undefined): string {
  return (value ?? '').replaceAll('-', '').replaceAll(/\s+/g, ' ').trim();
}

function normalizeExpectedValue(value: string | string[] | undefined): string {
  return normalizeCellValue(Array.isArray(value) ? value.join(' ') : value);
}

function assertSearchCaseParams(route: Route | undefined, expectedFilters: Record<string, string | string[] | null>): void {
  expect(route, 'expected the search-case request to be captured').toBeTruthy();
  const searchParams = new URL(route!.request().url()).searchParams;

  for (const [fieldId, value] of Object.entries(expectedFilters)) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        expect(searchParams.get(`case.${fieldId}.${index}`)).toBe(item);
      });
      continue;
    }

    const normalizedKey = fieldId.toLowerCase();
    expect(searchParams.get(normalizedKey)).toBe(value);
  }
}

test.describe('CCD toolkit search-case parity', { tag: ['@integration', '@integration-ccd-toolkit'] }, () => {
  test('covers the legacy search-case navigation, filters, values, and pagination behaviour', async ({
    findCasePage,
    page,
    tableUtils,
  }) => {
    let lastSearchRoute: Route | undefined;

    await applySessionCookies(page, authenticatedUserIdentifier);
    await setupNgIntegrationToolkitRoutes(page, {
      source: 'search',
      onSearchRequest: (route) => {
        lastSearchRoute = route;
      },
    });

    await test.step('Navigate to search case and select the legacy jurisdiction and case type', async () => {
      await page.goto('/cases/case-search', { waitUntil: 'domcontentloaded' });
      await expect(findCasePage.pageHeading).toBeVisible();
      await findCasePage.jurisdictionSelect.selectOption({ label: NG_INTEGRATION_TOOLKIT_JURISDICTION_NAME });
      await findCasePage.caseTypeSelect.selectOption({ label: NG_INTEGRATION_TOOLKIT_CASE_TYPE_NAME });
      await assertNgIntegrationToolkitFieldsVisible(
        findCasePage.filtersContainer,
        searchFields as NgIntegrationToolkitConfigField[]
      );
    });

    await test.step('Verify the fixed-list and radio options match the legacy search config', async () => {
      await assertNgIntegrationToolkitFixedListOptions(
        findCasePage.filtersContainer,
        searchFields as NgIntegrationToolkitConfigField[]
      );
    });

    await test.step('Apply populated search filters and verify the outgoing request uses the legacy lower-case query keys', async () => {
      const enteredValues = await fillNgIntegrationToolkitFilters(
        findCasePage.filtersContainer,
        searchFields as NgIntegrationToolkitConfigField[]
      );

      await findCasePage.applyFilters();

      await expect.poll(() => Boolean(lastSearchRoute)).toBe(true);

      assertSearchCaseParams(lastSearchRoute, enteredValues);
    });

    await test.step('Verify the rendered result headers and first-row values match the mocked CCD toolkit response', async () => {
      const expectedResponse = buildNgIntegrationToolkitSearchResults('search', { pageNumber: 1, total: 26 });
      const renderedRows = await tableUtils.parseDataTable(findCasePage.searchResultsDataTable);

      expect(renderedRows).toHaveLength(25);
      await expect(findCasePage.searchResultsSummary).toContainText('Showing 1 to 25 of 26 results');

      const firstRow = renderedRows[0];
      const expectedCaseFields = expectedResponse.results[0].case_fields as Record<string, string | string[]>;
      const expectedFormattedCaseFields = expectedResponse.results[0].case_fields_formatted as Record<string, string | string[]>;

      expect(normalizeCellValue(firstRow['Case reference'])).toBe(String(expectedCaseFields['[CASE_REFERENCE]'] ?? ''));
      for (const field of searchFields) {
        expect(normalizeCellValue(firstRow[field.label])).toBe(
          normalizeExpectedValue(expectedFormattedCaseFields[field.field.id])
        );
      }
    });

    await test.step('Verify next and previous pagination actions load the expected page ranges', async () => {
      await expect(findCasePage.pagination.getByText('Next', { exact: true })).toBeVisible();
      await expect(findCasePage.pagination.getByText('Previous', { exact: true })).not.toBeVisible();

      await findCasePage.pagination.getByText('Next', { exact: true }).click();
      await expect(findCasePage.searchResultsSummary).toContainText('Showing 26 to 26 of 26 results');
      await expect(findCasePage.pagination.getByText('Previous', { exact: true })).toBeVisible();

      await findCasePage.pagination.getByText('Previous', { exact: true }).click();
      await expect(findCasePage.searchResultsSummary).toContainText('Showing 1 to 25 of 26 results');
    });
  });
});

import { expect, test } from '@playwright/test';
import { FindCasePage } from '../../../E2E/page-objects/pages/exui/findCase.po';
import { createFindCaseSearchResultsRouteHandler, setupFindCaseMockRoutes } from '../../helpers/caseSearchMockRoutes.helper';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import {
  buildFindCaseEmptySearchResultsMock,
  buildFindCaseJurisdictionsMock,
  buildFindCaseSearchResultsMock,
  buildFindCaseWorkBasketInputsMock,
  FIND_CASE_CASE_TYPE_LABEL,
  FIND_CASE_JURISDICTION_LABEL,
  getCaseReferenceFromFindCaseSearchPayload,
} from '../../mocks/findCase.mock';
import { TEST_CASE_REFERENCES } from '../../testData';

for (const width of [1280, 320]) {
  test.describe(`Find case at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    test.beforeEach(() => {
      test.skip(width === 320 && process.env.MIGRATION_STRICT_REFLOW !== 'true', 'Enable strict narrow reflow');
    });

    test(
      'shows distinct result and no-result states with usable search filters',
      { tag: '@migration-sweep' },
      async ({ page }, testInfo) => {
        const existingCaseReference = TEST_CASE_REFERENCES.FIND_CASE_EXISTING;
        await setupMigrationVisualRoutes(page, ['caseworker-cmc']);
        await setupFindCaseMockRoutes(page, {
          jurisdictions: buildFindCaseJurisdictionsMock(),
          workBasketInputs: buildFindCaseWorkBasketInputsMock(),
          searchResultsHandler: createFindCaseSearchResultsRouteHandler({
            existingCaseReference,
            matchingResponse: buildFindCaseSearchResultsMock(existingCaseReference),
            noMatchResponse: buildFindCaseEmptySearchResultsMock(),
            getCaseReferenceFromPayload: getCaseReferenceFromFindCaseSearchPayload,
          }),
        });
        const search = new FindCasePage(page);
        await page.goto('/cases');
        await search.navigateToFindCase();
        await search.fillSearchCriteria(existingCaseReference, FIND_CASE_CASE_TYPE_LABEL, FIND_CASE_JURISDICTION_LABEL);
        await search.submitSearch();
        await expect(search.searchResultsSummary).toContainText('Showing 1 to 1 of 1 results');
        await expect(search.firstRowOfSearchResultsTable).toBeVisible();
        expect((await search.firstRowOfSearchResultsTable.innerText()).replaceAll(/\D/g, '')).toBe(existingCaseReference);
        const populated = await captureMigrationState(page, testInfo, 'search-populated');
        expect.soft(populated.documentWidth, 'Search results should fit the viewport').toBeLessThanOrEqual(width + 1);
        expect.soft(populated.violations).toEqual([]);

        await page.goto('/cases');
        await search.navigateToFindCase();
        await search.fillSearchCriteria(
          TEST_CASE_REFERENCES.FIND_CASE_NON_EXISTENT,
          FIND_CASE_CASE_TYPE_LABEL,
          FIND_CASE_JURISDICTION_LABEL
        );
        await search.submitSearch();
        await expect(search.searchResultsContainer).toContainText(/No cases found|There are no cases that match your selection/i);
        await expect(search.searchResultsDataTable).toBeHidden();
        const empty = await captureMigrationState(page, testInfo, 'search-no-results');
        expect.soft(empty.documentWidth, 'No-results page should fit the viewport').toBeLessThanOrEqual(width + 1);
        expect.soft(empty.violations).toEqual([]);
      }
    );
  });
}

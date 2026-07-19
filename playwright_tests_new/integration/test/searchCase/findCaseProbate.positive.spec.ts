import { expect, test } from '../../../E2E/fixtures';
import {
  buildFindCaseCaseDetailsMock,
  buildFindCaseEmptySearchResultsMock,
  buildFindCaseSearchResultsMock,
  getCaseReferenceFromFindCaseSearchPayload,
} from '../../mocks/findCase.mock';
import {
  buildProbateFindCaseJurisdictionsMock,
  buildProbateFindCaseWorkBasketInputsMock,
  PROBATE_FIND_CASE_CASE_TYPE_LABEL,
  PROBATE_FIND_CASE_JURISDICTION_LABEL,
} from '../../mocks/probateFindCase.mock.ts';
import {
  applyProbateSearchCaseSessionCookies,
  applySearchCaseSessionCookies,
  createFindCaseSearchResultsRouteHandler,
  setupFindCaseMockRoutes,
} from '../../helpers';
import { TEST_CASE_REFERENCES } from '../../testData';

const existingCaseReference = TEST_CASE_REFERENCES.FIND_CASE_EXISTING;
const nonExistentCaseReference = TEST_CASE_REFERENCES.FIND_CASE_NON_EXISTENT;
const probateJurisdictionMock = buildProbateFindCaseJurisdictionsMock('PROBATE');
const probateWorkBasketInputsMock = buildProbateFindCaseWorkBasketInputsMock();

test.beforeEach(async ({ page }, testInfo) => {
  await applyProbateSearchCaseSessionCookies(page, testInfo);

  await setupFindCaseMockRoutes(page, {
    jurisdictions: probateJurisdictionMock,
    workBasketInputs: probateWorkBasketInputsMock,
    searchResultsHandler: createFindCaseSearchResultsRouteHandler({
      existingCaseReference,
      matchingResponse: buildFindCaseSearchResultsMock(existingCaseReference),
      noMatchResponse: buildFindCaseEmptySearchResultsMock(),
      getCaseReferenceFromPayload: getCaseReferenceFromFindCaseSearchPayload,
    }),
    caseDetailsHandler: async (route) => {
      const requestUrl = route.request().url();
      const caseReference = requestUrl.split('/').pop() ?? existingCaseReference;
      const body = JSON.stringify(buildFindCaseCaseDetailsMock(caseReference));
      await route.fulfill({ status: 200, contentType: 'application/json', body });
    },
  });
});

test.describe('Find Case with prewarmed search session', { tag: ['@integration', '@integration-probate-find-case'] }, () => {
  test('Probate Caseworker attempts to retrieve an existing case using work basket Filter', async ({
    caseListPage,
    findCasePage,
    page,
  }) => {
    await test.step('Open Find case from Main Menu and choose Handoff Reason Filters', async () => {
      await caseListPage.navigateTo();
      await findCasePage.startProbateFindCaseJourney(
        existingCaseReference,
        PROBATE_FIND_CASE_CASE_TYPE_LABEL,
        PROBATE_FIND_CASE_JURISDICTION_LABEL
      );

      const [request] = await Promise.all([
        page.waitForRequest((req) => req.url().includes('/searchCases') && req.method() === 'POST'),
        await findCasePage.applyFilters(),
      ]);

      const params = new URL(request.url()).searchParams;

      const raw = params.get('case.boHandoffReasonList.value.caseHandoffReason');
      expect(raw, 'handoff reason param missing from query string').not.toBeNull();
      let reasons: string[] = [];
      if (raw) {
        reasons = raw.split(',');
        console.log('.......reasons for the boHandOff ....', reasons);
      }

      //expect(reasons.sort()).toEqual(['DoubleProbate', 'Horizon Scheme', 'Literary Estate'].sort());

      await page.waitForTimeout(100_000);
    });

    await test.step('Verify result row contains the searched case reference', async () => {
      await findCasePage.searchResultsDataTable.waitFor({ state: 'visible' });
      await expect(findCasePage.searchResultsSummary).toContainText('Showing 1 to 1 of 1 results');
      await expect(findCasePage.firstRowOfSearchResultsTable).toBeVisible();
      const firstResultText = (await findCasePage.firstRowOfSearchResultsTable.first().textContent()) ?? '';
      expect(firstResultText.replaceAll(/\D/g, '')).toContain(existingCaseReference);
    });

    await test.step('Verify results remain on Find case page after filtering', async () => {
      await expect(page).toHaveURL(/\/cases\/case-search/);
    });
  });
});

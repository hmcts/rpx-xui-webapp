import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  buildFindCaseCaseDetailsMock,
  buildFindCaseEmptySearchResultsMock,
  buildFindCaseJurisdictionsMock,
  buildFindCaseSearchResultsMock,
  buildFindCaseWorkBasketInputsMock,
  FIND_CASE_CASE_TYPE_LABEL,
  FIND_CASE_JURISDICTION_LABEL,
  getCaseReferenceFromFindCaseSearchPayload,
} from '../../mocks/findCase.mock';
import { setupFindCaseMockRoutes } from '../../helpers/caseSearchMockRoutes.helper';
import { TEST_CASE_REFERENCES, TEST_USERS } from '../../testData/caseReferences';

const userIdentifier = TEST_USERS.FPL_GLOBAL_SEARCH;
const existingCaseReference = TEST_CASE_REFERENCES.FIND_CASE_EXISTING;
const nonExistentCaseReference = TEST_CASE_REFERENCES.FIND_CASE_NON_EXISTENT;
const jurisdictionMock = buildFindCaseJurisdictionsMock();
const workBasketInputsMock = buildFindCaseWorkBasketInputsMock();

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);

  await setupFindCaseMockRoutes(page, {
    jurisdictions: jurisdictionMock,
    workBasketInputs: workBasketInputsMock,
    searchResultsHandler: async (route) => {
      const requestUrl = route.request().url();
      const rawPayload = route.request().postData();
      let searchPayload: unknown;
      if (rawPayload) {
        try {
          searchPayload = JSON.parse(rawPayload) as unknown;
        } catch {
          searchPayload = undefined;
        }
      }
      const requestedCaseReference = getCaseReferenceFromFindCaseSearchPayload(searchPayload);
      const decodedUrl = decodeURIComponent(requestUrl);
      const caseRefPattern = /\d{16}/;
      const caseReferenceFromUrl = caseRefPattern.exec(decodedUrl)?.[0];
      const isExistingCaseSearch =
        requestedCaseReference === existingCaseReference ||
        Boolean(rawPayload?.includes(existingCaseReference)) ||
        caseReferenceFromUrl === existingCaseReference ||
        decodedUrl.includes(existingCaseReference);
      const response = isExistingCaseSearch
        ? buildFindCaseSearchResultsMock(existingCaseReference)
        : buildFindCaseEmptySearchResultsMock();

      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(response) });
    },
    caseDetailsHandler: async (route) => {
      const requestUrl = route.request().url();
      const caseReference = requestUrl.split('/').pop() ?? existingCaseReference;
      const body = JSON.stringify(buildFindCaseCaseDetailsMock(caseReference));
      await route.fulfill({ status: 200, contentType: 'application/json', body });
    },
  });
});

test.describe(`Find Case as ${userIdentifier}`, () => {
  test('User can find an existing case from Find case filters', async ({ caseListPage, findCasePage, page }) => {
    await test.step('Open Find case from main menu and apply filters with 16-digit reference', async () => {
      await caseListPage.navigateTo();
      await findCasePage.startFindCaseJourney(existingCaseReference, FIND_CASE_CASE_TYPE_LABEL, FIND_CASE_JURISDICTION_LABEL);
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

  test('User sees no cases found message for non-existent 16-digit case reference', async ({ caseListPage, findCasePage }) => {
    await test.step('Open Find case from main menu and search for a non-existent reference', async () => {
      await caseListPage.navigateTo();
      await findCasePage.startFindCaseJourney(nonExistentCaseReference, FIND_CASE_CASE_TYPE_LABEL, FIND_CASE_JURISDICTION_LABEL);
    });

    await test.step('Verify empty results message is displayed', async () => {
      const resultsText = (await findCasePage.searchResultsContainer.textContent()) ?? '';
      expect(resultsText).toMatch(/No cases found|There are no cases that match your selection/i);
      await expect(findCasePage.searchResultsDataTable).toBeHidden();
    });
  });
});

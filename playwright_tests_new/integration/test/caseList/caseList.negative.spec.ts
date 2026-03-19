import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { HttpStatusCode } from 'axios';
import { buildCaseListJurisdictionsMock, buildCaseListMockErrorResponse, buildCaseListMock } from '../../mocks/caseList.mock';

const userIdentifier = 'SOLICITOR';
const caseListJurisdictionsMock = buildCaseListJurisdictionsMock();
const caseListMockResponse = buildCaseListMock(15);

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);

  await page.route('**/caseworkers/**/jurisdictions*', async (route) => {
    const body = JSON.stringify(caseListJurisdictionsMock);
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });

  await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route) => {
    const body = JSON.stringify({ workbasketInputs: [] });
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });
});

// Covers HTTP Error codes 400,500 and 503
test.describe(`Error codes returned on /searchCases call for ${userIdentifier}`, () => {
  test(`User ${userIdentifier} encounters a error on the case list page`, async ({ caseListPage, createCasePage, page }) => {
    await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
      const errorCodes = [HttpStatusCode.BadRequest, HttpStatusCode.InternalServerError, HttpStatusCode.ServiceUnavailable];

      for (const errorCode of errorCodes) {
        await page.route('**/data/internal/searchCases*', async (route) => {
          const body = JSON.stringify(buildCaseListMockErrorResponse(errorCode));
          await route.fulfill({ status: errorCode.valueOf(), contentType: 'application/json', body });
        });

        await test.step('Navigate to the search page', async () => {
          await caseListPage.navigateTo();
        });

        await test.step('Verify user can see the WorkBasket Filter layout', async () => {
          expect(caseListPage.filtersContainer).toBeVisible();

          await test.step('Verify user sees empty case list UI', async () => {
            await expect(caseListPage.jurisdictionSelect).toBeVisible();
            await expect(caseListPage.exuiHeader.header).toBeVisible();
            await expect(caseListPage.caseSearchResultsMessage).not.toBeVisible();
          });
        });
      }
    });
  });
});

test.describe(`Mimic Slow Response Times on  /searchCases call for ${userIdentifier}`, () => {
  test(`User ${userIdentifier} encounters a slow response time on load of the case list page`, async ({
    caseListPage,
    tableUtils,
    page,
  }) => {
    await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
      await page.route('**/data/internal/searchCases*', async (route) => {
        const body = JSON.stringify(caseListMockResponse);
        // 5 second delay
        await caseListPage.waitForSpinnerToComplete('Slow response in call to /searchCase ES endpoint', 5000);
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });

      await test.step('Navigate to the search page', async () => {
        await caseListPage.navigateTo();
      });

      await test.step('Verify user can see the WorkBasket Filter layout', async () => {
        expect(caseListPage.filtersContainer).toBeVisible();

        await test.step('Verify user can see a list of cases in  expected layout given the mock response', async () => {
          expect(await caseListPage.caseListResultsAmount.textContent()).toBe(
            `Showing 1 to ${Math.min(caseListMockResponse.results.length, 25)} of ${caseListMockResponse.total} results`
          );
          const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
          expect(table.length).toBe(caseListMockResponse.results.length);
          for (let i = 0; i < caseListMockResponse.results.length; i++) {
            const expectedFields = caseListMockResponse.results[i].case_fields;
            expect(table[i]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
            expect(table[i]['Text Field 0']).toBe(expectedFields['TextField0']);
            expect(table[i]['Text Field 1']).toBe(expectedFields['TextField1']);
            expect(table[i]['Text Field 2']).toBe(expectedFields['TextField2']);
          }
          expect(await caseListPage.pagination.isVisible()).toBeFalsy();
        });
      });
    });
  });
});

test.describe(`Malformed Response received on /searchCases call for ${userIdentifier}`, () => {
  test(`User ${userIdentifier} encounters a error on the case list page`, async ({ caseListPage, createCasePage, page }) => {
    await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
      await page.route('**/data/internal/searchCases*', async (route) => {
        const body = JSON.stringify({
          columnsZ: [],
          resultsZ: [],
          totalZ: 0,
        });
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
      await test.step('Navigate to the search page', async () => {
        await caseListPage.navigateTo();
      });
      await test.step('Verify user can see the WorkBasket Filter layout', async () => {
        expect(caseListPage.filtersContainer).toBeVisible();

        await test.step('Verify user sees empty case list UI', async () => {
          await expect(caseListPage.jurisdictionSelect).toBeVisible();
          await expect(caseListPage.exuiHeader.header).toBeVisible();
          await expect(caseListPage.caseSearchResultsMessage).not.toBeVisible();
        });
      });
    });
  });
});

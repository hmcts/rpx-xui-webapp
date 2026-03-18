import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { HttpStatusCode } from 'axios';
import { buildCaseListJurisdictionsMock, buildCaseListMockErrorResponse, buildCaseListMock } from '../../mocks/caseList.mock';
import { createCase } from '../../../../playwright_tests/E2E/steps/create-xui-case-poc-steps.ts';

const userIdentifier = 'SOLICITOR';
const caseListJurisdictionsMock = buildCaseListJurisdictionsMock();
const buildsCaseListMock = buildCaseListMock(15);

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

//400,500,503
test.skip(`Error codes returned on /searchCases call for ${userIdentifier}`, () => {
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
      } // end-for
    });
  });
});

test.describe(`Slow Response Times on  /searchCases call for ${userIdentifier}`, () => {
  test(`User ${userIdentifier} encounters a slow response time on load of the case list page`, async ({ caseListPage, page }) => {
    await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
      //const errorCodes = [HttpStatusCode.BadRequest, HttpStatusCode.InternalServerError, HttpStatusCode.ServiceUnavailable];

      await page.route('**/data/internal/searchCases*', async (route) => {
        const body = JSON.stringify(buildsCaseListMock);
        // 5 second delay
        await new Promise((resolve) => setTimeout(resolve, 20000));
        //await waitForSpinnerToComplete('after submitting employment case');
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

// //500
// test.describe(`500 InternalServerError  returned on /searchCases call for  ${userIdentifier}`, () => {
//   test(`User ${userIdentifier} encounters a 400 error on the case list page`, async ({ caseListPage, tableUtils, page }) => {
//     await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
//       await page.route('**/data/internal/searchCases*', async (route) => {
//         const body = JSON.stringify(buildCaseListMockErrorResponse(HttpStatusCode.ServiceUnavailable));
//         await route.fulfill({ status: 500, contentType: 'application/json', body });
//       });
//     });
//     await test.step('Navigate to the search page', async () => {
//       await caseListPage.navigateTo();
//     });
//     await test.step('Verify user can see the WorkBaseket Filter layout', async () => {
//       expect(caseListPage.filtersContainer).toBeVisible();
//
//       await test.step('Verify user sees empty case list UI', async () => {
//         await expect(caseListPage.jurisdictionSelect).toBeVisible();
//         await expect(caseListPage.exuiHeader.header).toBeVisible();
//         await expect(caseListPage.searchResultsHeadingText).not.toBeVisible();
//       });
//     });
//   });
// });
//
// //503
// test.describe(`503 ServiceUnavailable returned on /searchCases call for  ${userIdentifier}`, () => {
//   test(`User ${userIdentifier} encounters a 503 error on the case list page`, async ({ caseListPage, tableUtils, page }) => {
//     await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
//       await page.route('**/data/internal/searchCases*', async (route) => {
//         const body = JSON.stringify(buildCaseListMockErrorResponse(HttpStatusCode.ServiceUnavailable));
//         await route.fulfill({ status: 503, contentType: 'application/json', body });
//       });
//     });
//     await test.step('Navigate to the search page', async () => {
//       await caseListPage.navigateTo();
//     });
//     await test.step('Verify user can see the WorkBaseket Filter layout', async () => {
//       expect(caseListPage.filtersContainer).toBeVisible();
//
//       await test.step('Verify user sees empty case list UI', async () => {
//         await expect(caseListPage.jurisdictionSelect).toBeVisible();
//         await expect(caseListPage.exuiHeader.header).toBeVisible();
//         await expect(caseListPage.searchResultsHeadingText).not.toBeVisible();
//       });
//     });
//   });
// });

///////
// 403
// test.skip(`403 Forbidden returned on /searchCases call for  ${userIdentifier}`, () => {
//   test(`User ${userIdentifier} encounters a 400 error on the case list page`, async ({ caseListPage, tableUtils, page }) => {
//     await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
//       await page.route('**/data/internal/searchCases*', async (route) => {
//         const body = JSON.stringify(buildCaseListMockErrorResponse(HttpStatusCode.Forbidden));
//         await route.fulfill({ status: 403, contentType: 'application/json', body });
//       });
//     });
//     await test.step('Navigate to the search page', async () => {
//       await caseListPage.navigateTo();
//     });
//     await test.step('Verify user can see the WorkBaseket Filter layout', async () => {
//       expect(caseListPage.filtersContainer).toBeVisible();
//
//       await test.step('Verify user sees empty case list UI', async () => {
//         await expect(caseListPage.jurisdictionSelect).toBeVisible();
//         await expect(caseListPage.exuiHeader.header).toBeVisible();
//         await expect(caseListPage.caseSearchResultsMessage).not.toBeVisible();
//       });
//     });
//   });
// });

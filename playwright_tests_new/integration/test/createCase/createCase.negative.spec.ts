import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.SOLICITOR;
const jurisdiction = 'DIVORCE';
const caseType = 'xuiTestJurisdiction';
const createCaseSubmissionEndpointPatterns: RegExp[] = [
  /\/cases\/\d+\/events(?:\/|$)/,
  /\/cases\/\d+\/event-triggers\/[^/]+(?:\/|$)/,
  /\/event-triggers\/[^/]+\/validate(?:\/|$)/,
];

test.beforeEach(async ({ page }) => {
  // Lazy capture: only log in SOLICITOR when this test suite runs
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Create case as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} should not be able to submit a case without filling in required fields`, async ({
    createCasePage,
    caseListPage,
    page,
  }) => {
    await test.step('Navigate to the submit case page without filling in case details', async () => {
      createCasePage.clearApiCalls();
      await page.goto(`/cases/case-create/${jurisdiction}/${caseType}/createCase/submit`);
    });

    await test.step('Verify direct submit is blocked and warning modal is shown', async () => {
      await expect(createCasePage.exuiHeader.header).toBeVisible();
      await expect(createCasePage.testSubmitButton).not.toBeVisible();
      await expect(createCasePage.refreshModalConfirmButton).toBeVisible();
      await expect(createCasePage.refreshModal).toBeVisible();
      await createCasePage.refreshModalConfirmButton.click();
    });

    await test.step('Verify user is returned to case list and not to case details', async () => {
      await expect(page).toHaveURL(/\/cases(?:[/?#]|$)/);
      await expect(caseListPage.caseListHeading).toBeVisible();
      await expect(createCasePage.exuiCaseDetailsComponent.caseHeader).not.toBeVisible();
    });

    await test.step('Verify no create-case submission API request was made', async () => {
      const createCaseSubmissionCalls = createCasePage.getApiCalls().filter((call) => {
        if (call.method !== 'POST') {
          return false;
        }
        return createCaseSubmissionEndpointPatterns.some((pattern) => pattern.test(call.url));
      });

      expect(
        createCaseSubmissionCalls,
        `Expected no create-case submission requests, but found: ${JSON.stringify(createCaseSubmissionCalls)}`
      ).toHaveLength(0);
    });
  });
});

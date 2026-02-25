import { test, expect} from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.SOLICITOR;
const jurisdiction = 'DIVORCE';
const caseType = 'XUI Case PoC';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Create case as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} can create a case`, async ({ createCasePage, caseListPage, page }) => {
    await test.step('Navigate to the create case page and fill in case details', async () => {
      await caseListPage.navigateTo();
      await createCasePage.createCaseButton.click();
      await createCasePage.createCase(jurisdiction, caseType,'');
      await expect(createCasePage.person1Title).toBeVisible();
    });

  });
});

import { test, expect } from '../../fixtures';
import { ValidatorUtils } from '../../../E2E/utils/validator.utils.ts';
import { loadSessionCookies } from '../../../common/sessionCapture.ts';

// TODO New Case should be created using a API script.
const caseNumber = '1770053602713005';

const validatorUtils = new ValidatorUtils();

test.describe('IDAM login for Find Search page @KSM', () => {
  let jurisdiction = '';
  let caseType = '';
  let sessionCookies: any[] = [];
  test.beforeEach(async ({ page }) => {
    const { cookies } = loadSessionCookies('FPL_GLOBAL_SEARCH');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }
    await page.goto('/');
  });

  test('Find Case using Public Law Jurisdiction @KSM ', async ({ tableUtils, page, config, findCasePage, caseDetailsPage }) => {
    await test.step('Start Find Case journey', async () => {
      jurisdiction = 'Public Law';
      caseType = 'Public Law Applications';
      await findCasePage.startFindCaseJourney(caseNumber, caseType, jurisdiction);
    });

    await test.step("Verify that case searched for appears under 'Your cases' ", async () => {
      const searchTable = await tableUtils.mapExuiTable(findCasePage.searchResultsTable);

      // TODO HOW TO ASSERT on the single Row Table owing to the last row being
      // " ": "",
      const rowContent = {
        'Case name': expect(String),
        'Date submitted': expect(Object),
        'FamilyMan case number': expect(String),
        'Local authority': expect(String),
        State: expect(String),
        ' ': '',
      };

      //expect(searchTable[0]).toMatchObject(rowContent);

      await findCasePage.displayCaseDetails();
      await page.waitForTimeout(1000);
    });

    await test.step('Check Case Details page and ensure case is present', async () => {
      //const caseDetailsTabsCount = caseDetailsPage.getTabCount();
      //expect(caseDetailsTabsCount).toBe(14);
      expect.soft(caseDetailsPage.caseActionsDropdown.isVisible());
      expect.soft(caseDetailsPage.caseActionGoButton.isVisible());
      expect.soft(caseDetailsPage.ccdCaseReference).toContainText(validatorUtils.formatCaseNumber(caseNumber));
    });
  });
});

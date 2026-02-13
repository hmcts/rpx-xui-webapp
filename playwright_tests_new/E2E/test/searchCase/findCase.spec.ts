import { test, expect } from '../../fixtures';
import { ensureSession } from '../../../common/sessionCapture';
import { resolveCaseReferenceFromGlobalSearch } from '../../../E2E/utils/case-reference.utils';
import { openHomeWithCapturedSession, PUBLIC_LAW_CASE_REFERENCE_OPTIONS } from './searchCase.setup';

test.describe('IDAM login for Find Search page', () => {
  let availableCaseReference = '';
  test.beforeAll(async () => {
    await ensureSession('FPL_GLOBAL_SEARCH');
  });

  test.beforeEach(async ({ page }) => {
    await openHomeWithCapturedSession(page, 'FPL_GLOBAL_SEARCH');
    availableCaseReference = await resolveCaseReferenceFromGlobalSearch(page, PUBLIC_LAW_CASE_REFERENCE_OPTIONS);
  });

  test('Find case using Public Law jurisdiction', async ({ tableUtils, findCasePage, caseDetailsPage, page }) => {
    const caseNumber = availableCaseReference;
    const jurisdiction = 'Public Law';
    const caseType = 'Public Law Applications';

    await test.step('Start Find Case journey', async () => {
      await findCasePage.startFindCaseJourney(caseNumber, caseType, jurisdiction);
    });

    await test.step("Verify that case searched for appears under 'Your cases' ", async () => {
      await findCasePage.searchResultsDataTable.waitFor({ state: 'visible' });
      const searchTable = await tableUtils.parseDataTable(findCasePage.searchResultsDataTable);

      const rowContent = {
        'Case name': expect.any(String),
        'Date submitted': expect.any(String),
        'FamilyMan case number': expect.any(String),
        'Local authority': expect.any(String),
        State: expect.any(String),
      };

      expect(searchTable.length).toBeGreaterThan(0);
      expect(searchTable[0]).toMatchObject(rowContent);

      await findCasePage.displayCaseDetailsFor(caseNumber);
      await expect(page).toHaveURL(/\/cases\/case-details\//);
    });

    await test.step('Verify case details page displays correct case', async () => {
      await expect.soft(caseDetailsPage.caseActionsDropdown).toBeVisible();
      await expect.soft(caseDetailsPage.caseActionGoButton).toBeVisible();
      const caseNumberFromUrl = await caseDetailsPage.getCaseNumberFromUrl();
      expect(caseNumberFromUrl).toContain(caseNumber);
    });
  });

  test('Find case is accessible from main menu navigation', async ({ findCasePage, page }) => {
    await test.step('Open Find case from main navigation', async () => {
      await findCasePage.openFromMainMenu();
      await expect(page).toHaveURL(/\/cases\/case-search/);
      await expect(findCasePage.pageHeading).toHaveText('Search');
    });
  });
});

test.describe('Solicitor navigation to Find case (top-right)', () => {
  test.beforeAll(async () => {
    await ensureSession('SOLICITOR');
  });

  test.beforeEach(async ({ page }) => {
    await openHomeWithCapturedSession(page, 'SOLICITOR');
  });

  test('Find case link appears on top-right and opens Find case page', async ({ findCasePage, page }) => {
    await test.step('Open Find case from top-right link', async () => {
      await findCasePage.openFromTopRight();
      await expect(page).toHaveURL(/\/cases\/case-search/);
      await expect(findCasePage.pageHeading).toHaveText('Search');
    });
  });
});

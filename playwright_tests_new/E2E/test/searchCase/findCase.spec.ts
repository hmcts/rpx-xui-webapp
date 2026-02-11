import { test, expect } from '../../fixtures';
import { ensureSession, loadSessionCookies } from '../../../common/sessionCapture.ts';
import { resolveCaseReferenceWithFallback } from '../../../E2E/utils/case-reference.utils.ts';

test.describe('IDAM login for Find Search page', () => {
  let availableCaseReference = '';
  test.beforeAll(async () => {
    await ensureSession('FPL_GLOBAL_SEARCH');
  });

  test.beforeEach(async ({ page, caseListPage }) => {
    const { cookies } = loadSessionCookies('FPL_GLOBAL_SEARCH');
    if (cookies.length) {
      await page.context().addCookies(cookies);
    }

    await page.goto('/');
    availableCaseReference = await resolveCaseReferenceWithFallback(
      page,
      async () => {
        await caseListPage.goto();
        const caseReference = await caseListPage.getRandomCaseReferenceFromResults([
          'Case management',
          'Submitted',
          'Gatekeeping',
          'Closed',
        ]);
        await page.goto('/');
        return caseReference;
      },
      {
        jurisdictionIds: ['PUBLICLAW'],
        preferredStates: ['Case management', 'Submitted', 'Gatekeeping', 'Closed'],
      }
    );
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
      await expect(page).toHaveURL(new RegExp(`/cases/case-details/.*/${caseNumber}`));
    });

    await test.step('Check Case Details page and ensure case is present', async () => {
      await expect.soft(caseDetailsPage.caseActionsDropdown).toBeVisible();
      await expect.soft(caseDetailsPage.caseActionGoButton).toBeVisible();
      const caseNumberFromUrl = await caseDetailsPage.getCaseNumberFromUrl();
      expect.soft(caseNumberFromUrl).toContain(caseNumber);
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
    const { cookies } = loadSessionCookies('SOLICITOR');
    if (cookies.length) {
      await page.context().addCookies(cookies);
    }
    await page.goto('/');
  });

  test('Find case link appears on top-right and opens Find case page', async ({ findCasePage, page }) => {
    await test.step('Open Find case from top-right link', async () => {
      await findCasePage.openFromTopRight();
      await expect(page).toHaveURL(/\/cases\/case-search/);
      await expect(findCasePage.pageHeading).toHaveText('Search');
    });
  });
});

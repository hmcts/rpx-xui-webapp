import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { filterEmptyRows } from '../../utils';
import { caseBannerMatches, getCaseBannerInfo, normalizeCaseNumber } from '../../utils/banner.utils';

function isPageClosingError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('Target page, context or browser has been closed') ||
    message.includes('Execution context was destroyed') ||
    message.includes('Test ended')
  );
}

function rowMatchesExpected(row: Record<string, string>, expected: Record<string, string>): boolean {
  return Object.entries(expected).every(([key, value]) => {
    return (row[key] ?? '').trim() === value.trim();
  });
}

test.describe('Case level case flags', () => {
  test.describe.configure({ timeout: 180000 });
  let caseNumber: string;
  const jurisdiction = 'EMPLOYMENT';
  const caseType = 'ET_EnglandWales';
  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
    await ensureAuthenticatedPage(page, 'SEARCH_EMPLOYMENT_CASE', { waitForSelector: 'exui-header' });
    await createCasePage.createCaseEmployment(jurisdiction, caseType);
    caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
  });

  test('Create a new case level flag and verify the flag is displayed on the case', async ({ caseDetailsPage, tableUtils }) => {
    await test.step('Record existing case level flags', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const table = await tableUtils.parseDataTable(await caseDetailsPage.getTableByName('Case level flags'));
      const visibleRows = filterEmptyRows(table);
      expect.soft(visibleRows.length).toBeGreaterThanOrEqual(0);
    });

    await test.step('Create a new case level flag', async () => {
      await caseDetailsPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseAction('Create a case flag');
      await caseDetailsPage.selectCaseFlagTarget('Welsh');
    });

    await test.step('Check the case flag creation messages are seen', async () => {
      await expect
        .poll(async () => {
          const callbackError = caseDetailsPage.page.getByText('callback data failed validation', { exact: false });
          if (await callbackError.isVisible().catch(() => false)) {
            throw new Error('Callback data failed validation while creating case-level case flag.');
          }
          const bannerVisible = await caseDetailsPage.caseAlertSuccessMessage.isVisible().catch(() => false);
          if (!bannerVisible) {
            return false;
          }
          const bannerText = await caseDetailsPage.caseAlertSuccessMessage.innerText();
          return caseBannerMatches(bannerText, caseNumber, 'has been updated with event: Create a case flag');
        })
        .toBe(true);
      if (await caseDetailsPage.caseNotificationBannerTitle.isVisible()) {
        expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
      }
      if (await caseDetailsPage.caseNotificationBannerBody.isVisible()) {
        expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toMatch(/active flag/i);
      }
    });

    await test.step('Verify the case level flag is shown in the flags tab', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const expectedFlag = {
        'Case flags': 'Welsh forms and communications',
        Comments: 'Welsh',
        'Creation date': await caseDetailsPage.todaysDateFormatted(),
        'Last modified': '',
        'Flag status': 'ACTIVE',
      };
      await expect
        .poll(
          async () => {
            if (caseDetailsPage.page.isClosed()) {
              return false;
            }
            try {
              const table = await tableUtils.parseDataTable(await caseDetailsPage.getTableByName('Case level flags'));
              const visibleRows = filterEmptyRows(table);
              return visibleRows.some((row) => rowMatchesExpected(row, expectedFlag));
            } catch (error) {
              if (isPageClosingError(error)) {
                return false;
              }
              throw error;
            }
          },
          { timeout: 45000, intervals: [1000, 2000, 3000] }
        )
        .toBe(true);
    });
  });
});

test.describe('Party level case flags', () => {
  test.describe.configure({ timeout: 180000 });
  const testValue = faker.person.firstName();
  let caseNumber: string;
  const jurisdiction = 'DIVORCE';
  const caseType = 'xuiCaseFlagsV1';
  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
    await ensureAuthenticatedPage(page, 'USER_WITH_FLAGS', { waitForSelector: 'exui-header' });
    await createCasePage.createDivorceCaseFlag(testValue, jurisdiction, caseType);
    caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
  });

  test('Create a new party level flag and verify the flag is displayed on the case', async ({ caseDetailsPage, tableUtils }) => {
    await test.step('Record existing party level flags', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const table = await tableUtils.parseDataTable(await caseDetailsPage.getTableByName(testValue));
      const visibleRows = filterEmptyRows(table);
      expect.soft(visibleRows.length).toBeGreaterThanOrEqual(0);
    });

    await test.step('Create a new party level flag', async () => {
      await caseDetailsPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseAction('Create case flag');
      await caseDetailsPage.selectPartyFlagTarget(testValue, 'Welsh');
    });

    await test.step('Check the case flag creation messages are seen', async () => {
      await expect
        .poll(
          async () => {
            const callbackError = caseDetailsPage.page.getByText('callback data failed validation', { exact: false });
            if (await callbackError.isVisible().catch(() => false)) {
              throw new Error('Callback data failed validation while creating party-level case flag.');
            }
            if (await caseDetailsPage.eventCreationErrorHeading.isVisible().catch(() => false)) {
              throw new Error('CCD event creation failed while creating party-level case flag.');
            }
            const bannerVisible = await caseDetailsPage.caseAlertSuccessMessage.isVisible().catch(() => false);
            if (!bannerVisible) {
              return false;
            }
            const bannerText = await caseDetailsPage.caseAlertSuccessMessage.innerText();
            return caseBannerMatches(bannerText, caseNumber, 'has been updated with event: Create case flag');
          },
          { timeout: 45000, intervals: [1000, 2000, 3000] }
        )
        .toBe(true);
      if (await caseDetailsPage.caseNotificationBannerTitle.isVisible()) {
        expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
      }
      if (await caseDetailsPage.caseNotificationBannerBody.isVisible()) {
        expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toMatch(/active flag/i);
      }
    });

    await test.step('Verify the party level case flag is shown in the flags tab', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const expectedFlag = {
        'Party level flags': 'I want to speak Welsh at a hearing',
        Comments: `Welsh ${testValue}`,
        'Creation date': await caseDetailsPage.todaysDateFormatted(),
        'Last modified': '',
        'Flag status': 'ACTIVE',
      };
      await expect
        .poll(
          async () => {
            if (caseDetailsPage.page.isClosed()) {
              return false;
            }
            try {
              const partyFlagsTables = caseDetailsPage.page.locator('table').filter({
                has: caseDetailsPage.page.locator('th', { hasText: 'Party level flags' }),
              });
              const table = await tableUtils.parseDataTable(partyFlagsTables);
              const visibleRows = filterEmptyRows(table);
              return visibleRows.some((row) => rowMatchesExpected(row, expectedFlag));
            } catch (error) {
              if (isPageClosingError(error)) {
                return false;
              }
              throw error;
            }
          },
          { timeout: 45000, intervals: [1000, 2000, 3000] }
        )
        .toBe(true);
    });
  });
});

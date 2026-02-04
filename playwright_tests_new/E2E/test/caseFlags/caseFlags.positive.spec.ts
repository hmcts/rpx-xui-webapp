import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';

const isEmptyFlagsRow = (row: Record<string, string>): boolean => {
  const text = Object.values(row).join(' ').replaceAll(/\s+/g, ' ').trim();
  return !text || /no flags|no active flags|no case flags|\bnone\b/i.test(text);
};

test.describe('Case level case flags', () => {
  let caseNumber: string;
  const jurisdiction = 'EMPLOYMENT';
  const caseType = 'ET_EnglandWales';
  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
    await ensureAuthenticatedPage(page, 'SEARCH_EMPLOYMENT_CASE', { waitForSelector: 'exui-header' });
    await createCasePage.createCaseEmployment(jurisdiction, caseType);
    caseNumber = await caseDetailsPage.getCaseNumberFromAlert();
  });

  test('Create a new case level flag and verify the flag is displayed on the case', async ({ caseDetailsPage, tableUtils }) => {
    await test.step('Record existing case level flags', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const table = await tableUtils.parseDataTable(await caseDetailsPage.getTableByName('Case level flags'));
      const visibleRows = table.filter((row) => !isEmptyFlagsRow(row));
      expect.soft(visibleRows.length).toBeGreaterThanOrEqual(0);
    });

    await test.step('Create a new case level flag', async () => {
      await caseDetailsPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseAction('Create a case flag');
      await caseDetailsPage.selectCaseFlagTarget('Welsh');
    });

    await test.step('Check the case flag creation messages are seen', async () => {
      expect
        .soft(await caseDetailsPage.caseAlertSuccessMessage.innerText())
        .toContain(`Case ${caseNumber} has been updated with event: Create a case flag`);
      expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
      expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toMatch(/active flag/i);
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
            const table = await tableUtils.parseDataTable(await caseDetailsPage.getTableByName('Case level flags'));
            const visibleRows = table.filter((row) => !isEmptyFlagsRow(row));
            return visibleRows.some((row) => Object.entries(expectedFlag).every(([key, value]) => row[key] === value));
          },
          { timeout: 60000 }
        )
        .toBe(true);
    });
  });
});

test.describe('Party level case flags', () => {
  const testValue = faker.person.firstName();
  let caseNumber: string;
  const jurisdiction = 'DIVORCE';
  const caseType = 'xuiCaseFlagsV1';
  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
    await ensureAuthenticatedPage(page, 'USER_WITH_FLAGS', { waitForSelector: 'exui-header' });
    await createCasePage.createDivorceCaseFlag(testValue, jurisdiction, caseType);
    caseNumber = await caseDetailsPage.getCaseNumberFromAlert();
  });

  test('Create a new party level flag and verify the flag is displayed on the case', async ({ caseDetailsPage, tableUtils }) => {
    await test.step('Record existing party level flags', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const table = await tableUtils.parseDataTable(await caseDetailsPage.getTableByName(testValue));
      const visibleRows = table.filter((row) => !isEmptyFlagsRow(row));
      expect.soft(visibleRows.length).toBeGreaterThanOrEqual(0);
    });

    await test.step('Create a new party level flag', async () => {
      await caseDetailsPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseAction('Create case flag');
      await caseDetailsPage.selectPartyFlagTarget(testValue, 'Welsh');
    });

    await test.step('Check the case flag creation messages are seen', async () => {
      const callbackError = caseDetailsPage.page.getByText('callback data failed validation', { exact: false });
      if (await callbackError.isVisible().catch(() => false)) {
        throw new Error('Callback data failed validation while creating party-level case flag.');
      }
      await expect
        .poll(async () => (await caseDetailsPage.caseAlertSuccessMessage.innerText()).trim(), { timeout: 60000 })
        .toContain(`Case ${caseNumber} has been updated with event: Create case flag`);
      expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
      expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toMatch(/active flag/i);
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
            const table = await tableUtils.parseDataTable(await caseDetailsPage.getTableByName(testValue));
            const visibleRows = table.filter((row) => !isEmptyFlagsRow(row));
            return visibleRows.some((row) => Object.entries(expectedFlag).every(([key, value]) => row[key] === value));
          },
          { timeout: 60000 }
        )
        .toBe(true);
    });
  });
});

import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
let caseNumber: string;
const updatedFirstName = faker.person.firstName();
const updatedLastName = faker.person.lastName();
const testField = faker.lorem.word() + new Date().toLocaleTimeString();

test.describe('Verify creating and updating a case works as expected', () => {
  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
    await ensureAuthenticatedPage(page, 'SOLICITOR', { waitForSelector: 'exui-header' });
    await createCasePage.createDivorceCase('DIVORCE', 'XUI Case PoC', testField);
    const alertVisible = await caseDetailsPage.caseAlertSuccessMessage.isVisible().catch(() => false);
    if (alertVisible) {
      caseNumber = await caseDetailsPage.getCaseNumberFromAlert();
    } else {
      caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
    }
  });

  test('Create, update and verify case history', async ({
    createCasePage,
    caseDetailsPage
  }) => {
    await test.step('Start Update Case event', async () => {
      await caseDetailsPage.selectCaseAction('Update case');
    });

    await test.step('Update case fields', async () => {
      await createCasePage.person2FirstNameInput.fill(updatedFirstName);
      await createCasePage.person2LastNameInput.fill(updatedLastName);
      await createCasePage.continueButton.click();
      await createCasePage.submitButton.click();
      await caseDetailsPage.exuiSpinnerComponent.wait();
      await expect(caseDetailsPage.caseAlertSuccessMessage).toBeVisible({ timeout: 60000 });
    });

    await test.step('Verify update success banner', async () => {
      await expect
        .poll(async () => (await caseDetailsPage.caseAlertSuccessMessage.innerText()).trim(), { timeout: 60000 })
        .toContain(`Case ${caseNumber} has been updated with event: Update case`);
    });

    await test.step('Verify the \'Some more data\' tab has updated names correctly', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Some more data');

      const expectedValues= {
        'First Name': updatedFirstName,
        'Last Name': updatedLastName
      };

      const table = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.someMoreDataTable);
      expect.soft(table).toMatchObject(expectedValues);
    });

    await test.step('Verify that event details are shown on the History tab', async () => {
      await caseDetailsPage.selectCaseDetailsTab('History');
      const { updateRow, updateDate, updateAuthor, expectedDate } =
        await caseDetailsPage.getUpdateCaseHistoryInfo();

      expect.soft(updateRow, 'Update case row should be present').toBeTruthy();
      const expectedDateNumeric = new Date().toLocaleDateString('en-GB');
      const longDateMatch = updateDate.match(/\d{1,2}\s+[A-Za-z]{3}\s+\d{4}/);
      const numericDateMatch = updateDate.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
      const updateDateOnly = longDateMatch?.[0] ?? numericDateMatch?.[0] ?? updateDate;
      const normalizeLongDate = (value: string) => {
        const match = value.match(/(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/);
        if (!match) {
          return value;
        }
        const [, day, month, year] = match;
        const paddedDay = day.padStart(2, '0');
        return `${paddedDay} ${month} ${year}`;
      };
      const dateMatches =
        normalizeLongDate(updateDateOnly) === expectedDate ||
        updateDateOnly === expectedDateNumeric ||
        updateDate.includes(expectedDate);
      expect.soft(dateMatches, 'Update case date should match today (ignore time)').toBe(true);
      expect.soft(updateAuthor, 'Update case author should be present').not.toBe('');

      const expectedDetails = {
        'Date': updateDate,
        'Author': updateAuthor,
        'End state': 'Case created',
        'Event': 'Update case',
        'Summary': '-',
        'Comment': '-'
      };
      const table = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.historyDetailsTable);
      expect(table).toMatchObject(expectedDetails);
    });
  });
});

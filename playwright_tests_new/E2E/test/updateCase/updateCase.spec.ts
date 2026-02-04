import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture';

let sessionCookies: any[] = [];
let caseNumber: string;
const updatedFirstName = faker.person.firstName();
const updatedLastName = faker.person.lastName();
const testField = faker.lorem.word() + new Date().toLocaleTimeString();

test.describe('Verify creating and updating a case works as expected', () => {
  test.beforeEach(async ({ page, createCasePage }) => {
    const { cookies } = loadSessionCookies('SOLICITOR');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }
    await page.goto('/');
    await createCasePage.createDivorceCase('DIVORCE', 'XUI Case PoC', testField);
    caseNumber = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
  });

  test('Create, update and verify case history', async ({ createCasePage, caseDetailsPage }) => {
    await test.step('Start Update Case event', async () => {
      await caseDetailsPage.selectCaseAction('Update case');
    });

    await test.step('Update case fields', async () => {
      await createCasePage.person2FirstNameInput.fill(updatedFirstName);
      await createCasePage.person2LastNameInput.fill(updatedLastName);
      await createCasePage.continueButton.click();
      await createCasePage.submitButton.click();
    });

    await test.step('Verify update success banner', async () => {
      expect
        .soft(await caseDetailsPage.caseAlertSuccessMessage.innerText())
        .toContain(`Case ${caseNumber} has been updated with event: Update case`);
    });

    await test.step("Verify the 'Some more data' tab has updated names correctly", async () => {
      await caseDetailsPage.selectCaseDetailsTab('Some more data');

      const expectedValues = {
        'First Name': updatedFirstName,
        'Last Name': updatedLastName,
      };

      const table = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.someMoreDataTable);
      expect.soft(table).toMatchObject(expectedValues);
    });

    await test.step('Verify that event details are shown on the History tab', async () => {
      await caseDetailsPage.selectCaseDetailsTab('History');
      const { updateRow, updateDate, updateAuthor, expectedDate } = await caseDetailsPage.getUpdateCaseHistoryInfo('Update case');

      expect.soft(updateRow, 'Update case row should be present').toBeTruthy();
      expect.soft(updateDate.startsWith(expectedDate), 'Update case date should match today (ignore time)').toBe(true);
      expect.soft(updateAuthor, 'Update case author should be present').not.toBe('');

      const expectedDetails = {
        Date: updateDate,
        Author: updateAuthor,
        'End state': 'Case created',
        Event: 'Update case',
        Summary: '-',
        Comment: '-',
      };
      const table = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.historyDetailsTable);
      expect(table).toMatchObject(expectedDetails);
    });
  });
});

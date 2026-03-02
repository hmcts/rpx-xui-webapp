import { divorcePocCaseData } from '../../mocks/createCase.mock';
import { test, expect } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { routeCaseCreationFlow } from '../../utils/caseCreationRoutes';
import { TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.SOLICITOR;
const jurisdiction = 'DIVORCE';
const caseType = 'XUI Case PoC';

let caseData;
let interceptedCreateCaseRequestBody;

test.beforeEach(async ({ page, createCasePage }) => {
  await applySessionCookies(page, userIdentifier);

  interceptedCreateCaseRequestBody = null;
  await page.route(`**/data/internal/case-types/xuiTestJurisdiction/event-triggers/createCase*`, async (route) => {
    const body = JSON.stringify(divorcePocCaseData());
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });
  await page.goto('/cases/case-create/DIVORCE/xuiTestJurisdiction/createCase/createCasePage_1');
  await expect(createCasePage.textField0Input).toBeVisible();
});

test.describe(`Create case as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} can create a ${jurisdiction} case and updates persist when editing previous steps`, async ({
    createCasePage,
    caseDetailsPage,
    page,
  }) => {
    await test.step('User fills out the first page of the form', async () => {
      caseData = await createCasePage.generateDivorcePoCData({ person1Gender: 'Male' });
      await createCasePage.createDivorceCasePoC(jurisdiction, caseType, caseData, { skipCaseSubmit: true });
    });

    await test.step('Check the answers shown match the entered data', async () => {
      const table = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable);
      const expected = {
        'Text Field 0': caseData.textField0,
        'Text Field 1': caseData.textField1,
        'Text Field 2': caseData.textField2,
        'Text Field 3': caseData.textField3,
        Title: caseData.person1Title,
        'First Name': caseData.person1FirstName,
        'Last Name': caseData.person1LastName,
        Gender: caseData.person1Gender,
      };

      const jobSubTable = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersSubTable);
      expect(jobSubTable).toMatchObject({ Title: caseData.person1JobTitle, Description: caseData.person1JobDescription });
      expect(table).toMatchObject(expected);
    });

    await test.step('Submit the case for creation and capture the request body', async () => {
      const interceptedCreateCaseRequestBodyPromise = routeCaseCreationFlow(page);
      await createCasePage.testSubmitButton.click();
      interceptedCreateCaseRequestBody = await interceptedCreateCaseRequestBodyPromise;
    });

    await test.step('Check the JSON sent in the creation request matches the expected data', async () => {
      expect(interceptedCreateCaseRequestBody).toBeTruthy();

      const submittedData = interceptedCreateCaseRequestBody?.data;
      expect(submittedData).toBeTruthy();

      expect(submittedData.TextField0).toBe(caseData.textField0);
      expect(submittedData.TextField1).toBe(caseData.textField1);
      expect(submittedData.TextField2).toBe(caseData.textField2);
      expect(submittedData.TextField3).toBe(caseData.textField3);

      expect(submittedData.Person1?.Title).toBe(caseData.person1Title);
      expect(submittedData.Person1?.FirstName).toBe(caseData.person1FirstName);
      expect(submittedData.Person1?.LastName).toBe(caseData.person1LastName);
      expect(submittedData.Person1?.PersonGender).toBe(caseData.person1Gender?.toLowerCase()); //notGiven issue
      expect(submittedData.Person1?.PersonJob?.Title).toBe(caseData.person1JobTitle);
      expect(submittedData.Person1?.PersonJob?.Description).toBe(caseData.person1JobDescription);
    });
  });

  test(`User ${userIdentifier} can create a ${jurisdiction} case with all hidden fields are not shown but sent`, async ({
    createCasePage,
    caseDetailsPage,
    page,
  }) => {
    await test.step('User fills out the first page of the form', async () => {
      caseData = await createCasePage.generateDivorcePoCData({ person1Gender: 'Male',textField0:'Hide all' });
      await createCasePage.createDivorceCasePoC(jurisdiction, caseType, caseData, { skipCaseSubmit: true });
    });

    await test.step('Check the answers shown match the entered data', async () => {
      const table = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable);
      const expected = {
        'Text Field 0': caseData.textField0,
        'Text Field 1': caseData.textField1,
        'Text Field 2': caseData.textField2,
        'Text Field 3': caseData.textField3,
        Title: caseData.person1Title,
        'First Name': caseData.person1FirstName,
        'Last Name': caseData.person1LastName,
        Gender: caseData.person1Gender,
      };

      //not match the obj when the things dont show

      const jobSubTable = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersSubTable);
      expect(jobSubTable).toMatchObject({ Title: caseData.person1JobTitle, Description: caseData.person1JobDescription });
      expect(table).toMatchObject(expected);
    });

    await test.step('Submit the case for creation and capture the request body', async () => {
      const interceptedCreateCaseRequestBodyPromise = routeCaseCreationFlow(page);
      await createCasePage.testSubmitButton.click();
      interceptedCreateCaseRequestBody = await interceptedCreateCaseRequestBodyPromise;
    });

    //this needs to be smaller
    await test.step('Check the JSON sent in the creation request matches the expected data', async () => {
      expect(interceptedCreateCaseRequestBody).toBeTruthy();

      const submittedData = interceptedCreateCaseRequestBody?.data;
      expect(submittedData).toBeTruthy();

      expect(submittedData.TextField0).toBe(caseData.textField0);
      expect(submittedData.TextField1).toBe(caseData.textField1);
      expect(submittedData.TextField2).toBe(caseData.textField2);
      expect(submittedData.TextField3).toBe(caseData.textField3);

      expect(submittedData.Person1?.Title).toBe(caseData.person1Title);
      expect(submittedData.Person1?.FirstName).toBe(caseData.person1FirstName);
      expect(submittedData.Person1?.LastName).toBe(caseData.person1LastName);
      expect(submittedData.Person1?.PersonGender).toBe(caseData.person1Gender?.toLowerCase()); //notGiven issue
      expect(submittedData.Person1?.PersonJob?.Title).toBe(caseData.person1JobTitle);
      expect(submittedData.Person1?.PersonJob?.Description).toBe(caseData.person1JobDescription);
    });
  });
  // test(`User ${userIdentifier} can create a ${jurisdiction} case with one hidden field are not shown but sent`, async ({}) => {});

  // test(`User ${userIdentifier} can create a ${jurisdiction} case and navigate back using the Change links on check your answers`, async ({}) => {});
});

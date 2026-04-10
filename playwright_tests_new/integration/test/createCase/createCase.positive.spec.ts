import { divorcePocCaseData } from '../../mocks/createCase.mock';
import { test, expect } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { routeCaseCreationFlow } from '../../utils/caseCreationRoutes';
import { TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.SOLICITOR;
const jurisdiction = 'DIVORCE';
const caseType = 'xuiTestJurisdiction';

let interceptedCreateCaseRequestBody;

test.beforeEach(async ({ page, createCasePage }) => {
  await applySessionCookies(page, userIdentifier);

  interceptedCreateCaseRequestBody = null;
  await page.route(`**/data/case-types/${caseType}/validate*`, async (route) => {
    const request = route.request();
    const requestBody = request.postDataJSON?.() as { data?: unknown } | undefined;
    const responseBody = {
      data: requestBody?.data ?? {},
      _links: {
        self: {
          href: request.url(),
        },
      },
    };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(responseBody),
    });
  });
  await page.route(`**/data/internal/case-types/${caseType}/event-triggers/createCase*`, async (route) => {
    const body = JSON.stringify(divorcePocCaseData());
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });
  await page.goto(`/cases/case-create/${jurisdiction}/${caseType}/createCase/`);
  await expect(createCasePage.person1TitleInput).toBeVisible();
});

test.describe(`Create a ${jurisdiction} case as ${userIdentifier}`, { tag: ['@integration', '@integration-create-case'] }, () => {
  test(`All expected fields are filled, seen, and sent in the create case API call`, async ({
    createCasePage,
    caseDetailsPage,
    page,
  }) => {
    const caseData = await createCasePage.generateDivorcePoCData({ divorceReasons: ['Adultery'] });
    const person1Data = await createCasePage.generateDivorcePoCPersonData({
      gender: 'Male',
    });
    const person2Data = await createCasePage.generateDivorcePoCPersonData({
      gender: 'Female',
    });

    await test.step('User fills out the form', async () => {
      await createCasePage.fillDivorcePocSections({
        data: [person1Data, person2Data],
        textFields: {
          textField0: caseData.textField0,
          textField1: caseData.textField1,
          textField2: caseData.textField2,
          textField3: caseData.textField3,
        },
        divorceReasons: caseData.divorceReasons,
        gender: caseData.gender,
      });
    });

    await test.step('Check the answers shown match the entered data', async () => {
      const answerTable = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswers);
      expect(answerTable).toMatchObject({
        'Text Field 0': caseData.textField0,
        'Text Field 1': caseData.textField1,
        'Text Field 2': caseData.textField2,
        'Text Field 3': caseData.textField3,
        'Select your gender': caseData.gender,
        'Choose divorce reasons': caseData.divorceReasons?.[0],
      });
      const person1 = await caseDetailsPage.trRowsToObjectInPage(await createCasePage.findTableInCheckAnswers('Person 1'));
      const person2 = await caseDetailsPage.trRowsToObjectInPage(await createCasePage.findTableInCheckAnswers('Person 2'));

      expect(person1).toMatchObject({
        Title: person1Data.title,
        Gender: person1Data.gender,
        'First Name': person1Data.firstName,
        'Last Name': person1Data.lastName,
      });
      const jobSubTable = await caseDetailsPage.trRowsToObjectInPage(await createCasePage.findSubTableInCheckAnswers('Person 1'));
      expect(jobSubTable).toMatchObject({ Title: person1Data.jobTitle, Description: person1Data.jobDescription });
      expect(person2).toMatchObject({
        Title: person2Data.title,
        Gender: person2Data.gender,
        'First Name': person2Data.firstName,
        'Maiden Name': person2Data.maidenName,
        'Last Name': person2Data.lastName,
      });
      const jobSubTable2 = await caseDetailsPage.trRowsToObjectInPage(
        await createCasePage.findSubTableInCheckAnswers('Person 2')
      );
      expect(jobSubTable2).toMatchObject({ Title: person2Data.jobTitle, Description: person2Data.jobDescription });
    });

    await test.step('Submit the case for creation and capture the request body', async () => {
      const interceptedCreateCaseRequestBodyPromise = routeCaseCreationFlow(page);
      await createCasePage.testSubmitButton.click({ noWaitAfter: true });
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
      expect(submittedData.DivorceReason[0]).toEqual(caseData.divorceReasons?.[0]?.toLowerCase());

      expect(submittedData.Person1?.Title).toBe(person1Data.title);
      expect(submittedData.Person1?.FirstName).toBe(person1Data.firstName);
      expect(submittedData.Person1?.LastName).toBe(person1Data.lastName);
      expect(submittedData.Person1?.PersonGender).toBe(person1Data.gender?.toLowerCase());
      expect(submittedData.Person1?.PersonJob?.Title).toBe(person1Data.jobTitle);
      expect(submittedData.Person1?.PersonJob?.Description).toBe(person1Data.jobDescription);

      expect(submittedData.Person2?.Title).toBe(person2Data.title);
      expect(submittedData.Person2?.FirstName).toBe(person2Data.firstName);
      expect(submittedData.Person2?.MaidenName).toBe(person2Data.maidenName);
      expect(submittedData.Person2?.LastName).toBe(person2Data.lastName);
      expect(submittedData.Person2?.PersonGender).toBe(person2Data.gender?.toLowerCase());
      expect(submittedData.Person2?.PersonJob?.Title).toBe(person2Data.jobTitle);
      expect(submittedData.Person2?.PersonJob?.Description).toBe(person2Data.jobDescription);
    });
  });

  test(`Creating a case with hidden and omitted fields, shows the expected answers and JSON request body`, async ({
    createCasePage,
    caseDetailsPage,
    page,
  }) => {
    const caseData = await createCasePage.generateDivorcePoCData({ textField0: 'Hide all', divorceReasons: ['Adultery'] });
    const person1Data = await createCasePage.generateDivorcePoCPersonData({
      gender: 'Male',
    });

    await test.step('User fills out the case pages', async () => {
      await createCasePage.fillDivorcePocSections({
        data: person1Data,
        textFields: {
          textField0: caseData.textField0,
          textField1: caseData.textField1,
          textField2: caseData.textField2,
          textField3: caseData.textField3,
        },
        divorceReasons: caseData.divorceReasons,
        gender: caseData.gender,
      });
    });

    await test.step('Check the answers shown match the expected visible fields', async () => {
      const table = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable);
      expect(table).toMatchObject({
        'Text Field 0': caseData.textField0,
        'Text Field 3': caseData.textField3,
      });
      expect(table).not.toHaveProperty('Text Field 1');
      expect(table).not.toHaveProperty('Text Field 2');
      expect(table).not.toHaveProperty('Select your gender');
      expect(table).not.toHaveProperty('Choose divorce reasons');
      const jobSubTable = await caseDetailsPage.trRowsToObjectInPage(await createCasePage.findSubTableInCheckAnswers('Person 1'));
      expect(jobSubTable).toMatchObject({ Title: person1Data.jobTitle, Description: person1Data.jobDescription });
    });

    await test.step('Submit the case for creation and capture the request body', async () => {
      const interceptedCreateCaseRequestBodyPromise = routeCaseCreationFlow(page);
      await createCasePage.testSubmitButton.click({ noWaitAfter: true });
      interceptedCreateCaseRequestBody = await interceptedCreateCaseRequestBodyPromise;
    });

    await test.step('Check the JSON sent in the creation request matches the expected data, and no omitted items are sent', async () => {
      expect(interceptedCreateCaseRequestBody).toBeTruthy();

      const submittedData = interceptedCreateCaseRequestBody?.data;
      expect(submittedData).toBeTruthy();

      expect(submittedData.TextField0).toBe(caseData.textField0);
      expect(submittedData.TextField2).toBe(caseData.textField2);
      expect(submittedData.TextField3).toBe(caseData.textField3);

      expect(submittedData.Person1?.Title).toBe(person1Data.title);
      expect(submittedData.Person1?.FirstName).toBe(person1Data.firstName);
      expect(submittedData.Person1?.LastName).toBe(person1Data.lastName);
      expect(submittedData.Person1?.PersonGender).toBe(person1Data.gender?.toLowerCase());
      expect(submittedData.Person1?.PersonJob?.Title).toBe(person1Data.jobTitle);
      expect(submittedData.Person1?.PersonJob?.Description).toBe(person1Data.jobDescription);
      expect(submittedData).not.toHaveProperty('DivorceReason');
      expect(submittedData).not.toHaveProperty('TextField1');
    });
  });

  // EXUI-4317 - Skipped until the related bug is resolved, and the expected behaviour can be tested reliably
  test.skip(`When you change the gender of Person 1, the previously filled 'maiden name' field is hidden, and not sent in the API request`, async ({
    createCasePage,
    caseDetailsPage,
    page,
  }) => {
    const caseData = await createCasePage.generateDivorcePoCData();
    const person1Data = await createCasePage.generateDivorcePoCPersonData({
      gender: 'Female',
    });

    await test.step('User fills out the form', async () => {
      await createCasePage.fillDivorcePocSections({
        data: person1Data,
        textFields: {
          textField0: caseData.textField0,
          textField1: caseData.textField1,
          textField2: caseData.textField2,
          textField3: caseData.textField3,
        },
        gender: caseData.gender,
      });
    });

    await test.step('Check the form matches previously entered data', async () => {
      await createCasePage.checkYourAnswersChangeLinks.first().click();
      await expect(createCasePage.person1FirstNameInput).toHaveValue(person1Data.firstName ?? '');
      await expect(createCasePage.person1MaidenNameInput).toHaveValue(person1Data.maidenName ?? '');
      await expect(createCasePage.person1LastNameInput).toHaveValue(person1Data.lastName ?? '');
      await expect(createCasePage.person1TitleInput).toHaveValue(person1Data.title ?? '');
      expect(await createCasePage.person1GenderSelect.inputValue()).toContain(person1Data.gender?.toLowerCase());
      await expect(createCasePage.person1JobTitleInput).toHaveValue(person1Data.jobTitle ?? '');
      await expect(createCasePage.person1JobDescriptionInput).toHaveValue(person1Data.jobDescription ?? '');
    });

    await test.step('Update the gender to male, wait for maiden name to be hidden, advance to the check your answers page', async () => {
      await createCasePage.person1GenderSelect.selectOption('Male');
      await createCasePage.person1MaidenNameInput.waitFor({ state: 'hidden' });
      await createCasePage.clickContinueAndWait('after changing gender to male');
      await createCasePage.clickContinueAndWait('advancing to check your answers after changing person 1 gender');
    });

    await test.step(`Check the answers page, post update, doesn't contain 'maiden name'`, async () => {
      const person1 = await caseDetailsPage.trRowsToObjectInPage(await createCasePage.findTableInCheckAnswers('Person 1'));

      expect(person1).toMatchObject({
        Title: person1Data.title,
        Gender: 'Male',
        'First Name': person1Data.firstName,
        'Last Name': person1Data.lastName,
      });
      expect(person1).not.toHaveProperty('Maiden Name');
      const jobSubTable = await caseDetailsPage.trRowsToObjectInPage(await createCasePage.findSubTableInCheckAnswers('Person 1'));
      expect(jobSubTable).toMatchObject({ Title: person1Data.jobTitle, Description: person1Data.jobDescription });
    });

    await test.step('Submit the case for creation and capture the request body', async () => {
      const interceptedCreateCaseRequestBodyPromise = routeCaseCreationFlow(page);
      await createCasePage.testSubmitButton.click({ noWaitAfter: true });
      interceptedCreateCaseRequestBody = await interceptedCreateCaseRequestBodyPromise;
    });

    await test.step(`Check the JSON sent in the creation request doesn't contain 'maiden name' and shows the updated gender field`, async () => {
      expect(interceptedCreateCaseRequestBody).toBeTruthy();
      const submittedData = interceptedCreateCaseRequestBody?.data;
      expect(submittedData).toBeTruthy();
      expect(submittedData.Person1?.PersonGender).toBe('male');
      expect(submittedData.Person1).not.toHaveProperty('MaidenName');
    });
  });
});

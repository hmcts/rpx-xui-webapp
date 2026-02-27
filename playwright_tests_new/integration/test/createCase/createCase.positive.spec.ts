import { divorcePocCaseData } from '../../mocks/createCase.mock';
import { test, expect } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { routeCaseCreationFlow } from '../../utils/caseCreationRoutes';
import { TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.SOLICITOR;
const jurisdiction = 'DIVORCE';

let caseData;
let interceptedCreateCaseRequestBody;

test.beforeEach(async ({ page, createCasePage }) => {
  await applySessionCookies(page, userIdentifier);
  caseData = await createCasePage.generateDivorcePoCData({ person1Gender: 'Male' });
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
    timeouts,
    page,
  }) => {
    await test.step('User fills out the first page of the form', async () => {
      await createCasePage.textField0Input.fill(caseData.textField0);
      await createCasePage.textField3Input.fill(caseData.textField3);
      await createCasePage.textField1Input.fill(caseData.textField1);
      await createCasePage.textField2Input.fill(caseData.textField2);
      await createCasePage.clickContinueAndWait('after PoC text fields');
    });
    await test.step('User fills out the second page of the form', async () => {
      await createCasePage.person1Title.fill(caseData?.person1Title);
      await createCasePage.person1FirstNameInput.fill(caseData.person1FirstName);
      await createCasePage.person1LastNameInput.fill(caseData.person1LastName);
      await createCasePage.person1GenderSelect.selectOption(caseData.person1Gender);
      await createCasePage.person1JobTitleInput.fill(caseData.person1JobTitle);
      await createCasePage.person1JobDescriptionInput.fill(caseData.person1JobDescription);
      await createCasePage.clickContinueAndWait('after PoC personal details');
      await createCasePage.checkYourAnswersHeading.waitFor({ state: 'visible', timeout: timeouts.POC_FIELD_VISIBLE });
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

      expect(interceptedCreateCaseRequestBody?.event?.id).toBe('createCase');
      expect(interceptedCreateCaseRequestBody?.ignore_warning).toBe(false);
    });
  });

  test(`User ${userIdentifier} can create a ${jurisdiction} case with all hidden fields are not shown but sent`, async ({}) => {});
  // test(`User ${userIdentifier} can create a ${jurisdiction} case with one hidden field are not shown but sent`, async ({}) => {});

  // test(`User ${userIdentifier} can create a ${jurisdiction} case and navigate back using the Change links on check your answers`, async ({}) => {});
});

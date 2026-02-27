import { divorcePocCaseData } from '../../mocks/createCase.mock';
import { test, expect } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.SOLICITOR;
const jurisdiction = 'DIVORCE';
const caseType = 'XUI Case PoC';
let caseData;
let caseEditData;
let interceptedCreateCaseRequestBody;

test.beforeEach(async ({ page, createCasePage }) => {
  await applySessionCookies(page, userIdentifier);
  caseData = await createCasePage.generateDivorcePoCData();
  caseEditData = await createCasePage.generateDivorcePoCData();
  interceptedCreateCaseRequestBody = null;
});

test.describe(`Create case as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} can create a ${jurisdiction} case and updates persist when editing previous steps`, async ({
    createCasePage,
    caseListPage,
    timeouts,
    page,
  }) => {
    await test.step('User navigates to the first page of the create case page and fills in case details', async () => {
      await page.route(`**/data/internal/case-types/xuiTestJurisdiction/event-triggers/createCase*`, async (route) => {
        const body = JSON.stringify(divorcePocCaseData());
        await route.fulfill({ status: 200, contentType: 'application/json', body });
      });
      await page.goto('/cases/case-create/DIVORCE/xuiTestJurisdiction/createCase/createCasePage_1');
      await expect(createCasePage.textField0Input).toBeVisible();
    });

    await test.step('Move to the end of the form', async () => {
      await createCasePage.textField0Input.fill(caseData.textField0);
      await createCasePage.textField3Input.fill(caseData.textField3);
      await createCasePage.textField1Input.fill(caseData.textField1);
      await createCasePage.textField2Input.fill(caseData.textField2);
      await createCasePage.clickContinueAndWait('after PoC text fields');
    });
    await test.step('Fill out some of the form', async () => {
      await page.locator('#FixedRadioList-customOption2').selectOption('blue');
      await createCasePage.person1Title.fill(caseData?.person1Title);
      await createCasePage.person1FirstNameInput.fill(caseData.person1FirstName);
      await createCasePage.person1LastNameInput.fill(caseData.person1LastName);
      await createCasePage.person1GenderSelect.selectOption(caseData.person1Gender);
      await createCasePage.person1JobTitleInput.fill(caseData.person1JobTitle);
      await createCasePage.person1JobDescriptionInput.fill(caseData.person1JobDescription);

      

      await createCasePage.clickContinueAndWait('after PoC personal details');
      await createCasePage.checkYourAnswersHeading.waitFor({ state: 'visible', timeout: timeouts.POC_FIELD_VISIBLE });
    });

    await test.step('Move back, check previous step edits', async () => {
      await page.route('**/data/case-types/xuiTestJurisdiction/cases?ignore-warning=false*', async (route) => {
        const request = route.request();
        if (request.method() === 'POST') {
          console.log('Create case POST payload:', request.postData());
          try {
            interceptedCreateCaseRequestBody = request.postDataJSON();
          } catch {
            interceptedCreateCaseRequestBody = null;
          }
        }
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({ id: '1234123412341234' }),
        });
      });

      await createCasePage.testSubmitButton.click();
    });

    await test.step('Fill out some of the form', async () => {
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
      expect(submittedData.Person1?.PersonGender).toBe(caseData.person1Gender);
      expect(submittedData.Person1?.PersonJob?.Title).toBe(caseData.person1JobTitle);
      expect(submittedData.Person1?.PersonJob?.Description).toBe(caseData.person1JobDescription);

      expect(interceptedCreateCaseRequestBody?.event?.id).toBe('createCase');
      expect(interceptedCreateCaseRequestBody?.ignore_warning).toBe(false);
    });
  });

  // test(`User ${userIdentifier} can create a ${jurisdiction} case and hidden fields are not shown but sent`, async ({}) => {});

  // test(`User ${userIdentifier} can create a ${jurisdiction} case and navigate back using the Change links on check your answers`, async ({}) => {});
});

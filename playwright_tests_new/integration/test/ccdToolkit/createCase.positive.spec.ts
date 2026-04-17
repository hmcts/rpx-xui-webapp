import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import type { CreateCasePage } from '../../../E2E/page-objects/pages/exui/createCase.po';
import { applySessionCookies } from '../../../common/sessionCapture';
import {
  buildNgIntegrationToolkitCreateCaseEvent,
  NG_INTEGRATION_CASE_TYPE,
  NG_INTEGRATION_EVENT_ID,
  NG_INTEGRATION_JURISDICTION,
  NG_INTEGRATION_PAGE_ID,
  NG_INTEGRATION_TOOLKIT_CASE_TYPE_NAME,
  NG_INTEGRATION_TOOLKIT_JURISDICTION_NAME,
} from '../../mocks/ngIntegration.mock';
import { setupNgIntegrationToolkitCreateCaseRoutes } from '../../helpers';
import { routeCaseCreationFlow, submitCaseAndCaptureRequest } from '../../utils/caseCreationRoutes';

const CASE_EDIT_URL = `/cases/case-create/${NG_INTEGRATION_JURISDICTION}/${NG_INTEGRATION_CASE_TYPE}/${NG_INTEGRATION_EVENT_ID}/${NG_INTEGRATION_PAGE_ID}`;
const CREATED_CASE_ID = '1600000000000999';

const page1Values = {
  TextField0: 'Wave 2 toolkit text',
  Gender: 'male',
  MultiSelectListField: ['item_1', 'item_3'],
  TextField1: 'Wave 2 toolkit text field 1',
  TextField2: 'Wave 2 toolkit text field 2',
  TextField3: 'Wave 2 toolkit text field 3',
  TextAreaField: 'Wave 2 toolkit text area',
} as const;

const page3Values = {
  NumberField: '12345',
  EmailField: 'wave2-toolkit@example.test',
  PhoneUKField: '07123456789',
  DateField: '2025-02-03',
  DateTimeField: '2025-02-03T02:30:45.000',
  MoneyGBPField: '1000000',
} as const;

const page4Values = {
  YesOrNoField: 'Yes',
  PostcodeField: 'SW1A 1AA',
  optionsMultiVal: 'b',
  ComplexType_1: {
    YesOrNoField: 'Yes',
    Gender: 'female',
    TextAreaField: 'Nested complex text area',
  },
  ComplexType_2: {
    DateField: '2025-03-04',
    DateTimeField: '2025-03-04T02:30:45.000',
    optionsMultiVal: 'c',
  },
} as const;

type CreateCasePayload = {
  data?: Record<string, unknown>;
} | null;

function getRequestData(payload: CreateCasePayload): Record<string, unknown> {
  return payload?.data ?? {};
}

async function openToolkitCaseEdit(
  page: Page,
  createCasePage: CreateCasePage,
  options: {
    userId?: string;
    roles?: string[];
    validateStatus?: number;
    validateBody?: unknown;
  } = {},
  eventConfig = buildNgIntegrationToolkitCreateCaseEvent()
) {
  await setupNgIntegrationToolkitCreateCaseRoutes(page, eventConfig, options);
  await page.goto(CASE_EDIT_URL);
  await expect(page.locator('ccd-case-edit-page')).toBeVisible();
  await expect(page.locator('ccd-case-edit-page h1')).toContainText('Test Page 1');
  await expect(createCasePage.textField0Input).toBeVisible();
}

async function captureValidateRequestData(page: Page, action: () => Promise<void>): Promise<Record<string, unknown>> {
  const requestPromise = page.waitForRequest(
    (request) => request.method() === 'POST' && request.url().includes(`/data/case-types/${NG_INTEGRATION_CASE_TYPE}/validate`)
  );

  await action();
  const request = await requestPromise;
  return ((request.postDataJSON() as CreateCasePayload)?.data ?? {}) as Record<string, unknown>;
}

async function fillPageOne(page: Page, createCasePage: CreateCasePage) {
  await createCasePage.textField0Input.fill(page1Values.TextField0);
  await page.locator('#Gender-male').check();
  await page.locator('#MultiSelectListField-item_1').check();
  await page.locator('#MultiSelectListField-item_3').check();
  await createCasePage.textField1Input.fill(page1Values.TextField1);
  await createCasePage.textField2Input.fill(page1Values.TextField2);
  await createCasePage.textField3Input.fill(page1Values.TextField3);
  await page.locator('#TextAreaField').fill(page1Values.TextAreaField);
}

async function fillPageThree(page: Page) {
  await page.locator('#NumberField').fill('12345');
  await page.locator('#EmailField').fill(page3Values.EmailField);
  await page.locator('#PhoneUKField').fill(page3Values.PhoneUKField);
  await page.locator('#DateField-day').fill('03');
  await page.locator('#DateField-month').fill('02');
  await page.locator('#DateField-year').fill('2025');
  await page.locator('#DateTimeField-day').fill('03');
  await page.locator('#DateTimeField-month').fill('02');
  await page.locator('#DateTimeField-year').fill('2025');
  await page.locator('#DateTimeField-hour').fill('02');
  await page.locator('#DateTimeField-minute').fill('30');
  await page.locator('#DateTimeField-second').fill('45');
  await page.locator('#MoneyGBPField').fill('10000');
}

async function fillPageFour(page: Page) {
  await page.getByRole('group', { name: 'YesOrNo' }).first().getByRole('radio', { name: 'Yes', exact: true }).check();
  await page.getByRole('textbox', { name: 'Postcode', exact: true }).fill(page4Values.PostcodeField);
  await page.getByRole('combobox', { name: 'Select all that match', exact: true }).first().selectOption({
    label: 'Option B',
  });

  const complexType1 = page.getByRole('group', { name: 'ComplexType 1' });
  await complexType1.getByRole('group', { name: 'YesOrNo' }).getByRole('radio', { name: 'Yes', exact: true }).check();
  await complexType1
    .getByRole('group', { name: 'Select your gender' })
    .getByRole('radio', { name: 'Female', exact: true })
    .check();
  await complexType1.getByRole('textbox', { name: 'TextArea', exact: true }).fill(page4Values.ComplexType_1.TextAreaField);

  const complexType2 = page.getByRole('group', { name: 'ComplexType 2' });
  const complexType2Textboxes = complexType2.getByRole('textbox');
  await complexType2Textboxes.nth(1).fill('04');
  await complexType2Textboxes.nth(2).fill('03');
  await complexType2Textboxes.nth(3).fill('2025');
  await complexType2Textboxes.nth(4).fill('04');
  await complexType2Textboxes.nth(5).fill('03');
  await complexType2Textboxes.nth(6).fill('2025');
  await complexType2Textboxes.nth(7).fill('02');
  await complexType2Textboxes.nth(8).fill('30');
  await complexType2Textboxes.nth(9).fill('45');
  await complexType2.getByRole('combobox', { name: 'Select all that match', exact: true }).selectOption({ label: 'Option c' });
}

async function advanceToLastPage(page: Page, createCasePage: CreateCasePage) {
  await fillPageOne(page, createCasePage);
  const page1Request = await captureValidateRequestData(page, async () => {
    await createCasePage.clickContinueAndWaitForNext('advancing toolkit case create page 1');
  });

  await expect(page.locator('ccd-case-edit-page h1')).toContainText('Test Page 2');
  const page2Request = await captureValidateRequestData(page, async () => {
    await createCasePage.clickContinueAndWaitForNext('advancing toolkit case create page 2');
  });

  await expect(page.locator('ccd-case-edit-page h1')).toContainText('Test Page 3');
  await fillPageThree(page);
  const page3Request = await captureValidateRequestData(page, async () => {
    await createCasePage.clickContinueAndWaitForNext('advancing toolkit case create page 3');
  });

  await expect(page.locator('ccd-case-edit-page h1')).toContainText('Test Page 4');
  await fillPageFour(page);
  return { page1Request, page2Request, page3Request };
}

async function advanceToSummary(page: Page, createCasePage: CreateCasePage) {
  const { page1Request, page2Request, page3Request } = await advanceToLastPage(page, createCasePage);
  const page4Request = await captureValidateRequestData(page, async () => {
    await createCasePage.clickContinueAndWaitForNext('advancing toolkit case create page 4');
  });

  await expect(createCasePage.checkYourAnswers).toBeVisible();
  return { page1Request, page2Request, page3Request, page4Request };
}

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe('CCD toolkit create-case parity', { tag: ['@integration', '@integration-ccd-toolkit'] }, () => {
  test('cancels the case-edit page back to the case list', async ({ page, createCasePage, caseListPage }) => {
    await openToolkitCaseEdit(page, createCasePage);

    await page.getByRole('button', { name: 'Cancel', exact: true }).click();

    await expect(caseListPage.caseListHeading).toBeVisible();
    await expect(page).toHaveURL(/\/cases(?:[/?#]|$)/);
  });

  test('walks the wizard pages, validates page payloads, shows the summary, and submits the case', async ({
    page,
    createCasePage,
    caseDetailsPage,
  }) => {
    await openToolkitCaseEdit(page, createCasePage);

    const { page1Request, page2Request, page3Request, page4Request } = await advanceToSummary(page, createCasePage);

    expect(page1Request).toMatchObject({
      TextField0: page1Values.TextField0,
      Gender: page1Values.Gender,
      MultiSelectListField: [...page1Values.MultiSelectListField],
      TextField1: page1Values.TextField1,
      TextField2: page1Values.TextField2,
      TextField3: page1Values.TextField3,
      TextAreaField: page1Values.TextAreaField,
    });
    expect(page1Request).toHaveProperty('AddressGlobalUKField');
    expect(page1Request).toHaveProperty('AddressUKField');
    expect(page2Request).toHaveProperty('AddressGlobalField');
    expect(page3Request).toEqual({
      NumberField: page3Values.NumberField,
      EmailField: page3Values.EmailField,
      PhoneUKField: page3Values.PhoneUKField,
      DateField: page3Values.DateField,
      DateTimeField: page3Values.DateTimeField,
      MoneyGBPField: page3Values.MoneyGBPField,
    });
    expect(page4Request).toMatchObject({
      YesOrNoField: page4Values.YesOrNoField,
      PostcodeField: page4Values.PostcodeField,
      optionsMultiVal: page4Values.optionsMultiVal,
      ComplexType_1: {
        YesOrNoField: page4Values.ComplexType_1.YesOrNoField,
        Gender: page4Values.ComplexType_1.Gender,
        TextAreaField: page4Values.ComplexType_1.TextAreaField,
      },
      ComplexType_2: {
        DateField: page4Values.ComplexType_2.DateField,
        DateTimeField: page4Values.ComplexType_2.DateTimeField,
        optionsMultiVal: page4Values.ComplexType_2.optionsMultiVal,
      },
    });

    await expect(createCasePage.checkYourAnswersHeading).toBeVisible();
    const summaryTable = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable.first());
    expect(summaryTable).toMatchObject({
      'Text Field 0': page1Values.TextField0,
      'Select your gender': 'Male',
      'Text Field 1': page1Values.TextField1,
      'Text Field 2': page1Values.TextField2,
      'Text Field 3': page1Values.TextField3,
      TextArea: page1Values.TextAreaField,
      Number: page3Values.NumberField,
      Email: page3Values.EmailField,
      PhoneUK: page3Values.PhoneUKField,
      Date: '3 Feb 2025',
      'Date Time': '3 Feb 2025, 2:30:45 AM',
      MoneyGBP: '£10,000.00',
      YesOrNo: page4Values.YesOrNoField,
      Postcode: page4Values.PostcodeField,
      'Select all that match': 'Option B',
    });
    await expect(createCasePage.checkYourAnswersTable.first()).toContainText('Item 1');
    await expect(createCasePage.checkYourAnswersTable.first()).toContainText('Item 3');

    await expect(createCasePage.checkYourAnswersTable.first()).toContainText('ComplexType 1');
    await expect(createCasePage.checkYourAnswersTable.first()).toContainText('Female');
    await expect(createCasePage.checkYourAnswersTable.first()).toContainText(page4Values.ComplexType_1.TextAreaField);
    await expect(createCasePage.checkYourAnswersTable.first()).toContainText('ComplexType 2');
    await expect(createCasePage.checkYourAnswersTable.first()).toContainText('4 Mar 2025');
    await expect(createCasePage.checkYourAnswersTable.first()).toContainText('Option c');
    await expect(createCasePage.checkYourAnswersChangeLinks.first()).toBeVisible();

    const submissionPayload = await submitCaseAndCaptureRequest(page, createCasePage, {
      caseTypeId: NG_INTEGRATION_CASE_TYPE,
      caseTypeName: NG_INTEGRATION_TOOLKIT_CASE_TYPE_NAME,
      jurisdictionId: NG_INTEGRATION_JURISDICTION,
      jurisdictionName: NG_INTEGRATION_TOOLKIT_JURISDICTION_NAME,
      createdCaseId: CREATED_CASE_ID,
    });

    expect(getRequestData(submissionPayload)).toMatchObject({
      TextField0: page1Values.TextField0,
      Gender: page1Values.Gender,
      MultiSelectListField: [...page1Values.MultiSelectListField],
      TextField1: page1Values.TextField1,
      TextField2: page1Values.TextField2,
      TextField3: page1Values.TextField3,
      TextAreaField: page1Values.TextAreaField,
      NumberField: page3Values.NumberField,
      EmailField: page3Values.EmailField,
      PhoneUKField: page3Values.PhoneUKField,
      DateField: page3Values.DateField,
      DateTimeField: page3Values.DateTimeField,
      MoneyGBPField: page3Values.MoneyGBPField,
      YesOrNoField: page4Values.YesOrNoField,
      PostcodeField: page4Values.PostcodeField,
      optionsMultiVal: page4Values.optionsMultiVal,
      ComplexType_1: {
        YesOrNoField: page4Values.ComplexType_1.YesOrNoField,
        Gender: page4Values.ComplexType_1.Gender,
        TextAreaField: page4Values.ComplexType_1.TextAreaField,
      },
      ComplexType_2: {
        DateField: page4Values.ComplexType_2.DateField,
        DateTimeField: page4Values.ComplexType_2.DateTimeField,
        optionsMultiVal: page4Values.ComplexType_2.optionsMultiVal,
      },
    });

    await expect(page).toHaveURL(/\/work\/my-work\/list$/);
    await expect(page.getByRole('heading', { name: 'My work' })).toBeVisible();
  });

  test('only shows configured summary fields when show_summary change options are restricted', async ({
    page,
    createCasePage,
    caseDetailsPage,
  }) => {
    const eventConfig = buildNgIntegrationToolkitCreateCaseEvent({
      showSummary: true,
      showSummaryChangeFieldIds: ['TextField0'],
    });

    await openToolkitCaseEdit(page, createCasePage, {}, eventConfig);
    await advanceToSummary(page, createCasePage);

    await expect(createCasePage.checkYourAnswersHeading).toBeVisible();
    const summaryTable = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable.first());
    expect(summaryTable).toMatchObject({
      'Text Field 0': page1Values.TextField0,
    });
    expect(summaryTable).not.toHaveProperty('Text Field 1');
    expect(summaryTable).not.toHaveProperty('Text Field 3');
    expect(summaryTable).not.toHaveProperty('Number');
  });

  test('hides summary content when show_summary is false and still allows submission', async ({ page, createCasePage }) => {
    const eventConfig = buildNgIntegrationToolkitCreateCaseEvent({
      showSummary: false,
    });

    await openToolkitCaseEdit(page, createCasePage, {}, eventConfig);
    await advanceToLastPage(page, createCasePage);

    await expect(createCasePage.checkYourAnswersHeading).not.toBeVisible();
    await expect(createCasePage.checkYourAnswersTable).toHaveCount(0);
    await expect(createCasePage.checkYourAnswersChangeLinks).toHaveCount(0);

    const hiddenSummarySubmitButton = page.getByRole('button', { name: 'Submit', exact: true });
    await expect(hiddenSummarySubmitButton).toBeVisible();

    const submissionPayload = routeCaseCreationFlow(page, {
      caseTypeId: NG_INTEGRATION_CASE_TYPE,
      caseTypeName: NG_INTEGRATION_TOOLKIT_CASE_TYPE_NAME,
      jurisdictionId: NG_INTEGRATION_JURISDICTION,
      jurisdictionName: NG_INTEGRATION_TOOLKIT_JURISDICTION_NAME,
      createdCaseId: CREATED_CASE_ID,
    });
    await Promise.all([submissionPayload, hiddenSummarySubmitButton.click()]);

    expect(getRequestData(await submissionPayload)).toMatchObject({
      TextField0: page1Values.TextField0,
      NumberField: page3Values.NumberField,
      YesOrNoField: page4Values.YesOrNoField,
    });

    await expect(page).toHaveURL(/\/work\/my-work\/list$/);
    await expect(page.getByRole('heading', { name: 'My work' })).toBeVisible();
  });

  test('evaluates show_condition on event fields as the driver field changes', async ({ page, createCasePage }) => {
    const eventConfig = buildNgIntegrationToolkitCreateCaseEvent({
      showSummary: true,
      multiSelectShowCondition: 'Gender="notGiven"',
    });

    await openToolkitCaseEdit(page, createCasePage, {}, eventConfig);

    await createCasePage.textField0Input.fill('Wave 2 show condition text');
    await page.locator('#Gender-male').check();
    await expect(page.locator('#MultiSelectListField')).toBeHidden();

    await page.locator('#Gender-notGiven').check();
    await expect(page.locator('#MultiSelectListField')).toBeVisible();
  });

  for (const statusCode of [400, 500]) {
    test(`shows a callback error summary when validate returns HTTP ${statusCode}`, async ({ page, createCasePage }) => {
      await openToolkitCaseEdit(
        page,
        createCasePage,
        {
          validateStatus: statusCode,
          validateBody: {
            message: `Forced validate failure ${statusCode}`,
          },
        },
        buildNgIntegrationToolkitCreateCaseEvent({
          showSummary: true,
          showSummaryChangeFieldIds: ['TextField0'],
        })
      );

      await createCasePage.textField0Input.fill('Validation failure text');
      const validateRequest = page.waitForRequest(
        (request) =>
          request.method() === 'POST' && request.url().includes(`/data/case-types/${NG_INTEGRATION_CASE_TYPE}/validate`)
      );

      await createCasePage.continueButton.click();
      await validateRequest;

      await expect(createCasePage.errorSummary).toBeVisible();
      await expect(createCasePage.checkYourAnswers).not.toBeVisible();
    });
  }
});

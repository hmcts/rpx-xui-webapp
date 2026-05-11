import { faker } from '@faker-js/faker';
import { createLogger } from '@hmcts/playwright-common';

import type { CreateCasePage } from '../../../page-objects/pages/exui/createCase.po';
import { isTransientWorkflowFailure } from '../../transient-failure.utils';

export type DivorcePoCData = {
  gender?: string;
  person1Title?: string;
  person1FirstName?: string;
  person1LastName?: string;
  person1Gender?: string;
  person1JobTitle?: string;
  person1JobDescription?: string;
  textField0?: string;
  textField1?: string;
  textField2?: string;
  textField3?: string;
  generatedAt?: string;
};

export type CreateDivorceCaseOptions = {
  maxAttempts?: number;
  createCaseMaxAttempts?: number;
};

const logger = createLogger({
  serviceName: 'divorce-case-journeys',
  format: 'pretty',
});

export async function createDivorceCase(
  createCasePage: CreateCasePage,
  jurisdiction: string,
  caseType: string,
  testInput: string,
  options: CreateDivorceCaseOptions = {}
): Promise<void> {
  switch (caseType) {
    case 'xuiCaseFlagsV1':
      return createDivorceCaseFlag(createCasePage, testInput, jurisdiction, caseType);
    case 'XUI Case PoC':
      return createDivorceCasePoC(createCasePage, jurisdiction, caseType, testInput, options);
    case 'XUI Test Case type':
    case 'xuiTestCaseType':
      return createDivorceCaseTest(createCasePage, testInput, jurisdiction, caseType);
    default:
      throw new Error(`createDivorceCase does not support case type: ${caseType}`);
  }
}

export async function createDivorceCaseTest(
  createCasePage: CreateCasePage,
  testData: string,
  jurisdiction: string = 'DIVORCE',
  caseType: string = 'xuiTestCaseType'
): Promise<void> {
  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const today = new Date();
      await createCasePage.createCase(jurisdiction, caseType, '');
      await createCasePage.assertNoEventCreationError('after starting divorce test case');

      await createCasePage.textFieldInput.fill(testData);
      await createCasePage.clickContinueAndWaitForNext('after text field');

      await createCasePage.emailFieldInput.fill(faker.internet.email({ provider: 'example.com' }));
      await createCasePage.phoneNumberFieldInput.fill('07123456789');
      await createCasePage.dateFieldDayInput.fill(today.getDate().toString());
      await createCasePage.dateFieldMonthInput.fill((today.getMonth() + 1).toString());
      await createCasePage.dateFieldYearInput.fill((today.getFullYear() - 20).toString());
      await createCasePage.dateTimeFieldDayInput.fill(today.getDate().toString());
      await createCasePage.dateTimeFieldMonthInput.fill((today.getMonth() + 1).toString());
      await createCasePage.dateTimeFieldYearInput.fill(today.getFullYear().toString());
      await createCasePage.dateTimeFieldHourInput.fill('10');
      await createCasePage.dateTimeFieldMinuteInput.fill('30');
      await createCasePage.dateTimeFieldSecondInput.fill('15');
      await createCasePage.currencyFieldInput.fill('1000');
      await createCasePage.clickContinueAndWaitForNext('after contact details');

      await createCasePage.yesNoRadioButtons.getByLabel('Yes').check();
      await createCasePage.applicantPostcode.fill('SW1A 1AA');
      await createCasePage.complexType1JudgeIsRightRadios.getByLabel('No').check();
      await createCasePage.complexType1LevelOfJudgeRadioButtons.getByLabel('Item 1').check();
      await createCasePage.complexType1LevelOfJudgeDetailsInput.fill('Details about why this level of judge is needed.');
      await createCasePage.complexType1LevelOfJudgeKeyInput.fill('Key information');
      await createCasePage.manualEntryLink.click();
      await createCasePage.complexType2AddressLine1Input.fill('10 Test Street');
      await createCasePage.complexType2EmailInput.fill(faker.internet.email({ provider: 'example.com' }));
      await createCasePage.uploadFile(
        'sample.pdf',
        'application/pdf',
        '%PDF-1.4\n%test\n%%EOF',
        createCasePage.complexType3FileUploadInput
      );
      await createCasePage.complexType3ComplianceButton.click();
      await createCasePage.complexType3ComplianceInput.fill('Compliant response');
      await createCasePage.complexType3DateOfBirthDay.fill('15');
      await createCasePage.complexType3DateOfBirthMonth.fill('06');
      await createCasePage.complexType3DateOfBirthYear.fill('1990');
      await createCasePage.complexType3DateOfHearingDay.fill(today.getDate().toString());
      await createCasePage.complexType3DateOfHearingMonth.fill((today.getMonth() + 1).toString());
      await createCasePage.complexType3DateOfHearingYear.fill(today.getFullYear().toString());
      await createCasePage.complexType3DateOfHearingHour.fill('14');
      await createCasePage.complexType3DateOfHearingMinute.fill('45');
      await createCasePage.complexType3DateOfHearingSecond.fill('30');
      await createCasePage.complexType4AmountInput.fill('500');
      await createCasePage.complexType4FirstTickBox.check();
      await createCasePage.complexType4SelectList.selectOption('Item 1');
      await createCasePage.clickContinueAndWaitForNext('after complex type fields');

      await createCasePage.assertNoEventCreationError('before submitting divorce test case');
      await createCasePage.clickSubmitAndWait('before submitting divorce test case', { timeoutMs: 60_000 });
      await createCasePage.waitForCaseDetails('after submitting divorce test case');
      return;
    } catch (error) {
      const eventErrorVisible = await createCasePage.eventCreationErrorHeading.isVisible().catch(() => false);
      const shouldRetry = (eventErrorVisible || isTransientWorkflowFailure(error)) && attempt < maxAttempts;
      if (shouldRetry) {
        logger.warn('Divorce test case creation failed; retrying', { attempt, maxAttempts });
        if (!createCasePage.page.isClosed()) {
          await createCasePage.page.goto('/cases/case-filter');
        }
        continue;
      }
      throw error;
    }
  }
}

export async function createDivorceCaseFlag(
  createCasePage: CreateCasePage,
  testData: string,
  jurisdiction: string = 'DIVORCE',
  caseType: string = 'xuiCaseFlagsV1'
): Promise<void> {
  await createCasePage.createCase(jurisdiction, caseType, '');
  await createCasePage.party1RoleOnCase.fill(testData);
  await createCasePage.party1Name.fill(testData);
  await createCasePage.party2RoleOnCase.fill(`${testData}2`);
  await createCasePage.party2Name.fill(`${testData}2`);
  await createCasePage.clickContinueAndWaitForNext('after submitting divorce case flags (continue)');
  await createCasePage.testSubmitButton.click();
  await createCasePage.waitForSpinnerToComplete('after submitting divorce case flags (submit)');
  await createCasePage.waitForCaseDetails('after submitting divorce case flags');
}

export async function createDivorceCasePoC(
  createCasePage: CreateCasePage,
  jurisdiction: string,
  caseType: string,
  dataOrTextField0?: DivorcePoCData | string,
  options: CreateDivorceCaseOptions = {}
): Promise<void> {
  const data = typeof dataOrTextField0 === 'string' ? ({ textField0: dataOrTextField0 } as DivorcePoCData) : dataOrTextField0;
  const maxAttempts = options.maxAttempts ?? 2;
  const preferredGenders = data?.gender ? [data.gender] : ['Male', 'Female', 'Not given', 'Not Known', 'Unknown'];

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await createCasePage.createCase(jurisdiction, caseType, '', {
        maxAttempts: options.createCaseMaxAttempts,
      });
      const availableGender = await createCasePage.person1GenderSelect.evaluate((select) =>
        Array.from((select as HTMLSelectElement).options).map((option) => option.label.trim())
      );
      const gender = preferredGenders.find((candidate) => availableGender.includes(candidate)) ?? 'Male';
      const genderRadio = createCasePage.page.getByLabel(gender, { exact: true });
      if (await genderRadio.isVisible().catch(() => false)) {
        await genderRadio.check();
      }
      await createCasePage.person1Title.click();
      await createCasePage.person1Title.fill(data?.person1Title ?? faker.person.prefix());
      await createCasePage.person1FirstNameInput.fill(data?.person1FirstName ?? faker.person.firstName());
      await createCasePage.person1LastNameInput.fill(data?.person1LastName ?? faker.person.lastName());
      await createCasePage.person1GenderSelect.selectOption(data?.person1Gender ?? gender);
      await createCasePage.person1JobTitleInput.fill(data?.person1JobTitle ?? faker.person.jobTitle());
      await createCasePage.person1JobDescriptionInput.fill(data?.person1JobDescription ?? faker.lorem.sentence());
      const personalDetailsUrl = createCasePage.page.url();
      await createCasePage.clickContinueAndWaitForNext('after PoC personal details');
      await createCasePage.ensureWizardAdvanced('after PoC personal details', personalDetailsUrl, {
        expectedLocator: createCasePage.textField0Input,
        timeoutMs: 30_000,
      });
      await createCasePage.textField0Input.fill(data?.textField0 ?? faker.lorem.word());
      await createCasePage.textField3Input.fill(data?.textField3 ?? faker.lorem.word());
      await createCasePage.textField1Input.fill(data?.textField1 ?? faker.lorem.word());
      await createCasePage.textField2Input.fill(data?.textField2 ?? faker.lorem.word());
      await createCasePage.clickContinueAndWaitForNext('after PoC text fields');
      await createCasePage.checkYourAnswersHeading.waitFor({ state: 'visible', timeout: 30_000 });
      await createCasePage.testSubmitButton.click();
      await createCasePage.waitForSpinnerToComplete('after submitting divorce PoC case');
      await createCasePage.waitForCaseDetails('after submitting divorce PoC case');
      return;
    } catch (error) {
      const message = describeUnknownError(error);
      const isTransientCreationFailure =
        isTransientWorkflowFailure(error) ||
        message.includes('Validation error after after PoC text fields') ||
        message.includes('The event could not be created') ||
        (await createCasePage.eventCreationErrorHeading.isVisible().catch(() => false));
      if (isTransientCreationFailure && attempt < maxAttempts) {
        logger.warn('Divorce PoC case creation failed; retrying', { attempt, maxAttempts });
        if (!createCasePage.page.isClosed()) {
          await createCasePage.page.goto('/cases/case-filter');
        }
        continue;
      }
      throw error;
    }
  }
}

export async function generateDivorcePoCData(overrides: Partial<DivorcePoCData> = {}): Promise<DivorcePoCData> {
  const gender = overrides.gender ?? faker.helpers.arrayElement(['Male', 'Female', 'Not given']);
  const generatedAt = overrides.generatedAt ?? new Date().toISOString();
  return {
    gender,
    person1Title: overrides.person1Title ?? faker.person.prefix(),
    person1FirstName: overrides.person1FirstName ?? faker.person.firstName(),
    person1LastName: overrides.person1LastName ?? faker.person.lastName(),
    person1Gender: overrides.person1Gender ?? gender,
    person1JobTitle: overrides.person1JobTitle ?? faker.person.jobTitle(),
    person1JobDescription: overrides.person1JobDescription ?? faker.lorem.sentence(),
    textField0: overrides.textField0 ?? faker.lorem.sentence() + faker.date.soon().getTime(),
    textField1: overrides.textField1 ?? faker.lorem.sentence() + faker.date.soon().getTime(),
    textField2: overrides.textField2 ?? faker.lorem.sentence() + faker.date.soon().getTime(),
    textField3: overrides.textField3 ?? faker.lorem.sentence() + faker.date.soon().getTime(),
    generatedAt,
  };
}

function describeUnknownError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  try {
    return JSON.stringify(error) ?? '[Unable to stringify error]';
  } catch {
    return '[Unstringifiable error object]';
  }
}

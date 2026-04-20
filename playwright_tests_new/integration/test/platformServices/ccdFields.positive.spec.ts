import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupNgIntegrationToolkitCreateCaseRoutes } from '../../helpers';
import {
  buildNgIntegrationCcdFieldsValidationEvent,
  NG_INTEGRATION_CASE_TYPE,
  NG_INTEGRATION_EVENT_ID,
  NG_INTEGRATION_JURISDICTION,
  NG_INTEGRATION_PAGE_ID,
} from '../../mocks/ngIntegration.mock';

const CASE_EDIT_URL = `/cases/case-create/${NG_INTEGRATION_JURISDICTION}/${NG_INTEGRATION_CASE_TYPE}/${NG_INTEGRATION_EVENT_ID}/${NG_INTEGRATION_PAGE_ID}`;

const mandatoryValidationMessages = [
  'Text is required',
  'Postcode is required',
  'TextArea is required',
  'Number is required',
  'YesOrNo is required',
  'Email is required',
  'PhoneUK is required',
  'Date is required',
  'DateTime is required',
  'MoneyGBP is not valid',
  'FixedList is required',
  'FixedRadioList is required',
  'MultiSelectList is required',
  'An address is required',
  'Case Assigned Role is required',
  'Reference is required',
  'Prepopulate User Organisation is required',
  'Textfield in complex is required',
  'Test collection field is required',
] as const;

async function openCcdFieldsPage(page: Page) {
  await setupNgIntegrationToolkitCreateCaseRoutes(page, buildNgIntegrationCcdFieldsValidationEvent());
  await page.goto(CASE_EDIT_URL);
  await expect(page.locator('ccd-case-edit-page')).toBeVisible();
  await expect(page.locator('ccd-case-edit-page h1')).toContainText('ngIntegration field coverage');
}

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe('ngIntegration CCD field parity', { tag: ['@integration', '@integration-platform-services'] }, () => {
  test('renders the legacy CCD field set and option lists', async ({ page }) => {
    await openCcdFieldsPage(page);

    await expect(page.getByRole('textbox', { name: 'Text', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Postcode', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'TextArea', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Number', exact: true })).toBeVisible();
    await expect(page.getByRole('group', { name: 'YesOrNo' }).getByRole('radio', { name: 'Yes', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'PhoneUK', exact: true })).toBeVisible();
    await expect(page.locator('#date-day')).toBeVisible();
    await expect(page.locator('#dateTime-day')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'MoneyGBP', exact: true })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'FixedList', exact: true })).toBeVisible();
    await expect(
      page.getByRole('group', { name: 'FixedRadioList' }).getByRole('radio', { name: 'Item 1', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('group', { name: 'MultiSelectList' }).getByRole('checkbox', { name: 'Item 1', exact: true })
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AddressGlobalUK', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AddressUK', exact: true })).toBeVisible();
    await expect(
      page.getByRole('group', { name: 'Organisation' }).getByRole('textbox', { name: 'Case Assigned Role', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('group', { name: 'Test complex field' }).getByRole('textbox', { name: 'Textfield in complex', exact: true })
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Test collection field', exact: true })).toBeVisible();

    await expect(page.getByRole('combobox', { name: 'FixedList', exact: true }).locator('option')).toContainText([
      '--Select a value--',
      'Item 1',
      'Item 2',
      'Item 3',
    ]);
    await expect(
      page.getByRole('group', { name: 'FixedRadioList' }).getByRole('radio', { name: 'Item 1', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('group', { name: 'FixedRadioList' }).getByRole('radio', { name: 'Item 2', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('group', { name: 'FixedRadioList' }).getByRole('radio', { name: 'Item 3', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('group', { name: 'MultiSelectList' }).getByRole('checkbox', { name: 'Item 1', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('group', { name: 'MultiSelectList' }).getByRole('checkbox', { name: 'Item 2', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('group', { name: 'MultiSelectList' }).getByRole('checkbox', { name: 'Item 3', exact: true })
    ).toBeVisible();
  });

  test('shows mandatory validation errors for the legacy CCD field set', async ({ createCasePage, page }) => {
    await openCcdFieldsPage(page);

    await page.getByRole('button', { name: 'Submit', exact: true }).click();

    await expect(createCasePage.errorSummary).toBeVisible();

    const summaryText = (await createCasePage.errorSummary.innerText()).replace(/\s+/g, ' ');
    for (const message of mandatoryValidationMessages) {
      expect(summaryText).toContain(message);
    }
    const fieldMessages = (await createCasePage.validationErrorMessage.allTextContents())
      .map((text) => text.trim())
      .filter(Boolean);
    expect(fieldMessages).toEqual(expect.arrayContaining([...mandatoryValidationMessages]));
    expect(fieldMessages.filter((message) => message.includes('An address is required'))).toHaveLength(2);
  });
});

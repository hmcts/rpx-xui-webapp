import { expect, test } from '../../../E2E/fixtures';
import {
  ACCESS_REQUEST_CASE_DETAILS_PATH,
  ACCESS_REQUEST_CASE_ID,
  ACCESS_REQUEST_SERVICE_NAME,
  CHALLENGED_ACCESS_PATH,
  applyPrewarmedSessionCookies,
  expectChallengedAccessConditionalFields,
  getChallengedAccessReasonDetails,
  summaryRow,
  setupChallengedAccessMockRoutes,
} from '../../helpers';

const userIdentifier = 'STAFF_ADMIN';
const linkedCaseReason = 'The cases or parties are linked to the case I am working on';
const consolidateReason = 'To determine if the case needs to be consolidated';
const transferReason = 'To consider an order for transfer';
const otherReason = 'Other reason';

test.beforeEach(async ({ page }) => {
  await applyPrewarmedSessionCookies(page, userIdentifier);
});

test.describe(`Challenged Access Request as ${userIdentifier}`, { tag: ['@integration', '@integration-access-requests'] }, () => {
  test('User can open Challenged Access Request from case details', async ({ page }) => {
    await setupChallengedAccessMockRoutes(page);

    await page.goto(ACCESS_REQUEST_CASE_DETAILS_PATH, { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('This case requires challenged access.')).toBeVisible();
    await expect(summaryRow(page, 'Service')).toContainText(ACCESS_REQUEST_SERVICE_NAME);
    await expect(summaryRow(page, 'Access')).toContainText('Challenged');
    await expect(page.getByRole('button', { name: 'Request access' })).toBeVisible();

    await page.getByRole('button', { name: 'Request access' }).click();

    await expect(page).toHaveURL(new RegExp(`${CHALLENGED_ACCESS_PATH}$`));
    await expect(page.getByRole('heading', { name: 'Why do you need to access this case?' })).toBeVisible();
  });

  test('User sees the correct conditional inputs for each challenged access reason', async ({ page }) => {
    await setupChallengedAccessMockRoutes(page);
    await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

    await expectChallengedAccessConditionalFields(page, { caseReferenceVisible: false, otherReasonVisible: false });

    await page.getByLabel(linkedCaseReason).check();
    await expectChallengedAccessConditionalFields(page, { caseReferenceVisible: true, otherReasonVisible: false });

    await page.getByLabel(consolidateReason).check();
    await expectChallengedAccessConditionalFields(page, { caseReferenceVisible: false, otherReasonVisible: false });

    await page.getByLabel(transferReason).check();
    await expectChallengedAccessConditionalFields(page, { caseReferenceVisible: false, otherReasonVisible: false });

    await page.getByLabel(otherReason).check();
    await expectChallengedAccessConditionalFields(page, { caseReferenceVisible: false, otherReasonVisible: true });

    await page.getByLabel(linkedCaseReason).check();
    await expectChallengedAccessConditionalFields(page, { caseReferenceVisible: true, otherReasonVisible: false });
    await page.locator('#case-reference').fill('1234567812345678');
  });

  test('User can submit a challenged access request with case reference', async ({ page }) => {
    await setupChallengedAccessMockRoutes(page);
    await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

    await page.getByLabel(linkedCaseReason).check();
    await page.locator('#case-reference').fill('2222333344445555');

    const requestPromise = page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().match(/\/api\/challenged-access-request(?:\?|$)/) !== null
    );

    await page.getByRole('button', { name: 'Submit' }).click();

    const payload = (await requestPromise).postDataJSON() as Record<string, any>;
    const accessReasonDetails = getChallengedAccessReasonDetails(payload);

    await expect(page.getByRole('heading', { name: 'Access successful' })).toBeVisible();
    await expect(page.getByText(ACCESS_REQUEST_CASE_ID)).toBeVisible();
    expect(payload.roleRequest?.process).toBe('challenged-access');
    expect(accessReasonDetails.reason).toBe(0);
    expect(accessReasonDetails.caseReference).toBe('2222333344445555');
    expect(accessReasonDetails.otherReason).toBeFalsy();
  });

  test('User can submit a challenged access request with other reason', async ({ page }) => {
    await setupChallengedAccessMockRoutes(page);
    await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

    await page.getByLabel(otherReason).check();
    await page.locator('#other-reason').fill('Urgent safeguarding review required before hearing.');

    const requestPromise = page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().match(/\/api\/challenged-access-request(?:\?|$)/) !== null
    );

    await page.getByRole('button', { name: 'Submit' }).click();

    const payload = (await requestPromise).postDataJSON() as Record<string, any>;
    const accessReasonDetails = getChallengedAccessReasonDetails(payload);

    await expect(page.getByRole('heading', { name: 'Access successful' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View case file' })).toBeVisible();
    expect(payload.roleRequest?.process).toBe('challenged-access');
    expect(accessReasonDetails.reason).toBe(3);
    expect(accessReasonDetails.otherReason).toBe('Urgent safeguarding review required before hearing.');
    expect(accessReasonDetails.caseReference).toBeFalsy();
  });
});

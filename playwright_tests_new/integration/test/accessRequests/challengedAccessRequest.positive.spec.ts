import { expect, test } from '../../../E2E/fixtures';
import {
  ACCESS_REQUEST_CASE_DETAILS_PATH,
  ACCESS_REQUEST_CASE_ID,
  ACCESS_REQUEST_SERVICE_NAME,
  CHALLENGED_ACCESS_PATH,
  applySessionCookies,
  expectChallengedAccessConditionalFields,
  getChallengedAccessReasonDetails,
  summaryRow,
  setupChallengedAccessMockRoutes,
} from '../../helpers';

const userIdentifier = 'STAFF_ADMIN';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Challenged Access Request as ${userIdentifier}`, { tag: ['@integration', '@integration-access-requests'] }, () => {
  test('User can open Challenged Access Request from case details', async ({ accessRequestPage, page }) => {
    await setupChallengedAccessMockRoutes(page);

    await page.goto(ACCESS_REQUEST_CASE_DETAILS_PATH, { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('This case requires challenged access.')).toBeVisible();
    await expect(summaryRow(page, 'Service')).toContainText(ACCESS_REQUEST_SERVICE_NAME);
    await expect(summaryRow(page, 'Access')).toContainText('Challenged');
    await expect(accessRequestPage.requestAccessButton).toBeVisible();

    await accessRequestPage.requestAccessButton.click();

    await expect(page).toHaveURL(new RegExp(`${CHALLENGED_ACCESS_PATH}$`));
    await expect(accessRequestPage.challengedAccessHeading).toBeVisible();
  });

  test('User sees the correct conditional inputs for each challenged access reason', async ({ accessRequestPage, page }) => {
    await setupChallengedAccessMockRoutes(page);
    await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

    await expectChallengedAccessConditionalFields(accessRequestPage, { caseReferenceVisible: false, otherReasonVisible: false });

    await accessRequestPage.linkedCaseReasonRadio.check();
    await expectChallengedAccessConditionalFields(accessRequestPage, { caseReferenceVisible: true, otherReasonVisible: false });

    await accessRequestPage.consolidateReasonRadio.check();
    await expectChallengedAccessConditionalFields(accessRequestPage, { caseReferenceVisible: false, otherReasonVisible: false });

    await accessRequestPage.transferReasonRadio.check();
    await expectChallengedAccessConditionalFields(accessRequestPage, { caseReferenceVisible: false, otherReasonVisible: false });

    await accessRequestPage.otherReasonRadio.check();
    await expectChallengedAccessConditionalFields(accessRequestPage, { caseReferenceVisible: false, otherReasonVisible: true });

    await accessRequestPage.linkedCaseReasonRadio.check();
    await expectChallengedAccessConditionalFields(accessRequestPage, { caseReferenceVisible: true, otherReasonVisible: false });
    await accessRequestPage.challengedCaseReferenceInput.fill('1234567812345678');
  });

  test('User can submit a challenged access request with case reference', async ({ accessRequestPage, page }) => {
    await setupChallengedAccessMockRoutes(page);
    await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

    await accessRequestPage.linkedCaseReasonRadio.check();
    await accessRequestPage.challengedCaseReferenceInput.fill('2222333344445555');

    const requestPromise = page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().match(/\/api\/challenged-access-request(?:\?|$)/) !== null
    );

    await accessRequestPage.submitButton.click();

    const payload = (await requestPromise).postDataJSON() as Record<string, any>;
    const accessReasonDetails = getChallengedAccessReasonDetails(payload);

    await expect(accessRequestPage.challengedAccessSuccessHeading).toBeVisible();
    await expect(page.getByText(ACCESS_REQUEST_CASE_ID)).toBeVisible();
    expect(payload.roleRequest?.process).toBe('challenged-access');
    expect(accessReasonDetails.reason).toBe(0);
    expect(accessReasonDetails.caseReference).toBe('2222333344445555');
    expect(accessReasonDetails.otherReason).toBeFalsy();
  });

  test('User can submit a challenged access request with other reason', async ({ accessRequestPage, page }) => {
    await setupChallengedAccessMockRoutes(page);
    await page.goto(CHALLENGED_ACCESS_PATH, { waitUntil: 'domcontentloaded' });

    await accessRequestPage.otherReasonRadio.check();
    await accessRequestPage.challengedOtherReasonInput.fill('Urgent safeguarding review required before hearing.');

    const requestPromise = page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().match(/\/api\/challenged-access-request(?:\?|$)/) !== null
    );

    await accessRequestPage.submitButton.click();

    const payload = (await requestPromise).postDataJSON() as Record<string, any>;
    const accessReasonDetails = getChallengedAccessReasonDetails(payload);

    await expect(accessRequestPage.challengedAccessSuccessHeading).toBeVisible();
    await expect(accessRequestPage.viewCaseFileLink).toBeVisible();
    expect(payload.roleRequest?.process).toBe('challenged-access');
    expect(accessReasonDetails.reason).toBe(3);
    expect(accessReasonDetails.otherReason).toBe('Urgent safeguarding review required before hearing.');
    expect(accessReasonDetails.caseReference).toBeFalsy();
  });
});

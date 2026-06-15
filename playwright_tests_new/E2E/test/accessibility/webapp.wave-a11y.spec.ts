import { expect, test } from '../../fixtures';
import { ensureSessionCookies } from '../../../common/sessionCapture';
import {
  attachWaveLikeAccessibilityEvidence,
  collectWaveLikeAccessibilityViolations,
} from '../../utils/accessibility/waveLikeAccessibility';
import {
  ACCESS_REQUEST_REVIEW_PATH,
  CHALLENGED_ACCESS_PATH,
  SPECIFIC_ACCESS_PATH,
  setupCaseShareMockRoutes,
  setupChallengedAccessMockRoutes,
  setupReviewSpecificAccessMockRoutes,
  setupSpecificAccessRequestMockRoutes,
} from '../../../integration/helpers';

const staticAndErrorPages = [
  { path: '/accessibility', name: 'accessibility statement' },
  { path: '/cookies', name: 'cookies' },
  { path: '/privacy-policy', name: 'privacy policy' },
  { path: '/get-help', name: 'get help' },
  { path: '/terms-and-conditions', name: 'terms and conditions' },
  { path: '/legacy-terms-and-conditions', name: 'legacy terms and conditions' },
  { path: '/accept-terms-and-conditions', name: 'accept terms and conditions' },
  { path: '/service-down', name: 'service down' },
  { path: '/booking-service-down', name: 'booking service down' },
  { path: '/booking-system-error', name: 'booking system error' },
  { path: '/not-authorised', name: 'not authorised' },
  { path: '/expired-login-link', name: 'expired login link' },
  { path: '/idle-sign-out', name: 'idle sign out' },
  { path: '/session-error', name: 'session error' },
];

const expectWaveLikeAccessibility = async (
  page: Parameters<typeof collectWaveLikeAccessibilityViolations>[0],
  testInfo: Parameters<typeof attachWaveLikeAccessibilityEvidence>[1]
): Promise<void> => {
  const violations = await collectWaveLikeAccessibilityViolations(page);
  await attachWaveLikeAccessibilityEvidence(page, testInfo, violations);
  expect(
    violations,
    [
      'WAVE-like accessibility checks found issues.',
      'Open the attached WAVE-like HTML/JSON and highlighted screenshot evidence.',
      `Current URL: ${page.url()}`,
      JSON.stringify(violations, null, 2),
    ].join('\n')
  ).toEqual([]);
};

test.describe('authenticated webapp WAVE-like accessibility @wave-a11y', () => {
  test.beforeEach(async ({ page }) => {
    const { cookies } = await ensureSessionCookies('STAFF_ADMIN');
    if (cookies.length) {
      await page.context().addCookies(cookies);
    }
  });

  test('task list page passes WAVE-like structural checks', async ({ taskListPage, page }, testInfo) => {
    await taskListPage.goto();
    await expect(taskListPage.taskListTable).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('case list page passes WAVE-like structural checks', async ({ caseListPage, page }, testInfo) => {
    await caseListPage.goto();
    await expect(caseListPage.container).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('case search page passes WAVE-like structural checks', async ({ page, caseListPage }, testInfo) => {
    await page.goto('/cases/case-search');
    await expect(caseListPage.filtersContainer).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('case share page passes WAVE-like structural checks', async ({ page }, testInfo) => {
    await page.goto('/cases/case-share?init=true');
    await expect(page.locator('main')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('case share validation state passes WAVE-like structural checks', async ({ page }, testInfo) => {
    await setupCaseShareMockRoutes(page);
    await page.goto('/cases/case-share?init=true');
    const continueButton = page.locator('#share-case-nav button').first();
    await expect(continueButton).toBeVisible();
    await continueButton.click();
    await expect(page.locator('.govuk-error-summary')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('create case filter page passes WAVE-like structural checks', async ({ page }, testInfo) => {
    await page.goto('/cases/case-filter');
    await expect(page.locator('main')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('global find case shell passes WAVE-like structural checks', async ({ page, searchCasePage }, testInfo) => {
    await page.goto('/cases');
    await expect(searchCasePage.caseIdTextBox).toBeVisible();
    await expect(searchCasePage.searchCaseFindButton.or(searchCasePage.searchCaseFindButtonFallback)).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('find case no-results state passes WAVE-like structural checks', async ({ page, searchCasePage }, testInfo) => {
    await page.goto('/cases');
    await expect(searchCasePage.caseIdTextBox).toBeVisible();
    await searchCasePage.caseIdTextBox.fill('0000000000000000');
    await searchCasePage.searchCaseFindButton.or(searchCasePage.searchCaseFindButtonFallback).click();
    await expect(searchCasePage.noResultsContainer).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('specific access request validation state passes WAVE-like structural checks', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupSpecificAccessRequestMockRoutes(page);
    await accessRequestPage.gotoSpecificAccessRequest(SPECIFIC_ACCESS_PATH);
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessage('Enter a reason')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('specific access request submission failure state passes WAVE-like structural checks', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupSpecificAccessRequestMockRoutes(page, {
      specificAccessStatus: 500,
      specificAccessBody: { message: 'specific access request failed' },
    });
    await accessRequestPage.gotoSpecificAccessRequest(SPECIFIC_ACCESS_PATH);
    await accessRequestPage.specificAccessReasonInput.fill('Urgent linked hearing preparation required.');
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.specificAccessContainer).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('challenged access request validation state passes WAVE-like structural checks', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupChallengedAccessMockRoutes(page);
    await accessRequestPage.gotoChallengedAccessRequest(CHALLENGED_ACCESS_PATH);
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessage('Select a reason')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('challenged access request linked-case validation state passes WAVE-like structural checks', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupChallengedAccessMockRoutes(page);
    await accessRequestPage.gotoChallengedAccessRequest(CHALLENGED_ACCESS_PATH);
    await accessRequestPage.linkedCaseReasonRadio.check();
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessage('Enter a case reference')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('challenged access request other-reason validation state passes WAVE-like structural checks', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupChallengedAccessMockRoutes(page);
    await accessRequestPage.gotoChallengedAccessRequest(CHALLENGED_ACCESS_PATH);
    await accessRequestPage.otherReasonRadio.check();
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessage('Enter a reason')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('review specific access request validation state passes WAVE-like structural checks', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupReviewSpecificAccessMockRoutes(page);
    await accessRequestPage.gotoReviewSpecificRequest(ACCESS_REQUEST_REVIEW_PATH);
    await accessRequestPage.continueButton.click();
    await expect(accessRequestPage.errorMessage('Please select an option')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('review specific access duration validation state passes WAVE-like structural checks', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupReviewSpecificAccessMockRoutes(page);
    await accessRequestPage.gotoReviewSpecificRequest(ACCESS_REQUEST_REVIEW_PATH);
    await accessRequestPage.approveRequestRadio.check();
    await accessRequestPage.continueButton.click();
    await expect(accessRequestPage.reviewDurationHeading).toBeVisible();
    await accessRequestPage.anotherPeriodRadio.check();
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessages.first()).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('review specific access request-more-information validation state passes WAVE-like structural checks', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupReviewSpecificAccessMockRoutes(page);
    await accessRequestPage.gotoReviewSpecificRequest(ACCESS_REQUEST_REVIEW_PATH);
    await accessRequestPage.requestMoreInformationRadio.check();
    await accessRequestPage.continueButton.click();
    await expect(accessRequestPage.requestMoreInformationHeading).toBeVisible();
    await accessRequestPage.continueButton.click();
    await expect(accessRequestPage.errorMessages.first()).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('review specific access service-down state passes WAVE-like structural checks', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupReviewSpecificAccessMockRoutes(page, { taskStatus: 500, taskBody: { message: 'task load failed' } });
    await accessRequestPage.gotoReviewSpecificRequestServiceDown(ACCESS_REQUEST_REVIEW_PATH);
    await expect(page).toHaveURL(/\/service-down$/);
    await expect(page.locator('main')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('role access delete exclusion page passes WAVE-like structural checks', async ({ page }, testInfo) => {
    await page.goto('/role-access/delete-exclusion?caseId=1620409659381330&exclusionId=123');
    await expect(page.locator('main')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('role access allocate route shell passes WAVE-like structural checks', async ({ page }, testInfo) => {
    await page.goto(
      '/role-access/allocate-role/allocate?caseId=1546883526751282&roleCategory=JUDICIAL&assignmentId=cc311b32-5aea-4cd1-8b72-911fb47c8a2e&actorId=38eb0c5e-29c7-453e-b92d-f2029aaed6c3&userName=Judge%20Beech&typeOfRole=Lead%20judge'
    );
    await expect(page.locator('main')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('all work tasks page passes WAVE-like structural checks', async ({ taskListPage, page }, testInfo) => {
    await taskListPage.gotoAllWorkTasks();
    await expect(taskListPage.taskListTable).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('all work cases page passes WAVE-like structural checks', async ({ taskListPage, page }, testInfo) => {
    await taskListPage.gotoAllWorkCases();
    await expect(page.locator('main')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('my cases page passes WAVE-like structural checks', async ({ taskListPage, page }, testInfo) => {
    await taskListPage.gotoMyCases();
    await expect(page.locator('main')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  test('my access page passes WAVE-like structural checks', async ({ taskListPage, page }, testInfo) => {
    await taskListPage.gotoMyAccess();
    await expect(page.locator('main')).toBeVisible();
    await expectWaveLikeAccessibility(page, testInfo);
  });

  for (const staticPage of staticAndErrorPages) {
    test(`${staticPage.name} static/error page passes WAVE-like structural checks`, async ({ page }, testInfo) => {
      await page.goto(staticPage.path);
      await expect(page.locator('main')).toBeVisible();
      await expectWaveLikeAccessibility(page, testInfo);
    });
  }
});

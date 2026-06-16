import { expect, test } from '../../fixtures';
import { ensureSessionCookies } from '../../../common/sessionCapture';
import type { Page, TestInfo } from '@playwright/test';
import {
  auditKnownAxeViolations,
  findUnexpectedAxeViolations,
  type KnownAxeViolation,
} from '../../utils/accessibility/axeKnownViolations';
import {
  ACCESS_REQUEST_REVIEW_PATH,
  CHALLENGED_ACCESS_PATH,
  SPECIFIC_ACCESS_PATH,
  setupReviewSpecificAccessMockRoutes,
  setupChallengedAccessMockRoutes,
  setupCaseShareMockRoutes,
  setupSpecificAccessRequestMockRoutes,
} from '../../../integration/helpers';
import {
  expectFilterControlsHaveAccessibleNames,
  expectFirstErrorSummaryLinkTargetsInvalidControl,
  expectHeaderLinksHaveTextAlternative,
  expectReachableMainContent,
  expectTableHeadersAreNamed,
} from '../../utils/accessibility/accessibilityAssertions';

const knownFormLabelViolation: KnownAxeViolation = {
  id: 'label',
  description: 'Ensure every form element has a label',
  maxNodes: 1,
};

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

async function expectOnlyKnownViolations(page: Page, knownViolations: KnownAxeViolation[], testInfo: TestInfo): Promise<void> {
  const violations = await auditKnownAxeViolations(page, testInfo);
  expect(findUnexpectedAxeViolations(violations, knownViolations)).toEqual([]);
}

test.describe('authenticated webapp accessibility @a11y', () => {
  test.beforeEach(async ({ page }) => {
    const { cookies } = await ensureSessionCookies('STAFF_ADMIN');
    if (cookies.length) {
      await page.context().addCookies(cookies);
    }
  });

  test('task list page has no automatically detectable accessibility violations', async ({ taskListPage, axeUtils }) => {
    await taskListPage.goto();
    await expect(taskListPage.taskListTable).toBeVisible();
    await axeUtils.audit();
  });

  test('case list page has no automatically detectable accessibility violations', async ({ caseListPage, axeUtils }) => {
    await caseListPage.goto();
    await expect(caseListPage.container).toBeVisible();
    await axeUtils.audit();
  });

  test('case search page matches the known accessibility baseline', async ({ page, caseListPage }, testInfo) => {
    await page.goto('/cases/case-search');
    await expect(caseListPage.filtersContainer).toBeVisible();
    await expectOnlyKnownViolations(
      page,
      [
        {
          id: 'aria-valid-attr-value',
          description: 'Ensure all ARIA attributes have valid values',
          maxNodes: 1,
        },
      ],
      testInfo
    );
  });

  test('case share page has no automatically detectable accessibility violations', async ({ page, axeUtils }) => {
    await page.goto('/cases/case-share?init=true');
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('case share validation state has no automatically detectable accessibility violations', async ({ page, axeUtils }) => {
    await setupCaseShareMockRoutes(page);
    await page.goto('/cases/case-share?init=true');
    const continueButton = page.locator('#share-case-nav button').first();
    await expect(continueButton).toBeVisible();
    await continueButton.click();
    await expect(page).not.toHaveURL(/\/service-down$/);
    await expect(page).not.toHaveURL(/\/not-authorised$/);
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('create case filter page has no automatically detectable accessibility violations', async ({ page, axeUtils }) => {
    await page.goto('/cases/case-filter');
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('global find case shell has no automatically detectable accessibility violations', async ({
    page,
    searchCasePage,
    axeUtils,
  }) => {
    await page.goto('/cases');
    await expect(searchCasePage.caseIdTextBox).toBeVisible();
    await expect(searchCasePage.searchCaseFindButton.or(searchCasePage.searchCaseFindButtonFallback)).toBeVisible();
    await axeUtils.audit();
  });

  test('find case no-results state has no automatically detectable accessibility violations', async ({
    page,
    searchCasePage,
    axeUtils,
  }) => {
    await page.goto('/cases');
    await expect(searchCasePage.caseIdTextBox).toBeVisible();
    await searchCasePage.caseIdTextBox.fill('0000000000000000');
    await searchCasePage.searchCaseFindButton.or(searchCasePage.searchCaseFindButtonFallback).click();
    await expect(searchCasePage.noResultsContainer).toBeVisible();
    await axeUtils.audit();
  });

  test('specific access request validation state matches the known accessibility baseline', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupSpecificAccessRequestMockRoutes(page);
    await accessRequestPage.gotoSpecificAccessRequest(SPECIFIC_ACCESS_PATH);
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessage('Enter a reason')).toBeVisible();
    await expectOnlyKnownViolations(page, [knownFormLabelViolation], testInfo);
  });

  test('specific access request submission failure state matches the known accessibility baseline', async ({
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
    await expectOnlyKnownViolations(page, [knownFormLabelViolation], testInfo);
  });

  test('challenged access request validation state has no automatically detectable accessibility violations', async ({
    accessRequestPage,
    axeUtils,
    page,
  }) => {
    await setupChallengedAccessMockRoutes(page);
    await accessRequestPage.gotoChallengedAccessRequest(CHALLENGED_ACCESS_PATH);
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessage('Select a reason')).toBeVisible();
    await axeUtils.audit();
  });

  test('challenged access request linked-case validation state has no automatically detectable accessibility violations', async ({
    accessRequestPage,
    axeUtils,
    page,
  }) => {
    await setupChallengedAccessMockRoutes(page);
    await accessRequestPage.gotoChallengedAccessRequest(CHALLENGED_ACCESS_PATH);
    await accessRequestPage.linkedCaseReasonRadio.check();
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessage('Enter a case reference')).toBeVisible();
    await axeUtils.audit();
  });

  test('challenged access request other-reason validation state matches the known accessibility baseline', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupChallengedAccessMockRoutes(page);
    await accessRequestPage.gotoChallengedAccessRequest(CHALLENGED_ACCESS_PATH);
    await accessRequestPage.otherReasonRadio.check();
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessage('Enter a reason')).toBeVisible();
    await expectOnlyKnownViolations(page, [knownFormLabelViolation], testInfo);
  });

  test('review specific access request validation state matches the known accessibility baseline', async ({
    accessRequestPage,
    page,
  }, testInfo) => {
    await setupReviewSpecificAccessMockRoutes(page);
    await accessRequestPage.gotoReviewSpecificRequest(ACCESS_REQUEST_REVIEW_PATH);
    await accessRequestPage.continueButton.click();
    await expect(accessRequestPage.errorMessage('Please select an option')).toBeVisible();
    await expectOnlyKnownViolations(page, [knownFormLabelViolation], testInfo);
  });

  test('review specific access duration validation state matches the known accessibility baseline', async ({
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
    await expectOnlyKnownViolations(page, [knownFormLabelViolation], testInfo);
  });

  test('review specific access request-more-information validation state matches the known accessibility baseline', async ({
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
    await expectOnlyKnownViolations(page, [knownFormLabelViolation], testInfo);
  });

  test('specific access invalid form exposes the GOV.UK error-summary focus contract', async ({ accessRequestPage, page }) => {
    await setupSpecificAccessRequestMockRoutes(page);
    await accessRequestPage.gotoSpecificAccessRequest(SPECIFIC_ACCESS_PATH);
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessage('Enter a reason')).toBeVisible();
    await expectFirstErrorSummaryLinkTargetsInvalidControl(page);
  });

  test('challenged access invalid form exposes the GOV.UK error-summary focus contract', async ({ accessRequestPage, page }) => {
    await setupChallengedAccessMockRoutes(page);
    await accessRequestPage.gotoChallengedAccessRequest(CHALLENGED_ACCESS_PATH);
    await accessRequestPage.submitButton.click();
    await expect(accessRequestPage.errorMessage('Select a reason')).toBeVisible();
    await expectFirstErrorSummaryLinkTargetsInvalidControl(page);
  });

  test('review specific access invalid form exposes the GOV.UK error-summary focus contract', async ({
    accessRequestPage,
    page,
  }) => {
    await setupReviewSpecificAccessMockRoutes(page);
    await accessRequestPage.gotoReviewSpecificRequest(ACCESS_REQUEST_REVIEW_PATH);
    await accessRequestPage.continueButton.click();
    await expect(accessRequestPage.errorMessage('Please select an option')).toBeVisible();
    await expectFirstErrorSummaryLinkTargetsInvalidControl(page);
  });

  test('review specific access service-down state has no automatically detectable accessibility violations', async ({
    accessRequestPage,
    page,
    axeUtils,
  }) => {
    await setupReviewSpecificAccessMockRoutes(page, { taskStatus: 500, taskBody: { message: 'task load failed' } });
    await accessRequestPage.gotoReviewSpecificRequestServiceDown(ACCESS_REQUEST_REVIEW_PATH);
    await expect(page).toHaveURL(/\/service-down$/);
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('role access delete exclusion page has no automatically detectable accessibility violations', async ({
    page,
    axeUtils,
  }) => {
    await page.goto('/role-access/delete-exclusion?caseId=1620409659381330&exclusionId=123');
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('role access allocate route shell has no automatically detectable accessibility violations', async ({
    page,
    axeUtils,
  }) => {
    await page.goto(
      '/role-access/allocate-role/allocate?caseId=1546883526751282&roleCategory=JUDICIAL&assignmentId=cc311b32-5aea-4cd1-8b72-911fb47c8a2e&actorId=38eb0c5e-29c7-453e-b92d-f2029aaed6c3&userName=Judge%20Beech&typeOfRole=Lead%20judge'
    );
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('all work tasks page matches the known accessibility baseline', async ({ page, taskListPage }, testInfo) => {
    await taskListPage.gotoAllWorkTasks();
    await expect(taskListPage.taskListTable).toBeVisible();
    await expectOnlyKnownViolations(
      page,
      [
        knownFormLabelViolation,
        {
          id: 'select-name',
          description: 'Ensure select element has an accessible name',
          maxNodes: 1,
        },
      ],
      testInfo
    );
  });

  test('all work tasks filters and table expose names for assistive technology', async ({ taskListPage }) => {
    await taskListPage.gotoAllWorkTasks();
    await expect(taskListPage.taskListTable).toBeVisible();
    await expect(taskListPage.filterPanel).toBeVisible();
    await expectFilterControlsHaveAccessibleNames(taskListPage.filterPanel);
    await expectTableHeadersAreNamed(taskListPage.taskListTable);
  });

  for (const staticPage of staticAndErrorPages) {
    test(`${staticPage.name} page exposes reachable content and named header links`, async ({ page }) => {
      await expectReachableMainContent(page, staticPage.path);
      await expectHeaderLinksHaveTextAlternative(page);
    });
  }

  test('accessibility statement page has no automatically detectable accessibility violations', async ({ page, axeUtils }) => {
    await page.goto('/accessibility');
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('cookies page has no automatically detectable accessibility violations', async ({ page, axeUtils }) => {
    await page.goto('/cookies');
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('privacy policy page has no automatically detectable accessibility violations', async ({ page, axeUtils }) => {
    await page.goto('/privacy-policy');
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('get help page has no automatically detectable accessibility violations', async ({ page, axeUtils }) => {
    await page.goto('/get-help');
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('terms and conditions page has no automatically detectable accessibility violations', async ({ page, axeUtils }) => {
    await page.goto('/terms-and-conditions');
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('not authorised page has no automatically detectable accessibility violations', async ({ page, axeUtils }) => {
    await page.goto('/not-authorised');
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });

  test('session error page has no automatically detectable accessibility violations', async ({ page, axeUtils }) => {
    await page.goto('/session-error');
    await expect(page.locator('main')).toBeVisible();
    await axeUtils.audit();
  });
});

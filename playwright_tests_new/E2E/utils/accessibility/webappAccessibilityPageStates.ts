import { expect, type Page, type TestInfo } from '@playwright/test';
import type { CustomFixtures } from '../../fixtures';
import {
  ACCESS_REQUEST_REVIEW_PATH,
  CHALLENGED_ACCESS_PATH,
  SPECIFIC_ACCESS_PATH,
  buildBookingUiBootstrapUser,
  caseDetailsUrl,
  continueHearingsFlow,
  createGlobalSearchResultsRouteHandler,
  gotoCaseDetailsWithRetry,
  hearingManagerRoles,
  setupFastCaseRetrievalConfigRoute,
  setupAllWorkCasesRoutes,
  setupBookingUiMockRoutes,
  setupCaseFileViewMockRoutes,
  setupCaseListMocks,
  setupCaseShareMockRoutes,
  setupChallengedAccessMockRoutes,
  setupHearingsMockRoutes,
  setupManageTasksBaseRoutes,
  setupMyAccessRoutes,
  setupMyCasesRoutes,
  setupReviewSpecificAccessMockRoutes,
  setupRestrictedAccessMocks,
  setupRolesAndAccessMockRoutes,
  setupSpecificAccessRequestMockRoutes,
  setupTaskListMockRoutes,
  setupGlobalSearchMockRoutes,
  submitGlobalSearchFromMenu,
  submitHeaderQuickSearch,
} from '../../../integration/helpers';
import { buildExistingBookingsMock, singleLocationMock } from '../../../integration/mocks/bookingUI.mock';
import { buildCaseListMock } from '../../../integration/mocks/caseList.mock';
import {
  buildGlobalSearchCaseDetailsMock,
  buildGlobalSearchJurisdictionsMock,
  buildGlobalSearchMenuResultsMock,
  buildGlobalSearchNoResultsMock as buildGlobalSearchMenuNoResultsMock,
  buildGlobalSearchServicesMock as buildGlobalSearchMenuServicesMock,
  GLOBAL_SEARCH_CASE_REFERENCE,
  GLOBAL_SEARCH_NON_EXISTENT_CASE_REFERENCE,
} from '../../../integration/mocks/globalSearch.mock';
import { LISTED_HEARING_SCENARIO } from '../../../integration/mocks/hearings.mock';
import { pagedAllWorkCases } from '../../../integration/mocks/manageTasksAllWork.mock';
import { buildMyAccessCases } from '../../../integration/mocks/myAccess.mock';
import { buildMyCaseMock } from '../../../integration/mocks/myCases.mock';
import {
  buildGlobalSearchNoResultsMock,
  buildGlobalSearchResultsMock,
  buildGlobalSearchServicesMock,
  buildSearchCaseJurisdictionsMock,
  VALID_SEARCH_CASE_REFERENCE,
} from '../../../integration/mocks/search.mock';
import { TEST_USERS } from '../../../integration/testData';
import { buildMyTaskListMock } from '../../../integration/mocks/taskList.mock';
import type { AccessibilityEngine } from './accessibilityAudit';
import { setupAccessibilityMockSession } from './accessibilityMockSession';
import type { KnownAxeViolation } from './axeKnownViolations';

export type AccessibilityFixtures = CustomFixtures & {
  page: Page;
};

export type AccessibilityPageState = {
  title: string;
  feature: string;
  engines?: AccessibilityEngine[];
  axeKnownViolations?: KnownAxeViolation[];
  setup: (fixtures: AccessibilityFixtures, testInfo: TestInfo) => Promise<void>;
};

const knownFormLabelViolation: KnownAxeViolation = {
  id: 'label',
  description: 'Ensure every form element has a label',
  maxNodes: 1,
};

const allWorkKnownViolations: KnownAxeViolation[] = [
  knownFormLabelViolation,
  {
    id: 'select-name',
    description: 'Ensure select element has an accessible name',
    maxNodes: 1,
  },
];

const staticAndErrorPages = [
  { path: '/accessibility', title: 'accessibility statement' },
  { path: '/cookies', title: 'cookies' },
  { path: '/privacy-policy', title: 'privacy policy' },
  { path: '/get-help', title: 'get help' },
  { path: '/terms-and-conditions', title: 'terms and conditions' },
  { path: '/legacy-terms-and-conditions', title: 'legacy terms and conditions' },
  { path: '/accept-terms-and-conditions', title: 'accept terms and conditions' },
  { path: '/service-down', title: 'service down' },
  { path: '/booking-service-down', title: 'booking service down' },
  { path: '/booking-system-error', title: 'booking system error' },
  { path: '/not-authorised', title: 'not authorised' },
  { path: '/expired-login-link', title: 'expired login link' },
  { path: '/idle-sign-out', title: 'idle sign out' },
  { path: '/session-error', title: 'session error' },
];

const mainContent = (page: Page) => page.locator('main').first();
const staffUser = {
  userId: 'a11y-staff-admin',
  roles: ['caseworker', 'pui-case-manager', 'caseworker-ia-caseofficer', 'task-supervisor', 'case-allocator'],
  roleCategory: 'LEGAL_OPERATIONS',
  roleAssignmentInfo: [
    {
      jurisdiction: 'IA',
      roleName: 'task-supervisor',
      roleType: 'ORGANISATION',
      substantive: true,
    },
  ],
};
const solicitorUser = {
  userId: 'a11y-solicitor',
  roles: ['caseworker', 'caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-publiclaw', 'pui-case-manager'],
  roleCategory: 'PROFESSIONAL',
  roleAssignmentInfo: [
    {
      jurisdiction: 'IA',
      roleName: 'caseworker-ia',
      roleType: 'ORGANISATION',
      substantive: true,
    },
  ],
};
const globalSearchUser = {
  userId: 'a11y-global-search',
  roles: ['caseworker', 'caseworker-publiclaw', 'caseworker-ia-caseofficer'],
  roleCategory: 'LEGAL_OPERATIONS',
  roleAssignmentInfo: [
    {
      jurisdiction: 'PUBLICLAW',
      roleName: 'caseworker-publiclaw',
      roleType: 'ORGANISATION',
      substantive: true,
    },
  ],
};
const hearingUser = {
  userId: 'a11y-hearing-manager',
  roles: hearingManagerRoles,
  roleCategory: 'LEGAL_OPERATIONS',
  roleAssignmentInfo: [
    {
      jurisdiction: 'PRIVATELAW',
      roleName: 'hearing-manager',
      roleType: 'ORGANISATION',
      substantive: true,
    },
  ],
};
const globalSearchMenuResultsHandler = createGlobalSearchResultsRouteHandler({
  matchingCaseReference: GLOBAL_SEARCH_CASE_REFERENCE,
  successResponse: buildGlobalSearchMenuResultsMock(),
  noResultsResponse: buildGlobalSearchMenuNoResultsMock(),
});
const restrictedAccessSearchResultsHandler = createGlobalSearchResultsRouteHandler({
  matchingCaseReference: VALID_SEARCH_CASE_REFERENCE,
  successResponse: buildGlobalSearchResultsMock(VALID_SEARCH_CASE_REFERENCE),
  noResultsResponse: buildGlobalSearchNoResultsMock(),
});

async function expectMainContent(page: Page): Promise<void> {
  await expect(mainContent(page)).toBeVisible();
}

async function setupStaffAccessibilitySession(page: Page): Promise<void> {
  await setupAccessibilityMockSession(page, { userDetails: staffUser });
}

async function setupSolicitorAccessibilitySession(page: Page): Promise<void> {
  await setupAccessibilityMockSession(page, { userDetails: solicitorUser });
}

async function setupHearingAccessibilitySession(page: Page): Promise<void> {
  await setupAccessibilityMockSession(page, { userDetails: hearingUser });
}

export const accessibilityPageStates: AccessibilityPageState[] = [
  {
    title: 'task list with mocked assigned work',
    feature: 'work allocation',
    setup: async ({ page, taskListPage }) => {
      await setupManageTasksBaseRoutes(page, { taskListResponse: buildMyTaskListMock('a11y-staff-admin', 3) });
      await taskListPage.goto();
      await expect(taskListPage.taskListTable).toBeVisible();
    },
  },
  {
    title: 'all work tasks with mocked filters and table',
    feature: 'work allocation',
    axeKnownViolations: allWorkKnownViolations,
    setup: async ({ page, taskListPage }) => {
      await setupManageTasksBaseRoutes(page, { taskListResponse: buildMyTaskListMock('a11y-staff-admin', 5) });
      await taskListPage.gotoAllWorkTasks();
      await expect(taskListPage.taskListTable).toBeVisible();
    },
  },
  {
    title: 'all work cases with mocked results',
    feature: 'work allocation',
    setup: async ({ page, taskListPage }) => {
      await setupAllWorkCasesRoutes(page, {
        cases: pagedAllWorkCases.slice(0, 4),
        total_records: 4,
        unique_cases: 4,
      });
      await taskListPage.gotoAllWorkCases();
      await expectMainContent(page);
    },
  },
  {
    title: 'my cases with mocked results',
    feature: 'work allocation',
    setup: async ({ page, taskListPage }) => {
      await setupMyCasesRoutes(page, [
        buildMyCaseMock({ id: 'a11y-my-case-1', case_id: '1800000000001001', case_name: 'A11y my case 1' }),
        buildMyCaseMock({ id: 'a11y-my-case-2', case_id: '1800000000001002', case_name: 'A11y my case 2' }),
      ]);
      await taskListPage.gotoMyCases();
      await expectMainContent(page);
    },
  },
  {
    title: 'my access with mocked results',
    feature: 'work allocation',
    setup: async ({ page, taskListPage }) => {
      await setupMyAccessRoutes(
        page,
        buildMyAccessCases(2, (index) => ({
          id: `a11y-my-access-${index + 1}`,
          case_id: `180000000000200${index + 1}`,
          case_name: `A11y access case ${index + 1}`,
        }))
      );
      await taskListPage.gotoMyAccess();
      await expectMainContent(page);
    },
  },
  {
    title: 'case list with mocked search results',
    feature: 'case list',
    setup: async ({ page, caseListPage }) => {
      await setupSolicitorAccessibilitySession(page);
      await setupCaseListMocks(page, { searchResponse: buildCaseListMock(5) });
      await caseListPage.navigateTo();
      await expect(caseListPage.container).toBeVisible();
    },
  },
  {
    title: 'case list empty state',
    feature: 'case list',
    setup: async ({ page, caseListPage }) => {
      await setupSolicitorAccessibilitySession(page);
      await setupCaseListMocks(page, {
        searchResponse: {
          columns: [],
          results: [],
          total: 0,
        },
      });
      await caseListPage.navigateTo();
      await expect(caseListPage.caseSearchResultsMessage).toContainText('No cases found');
    },
  },
  {
    title: 'case search filter shell',
    feature: 'case search',
    axeKnownViolations: [
      {
        id: 'aria-valid-attr-value',
        description: 'Ensure all ARIA attributes have valid values',
        maxNodes: 1,
      },
    ],
    setup: async ({ page, caseListPage }) => {
      await setupSolicitorAccessibilitySession(page);
      await setupCaseListMocks(page, { searchResponse: buildCaseListMock(3) });
      await page.goto('/cases/case-search');
      await expect(caseListPage.filtersContainer).toBeVisible();
    },
  },
  {
    title: 'global search results from mocked menu search',
    feature: 'global search',
    setup: async ({ page, globalSearchPage }, testInfo) => {
      testInfo.annotations.push({ type: 'session-user', description: globalSearchUser.userId });
      await setupAccessibilityMockSession(page, { userDetails: globalSearchUser });
      await setupGlobalSearchMockRoutes(page, {
        jurisdictions: buildGlobalSearchJurisdictionsMock(),
        services: buildGlobalSearchMenuServicesMock(),
        searchResultsHandler: globalSearchMenuResultsHandler,
        caseDetailsHandler: async (route) => {
          const requestUrl = route.request().url();
          const caseReference = requestUrl.split('/').pop() ?? GLOBAL_SEARCH_CASE_REFERENCE;
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(buildGlobalSearchCaseDetailsMock(caseReference)),
          });
        },
      });
      await submitGlobalSearchFromMenu(GLOBAL_SEARCH_CASE_REFERENCE, globalSearchPage, page);
      await expect(globalSearchPage.searchResultsHeader).toHaveText('Search results');
      await expect(globalSearchPage.searchResultsTable).toBeVisible();
    },
  },
  {
    title: 'global search no-results state',
    feature: 'global search',
    setup: async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'session-user', description: solicitorUser.userId });
      await setupSolicitorAccessibilitySession(page);
      await setupGlobalSearchMockRoutes(page, {
        jurisdictions: buildGlobalSearchJurisdictionsMock(),
        services: buildGlobalSearchMenuServicesMock(),
        searchResultsHandler: globalSearchMenuResultsHandler,
      });
      await page.goto(`/search/noresults?caseReference=${GLOBAL_SEARCH_NON_EXISTENT_CASE_REFERENCE}&service=PUBLICLAW`);
      await expect(page).toHaveURL(/\/search\/noresults/);
      await expect(page.getByRole('heading', { level: 1, name: 'No results found' })).toBeVisible();
    },
  },
  {
    title: 'restricted case access users table',
    feature: 'restricted access',
    setup: async ({ page, caseDetailsPage, searchCasePage }) => {
      await setupAccessibilityMockSession(page, {
        userDetails: {
          userId: TEST_USERS.FPL_GLOBAL_SEARCH,
          roles: ['caseworker', 'caseworker-publiclaw'],
          roleCategory: 'LEGAL_OPERATIONS',
        },
      });
      await setupFastCaseRetrievalConfigRoute(page);
      await setupGlobalSearchMockRoutes(page, {
        jurisdictions: buildSearchCaseJurisdictionsMock(),
        services: buildGlobalSearchServicesMock(),
        searchResultsHandler: restrictedAccessSearchResultsHandler,
      });
      await page.route('**/data/internal/cases/**', async (route) => {
        await route.fulfill({
          status: 403,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Restricted case access' }),
        });
      });
      await setupRestrictedAccessMocks(page);
      await submitHeaderQuickSearch(VALID_SEARCH_CASE_REFERENCE, searchCasePage);
      await expect(page).toHaveURL(new RegExp(`/cases/restricted-case-access/${VALID_SEARCH_CASE_REFERENCE}`));
      await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Users with access' })).toBeVisible();
    },
  },
  {
    title: 'case share validation state',
    feature: 'case sharing',
    setup: async ({ page }) => {
      await setupStaffAccessibilitySession(page);
      await setupCaseShareMockRoutes(page);
      await page.goto('/cases/case-share?init=true');
      await page.locator('#share-case-nav button').first().click();
      await expect(page.locator('.govuk-error-summary')).toBeVisible();
    },
  },
  {
    title: 'specific access request validation state',
    feature: 'access requests',
    axeKnownViolations: [knownFormLabelViolation],
    setup: async ({ page, accessRequestPage }) => {
      await setupStaffAccessibilitySession(page);
      await setupSpecificAccessRequestMockRoutes(page);
      await accessRequestPage.gotoSpecificAccessRequest(SPECIFIC_ACCESS_PATH);
      await accessRequestPage.submitButton.click();
      await expect(accessRequestPage.errorMessage('Enter a reason')).toBeVisible();
    },
  },
  {
    title: 'specific access request submission failure state',
    feature: 'access requests',
    axeKnownViolations: [knownFormLabelViolation],
    setup: async ({ page, accessRequestPage }) => {
      await setupStaffAccessibilitySession(page);
      await setupSpecificAccessRequestMockRoutes(page, {
        specificAccessStatus: 500,
        specificAccessBody: { message: 'specific access request failed' },
      });
      await accessRequestPage.gotoSpecificAccessRequest(SPECIFIC_ACCESS_PATH);
      await accessRequestPage.specificAccessReasonInput.fill('Urgent linked hearing preparation required.');
      await accessRequestPage.submitButton.click();
      await expect(accessRequestPage.specificAccessContainer).toBeVisible();
    },
  },
  {
    title: 'challenged access request validation state',
    feature: 'access requests',
    setup: async ({ page, accessRequestPage }) => {
      await setupStaffAccessibilitySession(page);
      await setupChallengedAccessMockRoutes(page);
      await accessRequestPage.gotoChallengedAccessRequest(CHALLENGED_ACCESS_PATH);
      await accessRequestPage.submitButton.click();
      await expect(accessRequestPage.errorMessage('Select a reason')).toBeVisible();
    },
  },
  {
    title: 'challenged access linked-case validation state',
    feature: 'access requests',
    setup: async ({ page, accessRequestPage }) => {
      await setupStaffAccessibilitySession(page);
      await setupChallengedAccessMockRoutes(page);
      await accessRequestPage.gotoChallengedAccessRequest(CHALLENGED_ACCESS_PATH);
      await accessRequestPage.linkedCaseReasonRadio.check();
      await accessRequestPage.submitButton.click();
      await expect(accessRequestPage.errorMessage('Enter a case reference')).toBeVisible();
    },
  },
  {
    title: 'review specific access validation state',
    feature: 'access requests',
    axeKnownViolations: [knownFormLabelViolation],
    setup: async ({ page, accessRequestPage }) => {
      await setupStaffAccessibilitySession(page);
      await setupReviewSpecificAccessMockRoutes(page);
      await accessRequestPage.gotoReviewSpecificRequest(ACCESS_REQUEST_REVIEW_PATH);
      await accessRequestPage.continueButton.click();
      await expect(accessRequestPage.errorMessage('Please select an option')).toBeVisible();
    },
  },
  {
    title: 'review specific access service-down state',
    feature: 'access requests',
    setup: async ({ page, accessRequestPage }) => {
      await setupStaffAccessibilitySession(page);
      await setupReviewSpecificAccessMockRoutes(page, { taskStatus: 500, taskBody: { message: 'task load failed' } });
      await accessRequestPage.gotoReviewSpecificRequestServiceDown(ACCESS_REQUEST_REVIEW_PATH);
      await expect(page).toHaveURL(/\/service-down$/);
      await expectMainContent(page);
    },
  },
  {
    title: 'case file view tree and media viewer',
    feature: 'case file view',
    setup: async ({ page, caseDetailsPage, caseFileViewPage }) => {
      const caseId = '1690807693531270';
      await setupStaffAccessibilitySession(page);
      await setupCaseFileViewMockRoutes(page, caseId);
      await caseDetailsPage.openCaseDetails('PRIVATELAW', 'PRLAPPS', caseId);
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();
    },
  },
  {
    title: 'hearings tab listed state',
    feature: 'hearings',
    setup: async ({ page, caseDetailsPage, hearingsTabPage }) => {
      await setupHearingAccessibilitySession(page);
      const routeConfig = {
        userRoles: hearingManagerRoles,
        hearings: [LISTED_HEARING_SCENARIO],
      };
      await setupHearingsMockRoutes(page, routeConfig);
      await gotoCaseDetailsWithRetry(page, caseDetailsUrl());
      await caseDetailsPage.selectCaseDetailsTab('Hearings');
      await expect(hearingsTabPage.requestHearingButton).toBeVisible();
    },
  },
  {
    title: 'hearings create request first validation step',
    feature: 'hearings',
    setup: async ({ page, caseDetailsPage, hearingsTabPage }) => {
      await setupHearingAccessibilitySession(page);
      const routeConfig = {
        userRoles: hearingManagerRoles,
        hearings: [LISTED_HEARING_SCENARIO],
      };
      await setupHearingsMockRoutes(page, routeConfig);
      await gotoCaseDetailsWithRetry(page, caseDetailsUrl());
      await caseDetailsPage.selectCaseDetailsTab('Hearings');
      await hearingsTabPage.openRequestHearing();
      await expect(page.getByRole('heading', { name: /hearing requirements/i })).toBeVisible();
      await continueHearingsFlow(page);
      await expect(page.getByRole('heading', { name: /do you require any additional facilities\?/i })).toBeVisible();
    },
  },
  {
    title: 'booking UI work access page',
    feature: 'booking',
    setup: async ({ page, bookingUiPage }) => {
      const userId = 'a11y-booking-user';
      await setupTaskListMockRoutes(page, buildMyTaskListMock(userId, 3), {
        bootstrapUser: buildBookingUiBootstrapUser(userId),
      });
      await setupBookingUiMockRoutes(page, {
        locationResponseBody: singleLocationMock,
        getBookingsResponseBody: buildExistingBookingsMock(userId),
      });
      await bookingUiPage.goto();
      await expect(bookingUiPage.heading).toBeVisible();
    },
  },
  {
    title: 'role access delete exclusion shell',
    feature: 'role access',
    setup: async ({ page }) => {
      const caseId = '1620409659381330';
      await setupStaffAccessibilitySession(page);
      await setupRolesAndAccessMockRoutes(page, { caseId, jurisdiction: 'IA', isCaseAllocator: true });
      await page.goto(`/role-access/delete-exclusion?caseId=${caseId}&exclusionId=123`);
      await expectMainContent(page);
    },
  },
  {
    title: 'role access allocate route shell',
    feature: 'role access',
    setup: async ({ page }) => {
      const caseId = '1546883526751282';
      await setupStaffAccessibilitySession(page);
      await setupRolesAndAccessMockRoutes(page, { caseId, jurisdiction: 'IA', isCaseAllocator: true });
      await page.goto(
        `/role-access/allocate-role/allocate?caseId=${caseId}&roleCategory=JUDICIAL&assignmentId=cc311b32-5aea-4cd1-8b72-911fb47c8a2e&actorId=38eb0c5e-29c7-453e-b92d-f2029aaed6c3&userName=Judge%20Beech&typeOfRole=Lead%20judge`
      );
      await expectMainContent(page);
    },
  },
  ...staticAndErrorPages.map<AccessibilityPageState>((staticPage) => ({
    title: `${staticPage.title} static/error page`,
    feature: 'static and error pages',
    setup: async ({ page }) => {
      await setupStaffAccessibilitySession(page);
      await page.goto(staticPage.path);
      await expectMainContent(page);
    },
  })),
];

export const lighthouseAccessibilityPageStates: AccessibilityPageState[] = [
  {
    title: 'authenticated case list lighthouse smoke',
    feature: 'case list',
    setup: async ({ page }) => {
      await setupSolicitorAccessibilitySession(page);
      await setupCaseListMocks(page, { searchResponse: buildCaseListMock(3) });
      await page.goto('/cases');
      await expect(mainContent(page)).toBeVisible();
      await expect(page.locator('exui-case-list, ccd-case-list, .case-list, .govuk-table').first()).toBeVisible();
    },
  },
  {
    title: 'authenticated task list lighthouse smoke',
    feature: 'work allocation',
    setup: async ({ page }) => {
      await setupManageTasksBaseRoutes(page, { taskListResponse: buildMyTaskListMock('a11y-staff-admin', 3) });
      await page.goto('/work/my-work/list');
      await expectMainContent(page);
      await expect(page.locator('table, exui-task-list').first()).toBeVisible();
    },
  },
  {
    title: 'authenticated case sharing validation lighthouse smoke',
    feature: 'case sharing',
    setup: async ({ page }) => {
      await setupStaffAccessibilitySession(page);
      await setupCaseShareMockRoutes(page);
      await page.goto('/cases/case-share?init=true');
      await page.locator('#share-case-nav button').first().click();
      await expectMainContent(page);
      await expect(page.locator('.govuk-error-summary')).toBeVisible();
    },
  },
];

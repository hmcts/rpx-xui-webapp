import type { Page } from '@playwright/test';
import { buildHearingsEnvironmentConfigMock, buildHearingsUserDetailsMock } from '../mocks/hearings.mock';
import { setupFastCaseRetrievalConfigRoute } from './caseSearchMockRoutes.helper';
import { setupTaskListBootstrapRoutes } from './taskListMockRoutes.helper';

export const ACCESS_REQUEST_CASE_ID = '1111222233334444';
export const ACCESS_REQUEST_TASK_ID = 'task-review-specific-access';
export const ACCESS_REQUEST_ASSIGNMENT_ID = 'assignment-review-specific-access';
export const ACCESS_REQUEST_JURISDICTION = 'PUBLICLAW';
export const ACCESS_REQUEST_CASE_TYPE = 'CARE_SUPERVISION_EPO';
export const ACCESS_REQUEST_CASE_NAME = 'Test Access Request Case';
export const ACCESS_REQUEST_SERVICE_NAME = 'Immigration & Asylum';
export const ACCESS_REQUEST_REQUESTER_ID = 'caseworker-123';
export const ACCESS_REQUEST_REASON = 'Need to review linked proceedings';
export const ACCESS_REQUEST_REQUESTED_ROLE = 'specific-access-legal-ops';
export const ACCESS_REQUEST_REVIEW_PATH = `/role-access/${ACCESS_REQUEST_TASK_ID}/assignment/${ACCESS_REQUEST_ASSIGNMENT_ID}/specific-access`;
export const ACCESS_REQUEST_CASE_DETAILS_PATH = `/cases/case-details/${ACCESS_REQUEST_JURISDICTION}/${ACCESS_REQUEST_CASE_TYPE}/${ACCESS_REQUEST_CASE_ID}`;
export const SPECIFIC_ACCESS_PATH = `${ACCESS_REQUEST_CASE_DETAILS_PATH}/specific-access-request`;
export const CHALLENGED_ACCESS_PATH = `${ACCESS_REQUEST_CASE_DETAILS_PATH}/challenged-access-request`;

const DEFAULT_USER_ROLES = ['pui-case-manager'];

type AccessRequestUserConfig = {
  userRoles?: string[];
  jurisdiction?: string;
  caseTypeId?: string;
};

type ReviewSpecificAccessMockOptions = AccessRequestUserConfig & {
  taskId?: string;
  assignmentId?: string;
  taskStatus?: number;
  taskBody?: unknown;
  roleAccessStatus?: number;
  roleAccessBody?: unknown;
  supportedJurisdictions?: string[];
  caseworkersStatus?: number;
  caseworkersBody?: unknown;
  judicialUsersStatus?: number;
  judicialUsersBody?: unknown;
  approvalStatus?: number;
  approvalBody?: unknown;
  requestMoreInformationStatus?: number;
  requestMoreInformationBody?: unknown;
};

type ChallengedAccessMockOptions = AccessRequestUserConfig & {
  caseId?: string;
  caseDetailsStatus?: number;
  caseDetailsBody?: unknown;
  manageLabellingStatus?: number;
  manageLabellingBody?: unknown;
  challengedAccessStatus?: number;
  challengedAccessBody?: unknown;
  challengedAccessUpdateStatus?: number;
  challengedAccessUpdateBody?: unknown;
};

type SpecificAccessRequestMockOptions = AccessRequestUserConfig & {
  caseId?: string;
  caseDetailsStatus?: number;
  caseDetailsBody?: unknown;
  manageLabellingStatus?: number;
  manageLabellingBody?: unknown;
  specificAccessStatus?: number;
  specificAccessBody?: unknown;
  specificAccessUpdateStatus?: number;
  specificAccessUpdateBody?: unknown;
};

type MockCaseworker = {
  email: string;
  firstName: string;
  idamId: string;
  lastName: string;
  location: {
    id: number;
    locationName: string;
  };
  roleCategory: string;
  service: string;
};

function buildTextField(id: string, label: string, value: string | number, metadata = false) {
  return {
    id,
    label,
    value,
    metadata,
    field_type: {
      id: 'Text',
      type: 'Text',
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null,
      min: null,
      max: null,
      regular_expression: null,
    },
  };
}

function buildSummaryField(id: string, label: string, value: string) {
  return {
    ...buildTextField(id, label, value, false),
    value_class: '',
    display_context: 'READONLY',
    show_condition: null,
    hint_text: null,
  };
}

export function buildReviewSpecificAccessTaskMock(overrides: Partial<Record<string, unknown>> = {}) {
  const taskId = (overrides.id as string) ?? ACCESS_REQUEST_TASK_ID;
  const caseId = (overrides.case_id as string) ?? ACCESS_REQUEST_CASE_ID;
  const jurisdiction = (overrides.jurisdiction as string) ?? ACCESS_REQUEST_JURISDICTION;
  const caseTypeId = (overrides.case_type_id as string) ?? ACCESS_REQUEST_CASE_TYPE;
  const caseName = (overrides.case_name as string) ?? ACCESS_REQUEST_CASE_NAME;

  return {
    task: {
      id: taskId,
      case_id: caseId,
      jurisdiction,
      case_type_id: caseTypeId,
      case_name: caseName,
      state: 'assigned',
      ...overrides,
    },
  };
}

export function buildSpecificAccessRoleMock(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    id: ACCESS_REQUEST_ASSIGNMENT_ID,
    actorId: ACCESS_REQUEST_REQUESTER_ID,
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'Case role A',
    requestedRole: ACCESS_REQUEST_REQUESTED_ROLE,
    notes: ACCESS_REQUEST_REASON,
    created: '2025-03-11T10:30:00.000Z',
    start: '2025-03-11T10:30:00.000Z',
    end: null,
    location: 'Taylor House',
    email: 'alice@example.com',
    ...overrides,
  };
}

export function buildSpecificAccessCaseworkerMock(overrides: Partial<MockCaseworker> = {}): MockCaseworker {
  return {
    email: 'alice@example.com',
    firstName: 'Alice',
    idamId: ACCESS_REQUEST_REQUESTER_ID,
    lastName: 'Example',
    location: {
      id: 227101,
      locationName: 'Taylor House',
    },
    roleCategory: 'LEGAL_OPERATIONS',
    service: ACCESS_REQUEST_SERVICE_NAME,
    ...overrides,
  };
}

function buildAccessRequestCaseDetailsMock(
  accessProcess: 'CHALLENGED' | 'SPECIFIC',
  overrides: Partial<Record<string, unknown>> = {}
): Record<string, unknown> {
  const caseId = (overrides.case_id as string) ?? ACCESS_REQUEST_CASE_ID;
  const jurisdiction =
    (overrides.case_type as { jurisdiction?: { id?: string } })?.jurisdiction?.id ?? ACCESS_REQUEST_JURISDICTION;
  const jurisdictionName =
    (overrides.case_type as { jurisdiction?: { name?: string } })?.jurisdiction?.name ?? ACCESS_REQUEST_SERVICE_NAME;
  const caseTypeId = (overrides.case_type as { id?: string })?.id ?? ACCESS_REQUEST_CASE_TYPE;
  const caseName =
    (overrides.basicFields as { caseNameHmctsInternal?: string })?.caseNameHmctsInternal ?? ACCESS_REQUEST_CASE_NAME;

  return {
    _links: {
      self: {
        href: `http://localhost:3000/data/internal/cases/${caseId}`,
      },
    },
    case_id: caseId,
    case_type: {
      id: caseTypeId,
      name: caseTypeId,
      description: `${caseTypeId} integration case type`,
      jurisdiction: {
        id: jurisdiction,
        name: jurisdictionName,
        description: `${jurisdiction} jurisdiction`,
      },
      printEnabled: false,
    },
    basicFields: {
      caseNameHmctsInternal: caseName,
    },
    tabs: [
      {
        id: 'caseSummary',
        label: 'Case summary',
        order: 1,
        fields: [buildSummaryField('caseNameHmctsInternal', 'Case name', caseName)],
      },
    ],
    metadataFields: [
      buildTextField('[CASE_REFERENCE]', 'Case Reference', Number(caseId), true),
      buildTextField('[JURISDICTION]', 'Jurisdiction', jurisdiction, true),
      buildTextField('[CASE_TYPE]', 'Case Type', caseTypeId, true),
      buildTextField('[ACCESS_PROCESS]', 'Access Process', accessProcess, true),
      buildTextField('[ACCESS_GRANTED]', 'Access Granted', 'BASIC', true),
    ],
    state: {
      id: 'Open',
      name: 'Open',
      description: 'Open case',
      title_display: '# ${[CASE_REFERENCE]}',
    },
    triggers: [
      {
        id: 'updateCase',
        name: 'Update case',
        description: 'Update case details',
        order: 1,
      },
    ],
    events: [],
    channels: [],
    ...overrides,
  };
}

export function buildChallengedAccessCaseDetailsMock(overrides: Partial<Record<string, unknown>> = {}): Record<string, unknown> {
  return buildAccessRequestCaseDetailsMock('CHALLENGED', overrides);
}

export function buildSpecificAccessCaseDetailsMock(overrides: Partial<Record<string, unknown>> = {}): Record<string, unknown> {
  return buildAccessRequestCaseDetailsMock('SPECIFIC', overrides);
}

async function setupAccessRequestShellRoutes(page: Page, config: AccessRequestUserConfig = {}): Promise<void> {
  const jurisdiction = config.jurisdiction ?? ACCESS_REQUEST_JURISDICTION;
  const caseTypeId = config.caseTypeId ?? ACCESS_REQUEST_CASE_TYPE;
  const userDetails = buildHearingsUserDetailsMock(config.userRoles ?? DEFAULT_USER_ROLES);
  const environmentConfig = buildHearingsEnvironmentConfigMock({
    enabledCaseVariations: [{ jurisdiction, caseType: caseTypeId }],
    amendmentCaseVariations: [{ jurisdiction, caseType: caseTypeId }],
  });

  await setupFastCaseRetrievalConfigRoute(page);
  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
  }, userDetails.userInfo);

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.route(/\/external\/config\/ui(?:\/|\?|$)/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(environmentConfig),
    });
  });
}

export async function setupReviewSpecificAccessMockRoutes(
  page: Page,
  options: ReviewSpecificAccessMockOptions = {}
): Promise<void> {
  const jurisdiction = options.jurisdiction ?? ACCESS_REQUEST_JURISDICTION;
  const caseTypeId = options.caseTypeId ?? ACCESS_REQUEST_CASE_TYPE;
  const taskId = options.taskId ?? ACCESS_REQUEST_TASK_ID;

  await setupAccessRequestShellRoutes(page, options);
  await setupTaskListBootstrapRoutes(
    page,
    options.supportedJurisdictions ?? [jurisdiction],
    (options.supportedJurisdictions ?? [jurisdiction]).map((serviceId) => ({ serviceId, serviceName: serviceId }))
  );

  await page.route(`**/workallocation/task/${taskId}*`, async (route) => {
    await route.fulfill({
      status: options.taskStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.taskBody ?? buildReviewSpecificAccessTaskMock({ jurisdiction, case_type_id: caseTypeId })),
    });
  });

  await page.route('**/api/role-access/roles/access-get*', async (route) => {
    await route.fulfill({
      status: options.roleAccessStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.roleAccessBody ?? [buildSpecificAccessRoleMock()]),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: options.caseworkersStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.caseworkersBody ?? [buildSpecificAccessCaseworkerMock({ service: jurisdiction })]),
    });
  });

  await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
    await route.fulfill({
      status: options.judicialUsersStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.judicialUsersBody ?? []),
    });
  });

  await page.route('**/api/am/specific-access-approval*', async (route) => {
    await route.fulfill({
      status: options.approvalStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.approvalBody ?? {}),
    });
  });

  await page.route('**/api/specific-access-request/request-more-information*', async (route) => {
    await route.fulfill({
      status: options.requestMoreInformationStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.requestMoreInformationBody ?? {}),
    });
  });

  await page.route('**/api/specific-access-request/update-attributes*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });
}

export async function setupChallengedAccessMockRoutes(page: Page, options: ChallengedAccessMockOptions = {}): Promise<void> {
  const jurisdiction = options.jurisdiction ?? ACCESS_REQUEST_JURISDICTION;
  const caseTypeId = options.caseTypeId ?? ACCESS_REQUEST_CASE_TYPE;
  const caseId = options.caseId ?? ACCESS_REQUEST_CASE_ID;

  await setupAccessRequestShellRoutes(page, options);
  await setupTaskListBootstrapRoutes(page, [jurisdiction], [{ serviceId: jurisdiction, serviceName: jurisdiction }]);

  await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
    await route.fulfill({
      status: options.caseDetailsStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.caseDetailsBody ?? buildChallengedAccessCaseDetailsMock()),
    });
  });

  await page.route(`**/api/role-access/roles/manageLabellingRoleAssignment/${caseId}*`, async (route) => {
    await route.fulfill({
      status: options.manageLabellingStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.manageLabellingBody ?? {}),
    });
  });

  await page.route('**/api/challenged-access-request/update-attributes*', async (route) => {
    await route.fulfill({
      status: options.challengedAccessUpdateStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.challengedAccessUpdateBody ?? {}),
    });
  });

  await page.route('**/api/challenged-access-request*', async (route) => {
    await route.fulfill({
      status: options.challengedAccessStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.challengedAccessBody ?? {}),
    });
  });
}

export async function setupSpecificAccessRequestMockRoutes(
  page: Page,
  options: SpecificAccessRequestMockOptions = {}
): Promise<void> {
  const jurisdiction = options.jurisdiction ?? ACCESS_REQUEST_JURISDICTION;
  const caseId = options.caseId ?? ACCESS_REQUEST_CASE_ID;

  await setupAccessRequestShellRoutes(page, options);
  await setupTaskListBootstrapRoutes(page, [jurisdiction], [{ serviceId: jurisdiction, serviceName: jurisdiction }]);

  await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
    await route.fulfill({
      status: options.caseDetailsStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.caseDetailsBody ?? buildSpecificAccessCaseDetailsMock()),
    });
  });

  await page.route(`**/api/role-access/roles/manageLabellingRoleAssignment/${caseId}*`, async (route) => {
    await route.fulfill({
      status: options.manageLabellingStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.manageLabellingBody ?? {}),
    });
  });

  await page.route('**/api/specific-access-request/update-attributes*', async (route) => {
    await route.fulfill({
      status: options.specificAccessUpdateStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.specificAccessUpdateBody ?? {}),
    });
  });

  await page.route('**/api/specific-access-request*', async (route) => {
    await route.fulfill({
      status: options.specificAccessStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.specificAccessBody ?? {}),
    });
  });
}

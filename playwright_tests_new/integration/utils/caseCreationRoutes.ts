import type { Page, Route } from '@playwright/test';
import type { CreateCasePage } from '../../E2E/page-objects/pages/exui/createCase.po';

export const CREATED_CASE_ID = '1234123412341234';
export const CREATED_CASE_JURISDICTION = 'DIVORCE';
export const CREATED_CASE_TYPE = 'xuiTestJurisdiction';
export const CREATED_CASE_DETAILS_PATH = `/cases/case-details/${CREATED_CASE_JURISDICTION}/${CREATED_CASE_TYPE}/${CREATED_CASE_ID}`;

type SubmittedCaseData = {
  Gender?: string;
  TextField0?: string;
  TextField1?: string;
  TextField2?: string;
  TextField3?: string;
  Person1?: {
    Title?: string;
    FirstName?: string;
    LastName?: string;
    PersonGender?: string;
  };
};

function buildTextCaseField(id: string, label: string, value: string | undefined) {
  return {
    id,
    label,
    value: value ?? '',
    formatted_value: value ?? '',
    metadata: false,
    field_type: {
      id: 'Text',
      type: 'Text',
      min: null,
      max: null,
      regular_expression: null,
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null,
    },
  };
}

function buildMetadataField(id: string, label: string, value: string | number) {
  return {
    ...buildTextCaseField(id, label, String(value)),
    value,
    formatted_value: value,
    metadata: true,
  };
}

function formatCaseGender(value: string | undefined): string | undefined {
  if (value === 'notGiven') {
    return 'Not given';
  }
  return value;
}

function buildCreatedCaseDetails(createdCaseId: string, submittedData: SubmittedCaseData) {
  return {
    _links: { self: { href: `http://gateway-ccd.aat.platform.hmcts.net/internal/cases/${createdCaseId}` } },
    case_id: createdCaseId,
    case_type: {
      id: 'xuiTestJurisdiction',
      name: 'xuiTestJurisdiction',
      description: 'xuiTestJurisdiction',
      jurisdiction: {
        id: 'DIVORCE',
        name: 'DIVORCE',
        description: 'DIVORCE',
      },
      printEnabled: false,
    },
    state: {
      id: 'CaseCreated',
      name: 'Case created',
      description: 'Case created',
      title_display: '# ${[CASE_REFERENCE]}',
    },
    metadataFields: [
      buildMetadataField('[CASE_REFERENCE]', 'Case Reference', Number(createdCaseId)),
      buildMetadataField('[JURISDICTION]', 'Jurisdiction', 'DIVORCE'),
      buildMetadataField('[CASE_TYPE]', 'Case Type', 'xuiTestJurisdiction'),
    ],
    tabs: [
      {
        id: 'Data',
        label: 'Data',
        order: 1,
        fields: [
          buildTextCaseField('CaseGender', 'Select your gender', formatCaseGender(submittedData.Gender)),
          buildTextCaseField('TextField0', 'Text Field 0', submittedData.TextField0),
          buildTextCaseField('TextField2', 'Text Field 2', submittedData.TextField2),
          buildTextCaseField('TextField3', 'Text Field 3', submittedData.TextField3),
          buildTextCaseField('Person1Title', 'Title', submittedData.Person1?.Title),
          buildTextCaseField('Person1FirstName', 'First Name', submittedData.Person1?.FirstName),
          buildTextCaseField('Person1LastName', 'Last Name', submittedData.Person1?.LastName),
          buildTextCaseField('Person1Gender', 'Gender', submittedData.Person1?.PersonGender),
        ],
      },
      {
        id: 'History',
        label: 'History',
        order: 2,
        fields: [
          buildTextCaseField('Date', 'Date', '01 Jan 2026'),
          buildTextCaseField('Author', 'Author', 'Integration solicitor'),
          buildTextCaseField('EndState', 'End state', 'Case created'),
          buildTextCaseField('Event', 'Event', 'Create a case'),
          buildTextCaseField('Summary', 'Summary', '-'),
          buildTextCaseField('Comment', 'Comment', '-'),
        ],
      },
    ],
    triggers: [
      {
        id: 'updateCase',
        name: 'Update case',
      },
    ],
    channels: [],
    events: [],
  };
}

export async function routeCaseCreationFlow(page: Page): Promise<unknown> {
  let submittedData: SubmittedCaseData = {};
  let resolveInterceptedRequest: (body: unknown) => void;
  const interceptedRequestPromise = new Promise<unknown>((resolve) => {
    resolveInterceptedRequest = resolve;
  });

  await page.route('**/data/case-types/xuiTestJurisdiction/cases?ignore-warning=false*', async (route: Route) => {
    const request = route.request();
    if (request.method() === 'POST') {
      try {
        const requestBody = request.postDataJSON() as { data?: SubmittedCaseData };
        submittedData = requestBody.data ?? {};
        resolveInterceptedRequest(requestBody);
      } catch {
        resolveInterceptedRequest(null);
      }
    }
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        id: CREATED_CASE_ID,
        caseId: CREATED_CASE_ID,
        jurisdiction: CREATED_CASE_JURISDICTION,
        caseType: CREATED_CASE_TYPE,
      }),
    });
  });

  await page.route(`**/data/internal/cases/${CREATED_CASE_ID}*`, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildCreatedCaseDetails(CREATED_CASE_ID, submittedData)),
    });
  });

  await page.route('**/aggregated/caseworkers/**/jurisdictions*', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: CREATED_CASE_JURISDICTION,
          name: CREATED_CASE_JURISDICTION,
          caseTypes: [
            {
              id: CREATED_CASE_TYPE,
              name: CREATED_CASE_TYPE,
              states: [
                {
                  id: 'CaseCreated',
                  name: 'Case created',
                },
              ],
            },
          ],
        },
      ]),
    });
  });

  await page.route(/\/caseworkers\/[^/]+\/jurisdictions(?:\?.*)?$/, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: CREATED_CASE_JURISDICTION,
          name: CREATED_CASE_JURISDICTION,
          caseTypes: [
            {
              id: CREATED_CASE_TYPE,
              name: CREATED_CASE_TYPE,
              states: [
                {
                  id: 'CaseCreated',
                  name: 'Case created',
                },
              ],
            },
          ],
        },
      ]),
    });
  });

  const emptyCaseListInputs = { workbasketInputs: [], searchInputs: [] };
  await page.route('**/data/internal/case-types/**/work-basket-inputs*', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(emptyCaseListInputs),
    });
  });

  await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(emptyCaseListInputs),
    });
  });

  await page.route('**/data/internal/case-types/**/search-inputs*', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ searchInputs: [] }),
    });
  });

  await page.route('**/data/internal/searchCases*', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ cases: [], total: 0 }),
    });
  });

  return interceptedRequestPromise;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function openCreatedCaseDetailsPage(page: Page): Promise<void> {
  const expectedUrlPattern = new RegExp(`${escapeRegex(CREATED_CASE_DETAILS_PATH)}(?:$|[?#])`);

  await page.waitForURL(expectedUrlPattern, { timeout: 10_000 }).catch(() => undefined);
  if (expectedUrlPattern.test(page.url())) {
    return;
  }

  await page.goto(CREATED_CASE_DETAILS_PATH, { waitUntil: 'domcontentloaded' });
  await page.waitForURL(expectedUrlPattern, { timeout: 30_000 });
}

type SubmitCaseOptions = {
  waitForCreatedCaseDetails?: boolean;
};

export async function submitCaseAndCaptureRequest(
  page: Page,
  createCasePage: Pick<CreateCasePage, 'testSubmitButton'>,
  options: SubmitCaseOptions = {}
): Promise<unknown> {
  const interceptedCreateCaseRequestBodyPromise = routeCaseCreationFlow(page);
  await Promise.all([interceptedCreateCaseRequestBodyPromise, createCasePage.testSubmitButton.click({ noWaitAfter: true })]);
  const interceptedCreateCaseRequestBody = await interceptedCreateCaseRequestBodyPromise;
  if (options.waitForCreatedCaseDetails) {
    await openCreatedCaseDetailsPage(page);
  }
  return interceptedCreateCaseRequestBody;
}

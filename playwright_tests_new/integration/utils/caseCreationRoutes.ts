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
    field_type: {
      id: 'Text',
      type: 'Text',
    },
  };
}

function buildCreatedCaseDetails(createdCaseId: string, submittedData: SubmittedCaseData) {
  return {
    case_id: createdCaseId,
    case_type: {
      id: 'xuiTestJurisdiction',
      name: 'xuiTestJurisdiction',
      jurisdiction: {
        id: 'DIVORCE',
        name: 'DIVORCE',
      },
    },
    state: {
      id: 'CaseCreated',
      name: 'Case created',
    },
    metadataFields: [
      {
        id: '[CASE_REFERENCE]',
        value: Number(createdCaseId),
      },
      {
        id: '[JURISDICTION]',
        value: 'DIVORCE',
      },
      {
        id: '[CASE_TYPE]',
        value: 'xuiTestJurisdiction',
      },
    ],
    tabs: [
      {
        id: 'Data',
        label: 'Data',
        fields: [
          buildTextCaseField('Gender', 'Select your gender', submittedData.Gender),
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

async function ensureCreatedCaseDetailsPage(
  page: Page,
  createCasePage: Pick<CreateCasePage, 'caseAlertSuccessMessage' | 'caseDetailsContainer'>
): Promise<void> {
  const expectedUrlPattern = new RegExp(`${escapeRegex(CREATED_CASE_DETAILS_PATH)}(?:$|[?#])`);

  await page.waitForURL(expectedUrlPattern, { timeout: 10_000 }).catch(() => undefined);
  if (expectedUrlPattern.test(page.url())) {
    await createCasePage.caseDetailsContainer.waitFor({ state: 'visible', timeout: 30_000 });
    return;
  }

  const createdBanner = createCasePage.caseAlertSuccessMessage.filter({ hasText: /has been created/i });
  const creationSucceeded = await Promise.race([
    createCasePage.caseDetailsContainer.waitFor({ state: 'visible', timeout: 30_000 }).then(() => true),
    createdBanner.waitFor({ state: 'visible', timeout: 30_000 }).then(() => true),
  ]).catch(() => false);

  if (!creationSucceeded) {
    throw new Error(`Created case details did not become available after submit; current URL is ${page.url()}`);
  }

  await page.goto(CREATED_CASE_DETAILS_PATH, { waitUntil: 'domcontentloaded' });
  await page.waitForURL(expectedUrlPattern, { timeout: 30_000 });
  await createCasePage.caseDetailsContainer.waitFor({ state: 'visible', timeout: 30_000 });
}

export async function submitCaseAndCaptureRequest(
  page: Page,
  createCasePage: Pick<CreateCasePage, 'testSubmitButton' | 'caseAlertSuccessMessage' | 'caseDetailsContainer'>
): Promise<unknown> {
  const interceptedCreateCaseRequestBodyPromise = routeCaseCreationFlow(page);
  await Promise.all([interceptedCreateCaseRequestBodyPromise, createCasePage.testSubmitButton.click({ noWaitAfter: true })]);
  const interceptedCreateCaseRequestBody = await interceptedCreateCaseRequestBodyPromise;
  await ensureCreatedCaseDetailsPage(page, createCasePage);
  return interceptedCreateCaseRequestBody;
}

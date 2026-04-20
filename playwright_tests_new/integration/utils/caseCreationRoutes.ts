import type { Page, Route } from '@playwright/test';
import type { CreateCasePage } from '../../E2E/page-objects/pages/exui/createCase.po';

export interface CaseCreationRouteOptions {
  caseTypeId?: string;
  caseTypeName?: string;
  jurisdictionId?: string;
  jurisdictionName?: string;
  createdCaseId?: string;
  stateId?: string;
  stateName?: string;
}

export async function routeCaseCreationFlow(page: Page, options?: CaseCreationRouteOptions): Promise<unknown> {
  const createdCaseId = options?.createdCaseId ?? '1234123412341234';
  const caseTypeId = options?.caseTypeId ?? 'xuiTestJurisdiction';
  const caseTypeName = options?.caseTypeName ?? caseTypeId;
  const jurisdictionId = options?.jurisdictionId ?? 'DIVORCE';
  const jurisdictionName = options?.jurisdictionName ?? jurisdictionId;
  const stateId = options?.stateId ?? 'CaseCreated';
  const stateName = options?.stateName ?? 'Case created';
  let resolveInterceptedRequest: (body: unknown) => void;
  const interceptedRequestPromise = new Promise<unknown>((resolve) => {
    resolveInterceptedRequest = resolve;
  });

  await page.route(`**/data/case-types/${caseTypeId}/cases?ignore-warning=false*`, async (route: Route) => {
    const request = route.request();
    if (request.method() === 'POST') {
      try {
        resolveInterceptedRequest(request.postDataJSON());
      } catch {
        resolveInterceptedRequest(null);
      }
    }
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ id: createdCaseId }),
    });
  });

  await page.route(`**/data/internal/cases/${createdCaseId}*`, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        case_id: createdCaseId,
        case_type: {
          id: caseTypeId,
          name: caseTypeName,
          jurisdiction: {
            id: jurisdictionId,
            name: jurisdictionName,
          },
        },
        state: {
          id: stateId,
          name: stateName,
        },
        metadataFields: [
          {
            id: '[CASE_REFERENCE]',
            value: Number(createdCaseId),
          },
          {
            id: '[JURISDICTION]',
            value: jurisdictionName,
          },
          {
            id: '[CASE_TYPE]',
            value: caseTypeName,
          },
        ],
        tabs: [
          {
            id: 'caseSummary',
            label: 'Case summary',
            fields: [],
          },
        ],
        triggers: [
          {
            id: 'updateCase',
            name: 'Update case',
          },
        ],
      }),
    });
  });

  await page.route('**/aggregated/caseworkers/**/jurisdictions*', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: jurisdictionId,
          name: jurisdictionName,
          caseTypes: [
            {
              id: caseTypeId,
              name: caseTypeName,
              states: [
                {
                  id: stateId,
                  name: stateName,
                },
              ],
            },
          ],
        },
      ]),
    });
  });

  return interceptedRequestPromise;
}

export async function submitCaseAndCaptureRequest(
  page: Page,
  createCasePage: Pick<CreateCasePage, 'testSubmitButton'>,
  options?: CaseCreationRouteOptions
): Promise<unknown> {
  const interceptedCreateCaseRequestBodyPromise = routeCaseCreationFlow(page, options);
  await Promise.all([interceptedCreateCaseRequestBodyPromise, createCasePage.testSubmitButton.click()]);
  return interceptedCreateCaseRequestBodyPromise;
}

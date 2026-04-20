import type { Page, Route } from '@playwright/test';
import type { CreateCasePage } from '../../E2E/page-objects/pages/exui/createCase.po';

export async function routeCaseCreationFlow(page: Page): Promise<unknown> {
  const createdCaseId = '1234123412341234';
  let resolveInterceptedRequest: (body: unknown) => void;
  const interceptedRequestPromise = new Promise<unknown>((resolve) => {
    resolveInterceptedRequest = resolve;
  });

  await page.route('**/data/case-types/xuiTestJurisdiction/cases?ignore-warning=false*', async (route: Route) => {
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

  await page.route('**/data/internal/cases/1234123412341234*', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
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
          id: 'DIVORCE',
          name: 'DIVORCE',
          caseTypes: [
            {
              id: 'xuiTestJurisdiction',
              name: 'xuiTestJurisdiction',
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

  return interceptedRequestPromise;
}

export async function submitCaseAndCaptureRequest(
  page: Page,
  createCasePage: Pick<CreateCasePage, 'testSubmitButton'>
): Promise<unknown> {
  const interceptedCreateCaseRequestBodyPromise = routeCaseCreationFlow(page);
  await Promise.all([interceptedCreateCaseRequestBodyPromise, createCasePage.testSubmitButton.click()]);
  return interceptedCreateCaseRequestBodyPromise;
}

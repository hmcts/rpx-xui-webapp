import type { Page, Route } from '@playwright/test';

export async function routeCaseCreationFlow(page: Page): Promise<unknown> {
  let resolveInterceptedRequest: (body: unknown) => void;
  const interceptedRequestPromise = new Promise<unknown>((resolve) => {
    resolveInterceptedRequest = resolve;
  });

  await page.route('**/data/case-types/xuiTestJurisdiction/cases?ignore-warning=false*', async (route: Route) => {
    const request = route.request();
    if (request.method() === 'POST') {
      console.log('Create case POST payload:', request.postData());
      try {
        resolveInterceptedRequest(request.postDataJSON());
      } catch {
        resolveInterceptedRequest(null);
      }
    }
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ id: '123' }),
    });
  });

  return interceptedRequestPromise;
}

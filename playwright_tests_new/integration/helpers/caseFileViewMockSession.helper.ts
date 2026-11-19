import type { Page } from '@playwright/test';
import { setupCaseFileViewDocumentBinaryMockRoutes, setupCaseFileViewMockRoutes } from './caseFileViewMockRoutes.helper';
import { installSameOriginApiRouteClosure } from './mockSessionRouteClosure.helper';
import { setupXuiAppShellBaseRoutes } from './xuiAppShellMockRoutes.helper';

export async function setupCaseFileViewMockSession(page: Page, caseId: string, baseURL: string) {
  const routeClosure = await installSameOriginApiRouteClosure(page);

  await setupXuiAppShellBaseRoutes(page, {
    userDetails: {
      userId: 'wave2-user-id',
      email: 'wave2.playwright@justice.gov.uk',
    },
  });
  await page.route(/\/api\/configuration\?configurationKey=termsAndConditionsEnabled(?:&|$)/, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(false) })
  );
  await page.route('**/api/monitoring-tools*', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) })
  );
  await page.route('**/auth/isAuthenticated*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true),
    });
  });
  await setupCaseFileViewMockRoutes(page, caseId);
  await setupCaseFileViewDocumentBinaryMockRoutes(page);
  await page.context().addCookies([
    {
      name: 'hmcts-exui-cookies-wave2-user-id-mc-accepted',
      value: 'true',
      url: baseURL,
    },
  ]);

  return routeClosure;
}

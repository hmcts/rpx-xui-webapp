import type { Page } from '@playwright/test';
import { setupPlatformServicesCaseListRoutes } from './platformServicesMockRoutes.helper';

export async function setupVisualManageCasesRoutes(page: Page, roles: string[]): Promise<void> {
  const userDetails = {
    userId: 'visual-reviewer',
    forename: 'Visual',
    surname: 'Reviewer',
    roles,
  };
  await setupPlatformServicesCaseListRoutes(page, userDetails);
  await page.route(/\/api\/configuration\?configurationKey=termsAndConditionsEnabled(?:&|$)/, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(false) })
  );
  await page.route('**/api/monitoring-tools*', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) })
  );
  await page.route('**/data/internal/profile*', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(userDetails) })
  );
  await page.route('**/activity*', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) })
  );
}

import type { Page, TestInfo } from '@playwright/test';
import { captureDocumentWidth, scanMigrationAccessibility } from './migrationVisualChecks.helper';

export async function captureMigrationState(page: Page, testInfo: TestInfo, name = 'rendered-state') {
  const documentWidth = await captureDocumentWidth(page, testInfo);
  const viewportWidth = await page.evaluate(() => window.innerWidth);
  await testInfo.attach(name, {
    body: await page.screenshot({ fullPage: true, animations: 'disabled' }),
    contentType: 'image/png',
  });
  const violations = await scanMigrationAccessibility(page, testInfo);
  return { documentWidth, viewportWidth, violations };
}

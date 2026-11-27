import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page, TestInfo } from '@playwright/test';

export async function tabToControl(page: Page, target: Locator): Promise<void> {
  // Bound traversal so a missing tab stop fails instead of repeatedly cycling the page.
  for (let step = 0; step < 60; step++) {
    await page.keyboard.press('Tab');
    if (await target.evaluate((element) => element === document.activeElement)) return;
  }
  throw new Error('The control was not reached after 60 Tab presses');
}

export async function captureDocumentWidth(page: Page, testInfo: TestInfo): Promise<number> {
  await page.evaluate(() => document.fonts.ready);
  const geometry = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));
  await testInfo.attach('reflow-geometry', { body: JSON.stringify(geometry), contentType: 'application/json' });
  return geometry.document;
}

export async function scanMigrationAccessibility(page: Page, testInfo: TestInfo) {
  const { violations, incomplete } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  await testInfo.attach('axe-results', { body: JSON.stringify({ violations, incomplete }), contentType: 'application/json' });
  return violations
    .filter(({ impact }) => impact === 'critical' || impact === 'serious')
    .map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(({ target }) => target) }));
}

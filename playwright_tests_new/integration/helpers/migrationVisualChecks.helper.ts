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

export async function measureControlFit(locator: Locator) {
  return locator.evaluate((control) => {
    const { left, right, width, height } = control.getBoundingClientRect();
    let allowedLeft = 0;
    let allowedRight = window.innerWidth;
    for (let parent = control.parentElement; parent; parent = parent.parentElement) {
      if (/^(hidden|clip|auto|scroll)$/.test(getComputedStyle(parent).overflowX)) {
        const edge = parent.getBoundingClientRect().left + parent.clientLeft;
        allowedLeft = Math.max(allowedLeft, edge);
        allowedRight = Math.min(allowedRight, edge + parent.clientWidth);
      }
    }
    return {
      fits: width > 0 && height > 0 && left >= allowedLeft - 1 && right <= allowedRight + 1,
      left,
      right,
      allowedLeft,
      allowedRight,
    };
  });
}

import { expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function axeTest(page: Page): Promise<void> {
  // accessibility testing function
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22a",
      "wcag22aa",
    ])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
}

export default axeTest;

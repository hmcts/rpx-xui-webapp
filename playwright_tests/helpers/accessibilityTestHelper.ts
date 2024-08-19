import { expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from 'axe-html-reporter';
const fs = require('fs');

async function axeTest(page: Page): Promise<void> {
  // accessibility testing function
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags([
      "wcag2a"
      // "wcag2aa",
      // "wcag21a",
      // "wcag21aa",
      // "wcag22a",
      // "wcag22aa",
    ])
    .analyze();
  const reportHTML = createHtmlReport({
    results: accessibilityScanResults,
    options: {
      projectKey: "PlaywrightHomepage"
    },
  });

  if (!fs.existsSync("functional-output/tests/accessibility-report.html")) {
    fs.mkdirSync("functional-output/tests", {
      recursive: true,
    });
  }
  fs.writeFileSync("functional-output/tests/accessibility-report.html", reportHTML);

  expect(accessibilityScanResults.violations).toEqual([]);
}

export default axeTest;


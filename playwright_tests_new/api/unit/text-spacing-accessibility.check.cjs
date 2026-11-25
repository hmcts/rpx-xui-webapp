// Run from the repository root: node playwright_tests_new/api/unit/text-spacing-accessibility.check.cjs
require('ts-node').register({
  transpileOnly: true,
  moduleTypes: { '**': 'cjs' },
  compilerOptions: { module: 'commonjs', target: 'es2021' },
});
const assert = require('node:assert/strict');
const { chromium } = require('@playwright/test');
const { collectTextSpacingClipping } = require('../../E2E/utils/accessibility/textSpacingAccessibility');
const { collectWaveLikeAccessibilityViolations } = require('../../E2E/utils/accessibility/waveLikeAccessibility');

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setContent(`<style>
      body {font: 16px Arial} p {margin:0;line-height:20px}
      .box {width:180px;overflow:hidden} #bad {height:21px} #baseline {height:5px}
    </style><div class="box" id="bad"><p id="bad-text">Words fit before spacing</p></div>
    <div class="box" id="good"><p id="good-text">Words fit before spacing</p></div>
    <div class="box" id="baseline"><p id="baseline-text">Already clipped</p></div>
    <input id="state" value="retained"><div style="height:2000px"></div>`);
    await page.locator('#state').focus();
    await page.evaluate(() => window.scrollTo(0, 100));
    const original = await page.content();
    const findings = await collectTextSpacingClipping(page);
    assert.deepEqual(
      findings.map((finding) => finding.selector),
      ['#bad-text']
    );
    assert.equal(await page.content(), original);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'state');
    assert.equal(await page.evaluate(() => window.scrollY), 100);
    const integrated = await collectWaveLikeAccessibilityViolations(page);
    assert.deepEqual(
      integrated.filter((finding) => finding.rule === 'text-spacing-clipping').map((finding) => finding.selector),
      ['#bad-text']
    );
    await page.locator('#bad-text').evaluate((element) => element.removeAttribute('id'));
    const withoutId = await collectTextSpacingClipping(page);
    assert.equal(await page.locator(withoutId[0].selector).textContent(), 'Words fit before spacing');
    // Controlled remediation: removing the fixed height removes the exact finding.
    await page.locator('#bad').evaluate((element) => {
      element.style.height = 'auto';
    });
    assert.deepEqual(await collectTextSpacingClipping(page), []);
    // Inject a browser measurement failure after the overrides exist; finally must remove them.
    await page.evaluate(() => {
      const original = Range.prototype.getClientRects;
      Range.prototype.getClientRects = function () {
        if (document.querySelector('[data-text-spacing-probe]')) throw new Error('controlled measurement failure');
        return original.call(this);
      };
    });
    const beforeFailure = await page.content();
    await assert.rejects(() => collectTextSpacingClipping(page), /controlled measurement failure/);
    assert.equal(await page.content(), beforeFailure);
    assert.equal(await page.locator('[data-text-spacing-probe]').count(), 0);
    console.log(
      'Text-spacing browser regression passed: new clipping, expanding layout, existing clipping, state restoration, exception cleanup.'
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Run: node playwright_tests_new/common/reporters/presentation/accessibility.test.cjs [output-directory] [native-report.html]
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');
const { enhanceDashboardHtml } = require('../odhin-report-enhancer.cjs');
const { parse } = require('node-html-parser');

(async () => {
  const output = process.argv[2] || fs.mkdtempSync(path.join(os.tmpdir(), 'a11y-workspace-'));
  fs.mkdirSync(path.join(output, 'accessibility-evidence'), { recursive: true });
  const entries = [
    { engine: 'axe', status: 'issues-found', rules: ['label'], pageState: 'Form validation' },
    { engine: 'summary', status: 'blocked', rules: ['page-state-reachability'], pageState: 'Case details' },
    { engine: 'screen-reader', status: 'passed', rules: [], pageState: 'Cymraeg navigation' },
    { engine: 'lighthouse', status: '', rules: [], pageState: 'Case list' },
  ].map((entry, index) => ({
    ...entry,
    testTitle: `Synthetic journey ${index}`,
    feature: 'Report demonstration',
    violationCount: entry.rules.length,
    htmlFileName: `evidence-${index}.html`,
    context: { persona: 'solicitor', language: index === 2 ? 'cy' : 'en', dataMode: 'synthetic' },
  }));
  entries.forEach((entry) =>
    fs.writeFileSync(path.join(output, 'accessibility-evidence', entry.htmlFileName), '<h1>Synthetic evidence</h1>')
  );
  const shell = process.argv[3]
    ? fs.readFileSync(process.argv[3], 'utf8')
    : `<!doctype html><html lang="en" data-applied-mode="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Accessibility report demonstration</title></head><body id="body-content"><div class="tab"></div><script>function openMainTab(event,id){document.querySelectorAll('.main-tabcontent').forEach(node=>node.style.display='none');document.getElementById(id).style.display='block';}</script></body></html>`;
  const html = enhanceDashboardHtml(shell, [], entries);
  assert.equal(parse(enhanceDashboardHtml(html, [], entries)).querySelectorAll('#TabAccessibility').length, 1);
  assert(!enhanceDashboardHtml(shell, [], []).includes('id="TabAccessibility"'));
  const hostile = enhanceDashboardHtml(
    shell,
    [],
    [{ ...entries[0], testTitle: '<img src=x onerror=alert(1)>', htmlFileName: '../secret' }]
  );
  assert(!parse(hostile).querySelector('#TabAccessibility img'));
  assert(!parse(hostile).querySelector('#TabAccessibility a[href*="secret"]'));
  const report = path.join(output, 'accessibility-workspace.html');
  fs.writeFileSync(report, html);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(pathToFileURL(report).href);
    await page.locator('#a11y-workspace-tab').click();
    const root = page.locator('.a11y-workspace');
    await root.waitFor();
    await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
    assert.equal(await root.locator('.a11y-evidence-card:visible').count(), 4);
    await page.getByLabel('Search journeys, rules or personas').fill('cy');
    assert.equal(await root.locator('.a11y-evidence-card:visible').count(), 1);
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await page.getByLabel('Outcome', { exact: true }).selectOption('blocked');
    assert.equal(await root.locator('.a11y-evidence-card:visible').count(), 1);
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await page.getByLabel('Source', { exact: true }).selectOption('lighthouse');
    assert.match(await root.locator('.a11y-evidence-card:visible').innerText(), /not-recorded/);
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await root.getByRole('link', { name: 'Manual review', exact: true }).click();
    assert.equal(await page.locator(':focus').textContent(), 'Manual review worksheet');
    assert.equal(await page.locator('#a11y-manual-count').textContent(), '0 / 28');
    await page.getByLabel('Reviewer', { exact: true }).fill('Synthetic reviewer');
    await page.getByLabel('Review date', { exact: true }).fill('2026-09-24');
    await page.getByLabel('Browser, OS, tools and versions').fill('Chromium / synthetic interaction proof');
    await page.getByLabel('Outcome for Keyboard and focus').selectOption('failed');
    await page.getByRole('button', { name: 'Record this review', exact: true }).click();
    assert.match(await page.locator('#a11y-review-message').textContent(), /Add observations/);
    await page.locator('[name="keyboard-notes"]').fill('Synthetic focus failure; evidence reference TEST-1.');
    await page.getByRole('button', { name: 'Record this review', exact: true }).click();
    assert.equal(await page.locator('#a11y-manual-count').textContent(), '1 / 28');
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Export recorded reviews (JSON)', exact: true }).click();
    const downloaded = await download;
    const reviewPath = path.join(output, 'manual-review.json');
    await downloaded.saveAs(reviewPath);
    const data = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
    assert.equal(data.reviews.length, 4);
    assert.equal(data.reviews[0]['keyboard-status'], 'failed');
    assert.equal(data.reviews[3]['keyboard-status'], 'not-run');
    await page.reload();
    await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
    await page.locator('#a11y-workspace-tab').click();
    await page.locator('#a11y-import').setInputFiles(reviewPath);
    await page.waitForFunction(() => document.querySelector('#a11y-review-message').textContent.startsWith('Imported'));
    assert.equal(await page.locator('#a11y-manual-count').textContent(), '1 / 28');
    await page.locator('#a11y-import').setInputFiles({
      name: 'wrong.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify({ ...data, reportId: 'wrong-report' })),
    });
    await page.waitForFunction(() => document.querySelector('#a11y-review-message').textContent.startsWith('Import failed'));
    assert.equal(await page.locator('#a11y-manual-count').textContent(), '1 / 28');
    const malformed = JSON.parse(JSON.stringify(data));
    malformed.reviews[0].date = '2026-02-30';
    await page
      .locator('#a11y-import')
      .setInputFiles({ name: 'bad-date.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(malformed)) });
    await page.waitForFunction(() => document.querySelector('#a11y-review-message').textContent.includes('reviewer, date'));
    assert.equal(await page.locator('#a11y-manual-count').textContent(), '1 / 28');
    for (const mode of ['light', 'dark']) {
      await page.evaluate((value) => document.documentElement.setAttribute('data-applied-mode', value), mode);
      for (const width of [320, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const overflow = await root.evaluate((node) =>
          [...node.querySelectorAll('*')]
            .filter((child) => child.getBoundingClientRect().right > node.getBoundingClientRect().right)
            .map((child) => `${child.tagName}.${child.className}#${child.id}`)
            .slice(0, 15)
        );
        assert(
          await root.evaluate((node) => node.scrollWidth <= node.clientWidth),
          `Workspace overflows at ${width}: ${overflow.join(', ')}`
        );
      }
      await root.getByRole('link', { name: 'Evidence', exact: true }).click();
      const violations = await page.evaluate(async () =>
        (
          await window.axe.run('#TabAccessibility', {
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
          })
        ).violations.map((item) => ({ id: item.id, targets: item.nodes.map((node) => node.target) }))
      );
      assert.deepEqual(violations, [], `Report accessibility violations in ${mode} mode`);
      await page.screenshot({ path: path.join(output, `workspace-${mode}.png`) });
    }
    console.log(
      'PASS: idempotence, empty run, escaping, safe links, filters, keyboard navigation, manual validation, export/import, pending checks, light/dark responsive layout.'
    );
    console.log(report);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

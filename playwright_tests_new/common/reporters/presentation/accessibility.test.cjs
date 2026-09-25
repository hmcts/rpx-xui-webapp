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
    targets: index === 0 ? ['#query-details'] : [],
    context: { persona: 'solicitor', language: index === 2 ? 'cy' : 'en', dataMode: 'synthetic' },
  }));
  entries.forEach((entry) =>
    fs.writeFileSync(path.join(output, 'accessibility-evidence', entry.htmlFileName), '<h1>Synthetic evidence</h1>')
  );
  const shell = process.argv[3]
    ? fs.readFileSync(process.argv[3], 'utf8')
    : `<!doctype html><html lang="en" data-applied-mode="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Accessibility report demonstration</title></head><body id="body-content"><div class="tab"></div><script>function openMainTab(event,id){document.querySelectorAll('.main-tabcontent').forEach(node=>node.style.display='none');document.getElementById(id).style.display='block';document.querySelectorAll('.main-tablinks').forEach(node=>node.classList.remove('active'));event.currentTarget.classList.add('active');}</script></body></html>`;
  const html = enhanceDashboardHtml(shell, [], entries);
  const grouped = parse(
    enhanceDashboardHtml(
      shell,
      [],
      [
        entries[0],
        { ...entries[0], engine: 'summary' },
        { ...entries[0], testTitle: 'Another persona', context: { persona: 'judge' } },
        { ...entries[0], engine: 'summary', testTitle: 'Summary only', rules: ['heading-order'] },
        entries[1],
        entries[2],
        entries[3],
      ]
    )
  );
  assert.equal(
    grouped.querySelectorAll('.a11y-issue-group').length,
    3,
    'group exact rules, preserve summary-only and blocked findings'
  );
  assert.equal(grouped.querySelector('.a11y-issue-group[data-source="axe"]').getAttribute('data-count'), '2');
  assert.equal(grouped.querySelectorAll('.a11y-issue-group[open]').length, 0, 'evidence starts collapsed');
  const contracts = parse(
    enhanceDashboardHtml(
      shell,
      [],
      [
        entries[0],
        { ...entries[0], engine: 'summary', rules: ['axe:label', 'behavior:keyboard'], violationCount: 0 },
        { ...entries[3], rules: ['accessibility-threshold'] },
        { ...entries[3], rules: ['lighthouse-report-missing'], violationCount: 1 },
      ]
    )
  );
  assert.equal(
    contracts.querySelectorAll('.a11y-issue-group').length,
    2,
    'retain zero-count behavioral failures, suppress detailed summary duplicates and non-finding Lighthouse markers'
  );
  assert.equal(contracts.querySelectorAll('#a11y-all-records .a11y-evidence-card[data-status="unavailable"]').length, 2);
  const mixed = { ...entries[0], reviewCount: 2, reviewRules: ['color-contrast'] };
  const investigationReport = path.join(output, 'accessibility-investigation.html');
  fs.writeFileSync(investigationReport, enhanceDashboardHtml(shell, [], [mixed]));
  const known = parse(enhanceDashboardHtml(shell, [], [{ ...entries[0], status: 'known-findings' }]));
  assert.equal(known.querySelectorAll('.a11y-issue-group[data-status="known-findings"]').length, 1);
  assert.equal(parse(enhanceDashboardHtml(html, [], entries)).querySelectorAll('#TabAccessibility').length, 1);
  assert(!enhanceDashboardHtml(shell, [], []).includes('id="TabAccessibility"'));
  const hostile = enhanceDashboardHtml(
    shell,
    [],
    [{ ...entries[0], testTitle: '<img src=x onerror=alert(1)>', htmlFileName: '../secret' }]
  );
  assert(!parse(hostile).querySelector('#TabAccessibility img'));
  assert(!parse(hostile).querySelector('#TabAccessibility a[href*="secret"]'));
  const spacing = parse(
    enhanceDashboardHtml(
      shell,
      [],
      [
        {
          ...entries[0],
          engine: 'wave-like',
          rules: ['text-spacing-clipping'],
          targets: ['#case-summary'],
          feature: 'query management',
        },
      ]
    )
  );
  const guidance = spacing.querySelector('.a11y-fix-guidance').textContent;
  assert.match(guidance, /overflow:hidden\/clip/);
  assert.match(guidance, /query-management-container\.component\.html/);
  assert.match(spacing.querySelector('.a11y-evidence-card').textContent, /#case-summary/);
  const scaleEntries = Array.from({ length: 151 }, (_, index) => ({
    ...entries[0],
    testTitle: `Scale journey ${index}`,
    rules: [`rule-${index % 26}`],
  }));
  const scaleReport = path.join(output, 'accessibility-scale.html');
  fs.writeFileSync(scaleReport, enhanceDashboardHtml(shell, [], scaleEntries));
  const report = path.join(output, 'accessibility-workspace.html');
  fs.writeFileSync(report, html);
  const nativeRows = parse(shell).querySelectorAll('#test-list-table tbody tr');
  const metadata = nativeRows.map((row, index) => ({
    target: row.getAttribute('data-bs-target'),
    feature: index % 2 ? 'Case list' : 'Work allocation',
    tags: [],
    retry: 0,
  }));
  const featureStats = ['Case list', 'Work allocation'].map((feature) => ({
    name: feature,
    totalTests: metadata.filter((entry) => entry.feature === feature).length,
  }));
  const dashboard = path.join(output, 'feature-dashboard.html');
  fs.writeFileSync(dashboard, enhanceDashboardHtml(shell, featureStats, entries, [], '../test-results', metadata));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.setDefaultTimeout(10_000);
    await page.goto(pathToFileURL(report).href);
    await page.locator('#a11y-workspace-tab').click();
    assert.equal(await page.locator('.main-tablinks.active').count(), 1, 'only the selected report tab is highlighted');
    assert(await page.locator('#a11y-workspace-tab').evaluate((node) => node.classList.contains('active')));
    const root = page.locator('.a11y-workspace');
    await root.waitFor();
    await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
    assert.equal(await root.locator('.a11y-issue-group:visible').count(), 2);
    assert.equal(await root.locator('.a11y-evidence-card:visible').count(), 0);
    await root.locator('#a11y-all-records > summary').click();
    await page.getByLabel('Search journeys, rules or personas').fill('cy');
    assert.equal(await root.locator('.a11y-evidence-card:visible').count(), 1);
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await page.getByLabel('Outcome', { exact: true }).selectOption('blocked');
    assert.equal(await root.locator('.a11y-evidence-card:visible').count(), 1);
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await page.getByLabel('Source', { exact: true }).selectOption('lighthouse');
    assert.match(await root.locator('.a11y-evidence-card:visible').innerText(), /Outcome unavailable/);
    await page.getByRole('button', { name: 'Clear filters' }).click();
    assert.equal(await root.locator('form, input[type="file"], textarea').count(), 0);
    assert.equal(await root.getByRole('button', { name: /review|export|import/i }).count(), 0);
    await root.getByRole('link', { name: 'Issues', exact: true }).click();
    assert.equal(await page.locator(':focus').textContent(), 'Issues to investigate');
    const labelGroup = root.locator('.a11y-issue-group[data-source="axe"]');
    await labelGroup.locator(':scope > summary').click();
    const labelCard = labelGroup.locator('.a11y-evidence-card');
    await labelCard.locator(':scope > summary').click();
    assert.match(await labelGroup.innerText(), /visible label/);
    assert.match(await labelCard.innerText(), /#query-details/);
    assert.equal(await root.locator('.a11y-evidence-card[data-status="passed"] .a11y-fix-guidance').count(), 0);
    const blockedGroup = root.locator('.a11y-issue-group[data-status="blocked"]');
    await blockedGroup.locator(':scope > summary').click();
    assert.match(await blockedGroup.innerText(), /setup/);
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
      await root.getByRole('link', { name: 'Issues', exact: true }).click();
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
    await page.goto(pathToFileURL(investigationReport).href);
    await page.locator('#a11y-workspace-tab').click();
    await page.getByLabel('Outcome', { exact: true }).selectOption('needs-review');
    assert.equal(await page.locator('.a11y-issue-group:visible').count(), 1);
    assert.match(await page.locator('.a11y-issue-group:visible').innerText(), /color-contrast/);
    await page.locator('#a11y-all-records > summary').click();
    assert.equal(
      await page.locator('#a11y-all-records .a11y-evidence-card:visible').count(),
      1,
      'mixed record remains discoverable for investigation'
    );
    await page.getByRole('button', { name: 'Clear filters' }).click();
    assert.equal(await page.locator('.a11y-issue-group:visible').count(), 2, 'confirmed and uncertain rules stay separate');
    await page.goto(pathToFileURL(scaleReport).href);
    await page.locator('#a11y-workspace-tab').click();
    assert.equal(await page.locator('.a11y-issue-group:visible').count(), 26);
    assert.equal(await page.locator('.a11y-evidence-card:visible').count(), 0);
    assert(
      await page.locator('.a11y-workspace').evaluate((node) => node.offsetHeight < 5000),
      '151-record landing stays compact'
    );
    await page.screenshot({ path: path.join(output, 'workspace-scale.png'), fullPage: true });
    if (nativeRows.length) {
      await page.goto(pathToFileURL(dashboard).href);
      assert.equal(await page.locator('.feature-toggle').count(), 2);
      assert.equal(await page.locator('.feature-tests:visible').count(), 0, 'feature states start collapsed');
      await page.locator('.feature-toggle').filter({ hasText: 'Case list' }).click();
      assert.equal(await page.locator('.feature-tests:visible').count(), 1);
      assert.equal(
        await page.locator('.feature-tests:visible li').count(),
        metadata.filter((entry) => entry.feature === 'Case list').length
      );
      await page.screenshot({ path: path.join(output, 'feature-dashboard.png'), fullPage: true });
    }
    console.log(
      'PASS: idempotence, empty run, escaping, safe links, filters, keyboard navigation, actionable hints, DOM targets, no review recording, light/dark responsive layout.'
    );
    console.log(report);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

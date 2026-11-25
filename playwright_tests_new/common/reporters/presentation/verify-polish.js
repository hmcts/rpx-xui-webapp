// Run against a freshly generated report with playwright-cli run-code --filename.
async (page) => {
  await page.reload();
  await page.locator('.report-metrics').waitFor();
  await page.locator('#loading').waitFor({ state: 'hidden' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole('button', { name: 'Reset layout', exact: true }).click();
  const zero = page.locator('#TabDashboard td.report-zero').first();
  if (!(await zero.count())) throw new Error('Zero totals were not muted');
  if ((await zero.evaluate((el) => getComputedStyle(el, '::after').content)) !== '"—"') throw new Error('Zero dash missing');
  if (!/^0/.test(await zero.textContent())) throw new Error('Native count was changed');
  const feature = page.locator('.report-panel:has(#odhin-feature-summary)');
  if (!(await feature.evaluate((el) => el.parentElement.firstElementChild === el)))
    throw new Error('Feature overview not prioritised');
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForFunction(() => Math.abs(document.querySelector('.sticky-top').getBoundingClientRect().top) <= 2);
  const tabs = await page.locator('#body-content > .sticky-top, #body-content .sticky-top').first().boundingBox();
  if (!tabs || Math.abs(tabs.y) > 2) throw new Error('Report tabs did not stay visible');
  await page.getByRole('button', { name: 'Tests', exact: true }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  const status = page.getByLabel('Status', { exact: true });
  await status.selectOption('passed');
  await page.locator('.report-test-scroll').evaluate((el) => {
    el.scrollTop = 200;
  });
  const cell = await page.locator('#test-list-table thead th').first().boundingBox();
  const viewport = await page.locator('.report-test-scroll').boundingBox();
  if (!cell || Math.abs(cell.y - viewport.y) > 3) throw new Error('Test headers did not stick');
  await page.locator('.report-test-scroll').evaluate((el) => {
    el.scrollTop = 0;
  });
  await page.locator('#test-list-table .test-detail-link').first().click();
  const back = page.locator('.modal.show').getByRole('button', { name: '← Back to filtered results', exact: true });
  await back.waitFor();
  await back.click();
  await page.locator('.modal.show').waitFor({ state: 'hidden' });
  if ((await status.inputValue()) !== 'passed') throw new Error('Return lost status filter');
  await page.getByRole('button', { name: 'Dashboard', exact: true }).click();
  for (const width of [320, 390, 1024, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`Overflow at ${width}`);
  }
  return 'PASS: zero decoration preserves counts, feature priority, sticky navigation/headers, filtered return, responsive dashboard';
};

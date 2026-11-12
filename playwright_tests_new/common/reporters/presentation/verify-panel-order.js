// Run with playwright-cli against a freshly generated Odhín report.
async (page) => {
  await page.reload();
  await page.locator('.report-metrics').waitFor();
  await page.locator('#loading').waitFor({ state: 'hidden' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole('button', { name: 'Reset layout', exact: true }).click();
  const order = () => page.locator('.report-grid > .report-panel').evaluateAll((panels) => panels.map((p) => p.dataset.panel));
  const initial = await order();
  const handle = page.getByRole('button', { name: 'Move Run info', exact: true });
  await handle.focus();
  await page.keyboard.press('ArrowUp');
  if ((await order())[0] === initial[0]) throw Error('Keyboard move failed');
  const moved = await order();
  await page.reload();
  await page.locator('#loading').waitFor({ state: 'hidden' });
  if (JSON.stringify(await order()) !== JSON.stringify(moved)) throw Error('Order did not survive reload');
  await page.getByRole('button', { name: 'Move Global Summary', exact: true }).focus();
  await page.keyboard.press('ArrowUp');
  const beforeDrag = await order();
  // Drag the first (Run info) card into the second card, keeping both targets on screen.
  const second = page.locator('.report-grid > .report-panel').nth(1);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  const grip = await handle.boundingBox();
  const target = await second.boundingBox();
  const targetY = Math.min(target.y + target.height - 12, 940);
  await page.mouse.move(grip.x + grip.width / 2, grip.y + grip.height / 2);
  await page.mouse.down();
  await page.mouse.move(target.x + target.width / 2, targetY, { steps: 15 });
  await page.mouse.up();
  if (JSON.stringify(await order()) === JSON.stringify(beforeDrag)) throw Error('Pointer drag did not reorder panels');
  await page.getByRole('button', { name: 'Reset layout', exact: true }).click();
  if (JSON.stringify(await order()) !== JSON.stringify(initial)) throw Error('Reset did not restore default order');
  await page.getByRole('button', { name: 'Tests', exact: true }).click();
  if (
    (await page.getByLabel('Min seconds', { exact: true }).count()) ||
    (await page.getByLabel('Max seconds', { exact: true }).count())
  )
    throw Error('Duration controls remain');
  if (
    await page
      .locator('#test-list-table th:visible')
      .filter({ hasText: /^Project$/ })
      .count()
  )
    throw Error('Project column remains');
  const search = page.getByRole('group', { name: 'Filter tests' }).getByRole('searchbox', { name: 'Search tests' });
  await search.fill('no-matching-test-z019');
  await page.getByText('No matching records found', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  if ((await search.inputValue()) !== '') throw Error('Clear search failed');
  await page.getByLabel('Feature', { exact: true }).selectOption({ index: 1 });
  await page.locator('#test-list-table .test-detail-link').first().click();
  await page.locator('.modal.show').getByRole('button', { name: '← Back to filtered results', exact: true }).click();
  await page.locator('.modal.show').waitFor({ state: 'hidden' });
  if (!(await page.getByLabel('Feature', { exact: true }).inputValue())) throw Error('Feature navigation broke');
  return 'PASS: pointer drag, keyboard reorder, reload persistence, reset, simplified filters, inline search and feature navigation';
};

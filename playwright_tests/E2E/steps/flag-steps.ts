export async function getActiveFlagsForCase(page) {
  console.log('Getting the active flags int from the banner');
  const activeFlags = page.getByLabel('Important').getByRole('paragraph');
  let textContent = '';
  for (let i = 0; i < 6; i++) {
    // added a loop to retry clicking on the 'Search' link in case of spinner issues
    try {
      if (i !== 0) {
        console.log(`Attempt ${i}: Failed to 'Search' label, retrying...`);
      }
      textContent = await activeFlags.innerText();
      break;
    } catch (error) {
      console.error(error);
    }
    await page.waitForTimeout(5000);
  }
  const match = textContent.match(/\d+/);
  const numberOfFlags = match ? parseInt(match[0], 10) : 0;
  return numberOfFlags;
}

export async function checkActiveRowsMatchesBanner(page, activeFlagCount) {
  // get all the rows from all tables on the page as there could be active flags for different parties
  const rows = page.locator('xpath=//ccd-case-flag-table//tbody[2]/tr');
  const rowCount = await rows.count();
  const activeRows = await Promise.all(
    Array.from({ length: rowCount }, (_, i) => rows.nth(i).locator('xpath=.//td[contains(@class, "cell-flag-status")]').textContent())
  );
  const activeRowCount = activeRows.filter((text) => text === 'Active').length;
  return activeRowCount === activeFlagCount;
}

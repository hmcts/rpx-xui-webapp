import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.MANAGE_CASES_BASE_URL || 'https://manage-case.aat.platform.hmcts.net/cases';
const origin = new URL(baseUrl).origin;
const outDir = path.resolve('test-results', 'dom-captures');

const users = [
  { key: 'staff_admin', email: 'xui_caseofficer@justice.gov.uk' },
  { key: 'fpl_global_search', email: 'fpl-ctsc-admin@justice.gov.uk' },
];

async function getCookies(email) {
  const storagePath = path.resolve('.sessions', `${email}.storage.json`);
  const raw = await fs.readFile(storagePath, 'utf8');
  const parsed = JSON.parse(raw);
  return parsed.cookies || [];
}

async function saveDom(page, fileName) {
  const html = await page.content();
  await fs.writeFile(path.join(outDir, fileName), html, 'utf8');
}

async function clickFirstCaseLinkIfPresent(page) {
  const firstCaseLink = page.locator('#search-result a.govuk-link').first();
  if ((await firstCaseLink.count()) === 0) return false;
  await firstCaseLink.click();
  await page.waitForLoadState('domcontentloaded');
  return true;
}

async function captureForUser(browser, user) {
  const context = await browser.newContext();
  const cookies = await getCookies(user.email);
  if (cookies.length) {
    await context.addCookies(cookies);
  }

  const page = await context.newPage();
  await page.goto(`${origin}/cases`, { waitUntil: 'domcontentloaded' });
  await saveDom(page, `${user.key}-case-list.html`);

  await page.goto(`${origin}/cases/case-search`, { waitUntil: 'domcontentloaded' });
  await saveDom(page, `${user.key}-find-case.html`);

  await page.goto(`${origin}/search`, { waitUntil: 'domcontentloaded' });
  await saveDom(page, `${user.key}-global-search.html`);

  await page.goto(`${origin}/cases`, { waitUntil: 'domcontentloaded' });
  const openedCase = await clickFirstCaseLinkIfPresent(page);
  if (openedCase) {
    await saveDom(page, `${user.key}-case-details.html`);
  }

  await context.close();
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const user of users) {
      await captureForUser(browser, user);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

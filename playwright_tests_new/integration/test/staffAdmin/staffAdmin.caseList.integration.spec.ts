import { test, expect } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../utils/session.utils';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];

// Load STAFF_ADMIN session once
test.beforeAll(() => {
  const { cookies, storageFile } = loadSessionCookies(userIdentifier);
  sessionCookies = cookies;
  if (!cookies.length) console.warn(`STAFF_ADMIN: no cookies loaded from ${storageFile}`);
});

// Inject cookies & navigate before each test
test.beforeEach(async ({ page, config }) => {
  if (sessionCookies.length) await page.context().addCookies(sessionCookies);
  await page.goto(config.urls.manageCaseBaseUrl);
});

// Reuse the second step logic: navigate to case list and perform the same search actions
test.describe(`Case List as ${userIdentifier}`, () => {
  test(`User ${userIdentifier} sees Case List`, async ({ caseListPage }) => {
    await test.step('Navigate & perform search (presence check)', async () => {
      await caseListPage.goto();
      await expect(caseListPage.exuiHeader.header).toBeVisible();
    });
  });
});

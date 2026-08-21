import { test, expect } from '../../fixtures';
import { SessionCapturePage } from '../../page-objects/pages/exui/sessionCapture.po';
import { UserUtils } from '../../utils/user.utils';

test('interactive IDAM login establishes an XUI session', { tag: ['@e2e', '@e2e-smoke'] }, async ({ idamPage, page }) => {
  const credentials = new UserUtils().getUserCredentials('COURT_ADMIN');
  const sessionCapturePage = new SessionCapturePage(page);
  await page.goto('');

  await expect(idamPage.page).toHaveTitle(/HMCTS|Sign in/i);
  await expect(idamPage.usernameInput).toBeVisible();
  await idamPage.usernameInput.fill(credentials.email);

  if (!(await idamPage.passwordInput.isVisible().catch(() => false))) {
    await sessionCapturePage.idamPrimarySubmitButton().click();
    await expect(idamPage.passwordInput).toBeVisible();
  }

  await idamPage.passwordInput.fill(credentials.password);
  await sessionCapturePage.idamPrimarySubmitButton().click();

  await expect
    .poll(
      async () => {
        const cookieNames = new Set((await page.context().cookies()).map((cookie) => cookie.name));
        return cookieNames.has('Idam.Session') && cookieNames.has('__auth__');
      },
      { timeout: 30_000, message: 'Interactive IDAM login did not establish the required XUI session cookies' }
    )
    .toBe(true);
});

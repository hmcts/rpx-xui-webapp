import { expect, test } from '../../../E2E/fixtures';
import {
  applyHearingManagerSessionCookies,
  caseDetailsUrl,
  gotoCaseDetailsWithRetry,
  HEARING_MANAGER_CR84_ON_USER,
  hearingManagerRoles,
  openHearingsTab,
  setupHearingsMockRoutes,
} from '../../helpers';
import {
  HEARINGS_LISTED_HEARING_ID,
  HEARINGS_CASE_REFERENCE,
  LISTED_HEARING_SCENARIO,
  buildHearingsCaseDetailsMock,
  buildHearingsListMock,
  type HearingsCaseConfig,
} from '../../mocks/hearings.mock';

const caseB: HearingsCaseConfig = { caseReference: '9988776655443322' };

test.describe(
  `Hearings cross-case failure state as ${HEARING_MANAGER_CR84_ON_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('shows the Case B values-load error without displaying Case A hearing rows (EXUI-5434)', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_ON_USER,
        routeConfig: { userRoles: hearingManagerRoles, hearings: [LISTED_HEARING_SCENARIO] },
      });
      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);

      const caseBReference = caseB.caseReference!;
      await page.route(`**/data/internal/cases/${caseBReference}*`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(buildHearingsCaseDetailsMock(caseB)),
        });
      });
      await page.route('**/api/hearings/getHearings*', async (route) => {
        if (new URL(route.request().url()).searchParams.get('caseId') !== caseBReference) {
          await route.fallback();
          return;
        }
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(buildHearingsListMock([], caseB)),
        });
      });
      await page.route('**/api/hearings/loadServiceHearingValues*', async (route) => {
        if ((route.request().postDataJSON() as { caseReference?: string })?.caseReference !== caseBReference) {
          await route.fallback();
          return;
        }
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Case B unavailable' }),
        });
      });

      const failedCaseBValues = page.waitForResponse(
        (response) =>
          response.url().includes('/api/hearings/loadServiceHearingValues') &&
          (response.request().postDataJSON() as { caseReference?: string })?.caseReference === caseBReference
      );
      await page.locator('#exuiCaseReferenceSearch').fill(caseBReference);
      await page.locator('form:has(#exuiCaseReferenceSearch)').getByRole('button', { name: 'Find', exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/cases/case-details/(?:CIVIL/CIVIL/)?${caseBReference}(?:[/?#]|$)`));
      await page
        .getByRole('tab', { name: /hearings/i })
        .first()
        .click();

      expect((await failedCaseBValues).status()).toBe(500);
      await expect(hearingsTabPage.reloadButton).toBeVisible();
      await expect(
        page.getByText('There was a system error and your request could not be processed. Please try again.', { exact: true })
      ).toBeVisible();
      await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toBeHidden();
      await expect(page.locator('[id^="link-view-details-"]')).toHaveCount(0);
    });

    test('shows an error on direct entry when Case B route receives Case A details (EXUI-5434)', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await applyHearingManagerSessionCookies(page, HEARING_MANAGER_CR84_ON_USER);
      await setupHearingsMockRoutes(page, {
        userRoles: hearingManagerRoles,
        hearings: [LISTED_HEARING_SCENARIO],
      });
      const caseBReference = caseB.caseReference!;
      await page.route(`**/data/internal/cases/${caseBReference}*`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(buildHearingsCaseDetailsMock()),
        });
      });

      await gotoCaseDetailsWithRetry(page, caseDetailsUrl('CIVIL', 'CIVIL', caseBReference));
      await expect(page).toHaveURL(new RegExp(`/cases/case-details/CIVIL/CIVIL/${caseBReference}(?:[/?#]|$)`));
      await expect
        .poll(async () => (await caseDetailsPage.ccdCaseReference.textContent())?.replace(/\D/g, ''))
        .toBe(HEARINGS_CASE_REFERENCE);
      await page
        .getByRole('tab', { name: /hearings/i })
        .first()
        .click();

      await expect(page).toHaveURL(/#Hearings(?:$|[?])/i);
      await expect(
        page.getByText('There was a system error and your request could not be processed. Please try again.', { exact: true })
      ).toBeVisible();
      await expect(hearingsTabPage.reloadButton).toBeVisible();
      await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toBeHidden();
      await expect(page.locator('[id^="link-view-details-"]')).toHaveCount(0);
    });
  }
);

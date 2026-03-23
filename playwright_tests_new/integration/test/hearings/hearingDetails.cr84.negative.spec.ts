import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { caseDetailsUrl, HEARING_MANAGER_CR84_ON_USER, setupHearingsMockRoutes } from '../../helpers';
import { HEARINGS_LISTED_HEARING_ID, LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';

const userIdentifier = HEARING_MANAGER_CR84_ON_USER;
const hearingsTabUrl = `${caseDetailsUrl()}/hearings`;
const hearingManagerRoles = ['caseworker-privatelaw', 'caseworker-privatelaw-courtadmin', 'case-allocator', 'hearing-manager'];

test.describe(`Hearings CR84 integration as ${userIdentifier}`, { tag: ['@integration', '@integration-hearings'] }, () => {
  test('Hearings - hearings-disabled case does not render the Hearings tab', async ({ page }) => {
    await applySessionCookies(page, userIdentifier);
    await setupHearingsMockRoutes(page, {
      userRoles: hearingManagerRoles,
      hearings: [LISTED_HEARING_SCENARIO],
      caseConfig: {
        jurisdictionId: 'DIVORCE',
        caseTypeId: 'DIVORCE',
      },
      enabledCaseVariations: [{ jurisdiction: 'CIVIL', caseType: 'CIVIL' }],
      amendmentCaseVariations: [{ jurisdiction: 'CIVIL', caseType: 'CIVIL' }],
    });

    await page.goto(caseDetailsUrl('DIVORCE', 'DIVORCE'), { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('tab', { name: /hearings/i })).toHaveCount(0);
  });

  test('Hearings - user without hearing read rights cannot access LISTED hearing details entry points', async ({
    page,
    hearingsTabPage,
  }) => {
    await applySessionCookies(page, userIdentifier);
    await setupHearingsMockRoutes(page, {
      userRoles: ['caseworker-privatelaw', 'caseworker-privatelaw-courtadmin', 'case-allocator'],
      hearings: [LISTED_HEARING_SCENARIO],
    });

    await page.goto(caseDetailsUrl(), { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('tab', { name: /hearings/i })).toHaveCount(0);

    await page.goto(hearingsTabUrl, { waitUntil: 'domcontentloaded' });
    await expect(hearingsTabPage.container).toHaveCount(0);
    await expect(hearingsTabPage.viewDetailsButton(HEARINGS_LISTED_HEARING_ID)).toHaveCount(0);

    await page.goto('/hearings/view/hearing-view-summary', { waitUntil: 'domcontentloaded' });
    await expect(page).not.toHaveURL(/\/hearings\/view\/hearing-view-summary$/);
    await expect.poll(() => page.url()).toContain('/cases');
  });
});

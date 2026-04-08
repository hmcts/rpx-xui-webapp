import { expect, test } from '../../fixtures';
import { ensureSession } from '../../../common/sessionCapture';
//import { resolveCaseReferenceFromGlobalSearch, resolveNonExistentCaseReference } from '../../../E2E/utils/case-reference.utils';
import { openHomeWithCapturedSession } from '../searchCase/searchCase.setup';
import { caseDetailsUrl, continueHearingsFlow } from '../../../integration/helpers/hearingJourneySetup.helper.ts';
continueHearingsFlow;

const userIdentfier = 'PRL_HEARINGS';

const hearingRouteConfig = {
  jurisdictionId: 'PRIVATELAW',
  caseTypeId: 'PRLAPPS',
  caseReference: '',
};

test.describe('PRL User Hearings Journey E2E', { tag: ['@e2e', '@e2e-prl-hearings'] }, () => {
  let availableCaseReference: string;
  test.beforeAll(async () => {
    await ensureSession(userIdentfier);
  });

  test.beforeEach(async ({ page }) => {
    await openHomeWithCapturedSession(page, userIdentfier);
  });

  test('Verify that the hearings Tab is present and start the journey ', async ({
    caseDetailsPage,
    //searchCasePage,
    hearingsTabPage,
    page,
  }) => {
    hearingRouteConfig.caseReference = '1775575928056201'; // hardcoding for now.

    await page.goto(
      caseDetailsUrl(hearingRouteConfig.jurisdictionId, hearingRouteConfig.caseTypeId, hearingRouteConfig.caseReference),
      { waitUntil: 'domcontentloaded' }
    );
    await caseDetailsPage.selectCaseDetailsTab('Hearings');
    await expect(page).toHaveURL(/\/cases\/case-details\/.*#Hearings$/);
    await expect(hearingsTabPage.currentAndUpcomingHeading('Current and upcoming')).toBeVisible();
    await expect(hearingsTabPage.pastOrCancelledHeading('Past or cancelled')).toBeVisible();

    await hearingsTabPage.openRequestHearing();

    await expect(page).toHaveURL(/\/hearings\/request\/hearing-requirements$/);
    await expect(page.getByRole('heading', { name: /hearing requirements/i })).toBeVisible();

    await continueHearingsFlow(page);
    await expect(page.getByRole('heading', { name: /do you require any additional facilities\?/i })).toBeVisible();
  });
});

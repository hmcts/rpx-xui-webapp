import { expect, type Page, type Request } from '@playwright/test';
import type { HearingViewEditSummaryPage } from '../../E2E/page-objects/pages/exui/hearingViewEditSummary.po';
import type { HearingViewSummaryPage } from '../../E2E/page-objects/pages/exui/hearingViewSummary.po';

export async function submitAdditionalInstructionsUpdate(
  page: Page,
  hearingViewSummaryPage: HearingViewSummaryPage,
  hearingViewEditSummaryPage: HearingViewEditSummaryPage,
  additionalInstructions: string
): Promise<Request> {
  await hearingViewSummaryPage.waitForReady();
  await hearingViewSummaryPage.editHearingButton.click();

  await hearingViewEditSummaryPage.waitForReady();
  await hearingViewEditSummaryPage.rowChangeButton('Enter any additional instructions for the hearing').click();
  await expect(page.getByRole('heading', { name: /enter any additional instructions for the hearing/i })).toBeVisible();
  await page.locator('#additionalInstructionsTextarea').fill(additionalInstructions);
  await page.getByRole('button', { name: /^continue$/i }).click();

  await hearingViewEditSummaryPage.waitForReady();
  await expect(hearingViewEditSummaryPage.rowValue('Enter any additional instructions for the hearing')).toContainText(
    additionalInstructions
  );
  await expect(hearingViewEditSummaryPage.rowTag('Enter any additional instructions for the hearing', 'AMENDED')).toBeVisible();

  await hearingViewEditSummaryPage.submitUpdatedRequestButton.click();
  await expect(page).toHaveURL(/\/hearings\/request\/hearing-change-reason$/);
  await hearingViewEditSummaryPage.waitForChangeReasonReady();
  await hearingViewEditSummaryPage.changeReasonCheckboxes.first().check();

  const updateRequest = page.waitForRequest(
    (request) => request.url().includes('/api/hearings/updateHearingRequest') && request.method() === 'PUT'
  );
  await hearingViewEditSummaryPage.submitChangeRequestButton.click();

  return updateRequest;
}

import { expect, test } from '../../../E2E/fixtures';
import { openHearingMaintenance } from '../../helpers/hearingMaintenance.helper';
import { HEARINGS_CASE_REFERENCE, HEARINGS_LISTED_HEARING_ID } from '../../mocks/hearings.mock';
import { OTHER_HEARING_ID } from '../../mocks/hearingMaintenance.mock';

test.describe('Hearing cancellation validation and failure', { tag: ['@integration', '@integration-hearings'] }, () => {
  test('requires a reason and leaves the hearing unchanged when the user backs out', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    const { mutations } = await openHearingMaintenance(page, caseDetailsPage);
    await hearingsTabPage.cancelButton(HEARINGS_LISTED_HEARING_ID).click();
    await hearingsTabPage.continueFlow();
    await expect(page.getByText('You have not selected a reason for cancelling the hearing', { exact: true })).toBeVisible();
    expect(mutations).toHaveLength(0);
    await hearingsTabPage.doNotCancelHearingLink.click();
    await expect(hearingsTabPage.hearingRow(HEARINGS_LISTED_HEARING_ID, 'cancel')).toContainText('LISTED');
    expect(mutations).toHaveLength(0);
  });

  test('retains reasons and enables continue after a failed DELETE without showing cancellation', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    const { config, mutations } = await openHearingMaintenance(page, caseDetailsPage);
    config.hearingsApiOverrides.cancelHearings = { status: 500, body: { message: 'cancellation-failed' } };
    await hearingsTabPage.cancelButton(HEARINGS_LISTED_HEARING_ID).click();
    await hearingsTabPage.cancellationReason('reasonOne').check();
    await hearingsTabPage.cancellationReason('reasonThree').check();
    await hearingsTabPage.continueFlow();
    await expect(
      page.getByText('There was a system error and your request could not be processed. Please try again.', { exact: true })
    ).toBeVisible();
    await expect(hearingsTabPage.cancellationReason('reasonOne')).toBeChecked();
    await expect(hearingsTabPage.cancellationReason('reasonTwo')).not.toBeChecked();
    await expect(hearingsTabPage.cancellationReason('reasonThree')).toBeChecked();
    await expect(hearingsTabPage.continueButton).toBeEnabled();
    await expect(page).toHaveURL(new RegExp(`/hearings/cancel/${HEARINGS_LISTED_HEARING_ID}`));
    expect(mutations).toHaveLength(1);
    expect(mutations[0].method()).toBe('DELETE');
    expect(Object.fromEntries(new URL(mutations[0].url()).searchParams)).toEqual({
      hearingId: HEARINGS_LISTED_HEARING_ID,
      caseId: HEARINGS_CASE_REFERENCE,
    });
    expect(mutations[0].postDataJSON()).toEqual({ cancellationReasonCodes: ['reasonOne', 'reasonThree'] });
    await hearingsTabPage.doNotCancelHearingLink.click();
    await expect(hearingsTabPage.hearingRow(HEARINGS_LISTED_HEARING_ID, 'cancel')).toContainText('LISTED');
    await expect(hearingsTabPage.hearingRow(OTHER_HEARING_ID, 'cancel')).toContainText('LISTED');
    expect(mutations).toHaveLength(1);
  });
});

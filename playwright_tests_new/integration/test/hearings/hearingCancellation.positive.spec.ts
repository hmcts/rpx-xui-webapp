import { expect, test } from '../../../E2E/fixtures';
import { openHearingMaintenance } from '../../helpers/hearingMaintenance.helper';
import { HEARINGS_CASE_REFERENCE, HEARINGS_LISTED_HEARING_ID } from '../../mocks/hearings.mock';
import { OTHER_HEARING_ID, cancelledReadback } from '../../mocks/hearingMaintenance.mock';

test.describe('Hearing cancellation', { tag: ['@integration', '@integration-hearings'] }, () => {
  test('cancels only the selected hearing with the selected reasons and reads back the same case', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    const { config, mutations } = await openHearingMaintenance(page, caseDetailsPage);
    await hearingsTabPage.cancelButton(HEARINGS_LISTED_HEARING_ID).click();
    await expect(page).toHaveURL(new RegExp(`/hearings/cancel/${HEARINGS_LISTED_HEARING_ID}`));
    await hearingsTabPage.cancellationReason('reasonOne').check();
    await hearingsTabPage.cancellationReason('reasonThree').check();
    config.hearingsApiOverrides.getHearings = { body: cancelledReadback };
    const refresh = page.waitForRequest((request) => new URL(request.url()).pathname === '/api/hearings/getHearings');
    await hearingsTabPage.continueFlow();
    expect(new URL((await refresh).url()).searchParams.get('caseId')).toBe(HEARINGS_CASE_REFERENCE);
    await expect(page).toHaveURL(new RegExp(`/cases/case-details/SSCS/Benefit/${HEARINGS_CASE_REFERENCE}#Hearings$`));
    await expect(hearingsTabPage.hearingRow(HEARINGS_LISTED_HEARING_ID)).toContainText('CANCELLED');
    await expect(hearingsTabPage.hearingRow(OTHER_HEARING_ID, 'cancel')).toContainText('LISTED');
    await expect(hearingsTabPage.cancelButton(HEARINGS_LISTED_HEARING_ID)).toHaveCount(0);
    expect(mutations).toHaveLength(1);
    expect(mutations[0].method()).toBe('DELETE');
    expect(new URL(mutations[0].url()).pathname).toBe('/api/hearings/cancelHearings');
    expect(Object.fromEntries(new URL(mutations[0].url()).searchParams)).toEqual({
      hearingId: HEARINGS_LISTED_HEARING_ID,
      caseId: HEARINGS_CASE_REFERENCE,
    });
    expect(mutations[0].postDataJSON()).toEqual({ cancellationReasonCodes: ['reasonOne', 'reasonThree'] });
  });
});

import { expect, test } from '../../../E2E/fixtures';
import { openHearingMaintenance, editLinkedHearingOrder } from '../../helpers/hearingMaintenance.helper';
import { HEARINGS_CASE_REFERENCE, HEARINGS_LISTED_HEARING_ID } from '../../mocks/hearings.mock';
import { MAINTENANCE_GROUP_ID, OTHER_HEARING_ID, LINKED_HEARING_ID, reorderedGroup } from '../../mocks/hearingMaintenance.mock';

test.describe('Existing linked hearing maintenance failures', { tag: ['@integration', '@integration-hearings'] }, () => {
  test('retains the reordered review after failed PUT and cancellation preserves the stored group', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    const { config, mutations } = await openHearingMaintenance(page, caseDetailsPage);
    config.hearingsApiOverrides.putLinkedHearingGroup = { status: 500, body: { message: 'amendment-failed' } };
    await hearingsTabPage.manageLinksButton(HEARINGS_LISTED_HEARING_ID).click();
    await editLinkedHearingOrder(page);
    await hearingsTabPage.submitLinkedHearingsButton.click();
    await expect(
      page.getByText('There was a system error and your request could not be processed. Please try again.', { exact: true })
    ).toBeVisible();
    await expect(page).not.toHaveURL(/final-confirmation$/);
    await expect(hearingsTabPage.linkedSummaryRows).toHaveText([
      /Maintenance partner.*1705614528222\s*1\s*$/s,
      /Maintenance primary.*1705614528106\s*2\s*$/s,
    ]);
    expect(mutations).toHaveLength(1);
    expect(mutations[0].method()).toBe('PUT');
    expect(new URL(mutations[0].url()).pathname).toBe('/api/hearings/putLinkedHearingGroup');
    expect(Object.fromEntries(new URL(mutations[0].url()).searchParams)).toEqual({
      groupId: MAINTENANCE_GROUP_ID,
      caseId: HEARINGS_CASE_REFERENCE,
      hearingId: HEARINGS_LISTED_HEARING_ID,
    });
    expect(mutations[0].postDataJSON()).toEqual(reorderedGroup);
    await hearingsTabPage.cancelLinkedHearingsLink.click();
    await hearingsTabPage.manageLinksButton(HEARINGS_LISTED_HEARING_ID).click();
    await expect(hearingsTabPage.linkedSummaryRows).toHaveText([
      /Maintenance primary.*1705614528106\s*1\s*$/s,
      /Maintenance partner.*1705614528222\s*2\s*$/s,
    ]);
    expect(mutations).toHaveLength(1);
  });

  test('blocks duplicate order positions without a mutation', async ({ page, caseDetailsPage, hearingsTabPage }) => {
    const { mutations } = await openHearingMaintenance(page, caseDetailsPage);
    await hearingsTabPage.manageLinksButton(HEARINGS_LISTED_HEARING_ID).click();
    await hearingsTabPage.editLinkedHearingsButton.click();
    await hearingsTabPage.continueFlow();
    await hearingsTabPage.particularOrderRadio.check();
    await hearingsTabPage.linkedHearingOrder(HEARINGS_LISTED_HEARING_ID).selectOption('1');
    await hearingsTabPage.linkedHearingOrder(LINKED_HEARING_ID).selectOption('1');
    await hearingsTabPage.continueFlow();
    await expect(page.getByRole('heading', { name: 'There is a problem', exact: true })).toBeVisible();
    await expect(hearingsTabPage.linkedHearingOrder(LINKED_HEARING_ID)).toHaveValue('1');
    expect(mutations).toHaveLength(0);
    await hearingsTabPage.cancelLinkedHearingsLink.click();
    await hearingsTabPage.manageLinksButton(HEARINGS_LISTED_HEARING_ID).click();
    await expect(hearingsTabPage.linkedSummaryRows).toHaveText([
      /Maintenance primary.*1705614528106\s*1\s*$/s,
      /Maintenance partner.*1705614528222\s*2\s*$/s,
    ]);
    expect(mutations).toHaveLength(0);
  });
});

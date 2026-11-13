import { expect, test } from '../../../E2E/fixtures';
import { openHearingMaintenance, editLinkedHearingOrder } from '../../helpers/hearingMaintenance.helper';
import { HEARINGS_CASE_REFERENCE, HEARINGS_LISTED_HEARING_ID } from '../../mocks/hearings.mock';
import { MAINTENANCE_GROUP_ID, OTHER_HEARING_ID, reorderedGroup, unlinkedReadback } from '../../mocks/hearingMaintenance.mock';

test.describe('Existing linked hearing maintenance', { tag: ['@integration', '@integration-hearings'] }, () => {
  test('amends an existing ordered group by PUT and reads back the new order', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    const { config, mutations } = await openHearingMaintenance(page, caseDetailsPage);
    await hearingsTabPage.manageLinksButton(HEARINGS_LISTED_HEARING_ID).click();
    await expect(page).toHaveURL(
      new RegExp(`/manage-links/${HEARINGS_CASE_REFERENCE}/${MAINTENANCE_GROUP_ID}/${HEARINGS_LISTED_HEARING_ID}`)
    );
    await expect(hearingsTabPage.linkedSummaryRows).toHaveText([
      /Maintenance primary.*1234-5678-1234-5678.*ABA5-LISTED.*1705614528106\s*1\s*$/s,
      /Maintenance partner.*2222-3333-4444-5555.*ABA5-LISTED.*1705614528222\s*2\s*$/s,
    ]);
    await editLinkedHearingOrder(page);
    await expect(hearingsTabPage.linkedSummaryRows).toHaveText([
      /Maintenance partner.*2222-3333-4444-5555.*ABA5-LISTED.*1705614528222\s*1\s*$/s,
      /Maintenance primary.*1234-5678-1234-5678.*ABA5-LISTED.*1705614528106\s*2\s*$/s,
    ]);
    await hearingsTabPage.submitLinkedHearingsButton.click();
    await expect(page.getByRole('heading', { name: '2 hearings are now linked', exact: true })).toBeVisible();
    expect(mutations).toHaveLength(1);
    expect(mutations[0].method()).toBe('PUT');
    expect(new URL(mutations[0].url()).pathname).toBe('/api/hearings/putLinkedHearingGroup');
    expect(Object.fromEntries(new URL(mutations[0].url()).searchParams)).toEqual({
      groupId: MAINTENANCE_GROUP_ID,
      caseId: HEARINGS_CASE_REFERENCE,
      hearingId: HEARINGS_LISTED_HEARING_ID,
    });
    expect(mutations[0].postDataJSON()).toEqual(reorderedGroup);
    config.hearingsApiOverrides.getLinkedHearingGroup = { body: reorderedGroup };
    await hearingsTabPage.confirmationHearingsLink.click();
    await expect(hearingsTabPage.manageLinksButton(OTHER_HEARING_ID)).toBeVisible();
    const readback = page.waitForRequest((request) => new URL(request.url()).pathname === '/api/hearings/getLinkedHearingGroup');
    await hearingsTabPage.manageLinksButton(HEARINGS_LISTED_HEARING_ID).click();
    expect(Object.fromEntries(new URL((await readback).url()).searchParams)).toEqual({
      groupId: MAINTENANCE_GROUP_ID,
      hearingId: HEARINGS_LISTED_HEARING_ID,
      caseId: HEARINGS_CASE_REFERENCE,
    });
    await expect(hearingsTabPage.linkedSummaryRows).toHaveText([
      /Maintenance partner.*1705614528222\s*1\s*$/s,
      /Maintenance primary.*1705614528106\s*2\s*$/s,
    ]);
    expect(mutations).toHaveLength(1);
  });

  test('unlinks the intended group on Continue and retains an unrelated group on refresh', async ({
    page,
    caseDetailsPage,
    hearingsTabPage,
  }) => {
    const { config, mutations } = await openHearingMaintenance(page, caseDetailsPage);
    await hearingsTabPage.manageLinksButton(HEARINGS_LISTED_HEARING_ID).click();
    await hearingsTabPage.editLinkedHearingsButton.click();
    await hearingsTabPage.clearLinkedCaseLink('Maintenance partner').click();
    await expect(hearingsTabPage.linkedCaseSelection('Maintenance partner')).not.toBeChecked();
    expect(mutations).toHaveLength(0);
    config.hearingsApiOverrides.getHearings = { body: unlinkedReadback };
    await hearingsTabPage.continueFlow();
    await expect(page).toHaveURL(/final-confirmation$/);
    await expect(page.getByRole('heading', { name: 'All hearings are now unlinked', exact: true })).toBeVisible();
    expect(mutations).toHaveLength(1);
    expect(mutations[0].method()).toBe('DELETE');
    expect(new URL(mutations[0].url()).pathname).toBe('/api/hearings/deleteLinkedHearingGroup');
    expect(Object.fromEntries(new URL(mutations[0].url()).searchParams)).toEqual({
      hearingGroupId: MAINTENANCE_GROUP_ID,
      caseId: HEARINGS_CASE_REFERENCE,
      hearingId: HEARINGS_LISTED_HEARING_ID,
    });
    await hearingsTabPage.confirmationHearingsLink.click();
    await expect(hearingsTabPage.manageLinksButton(HEARINGS_LISTED_HEARING_ID)).toHaveCount(0);
    await expect(hearingsTabPage.linkHearingButton(HEARINGS_LISTED_HEARING_ID)).toBeVisible();
    await expect(hearingsTabPage.manageLinksButton(OTHER_HEARING_ID)).toBeVisible();
    await expect(hearingsTabPage.hearingRow(OTHER_HEARING_ID, 'cancel')).toContainText('LISTED');
    expect(mutations).toHaveLength(1);
  });
});

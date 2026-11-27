import { expect, test } from '../../helpers/migrationTest.fixture';
import type { ActualHearingDayModel } from '../../../../src/hearings/models/hearingActualsMainModel';
import { openMigrationTwoDayActuals } from '../../helpers/migrationHearingRoutes.helper';
import { HEARINGS_CASE_REFERENCE } from '../../mocks/hearings.mock';
import {
  buildMigrationTwoDayActuals,
  MIGRATION_ACTUALS_HEARING,
  MIGRATION_FIRST_HEARING_DAY,
  MIGRATION_SECOND_HEARING_DAY,
} from '../../mocks/migrationHearings.mock';

test(
  'two-day hearing actuals controls confirm and change only the selected day',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page, migrationOrigin }) => {
    const { firstDay, updates } = await openMigrationTwoDayActuals(page, migrationOrigin);
    const summary = page.locator('exui-hearing-actuals-add-edit-summary');
    await expect(summary.getByRole('heading', { name: 'Hearing details', exact: true })).toBeVisible();
    const days = summary.locator('#actual-hearing-dates details');
    await expect(days).toHaveCount(2);
    const first = days.filter({ has: page.locator('summary').filter({ hasText: '12 March 2021' }) });
    const second = days.filter({ has: page.locator('summary').filter({ hasText: '14 March 2021' }) });
    await expect(first).toHaveCount(1);
    await expect(second).toHaveCount(1);
    await second.locator('summary').click();
    const timingConfirm = second.locator('[id^="hearing-timing-result-confirm-link"]');
    const dayChange = second.locator('[id^="hearing-stage-result-change-link"]');
    await expect(timingConfirm).toHaveAccessibleName('Confirm');
    await expect(dayChange).toHaveAccessibleName('Change');
    // Keep baseline actions executable while separately detecting its duplicated IDs.
    for (const prefix of ['hearing-stage-result-change-link', 'hearing-timing-result-confirm-link']) {
      const ids = await days.locator(`[id^="${prefix}"]`).evaluateAll((elements) => elements.map((element) => element.id));
      expect(ids).toHaveLength(2);
      expect.soft(new Set(ids).size, `${prefix} IDs must identify each hearing day`).toBe(2);
    }

    const [confirmed] = await Promise.all([
      page.waitForResponse(
        (response) =>
          new URL(response.url()).origin === migrationOrigin &&
          new URL(response.url()).pathname === '/api/hearings/hearingActuals' &&
          response.request().method() === 'PUT'
      ),
      timingConfirm.press('Enter'),
    ]);
    expect(confirmed.status()).toBe(200);
    expect(new URL(confirmed.url()).searchParams.get('hearingId')).toBe(MIGRATION_ACTUALS_HEARING.hearingId);
    expect(new URL(confirmed.url()).searchParams.get('caseId')).toBe(HEARINGS_CASE_REFERENCE);
    const confirmationDays = confirmed.request().postDataJSON().actualHearingDays as ActualHearingDayModel[];
    expect(confirmationDays).toHaveLength(2);
    expect(confirmationDays.find((day) => day.hearingDate === MIGRATION_FIRST_HEARING_DAY)).toEqual(firstDay);
    expect(confirmationDays.find((day) => day.hearingDate === MIGRATION_SECOND_HEARING_DAY)).toMatchObject({
      hearingStartTime: '2021-03-14T09:00:00.000Z',
      hearingEndTime: '2021-03-14T10:00:00.000Z',
      pauseDateTimes: [],
    });
    await expect(summary.getByRole('heading', { name: 'Hearing details', exact: true })).toBeVisible();

    const [change] = await Promise.all([
      page.waitForResponse(
        (response) =>
          new URL(response.url()).origin === migrationOrigin &&
          new URL(response.url()).pathname === '/api/hearings/hearingActuals' &&
          response.request().method() === 'PUT'
      ),
      dayChange.press('Enter'),
    ]);
    expect(change.status()).toBe(200);
    expect(new URL(change.url()).searchParams.get('hearingId')).toBe(MIGRATION_ACTUALS_HEARING.hearingId);
    expect(new URL(change.url()).searchParams.get('caseId')).toBe(HEARINGS_CASE_REFERENCE);
    const changedDays = change.request().postDataJSON().actualHearingDays as ActualHearingDayModel[];
    expect(changedDays).toHaveLength(2);
    expect(changedDays.find((day) => day.hearingDate === MIGRATION_FIRST_HEARING_DAY)).toEqual(firstDay);
    expect(changedDays.find((day) => day.hearingDate === MIGRATION_SECOND_HEARING_DAY)).toEqual({
      ...confirmationDays.find((day) => day.hearingDate === MIGRATION_SECOND_HEARING_DAY),
      notRequired: true,
    });
    await expect(second.getByText('No', { exact: true })).toBeVisible();
    await expect(second.getByRole('heading', { name: 'Hearing timings', exact: true })).toHaveCount(0);
    expect(updates).toHaveLength(2);
  }
);

test(
  'clearing a day-two hearing start time blocks save until corrected',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page, migrationOrigin }) => {
    const model = buildMigrationTwoDayActuals();
    model.caseDetails.caseRef = HEARINGS_CASE_REFERENCE;
    const secondDay: ActualHearingDayModel = {
      hearingDate: MIGRATION_SECOND_HEARING_DAY,
      hearingStartTime: '2021-03-14T09:00:00.000Z',
      hearingEndTime: '2021-03-14T10:00:00.000Z',
      pauseDateTimes: [],
      actualDayParties: [],
      notRequired: false,
    };
    model.hearingActuals.actualHearingDays.push(secondDay);
    const { firstDay, updates } = await openMigrationTwoDayActuals(page, migrationOrigin, model);
    const summary = page.locator('exui-hearing-actuals-add-edit-summary');
    const day = summary.locator('details').filter({ has: page.locator('summary').filter({ hasText: '14 March 2021' }) });
    const dayLabel = day.locator('summary');
    await dayLabel.click();
    const updateTimings = day.getByRole('link', { name: 'Update', exact: true }).and(day.locator('[href*="/hearing-timing/"]'));
    await updateTimings.press('Enter');
    await expect(page).toHaveURL(new RegExp(`/hearing-timing/${MIGRATION_SECOND_HEARING_DAY}$`));

    const start = page.getByRole('textbox', { name: 'Start time', exact: true });
    const save = page.getByRole('button', { name: 'Save and continue', exact: true });
    await expect(start).toHaveValue('09:00');
    await page
      .getByRole('group', { name: 'Do you need to record times the hearing was paused?' })
      .getByRole('radio', { name: 'No', exact: true })
      .check();
    await start.clear();
    await expect(start).toHaveValue('');
    await start.press('Tab');
    await save.click();
    await expect(page.getByRole('alert').getByText('Enter hearing start time', { exact: true })).toBeVisible();
    await expect(start).toHaveValue('');
    expect(updates).toHaveLength(0);

    await start.fill('09:15');
    await start.press('Tab');
    await save.click();
    await expect.poll(() => updates.length).toBe(1);
    const [saved] = updates;
    expect(new URL(saved.url()).searchParams.get('hearingId')).toBe(MIGRATION_ACTUALS_HEARING.hearingId);
    expect(new URL(saved.url()).searchParams.get('caseId')).toBe(HEARINGS_CASE_REFERENCE);
    const actualDays = saved.postDataJSON().actualHearingDays as ActualHearingDayModel[];
    expect(actualDays).toEqual([firstDay, { ...secondDay, hearingStartTime: '2021-03-14T09:15:00.000Z' }]);
    await expect(summary.getByRole('heading', { name: 'Hearing details', exact: true })).toBeVisible();
    await dayLabel.click();
    await expect(day.getByText('09:15', { exact: true })).toBeVisible();
    expect(updates).toHaveLength(1);
  }
);

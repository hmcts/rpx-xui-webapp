import { expect, test } from '../../helpers/migrationTest.fixture';
import type { ActualHearingDayModel } from '../../../../src/hearings/models/hearingActualsMainModel';
import { openMigrationTwoDayActuals } from '../../helpers/migrationHearingRoutes.helper';
import { HEARINGS_CASE_REFERENCE } from '../../mocks/hearings.mock';
import {
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

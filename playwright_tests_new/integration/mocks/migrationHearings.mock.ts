import { createRequire } from 'node:module';
import type { HearingActualsMainModel } from '../../../src/hearings/models/hearingActualsMainModel';
import type { ServiceLinkedCasesWithHearingsModel } from '../../../src/hearings/models/linkHearings.model';
import { buildHearingActualsMock, buildLinkedCasesWithHearingsMock, type HearingScenario } from './hearings.mock';

const { HearingResult, HMCStatus } = createRequire(import.meta.url)('../../../src/hearings/models/hearings.enum');

export const MIGRATION_ACTUALS_HEARING: HearingScenario = {
  hearingId: '1705614528110',
  hmcStatus: 'AWAITING_ACTUALS',
  hearingType: 'ABA5-ACTUALS',
};

export const MIGRATION_FIRST_HEARING_DAY = '2021-03-12';
export const MIGRATION_SECOND_HEARING_DAY = '2021-03-14';
export const MIGRATION_ORDERED_HEARINGS = [
  { hearingId: 'h100001', hearingOrder: 1 },
  { hearingId: 'h100010', hearingOrder: 2 },
];

export function buildMigrationLinkedCases(): ServiceLinkedCasesWithHearingsModel[] {
  const linkedCases = buildLinkedCasesWithHearingsMock() as unknown as ServiceLinkedCasesWithHearingsModel[];
  return linkedCases
    .map((linkedCase) => ({
      ...linkedCase,
      caseHearings: (linkedCase.caseHearings ?? []).filter((hearing) =>
        MIGRATION_ORDERED_HEARINGS.some((selected) => selected.hearingId === hearing.hearingID)
      ),
    }))
    .filter((linkedCase) => linkedCase.caseHearings.length > 0);
}

export function buildMigrationTwoDayActuals(): HearingActualsMainModel {
  const model = buildHearingActualsMock() as unknown as HearingActualsMainModel;
  model.hmcStatus = HMCStatus.AWAITING_ACTUALS;
  model.hearingActuals.hearingOutcome.hearingResult = HearingResult.COMPLETED;
  // Only the first day has actuals. Confirming the second must add that specific date.
  model.hearingActuals.actualHearingDays = model.hearingActuals.actualHearingDays.filter(
    (day) => day.hearingDate === MIGRATION_FIRST_HEARING_DAY
  );
  return model;
}

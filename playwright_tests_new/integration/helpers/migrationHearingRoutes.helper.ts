import type { Page, Request } from '@playwright/test';
import type { HearingActualsModel } from '../../../src/hearings/models/hearingActualsMainModel';
import { hearingManagerRoles } from './hearingJourneySetup.helper';
import { openMigrationHearings } from './hearingMigrationJourney.helper';
import { mockMigrationRequest } from './migrationVisualRoutes.helper';
import { buildLinkedHearingGroupResponseMock, HEARINGS_LISTED_HEARING_ID, LISTED_HEARING_SCENARIO } from '../mocks/hearings.mock';
import {
  buildMigrationLinkedCases,
  buildMigrationTwoDayActuals,
  MIGRATION_ACTUALS_HEARING,
} from '../mocks/migrationHearings.mock';

export async function openMigrationLinkedHearingReview(page: Page, origin: string) {
  const hearings = await openMigrationHearings(page, {
    userRoles: hearingManagerRoles,
    hearings: [{ ...LISTED_HEARING_SCENARIO, hearingIsLinkedFlag: true }],
    caseConfig: { jurisdictionId: 'SSCS', caseTypeId: 'Benefit' },
    enabledCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
    amendmentCaseVariations: [{ jurisdiction: 'CIVIL', caseType: 'CIVIL' }],
    hearingsApiOverrides: { loadLinkedCasesWithHearings: { body: buildMigrationLinkedCases() } },
  });
  let rejectSubmission = true;
  const submissions: Request[] = [];
  await mockMigrationRequest(page, origin, 'POST', '/api/hearings/postLinkedHearingGroup', async (route) => {
    submissions.push(route.request());
    await route.fulfill(
      rejectSubmission
        ? { status: 500, json: { message: 'Synthetic linked-hearing failure' } }
        : { json: buildLinkedHearingGroupResponseMock() }
    );
  });
  await hearings.openLinkHearing(HEARINGS_LISTED_HEARING_ID);
  await hearings.selectOrderedLinkedHearings();
  await hearings.continueFlow();
  return { submissions, allowSubmission: () => (rejectSubmission = false) };
}

export async function openMigrationTwoDayActuals(page: Page, origin: string) {
  const model = buildMigrationTwoDayActuals();
  const firstDay = structuredClone(model.hearingActuals.actualHearingDays[0]);
  const hearings = await openMigrationHearings(page, {
    userRoles: hearingManagerRoles,
    hearings: [MIGRATION_ACTUALS_HEARING],
    hearingsApiOverrides: { hearingActualsGet: { body: model } },
  });
  const updates: Request[] = [];
  await page.route(
    (url) => url.origin === origin && url.pathname === '/api/hearings/hearingActuals',
    async (route) => {
      if (route.request().method() !== 'PUT') {
        await route.abort('blockedbyclient');
        throw new Error('Hearing actuals must be updated using PUT');
      }
      updates.push(route.request());
      model.hearingActuals = route.request().postDataJSON() as HearingActualsModel;
      await route.fulfill({ json: model });
    }
  );
  await hearings.addOrEditButton(MIGRATION_ACTUALS_HEARING.hearingId).click();
  return { firstDay, updates };
}

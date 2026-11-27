import type { Page } from '@playwright/test';
import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { HearingsTabPage } from '../../E2E/page-objects/pages/exui/hearingsTab.po';
import { setupMigrationVisualRoutes } from './migrationVisualRoutes.helper';
import { setupHearingsMockRoutes, type HearingsMockRoutesConfig } from './hearingsMockRoutes.helper';
import { HEARINGS_CASE_JURISDICTION, HEARINGS_CASE_REFERENCE, HEARINGS_CASE_TYPE } from '../mocks/hearings.mock';

export async function openMigrationHearings(page: Page, config: HearingsMockRoutesConfig): Promise<HearingsTabPage> {
  await setupMigrationVisualRoutes(page, config.userRoles);
  await setupHearingsMockRoutes(page, config);
  const caseDetails = new CaseDetailsPage(page);
  await caseDetails.openCaseDetails(
    config.caseConfig?.jurisdictionId ?? HEARINGS_CASE_JURISDICTION,
    config.caseConfig?.caseTypeId ?? HEARINGS_CASE_TYPE,
    config.caseConfig?.caseReference ?? HEARINGS_CASE_REFERENCE
  );
  await caseDetails.selectCaseDetailsTab('Hearings');
  return new HearingsTabPage(page);
}

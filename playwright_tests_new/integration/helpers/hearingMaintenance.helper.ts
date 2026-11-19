import type { Page, Request } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { HearingsTabPage } from '../../E2E/page-objects/pages/exui/hearingsTab.po';
import { HEARING_MANAGER_CR84_OFF_USER } from './hearingManagerUserPool.helper';
import { openHearingsTab } from './hearingJourneySetup.helper';
import { LINKED_HEARING_ID, maintenanceRouteConfig } from '../mocks/hearingMaintenance.mock';
import { HEARINGS_LISTED_HEARING_ID } from '../mocks/hearings.mock';

export async function openHearingMaintenance(page: Page, caseDetailsPage: CaseDetailsPage) {
  const config = maintenanceRouteConfig();
  const mutations: Request[] = [];
  page.on('request', (request) => {
    if (
      /\/api\/hearings\/(cancelHearings|postLinkedHearingGroup|putLinkedHearingGroup|deleteLinkedHearingGroup)(?:\?|$)/.test(
        request.url()
      )
    ) {
      mutations.push(request);
    }
  });
  await openHearingsTab(page, caseDetailsPage, { userIdentifier: HEARING_MANAGER_CR84_OFF_USER, routeConfig: config });
  return { config, mutations };
}

export async function editLinkedHearingOrder(page: Page): Promise<void> {
  const hearings = new HearingsTabPage(page);
  await hearings.editLinkedHearingsButton.click();
  await hearings.continueFlow();
  await hearings.particularOrderRadio.check();
  await hearings.linkedHearingOrder(HEARINGS_LISTED_HEARING_ID).selectOption('2');
  await hearings.linkedHearingOrder(LINKED_HEARING_ID).selectOption('1');
  await hearings.continueFlow();
}

import type { Page } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { openEventBehaviourJourney } from './eventBehaviourMockRoutes.helper';
import { buildEventBehaviourTrigger } from '../mocks/eventBehaviour.mock';

export async function openShowConditionsJourney(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  trigger: ReturnType<typeof buildEventBehaviourTrigger>
): Promise<void> {
  await openEventBehaviourJourney(page, caseDetailsPage, { trigger, caseFields: trigger.case_fields });
}

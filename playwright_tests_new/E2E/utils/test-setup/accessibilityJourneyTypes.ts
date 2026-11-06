import type { Locator, Page, TestInfo } from '@playwright/test';
import type { CustomFixtures } from '../../fixtures';

export type JourneyAccessibilityFixtures = Pick<
  CustomFixtures,
  | 'accessRequestPage'
  | 'taskListPage'
  | 'caseDetailsPage'
  | 'createCasePage'
  | 'caseFileViewPage'
  | 'hearingsTabPage'
  | 'bookingUiPage'
> & { page: Page };

export type JourneyAccessibilityState = {
  feature: string;
  title: string;
  persona: string;
  setup: (fixtures: JourneyAccessibilityFixtures, testInfo: TestInfo) => Promise<{ ready: Locator[]; url: RegExp }>;
};

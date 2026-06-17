import { LighthouseUtils } from '@hmcts/playwright-common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { chromium, type Page } from 'playwright/test';
import { test } from '../../fixtures';
import { auditAccessibilityPage } from '../../utils/accessibility/accessibilityAudit';
import { runLighthouseAuditWithEvidence } from '../../utils/accessibility/lighthouseEvidence';
import { config } from '../../utils/config.utils';
import {
  accessibilityPageStates,
  lighthouseAccessibilityPageStates,
  type AccessibilityFixtures,
} from '../../utils/accessibility/webappAccessibilityPageStates';

test.describe('webapp unified accessibility audit @accessibility @a11y @wave-a11y', () => {
  for (const pageState of accessibilityPageStates) {
    test(`${pageState.feature} - ${pageState.title}`, async ({
      page,
      taskListPage,
      caseListPage,
      accessRequestPage,
      caseDetailsPage,
      caseFileViewPage,
      hearingsTabPage,
      bookingUiPage,
    }, testInfo) => {
      const accessibilityFixtures = {
        page,
        taskListPage,
        caseListPage,
        accessRequestPage,
        caseDetailsPage,
        caseFileViewPage,
        hearingsTabPage,
        bookingUiPage,
      } as AccessibilityFixtures;

      await pageState.setup(accessibilityFixtures, testInfo);
      await auditAccessibilityPage(accessibilityFixtures.page, testInfo, {
        defaultEngines: pageState.engines ?? ['axe', 'wave-like'],
        feature: pageState.feature,
        pageState: pageState.title,
        axeKnownViolations: pageState.axeKnownViolations,
      });
    });
  }
});

test.describe('webapp scoped Lighthouse accessibility audit @accessibility @a11y @lighthouse-a11y @performance', () => {
  for (const pageState of lighthouseAccessibilityPageStates) {
    test(`${pageState.feature} - ${pageState.title}`, async ({ lighthousePort }, testInfo) => {
      await withPublicLighthousePage(lighthousePort, async (lighthousePage, lighthouseUtils) => {
        const accessibilityFixtures = {
          page: lighthousePage,
        } as AccessibilityFixtures;

        await pageState.setup(accessibilityFixtures, testInfo);
        await auditAccessibilityPage(lighthousePage, testInfo, {
          defaultEngines: pageState.engines ?? ['lighthouse'],
          feature: pageState.feature,
          pageState: pageState.title,
          runLighthouse: () =>
            runLighthouseAuditWithEvidence(
              testInfo,
              () =>
                lighthouseUtils.audit({
                  performance: 0,
                  accessibility: 90,
                  'best-practices': 0,
                }),
              {
                feature: pageState.feature,
                pageState: pageState.title,
                url: lighthousePage.url(),
              }
            ),
        });
      });
    });
  }
});

async function withPublicLighthousePage(
  lighthousePort: number,
  run: (page: Page, lighthouseUtils: LighthouseUtils) => Promise<void>
): Promise<void> {
  const userDataDir = path.join(os.tmpdir(), 'pw-a11y-lighthouse', String(Math.random()));
  const context = await chromium.launchPersistentContext(userDataDir, {
    args: [`--remote-debugging-port=${lighthousePort}`],
    baseURL: config.urls.baseURL,
  });

  try {
    const lighthousePage = context.pages()[0] ?? (await context.newPage());
    await run(lighthousePage, new LighthouseUtils(lighthousePage, lighthousePort));
  } finally {
    await context.close();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {
      // Best-effort cleanup; test evidence is more important than temp-dir cleanup.
    }
  }
}

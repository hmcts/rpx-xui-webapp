import { LighthouseUtils } from '@hmcts/playwright-common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { chromium, type Page } from 'playwright/test';
import { test } from '../../fixtures';
import {
  auditAccessibilityPage,
  isAccessibilityStrictMode,
  resolveAccessibilityEngines,
} from '../../utils/accessibility/accessibilityAudit';
import { runLighthouseAuditWithEvidence } from '../../utils/accessibility/lighthouseEvidence';
import { attachAccessibilityReachabilityFailureEvidence } from '../../utils/accessibility/screenReaderLikeAccessibility';
import { config } from '../../utils/config.utils';
import {
  accessibilityPageStates,
  type AccessibilityPageState,
  lighthouseAccessibilityPageStates,
  type AccessibilityFixtures,
} from '../../utils/accessibility/webappAccessibilityPageStates';

const pageStateSetupTimeoutMs = Number(process.env.A11Y_PAGE_STATE_TIMEOUT_MS ?? 45_000);

test.describe('webapp unified accessibility audit @accessibility @a11y @wave-a11y', () => {
  for (const pageState of accessibilityPageStates) {
    const activeEngines = resolveAccessibilityEngines(pageState.engines ?? ['axe', 'wave-like']);
    if (activeEngines.length === 0) {
      continue;
    }

    test(`${pageState.feature} - ${pageState.title}`, async ({
      page,
      taskListPage,
      caseListPage,
      accessRequestPage,
      caseDetailsPage,
      caseFileViewPage,
      hearingsTabPage,
      bookingUiPage,
      globalSearchPage,
      searchCasePage,
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
        globalSearchPage,
        searchCasePage,
      } as AccessibilityFixtures;

      const pageStateReached = await setupPageStateOrReport(pageState, accessibilityFixtures, testInfo);
      if (!pageStateReached) {
        return;
      }

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
    const activeEngines = resolveAccessibilityEngines(pageState.engines ?? ['lighthouse']);
    if (activeEngines.length === 0) {
      continue;
    }

    test(`${pageState.feature} - ${pageState.title}`, async ({ lighthousePort }, testInfo) => {
      await withLighthousePage(lighthousePort, async (lighthousePage, lighthouseUtils) => {
        const accessibilityFixtures = {
          page: lighthousePage,
        } as AccessibilityFixtures;

        const pageStateReached = await setupPageStateOrReport(pageState, accessibilityFixtures, testInfo);
        if (!pageStateReached) {
          return;
        }

        const lighthouseScreenshot = await lighthousePage.screenshot({ fullPage: true });
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
              },
              lighthouseScreenshot
            ),
        });
      });
    });
  }
});

async function setupPageStateOrReport(
  pageState: AccessibilityPageState,
  accessibilityFixtures: AccessibilityFixtures,
  testInfo: Parameters<AccessibilityPageState['setup']>[1]
): Promise<boolean> {
  const strict = isAccessibilityStrictMode();
  try {
    await withSetupTimeout(pageState.setup(accessibilityFixtures, testInfo), pageState);
    return true;
  } catch (error) {
    await attachAccessibilityReachabilityFailureEvidence(accessibilityFixtures.page, testInfo, {
      feature: pageState.feature,
      pageState: pageState.title,
      strict,
      error,
    });
    if (strict) {
      throw error;
    }
    return !accessibilityFixtures.page.isClosed() && !isPageStateSetupTimeout(error);
  }
}

async function withSetupTimeout(setup: Promise<void>, pageState: AccessibilityPageState): Promise<void> {
  let timeout: NodeJS.Timeout | undefined;
  try {
    await Promise.race([
      setup,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () =>
            reject(
              new Error(
                `Accessibility page state "${pageState.feature} / ${pageState.title}" did not reach its ready state within ${pageStateSetupTimeoutMs}ms.`
              )
            ),
          pageStateSetupTimeoutMs
        );
      }),
    ]);
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
}

function isPageStateSetupTimeout(error: unknown): boolean {
  return error instanceof Error && error.message.includes('did not reach its ready state');
}

async function withLighthousePage(
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

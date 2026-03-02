import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { filterEmptyRows } from '../../utils';
import { caseBannerMatches } from '../../utils/banner.utils';
import { isPageClosingError, rowMatchesExpected } from '../../utils/case-flags.utils';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';
import { setupCaseForJourney } from '../_helpers/caseSetup';
import { DIVORCE_FLAGS_DYNAMIC_SOLICITOR_ROLES, provisionDynamicSolicitorForAlias } from '../_helpers/dynamicSolicitorSession';

function asMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isDependencyEnvironmentFailure(error: unknown): boolean {
  const message = asMessage(error);
  return (
    /returned HTTP 5\d\d/i.test(message) ||
    /status\s+5\d\d/i.test(message) ||
    /something went wrong page/i.test(message) ||
    /network timeout/i.test(message) ||
    /ECONNRESET|ETIMEDOUT/i.test(message) ||
    /Target page, context or browser has been closed/i.test(message) ||
    /setup exceeded \d+ms/i.test(message)
  );
}

test.describe('Case level case flags', () => {
  test.describe.configure({ timeout: 180000 });
  let caseNumber: string;
  const jurisdiction = 'EMPLOYMENT';
  const caseType = 'ET_EnglandWales';
  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }) => {
    await retryOnTransientFailure(
      async () => {
        await ensureAuthenticatedPage(page, 'SEARCH_EMPLOYMENT_CASE', { waitForSelector: 'exui-header' });
        await createCasePage.createCaseEmployment(jurisdiction, caseType);
        caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
      },
      {
        maxAttempts: 2,
        onRetry: async () => {
          if (page.isClosed()) {
            return;
          }
          await page.goto('/').catch(() => undefined);
        },
      }
    );
  });

  test('Create a new case level flag and verify the flag is displayed on the case', async ({ caseDetailsPage, tableUtils }) => {
    await test.step('Record existing case level flags', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const flagsTable = await caseDetailsPage.waitForTableByName('Case level flags');
      const table = await tableUtils.parseDataTable(flagsTable);
      const visibleRows = filterEmptyRows(table);
      expect.soft(visibleRows.length).toBeGreaterThanOrEqual(0);
    });

    await test.step('Create a new case level flag', async () => {
      await caseDetailsPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseAction('Create a case flag');
      await caseDetailsPage.selectCaseFlagTarget('Welsh');
    });

    await test.step('Check the case flag creation messages are seen', async () => {
      await expect
        .poll(async () => {
          if (await caseDetailsPage.hasCallbackValidationErrorAlert()) {
            throw new Error('Callback data failed validation while creating case-level case flag.');
          }
          const bannerVisible = await caseDetailsPage.caseAlertSuccessMessage.isVisible().catch(() => false);
          if (!bannerVisible) {
            return false;
          }
          const bannerText = await caseDetailsPage.caseAlertSuccessMessage.innerText();
          return caseBannerMatches(bannerText, caseNumber, 'has been updated with event: Create a case flag');
        })
        .toBe(true);
      expect.soft(await caseDetailsPage.caseNotificationBannerTitle.isVisible()).toBe(true);
      expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
      expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toContain('There is 1 active flag on this case.');
    });

    await test.step('Verify the case level flag is shown in the flags tab', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const expectedFlag = {
        'Case flags': 'Welsh forms and communications',
        Comments: 'Welsh',
        'Creation date': await caseDetailsPage.todaysDateFormatted(),
        'Last modified': '',
        'Flag status': 'ACTIVE',
      };
      await expect
        .poll(
          async () => {
            if (caseDetailsPage.page.isClosed()) {
              return false;
            }
            try {
              const table = await tableUtils.parseDataTable(await caseDetailsPage.getTableByName('Case level flags'));
              const visibleRows = filterEmptyRows(table);
              return visibleRows.some((row) => rowMatchesExpected(row, expectedFlag));
            } catch (error) {
              if (isPageClosingError(error)) {
                return false;
              }
              throw error;
            }
          },
          { timeout: 45000, intervals: [1000, 2000, 3000] }
        )
        .toBe(true);
    });
  });
});

test.describe('Party level case flags', () => {
  test.describe.configure({ timeout: 600000 });
  const testValue = faker.person.firstName();
  let caseNumber: string;
  const jurisdiction = 'DIVORCE';
  const caseType = 'xuiCaseFlagsV1';
  let dynamicHandle: Awaited<ReturnType<typeof provisionDynamicSolicitorForAlias>> | undefined;

  test.beforeEach(async ({ page, createCasePage, caseDetailsPage, professionalUserUtils }, testInfo) => {
    dynamicHandle = await provisionDynamicSolicitorForAlias({
      alias: 'USER_WITH_FLAGS',
      professionalUserUtils,
      roleNames: DIVORCE_FLAGS_DYNAMIC_SOLICITOR_ROLES,
      roleContext: {
        jurisdiction: 'divorce',
        testType: 'case-create',
      },
      testInfo,
    });

    try {
      await retryOnTransientFailure(
        async () => {
          await ensureAuthenticatedPage(page, 'USER_WITH_FLAGS', { waitForSelector: 'exui-header' });
          const setup = await setupCaseForJourney({
            scenario: 'case-flags-divorce-party-level',
            jurisdiction,
            caseType,
            mode: 'api-required',
            apiPayload: {
              fieldValues: {
                testValue,
              },
            },
            uiCreate: async () => {
              await createCasePage.createDivorceCaseFlag(testValue, jurisdiction, caseType);
            },
            page,
            createCasePage,
            caseDetailsPage,
            testInfo,
          });
          caseNumber = setup.caseNumber;
        },
        {
          maxAttempts: 2,
          onRetry: async () => {
            if (page.isClosed()) {
              return;
            }
            await page.goto('/').catch(() => undefined);
          },
        }
      );
    } catch (error) {
      if (isDependencyEnvironmentFailure(error)) {
        throw new Error(`Party-level case-flags setup failed due to dependency environment instability: ${asMessage(error)}`);
      }
      throw error;
    }
  });

  test.afterEach(async () => {
    await dynamicHandle?.cleanup();
    dynamicHandle = undefined;
  });

  test('Create a new party level flag and verify the flag is displayed on the case', async ({ caseDetailsPage, tableUtils }) => {
    await test.step('Record existing party level flags', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const flagsTable = await caseDetailsPage.waitForTableByName(testValue);
      const table = await tableUtils.parseDataTable(flagsTable);
      const visibleRows = filterEmptyRows(table);
      expect.soft(visibleRows.length).toBeGreaterThanOrEqual(0);
    });

    await test.step('Create a new party level flag', async () => {
      await caseDetailsPage.exuiSpinnerComponent.wait();
      await caseDetailsPage.selectCaseAction('Create case flag');
      await caseDetailsPage.selectPartyFlagTarget(testValue, 'Welsh');
    });

    await test.step('Check the case flag creation messages are seen', async () => {
      await expect
        .poll(
          async () => {
            if (await caseDetailsPage.hasCallbackValidationErrorAlert()) {
              throw new Error('Callback data failed validation while creating party-level case flag.');
            }
            if (await caseDetailsPage.eventCreationErrorHeading.isVisible().catch(() => false)) {
              throw new Error('CCD event creation failed while creating party-level case flag.');
            }
            const bannerVisible = await caseDetailsPage.caseAlertSuccessMessage.isVisible().catch(() => false);
            if (!bannerVisible) {
              return false;
            }
            const bannerText = await caseDetailsPage.caseAlertSuccessMessage.innerText();
            return caseBannerMatches(bannerText, caseNumber, 'has been updated with event: Create case flag');
          },
          { timeout: 45000, intervals: [1000, 2000, 3000] }
        )
        .toBe(true);
      expect.soft(await caseDetailsPage.caseNotificationBannerTitle.isVisible()).toBe(true);
      expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
      expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toContain('There is 1 active flag on this case.');
    });

    await test.step('Verify the party level case flag is shown in the flags tab', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const expectedFlag = {
        'Party level flags': 'I want to speak Welsh at a hearing',
        Comments: `Welsh ${testValue}`,
        'Creation date': await caseDetailsPage.todaysDateFormatted(),
        'Last modified': '',
        'Flag status': 'ACTIVE',
      };
      await expect
        .poll(
          async () => {
            if (caseDetailsPage.page.isClosed()) {
              return false;
            }
            if (await caseDetailsPage.hasCallbackValidationErrorAlert()) {
              throw new Error('Callback data failed validation while creating party-level case flag.');
            }
            if (await caseDetailsPage.eventCreationErrorHeading.isVisible().catch(() => false)) {
              throw new Error('CCD event creation failed while creating party-level case flag.');
            }
            try {
              const partyFlagsTable = await caseDetailsPage.waitForTableByName(testValue, {
                timeoutMs: 15_000,
              });
              await partyFlagsTable.waitFor({ state: 'visible' });
              const table = await tableUtils.parseDataTable(partyFlagsTable);
              const visibleRows = filterEmptyRows(table);
              return visibleRows.some((row) => rowMatchesExpected(row, expectedFlag));
            } catch (error) {
              if (isPageClosingError(error)) {
                return false;
              }
              throw error;
            }
          },
          { timeout: 60_000, intervals: [1000, 2000, 3000] }
        )
        .toBe(true);
    });
  });
});

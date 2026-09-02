import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { filterEmptyRows } from '../../utils';
import { caseBannerMatches } from '../../utils/banner.utils';
import { isPageClosingError } from '../../utils/case-flags.utils';
import { buildCasePayloadFromTemplate } from '../../utils/test-setup/payloads/registry';
import { setupCaseForJourney } from '../../utils/test-setup/caseSetup';
import { formatErrorMessage, isDependencyEnvironmentFailure } from '../../utils/transient-failure.utils';

const PARTY_LEVEL_SUITE_TIMEOUT_MS = 300_000;

test.describe('Case level case flags', { tag: ['@e2e', '@e2e-case-flags'] }, () => {
  test.describe.configure({ timeout: 180000 });
  let caseNumber: string;
  const jurisdiction = 'EMPLOYMENT';
  const caseType = 'ET_EnglandWales';

  test.beforeEach(async ({ page, createCasePage, caseDetailsPage, identityLease }, testInfo) => {
    try {
      const lease = await identityLease.acquire({ pool: 'SEARCH_EMPLOYMENT_CASE' });
      await applySessionCookies(page, lease.identity.userIdentifier);
      const setup = await setupCaseForJourney({
        scenario: 'case-flags-employment-case-level',
        jurisdiction,
        caseType,
        apiEventId: 'initiateCase',
        mode: 'api-required',
        apiPayload: buildCasePayloadFromTemplate('employment.et-england-wales.initiate-case'),
        page,
        createCasePage,
        caseDetailsPage,
        testInfo,
      });
      caseNumber = setup.caseNumber;
    } catch (error) {
      if (isDependencyEnvironmentFailure(error)) {
        throw new Error(
          `Case-level employment setup failed due to dependency environment instability: ${formatErrorMessage(error)}`
        );
      }
      throw error;
    }
  });

  test('Create a new case level flag and verify the flag is displayed on the case', async ({ caseDetailsPage }) => {
    await test.step('Open case flags tab', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      await expect(caseDetailsPage.caseFlagsHeading).toBeVisible();
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
          if (await caseDetailsPage.eventCreationErrorHeading.isVisible().catch(() => false)) {
            throw new Error('CCD event creation failed while creating case-level case flag.');
          }
          const bannerVisible = await caseDetailsPage.caseAlertSuccessMessage.isVisible().catch(() => false);
          if (!bannerVisible) {
            return false;
          }
          const bannerText = await caseDetailsPage.caseAlertSuccessMessage.innerText();
          return caseBannerMatches(bannerText, caseNumber, 'has been updated with event: Create a case flag');
        })
        .toBe(true);
      await caseDetailsPage.openCaseDetails(jurisdiction, caseType, caseNumber, 60_000);
      expect.soft(await caseDetailsPage.caseNotificationBannerTitle.isVisible()).toBe(true);
      expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
      expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toContain('There is 1 active flag on this case.');
    });

    await test.step('Verify the case level flag is shown in the flags tab', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const expectedFlag = {
        name: 'Welsh forms and communications',
        comments: 'Welsh',
        creationDate: (await caseDetailsPage.todaysDateFormatted()).replace('Sept', 'Sep'),
        status: 'ACTIVE',
      };
      await expect
        .poll(
          async () => {
            if (caseDetailsPage.page.isClosed()) {
              return false;
            }
            try {
              const table = caseDetailsPage.getTableByName('Case level flags');
              const flagRow = table
                .getByRole('row')
                .filter({ hasText: expectedFlag.name })
                .filter({ hasText: expectedFlag.comments });
              if (!(await flagRow.isVisible())) {
                return false;
              }
              const rowText = await flagRow.innerText();
              return [expectedFlag.creationDate, expectedFlag.status].every((value) => rowText.includes(value));
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

test.describe('Party level case flags', { tag: ['@e2e', '@e2e-case-flags'] }, () => {
  test.describe.configure({ timeout: PARTY_LEVEL_SUITE_TIMEOUT_MS });
  const testValue = faker.person.firstName();
  let caseNumber: string;
  const jurisdiction = 'DIVORCE';
  const caseType = 'xuiCaseFlagsV1';

  test.beforeEach(async ({ page, createCasePage, caseDetailsPage, identityLease }, testInfo) => {
    try {
      const lease = await identityLease.acquire({ pool: 'USER_WITH_FLAGS' });
      await applySessionCookies(page, lease.identity.userIdentifier);
      const setup = await setupCaseForJourney({
        scenario: 'case-flags-divorce-party-level',
        jurisdiction,
        caseType,
        apiEventId: 'createCase',
        mode: 'api-required',
        apiPayload: buildCasePayloadFromTemplate('divorce.xui-test-case-type.create-case-flags', {
          overrides: {
            LegalRepParty1Flags: {
              roleOnCase: testValue,
              partyName: testValue,
            },
            LegalRepParty2Flags: {
              roleOnCase: `${testValue}2`,
              partyName: `${testValue}2`,
            },
          },
        }),
        page,
        createCasePage,
        caseDetailsPage,
        testInfo,
      });
      caseNumber = setup.caseNumber;
    } catch (error) {
      if (isDependencyEnvironmentFailure(error)) {
        throw new Error(
          `Party-level case-flags setup failed due to dependency environment instability: ${formatErrorMessage(error)}`
        );
      }
      throw error;
    }
  });

  test('Create a new party level flag and verify the flag is displayed on the case', async ({ caseDetailsPage, tableUtils }) => {
    await test.step('Record existing party level flags', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Flags');
      const flagsTable = await caseDetailsPage.waitForTableByName(testValue);
      const table = await tableUtils.parseDataTable(flagsTable);
      const visibleRows = filterEmptyRows(table);
      expect.soft(visibleRows.length).toBe(0);
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
        name: 'I want to speak Welsh at a hearing',
        comments: `Welsh ${testValue}`,
        creationDate: (await caseDetailsPage.todaysDateFormatted()).replace('Sept', 'Sep'),
        status: 'ACTIVE',
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
              const flagRow = partyFlagsTable
                .getByRole('row')
                .filter({ hasText: expectedFlag.name })
                .filter({ hasText: expectedFlag.comments });
              if (!(await flagRow.isVisible())) {
                return false;
              }
              const rowText = await flagRow.innerText();
              return [expectedFlag.creationDate, expectedFlag.status].every((value) => rowText.includes(value));
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

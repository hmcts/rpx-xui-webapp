import { expect, test } from '../../../E2E/fixtures';
import { caseDetailsUrl, goBackInHearingsFlow, hearingManagerRoles } from '../../helpers/hearingJourneySetup.helper';
import { setupHearingsMockRoutes } from '../../helpers/hearingsMockRoutes.helper';
import { setupPlatformServicesCaseListRoutes } from '../../helpers/platformServicesMockRoutes.helper';
import { buildXuiAppShellEnvironmentConfigMock } from '../../helpers/xuiAppShellMockRoutes.helper';
import { setupGlobalSearchMockRoutes } from '../../helpers/caseSearchMockRoutes.helper';
import { GLOBAL_SEARCH_CASE_REFERENCE } from '../../mocks/globalSearch.mock';
import {
  buildCaseDetailsMock,
  buildGlobalSearchResultsMock,
  buildGlobalSearchServicesMock,
  buildSearchCaseJurisdictionsMock,
} from '../../mocks/search.mock';
import { HEARINGS_WA_SUPPORTED_JURISDICTIONS, LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';

const jurisdictionStorageKey = 'waSupportedJurisdictions_cache';

test.describe(
  'Case tab selection with cached WA jurisdictions',
  { tag: ['@integration', '@integration-case-viewer-mock-session'] },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(({ key, jurisdictions }) => sessionStorage.setItem(key, JSON.stringify(jurisdictions)), {
        key: jurisdictionStorageKey,
        jurisdictions: HEARINGS_WA_SUPPORTED_JURISDICTIONS,
      });
    });

    test('Hearings Back selects Hearings when jurisdictions are already cached', async ({ page, hearingsTabPage }) => {
      await setupHearingsMockRoutes(page, { userRoles: hearingManagerRoles, hearings: [LISTED_HEARING_SCENARIO] });
      const jurisdictionRequests: string[] = [];
      page.on('request', (request) => {
        if (request.url().includes('/api/wa-supported-jurisdiction/get')) {
          jurisdictionRequests.push(request.url());
        }
      });

      await page.goto(caseDetailsUrl());
      await expect(page.getByRole('tab', { name: 'Tasks', exact: true })).toBeVisible();
      await page.getByRole('tab', { name: 'Hearings', exact: true }).click();
      await expect(page.getByRole('tab', { name: 'Hearings', exact: true })).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByText('Current and upcoming', { exact: true })).toBeVisible();
      await expect
        .poll(() => page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)), jurisdictionStorageKey))
        .toEqual(HEARINGS_WA_SUPPORTED_JURISDICTIONS);

      await hearingsTabPage.openRequestHearing();
      await expect(page).toHaveURL(/\/hearings\/request\/hearing-requirements$/);
      await goBackInHearingsFlow(page);

      await expect(page).toHaveURL(/#Hearings$/);
      await expect(page.getByRole('tab', { name: 'Hearings', exact: true })).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByRole('tab', { name: 'Tasks', exact: true })).toHaveAttribute('aria-selected', 'false');
      await expect(page.getByText('Current and upcoming', { exact: true })).toBeVisible();
      expect(jurisdictionRequests).toEqual([]);
    });

    test('global search opens the eligible Summary tab when jurisdictions are already cached', async ({
      page,
      globalSearchPage,
    }) => {
      await setupPlatformServicesCaseListRoutes(page, {
        roles: ['caseworker-publiclaw', 'caseworker-publiclaw-courtadmin', 'hmcts-admin'],
        roleCategory: 'ADMIN',
      });
      await page.route(/\/external\/config\/ui(?:\/|\?|$)/, (route) =>
        route.fulfill({
          json: {
            ...buildXuiAppShellEnvironmentConfigMock({ ccdGatewayUrl: '', launchDarklyClientId: '' }),
            hearingJurisdictionConfig: { hearingJurisdictions: { '.*': [] }, hearingAmendment: { '.*': [] } },
          },
        })
      );
      await page.route('**/activity*', (route) => route.fulfill({ json: [] }));
      await page.route('**/workallocation/case/task/*', (route) => route.fulfill({ json: [] }));
      const caseDetails = buildCaseDetailsMock(GLOBAL_SEARCH_CASE_REFERENCE);
      caseDetails.tabs = caseDetails.tabs.map((tab) => ({
        ...tab,
        label: 'Summary',
        defaultFocus: true,
      }));
      await setupGlobalSearchMockRoutes(page, {
        jurisdictions: buildSearchCaseJurisdictionsMock(),
        services: buildGlobalSearchServicesMock(),
        searchResultsHandler: (route) => route.fulfill({ json: buildGlobalSearchResultsMock(GLOBAL_SEARCH_CASE_REFERENCE) }),
        caseDetailsHandler: (route) => route.fulfill({ json: caseDetails }),
      });
      const jurisdictionRequests: string[] = [];
      page.on('request', (request) => {
        if (request.url().includes('/api/wa-supported-jurisdiction/get')) {
          jurisdictionRequests.push(request.url());
        }
      });

      await page.goto('/cases');
      await globalSearchPage.performGlobalSearchWithCase(GLOBAL_SEARCH_CASE_REFERENCE, 'PUBLICLAW');
      await expect(globalSearchPage.viewLink).toBeVisible();
      expect(await page.evaluate((key) => JSON.parse(sessionStorage.getItem(key)), jurisdictionStorageKey)).toEqual(
        HEARINGS_WA_SUPPORTED_JURISDICTIONS
      );
      await globalSearchPage.viewLink.click();

      await expect(page).toHaveURL(
        new RegExp(`/cases/case-details/PUBLICLAW/CARE_SUPERVISION_EPO/${GLOBAL_SEARCH_CASE_REFERENCE}#Summary$`)
      );
      await expect(page.getByRole('tab', { name: 'Tasks', exact: true })).toBeVisible();
      await expect(page.getByRole('tab', { name: /^Summary(?:,|$)/ })).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByRole('tab', { name: 'Tasks', exact: true })).toHaveAttribute('aria-selected', 'false');
      await expect(page.getByText('Case information', { exact: true }).first()).toBeVisible();
      expect(jurisdictionRequests).toEqual([]);
    });
  }
);

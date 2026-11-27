import type { Page, TestInfo } from '@playwright/test';
import { GlobalSearchPage } from '../../E2E/page-objects/pages/exui/globalSearch.po';
import { TaskListPage } from '../../E2E/page-objects/pages/exui/taskList.po';
import { setupGlobalSearchMockRoutes } from './caseSearchMockRoutes.helper';
import { setupMigrationMyWork } from './migrationWorkRoutes.helper';
import { mockMigrationRequest } from './migrationVisualRoutes.helper';
import { buildXuiAppShellEnvironmentConfigMock } from './xuiAppShellMockRoutes.helper';
import {
  buildMigrationNavigationCase,
  buildMigrationNavigationSearch,
  NAVIGATION_CASE_REFERENCE,
  NAVIGATION_RESTRICTED_REFERENCE,
} from '../mocks/migrationNavigation.mock';

export async function setupMigrationNavigationRoutes(page: Page, origin: string) {
  await setupMigrationMyWork(page);
  // Task-list bootstrap replaces the shell config; complete its case-viewer contract for this journey.
  await mockMigrationRequest(page, origin, 'GET', '/external/config/ui/', (route) =>
    route.fulfill({
      json: {
        ...buildXuiAppShellEnvironmentConfigMock(),
        hearingJurisdictionConfig: { hearingJurisdictions: { '.+': [] }, hearingAmendment: { '.+': [] } },
      },
    })
  );
  const search = buildMigrationNavigationSearch();
  await setupGlobalSearchMockRoutes(page, {
    ...search,
    waSupportedJurisdictions: ['IA'],
    searchResultsHandler: (route) => route.fulfill({ json: search.results }),
  });
  const caseResponses: Array<{ caseReference: string; status: number }> = [];
  for (const [caseReference, status] of [
    [NAVIGATION_CASE_REFERENCE, 200],
    [NAVIGATION_RESTRICTED_REFERENCE, 403],
  ] as const) {
    await mockMigrationRequest(page, origin, 'GET', `/data/internal/cases/${caseReference}`, async (route) => {
      caseResponses.push({ caseReference, status });
      await route.fulfill({
        status,
        json: status === 200 ? buildMigrationNavigationCase() : { message: 'Synthetic restricted case' },
      });
    });
  }
  await mockMigrationRequest(page, origin, 'POST', `/workallocation/case/task/${NAVIGATION_CASE_REFERENCE}`, (route) =>
    route.fulfill({ json: [] })
  );
  await mockMigrationRequest(page, origin, 'POST', '/workallocation/caseworker/getUsersByIdamIds', (route) =>
    route.fulfill({ json: [] })
  );
  return caseResponses;
}

export async function openMigrationNavigationSource(page: Page, source: 'My work' | 'Search') {
  const tasks = new TaskListPage(page);
  await tasks.goto();
  if (source === 'Search') {
    await page
      .getByRole('navigation', { name: 'Primary navigation', exact: true })
      .getByRole('link', { name: 'Search', exact: true })
      .click();
    const search = new GlobalSearchPage(page);
    await search.submitSearchWithCase(NAVIGATION_CASE_REFERENCE, 'IA');
    return { caseLink: search.viewLink, marker: search.searchResultsHeader, path: /\/search\/results(?:[?#]|$)/ };
  }
  return {
    caseLink: tasks.taskRows.getByRole('link', { name: 'Assigned migration case', exact: true }),
    marker: tasks.taskListResultsAmount,
    path: /\/work\/my-work\/list(?:[?#]|$)/,
  };
}

export async function captureMigrationNavigation(page: Page, testInfo: TestInfo, name: string) {
  const navigation = page.getByRole('navigation', { name: 'Primary navigation', exact: true });
  await testInfo.attach(`${name}-links`, {
    body: JSON.stringify({
      url: page.url(),
      links: await navigation.getByRole('link').evaluateAll((links) =>
        links.map((link) => ({
          text: link.textContent?.trim(),
          href: link.getAttribute('href'),
          current: link.getAttribute('aria-current'),
        }))
      ),
    }),
    contentType: 'application/json',
  });
}

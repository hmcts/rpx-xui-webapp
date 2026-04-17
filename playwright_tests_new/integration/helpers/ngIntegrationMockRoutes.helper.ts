import { createRequire } from 'node:module';
import type { Page } from '@playwright/test';

const require = createRequire(import.meta.url);

const appConfigTemplate = require('../../../src/assets/config/config.json');
const headerConfigTemplate = require('../../../test_codecept/ngIntegration/config/baseConfig.js');

type UnknownRecord = Record<string, unknown>;

export interface NgIntegrationUserDetailsOptions {
  userId?: string;
  forename?: string;
  surname?: string;
  email?: string;
  roleCategory?: string;
  roles?: string[];
  roleAssignmentInfo?: UnknownRecord[];
}

export interface NgIntegrationEnvironmentConfigOptions {
  accessManagementEnabled?: boolean;
  ccdGatewayUrl?: string;
  headerConfig?: UnknownRecord;
  launchDarklyClientId?: string;
  waWorkflowApi?: string;
}

export interface NgIntegrationBaseRoutesOptions {
  userDetails?: NgIntegrationUserDetailsOptions;
  environmentConfig?: NgIntegrationEnvironmentConfigOptions;
  clientContextFeatureFlags?: Record<string, unknown>;
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function buildNgIntegrationUserDetailsMock(options?: NgIntegrationUserDetailsOptions) {
  const roles = options?.roles ?? ['caseworker-ia-caseofficer', 'caseworker-ia-admofficer'];
  const userId = options?.userId ?? 'wave2-user-id';

  return {
    sessionTimeout: {
      idleModalDisplayTime: 300,
      totalIdleTime: 900,
    },
    canShareCases: false,
    userInfo: {
      id: userId,
      uid: userId,
      forename: options?.forename ?? 'Wave2',
      surname: options?.surname ?? 'Playwright',
      email: options?.email ?? 'wave2.playwright@justice.gov.uk',
      active: true,
      roleCategory: options?.roleCategory ?? 'LEGAL_OPERATIONS',
      roles,
    },
    roleAssignmentInfo: deepClone(options?.roleAssignmentInfo ?? []),
  };
}

export function buildNgIntegrationAppConfigMock(): UnknownRecord {
  return deepClone(appConfigTemplate) as UnknownRecord;
}

export function buildNgIntegrationEnvironmentConfigMock(options?: NgIntegrationEnvironmentConfigOptions): UnknownRecord {
  return {
    accessManagementEnabled: options?.accessManagementEnabled ?? true,
    ccdGatewayUrl: options?.ccdGatewayUrl ?? 'http://localhost:3001',
    clientId: 'xui-webapp',
    idamWeb: 'https://idam-web-public.aat.platform.hmcts.net',
    launchDarklyClientId: options?.launchDarklyClientId ?? '5de6610b23ce5408280f2268',
    oAuthCallback: '/oauth2/callback',
    oidcEnabled: true,
    protocol: 'http',
    waWorkflowApi: options?.waWorkflowApi ?? '/workallocation',
    headerConfig: options?.headerConfig ?? deepClone(headerConfigTemplate),
  };
}

export function buildNgIntegrationClientContextMock(featureFlags?: Record<string, unknown>): UnknownRecord {
  return {
    client_context: {
      feature_flags: {
        MC_Work_Allocation: true,
        MC_Notice_of_Change: true,
        'feature-global-search': true,
        'feature-refunds': true,
        'mc-work-allocation-active-feature': 'WorkAllocationRelease2',
        ...featureFlags,
      },
      user_language: {
        language: 'en',
      },
    },
  };
}

export async function setupNgIntegrationBaseRoutes(page: Page, options?: NgIntegrationBaseRoutesOptions): Promise<void> {
  const userDetails = buildNgIntegrationUserDetailsMock(options?.userDetails);
  const appConfig = buildNgIntegrationAppConfigMock();
  const environmentConfig = buildNgIntegrationEnvironmentConfigMock(options?.environmentConfig);
  const clientContext = buildNgIntegrationClientContextMock(options?.clientContextFeatureFlags);

  await page.addInitScript(
    ([seededUserInfo, seededClientContext]) => {
      window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
      window.sessionStorage.setItem('clientContext', JSON.stringify(seededClientContext));
    },
    [userDetails.userInfo, clientContext]
  );

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.route('**/assets/config/config.json*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(appConfig),
    });
  });

  await page.route(/\/external\/config\/ui(?:\/|\?|$)/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(environmentConfig),
    });
  });

  await page.route('**/api/role-access/roles/manageLabellingRoleAssignment/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/api/role-access/roles/access-get-by-caseId*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/wa-supported-jurisdiction/get*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/prd/judicial/searchJudicialUserByIdamId*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/role-access/roles/get-my-access-new-count*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ count: 0 }),
    });
  });
}

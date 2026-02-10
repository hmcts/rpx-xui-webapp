import {
  AxeUtils,
  BrowserUtils,
  IdamUtils,
  LighthouseUtils,
  LocaleUtils,
  SessionUtils,
  TableUtils,
  WaitUtils,
  ServiceAuthUtils,
  type Logger,
} from '@hmcts/playwright-common';
import * as os from 'node:os';
import * as path from 'node:path';
import { chromium, Page } from 'playwright/test';
import { config, Config } from './config.utils.js';
import { CookieUtils } from './cookie.utils.js';
import { ValidatorUtils } from './validator.utils.js';
import { UserUtils } from './user.utils.js';
import { logger } from './logger.utils.js';

export interface UtilsFixtures {
  config: Config;
  cookieUtils: CookieUtils;
  validatorUtils: ValidatorUtils;
  waitUtils: WaitUtils;
  tableUtils: TableUtils;
  axeUtils: AxeUtils;
  SessionUtils: typeof SessionUtils;
  browserUtils: BrowserUtils;
  lighthouseUtils: LighthouseUtils;
  lighthousePage: Page;
  idamUtils: IdamUtils;
  localeUtils: LocaleUtils;
  serviceAuthUtils: ServiceAuthUtils;
  userUtils: UserUtils;
  logger: Logger;
}

export const utilsFixtures = {
  config: async ({}, use) => {
    await use(config);
  },
  cookieUtils: async ({}, use) => {
    await use(new CookieUtils());
  },
  waitUtils: async ({}, use) => {
    await use(new WaitUtils());
  },
  tableUtils: async ({}, use) => {
    await use(new TableUtils());
  },
  validatorUtils: async ({}, use) => {
    await use(new ValidatorUtils());
  },
  lighthouseUtils: async ({ lighthousePage, lighthousePort }, use) => {
    await use(new LighthouseUtils(lighthousePage, lighthousePort));
  },
  axeUtils: async ({ page }, use, testInfo) => {
    const axeUtils = new AxeUtils(page);
    await use(axeUtils);
    await axeUtils.generateReport(testInfo);
  },
  SessionUtils: async ({}, use) => {
    await use(SessionUtils);
  },
  browserUtils: async ({ browser }, use) => {
    await use(new BrowserUtils(browser));
  },
  idamUtils: async ({ config }, use) => {
    // Set required env vars for IDAM
    process.env.IDAM_WEB_URL = config.urls.idamWebUrl;
    process.env.IDAM_TESTING_SUPPORT_URL = config.urls.idamTestingSupportUrl;

    await use(new IdamUtils());
  },
  localeUtils: async ({ page }, use) => {
    await use(new LocaleUtils(page));
  },
  lighthousePage: async ({ lighthousePort, page, SessionUtils }, use, testInfo) => {
    // Prevent creating performance page if not needed
    if (testInfo.tags.includes('@performance')) {
      // Lighthouse opens a new page and as playwright doesn't share context we need to
      // explicitly create a new browser with shared context
      const userDataDir = path.join(os.tmpdir(), 'pw', String(Math.random()));
      const context = await chromium.launchPersistentContext(userDataDir, {
        args: [`--remote-debugging-port=${lighthousePort}`],
      });
      // Using the cookies from global setup, inject to the new browser
      await context.addCookies(SessionUtils.getCookies(config.users.caseManager.sessionFile));
      // Provide the page to the test
      await use(context.pages()[0]);
      await context.close();
    } else {
      await use(page);
    }
  },
  serviceAuthUtils: async ({ config }, use) => {
    // Set required env vars for Service auth (S2S_URL)
    process.env.S2S_URL = config.urls.serviceAuthUrl;
    await use(new ServiceAuthUtils());
  },
  userUtils: async ({}, use) => {
    await use(new UserUtils());
  },
  logger: async ({}, use) => {
    await use(logger);
  },
};

import type { Browser } from '@playwright/test';

import { setRuntimeUserCredentials } from '../../runtimeUserCredentials';
import { createCivilCourtStaffAccountViaApi } from '../journeys/civilCaseJourneys';

export {
  createCivilLipCaseInMediationViaApi,
  fetchCaseDetailsViaApi,
  resolveCcdCaseStateId,
  waitForCivilCaseStateViaApi,
  type CcdCaseDetails,
} from '../journeys/civilCaseJourneys';

const DEFAULT_CIVIL_CASE_FLAGS_SETUP_ALIAS = 'CIVIL_SOLICITOR';
const DEFAULT_CIVIL_COURT_STAFF_ALIAS = 'CIVIL_COURT_STAFF';

export function getCivilCaseFlagsSetupAlias(): string {
  return process.env.PW_CIVIL_CASE_FLAGS_SETUP_ALIAS?.trim() || DEFAULT_CIVIL_CASE_FLAGS_SETUP_ALIAS;
}

export function getCivilCaseFlagsCourtStaffAlias(): string {
  return process.env.PW_CIVIL_CASE_FLAGS_COURT_STAFF_ALIAS?.trim() || DEFAULT_CIVIL_COURT_STAFF_ALIAS;
}

export async function configureCivilCaseFlagsRuntimeUsers(browser: Browser): Promise<void> {
  configureCivilCaseFlagsSetupAliasCredentials();
  await configureCivilCaseFlagsCourtStaffAliasCredentials(browser);
}

function configureCivilCaseFlagsSetupAliasCredentials(): void {
  if (getCivilCaseFlagsSetupAlias() !== DEFAULT_CIVIL_CASE_FLAGS_SETUP_ALIAS) {
    return;
  }

  const email = firstNonEmpty(
    process.env.CIVIL_SOLICITOR_USERNAME,
    process.env.PW_CIVIL_SOLICITOR_EMAIL,
    process.env.CIVIL_SOLICITOR_EMAIL
  );
  const password =
    firstNonEmpty(process.env.CIVIL_SOLICITOR_PASSWORD, process.env.PW_CIVIL_SOLICITOR_PASSWORD) ??
    (email
      ? firstNonEmpty(process.env.CITIZEN_PASSWORD, process.env.PW_CIVIL_CITIZEN_PASSWORD, process.env.TEST_PASSWORD)
      : undefined);

  if (!email && !password) {
    return;
  }
  if (!email || !password) {
    throw new Error(
      'Civil case flag setup alias CIVIL_SOLICITOR requires both a configured email and password. ' +
        'Set CIVIL_SOLICITOR_USERNAME/CIVIL_SOLICITOR_PASSWORD or PW_CIVIL_SOLICITOR_EMAIL/PW_CIVIL_SOLICITOR_PASSWORD.'
    );
  }

  process.env.CIVIL_SOLICITOR_USERNAME = email;
  process.env.CIVIL_SOLICITOR_PASSWORD = password;
  setRuntimeUserCredentials(DEFAULT_CIVIL_CASE_FLAGS_SETUP_ALIAS, { email, password });
}

async function configureCivilCaseFlagsCourtStaffAliasCredentials(browser: Browser): Promise<void> {
  if (getCivilCaseFlagsCourtStaffAlias() !== DEFAULT_CIVIL_COURT_STAFF_ALIAS) {
    return;
  }

  const email = firstNonEmpty(process.env.CIVIL_COURT_STAFF_USERNAME, process.env.PW_CIVIL_COURT_STAFF_EMAIL);
  const password =
    firstNonEmpty(process.env.CIVIL_COURT_STAFF_PASSWORD, process.env.PW_CIVIL_COURT_STAFF_PASSWORD) ??
    (email ? firstNonEmpty(process.env.DEFAULT_PASSWORD, process.env.TEST_PASSWORD) : undefined);
  if (email && password) {
    setRuntimeUserCredentials(DEFAULT_CIVIL_COURT_STAFF_ALIAS, { email, password });
    return;
  }

  if (isTruthy(process.env.PW_CIVIL_DISABLE_DYNAMIC_COURT_STAFF)) {
    throw new Error(
      'Civil court staff UI setup requires CIVIL_COURT_STAFF_USERNAME/CIVIL_COURT_STAFF_PASSWORD, ' +
        'PW_CIVIL_COURT_STAFF_EMAIL/PW_CIVIL_COURT_STAFF_PASSWORD, or dynamic court staff creation.'
    );
  }

  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    const credentials = await createCivilCourtStaffAccountViaApi(page);
    process.env.CIVIL_COURT_STAFF_USERNAME = credentials.email;
    process.env.CIVIL_COURT_STAFF_PASSWORD = credentials.password;
    setRuntimeUserCredentials(DEFAULT_CIVIL_COURT_STAFF_ALIAS, credentials);
  } finally {
    await context.close();
  }
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) {
      return trimmed;
    }
  }
  return undefined;
}

function isTruthy(value: string | undefined): boolean {
  const normalised = value?.trim().toLowerCase();
  return normalised === '1' || normalised === 'true' || normalised === 'yes';
}

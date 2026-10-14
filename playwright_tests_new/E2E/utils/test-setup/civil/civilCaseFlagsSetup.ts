import type { Browser } from '@playwright/test';

import {
  getRuntimeUserCredentialEnvMapping,
  getRuntimeUserCredentials,
  setRuntimeUserCredentials,
} from '../../runtimeUserCredentials';

export {
  createCivilLipCaseInMediationViaApi,
  fetchCaseDetailsViaApi,
  resolveCcdCaseStateId,
  waitForCivilCaseStateViaApi,
  type CcdCaseDetails,
} from '../journeys/civilCaseJourneys';

const DEFAULT_CIVIL_COURT_STAFF_ALIAS = 'CIVIL_COURT_STAFF';

export function getCivilCaseFlagsCourtStaffAlias(): string {
  return process.env.PW_CIVIL_CASE_FLAGS_COURT_STAFF_ALIAS?.trim() || DEFAULT_CIVIL_COURT_STAFF_ALIAS;
}

export async function configureCivilCaseFlagsRuntimeUsers(browser: Browser): Promise<void> {
  await configureCivilCaseFlagsCourtStaffAliasCredentials(browser);
}

async function configureCivilCaseFlagsCourtStaffAliasCredentials(_browser: Browser): Promise<void> {
  const alias = getCivilCaseFlagsCourtStaffAlias();
  if (alias !== DEFAULT_CIVIL_COURT_STAFF_ALIAS) {
    const mapping = getRuntimeUserCredentialEnvMapping(alias);
    const email = mapping ? process.env[mapping.username]?.trim() : undefined;
    const password = mapping ? process.env[mapping.password] : undefined;
    const credentials = getRuntimeUserCredentials(alias) ?? (email && password ? { email, password } : undefined);
    if (!credentials) {
      throw new Error(`Civil court staff alias ${alias} does not have configured credentials.`);
    }
    publishCivilCourtStaffLeaseCredentials(credentials);
    return;
  }

  const usePrimary = Boolean(process.env.CIVIL_COURT_STAFF_USERNAME || process.env.CIVIL_COURT_STAFF_PASSWORD);
  const email = (usePrimary ? process.env.CIVIL_COURT_STAFF_USERNAME : process.env.PW_CIVIL_COURT_STAFF_EMAIL)?.trim();
  const password = usePrimary ? process.env.CIVIL_COURT_STAFF_PASSWORD : process.env.PW_CIVIL_COURT_STAFF_PASSWORD;
  if (email && password) {
    const credentials = { email, password };
    setRuntimeUserCredentials(DEFAULT_CIVIL_COURT_STAFF_ALIAS, credentials);
    publishCivilCourtStaffLeaseCredentials(credentials);
    return;
  }

  throw new Error(
    'Civil case flags requires configured CIVIL_COURT_STAFF_USERNAME/CIVIL_COURT_STAFF_PASSWORD ' +
      'or PW_CIVIL_COURT_STAFF_EMAIL/PW_CIVIL_COURT_STAFF_PASSWORD. No substitute account will be created.'
  );
}

function publishCivilCourtStaffLeaseCredentials(credentials: { email: string; password: string }): void {
  process.env.CIVIL_COURT_STAFF_USERNAME = credentials.email;
  process.env.CIVIL_COURT_STAFF_PASSWORD = credentials.password;
}

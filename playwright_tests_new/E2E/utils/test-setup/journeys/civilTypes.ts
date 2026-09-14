import type { Page, TestInfo } from '@playwright/test';

import type { CaseDetailsPage } from '../../../page-objects/pages/exui/caseDetails.po';
import type { CreateCasePage } from '../../../page-objects/pages/exui/createCase.po';

export type JsonRecord = Record<string, unknown>;

export type CcdCaseDetails = JsonRecord & {
  id?: string | number;
  case_id?: string | number;
  case_reference?: string | number;
  caseReference?: string | number;
  state?: string | { id?: string; name?: string };
  data?: JsonRecord;
  case_data?: JsonRecord;
};

export type CivilCaseProgressionEvent = {
  eventId?: string;
  event?: string;
  payload?: JsonRecord;
  caseData?: JsonRecord;
  caseDataUpdate?: JsonRecord;
  userInput?: Record<string, JsonRecord>;
  expectedState?: string;
  summary?: string;
  description?: string;
};

export type CreateCivilMediationCaseViaApiOptions = {
  page: Page;
  createCasePage: CreateCasePage;
  caseDetailsPage: CaseDetailsPage;
  testInfo?: TestInfo;
  jurisdiction?: string;
  caseType?: string;
  createEventId?: string;
  createPayload: JsonRecord;
  progressionEvents: CivilCaseProgressionEvent[];
  expectedState?: string;
};

export type CreateCivilMediationCaseViaApiResult = {
  caseNumber: string;
  caseDetails: CcdCaseDetails;
};

export type CivilApiUser = {
  email: string;
  password: string;
};

export type CivilApiConfig = {
  civilServiceUrl: string;
  idamApiUrl: string;
  idamTestSupportApiUrl?: string;
  serviceAuthProviderUrl?: string;
  s2sToken?: string;
  s2sSecret?: string;
  claimantUser: CivilApiUser;
  defendantUser: CivilApiUser;
  createClaimantAccount: boolean;
  createDefendantAccount: boolean;
};

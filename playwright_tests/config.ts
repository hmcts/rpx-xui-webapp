import path from "path";

export interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

export type UserRole =
  | "caseWorker"
  | "seniorCaseworker"
  | "hearingCentreAdmin"
  | "hearingCentreTeamLead"
  | "judge"
  | "seniorJudge"
  | "respondent"
  | "citizen"
  | "superUser";

interface Config {
  [key: string]: UserCredentials | string;
}

const config: Config = {
  caseWorker: {
    email:
      process.env.CASEWORKER_USERNAME ||
      "sptribsauto-caseworker@mailinator.com",
    password: process.env.CASEWORKER_PASSWORD || "Pa55w0rd10",
  },
  seniorCaseworker: {
    email:
      process.env.SENIOR_CASEWORKER_USERNAME ||
      "sptribsauto-seniorcaseworker@mailinator.com",
    password: process.env.SENIOR_CASEWORKER_PASSWORD || "Pa55w0rd11",
  },
  hearingCentreAdmin: {
    email:
      process.env.HEARING_CENTRE_ADMIN_USERNAME ||
      "sptribsauto-hearingcentreadmin@mailinator.com",
    password: process.env.HEARING_CENTRE_ADMIN_PASSWORD || "Pa55w0rd12",
  },
  hearingCentreTeamLead: {
    email:
      process.env.HEARING_CENTRE_TEAM_LEAD_USERNAME ||
      "sptribsauto-hearingcentreteamlead@mailinator.com",
    password: process.env.HEARING_CENTRE_TEAM_LEAD_PASSWORD || "Pa55w0rd13",
  },
  judge: {
    email: process.env.JUDGE_USERNAME || "sptribsauto-judge@mailinator.com",
    password: process.env.JUDGE_PASSWORD || "Pa55w0rd14",
  },
  seniorJudge: {
    email:
      process.env.SENIOR_JUDGE_USERNAME ||
      "sptribsauto-seniorjudge@mailinator.com",
    password: process.env.SENIOR_JUDGE_PASSWORD || "Pa55w0rd15",
  },
  respondent: {
    email:
      process.env.RESPONDENT_USERNAME ||
      "sptribsauto-respondent@mailinator.com",
    password: process.env.RESPONDENT_PASSWORD || "Pa55w0rd16",
  },
  citizen: {
    email: process.env.CITIZEN_USERNAME || "sptribsauto-citizen@mailinator.com",
    password: process.env.CITIZEN_PASSWORD || "Pa55w0rd17",
  },
  superUser: {
    email:
      process.env.SUPER_USER_USERNAME || "sptribsauto-superuser@mailinator.com",
    password: process.env.SUPER_USER_PASSWORD || "Pa55w0rd18",
  },

  FEBaseURL:
    process.env.FEBASEURL ||
    "https://sptribs-frontend.aat.platform.hmcts.net/",
  CaseAPIBaseURL:
    process.env.CASEAPIBASEURL ||
    "https://manage-case.aat.platform.hmcts.net/cases",
  UpdateCaseBaseURL:
    process.env.UCBASEURL ||
    "https://sptribs-dss-update-case-web.aat.platform.hmcts.net/",

  testFile: path.resolve(__dirname, "../tests/fixtures/testFiles/mockFile.txt"),
  testPdfFile: path.resolve(
    __dirname,
    "../tests/fixtures/testFiles/mockFile.pdf",
  ),
  testWordFile: path.resolve(
    __dirname,
    "../tests/fixtures/testFiles/mockFile.docx",
  ),
  testOdtFile: path.resolve(
    __dirname,
    "../tests/fixtures/testFiles/mockFile.odt",
  ),
};

export default config as {
  [key in UserRole]: UserCredentials;
} & {
  FEBaseURL: string;
  CaseAPIBaseURL: string;
  UpdateCaseBaseURL: string;
  testFile: string;
  testPdfFile: string;
  testWordFile: string;
  testOdtFile: string;
};
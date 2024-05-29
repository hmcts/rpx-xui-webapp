
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
  CaseAPIBaseURL:
    process.env.CASEAPIBASEURL ||
    "https://manage-case.aat.platform.hmcts.net/cases",
};

export default config as {
  [key in UserRole]: UserCredentials;
} & {
  CaseAPIBaseURL: string;
};
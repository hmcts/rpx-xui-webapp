import {join} from "path";

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

const baseURL = process.env.APPBASEURL || "https://manage-case.aat.platform.hmcts.net";
const queryMgmtURL = process.env.QM_BASE_URL || "https://xui-fpl-case-service-pr-5582.preview.platform.hmcts.net";


const config: Config = {
  AppBaseURL: baseURL,
  CaseBaseURL: baseURL + "/cases",
  QMBaseURL:queryMgmtURL
};



export default config as {
  [key in UserRole]: UserCredentials;
} & {
  AppBaseURL: string;
  CaseBaseURL: string;
  QMBaseURL:string;
};

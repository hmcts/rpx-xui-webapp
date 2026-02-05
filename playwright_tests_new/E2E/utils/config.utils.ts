import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import * as path from 'node:path';
import {UserUtils} from "./user.utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sessionPath = path.resolve(__dirname, "../../.sessions/");

// This needs to be placed somewhere before attempting to access any environment variables
dotenv.config();

// This should be removed when we move to API based user creation
const userUtils = new UserUtils();
const caseManager =  userUtils.getUserCredentials("IAC_CaseOfficer_R1");
const judge =  userUtils.getUserCredentials("IAC_Judge_WA_R1");

export interface UserCredentials {
  username: string;
  password: string;
  sessionFile: string;
  cookieName?: string;
}

interface Urls {
  exuiDefaultUrl: string;
  manageCaseBaseUrl: string;
  citizenUrl: string;
  idamWebUrl: string;
  idamTestingSupportUrl: string;
  serviceAuthUrl: string;
}

export interface Config {
  users: {
    caseManager: UserCredentials;
    judge: UserCredentials;
  };
  urls: Urls;
}

export const config: Config = {
  users: {
    caseManager: {
      username: caseManager.email,
      password: caseManager.password,
      sessionFile:
        sessionPath +
        `${caseManager.email}.json`,
      cookieName: "xui-webapp",
    },
    judge: {
      username: judge.email,
      password: judge.password,
      sessionFile:
        sessionPath +
        `${judge.email}.json`,
      cookieName: "xui-webapp",
    },
  },
  urls: {
    exuiDefaultUrl: "https://manage-case.aat.platform.hmcts.net",
    manageCaseBaseUrl:
      resolveUrl(process.env.MANAGE_CASES_BASE_URL, "https://manage-case.aat.platform.hmcts.net/cases"),
    citizenUrl:
      resolveUrl(process.env.CITIZEN_FRONTEND_BASE_URL, "https://privatelaw.aat.platform.hmcts.net/"),
    idamWebUrl:
      resolveUrl(process.env.IDAM_WEB_URL, "https://idam-web-public.aat.platform.hmcts.net"),
    idamTestingSupportUrl:
      resolveUrl(process.env.IDAM_TESTING_SUPPORT_URL, "https://idam-testing-support-api.aat.platform.hmcts.net"),
    serviceAuthUrl:
      resolveUrl(
        process.env.S2S_URL,
        "http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease"
      ),
  },
};

function resolveUrl(value: string | undefined, fallback: string): string {
  return value || fallback;
}

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Error: ${name} environment variable is not set`);
  }
  return value;
}

export const __test__ = {
  getEnvVar,
  resolveUrl
};
export default config;

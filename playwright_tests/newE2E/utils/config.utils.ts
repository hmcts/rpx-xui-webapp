import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// This needs to be placed somewhere before attempting to access any environment variables
dotenv.config({ quiet: true });

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
      username: getEnvVar("CASEMANAGER_USERNAME"),
      password: getEnvVar("CASEMANAGER_PASSWORD"),
      sessionFile:
        path.join(fileURLToPath(import.meta.url), "../../.sessions/") +
        `${getEnvVar("CASEMANAGER_USERNAME")}.json`,
      cookieName: "xui-webapp",
    },
    judge: {
      username: getEnvVar("JUDGE_USERNAME"),
      password: getEnvVar("JUDGE_PASSWORD"),
      sessionFile:
        path.join(fileURLToPath(import.meta.url), "../../.sessions/") +
        `${getEnvVar("JUDGE_USERNAME")}.json`,
      cookieName: "xui-webapp",
    },
  },
  urls: {
    exuiDefaultUrl: "https://manage-case.aat.platform.hmcts.net",
    manageCaseBaseUrl:
      process.env.MANAGE_CASES_BASE_URL ||
      "https://manage-case.aat.platform.hmcts.net/cases",
    citizenUrl:
      process.env.CITIZEN_FRONTEND_BASE_URL ||
      "https://privatelaw.aat.platform.hmcts.net/",
    idamWebUrl:
      process.env.IDAM_WEB_URL ||
      "https://idam-web-public.aat.platform.hmcts.net",
    idamTestingSupportUrl:
      process.env.IDAM_TESTING_SUPPORT_URL ||
      "https://idam-testing-support-api.aat.platform.hmcts.net",
    serviceAuthUrl:
      process.env.S2S_URL ||
      "http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease",
  },
};

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Error: ${name} environment variable is not set`);
  }
  return value;
}

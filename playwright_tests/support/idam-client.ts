import axios, { type AxiosInstance } from "axios";
import { requireEnvVar } from "./env.utils";

export interface IdamTokenRequest {
  grantType: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  username?: string;
  password?: string;
  redirectUri?: string;
}

export interface CreateIdamUserRequest {
  bearerToken: string;
  password: string;
  user: {
    id?: string;
    email: string;
    forename: string;
    surname: string;
    roleNames: string[];
  };
}

export interface CreatedIdamUser {
  id: string;
  email: string;
  password: string;
  forename: string;
  surname: string;
  roleNames: string[];
}

export class IdamClient {
  private readonly tokenHttp: AxiosInstance;
  private readonly testingSupportHttp: AxiosInstance;

  constructor() {
    const idamWebUrl = requireEnvVar("IDAM_WEB_URL");
    const idamTestingSupportUrl = requireEnvVar("IDAM_TESTING_SUPPORT_URL");

    this.tokenHttp = axios.create({
      baseURL: idamWebUrl,
      timeout: 30_000,
    });

    this.testingSupportHttp = axios.create({
      baseURL: idamTestingSupportUrl,
      timeout: 30_000,
    });
  }

  public async generateToken(payload: IdamTokenRequest): Promise<string> {
    const form = new URLSearchParams();
    form.append("grant_type", payload.grantType);
    form.append("client_id", payload.clientId);
    form.append("client_secret", payload.clientSecret);
    form.append("scope", payload.scope);
    if (payload.username) {
      form.append("username", payload.username);
    }
    if (payload.password) {
      form.append("password", payload.password);
    }
    if (payload.redirectUri) {
      form.append("redirect_uri", payload.redirectUri);
    }

    try {
      const response = await this.tokenHttp.post("/o/token", form.toString(), {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      const token = response.data?.access_token;
      if (!token) {
        throw new Error("IDAM token response did not contain access_token.");
      }
      return token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "[dynamic-users] IDAM token error",
          error.response?.status,
          stringifyPayload(error.response?.data)
        );
      }
      throw new Error(
        `Failed to obtain IDAM token: ${(error as Error).message}`
      );
    }
  }

  public async createUser(
    payload: CreateIdamUserRequest
  ): Promise<CreatedIdamUser> {
    try {
      const response = await this.testingSupportHttp.post("/test/idam/users", {
        password: payload.password,
        user: {
          id: payload.user.id,
          email: payload.user.email,
          forename: payload.user.forename,
          surname: payload.user.surname,
          roleNames: payload.user.roleNames,
        },
      }, {
        headers: {
          Authorization: `Bearer ${payload.bearerToken}`,
          "Content-Type": "application/json",
        },
      });

      const userId = response.data?.id;
      if (!userId) {
        throw new Error("IDAM create user response did not include the user ID.");
      }

      return {
        id: userId,
        email: payload.user.email,
        password: payload.password,
        forename: payload.user.forename,
        surname: payload.user.surname,
        roleNames: [...payload.user.roleNames],
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = stringifyPayload(error.response?.data);

        throw new Error(
          `Failed to create IDAM user: ${status ?? "unknown"} ${
            (error.response?.statusText ?? "").trim()
          } ${data ?? ""}`.trim()
        );
      }
      throw new Error(
        `Failed to create IDAM user: ${(error as Error).message}`
      );
    }
  }
}

function stringifyPayload(payload: unknown): string | undefined {
  if (!payload) {
    return undefined;
  }
  try {
    if (typeof payload === "string") {
      return payload;
    }
    return JSON.stringify(payload);
  } catch {
    return undefined;
  }
}

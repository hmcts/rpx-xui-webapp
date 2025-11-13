import axios, { type AxiosInstance } from "axios";
import { getEnvVar, requireEnvVar } from "./env.utils";

export interface ServiceAuthTokenRequest {
  microservice: string;
  secret?: string;
}

export class ServiceAuthClient {
  private readonly http: AxiosInstance;

  constructor() {
    const baseUrl = requireEnvVar("S2S_URL");
    this.http = axios.create({
      baseURL: baseUrl,
      timeout: 20_000,
    });
  }

  public async leaseToken(
    payload: ServiceAuthTokenRequest
  ): Promise<string> {
    const headers: Record<string, string> = {
      accept: "*/*",
      "Content-Type": "application/json",
    };

    const secret = payload.secret ?? getEnvVar("S2S_SECRET");
    if (secret) {
      const raw = `${payload.microservice}:${secret}`;
      headers.Authorization = `Basic ${Buffer.from(raw).toString("base64")}`;
    }

    try {
      const response = await this.http.post(
        "/testing-support/lease",
        {
          microservice: payload.microservice,
        },
        { headers }
      );

      const token =
        typeof response.data === "string"
          ? response.data
          : response.data?.token;

      if (!token) {
        throw new Error("Service auth response was blank.");
      }

      return token.trim();
    } catch (error) {
      throw new Error(
        `Failed to retrieve service auth token: ${(error as Error).message}`
      );
    }
  }
}

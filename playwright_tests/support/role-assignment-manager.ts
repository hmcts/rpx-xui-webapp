import axios, { type AxiosInstance } from "axios";
import { getEnvVar, getTestEnvironment } from "./env.utils";
import { ServiceAuthClient } from "./service-auth-client";

const ACCEPT_HEADER =
  "application/vnd.uk.gov.hmcts.role-assignment-service.delete-assignments+json;charset=UTF-8;version=1.0";

export interface RoleAssignmentManagerOptions {
  baseUrl?: string;
  microservice?: string;
}

export class RoleAssignmentManager {
  private readonly assignmentIds = new Set<string>();
  private readonly httpClient: AxiosInstance | null;
  private readonly serviceAuthClient: ServiceAuthClient | null;

  constructor(private readonly options: RoleAssignmentManagerOptions = {}) {
    const defaultBaseUrl = buildDefaultBaseUrl();
    const baseUrl = options.baseUrl ?? defaultBaseUrl;
    if (baseUrl && getEnvVar("S2S_URL")) {
      this.httpClient = axios.create({
        baseURL: baseUrl,
        timeout: 30_000,
      });
      this.serviceAuthClient = new ServiceAuthClient();
    } else {
      this.httpClient = null;
      this.serviceAuthClient = null;
    }
  }

  public trackAssignment(id: string): void {
    this.assignmentIds.add(id);
  }

  public async cleanup(userBearerToken: string): Promise<void> {
    if (!this.httpClient || !this.serviceAuthClient) {
      console.warn(
        "[dynamic-users] Role assignment client is not configured; skipping cleanup."
      );
      return;
    }
    if (this.assignmentIds.size === 0) {
      return;
    }

    const serviceToken = await this.serviceAuthClient.leaseToken({
      microservice: this.options.microservice ?? "xui_webapp",
    });

    for (const assignmentId of Array.from(this.assignmentIds)) {
      try {
        await this.httpClient.delete(`/am/role-assignments/${assignmentId}`, {
          headers: {
            accept: ACCEPT_HEADER,
            Authorization: `Bearer ${userBearerToken}`,
            ServiceAuthorization: serviceToken,
          },
        });
        this.assignmentIds.delete(assignmentId);
      } catch (error) {
        console.warn(
          `[dynamic-users] Failed to delete role assignment ${assignmentId}:`,
          (error as Error).message
        );
      }
    }
  }
}

function buildDefaultBaseUrl(): string | undefined {
  const explicit = getEnvVar("ROLE_ASSIGNMENT_BASE_URL");
  if (explicit) {
    return explicit;
  }
  const env = getTestEnvironment();
  if (!env) {
    return undefined;
  }
  return `http://am-role-assignment-service-${env}.service.core-compute-${env}.internal`;
}

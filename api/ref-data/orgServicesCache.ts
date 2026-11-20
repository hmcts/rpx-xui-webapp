import { RefDataHMCTSService } from './models/ref-data-hmcts-service.model';

export interface OrgServicesResponse {
  status: number;
  data: RefDataHMCTSService[];
}

// Follow FullUserDetailCache's singleton pattern for process-local reference data.
export class OrgServicesCache {
  private static instance: OrgServicesCache;
  private response: OrgServicesResponse;

  private static getInstance(): OrgServicesCache {
    this.instance = this.instance ? this.instance : new OrgServicesCache();
    return this.instance;
  }

  static getServices(): OrgServicesResponse | undefined {
    const response = this.getInstance().response;
    return response ? structuredClone(response) : undefined;
  }

  static setServices(response: OrgServicesResponse): void {
    this.getInstance().response = structuredClone(response);
  }

  static clear(): void {
    this.getInstance().response = undefined;
  }
}

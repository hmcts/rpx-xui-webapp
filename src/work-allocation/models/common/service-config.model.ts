export interface ServiceConfig {
  serviceName: string;
  caseTypes: string[];
  releaseVersion: string;
}

export interface WAFeatureConfig {
  configurations?: ServiceConfig[];
}

export interface WALandingPageRoles {
  roles: string[];
}

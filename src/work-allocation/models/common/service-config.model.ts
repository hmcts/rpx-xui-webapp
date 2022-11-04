export interface ServiceConfig {
    serviceName: string;
    caseTypes: string[];
    releaseVersion: string;
}

export interface WAFeatureConfig {
    configurations?: ServiceConfig[];
}

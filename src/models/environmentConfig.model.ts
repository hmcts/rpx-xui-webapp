import { InjectionToken } from '@angular/core';
import { WAFeatureConfig } from '../work-allocation/models/common/service-config.model';
import { DecentralisedService } from '../../common/decentralisation/decentralised-service';
import { DecentralisedCaseTypeMap } from '../../common/decentralisation/decentralised-casetype';

export const ENVIRONMENT_CONFIG = new InjectionToken<EnvironmentConfig>('environment.config');

export interface EnvironmentConfig {
  idamWeb: string;
  ccdGatewayUrl?: string;
  clientId: string;
  oAuthCallback: string;
  protocol: string;
  oidcEnabled: string;
  launchDarklyClientId?: string;
  accessManagementEnabled?: boolean;
  paymentReturnUrl: string;
  waSupportedServices?: WAFeatureConfig;
  headerConfig: object;
  hearingJurisdictionConfig: {
    hearingJurisdictions: object;
    hearingAmendment: object;
  };
  decentralisedCaseTypeConfig?: DecentralisedCaseTypeMap;
  decentralisedServiceMap?: Record<string, DecentralisedService>;
}

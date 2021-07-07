import { InjectionToken } from '@angular/core';

export const ENVIRONMENT_CONFIG = new InjectionToken<EnvironmentConfig>('environment.config');

export interface EnvironmentConfig {
  idamWeb: string;
  ccdGatewayUrl?: string;
  clientId: string;
  oAuthCallback: string;
  protocol: string;
  oidcEnabled: string;
  launchDarklyClientId?: string;
}

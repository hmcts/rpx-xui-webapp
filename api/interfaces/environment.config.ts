export interface EnvironmentConfig {
  appInsightsInstrumentationKey: string,
  configEnv: string,
  cookies: EnvironmentConfigCookies,
  exceptionOptions: EnvironmentConfigExceptionOptions,
  health: EnvironmentConfigServices,
  idamClient: string,
  indexUrl: string,
  logging: string,
  now: boolean,
  maxLogLine: number,
  microservice: string,
  oauthCallbackUrl: string,
  protocol: string,
  proxy: EnvironmentConfigProxy,
  secureCookie: boolean,
  services: EnvironmentConfigServices,
  sessionSecret: string,
}

export interface EnvironmentConfigCookies {
  token: string,
  userId: string,
}

export interface EnvironmentConfigExceptionOptions {
  maxLines: number,
}

export interface EnvironmentConfigServices {
  ccdDataApi: string,
  ccdDefApi: string,
  idamApi: string,
  idamWeb: string,
  rdProfessionalApi: string,
  s2s: string,
}

export interface EnvironmentConfigProxy {
  host: string,
  port: number,
}

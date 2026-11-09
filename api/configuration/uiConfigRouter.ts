import * as express from 'express';
import { CaseTypeMap, FrontendDecentralisedCaseType } from '../../common/decentralisation/decentralised-casetype';
import { DecentralisedService } from '../../common/decentralisation/decentralised-service';
import { getConfigValue, showFeature } from './index';
import { setupMenuConfig } from './menuConfigs/configs';
import {
  FEATURE_ACCESS_MANAGEMENT_ENABLED,
  FEATURE_OIDC_ENABLED,
  FEATURE_SUBSTANTIVE_ROLE_ENABLED,
  LAUNCH_DARKLY_CLIENT_ID,
  PROTOCOL,
  DECENTRALISED_CASE_TYPE_CONFIG,
  DECENTRALISED_SERVICE_MAP,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
  SERVICES_PAYMENT_RETURN_URL,
} from './references';
import { setupHearingConfigs } from './hearingConfigs/configs';

export const router = express.Router({ mergeParams: true });

const AAT_CONFIG_ENVS = ['.aat.', '.demo.', '.perftest.', '.ithc.'];
router.get('/', uiConfigurationRouter);

let menuConfigCache;
let hearingJurisdictionsConfigCache;

function getBackendEnvironment() {
  const hasPreviewID = process.env.PREVIEW_DEPLOYMENT_ID;
  const envUrl = getConfigValue(SERVICES_IDAM_LOGIN_URL);
  return hasPreviewID ? 'preview' : AAT_CONFIG_ENVS.some((substring) => envUrl.includes(substring)) ? 'aat' : 'prod';
}

function getHeaderConfig() {
  if (!menuConfigCache) {
    const environment = getBackendEnvironment();
    menuConfigCache = setupMenuConfig(environment);
  }
  return menuConfigCache;
}

function getHearingJurisdictions() {
  if (!hearingJurisdictionsConfigCache) {
    const environment = getBackendEnvironment();
    hearingJurisdictionsConfigCache = setupHearingConfigs(environment);
  }
  return hearingJurisdictionsConfigCache;
}

function isPublicBrowserUrl(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  if (value.startsWith('/')) {
    return true;
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    const privateIpv4 =
      /^10\./.test(hostname) ||
      /^127\./.test(hostname) ||
      /^169\.254\./.test(hostname) ||
      /^192\.168\./.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(hostname);

    return (
      (url.protocol === 'https:' || url.protocol === 'http:') &&
      hostname !== 'localhost' &&
      !hostname.endsWith('.internal') &&
      !privateIpv4
    );
  } catch {
    return false;
  }
}

/**
 * Runtime case-type configuration contains both browser and server-only
 * values. Only public web URLs are required by the Angular application;
 * nocBaseUrl and any future backend properties must remain server-side.
 */
function getFrontendDecentralisedCaseTypeConfig(): CaseTypeMap<FrontendDecentralisedCaseType> {
  const config = getConfigValue<CaseTypeMap<FrontendDecentralisedCaseType>>(DECENTRALISED_CASE_TYPE_CONFIG);

  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(config)
      .filter(([, value]) => isPublicBrowserUrl(value?.webUrl))
      .map(([caseType, value]) => [caseType, { webUrl: value.webUrl }])
  );
}

function getFrontendDecentralisedServiceMap(): Record<string, DecentralisedService> {
  const config = getConfigValue<Record<string, DecentralisedService>>(DECENTRALISED_SERVICE_MAP);

  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(config)
      .filter(([, value]) => value && typeof value.id === 'string' && isPublicBrowserUrl(value.baseUrl))
      .map(([service, value]) => [service, { id: value.id, baseUrl: value.baseUrl }])
  );
}

/**
 * UI Configuration Route
 *
 * The following environmental variables are passed to the UI.
 *
 * Note that we do not pass the whole appConfiguration to the UI,
 * we only pass what's needed to be precise.
 */
async function uiConfigurationRouter(req, res) {
  res.status(200).send({
    accessManagementEnabled: showFeature(FEATURE_ACCESS_MANAGEMENT_ENABLED),
    ccdGatewayUrl: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
    clientId: getConfigValue(SERVICES_IDAM_CLIENT_ID),
    idamWeb: getConfigValue(SERVICES_IDAM_LOGIN_URL),
    launchDarklyClientId: getConfigValue(LAUNCH_DARKLY_CLIENT_ID),
    oAuthCallback: getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL),
    oidcEnabled: showFeature(FEATURE_OIDC_ENABLED),
    protocol: getConfigValue(PROTOCOL),
    substantiveEnabled: showFeature(FEATURE_SUBSTANTIVE_ROLE_ENABLED),
    paymentReturnUrl: getConfigValue(SERVICES_PAYMENT_RETURN_URL),
    decentralisedCaseTypeConfig: getFrontendDecentralisedCaseTypeConfig(),
    decentralisedServiceMap: getFrontendDecentralisedServiceMap(),
    headerConfig: getHeaderConfig(),
    hearingJurisdictionConfig: getHearingJurisdictions(),
  });
}

export default router;

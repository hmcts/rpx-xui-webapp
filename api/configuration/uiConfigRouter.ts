import * as express from 'express';
import { getConfigValue, showFeature } from './index';
import {
  FEATURE_ACCESS_MANAGEMENT_ENABLED,
  FEATURE_OIDC_ENABLED,
  FEATURE_SUBSTANTIVE_ROLE_ENABLED,
  LAUNCH_DARKLY_CLIENT_ID,
  PROTOCOL,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
  SERVICES_JUDICIAL_BOOKING_API_PATH,
  SERVICES_PAYMENT_RETURN_URL,
  SERVICES_WA_WORKFLOW_API_URL,
  WA_SUPPORTED_JURISDICTIONS,
  TIMEOUTS_FOR_CASE_RETRIEVAL,
  TIMEOUTS_CASE_RETRIEVAL_ARTIFICIAL_DELAY
} from './references';
import { getFormattedSupportedServicesCaseTypes } from './waSupportedServicesCaseTypesHelper';

export const router = express.Router({ mergeParams: true });

router.get('/', uiConfigurationRouter);

/**
 * UI Configuration Route
 *
 * The following environmental variables are passed to the UI.
 *
 * Note that we do not pass the whole appConfiguration to the UI,
 * we only pass what's needed to be precise.
 */
async function uiConfigurationRouter(req, res) {
  const toNumber = (str: string) => {
    if (str?.toString() === '0') {
      return 0;
    } else if (!str) {
      return null;
    }
    return Number(str);
  };

  const toNumberArray = (str: string) => {
    if (str?.toString() === '0') {
      return [0];
    } else if (!str) {
      return null;
    }
    str = str.toString().replace('[', '').replace(']', '');
    return str.split(',').map(Number);
  };

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
    waWorkflowApi: getConfigValue(SERVICES_WA_WORKFLOW_API_URL),
    judicialBookingApi: getConfigValue(SERVICES_JUDICIAL_BOOKING_API_PATH),
    timeoutsForCaseRetrieval: toNumberArray(getConfigValue(TIMEOUTS_FOR_CASE_RETRIEVAL)),
    timeoutsCaseRetrievalArtificialDelay: toNumber(getConfigValue(TIMEOUTS_CASE_RETRIEVAL_ARTIFICIAL_DELAY)),
    waSupportedServices: getFormattedSupportedServicesCaseTypes(getConfigValue(WA_SUPPORTED_JURISDICTIONS))
  });
}

export default router;

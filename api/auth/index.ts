import { AUTH, AuthOptions, SessionMetadata, xuiNode } from '@hmcts/rpx-xui-node-lib';
import { NextFunction, Response } from 'express';
import { getConfigValue, showFeature } from '../configuration';
import {
  COOKIES_TOKEN,
  COOKIES_USER_ID,
  FEATURE_OIDC_ENABLED,
  FEATURE_REDIS_ENABLED,
  FEATURE_SECURE_COOKIE_ENABLED,
  IDAM_SECRET,
  LOGIN_ROLE_MATCHER,
  MICROSERVICE,
  NOW,
  REDIS_CLOUD_URL,
  REDIS_KEY_PREFIX,
  REDIS_TTL,
  S2S_SECRET,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_ISS_URL,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
  SERVICES_IDAM_SERVICE_OVERRIDE,
  SERVICE_S2S_PATH,
  SESSION_SECRET,
  SYSTEM_USER_NAME,
  SYSTEM_USER_PASSWORD,
  FEATURE_QUERY_IDAM_SERVICE_OVERRIDE
} from '../configuration/references';
import { client } from '../lib/appInsights';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest } from '../lib/models';
import axios from 'axios';
import qs = require('qs');

const logger = log4jui.getLogger('auth');

export const successCallback = (req: EnhancedRequest, res: Response, next: NextFunction) => {
  const { user } = req.session.passport;
  const { userinfo } = user;
  const { accessToken } = user.tokenset;
  const cookieToken = getConfigValue(COOKIES_TOKEN);
  const cookieUserId = getConfigValue(COOKIES_USER_ID);

  logger.info('Setting session and cookies');

  res.cookie(cookieUserId, userinfo.uid, { sameSite: 'strict' });
  res.cookie(cookieToken, accessToken, { sameSite: 'strict' });

  if (!req.isRefresh) {
    return res.redirect('/');
  }
  next();
};

export const failureCallback = (req: EnhancedRequest, res: Response) => {
  const errorMsg = `Auth Error: ${res.locals.message}`;

  logger.warn(errorMsg);

  if (client) {
    client.trackEvent({ name: errorMsg });
  }
};

xuiNode.on(AUTH.EVENT.AUTHENTICATE_SUCCESS, successCallback);
xuiNode.on(AUTH.EVENT.AUTHENTICATE_FAILURE, failureCallback);

export const getXuiNodeMiddleware = async () => {
  const idamWebUrl = getConfigValue(SERVICES_IDAM_LOGIN_URL);
  const authorizationUrl = `${idamWebUrl}/login`;
  const secret = getConfigValue(IDAM_SECRET);
  const idamClient = getConfigValue(SERVICES_IDAM_CLIENT_ID);
  const issuerUrl = getConfigValue(SERVICES_IDAM_ISS_URL);
  const idamApiPath = getConfigValue(SERVICES_IDAM_API_URL);
  const s2sSecret = getConfigValue(S2S_SECRET);
  const tokenUrl = `${getConfigValue(SERVICES_IDAM_API_URL)}/oauth2/token`;
  const userName = getConfigValue(SYSTEM_USER_NAME);
  const password = getConfigValue(SYSTEM_USER_PASSWORD);
  const clientServiceDetailsUrl = `${getConfigValue(SERVICES_IDAM_API_URL)}/api/v2/services/${idamClient}`;

  const routeCredential = {
    password,
    routes: [
      '/workallocation/caseworker',
      '/api/role-access/roles/getJudicialUsers',
      '/workallocation/getJudicialUsers',
      '/workallocation/caseworker/getUsersByServiceName',
      '/api/prd/judicial/searchJudicialUserByPersonalCodes',
      '/api/prd/judicial/searchJudicialUserByIdamId'
    ],
    scope: 'openid profile roles manage-user create-user search-user',
    userName
  };

  //TODO: we can move these out into proper config at some point to tidy up even further
  const options: AuthOptions = {
    allowRolesRegex: getConfigValue(LOGIN_ROLE_MATCHER),
    authorizationURL: authorizationUrl,
    callbackURL: getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL),
    clientID: idamClient,
    clientSecret: secret,
    discoveryEndpoint: `${idamWebUrl}/o/.well-known/openid-configuration`,
    issuerURL: issuerUrl,
    logoutURL: idamApiPath,
    responseTypes: ['code'],
    routeCredential,
    scope: 'profile openid roles manage-user create-user search-user',
    sessionKey: 'xui-webapp',
    tokenEndpointAuthMethod: 'client_secret_post',
    tokenURL: tokenUrl,
    useRoutes: true,
    serviceOverride: getConfigValue(SERVICES_IDAM_SERVICE_OVERRIDE)
  };

  const baseStoreOptions = {
    cookie: {
      httpOnly: true,
      sameSite: 'Lax',
      secure: showFeature(FEATURE_SECURE_COOKIE_ENABLED)
    },
    name: 'xui-webapp',
    resave: false,
    saveUninitialized: false,
    secret: getConfigValue(SESSION_SECRET)
  } as SessionMetadata;

  const redisStoreOptions = {
    redisStore: {
      ...baseStoreOptions, ...{
        redisStoreOptions: {
          redisCloudUrl: getConfigValue(REDIS_CLOUD_URL),
          redisKeyPrefix: getConfigValue(REDIS_KEY_PREFIX),
          redisTtl: getConfigValue(REDIS_TTL)
        }
      }
    }
  };

  const fileStoreOptions = {
    fileStore: {
      ...baseStoreOptions, ...{
        fileStoreOptions: {
          filePath: getConfigValue(NOW) ? '/tmp/sessions' : '.sessions'
        }
      }
    }
  };

  const nodeLibOptions = {
    auth: {
      s2s: {
        microservice: getConfigValue(MICROSERVICE),
        s2sEndpointUrl: `${getConfigValue(SERVICE_S2S_PATH)}/lease`,
        s2sSecret: s2sSecret.trim()
      }
    },
    session: showFeature(FEATURE_REDIS_ENABLED) ? redisStoreOptions : fileStoreOptions
  };

  const getToken = async () => {
    const data = qs.stringify({
      grant_type: 'client_credentials',
      client_id: idamClient,
      client_secret: secret,
      scope: 'profile roles view-service-provider'
    });
    try {
      const response = await axios.post(tokenUrl, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data.access_token;
    } catch (error) {
      logger.error('Error fetching token:', error);
    }
  };

  const getClientServiceDetails = async () => {
    try {
      const accessToken = await getToken();
      if (!accessToken) {
        throw new Error('Failed to get access token');
      }
      const response = await axios.get(clientServiceDetailsUrl, { headers: {
        'Authorization': `Bearer ${accessToken}`
      } });
      logger.info('Successfully retrieved service override from API');
      return response.data.oauth2.issuerOverride;
    } catch (error) {
      logger.error('Error retrieving service override from API, falling back to config value', error);
      return getConfigValue(SERVICES_IDAM_SERVICE_OVERRIDE);
    }
  };

  if (showFeature(FEATURE_QUERY_IDAM_SERVICE_OVERRIDE)) {
    logger.info('Querying IDAM service override');
    options.serviceOverride = await getClientServiceDetails();
  }
  const type = showFeature(FEATURE_OIDC_ENABLED) ? 'oidc' : 'oauth2';
  nodeLibOptions.auth[type] = options;
  logger._logger.info('Setting XuiNodeLib options');
  return xuiNode.configure(nodeLibOptions);
};

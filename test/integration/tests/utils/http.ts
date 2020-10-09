import {s2s} from '@hmcts/rpx-xui-node-lib';
import axios, {AxiosInstance} from 'axios';
import {getConfigValue} from '../../../../api/configuration';
import {
  MAX_LOG_LINE,
  MICROSERVICE,
  S2S_SECRET,
  SERVICE_S2S_PATH
} from '../../../../api/configuration/references';
import * as log4jui from '../../../../api/lib/log4jui';
import {shorten} from '../../../../api/lib/util';
import {getAuthToken} from './getToken';

const s2sSecret = getConfigValue(S2S_SECRET).trim();
const microservice = getConfigValue(MICROSERVICE);
const s2sEndpointUrl = `${getConfigValue(SERVICE_S2S_PATH)}/lease`;

axios.defaults.headers.common['Content-Type'] = 'application/json';

s2s.configure({
  microservice,
  s2sEndpointUrl,
  s2sSecret
});

export const http: AxiosInstance = axios.create({});

export const initAxios = async () => {
  // const s2sToken = await s2s.serviceTokenGenerator();
  // const authToken = await getAuthToken();
  // we don't need to worry about storing to axios defaults here as memory will get destroyed once tests complete
  // axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  // axios.defaults.headers.common['ServiceAuthorization'] = s2sToken;
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'https://manage-case.aat.platform.hmcts.net/';
};

const requestInterceptor = (request) => {
  const logger = log4jui.getLogger('outgoing');
  const url = shorten(request.url, getConfigValue(MAX_LOG_LINE));
  logger.info(`${request.method.toUpperCase()} to ${url}`);
  return request;
};

http.interceptors.request.use(requestInterceptor);

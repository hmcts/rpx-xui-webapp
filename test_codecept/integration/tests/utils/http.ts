import { s2s } from '@hmcts/rpx-xui-node-lib';
import axios, { AxiosInstance } from 'axios';
import * as tunnel from 'tunnel';
import { getConfigValue } from '../../../../api/configuration';
import { MAX_LOG_LINE, MICROSERVICE, S2S_SECRET, SERVICE_S2S_PATH } from '../../../../api/configuration/references';
import * as log4jui from '../../../../api/lib/log4jui';
import { shorten } from '../../../../api/lib/util';
import { config } from '../config/config';

const s2sSecret = getConfigValue(S2S_SECRET).trim();
const microservice = getConfigValue(MICROSERVICE);
const s2sEndpointUrl = `${getConfigValue(SERVICE_S2S_PATH)}/lease`;

axios.defaults.headers.common['Content-Type'] = 'application/json';

s2s.configure({
  microservice,
  s2sEndpointUrl,
  s2sSecret,
});

const httpsagent = tunnel.httpsOverHttp({
  proxy: {
    host: 'proxyout.reform.hmcts.net',
    port: 8080,
  },
});

const axiosOptions: { httpsAgent?: ReturnType<typeof tunnel.httpsOverHttp> } = {};
if (!config.baseUrl.includes('manage-case.')) {
  axiosOptions.httpsAgent = httpsagent;
}

export const http: AxiosInstance = axios.create(axiosOptions);

export const initAxios = async () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = config.baseUrl;
};

const requestInterceptor = (request) => {
  const logger = log4jui.getLogger('outgoing');
  const url = shorten(request.url, getConfigValue(MAX_LOG_LINE));
  logger.info(`${request.method.toUpperCase()} to ${url}`);
  return request;
};

http.interceptors.request.use(requestInterceptor);

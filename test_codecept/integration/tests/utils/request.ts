import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { config } from '../config/config';
import { getSessionCookieString, updateSessionCookieString } from './authUtil';
import { reporterMsg, reporterJson } from './helper';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios.defaults.headers.common['Content-Type'] = 'application/json';
const axiosOptions: AxiosRequestConfig = {};
axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.baseUrl;
const http: AxiosInstance = axios.create(axiosOptions);

const requestInterceptor = (request: InternalAxiosRequestConfig) => {
  console.log(`${request.method?.toUpperCase()} to ${request.url}`);
  return request;
};

const responseInterceptor = (response: AxiosResponse) => {
  if (response.status === 200) {
    if (Object.keys(response.headers).includes('set-cookie')) {
      const setCookies = response.headers['set-cookie'].toString().split(',');
      for (const setCookie of setCookies) {
        const cookieNameValue = setCookie.toString().split(';')[0].toString().split('=');
        request.sessionUpdateSetCookie(cookieNameValue[0], cookieNameValue[1]);
      }
    }
  }
  return response;
};

http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use(responseInterceptor);

class Request {
  private cookieString: string = '';
  private sessionUser = '';

  public async withSession(username: string, password: string) {
    this.cookieString = await getSessionCookieString(username, password);
    this.sessionUser = username;
  }

  public sessionUpdateSetCookie(name: string, value: string) {
    this.cookieString = updateSessionCookieString(this.sessionUser, name, value);
  }

  public clearSession() {
    this.cookieString = '';
  }

  private getRequestConfig(headers?: Record<string, string>): AxiosRequestConfig {
    let reqheaders: Record<string, string> = {};
    if (headers) {
      reqheaders = { ...headers };
    }
    if (this.cookieString !== '') {
      reqheaders.cookie = this.cookieString;
    }

    return { headers: reqheaders };
  }

  private getResponseFromError(error: unknown): AxiosResponse | null {
    console.log('error occured : ', error);
    const maybeError = error as { response?: AxiosResponse; request?: unknown };
    if (maybeError.response) {
      return maybeError.response;
    }
    if (maybeError.request) {
      return null;
    }
    return null;
  }

  public async get(reqpath: string, headers: Record<string, string> | undefined, expectedStatus: number | number[]) {
    reporterMsg('<<-----------------------------------------------------');
    reporterMsg(`GET : ${reqpath}`);
    reporterMsg('----------------------------------------------------->>');

    return await this.retryRequest(() => http.get(reqpath, this.getRequestConfig(headers)), expectedStatus);
  }

  public async post(reqpath: string, data: unknown, headers: Record<string, string> | undefined, expectedStatus: number) {
    reporterMsg('<<-----------------------------------------------------');
    reporterMsg(`POST : ${reqpath}`);
    reporterJson(data);
    reporterMsg('----------------------------------------------------->>');

    return await this.retryRequest(() => http.post(reqpath, data, this.getRequestConfig(headers)), expectedStatus);
  }

  public async put(reqpath: string, data: unknown, headers: Record<string, string> | undefined, expectedStatus: number) {
    reporterMsg('<<-----------------------------------------------------');
    reporterMsg(`PUT : ${reqpath}`);
    reporterJson(data);
    reporterMsg('----------------------------------------------------->>');

    return await this.retryRequest(() => http.put(reqpath, data, this.getRequestConfig(headers)), expectedStatus);
  }

  public async delete(
    reqpath: string,
    payload: unknown,
    moreHeaders: Record<string, string> | undefined,
    expectedStatus: number | number[]
  ) {
    reporterMsg('<<-----------------------------------------------------');
    reporterMsg(`DELETE : ${reqpath}`);
    reporterJson(payload);
    reporterMsg('----------------------------------------------------->>');

    const requestConfig = this.getRequestConfig(moreHeaders);
    if (payload) {
      requestConfig.data = payload;
    }
    return await this.retryRequest(() => http.delete(reqpath, requestConfig), expectedStatus);
  }

  async retryRequest(callback: () => Promise<AxiosResponse>, expectedResponsecode: number | number[]) {
    const retryErrorLogs: string[] = [];
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const { response, error } = await this.executeRequest(callback);
      if (response) {
        reporterMsg(`Response: Status code ${response.status}`);
      }

      if (this.isExpectedResponse(response, expectedResponsecode)) {
        return response;
      }

      this.logRetryError(attempt, response, error, retryErrorLogs);
      await this.sleepBeforeRetry(attempt, response?.status);
    }

    throw new Error('Following errors occured in retry attempts ' + retryErrorLogs);
  }

  private async executeRequest(callback: () => Promise<AxiosResponse>) {
    try {
      const response = await callback();
      return { response, error: null };
    } catch (error) {
      const response = (error as { response?: AxiosResponse }).response ?? null;
      return { response, error };
    }
  }

  private isExpectedResponse(response: AxiosResponse | null, expectedResponsecode: number | number[]) {
    if (!response) {
      return false;
    }
    if (Array.isArray(expectedResponsecode)) {
      return expectedResponsecode.includes(response.status);
    }
    return expectedResponsecode === response.status;
  }

  private logRetryError(attempt: number, response: AxiosResponse | null, error: unknown, retryErrorLogs: string[]) {
    const status = response?.status ?? 'unknown';
    const responseBody = response?.data ?? 'unknown';
    const errorDetails = error instanceof Error ? error.message : JSON.stringify(error);
    const errorMessage = response
      ? `STATUS CODE : ${status} =>RESPONSE BODY :  ${JSON.stringify(responseBody)}`
      : `unknown request error occured ${errorDetails} `;
    retryErrorLogs.push(`\n Retry ${attempt} : ${errorMessage}`);
    reporterMsg('<<-------------------- ERROR RESPONSE---------------------------------');
    reporterMsg(` Unexpected response : ${errorMessage}`);
    reporterMsg('-------------------- ERROR RESPONSE--------------------------------->>');
    reporterMsg(` Retrying atempt ${attempt}`);
  }

  private async sleepBeforeRetry(attempt: number, status: number | undefined) {
    const sleepInSec = attempt * (status === 502 ? 20 : 2);
    await new Promise((resolve) => {
      setTimeout(() => {
        reporterMsg(` <<<<<<<<<<<< Sleep for ${sleepInSec} sec before retry`);
        resolve(true);
      }, sleepInSec);
    });
  }
}
const request = new Request();
export default request;

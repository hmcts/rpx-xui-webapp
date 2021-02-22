import axios, { AxiosInstance } from 'axios';
import { config } from '../config/config';
import { getSessionCookieString } from './authUtil';
import {reporterMsg, reporterJson} from './helper'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios.defaults.headers.common['Content-Type'] = 'application/json';
const axiosOptions = {};
axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.baseUrl;
const http: AxiosInstance = axios.create(axiosOptions);


const requestInterceptor = (request) => {
    console.log(`${request.method.toUpperCase()} to ${request.url}`);
    return request;
};
http.interceptors.request.use(requestInterceptor);


class Request {
    private testContext;
    private cookieString: string = '';
    public async withSession(username: string, password: string) {
        this.cookieString = await getSessionCookieString(username, password);
    }

    public clearSession() {
        this.cookieString = '';
    }

    private getRequestConfig(headers: any) {
        let reqheaders: any = {};
        if (headers) {
            reqheaders = { ...headers };
        }
        if (this.cookieString !== '') {
            reqheaders['cookie'] = this.cookieString;
        }

        return { headers: reqheaders};
    }

    private getResponseFromError(error): any {
        console.log('error occured : ', error);
        if ( error.response) {
            return error.response;
        } else if (error.request) {
            return error.request;
        } else {
            return error;
        }
    }

    public async get(reqpath: string, headers: any, expectedStatus:any){
        return await this.retryRequest(() => http.get(reqpath, this.getRequestConfig(headers)), expectedStatus);

    }

    public async post(reqpath: string, data, headers: any, expectedStatus: number) {
        return await this.retryRequest(() => http.post(reqpath, data, this.getRequestConfig(headers)), expectedStatus);

    }

    public async put(reqpath: string, data, headers: any, expectedStatus: number){
        return await this.retryRequest(() => http.put(reqpath, data, this.getRequestConfig(headers)), expectedStatus);

    }


    public async delete(reqpath: string, payload, moreHeaders: any, expectedStatus:any) {
        const requestConfig = this.getRequestConfig(moreHeaders);
        if (payload) {
            requestConfig['data'] = payload;
        }
        return await this.retryRequest(() => http.delete(reqpath, requestConfig), expectedStatus);
    }

    async retryRequest(callback,expectedResponsecode){
        let retryAttemptCounter = 0;
        let isCallbackSuccess = false;
        let retVal = null;

        const retryErrorLogs = [];
        let error = null;
        let isExpectedResponseReceived = false
        while (retryAttemptCounter <= 3 && !isExpectedResponseReceived){
            isExpectedResponseReceived = false;
            retVal = null;
            error = null;
            try {
                retVal = await callback();
            } catch (err) {
                // retryErrorLogs.push(err.response ? err.response : err);
                error = err;
                console.log(err);
                retVal = err.response ? err.response : null; 
                
            }


            if (expectedResponsecode instanceof Array){
                isExpectedResponseReceived = expectedResponsecode.includes(retVal.status); 
            }else{
                isExpectedResponseReceived = expectedResponsecode === retVal.status 
            }

            if (!isExpectedResponseReceived){
                console.log(retVal);
                console.log(error);
                retryAttemptCounter++;
                const status = retVal  ? retVal.status : "unknown";
                const responseBody = retVal  ? retVal.body : "unknown"; 
                let errorMessage = retVal ? `STATUS CODE : ${status} =>RESPONSE BODY :  ${responseBody}` : `unknown request error occured  ` 
                retryErrorLogs.push(`\n Retry ${retryAttemptCounter -1 } : ${errorMessage}`);

                console.log(` Unexpected response : ${errorMessage}`);
                console.log(` Retrying atempt ${retryAttemptCounter}`);

                let sleepInSec = retryAttemptCounter *2; 
                await new Promise((resolve,reject) => {
                    setTimeout(() => {
                        console.log(`Sleep for ${sleepInSec} sec before retry`);
                        resolve(true);
                    }, sleepInSec*1000);
                });
            } 
            
        }

        if (isExpectedResponseReceived){
            return retVal;
        }else{
            throw new Error("Following errors occured in retry attempts "+(retryErrorLogs));
        }
    }
}

export default new Request();

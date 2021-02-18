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

    public async get(reqpath: string, headers: any, expectedResponsecode: number){
        try {
            return await this.retryRequest(() => http.get(reqpath, this.getRequestConfig(headers)), expectedResponsecode);
        } catch (error) {
            return this.getResponseFromError(error);
        }
    }

    public async post(reqpath: string, data, headers: any, expectedResponsecode: number) {
        try {
            return await this.retryRequest(() => http.post(reqpath, data, this.getRequestConfig(headers)), expectedResponsecode);
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }

    public async put(reqpath: string, data, headers: any, expectedResponsecode: number){
        try {
            return await this.retryRequest(() => http.put(reqpath, data, this.getRequestConfig(headers)), expectedResponsecode);
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }


    public async delete(reqpath: string, payload, moreHeaders: any, expectedResponsecode: number) {
        try {
            const requestConfig = this.getRequestConfig(moreHeaders);
            if (payload){
                requestConfig['data'] = payload;
            }
            return await this.retryRequest(() => http.delete(reqpath, requestConfig), expectedResponsecode);
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }

    async retryRequest(callback, expectedResponsecode:number){
        let retryAttemptCounter = 0;
        let isCallbackSuccess = false;
        let retVal = null;

        const retryErrorLogs = [];
        while (retryAttemptCounter < 3 && !retVal && !isCallbackSuccess){
            try {
                reporterMsg("in retry function : retry attempt " + retryAttemptCounter);
                retVal = await callback();
                if (expectedResponsecode  ){
                    if (expectedResponsecode === retVal.status){
                        isCallbackSuccess = true;
                    }
                    else{
                        reporterMsg("Expected status not matching " + JSON.stringify(retVal));   
                    }
                }
            } catch (err) {
                retryErrorLogs.push(err);
                retryAttemptCounter++;
                reporterMsg(`API request error: "${err.code}" syscall : ${err.syscall} => Retrying atempt ${retryAttemptCounter}`);
                if (err.response) {
                    retVal = err.response;
                }
            }
        }

        if(retVal){
            return retVal;
        }else{
            throw new Error("Errors occured in retry attempts "+JSON.stringify(retryErrorLogs));
        }
    }
}

export default new Request();

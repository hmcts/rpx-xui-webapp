
const axios = require('axios');
const config = require('./config/config');
const auth = require('./authUtil');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios.defaults.headers.common['Content-Type'] = 'application/json';
const axiosOptions = {
    baseURL:"https://manage-case.aat.platform.hmcts.net"
};
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://manage-case.aat.platform.hmcts.net";
const http = axios.create(axiosOptions);

const requestInterceptor = (request) => {
    console.log("Base url:::::::"+config.getBaseUrl());
    console.log("requestInterceptor:::::::"+`${request.method.toUpperCase()} to ${request.url}`);
    return request;
};
http.interceptors.request.use(requestInterceptor);


class Request {

     cookieString = '';
     async withSession(username, password) {
        this.cookieString = await auth.getSessionCookieString(username, password);
    }

     clearSession() {
        this.cookieString = '';
    }
     getApi(){
        return "Test Api"
    }

     getRequestConfig(headers) {
        let reqheaders = {};
        if (headers) {
            reqheaders = { ...headers };
        }
        if (this.cookieString !== '') {
            reqheaders['cookie'] = this.cookieString;
        }

        return { headers: reqheaders};
    }

     getResponseFromError(error) {
        console.log('error occured : ', error);
        if ( error.response) {
            return error.response;
        } else if (error.request) {
            return error.request;
        } else {
            return error;
        }
    }

     async get(reqpath, headers){
        try {
            return await http.get(reqpath, this.getRequestConfig(headers));
        } catch (error) {
            return this.getResponseFromError(error);
        }
    }

     async post(reqpath, data, headers) {
        try {
            return await http.post(reqpath, data, this.getRequestConfig(headers));
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }

     async put(reqpath, data, headers){
        try {
         return await http.put(reqpath, data, this.getRequestConfig(headers));
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }


     async delete(reqpath, payload, moreHeaders) {
        try {
            const requestConfig = this.getRequestConfig(moreHeaders);
            if (payload){
                requestConfig['data'] = payload;
            }
            return await http.delete(reqpath, requestConfig );
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }
}
module.exports =new  Request(); 



const axios = require('axios');
const { promise } = require('protractor');
const config = require('./config/config');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios.defaults.headers.common['Content-Type'] = 'application/json';
const axiosOptions = {
    baseURL: config.getBaseUrl()
};
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.TEST_URL;
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
        this.cookieString = await this.getCookieString()
    }
    async getCookieString(){
        let cookieString = '';

        return new Promise((resolve,reject) => {
            try{
                browser.manage().getCookies().then(function (cookiesArray) {
                    for (let i = 0; i < cookiesArray.length; i++) {
                        cookieString = `${cookieString}${cookiesArray[i].name}=${cookiesArray[i].value};`;
                    }
                    resolve(cookieString)
                }).catch(err =>{
                    reject(err)
                })
            }catch(err){
                reject(err)
            }
            
        });
       
    }
    
    async getCookievalue(name){
        const cookies = await browser.manage().getCookies(); 
        let retval = null;
        for(const cookie of cookies){
            if(cookie.name === name){
                retval = cookie.value;
                break; 
            }
        }
        return retval;
    }

     clearSession() {
        this.cookieString = '';
    }
     getApi(){
        return "Test Api"
    }

     async getRequestConfig(headers) {
        let reqheaders = {};
        if (headers) {
            reqheaders = { ...headers };
        }
        if (this.cookieString !== '') {
            reqheaders['cookie'] = await this.getCookieString();
            reqheaders['Authorization'] = 'Bearer '+await this.getCookievalue("__auth__");
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
            const config = await this.getRequestConfig(headers); 
            return await http.get(reqpath, config );
        } catch (error) {
            return this.getResponseFromError(error);
        }
    }

     async post(reqpath, data, headers) {
        try {
            const config = await this.getRequestConfig(headers); 
            return await http.post(reqpath, data,config);
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }

     async put(reqpath, data, headers){
        try {
            const config = await this.getRequestConfig(headers); 
            return await http.put(reqpath, data, config);
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }


     async delete(reqpath, payload, moreHeaders) {
        try {
            const requestConfig = await this.getRequestConfig(moreHeaders);
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


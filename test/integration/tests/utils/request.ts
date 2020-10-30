import axios, { AxiosInstance } from 'axios';
import { config } from '../config/config';
import { getSessionCookieString } from './authUtil';

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

    private getResponseFromError(error): any{
        console.log('error occured : ', error);
        if ( error.response) {
            return error.response;
        } else if (error.request) {
            return error.request;
        } else {
            return error;
        }
    }

    public async get(reqpath: string, headers: any){
        try {
            return await http.get(reqpath, this.getRequestConfig(headers));
        } catch (error) {
            return this.getResponseFromError(error);
        }
    }

    public async post(reqpath: string, data, headers: any) {
        try {
            return await http.post(reqpath, data, this.getRequestConfig(headers));
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }

    public async put(reqpath: string, data, headers: any){
        try {
         return await http.put(reqpath, data, this.getRequestConfig(headers));
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }


    public async delete(reqpath: string, headers: any) {
        try {
            return await http.delete(reqpath, this.getRequestConfig(headers));
        } catch (error) {
            return this.getResponseFromError(error);

        }
    }
}

export default new Request();

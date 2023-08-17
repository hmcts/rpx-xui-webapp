import axios, { AxiosInstance } from 'axios';
import { errorInterceptor, requestInterceptor, successInterceptor } from '../interceptors';

export const http: AxiosInstance = axios.create({});
const deploymentId: string = process.env.DEPLOYMENT_ID;

if (deploymentId) {
  axios.defaults.headers.common['hmcts-deployment-id'] = deploymentId;
}
axios.defaults.headers.common['Content-Type'] = 'application/json';
http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use(successInterceptor, errorInterceptor);

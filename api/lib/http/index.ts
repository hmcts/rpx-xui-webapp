import axios, { AxiosInstance } from 'axios';
import { errorInterceptor, requestInterceptor, successInterceptor } from '../interceptors';

export const http: AxiosInstance = axios.create({});
const previewDeploymentId: string = process.env.PREVIEW_DEPLOYMENT_ID;

if (previewDeploymentId) {
  axios.defaults.headers.common['hmcts-deployment-id'] = previewDeploymentId;
}
axios.defaults.headers.common['Content-Type'] = 'application/json';
http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use(successInterceptor, errorInterceptor);

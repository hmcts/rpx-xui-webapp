import axios, { AxiosInstance } from 'axios';
import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptorsMock';

// TODO: once mocks are no longer needed this can be replaced by standard http
export const httpMock: AxiosInstance = axios.create({});

axios.defaults.headers.common['Content-Type'] = 'application/json';
httpMock.interceptors.request.use(requestInterceptor);
httpMock.interceptors.response.use(successInterceptor, errorInterceptor);

import axios, { AxiosInstance } from 'axios';
import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptorsMock';

// Not actively used - kept for potential future use in tests/mocks but could be removed if not needed

export const httpMock: AxiosInstance = axios.create({});

axios.defaults.headers.common['Content-Type'] = 'application/json';
httpMock.interceptors.request.use(requestInterceptor);
httpMock.interceptors.response.use(successInterceptor, errorInterceptor);

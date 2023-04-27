import axios, { AxiosInstance } from 'axios';
import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptorsMock';

export abstract class HttpMockClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor(): void {
    this.instance.interceptors.request.use(requestInterceptor);
  }

  private initializeResponseInterceptor(): void {
    this.instance.interceptors.response.use(
      successInterceptor,
      errorInterceptor
    );
  }
}
